# Backend - Servidor de Contacto del Portfolio

Servidor Express con MongoDB para gestionar los mensajes del formulario de contacto.

## 📋 Requisitos Previos

- Node.js v18+ instalado
- MongoDB (local o MongoDB Atlas)
- npm o yarn

## 🚀 Instalación y Configuración

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Crear archivo `.env`
Copia el contenido de `.env.example` a un nuevo archivo `.env`:

```bash
# Windows PowerShell
Copy-Item .env.example .env
```

```bash
# Linux/Mac
cp .env.example .env
```

Luego edita `.env` con tus credenciales de MongoDB (obtén la URI desde tu panel de MongoDB Atlas):

```env
MONGO_URI=mongodb+srv://TU_USUARIO:TU_CONTRASEÑA_SEGURA@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:5173
```

⚠️ **IMPORTANTE:** 
- **NUNCA** compartas tu `.env` o la URI con credenciales
- La contraseña debe ser **aleatoria y segura** (mín. 16 caracteres)
- Usa esta misma URI en `.env` local y en Render (con variables de entorno)

## 🔧 Configuración de MongoDB

### Opción A: MongoDB Local
1. Instala MongoDB Community Edition desde https://www.mongodb.com/try/download/community
2. Inicia el servicio (Windows: `mongod`)
3. En `.env` usa:
```
MONGO_URI=mongodb://localhost:27017/portfolio
```

### Opción B: MongoDB Atlas (Cloud - Recomendado)
1. Crea una cuenta en https://www.mongodb.com/cloud/atlas
2. Crea un cluster gratuito
3. **En "Database Access":** Crea un usuario con contraseña aleatoria segura
4. **En "Network Access":** Añade tu IP (o `0.0.0.0/0` para desarrollo)
5. Copia la cadena de conexión (en "Connect" → "Drivers" → "Node.js")
6. En `.env` usa (reemplaza `<username>`, `<password>`, `<cluster>`):
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portfolio?retryWrites=true&w=majority
```

⚠️ **SEGURIDAD:**
- **Contraseña:** Mínimo 16 caracteres, con mayúsculas, minúsculas, números, símbolos
- **NUNCA** commits `.env` a Git
- **NUNCA** compartas la URI con credenciales en mensajes, chats o redes sociales
- Usa `.env.example` sin credenciales para mostrar la estructura

## 🏃 Ejecutar el Servidor

### Modo Desarrollo (con nodemon - recarga automática)
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

El servidor estará disponible en: **http://localhost:5000**

## 📡 Endpoints de la API

### 1. Health Check
```http
GET /api/health
```
Respuesta:
```json
{
  "status": "OK",
  "message": "Servidor backend activo",
  "timestamp": "2025-12-08T10:30:00.000Z"
}
```

### 2. Enviar Mensaje de Contacto
```http
POST /api/contact
Content-Type: application/json

{
  "email": "usuario@example.com",
  "subject": "Título del mensaje",
  "message": "Contenido del mensaje aquí..."
}
```

**Respuesta Exitosa (201):**
```json
{
  "success": true,
  "message": "✓ Mensaje recibido correctamente. Te responderé pronto.",
  "messageId": "507f1f77bcf86cd799439011",
  "timestamp": "2025-12-08T10:30:00.000Z"
}
```

**Respuesta con Error (400):**
```json
{
  "success": false,
  "error": "Por favor, completa todos los campos: email, subject, message"
}
```

### 3. Obtener Todos los Mensajes (Para Admin/Testing)
```http
GET /api/messages
```

## 🔗 Conectar con el Frontend

En tu archivo `App.jsx`, reemplaza la función `handleSubmit` con esto:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setFormStatus('loading');
  
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      })
    });

    const data = await response.json();

    if (data.success) {
      setFormStatus('success');
      setFormData({ subject: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    } else {
      setFormStatus('error');
      console.error(data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    setFormStatus('error');
  }
};
```

## 📦 Estructura de Datos

### Schema de Mensaje (MongoDB)
```javascript
{
  email: String,          // Email del usuario (validado)
  subject: String,        // Asunto del mensaje
  message: String,        // Contenido del mensaje
  fecha: Date,            // Fecha de creación (automática)
  ipAddress: String,      // IP del usuario (para seguridad)
  userAgent: String       // User agent del navegador
}
```

## 🚀 Deploy en Render

### 1. Preparar el proyecto
```bash
git add .
git commit -m "Backend inicial"
git push
```

### 2. En Render.com
1. Crea una nueva **Web Service**
2. Conecta tu repositorio GitHub
3. Configura:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Añade variables de entorno** (en la sección "Environment"):
   - `MONGO_URI`: Tu URI completa de MongoDB Atlas (con credenciales)
   - `FRONTEND_URL`: URL de tu frontend en producción (ej: `https://miportfolio.netlify.app`)
5. Deploy

### 3. Actualizar Frontend para Producción
En tu `frontend/App.jsx` o archivo de config:

```javascript
// Para desarrollo:
const API_URL = import.meta.env.DEV 
  ? 'http://localhost:5000' 
  : import.meta.env.VITE_API_URL;

const response = await fetch(`${API_URL}/api/contact`, {
  method: 'POST',
  ...
});
```

