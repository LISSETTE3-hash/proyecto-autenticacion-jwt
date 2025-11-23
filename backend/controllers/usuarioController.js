const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// @desc    Crear usuario (CRUD - CREATE)
// @route   POST /api/usuarios
// @access  Private
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Validación
    if (!nombre || !email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: 'Por favor completa todos los campos'
      });
    }

    // Verificar si existe
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({
        success: false,
        mensaje: 'El email ya está registrado'
      });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptado = await bcrypt.hash(password, salt);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: passwordEncriptado,
      rol: rol || 'usuario'
    });

    res.status(201).json({
      success: true,
      mensaje: '✅ Usuario creado exitosamente',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
        foto: nuevoUsuario.foto
      }
    });
  } catch (error) {
    console.error('Error en crearUsuario:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al crear usuario',
      error: error.message
    });
  }
};

// @desc    Obtener todos los usuarios (CRUD - READ ALL)
// @route   GET /api/usuarios
// @access  Private
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      total: usuarios.length,
      usuarios
    });
  } catch (error) {
    console.error('Error en obtenerUsuarios:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener usuarios',
      error: error.message
    });
  }
};

// @desc    Obtener usuario por ID (CRUD - READ ONE)
// @route   GET /api/usuarios/:id
// @access  Private
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-password');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      usuario
    });
  } catch (error) {
    console.error('Error en obtenerUsuarioPorId:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener usuario',
      error: error.message
    });
  }
};

// @desc    Actualizar usuario (CRUD - UPDATE)
// @route   PUT /api/usuarios/:id
// @access  Private
exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombre, email, rol, activo } = req.body;

    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    // Actualizar campos
    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    usuario.rol = rol || usuario.rol;
    if (activo !== undefined) usuario.activo = activo;

    const usuarioActualizado = await usuario.save();

    res.json({
      success: true,
      mensaje: '✅ Usuario actualizado exitosamente',
      usuario: {
        id: usuarioActualizado._id,
        nombre: usuarioActualizado.nombre,
        email: usuarioActualizado.email,
        rol: usuarioActualizado.rol,
        activo: usuarioActualizado.activo
      }
    });
  } catch (error) {
    console.error('Error en actualizarUsuario:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al actualizar usuario',
      error: error.message
    });
  }
};

// @desc    Eliminar usuario (CRUD - DELETE)
// @route   DELETE /api/usuarios/:id
// @access  Private
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    await usuario.deleteOne();

    res.json({
      success: true,
      mensaje: '✅ Usuario eliminado exitosamente',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre
      }
    });
  } catch (error) {
    console.error('Error en eliminarUsuario:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al eliminar usuario',
      error: error.message
    });
  }
};