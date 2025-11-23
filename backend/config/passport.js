const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/Usuario');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Buscar usuario existente por Google ID
        let usuario = await Usuario.findOne({ googleId: profile.id });

        if (usuario) {
          // Usuario ya existe
          return done(null, usuario);
        }

        // Verificar si el email ya existe (sin Google ID)
        usuario = await Usuario.findOne({ email: profile.emails[0].value });

        if (usuario) {
          // Asociar cuenta de Google con usuario existente
          usuario.googleId = profile.id;
          usuario.foto = profile.photos[0].value;
          await usuario.save();
          return done(null, usuario);
        }

        // Crear nuevo usuario con Google
        usuario = await Usuario.create({
          googleId: profile.id,
          nombre: profile.displayName,
          email: profile.emails[0].value,
          foto: profile.photos[0].value
        });

        done(null, usuario);
      } catch (error) {
        console.error('Error en Google Strategy:', error);
        done(error, null);
      }
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await Usuario.findById(id);
    done(null, usuario);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;