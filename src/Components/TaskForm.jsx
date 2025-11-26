import React, { useState, useEffect } from 'react';
import { createTask } from '../services/taskService';
import { getCategories } from "../services/categoryService";

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    categoryId: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  // 🔥 Cargar categorías al montar
  useEffect(() => {
    getCategories().then(res => {
      setCategories(res.data || []);
    });
  }, []);

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

      console.log("📤 Enviando al backend:", formData);

      await createTask(formData);

      // Limpiar formulario
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        categoryId: ''
      });

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
      <h3>Crear nueva tarea</h3>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>Título *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-textarea"
        />
      </div>

      <div className="form-group">
        <label>Fecha límite</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label>Categoría</label>

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Sin categoría</option>

          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Prioridad</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="form-select"
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <button className="btn-primary" disabled={loading || !formData.title.trim()}>
        {loading ? "Creando..." : "Crear tarea"}
      </button>
    </form>
  );
};

export default TaskForm;
