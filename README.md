# Portfolio - Tiziano Flores

Portfolio personal completamente funcional con HTML, JavaScript y Tailwind CSS.

## ✨ Características

✅ **Scroll Snapping** - Navegación automática entre secciones al hacer scroll
✅ **Modo Oscuro** - Toggle tema oscuro/claro con persistencia en localStorage
✅ **Detección de Sección** - Los links del menú se colorean según la sección actual
✅ **Formulario Inteligente** - Animación de carga y mensajes de éxito/error
✅ **FAQ Accordion** - Preguntas expandibles y contraíbles suavemente
✅ **100% Responsivo** - Menú hamburguesa en móviles, layout adaptable
✅ **Sin Build Tools** - Solo HTML, CSS y JavaScript vanilla

## 📁 Estructura

```
frontend/
├── index.html      ← Todo el sitio en un archivo
├── _redirects      ← Configuración para Netlify (SPA routing)
└── ...
```

## 🚀 Cómo Usar

### Localmente
1. Abre `frontend/index.html` en tu navegador
2. ¡Listo! El sitio funciona sin necesidad de servidor

### Desarrollo
Si quieres un servidor local:
```bash
# Usando Python
python -m http.server 8000

# O usando Node.js http-server
npm install -g http-server
http-server frontend
```

## 📤 Desplegar en Netlify

### Opción 1: Vía GitHub (Recomendado)

1. **Sube a GitHub:**
```bash
cd d:\Web\Porftolio
git add .
git commit -m "Portfolio estático HTML/JS/CSS"
git push origin main
```

2. **Conecta en Netlify:**
   - Ve a [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Selecciona GitHub y busca tu repo "Porftolio"
   - Build command: (dejar vacío o `echo 'Static site'`)
   - Publish directory: `frontend`
   - Deploy!

### Opción 2: Drag & Drop

1. Comprime la carpeta `frontend`
2. Ve a [netlify.com](https://netlify.com)
3. Arrastra y suelta el archivo ZIP
4. ¡Listo!

### Opción 3: Terminal (Netlify CLI)

```bash
npm install -g netlify-cli
cd d:\Web\Porftolio
netlify deploy --prod --dir=frontend
```

## 🎨 Personalizar

### Cambiar Nombre
En `index.html`, busca:
```html
<h1>Tiziano Flores</h1>
<p>Game & Narrative Designer</p>
```

### Cambiar Proyectos
Busca la sección `<!-- Proyecto 1 -->` y actualiza:
- Título
- Descripción
- Tecnologías (tags)
- Enlaces

### Cambiar Colores
Busca en `<style>`:
```javascript
colors: {
    'custom-gray': '#e2e5f0',
    'dark-bg': '#1a1a1a',
    'dark-card': '#2d2d2d',
    'dark-blue': '#1e2a4a',
}
```

### Agregar Redes Sociales
En la sección FAQ, busca "Social Links":
```html
<a href="https://linkedin.com/in/tunombre" target="_blank">
    <i class="fab fa-linkedin"></i>
</a>
```

## 🔌 Conectar Backend

El formulario tiene una simulación de 2 segundos. Para conectar con un backend real:

En la función `handleSubmit()`, reemplaza:
```javascript
// Esto:
await new Promise(resolve => setTimeout(resolve, 2000));

// Por esto:
const response = await fetch('https://tu-backend.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        nombre: form.nombre.value,
        email: form.email.value,
        asunto: form.asunto.value,
        mensaje: form.mensaje.value
    })
});

if (!response.ok) throw new Error('Error en el envío');
```

## 📋 Checklist Pre-Deploy

- [ ] Cambié nombre y título
- [ ] Actualicé descripción sobre mi
- [ ] Agregué mis proyectos reales
- [ ] Personalicé el FAQ
- [ ] Agregué mis redes sociales
- [ ] Probé en móvil (F12)
- [ ] Probé todos los botonos y links
- [ ] Probé el modo oscuro
- [ ] Probé el formulario

## 🆘 Solucionar Problemas

**P: Ver página en blanco o error 404**
A: 
- Asegúrate que el archivo `_redirects` existe en `frontend/`
- En Netlify, verifica que "Publish directory" es `frontend`
- Espera a que el deploy termine (debe decir "Published")
- Haz hard refresh: `Ctrl+Shift+R`

**P: Los estilos no se ven**
A: 
- Tailwind está vía CDN, necesita internet
- Abre la consola (F12) para ver si hay errores

**P: El formulario no funciona**
A:
- Está simulado por ahora (2 segundos)
- Para enviar realmente, conecta con tu backend siguiendo la sección "Conectar Backend"

## 🎯 Ventajas de esta Estructura

✅ Sin dependencias npm (salvo Tailwind CDN)
✅ Super rápido de cargar
✅ Fácil de mantener y actualizar
✅ Perfecto para portfolios estáticos
✅ SEO amigable
✅ Funciona offline (excepto Tailwind CDN)

## 📞 Soporte

Si necesitas ayuda:
1. Abre la consola del navegador (F12)
2. Busca mensajes de error
3. Verifica que todos los links sean correctos
4. Prueba en un navegador diferente

¡Listo! Tu portfolio está listo para mostrar al mundo! 🚀
