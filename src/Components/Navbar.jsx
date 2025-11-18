import { Link, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Sincronizar con localStorage como hace tu contexto real
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user')
      setUser(updatedUser ? JSON.parse(updatedUser) : null)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">TaskManager</Link>
      </div>
      
      <div className="nav-links">
        {user ? (
          <>
            <span className="user-welcome">Welcome, {user.username}!</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar