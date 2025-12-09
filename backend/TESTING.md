# 🧪 Testing del Backend

## Prueba 1: Verificar que el servidor está activo

```powershell
# PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method Get | Select-Object -ExpandProperty Content
```

Respuesta esperada:
```json
{"status":"OK","message":"Servidor backend activo","timestamp":"2025-12-08T10:30:00.000Z"}
```

---

## Prueba 2: Enviar un mensaje de contacto (SUCCESS)

```powershell
$body = @{
    email = "juan@example.com"
    subject = "Tengo una propuesta de trabajo"
    message = "Hola, me encantaría trabajar contigo en un proyecto de React. Tengo experiencia en Node.js y MongoDB también."
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/contact" `
  -Method Post `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body

$response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

Respuesta esperada:
```json
{
  "success": true,
  "message": "✓ Mensaje recibido correctamente. Te responderé pronto.",
  "messageId": "507f1f77bcf86cd799439011",
  "timestamp": "2025-12-08T10:30:00.000Z"
}
```

---

## Prueba 3: Enviar mensaje incompleto (ERROR)

```powershell
$body = @{
    email = "test@example.com"
    subject = ""  # Campo vacío
    message = "Mensaje sin asunto"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/contact" `
  -Method Post `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body -ErrorAction SilentlyContinue

$response.Content | ConvertFrom-Json | ConvertTo-Json
```

Respuesta esperada (400):
```json
{
  "success": false,
  "error": "Por favor, completa todos los campos: email, subject, message"
}
```

---

## Prueba 4: Email inválido (VALIDACIÓN ERROR)

```powershell
$body = @{
    email = "email-invalido"  # Sin @ ni dominio
    subject = "Test"
    message = "Mensaje de prueba con email inválido"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/contact" `
  -Method Post `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body -ErrorAction SilentlyContinue

$response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

Respuesta esperada (400):
```json
{
  "success": false,
  "error": "Error de validación",
  "details": [
    "Email validation failed"
  ]
}
```

---

## Prueba 5: Obtener todos los mensajes guardados

```powershell
$messages = Invoke-WebRequest -Uri "http://localhost:5000/api/messages" `
  -Method Get | Select-Object -ExpandProperty Content | ConvertFrom-Json

Write-Host "Total de mensajes: $($messages.count)"
$messages.messages | Format-Table -AutoSize
```

Respuesta esperada:
```json
{
  "success": true,
  "count": 2,
  "messages": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "email": "juan@example.com",
      "subject": "Tengo una propuesta de trabajo",
      "message": "Hola, me encantaría trabajar contigo...",
      "fecha": "2025-12-08T10:30:00.000Z",
      "ipAddress": "127.0.0.1",
      "userAgent": "Mozilla/5.0..."
    }
  ]
}
```

---

## 🔗 Testing desde el Frontend

En tu navegador, abre la consola (F12) y ejecuta:

```javascript
// Test: Enviar mensaje
async function testContact() {
  const response = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'test@example.com',
      subject: 'Mensaje desde el navegador',
      message: 'Esta es una prueba del formulario de contacto del portfolio'
    })
  });
  
  const data = await response.json();
  console.log(data);
  return data;
}

testContact();
```

---

## 📝 Usando Postman

1. **Crear nueva request:**
   - Method: `POST`
   - URL: `http://localhost:5000/api/contact`

2. **Headers:**
   ```
   Content-Type: application/json
   ```

3. **Body (raw, JSON):**
   ```json
   {
     "email": "postman@test.com",
     "subject": "Probando desde Postman",
     "message": "Este mensaje fue enviado usando Postman para verificar que el API funciona correctamente"
   }
   ```

4. **Send** → Deberías ver la respuesta success

---

## 🔍 Verificar MongoDB

### Conectar a MongoDB local:
```powershell
# Si tienes mongo instalado
mongosh
```

```javascript
// En la consola de MongoDB
use portfolio
db.messages.find().pretty()
```

### Desde MongoDB Compass (GUI):
- Descargar: https://www.mongodb.com/products/compass
- Connection String: `mongodb://localhost:27017`
- Navegar a Database `portfolio` → Collection `messages`

---

## ✅ Checklist de Validación

- [ ] GET `/api/health` retorna estado OK
- [ ] POST `/api/contact` con datos válidos guarda en BD
- [ ] POST `/api/contact` rechaza campos vacíos
- [ ] POST `/api/contact` valida formato de email
- [ ] GET `/api/messages` muestra todos los mensajes guardados
- [ ] Frontend envía fetch correctamente
- [ ] Los datos aparecen en MongoDB
- [ ] Errores se manejan gracefully (no crashes)

---

## 🚨 Errores Comunes

### Error: "Cannot connect to MongoDB"
**Solución:**
```powershell
# Verifica que MongoDB está corriendo
Get-Process mongod

# Si no está, inícialo
mongod
```

### Error: "CORS error - Access blocked"
**Solución:**
- Verifica que `FRONTEND_URL` en `.env` es correcto
- El puerto del frontend debe ser 5173 (Vite default)
- O añade la URL a la lista de CORS en `index.js`

### Error: "404 - Ruta no encontrada"
**Solución:**
- Verifica la URL exacta: `/api/contact` (no `/api/contacts`)
- Asegúrate que estás usando POST, no GET

### Error: "Port 5000 already in use"
**Solución:**
```powershell
# Busca qué proceso usa el puerto 5000
netstat -ano | findstr :5000

# Mata el proceso (reemplaza PID con el número)
taskkill /PID 1234 /F

# O cambia el puerto en .env
PORT=5001
```

---

¡Feliz testing! 🎉
