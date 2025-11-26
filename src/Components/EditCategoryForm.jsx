import { useState } from "react";
import { updateCategory } from "../services/categoryService";

const EditCategoryForm = ({ category, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    name: category.name,
    color: category.color || "#0a84ff",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCategory(category._id, form);
      if (onUpdated) onUpdated();
      onClose();

    } catch (error) {
      alert(error.message || "Error al actualizar la categoría");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar categoría</h2>

        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-input"
          />

          <label>Color</label>
          <input
            type="color"
            name="color"
            value={form.color}
            onChange={handleChange}
            className="form-input"
          />

          <button className="btn-primary" type="submit">
            Guardar cambios
          </button>
          <button className="btn-secondary" onClick={onClose} type="button">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryForm;
