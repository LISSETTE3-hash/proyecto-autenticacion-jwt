import React from 'react';

const UsuarioCard = ({ usuario, onEliminar, onEditar }) => {
  return (
    <div style={styles.card}>
      <img src={usuario.foto} alt={usuario.nombre} style={styles.avatar} />
      <h3 style={styles.nombre}>{usuario.nombre}</h3>
      <p style={styles.email}>{usuario.email}</p>
      <span style={styles.badge}>{usuario.rol}</span>
      <span style={usuario.activo ? styles.badgeActivo : styles.badgeInactivo}>
        {usuario.activo ? '✅ Activo' : '❌ Inactivo'}
      </span>
      
      <div style={styles.actions}>
        <button 
          onClick={() => onEditar(usuario)}
          style={styles.btnEdit}
        >
          ✏️ Editar
        </button>
        
        <button 
          onClick={() => onEliminar(usuario._id)}
          style={styles.btnDelete}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: 'white',
    padding: '30px',
    borderRadius: '24px',
    boxShadow: '0 8px 24px rgba(168, 197, 230, 0.2)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    border: '2px solid rgba(216, 150, 216, 0.15)'
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '15px',
    border: '4px solid #D896D8',
    boxShadow: '0 4px 12px rgba(216, 150, 216, 0.4)'
  },
  nombre: {
    color: '#1F2937',
    marginBottom: '5px',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  email: {
    color: '#6B7280',
    fontSize: '14px',
    marginBottom: '10px'
  },
  badge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #9B6B9E 0%, #D896D8 100%)',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '12px',
    margin: '5px',
    fontWeight: '600',
    boxShadow: '0 3px 10px rgba(155, 107, 158, 0.4)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  },
  badgeActivo: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '12px',
    margin: '5px',
    fontWeight: '600',
    boxShadow: '0 3px 10px rgba(16, 185, 129, 0.4)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  },
  badgeInactivo: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '12px',
    margin: '5px',
    fontWeight: '600',
    boxShadow: '0 3px 10px rgba(239, 68, 68, 0.4)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  },
  actions: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'center'
  },
  btnEdit: {
    background: 'linear-gradient(135deg, #6BBBDB 0%, #6B8FBF 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: '0.3s',
    boxShadow: '0 4px 12px rgba(107, 187, 219, 0.4)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  },
  btnDelete: {
    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: '0.3s',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  }
};

export default UsuarioCard;