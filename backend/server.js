require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const conectarDB = require('./config/db');

const app = express();

// Conectar a MongoDB
conectarDB();

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar sesión para Passport
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
  })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    success: true,
    mensaje: '🚀 API de Autenticación JWT funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      autenticacion: '/api/auth',
      usuarios: '/api/usuarios'
    }
  });
});

// Ruta para verificar estado
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    mensaje: 'Servidor funcionando',
    timestamp: new Date().toISOString()
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    mensaje: 'Ruta no encontrada'
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    mensaje: 'Error en el servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║  🚀 Servidor corriendo en puerto ${PORT}  ║
  ║  📡 Modo: ${process.env.NODE_ENV}           ║
  ║  🌐 URL: http://localhost:${PORT}       ║
  ╚══════════════════════════════════════╝
  `);
});