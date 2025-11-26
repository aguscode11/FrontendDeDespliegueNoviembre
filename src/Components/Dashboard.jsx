import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import CategoryForm from "./CategoriesAccordion";
import CategoriesAccordion from './CategoriesAccordion';

const Dashboard = () => {
  const [refreshTasks, setRefreshTasks] = useState(0);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  

  const handleTaskCreated = () => {
    setRefreshTasks(prev => prev + 1);
    setShowTaskForm(false);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Tus tareas</h1>
      </header>

      {/* ===== BOTÓN NUEVA TAREA ===== */}
      <div className="btn-container">
        <button
          className="btn-toggle-form"
          onClick={() => setShowTaskForm(!showTaskForm)}
        >
          {showTaskForm ? "Cerrar nueva tarea" : "+ Nueva tarea"}
        </button>
      </div>

      {/* FORMULARIO DE TAREAS */}
      {showTaskForm && (
        <div className="task-form-section">
          <TaskForm onTaskCreated={handleTaskCreated} />
        </div>
      )}

      {/* ===== BOTÓN CATEGORÍAS ===== */}
      <div className="btn-container">
        <button
          className="btn-toggle-form"
          onClick={() => setShowCategories(!showCategories)}
        >
          {showCategories ? "Cerrar categorías" : "📂 Categorías"}
        </button>
      </div>

      {/* SECCIÓN CATEGORÍAS */}
      {showCategories && (
        <div className="task-form-section">
          <CategoriesAccordion onUpdated={() => setRefreshTasks(prev => prev + 1)} />
        </div>
      )}

      {/* LISTA DE TAREAS */}
      <TaskList key={refreshTasks} />
    </div>
  );
};

export default Dashboard;
