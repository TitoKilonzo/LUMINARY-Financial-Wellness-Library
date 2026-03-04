import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const isReaderPage = location.pathname.startsWith("/read/");

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        {isReaderPage ? (
          <button onClick={() => navigate(-1)} className="back-nav-btn">
            ← Back
          </button>
        ) : (
          <Link to="/" className="logo" onClick={() => setMobileOpen(false)}>
            <span className="logo-icon">📖</span>
            <span className="logo-text gradient-text">Luminary</span>
          </Link>
        )}

        <div className="nav-links desktop-nav">
          {user ? (
            <>
              <Link to="/library" className="nav-link">Library</Link>
              <div className="user-menu">
                <span className="user-avatar">{user.name?.charAt(0)}</span>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn-primary nav-cta">Get Started</Link>
            </>
          )}
        </div>

        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {user ? (
              <>
                <Link to="/library" className="mobile-link" onClick={() => setMobileOpen(false)}>Library</Link>
                <button onClick={handleLogout} className="mobile-link logout-text">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-link" onClick={() => setMobileOpen(false)}>Login</Link>
                <Link to="/signup" className="mobile-link" onClick={() => setMobileOpen(false)}>Sign Up</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}