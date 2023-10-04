// src/components/Task.js
import React from 'react';

const Task = ({ task, onMove, onDelete }) => {
  return (
    <div className="bg-white p-2 rounded shadow mb-2">
      <p>{task.text}</p>
      <div className="flex justify-end mt-2">
        {task.column === 'todo' && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-2"
            onClick={() => onMove(task.id, 'inProgress')}
          >
            Move to In Progress
          </button>
        )}
        {task.column === 'inProgress' && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2"
            onClick={() => onMove(task.id, 'done')}
          >
            Move to Done
          </button>
        )}
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
