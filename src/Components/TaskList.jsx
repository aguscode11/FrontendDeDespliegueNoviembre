import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask, updateTask } from '../services/taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Cargando tus tareas...</div>;

  return (
    <div className="task-list">
      <h2>My Tasks</h2>

      {error && <div className="error-message">{error}</div>}

      {tasks.length === 0 ? (
        <p>No tienes tareas pendientes. Crea tu primera tarea!</p>
      ) : (
        <div className="tasks-container">
          {tasks.map(task => (
            <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                  className="task-checkbox"
                />

                <div className="task-details">
                  <h3 className="task-title">{task.title}</h3>
                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}

                  <div className="task-meta">
                    <span className={`priority-badge priority-${task.priority}`}>
                      {task.priority}
                    </span>

                    {task.dueDate && (
                      <span className="due-date">
                        📅 {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}

                    <span className="created-date">
                      Creada: {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(task._id)}
                className="btn-delete"
                title="Eliminar tarea"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;