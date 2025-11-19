import React, { useState } from 'react';
import { createTask } from '../services/taskService';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      await createTask(formData);

      // Limpiar formulario
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium'
      });

      // Notificar al componente padre
      if (onTaskCreated) {
        onTaskCreated();
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Create New Task</h3>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Título *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="Ingresa un título para la tarea"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="form-textarea"
          placeholder="Ingresa una descripción para la tarea (opcional)"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Fecha Limite</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Prioridad</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="form-select"
        >
          <option value="low">Baja</option>
          <option value="medium">Mediana</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading || !formData.title.trim()}
        className="btn-primary"
      >
        {loading ? 'Creando...' : 'Crea una tarea'}
      </button>
    </form>
  );
};

export default TaskForm;