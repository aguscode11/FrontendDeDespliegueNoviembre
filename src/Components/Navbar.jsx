import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { LogOut, LogIn, UserPlus, Menu } from "lucide-react";

const Navbar = () => {
  const { user, isLogged, onLogout } = useContext(AuthContext);

  const getInitial = () => {
    if (!user?.name) return "?";
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <nav className="navbar">
      {/* Left */}
      <div className="nav-left">
        <Menu className="icon-menu" />
        <Link to="/" className="nav-title">TaskFlow</Link>
      </div>

      {/* Right */}
      <div className="nav-right">

        {isLogged && user ? (
          <>
            {/* Avatar */}
            <div className="avatar">
              {getInitial()}
            </div>

            <span className="user-name">{user.name}</span>

            <button className="btn-icon" onClick={onLogout}>
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-icon">
              <LogIn size={20} />
            </Link>

            <Link to="/register" className="btn-icon">
              <UserPlus size={20} />
            </Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
