import express from 'express';
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';

// Read serviceAccountKey.json and parse it
const serviceAccount = JSON.parse(
  readFileSync('./serviceAccountKey.json', 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const PORT = 5173;

app.use(express.json());

// API endpoints
app.get('/todos', async (req, res) => {
  try {
    console.log('GET /todos');
    const snapshot = await db.collection('todos').get();
    const todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log('Todos fetched:', todos);
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error getting todos:', error);
    res.status(500).send('Error getting todos');
  }
});

app.post('/todos', async (req, res) => {
  try {
    console.log('POST /todos', req.body);
    const newTodo = req.body;
    const docRef = await db.collection('todos').add(newTodo);
    console.log('Todo created with ID:', docRef.id);
    res.status(201).json({ id: docRef.id, ...newTodo });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).send('Error creating todo');
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = req.body;
    console.log('PUT /todos/:id', id, updatedTodo);
    await db.collection('todos').doc(id).update(updatedTodo);
    console.log('Todo updated:', { id, ...updatedTodo });
    res.status(200).json({ id, ...updatedTodo });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).send('Error updating todo');
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('DELETE /todos/:id', id);
    await db.collection('todos').doc(id).delete();
    console.log('Todo deleted:', id);
    res.status(200).send('Todo deleted');
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).send('Error deleting todo');
  }
});

// Serve static files from the React app
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
