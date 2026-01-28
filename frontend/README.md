# 🎨 Frontend - Portfolio UI

Single-Page Application (SPA) construida con React, Vite y Tailwind CSS.

## 🚀 Quick Start

### Desarrollo Local

```bash
# 1. Instalar dependencias
cd frontend
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

App corre en: `http://localhost:5173`

---

## 📦 Estructura

```
frontend/
├── src/
│   ├── components/
│   │   └── PortfolioGame.jsx    # Componente principal
│   ├── hooks/
│   │   └── useScrollSnap.js     # Hook para scroll snap
│   ├── App.jsx                   # App moderna (default)
│   ├── App2.jsx                  # App alternativa
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Estilos globales
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🎨 2 Diseños Disponibles

### Opción 1: MODERNO (Default)
```javascript
// Usar App.jsx
✅ Dark/Light mode
✅ Profesional
✅ Para developers
```

### Opción 2: GAME DESIGN
```javascript
// Usar PortfolioGame.jsx + useScrollSnap hook
✅ Visualmente impactante
✅ Scroll snap
✅ Para game designers
```

---

## 🏗️ Cambiar de Diseño

```bash
# De Moderno a Game Design:
mv src/App.jsx src/AppModerno.jsx
mv src/App2.jsx src/App.jsx

# Revertir:
mv src/App.jsx src/App2.jsx
mv src/AppModerno.jsx src/App.jsx
```

---

## ⚙️ Configuración

### Variables de Entorno

**Desarrollo (.env.local):**
```env
VITE_BACKEND_URL=http://localhost:5000
```

**Producción (Netlify):**
- Setting → Environment → Variables
- Agregar: `VITE_BACKEND_URL=https://portfolio-backend.herokuapp.com`

### Backend Endpoint

En `App.jsx` o `PortfolioGame.jsx`:
```javascript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

fetch(`${BACKEND_URL}/api/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

---

## 🏗️ Build & Deploy

### Build Local
```bash
npm run build
# Genera: dist/
```

### Preview
```bash
npm run preview
# Ver build local
```

### Deploy en Netlify
```bash
# Opción 1: Conectar GitHub (automático)
# 1. https://netlify.app
# 2. "Add new site" → GitHub
# 3. Seleccionar repo
# 4. Build command: cd frontend && npm run build
# 5. Publish: frontend/dist

# Opción 2: CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 🔗 Conectado a Backend

### Formulario de Contacto
```javascript
POST ${BACKEND_URL}/api/contact
{
  email: "usuario@ejemplo.com",
  subject: "Asunto",
  message: "Mensaje"
}
```

### Respuesta
```json
{
  "success": true,
  "message": "✓ Mensaje recibido correctamente"
}
```

---

## 📱 Responsive

- ✅ Desktop (1920px+)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)

Probar con F12 → Toggle Device Toolbar

---

## 🎯 Personalización Rápida

### Cambiar Colores (Moderno)
```javascript
// App.jsx
color: '#65b8a6', // Cambiar aquí (Teal)
backgroundColor: '#142738' // Cambiar aquí (Azul)
```

### Cambiar Colores (Game Design)
```javascript
// PortfolioGame.jsx
<style>{`
  .skill-progress { background-color: #d10000; } // Rojo
  .text-dark-blue { color: #1e2a4a; } // Azul
`}</style>
```

### Actualizar Contenido
- Email → Buscar "XXX@XXXXXXX.COM"
- Teléfono → Buscar "XXXXXXXXXXXX"
- Proyectos → Sección "Proyectos"

---

## 📦 Dependencias Principales

```json
{
  "react": "^18.2.0",
  "vite": "^4.5.0",
  "tailwindcss": "^3.3.0",
  "lucide-react": "^0.263.1"
}
```

---

## ✅ Production Checklist

- [ ] Variables de entorno configuradas
- [ ] VITE_BACKEND_URL apunta a producción
- [ ] Build genera sin errores
- [ ] Formulario funciona
- [ ] Responsive en móvil
- [ ] Sin console errors
- [ ] Imágenes optimizadas

---

## 🚀 Deploy Checklist

- [ ] `npm run build` sin errores
- [ ] `dist/` generado correctamente
- [ ] Conectar GitHub a Netlify
- [ ] Configurar variables de entorno
- [ ] Deploy automático habilitado
- [ ] Probar en vivo
- [ ] Verificar SSL/HTTPS

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Estilos no se aplican | npm run build && npm run preview |
| Backend no conecta | Verificar VITE_BACKEND_URL |
| Build falla | npm install && npm run build |
| Formulario no envía | Ver consola (F12) para errores |
| Netlify no actualiza | Esperar 2-3 min, Ctrl+Shift+R |

---

**Creado:** Enero 2026  
**Status:** ✅ Production Ready
