import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import Todo from '../components/ToDo';

describe('Example Task', () => {
  const mockTodo = {
    id: '1',
    name: 'Test Name',
    description: 'Test Description',
    dueDate: '2024-12-31T12:00',
    completed: false,
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('renders the Task Item with the correct text', () => {
      render(
        <Todo
          todo={mockTodo}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      );
      expect(screen.getByText('Test Name')).toBeInTheDocument();
    });

    it('renders the Task Item details when expanded and no deadline is set', () => {
      const noDueDateTodo = { ...mockTodo, dueDate: null };
      render(
        <Todo
          todo={noDueDateTodo}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      );

      // Mimic user clicking on the task to expand it
      fireEvent.click(screen.getByText('Test Name'));

      // Check for the expanded details
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('No deadline')).toBeInTheDocument();
    });
  });
  describe('Interaction with task', () => {
    it('should expand task when clicked', () => {
      render(
        <Todo
          todo={mockTodo}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      );

      fireEvent.click(screen.getByRole('checkbox'));
      expect(mockOnToggle).toHaveBeenCalledWith('1');
    });

    it('should toggle onDelete when clicking delete item', () => {
      render(
        <Todo
          todo={mockTodo}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /delete/i }));
      expect(mockOnDelete).toHaveBeenCalledWith('1');
    });

    it('should toggle onEdit when clicking edit item', () => {
      render(
        <Todo
          todo={mockTodo}
          onToggle={mockOnToggle}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: /edit/i }));
      expect(mockOnEdit).toHaveBeenCalledWith(mockTodo);
    });
  });
});
