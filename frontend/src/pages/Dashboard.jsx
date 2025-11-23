import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { usuario } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <img src={usuario?.foto} alt="Avatar" style={styles.avatar} />
        <h1 style={styles.welcome}>¡Bienvenido, {usuario?.nombre}! 👋</h1>
        <p style={styles.subtitle}>Has iniciado sesión correctamente</p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.icon}>📧</div>
          <h3>Email</h3>
          <p>{usuario?.email}</p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>👤</div>
          <h3>Rol</h3>
          <p style={styles.badge}>{usuario?.rol}</p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>📅</div>
          <h3>Registrado</h3>
          <p>{new Date(usuario?.createdAt).toLocaleDateString('es-ES')}</p>
        </div>

        <div style={styles.card}>
          <div style={styles.icon}>✅</div>
          <h3>Estado</h3>
          <p style={styles.badgeSuccess}>Activo</p>
        </div>
      </div>

      <div style={styles.infoBox}>
        <h2>🎉 Sistema de Autenticación Completo</h2>
        <ul style={styles.features}>
          <li>✅ Autenticación con JWT</li>
          <li>✅ Login con Google OAuth</li>
          <li>✅ CRUD de Usuarios</li>
          <li>✅ Rutas Protegidas</li>
          <li>✅ MongoDB Atlas</li>
          <li>✅ Backend en Node.js + Express</li>
          <li>✅ Frontend en React</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    minHeight: 'calc(100vh - 70px)'
  },
  hero: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '5px solid #D896D8',
    marginBottom: '20px',
    boxShadow: '0 8px 24px rgba(216, 150, 216, 0.4)'
  },
  welcome: {
    color: '#1F2937',
    marginBottom: '10px',
    fontSize: '32px',
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#6B7280',
    fontSize: '18px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  card: {
    background: 'white',
    padding: '30px',
    borderRadius: '24px',
    boxShadow: '0 8px 24px rgba(168, 197, 230, 0.2)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    border: '2px solid rgba(216, 150, 216, 0.15)'
  },
  icon: {
    fontSize: '48px',
    marginBottom: '15px',
    filter: 'drop-shadow(0 2px 6px rgba(155, 107, 158, 0.3))'
  },
  badge: {
    background: 'linear-gradient(135deg, #D896D8 0%, #A8C5E6 100%)',
    color: 'white',
    padding: '6px 16px',
    borderRadius: '20px',
    display: 'inline-block',
    fontSize: '14px',
    marginTop: '5px',
    fontWeight: '600',
    boxShadow: '0 3px 10px rgba(216, 150, 216, 0.4)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  },
  badgeSuccess: {
    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    color: 'white',
    padding: '6px 16px',
    borderRadius: '20px',
    display: 'inline-block',
    fontSize: '14px',
    marginTop: '5px',
    fontWeight: '600',
    boxShadow: '0 3px 10px rgba(16, 185, 129, 0.4)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  },
  infoBox: {
    background: 'linear-gradient(135deg, #9B6B9E 0%, #D896D8 25%, #A8C5E6 50%, #6BBBDB 75%, #6B8FBF 100%)',
    color: 'white',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 12px 32px rgba(155, 107, 158, 0.4)'
  },
  features: {
    listStyle: 'none',
    padding: 0,
    marginTop: '20px',
    fontSize: '18px',
    lineHeight: '2',
    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
  }
};
export default Dashboard;