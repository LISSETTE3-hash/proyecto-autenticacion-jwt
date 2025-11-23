import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { estaAutenticado, cargando } = useAuth();

  if (cargando) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <h2>Cargando...</h2>
      </div>
    );
  }

  return estaAutenticado ? children : <Navigate to="/login" replace />;
};

const styles = {
  loading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #9B6B9E 0%, #D896D8 25%, #A8C5E6 50%, #6BBBDB 75%, #6B8FBF 100%)',
    color: 'white'
  },
  spinner: {
    border: '5px solid rgba(255,255,255,0.2)',
    borderTop: '5px solid white',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  }
};
export default PrivateRoute;