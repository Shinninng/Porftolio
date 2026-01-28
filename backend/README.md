# 🔧 Backend - Portfolio API

API REST para gestionar mensajes de contacto desde el formulario del portfolio.

## 🚀 Quick Start

### Desarrollo Local

```bash
# 1. Instalar dependencias
cd backend
npm install

# 2. Crear .env con MongoDB local
# (Ver .env.example para producción)
echo "MONGO_URI=mongodb://localhost:27017/portfolio" > .env
echo "PORT=5000" >> .env
echo "FRONTEND_URL=http://localhost:5173" >> .env

# 3. Iniciar servidor
npm run dev
```

Backend corre en: `http://localhost:5000`

---

## 📦 Dependencias

- **express** - Framework web
- **mongoose** - ODM MongoDB
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Gestión de variables de entorno

---

## 🔌 Endpoints

### Health Check
```
GET /api/health
```
Verifica que el servidor está activo.

**Respuesta:**
```json
{
  "status": "OK",
  "message": "Servidor backend activo",
  "timestamp": "2026-01-27T..."
}
```

### Enviar Mensaje
```
POST /api/contact
```
Recibe y guarda mensajes de contacto en MongoDB.

**Request:**
```json
{
  "email": "usuario@ejemplo.com",
  "subject": "Colaboración",
  "message": "Me gustaría trabajar contigo..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "✓ Mensaje recibido correctamente. Te responderé pronto.",
  "messageId": "...",
  "timestamp": "2026-01-27T..."
}
```

### Ver Mensajes
```
GET /api/messages
```
Obtiene todos los mensajes guardados (solo desarrollo).

---

## 🗄️ MongoDB

### Local Development
```bash
# Instalar MongoDB Community
# https://www.mongodb.com/try/download/community

# Iniciar servicio MongoDB
mongod

# Verificar conexión
mongo mongodb://localhost:27017/portfolio
```

### Producción (MongoDB Atlas)
1. Crear cuenta: https://www.mongodb.com/cloud/atlas
2. Crear cluster gratuito
3. Obtener connection string: `mongodb+srv://usuario:pass@cluster...`
4. Actualizar `.env` en producción

---

## 🌐 Deploy

### Opción 1: Heroku
```bash
# Instalar Heroku CLI
# Crear app
heroku create portfolio-backend

# Agregar variables de entorno
heroku config:set MONGO_URI="mongodb+srv://..."
heroku config:set FRONTEND_URL="https://..."

# Deploy
git push heroku main
```

### Opción 2: Railway
1. Conectar GitHub
2. Seleccionar repository
3. Agregar variables de entorno
4. Deploy automático

### Opción 3: Render
1. Crear servicio web
2. Conectar GitHub
3. Start command: `npm install && npm start`
4. Agregar variables
5. Deploy

---

## 🔐 Variables de Entorno

```env
# Base de datos
MONGO_URI=mongodb+srv://usuario:contraseña@cluster...

# Servidor
PORT=5000

# CORS - URL del frontend
FRONTEND_URL=https://tunombre.netlify.app
```

---

## 📊 Schema MongoDB

### Message Collection
```javascript
{
  _id: ObjectId,
  email: String (required, validado),
  subject: String (required, 3-100 chars),
  message: String (required, 10-5000 chars),
  fecha: Date (default: now),
  ipAddress: String,
  userAgent: String
}
```

---

## ✅ Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Enviar Mensaje
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ejemplo.com",
    "subject": "Test",
    "message": "Este es un mensaje de prueba"
  }'
```

### Ver Mensajes
```bash
curl http://localhost:5000/api/messages
```

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| "Cannot connect to MongoDB" | Verificar MongoDB está corriendo, MONGO_URI es correcta |
| "CORS error" | FRONTEND_URL no coincide, verificar dominio exacto |
| "Validation error" | Email/subject/message no cumplen requisitos |
| "Port already in use" | Cambiar PORT o matar proceso en ese puerto |

---

## 📝 Notas de Seguridad

En producción:
- ✅ Usar HTTPS solo
- ✅ Validar todos los inputs
- ✅ Rate limiting en endpoints
- ✅ No exponer MONGO_URI en cliente
- ✅ Autenticación para GET /api/messages

---

## 🚀 Production Checklist

- [ ] Usar MongoDB Atlas (cloud)
- [ ] Variables de entorno configuradas
- [ ] FRONTEND_URL actualizada
- [ ] CORS configurado correctamente
- [ ] Deploy en servidor (Heroku/Railway/Render)
- [ ] Health check funcionando
- [ ] Formulario enviando correctamente
- [ ] Mensajes guardándose en BD

---

**Creado:** Enero 2026  
**Status:** ✅ Production Ready
