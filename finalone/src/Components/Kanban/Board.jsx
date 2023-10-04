// src/components/Board.js
import React, { useState } from 'react';
import Task from './Task';

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const columns = {
    todo: 'Todo',
    inProgress: 'In Progress',
    done: 'Done',
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, column: 'todo' }]);
      setNewTask('');
    }
  };

  const handleMoveTask = (taskId, newColumn) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, column: newColumn } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex space-x-4">
      {Object.keys(columns).map((columnKey) => (
        <div key={columnKey} className="flex-1">
          <h2 className="text-xl font-semibold mb-4">{columns[columnKey]}</h2>
          <div className="border p-2 rounded h-96 overflow-y-auto">
            {tasks
              .filter((task) => task.column === columnKey)
              .map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onMove={handleMoveTask}
                  onDelete={handleDeleteTask}
                />
              ))}
          </div>
        </div>
      ))}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Add Task</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Task name"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Board;
