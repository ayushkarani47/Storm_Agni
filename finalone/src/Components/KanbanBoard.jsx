import React, { useState } from 'react';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', status: 'todo' },
    { id: 2, title: 'Task 2', status: 'in-progress' },
    { id: 3, title: 'Task 3', status: 'done' },
  ]);

  const handleTaskMove = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="kanban-board">
      <div className="column">
        <h2>Todo</h2>
        <ul>
          {tasks
            .filter((task) => task.status === 'todo')
            .map((task) => (
              <li key={task.id}>
                {task.title}
                <button
                  onClick={() => handleTaskMove(task.id, 'in-progress')}
                  className="move-button"
                >
                  Move to In Progress
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="column">
        <h2>In Progress</h2>
        <ul>
          {tasks
            .filter((task) => task.status === 'in-progress')
            .map((task) => (
              <li key={task.id}>
                {task.title}
                <button
                  onClick={() => handleTaskMove(task.id, 'done')}
                  className="move-button"
                >
                  Move to Done
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="column">
        <h2>Done</h2>
        <ul>
          {tasks
            .filter((task) => task.status === 'done')
            .map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default KanbanBoard;
