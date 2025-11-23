import React, { useEffect, useState } from 'react';
import { usuariosAPI } from '../services/api';
import UsuarioCard from '../components/UsuarioCard';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [modalEditar, setModalEditar] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rol: 'usuario',
    activo: true
  });

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await usuariosAPI.obtenerTodos();
      setUsuarios(response.data.usuarios);
    } catch (error) {
      setError('Error al cargar usuarios');
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarUsuario = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await usuariosAPI.eliminar(id);
        setUsuarios(usuarios.filter(u => u._id !== id));
        alert('✅ Usuario eliminado exitosamente');
      } catch (error) {
        alert('❌ Error al eliminar usuario');
        console.error(error);
      }
    }
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setFormData({
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      activo: usuario.activo
    });
    setModalEditar(true);
  };

  const cerrarModal = () => {
    setModalEditar(false);
    setUsuarioEditando(null);
    setFormData({
      nombre: '',
      email: '',
      rol: 'usuario',
      activo: true
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await usuariosAPI.actualizar(usuarioEditando._id, formData);
      
      // Actualizar la lista de usuarios
      setUsuarios(usuarios.map(u => 
        u._id === usuarioEditando._id 
          ? { ...u, ...formData }
          : u
      ));
      
      alert('✅ Usuario actualizado exitosamente');
      cerrarModal();
    } catch (error) {
      alert('❌ Error al actualizar usuario');
      console.error(error);
    }
  };

  if (cargando) {
    return <div style={styles.loading}>
      <div style={styles.spinner}></div>
      <h2>Cargando usuarios...</h2>
    </div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👥 Gestión de Usuarios</h1>
      <p style={styles.count}>Total: <strong>{usuarios.length}</strong> usuarios registrados</p>

      {usuarios.length === 0 ? (
        <div style={styles.empty}>
          <h2>📭 No hay usuarios registrados</h2>
          <p>Regístrate para ver usuarios en el sistema</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {usuarios.map(usuario => (
            <UsuarioCard
              key={usuario._id}
              usuario={usuario}
              onEliminar={eliminarUsuario}
              onEditar={abrirModalEditar}
            />
          ))}
        </div>
      )}

      {/* Modal de Edición */}
      {modalEditar && (
        <div style={styles.modalOverlay} onClick={cerrarModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>✏️ Editar Usuario</h2>
            
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Rol:</label>
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="usuario">Usuario</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="activo"
                    checked={formData.activo}
                    onChange={handleChange}
                    style={styles.checkbox}
                  />
                  Usuario activo
                </label>
              </div>

              <div style={styles.modalButtons}>
                <button type="submit" style={styles.btnSave}>
                  💾 Guardar Cambios
                </button>
                <button type="button" onClick={cerrarModal} style={styles.btnCancel}>
                  ❌ Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
  title: {
    textAlign: 'center',
    background: 'linear-gradient(135deg, #9B6B9E 0%, #D896D8 50%, #6BBBDB 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '10px',
    fontSize: '32px',
    fontWeight: 'bold'
  },
  count: {
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: '30px',
    fontSize: '18px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 70px)',
    color: '#6B7280'
  },
  spinner: {
    border: '5px solid #F3E8FF',
    borderTop: '5px solid #D896D8',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },
  error: {
    textAlign: 'center',
    padding: '50px',
    color: '#EF4444',
    fontSize: '18px',
    minHeight: 'calc(100vh - 70px)'
  },
  empty: {
    textAlign: 'center',
    padding: '50px',
    color: '#6B7280',
    minHeight: 'calc(100vh - 70px)'
  },
  
  // Estilos del Modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    background: 'white',
    padding: '40px',
    borderRadius: '24px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(155, 107, 158, 0.4)',
    border: '2px solid rgba(216, 150, 216, 0.3)'
  },
  modalTitle: {
    textAlign: 'center',
    background: 'linear-gradient(135deg, #9B6B9E 0%, #D896D8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    color: '#374151',
    fontWeight: '600',
    fontSize: '14px'
  },
  input: {
    padding: '12px',
    border: '2px solid #E8D5F0',
    borderRadius: '12px',
    fontSize: '16px',
    transition: '0.3s',
    outline: 'none',
    backgroundColor: '#FEFBFF'
  },
  select: {
    padding: '12px',
    border: '2px solid #E8D5F0',
    borderRadius: '12px',
    fontSize: '16px',
    transition: '0.3s',
    outline: 'none',
    backgroundColor: '#FEFBFF',
    cursor: 'pointer'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#374151',
    fontSize: '16px',
    cursor: 'pointer'
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  modalButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  btnSave: {
    flex: 1,
    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  },
  btnCancel: {
    flex: 1,
    background: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
    boxShadow: '0 4px 12px rgba(107, 114, 128, 0.4)',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  }
};

export default Usuarios;