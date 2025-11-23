import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { usuario, logout, estaAutenticado } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          🔐 Sistema JWT
        </Link>
        
        <div style={styles.menu}>
          {estaAutenticado ? (
            <>
              <Link to="/dashboard" style={styles.link}>Dashboard</Link>
              <Link to="/usuarios" style={styles.link}>Usuarios</Link>
              <span style={styles.usuario}>
                <img src={usuario?.foto} alt="Avatar" style={styles.avatar} />
                {usuario?.nombre}
              </span>
              <button onClick={handleLogout} style={styles.btnLogout}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.link}>Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'linear-gradient(135deg, #9B6B9E 0%, #D896D8 50%, #A8C5E6 100%)',
    padding: '15px 0',
    boxShadow: '0 4px 20px rgba(155, 107, 158, 0.3)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px'
  },
  logo: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    transition: '0.3s',
    fontSize: '16px',
    fontWeight: '500',
    textShadow: '0 1px 3px rgba(0,0,0,0.2)'
  },
  usuario: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    fontWeight: '500',
    textShadow: '0 1px 3px rgba(0,0,0,0.2)'
  },
  avatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: '0 3px 10px rgba(0,0,0,0.3)'
  },
  btnLogout: {
    background: 'rgba(255,255,255,0.25)',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.4)',
    padding: '8px 20px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: '0.3s',
    backdropFilter: 'blur(10px)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  }
};
export default Navbar;