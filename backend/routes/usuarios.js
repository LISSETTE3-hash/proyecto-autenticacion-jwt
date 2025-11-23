const express = require('express');
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/usuarioController');
const { proteger } = require('../middleware/auth');

// Todas las rutas están protegidas con JWT
router.post('/', proteger, crearUsuario);
router.get('/', proteger, obtenerUsuarios);
router.get('/:id', proteger, obtenerUsuarioPorId);
router.put('/:id', proteger, actualizarUsuario);
router.delete('/:id', proteger, eliminarUsuario);

module.exports = router;