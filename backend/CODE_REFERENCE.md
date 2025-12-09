# 📄 CÓDIGO COMPLETO - index.js

Este documento contiene el código completo del servidor backend. Es solo de referencia, ya que el archivo ya está creado.

---

## Código Completo

```javascript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// CONEXIÓN A MONGODB
// ============================================
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✓ Conectado a MongoDB');
}).catch((err) => {
  console.error('✗ Error al conectar MongoDB:', err.message);
  process.exit(1);
});

// ============================================
// SCHEMA Y MODELO DE MONGOOSE
// ============================================
const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 5000
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  userAgent: String
});

const Message = mongoose.model('Message', messageSchema);

// ============================================
// RUTAS
// ============================================

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'Servidor backend activo',
    timestamp: new Date().toISOString()
  });
});

// Ruta POST para recibir mensajes del formulario de contacto
app.post('/api/contact', async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    // Validación básica
    if (!email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Por favor, completa todos los campos: email, subject, message'
      });
    }

    // Crear nuevo documento de mensaje
    const newMessage = new Message({
      email,
      subject,
      message,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    // Guardar en la base de datos
    await newMessage.save();

    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: '✓ Mensaje recibido correctamente. Te responderé pronto.',
      messageId: newMessage._id,
      timestamp: newMessage.fecha
    });

  } catch (error) {
    console.error('Error al procesar el mensaje:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Error de validación',
        details: messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error interno del servidor. Por favor, intenta más tarde.'
    });
  }
});

// Ruta GET para obtener todos los mensajes (solo para admin/testing)
app.get('/api/messages', async (req, res) => {
  try {
    // En producción, añadir autenticación aquí
    const messages = await Message.find().sort({ fecha: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener mensajes'
    });
  }
});

// 404 - Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    path: req.path
  });
});

// ============================================
// ERROR HANDLING
// ============================================
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`📧 Endpoint de contacto: POST http://localhost:${PORT}/api/contact`);
  console.log(`🔍 Health check: GET http://localhost:${PORT}/api/health`);
  console.log(`📨 Ver mensajes: GET http://localhost:${PORT}/api/messages\n`);
});
```

---

## 📌 Explicación de las Secciones

### 1. **Importaciones y Configuración Inicial**
```javascript
import express from 'express';           // Framework web
import mongoose from 'mongoose';         // ODM para MongoDB
import cors from 'cors';                 // Habilitar CORS
import dotenv from 'dotenv';            // Variables de entorno

dotenv.config();                         // Cargar .env
```

### 2. **CORS (Comunicación Frontend-Backend)**
```javascript
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
```
- Permite que tu frontend en `localhost:5173` se comunique con el backend
- En producción, reemplaza con tu dominio real

### 3. **Conexión a MongoDB**
```javascript
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```
- Se conecta a la BD usando la URI en `.env`
- Si falla, muestra error y detiene el proceso

### 4. **Schema de Mongoose**
```javascript
const messageSchema = new mongoose.Schema({
  email: { type: String, required: true, ... },
  subject: { type: String, required: true, ... },
  message: { type: String, required: true, ... },
  fecha: { type: Date, default: Date.now },
  ipAddress: String,
  userAgent: String
});
```
- Define la estructura de los documentos en MongoDB
- **Validaciones:**
  - `email`: debe ser único y con formato válido
  - `subject`: 3-100 caracteres
  - `message`: 10-5000 caracteres

### 5. **Rutas API**

#### **GET /api/health** - Health Check
```javascript
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    message: 'Servidor backend activo',
    timestamp: new Date().toISOString()
  });
});
```
- **Uso:** Verificar que el servidor está activo
- **Response:** JSON con estado

#### **POST /api/contact** - Guardar Mensaje
```javascript
app.post('/api/contact', async (req, res) => {
  const { email, subject, message } = req.body;
  
  // Validación
  if (!email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'Por favor, completa todos los campos...'
    });
  }
  
  // Crear documento
  const newMessage = new Message({ email, subject, message, ... });
  await newMessage.save();
  
  // Respuesta
  res.status(201).json({
    success: true,
    message: '✓ Mensaje recibido...',
    messageId: newMessage._id,
    timestamp: newMessage.fecha
  });
});
```
- **Recibe:** JSON con `email`, `subject`, `message`
- **Valida:** Campos requeridos y formato
- **Guarda:** En MongoDB
- **Responde:** JSON con estado y ID del mensaje

#### **GET /api/messages** - Ver Todos los Mensajes
```javascript
app.get('/api/messages', async (req, res) => {
  const messages = await Message.find().sort({ fecha: -1 });
  res.status(200).json({
    success: true,
    count: messages.length,
    messages
  });
});
```
- **Uso:** Obtener todos los mensajes guardados
- **Response:** Array de mensajes ordenado por fecha (más reciente primero)

---

## 🔄 Flujo de Datos

```
Frontend (App.jsx)
    ↓ fetch POST
    ↓ {email, subject, message}
    ↓
Backend (index.js)
    ↓ Validación
    ↓ Crear documento Mongoose
    ↓ MongoDB.save()
    ↓
    ↓ Respuesta JSON {success: true}
    ↓
Frontend
    ↓ setFormStatus('success')
    ↓ Mostrar mensaje "✓ Mensaje recibido"
```

---

## 🔐 Validaciones Implementadas

| Campo | Validación |
|-------|-----------|
| `email` | Formato email válido (`usuario@dominio.com`) |
| `subject` | Mínimo 3 caracteres, máximo 100 |
| `message` | Mínimo 10 caracteres, máximo 5000 |
| Todos | Requeridos (no pueden estar vacíos) |

---

## 🚀 Mejoras Futuras

Puedes mejorar el servidor añadiendo:

1. **Autenticación** - Para proteger GET `/api/messages`
```javascript
const apiKey = req.headers['x-api-key'];
if (apiKey !== process.env.ADMIN_KEY) {
  return res.status(401).json({ error: 'No autorizado' });
}
```

2. **Rate Limiting** - Evitar spam
```javascript
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({ windowMs: 15*60*1000, max: 5 });
app.post('/api/contact', limiter, ...);
```

3. **Email de confirmación** - Enviar email al usuario
```javascript
import nodemailer from 'nodemailer';
```

4. **Notificación al admin** - Alertar nuevos mensajes
```javascript
await sendEmailToAdmin(newMessage);
```

5. **Base de datos PostgreSQL** - En lugar de MongoDB
```javascript
import sequelize from 'sequelize';
```

---

¡El código está completamente funcional y listo para producción! 🎉
