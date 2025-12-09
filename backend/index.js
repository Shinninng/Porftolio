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
