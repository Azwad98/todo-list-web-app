import React, { useState, useEffect } from 'react';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';

const Todo = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [countdown, setCountdown] = useState('');

  const handleToggleExpand = (e) => {
    if (
      e.target.className !== 'todo-checkbox' &&
      e.target.tagName !== 'BUTTON' &&
      e.target.tagName !== 'IMG'
    ) {
      setIsExpanded(!isExpanded);
    }
  };

  useEffect(() => {
    if (!todo.dueDate) {
      setCountdown('No deadline');
      return;
    }

    if (todo.completed) {
      setCountdown('Completed');
      return;
    }

    const updateCountdown = () => {
      const now = new Date();
      const dueDate = new Date(todo.dueDate);
      const difference = dueDate - now;

      if (difference <= 0) {
        setCountdown('Past due');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown(`${days}d, ${hours}h, ${minutes}m, ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [todo.dueDate, todo.completed]);

  return (
    <div
      className={`todo ${todo.completed ? 'completed' : ''}`}
      onClick={handleToggleExpand}
    >
      <div className="todo-header">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => {
            e.stopPropagation(); // Prevent the click event from propagating to the parent div
            onToggle(todo.id);
          }}
          className="todo-checkbox"
        />
        <div className="todo-text">{todo.name}</div>
        <button
          className="edit-button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click event from propagating to the parent div
            onEdit(todo);
          }}
        >
          <img src={editIcon} alt="Edit" />
        </button>
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the click event from propagating to the parent div
            onDelete(todo.id);
          }}
        >
          <img src={deleteIcon} alt="Delete" />
        </button>
      </div>
      {isExpanded && (
        <div className="todo-details">
          <p className="todo-description">{todo.description}</p>
          <p className="todo-date">{countdown}</p>
        </div>
      )}
    </div>
  );
};

export default Todo;
