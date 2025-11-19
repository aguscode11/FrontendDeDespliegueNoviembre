import { useContext } from "react"
import { Navigate, Outlet } from "react-router"
import { AuthContext } from "../Context/AuthContext"

const PublicRoute = () => {
  const { isLogged } = useContext(AuthContext)

  // Si ya está logueado → redirigir al home
  if (isLogged) {
    return <Navigate to="/home" replace />
  }

  // Si NO está logueado → puede ver login/register
  return <Outlet />
}

export default PublicRoute
