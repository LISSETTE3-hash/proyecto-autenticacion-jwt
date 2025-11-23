const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generar JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Token válido por 30 días
  });
};

// @desc    Registrar nuevo usuario
// @route   POST /api/auth/registrar
// @access  Public
exports.registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Validación de campos
    if (!nombre || !email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: 'Por favor completa todos los campos'
      });
    }

    // Verificar si el usuario ya existe
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
    const usuario = await Usuario.create({
      nombre,
      email,
      password: passwordEncriptado
    });

    // Generar token
    const token = generarToken(usuario._id);

    res.status(201).json({
      success: true,
      mensaje: '✅ Usuario registrado exitosamente',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        foto: usuario.foto,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error en registrar:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al registrar usuario',
      error: error.message
    });
  }
};

// @desc    Login de usuario
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación de campos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: 'Por favor ingresa email y contraseña'
      });
    }

    // Buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({
        success: false,
        mensaje: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) {
      return res.status(401).json({
        success: false,
        mensaje: 'Credenciales inválidas'
      });
    }

    // Verificar si está activo
    if (!usuario.activo) {
      return res.status(401).json({
        success: false,
        mensaje: 'Usuario desactivado. Contacta al administrador'
      });
    }

    // Generar token
    const token = generarToken(usuario._id);

    res.json({
      success: true,
      mensaje: '✅ Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        foto: usuario.foto,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al iniciar sesión',
      error: error.message
    });
  }
};

// @desc    Obtener perfil del usuario autenticado
// @route   GET /api/auth/perfil
// @access  Private
exports.obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');

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
    console.error('Error en obtenerPerfil:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener perfil',
      error: error.message
    });
  }
};