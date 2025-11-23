import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    verificarAuth();
  }, []);

  const verificarAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await authAPI.obtenerPerfil();
        setUsuario(response.data.usuario);
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        localStorage.removeItem('token');
      }
    }
    setCargando(false);
  };

  const login = async (datos) => {
    const response = await authAPI.login(datos);
    localStorage.setItem('token', response.data.token);
    setUsuario(response.data.usuario);
    return response.data;
  };

  const registrar = async (datos) => {
    const response = await authAPI.registrar(datos);
    localStorage.setItem('token', response.data.token);
    setUsuario(response.data.usuario);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  const value = {
    usuario,
    login,
    registrar,
    logout,
    cargando,
    estaAutenticado: !!usuario
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};