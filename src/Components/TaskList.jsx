import React, { useState, useEffect } from "react";
import { getTasks, deleteTask, updateTask } from "../services/taskService";
import EditTaskForm from "./EditTaskForm";


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      setTasks(response.data);
      setError("");
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
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleComplete = async (task, e) => {
    e.stopPropagation(); // evita romper el accordion
    try {
      await updateTask(task._id, { completed: !task.completed });
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Cargando tus tareas...</div>;

  // ---- Agrupar tareas ----
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const groups = {
    overdue: [],
    today: [],
    tomorrow: [],
    upcoming: [],
  };

  tasks.forEach((task) => {
    const due = task.dueDate ? new Date(task.dueDate) : today;
    due.setHours(0, 0, 0, 0);

    if (due < today) groups.overdue.push(task);
    else if (due.getTime() === today.getTime()) groups.today.push(task);
    else if (due.getTime() === tomorrow.getTime()) groups.tomorrow.push(task);
    else groups.upcoming.push(task);
  });

  const sections = [
    { key: "overdue", label: "⚠️ Vencidas" },
    { key: "today", label: "📅 Hoy" },
    { key: "tomorrow", label: "📅 Mañana" },
    { key: "upcoming", label: "📅 Próximamente" },
  ];

  //editar


  const startEditing = (task) => {
    setEditingTask(task);
  };


  const renderTask = (task) => (
    <div
      key={task._id}
      className={`task-item ${task.completed ? "completed" : ""}`}
    >
      <div className="task-content">
        {/* checkbox con stopPropagation */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => toggleComplete(task, e)}
          className="task-checkbox"
        />

        <div className="task-details">
          <h3 className="task-title">{task.title}</h3>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          {/* META DATA */}
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
            {task.categoryId && (
              <span
                className="task-category"
                style={{
                  background: task.categoryId.color + "40",
                  color: task.categoryId.color,
                  padding: "0.2rem 0.5rem",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  maxHeight: "23px",
                }}
              >
                {task.categoryId.name}
              </span>
            )}

          </div>
        </div>
      </div>
      <div className="button-container">
        <button
          onClick={() => handleDelete(task._id)}
          className="btn-delete"
          title="Eliminar tarea"
        >
          🗑️
        </button>
        <button
          className="btn-edit"
          onClick={() => startEditing(task)}
        >
          ✏️
        </button>
      </div>

    </div>
  );
  


  return (
    <div className="task-list" style={{ padding: "1.5rem" }}>

      {/* EDIT MODAL */}
      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdated={() => {
            loadTasks();
            setEditingTask(null);
          }}
        />
      )}

      <h2 style={{ marginBottom: "1rem" }}>Mis tareas</h2>

      {error && <div className="error-message">{error}</div>}

      {tasks.length === 0 && (
        <div className="empty-tasks">
          No hay tareas disponibles… qué aburrido 😴
        </div>
      )}


      {sections.map(({ key, label }) => {
        if (groups[key].length === 0) return null;

        const isOpen = openSection === key;

        return (
          <div key={key} className="task-section">
            {/* HEADER */}
            <button
              className="accordion-header"
              onClick={() => setOpenSection(isOpen ? null : key)}
            >
              {label}
              <span className="accordion-toggle">{isOpen ? "▲" : "▼"}</span>
            </button>

            {/* CONTENIDO */}
            {isOpen && (
              <div className="accordion-content">
                {groups[key].map((task) => renderTask(task))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
