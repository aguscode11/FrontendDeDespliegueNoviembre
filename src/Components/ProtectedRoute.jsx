import { useContext } from "react"
import { Navigate, Outlet } from "react-router"
import { AuthContext } from "../Context/AuthContext"

const ProtectedRoute = () => {
  const { isLogged } = useContext(AuthContext)

  // Si NO está logueado → mandarlo al login
  if (!isLogged) {
    return <Navigate to="/login" replace />
  }

  // Si está logueado → mostrar rutas internas
  return <Outlet />
}

export default ProtectedRoute
