import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import AddTodo from '../components/AddToDo';

describe('AddToDo Component', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    mockOnAdd.mockClear();
  });

  it('should render the Add Task form', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddTodo onAdd={mockOnAdd} />
    );

    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Description')).toBeInTheDocument();
    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByText('Add Task')).toBeInTheDocument();
  });

  it('should update input fields on change', () => {
    const { getByPlaceholderText } = render(<AddTodo onAdd={mockOnAdd} />);

    fireEvent.change(getByPlaceholderText('Name'), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(getByPlaceholderText('Description'), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(getByPlaceholderText('Name'), {
      target: { value: 'Test Task' },
    });

    expect(getByPlaceholderText('Name').value).toBe('Test Task');
    expect(getByPlaceholderText('Description').value).toBe('Test Description');
    expect(getByPlaceholderText('Name').value).toBe('Test Task');
  });

  it('should call onAdd with input values when form is submitted', () => {
    render(<AddTodo onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(screen.getByLabelText('Due Date'), {
      target: { value: '2024-12-31T12:00' },
    });

    fireEvent.click(screen.getByText('Add Task'));

    expect(mockOnAdd).toHaveBeenCalledWith({
      name: 'Test Task',
      description: 'Test Description',
      dueDate: '2024-12-31T12:00',
    });

    expect(screen.getByPlaceholderText('Name').value).toBe('');
    expect(screen.getByPlaceholderText('Description').value).toBe('');
    expect(screen.getByLabelText('Due Date').value).toBe('');
  });

  it('should not call onAdd if name is empty', () => {
    const { getByText } = render(<AddTodo onAdd={mockOnAdd} />);

    fireEvent.click(getByText('Add Task'));

    expect(mockOnAdd).not.toHaveBeenCalled();
  });
});
