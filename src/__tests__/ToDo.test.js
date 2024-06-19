import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import Todo from '../components/ToDo';

describe('Example Task', () => {
  const mockTodo = {
    id: '1',
    name: 'Test Name',
    description: 'Test Description',
    dueDate: '2024-12-31T12:00:00.000Z',
    completed: false,
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    test('renders the Task Item with the correct text', () => {
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

    test('renders the Task Item details when expanded', () => {
      render(
        <Todo
          todo={mockTodo}
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
});
