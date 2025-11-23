const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Middleware para proteger rutas
const proteger = async (req, res, next) => {
  let token;

  // Verificar si existe token en headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Obtener token
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener usuario del token (sin password)
      req.usuario = await Usuario.findById(decoded.id).select('-password');

      if (!req.usuario) {
        return res.status(401).json({
          success: false,
          mensaje: 'Usuario no encontrado'
        });
      }

      // Verificar si está activo
      if (!req.usuario.activo) {
        return res.status(401).json({
          success: false,
          mensaje: 'Usuario desactivado'
        });
      }

      next();
    } catch (error) {
      console.error('Error en middleware auth:', error);
      return res.status(401).json({
        success: false,
        mensaje: 'Token no válido o expirado'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      mensaje: 'No autorizado - Token no proporcionado'
    });
  }
};

module.exports = { proteger };