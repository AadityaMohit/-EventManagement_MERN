import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>Event Manager</Link>
      <div style={styles.links}>
        {token ? (
          <>
            <Link to="/events/new" style={styles.link}>Create Event</Link>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// Inline styles
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#007BFF",
    color: "white",
  },
  logo: {
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
  },
  logoutButton: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Navbar;
