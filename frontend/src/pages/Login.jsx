import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const Login = () => {
  const [datos, setDatos] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      await login(datos);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.mensaje || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = authAPI.loginGoogle();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔐 Iniciar Sesión</h1>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={datos.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={datos.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          
          <button 
            type="submit" 
            disabled={cargando}
            style={styles.btnPrimary}
          >
            {cargando ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={styles.divider}>O</div>

        <button onClick={handleGoogleLogin} style={styles.btnGoogle}>
          🔑 Continuar con Google
        </button>

        <p style={styles.linkText}>
          ¿No tienes cuenta? <Link to="/register" style={styles.link}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #9B6B9E 0%, #D896D8 25%, #A8C5E6 50%, #6BBBDB 75%, #6B8FBF 100%)',
    padding: '20px'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '28px',
    boxShadow: '0 20px 60px rgba(155, 107, 158, 0.4)',
    maxWidth: '450px',
    width: '100%',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(255,255,255,0.5)'
  },
  title: {
    textAlign: 'center',
    background: 'linear-gradient(135deg, #9B6B9E 0%, #D896D8 50%, #6BBBDB 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '30px',
    fontSize: '32px',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '14px',
    border: '2px solid #E8D5F0',
    borderRadius: '14px',
    fontSize: '16px',
    transition: '0.3s',
    outline: 'none',
    backgroundColor: '#FEFBFF'
  },
  btnPrimary: {
  background: 'linear-gradient(135deg, #D896D8 0%, #A8C5E6 50%, #6BBBDB 100%)',
  color: '#1F2937',  // ← Color oscuro en lugar de blanco
  border: 'none',
  padding: '14px',
  borderRadius: '14px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: '0.3s',
  fontWeight: 'bold',
  boxShadow: '0 6px 20px rgba(216, 150, 216, 0.4)'
},
  btnGoogle: {
    background: '#FFFFFF',
    color: '#9B6B9E',
    border: '2px solid #D896D8',
    padding: '14px',
    borderRadius: '14px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
    fontWeight: 'bold',
    transition: '0.3s',
    boxShadow: '0 4px 15px rgba(216, 150, 216, 0.25)'
  },
  error: {
    background: '#FEE2E2',
    color: '#DC2626',
    padding: '12px',
    borderRadius: '12px',
    marginBottom: '15px',
    textAlign: 'center',
    border: '1px solid #FCA5A5'
  },
  divider: {
    textAlign: 'center',
    margin: '20px 0',
    color: '#9B6B9E',
    fontSize: '14px',
    fontWeight: '500'
  },
  linkText: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#6B7280'
  },
  link: {
    color: '#9B6B9E',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};
export default Login;