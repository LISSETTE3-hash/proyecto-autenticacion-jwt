import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      
      // Esperar un momento y redirigir
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.loader}></div>
      <h2 style={styles.title}>Autenticando con Google...</h2>
      <p style={styles.text}>Espera un momento...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #9B6B9E 0%, #D896D8 25%, #A8C5E6 50%, #6BBBDB 75%, #6B8FBF 100%)',
    color: 'white'
  },
  loader: {
    border: '5px solid rgba(255,255,255,0.2)',
    borderTop: '5px solid white',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
    fontWeight: 'bold',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  text: {
    fontSize: '16px',
    opacity: 0.9
  }
};
export default AuthSuccess;