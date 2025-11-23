const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email no válido']
    },
    password: {
      type: String,
      required: function() {
        return !this.googleId; // Requerido solo si no es usuario de Google
      },
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    foto: {
      type: String,
      default: 'https://ui-avatars.com/api/?name=Usuario&background=667eea&color=fff&size=200'
    },
    rol: {
      type: String,
      enum: ['usuario', 'admin'],
      default: 'usuario'
    },
    activo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // createdAt, updatedAt automáticos
  }
);

module.exports = mongoose.model('Usuario', usuarioSchema);