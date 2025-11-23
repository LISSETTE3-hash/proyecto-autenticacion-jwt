# 🔐 Sistema de Autenticación JWT con OAuth Google

Sistema completo de autenticación con JWT, OAuth Google y gestión de usuarios (CRUD) desarrollado con Node.js, Express, MongoDB y React.

## 🚀 Características

- ✅ Autenticación con JWT (JSON Web Tokens)
- ✅ Login con Google OAuth 2.0
- ✅ Registro tradicional (email/password)
- ✅ CRUD completo de usuarios
- ✅ Roles de usuario (usuario/admin)
- ✅ Rutas protegidas
- ✅ MongoDB para base de datos
- ✅ Interfaz moderna con React
- ✅ Diseño responsivo

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Passport.js (OAuth)
- Bcrypt.js

### Frontend
- React 18
- React Router DOM
- Axios
- CSS-in-JS

## 📦 Instalación

### Requisitos Previos
- Node.js (v14 o superior)
- MongoDB (local o Atlas)
- Cuenta de Google Cloud (para OAuth)

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/proyecto-autenticacion-jwt.git
cd proyecto-autenticacion-jwt
```

### 2. Configurar Backend
```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend/`:
```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=tu_mongodb_uri

# JWT
JWT_SECRET=tu_clave_secreta_jwt

# Google OAuth
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Configurar Frontend
```bash
cd frontend
npm install
```

Crear archivo `.env` en la carpeta `frontend/`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Ejecución en Desarrollo

### Iniciar Backend
```bash
cd backend
npm run dev
```

El servidor estará corriendo en: `http://localhost:5000`

### Iniciar Frontend
```bash
cd frontend
npm start
```

La aplicación estará disponible en: `http://localhost:3000`

## 📁 Estructura del Proyecto
```
proyecto-autenticacion-jwt/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── passport.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── usuarioController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── Usuario.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── usuarios.js
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── PrivateRoute.jsx
    │   │   └── UsuarioCard.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Usuarios.jsx
    │   │   └── AuthSuccess.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── .env
    ├── .gitignore
    └── package.json
```

## 🔐 Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita Google+ API
4. Crea credenciales OAuth 2.0
5. Agrega las URIs de redirección:
   - Desarrollo: `http://localhost:5000/api/auth/google/callback`
   - Producción: `https://tu-backend.onrender.com/api/auth/google/callback`
6. Copia el Client ID y Client Secret al archivo `.env`

## 📡 API Endpoints

### Autenticación
```
POST   /api/auth/registrar          - Registrar nuevo usuario
POST   /api/auth/login              - Iniciar sesión
GET    /api/auth/perfil             - Obtener perfil (requiere token)
GET    /api/auth/google             - Iniciar OAuth con Google
GET    /api/auth/google/callback    - Callback de Google OAuth
```

### Usuarios (requieren autenticación)
```
GET    /api/usuarios                - Obtener todos los usuarios
GET    /api/usuarios/:id            - Obtener usuario por ID
POST   /api/usuarios                - Crear usuario
PUT    /api/usuarios/:id            - Actualizar usuario
DELETE /api/usuarios/:id            - Eliminar usuario
```

## 🌐 Despliegue en Producción

### Backend (Render)

1. Crear cuenta en [Render](https://render.com)
2. Conectar repositorio de GitHub
3. Crear nuevo Web Service
4. Configurar variables de entorno
5. Desplegar

### Frontend (Vercel)

1. Crear cuenta en [Vercel](https://vercel.com)
2. Importar proyecto desde GitHub
3. Configurar variables de entorno
4. Desplegar

## 👤 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@example.com

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🙏 Agradecimientos

- Documentación de Express.js
- Documentación de React
- Documentación de MongoDB
- Comunidad de Stack Overflow