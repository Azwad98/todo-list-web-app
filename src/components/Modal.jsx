import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ show, onClose, onSave, task }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setDueDate(
        task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ''
      );
    }
  }, [task]);

  if (!show) {
    return null;
  }

  const handleSave = () => {
    const updatedTask = {
      ...task,
      name,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : '',
    };
    onSave(updatedTask);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <form>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Task Name"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
