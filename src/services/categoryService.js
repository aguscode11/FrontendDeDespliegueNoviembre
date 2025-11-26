import ENVIRONMENT from "../config/environment";

export async function getCategories() {
  const res = await fetch(ENVIRONMENT.URL_API + "/api/categories", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener categorías");
  return await res.json();
}

export async function createCategory(data) {
  const res = await fetch(ENVIRONMENT.URL_API + "/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear categoría");
  return await res.json();
}

export async function deleteCategory(id) {
  const res = await fetch(ENVIRONMENT.URL_API + `/api/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    },
  });
  if (!res.ok) throw new Error("Error al eliminar categoría");
  return true;
}

export async function updateCategory(id, data) {
  const res = await fetch(
    ENVIRONMENT.URL_API + `/api/categories/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Error al actualizar categoría");
  return await res.json();
}
