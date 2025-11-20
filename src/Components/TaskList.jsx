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

  // --------------------------------------------------------
  // ORDEN SIMPLE Y EFICIENTE POR PRIORIDAD
  // --------------------------------------------------------

  const priorityOrder = { high: 3, medium: 2, low: 1 };

  const sortByPriority = (tasksArray) =>
    [...tasksArray].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

  // --------------------------------------------------------
  // GRUPOS (SE MANTIENEN IGUAL QUE EN TU CÓDIGO)
  // --------------------------------------------------------

  const groupTasks = (tasks) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);

    const groups = {
      overdue: [],
      today: [],
      tomorrow: [],
      upcoming: []
    };

    tasks.forEach(task => {
      if (!task.dueDate) {
        groups.today.push(task);
        return;
      }

      const due = new Date(task.dueDate);
      due.setHours(0, 0, 0, 0);

      if (due < today) groups.overdue.push(task);
      else if (due.getTime() === today.getTime()) groups.today.push(task);
      else if (due.getTime() === tomorrow.getTime()) groups.tomorrow.push(task);
      else groups.upcoming.push(task);
    });

    // Aplicamos el sort por prioridad dentro de cada grupo
    return {
      overdue: sortByPriority(groups.overdue),
      today: sortByPriority(groups.today),
      tomorrow: sortByPriority(groups.tomorrow),
      upcoming: sortByPriority(groups.upcoming)
    };
  };

  const grouped = groupTasks(tasks);

  // --------------------------------------------------------
  // TEMPLATE PARA MOSTRAR TAREAS
  // --------------------------------------------------------

  const renderTask = (task) => (
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
          {task.description && <p className="task-description">{task.description}</p>}

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

      <button onClick={() => handleDelete(task._id)} className="btn-delete">
        🗑️
      </button>
    </div>
  );

  return (
    <div className="task-list">
      <h2>Mis tareas</h2>

      {error && <div className="error-message">{error}</div>}

      {grouped.overdue.length > 0 && (
        <>
          <h3>⚠️ Vencidas</h3>
          {grouped.overdue.map(renderTask)}
        </>
      )}

      {grouped.today.length > 0 && (
        <>
          <h3>📅 Hoy</h3>
          {grouped.today.map(renderTask)}
        </>
      )}

      {grouped.tomorrow.length > 0 && (
        <>
          <h3>📅 Mañana</h3>
          {grouped.tomorrow.map(renderTask)}
        </>
      )}

      {grouped.upcoming.length > 0 && (
        <>
          <h3>📅 Próximamente</h3>
          {grouped.upcoming.map(renderTask)}
        </>
      )}
    </div>
  );
};

export default TaskList;
