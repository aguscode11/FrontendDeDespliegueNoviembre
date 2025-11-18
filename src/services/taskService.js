import ENVIRONMENT from "../config/environment";

export async function createTask(taskData) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/tasks',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            },
            body: JSON.stringify(taskData)
        }
    )
    if(!response_http.ok){
        throw new Error('Error al crear la tarea')
    }
    const response = await response_http.json()
    return response
}

export async function getTasks() {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/tasks',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        }
    )
    if(!response_http.ok){
        throw new Error('Error al obtener lista de tareas')
    }
    const response = await response_http.json()
    return response
}

export async function updateTask(id, taskData) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/tasks/' + id,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            },
            body: JSON.stringify(taskData)
        }
    )
    if(!response_http.ok){
        throw new Error('Error al actualizar la tarea')
    }
    const response = await response_http.json()
    return response
}

export async function deleteTask(id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/tasks/' + id,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        }
    )
    if(!response_http.ok){
        throw new Error('Error al eliminar la tarea')
    }
    
    // Para DELETE, a veces no hay contenido
    if (response_http.status !== 204) {
        const response = await response_http.json()
        return response
    }
    
    return { success: true }
}