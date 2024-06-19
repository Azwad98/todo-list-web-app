import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import ToDoList from '../components/ToDoList';

jest.mock(
  '../components/ToDo',
  () =>
    ({ todo, onToggle, onDelete, onEdit }) =>
      (
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span>{todo.name}</span>
          <button onClick={() => onEdit(todo)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      )
);

describe('ToDoList Component', () => {
  const mockTodos = [
    { id: 1, name: 'Test Task 1', completed: false },
    { id: 2, name: 'Test Task 2', completed: true },
  ];
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  describe('Rendering Tests', () => {
    it('renders the list of todos', () => {
      render(
        <ToDoList
          todos={mockTodos}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      );

      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
      expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    });
  });

  describe('Interaction Tests', () => {
    it('calls onToggle when a todo is toggled', () => {
      render(
        <ToDoList
          todos={mockTodos}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      );

      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      expect(mockOnToggle).toHaveBeenCalledWith(mockTodos[0].id);
    });

    it('calls onDelete when a todo is deleted', () => {
      render(
        <ToDoList
          todos={mockTodos}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      );

      fireEvent.click(screen.getAllByText('Delete')[0]);
      expect(mockOnDelete).toHaveBeenCalledWith(mockTodos[0].id);
    });

    it('calls onEdit when a todo is edited', () => {
      render(
        <ToDoList
          todos={mockTodos}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      );

      fireEvent.click(screen.getAllByText('Edit')[0]);
      expect(mockOnEdit).toHaveBeenCalledWith(mockTodos[0]);
    });
  });
});
