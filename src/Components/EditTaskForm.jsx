import { useState } from "react";
import { editTaskAPI } from "../services/taskService";

const EditTaskForm = ({ task, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.slice(0,10) : "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dueDateISO = form.dueDate ? `${form.dueDate}T12:00:00.000Z` : null;

    await editTaskAPI(task._id, {
      ...form,
      dueDate: dueDateISO
    });

    onUpdated();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar tarea</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <input name="title" value={form.title} onChange={handleChange} className="form-input" />
          <textarea name="description" value={form.description} onChange={handleChange} className="form-textarea" />
          <select name="priority" value={form.priority} onChange={handleChange} className="form-select">
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="form-input" />
          <button className="btn-primary" type="submit">Guardar cambios</button>
          <button className="btn-secondary" onClick={onClose} type="button">Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