En `frontend/.env.production`:
```
VITE_API_URL=https://tu-backend-en-render.onrender.com
```

---

## 🔐 Seguridad Completa: Render + MongoDB + Netlify

### 📋 Checklist de Seguridad

#### **1️⃣ MongoDB Atlas - Configuración Segura**
```
✅ Usuario con contraseña aleatoria (16+ caracteres)
✅ IP whitelist restrictiva (solo tu IP en desarrollo)
✅ Encriptación TLS habilitada (por defecto)
✅ Backups automáticos habilitados
✅ .env con MONGO_URI en .gitignore
✅ .env.example SIN credenciales
```

**Pasos:**
1. Ve a [MongoDB Atlas](https://cloud.mongodb.com/account/login)
2. Cluster → **Database Access** → Crea usuario nuevo
3. Contraseña: Usa generador: [Random.org](https://www.random.org/passwords/)
   - Ejemplo: `aB3$xKp9!mL2&qWe`
4. Cluster → **Network Access** → Whitelist de IPs
5. Copia URI: `mongodb+srv://usuario:contraseña@cluster...`

#### **2️⃣ Render Backend - Variables de Entorno**
```
✅ MONGO_URI almacenada en variables (no en código)
✅ FRONTEND_URL correcta (tu dominio Netlify)
✅ Environment: Production
```

**Pasos:**
1. En Render, crea **Web Service**
2. Sección **Environment** → Añade:
   ```
   MONGO_URI=mongodb+srv://usuario:contraseña@cluster...
   FRONTEND_URL=https://tu-portfolio.netlify.app
   PORT=5000
   ```
3. No hacer commit de variables al repositorio

#### **3️⃣ Netlify Frontend - Variables de Entorno**
```
✅ VITE_API_URL con URL del backend en Render
✅ BUILD command correcto
```

**Pasos:**
1. En Netlify, ve a **Site Settings** → **Build & Deploy**
2. **Environment** → Editar:
   ```
   VITE_API_URL=https://tu-backend-en-render.onrender.com
   VITE_NODE_ENV=production
   ```
3. **Build & Deploy** → **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

#### **4️⃣ CORS Seguro en Backend**
En `backend/index.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL, // Solo tu dominio
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
```

#### **5️⃣ Rate Limiting (Protege de spam)**
Instala:
```bash
npm install express-rate-limit
```

En `backend/index.js`:
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 requests
  message: 'Demasiados intentos, intenta más tarde'
});

app.post('/api/contact', limiter, async (req, res) => {
  // ... código
});
```

---

### 🔄 Flujo de Datos Seguro

```
Navegador (Usuario)
    ↓ HTTPS (encriptado)
    ↓ https://tu-portfolio.netlify.app
    ↓
Frontend (Netlify)
    ↓ Fetch a API_URL (variable de entorno)
    ↓ https://tu-backend-en-render.onrender.com
    ↓
Backend (Render)
    ├─ Valida CORS (solo acepta tu dominio Netlify)
    ├─ Valida datos del formulario
    ↓
MongoDB Atlas
    ├─ Conexión TLS encriptada
    ├─ Usuario con contraseña segura
    ├─ IP whitelist
    ↓ Almacena mensaje
```

---

### 📊 Tabla de Variables de Entorno

| Servicio | Variable | Ejemplo | ¿Pública? |
|----------|----------|---------|-----------|
| **Render** | `MONGO_URI` | `mongodb+srv://user:pass@...` | ❌ NO - Secret |
| **Render** | `FRONTEND_URL` | `https://tuportfolio.netlify.app` | ✅ SÍ |
| **Netlify** | `VITE_API_URL` | `https://tu-backend.onrender.com` | ✅ SÍ |
| **Local** | Todas las anteriores | En `.env` | ❌ NO - Solo local |

---

### 🚨 Lo que NUNCA debes hacer

```javascript
// ❌ MAL - Exponer credenciales en código
const MONGO_URI = 'mongodb+srv://user:contraseña@...';

// ✅ BIEN - Usar variables de entorno
const MONGO_URI = process.env.MONGO_URI;
```

```bash
# ❌ MAL - Hacer commit de .env
git add .env
git commit -m "Añadir credenciales"

# ✅ BIEN - Ignorar .env
echo ".env" >> .gitignore
git add .gitignore
```

```javascript
// ❌ MAL - Mostrar URI en consola
console.log('Conectando a:', process.env.MONGO_URI);

// ✅ BIEN - Solo mostrar parte de la información
console.log('✓ Conectado a MongoDB (URI oculta por seguridad)');
```

---

## 🐛 Troubleshooting

**Error: MONGO_URI no está definida**
- Verifica que `.env` existe y tiene `MONGO_URI`
- Ejecuta: `node -e "console.log(process.env.MONGO_URI)"`

**Error: Cannot connect to MongoDB**
- Comprueba que MongoDB está ejecutándose
- Verifica la URI en `.env`
- Comprueba credenciales de MongoDB Atlas

**CORS Error**
- Asegúrate que `FRONTEND_URL` en `.env` coincide con tu frontend
- El puerto por defecto es 5173 para Vite

## 📝 Licencia
ISC
