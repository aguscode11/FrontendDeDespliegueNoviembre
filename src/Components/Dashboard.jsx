import React, { useState, useEffect } from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

const Dashboard = () => {
  const [refreshTasks, setRefreshTasks] = useState(0)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Obtener usuario del localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleTaskCreated = () => {
    setRefreshTasks(prev => prev + 1)
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>My Task Manager</h1>
        <p>Welcome back, {user?.name || "..."}!</p>
      </header>
      
      <div className="dashboard-content">
        <div className="task-form-section">
          <TaskForm onTaskCreated={handleTaskCreated} />
        </div>
        
        <div className="task-list-section">
          <TaskList key={refreshTasks} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard