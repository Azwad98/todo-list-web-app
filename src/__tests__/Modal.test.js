// src/__tests__/Modal.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const task = {
    name: 'Test Task',
    description: 'Test Description',
    dueDate: '2024-12-31T12:00',
  };

  it('should render the modal with task details', () => {
    const { getByPlaceholderText } = render(
      <Modal
        show={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        task={task}
      />
    );

    expect(getByPlaceholderText('Task Name').value).toBe(task.name);
    expect(getByPlaceholderText('Description').value).toBe(task.description);
    expect(getByPlaceholderText('Task Name').value).toBe(task.name);
  });

  it('should call onClose when cancel button is clicked', () => {
    const { getByText } = render(
      <Modal
        show={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        task={task}
      />
    );

    fireEvent.click(getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onSave with updated task when save button is clicked', () => {
    const { getByText, getByPlaceholderText } = render(
      <Modal
        show={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        task={task}
      />
    );

    fireEvent.change(getByPlaceholderText('Task Name'), {
      target: { value: 'Updated Task' },
    });
    fireEvent.click(getByText('Save'));

    expect(mockOnSave).toHaveBeenCalledWith({
      ...task,
      name: 'Updated Task',
      dueDate: '2024-12-31T12:00:00.000Z',
    });
  });
});
