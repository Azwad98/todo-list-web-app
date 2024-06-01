import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import TodoList from './components/ToDoList';
import AddTodo from './components/AddToDo';
import Modal from './components/Modal';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosCollection = collection(db, 'todos');
        const todoSnapshot = await getDocs(todosCollection);
        const todoList = todoSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todoList);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        ...todo,
        completed: false,
      });
      setTodos([...todos, { id: docRef.id, ...todo, completed: false }]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      await updateDoc(doc(db, 'todos', id), {
        completed: !todo.completed,
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const editTodo = (todo) => {
    setTaskToEdit(todo);
    setShowModal(true);
  };

  const saveTodo = async (updatedTodo) => {
    try {
      await updateDoc(doc(db, 'todos', updatedTodo.id), updatedTodo);
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
      setShowModal(false);
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>To-Do List</h1>
        <AddTodo onAdd={addTodo} />
        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onEdit={editTodo}
        />
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={saveTodo}
          task={taskToEdit}
        />
      </div>
    </div>
  );
};

export default App;
