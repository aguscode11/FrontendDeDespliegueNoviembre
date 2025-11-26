import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Dashboard = () => {
  const [refreshTasks, setRefreshTasks] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const handleTaskCreated = () => {
    setRefreshTasks(prev => prev + 1);
    setShowForm(false); // se oculta tras crear tarea
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Tus tareas</h1>
      </header>

      {/* Botón minimalista para mostrar/ocultar */}
      <div className='btn-container'>
        <button
          className="btn-toggle-form"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cerrar nueva tarea" : "+ Nueva tarea"}
        </button>
      </div>

      {/* FORM desplegable */}
      {showForm && (
        <div className="task-form-section">
          <TaskForm onTaskCreated={handleTaskCreated} />
        </div>
      )}

      {/* Task List */}
      <TaskList key={refreshTasks} />
    </div>
  );
};

export default Dashboard;
