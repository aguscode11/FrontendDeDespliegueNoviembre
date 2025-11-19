import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, isLogged, onLogout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Task Manager 2025</Link>
      </div>

      <div className="nav-links">
        {isLogged && user ? (
          <>
            <span className="user-welcome">Bienvenido, {user.name}!</span>
            <button onClick={onLogout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              ¿Quieres realizar otro logueo?
            </Link>
            <Link to="/register" className="nav-link">
              ¿No tienes una cuenta?
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
