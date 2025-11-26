import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../services/categoryService";
import EditCategoryForm from "./EditCategoryForm";

const CategoriesAccordion = ({ onUpdated }) => {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("#0a84ff");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  

  const load = async () => {
    const res = await getCategories();
    setCategories(res.data); 
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    // VALIDACIÓN IMPORTANTE
    if (!newName.trim()) {
      setError("El nombre no puede estar vacío");
      return;
    }

    setError("");

    await createCategory({ name: newName, color: newColor });

    setNewName("");
    setNewColor("#0a84ff");

    load();
  };

  return (
    <div className="task-section">
      {/* HEADER */}
      <button className="accordion-header" onClick={() => setOpen(!open)}>
        Categorías
        <span className="accordion-toggle">{open ? "▲" : "▼"}</span>
      </button>

      {/* CONTENIDO */}
      {open && (
        <div className="accordion-content">
          {/* FORM CREAR */}
          <form onSubmit={handleCreate} className="task-form">
            <h3>Nueva categoría</h3>

            {error && <div className="error-message">{error}</div>}

            <input
              className="form-input"
              placeholder="Nombre"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <label>Color</label>
            <input
              type="color"
              className="color-input"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />

            <button className="btn-primary" type="submit">
              Crear
            </button>
          </form>

          {/* LISTA DE CATEGORÍAS */}
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="task-item"
              style={{ borderLeft: `6px solid ${cat.color || "#0a84ff"}` }}
            >
              <span>{cat.name}</span>

              <div>
                <button className="btn-icon" onClick={() => setEditing(cat)}>
                  ✏️
                </button>
                <button
                  className="btn-delete"
                  onClick={() => {
                    deleteCategory(cat._id)
                      .then(() => {
                        load();
                        if (onUpdated) onUpdated();  // TRIGGER refresco de TaskList
                      });
                  }}
                >
                  🗑️
                </button>


              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL EDITAR */}
      {editing && (
        <EditCategoryForm
          category={editing}
          onClose={() => setEditing(null)}
          onUpdated={() => {
            load();            // recargo categorías
            if (onUpdated) onUpdated();   // recargo tareas
          }}
        />

      )}
    </div>
  );
};

export default CategoriesAccordion;
