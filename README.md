# Portfolio de RekCutPleh

Este es el repositorio del código fuente de mi portafolio personal, una single-page application (SPA) diseñada para mostrar mis proyectos, habilidades y permitir el contacto de una manera moderna y fluida.

## Descripción

El sitio está construido desde cero utilizando tecnologías web modernas, con un fuerte enfoque en las animaciones, la experiencia de usuario y un diseño limpio. Cuenta con transiciones suaves entre secciones, un sistema de temas claro/oscuro y un formulario de contacto completo con validación y persistencia en base de datos.

## Características Principales

- **Single-Page Application (SPA):** Navegación fluida sin recargas de página, gestionada con GSAP.
- **Diseño Responsivo:** Totalmente adaptable a dispositivos de escritorio y móviles.
- **Animaciones Avanzadas:** Transiciones de página y animaciones de entrada de componentes creadas con la librería GSAP (GreenSock Animation Platform).
- **Temas Claro y Oscuro:** Interruptor de tema para la preferencia del usuario, con persistencia en el almacenamiento local.
- **Formulario de Contacto Completo:** Sistema de contacto con validación, que se comunica con un servidor backend Express.js para guardar los mensajes en MongoDB.
- **Optimización y Seguridad:** Implementación de validaciones tanto en cliente como en servidor, CORS configurado y manejo seguro de errores.

## Tecnologías Utilizadas

### Frontend
- **Lenguajes:** HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS:** Tailwind CSS
- **Animaciones:** GSAP (ScrollTrigger, ScrollToPlugin)
- **Build Tool:** Vite

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de Datos:** MongoDB (Local o Atlas)
- **ODM:** Mongoose
- **Middlewares:** CORS, Dotenv

### Despliegue
- **Frontend:** Netlify o similar
- **Backend:** Render, Heroku, o tu servidor preferido

---

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js v18+
- npm o yarn
- MongoDB (local o MongoDB Atlas)

### Instalación

#### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd Portfolio
```

#### 2. Configurar Backend
```powershell
cd backend
npm install
```

Crear archivo `.env` con tu configuración de MongoDB:
```env
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/portfolio
PORT=5000
FRONTEND_URL=http://localhost:5173
```

#### 3. Configurar Frontend
```powershell
cd ../frontend
npm install
```

#### 4. Ejecutar Desarrollo

Terminal 1 - Backend:
```powershell
cd backend
npm run dev
```

Terminal 2 - Frontend:
```powershell
cd frontend
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Documentación
- **Backend:** Ver [backend/README.md](./backend/README.md) para más detalles sobre la instalación, endpoints de API y configuración de MongoDB.
- **Código:** Ver [backend/CODE_REFERENCE.md](./backend/CODE_REFERENCE.md) para entender la estructura del servidor.
- **Testing:** Ver [backend/TESTING.md](./backend/TESTING.md) para pruebas de la API.

---

## 📁 Estructura del Proyecto

```
Portfolio/
├── frontend/                 # Aplicación React + Vite
│   ├── src/
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Servidor Express.js
│   ├── index.js             # Código principal
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── README.md                # Este archivo
```

---

&copy; 2025 RekCutPleh. Todos los derechos reservados.

El código y los diseños de este repositorio son propiedad intelectual de RekCutPleh. Se permite la visualización del código con fines educativos y de referencia. No se permite la copia, distribución o uso comercial del código o de los activos de diseño sin permiso explícito y por escrito del autor.