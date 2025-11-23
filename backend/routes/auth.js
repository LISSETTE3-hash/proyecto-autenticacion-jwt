const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
  registrar,
  login,
  obtenerPerfil
} = require('../controllers/authController');
const { proteger } = require('../middleware/auth');

// Rutas tradicionales
router.post('/registrar', registrar);
router.post('/login', login);
router.get('/perfil', proteger, obtenerPerfil);

// Rutas de Google OAuth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false
  }),
  (req, res) => {
    // Generar JWT para el usuario de Google
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    // Redirigir al frontend con el token
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
  }
);

module.exports = router;