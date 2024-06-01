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

// Serve static files from the React app
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.json());

app.get('/todos', async (req, res) => {
  try {
    const snapshot = await db.collection('todos').get();
    const todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).send('Error getting todos');
  }
});

app.post('/todos', async (req, res) => {
  try {
    const newTodo = req.body;
    const docRef = await db.collection('todos').add(newTodo);
    res.status(201).json({ id: docRef.id, ...newTodo });
  } catch (error) {
    res.status(500).send('Error creating todo');
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = req.body;
    await db.collection('todos').doc(id).update(updatedTodo);
    res.status(200).json({ id, ...updatedTodo });
  } catch (error) {
    res.status(500).send('Error updating todo');
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('todos').doc(id).delete();
    res.status(200).send('Todo deleted');
  } catch (error) {
    res.status(500).send('Error deleting todo');
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
