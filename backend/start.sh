#!/bin/bash
# Script para iniciar el backend rápidamente

echo "🚀 Iniciando Backend del Portfolio..."
echo ""

# Verificar que Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instálalo desde https://nodejs.org"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Verificar que estamos en el directorio backend
if [ ! -f "package.json" ]; then
    echo "❌ No se encontró package.json. Asegúrate de estar en el directorio 'backend'"
    exit 1
fi

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo ""
fi

# Verificar .env
if [ ! -f ".env" ]; then
    echo "⚠️  Archivo .env no encontrado"
    echo "Creando .env desde .env.example..."
    cp .env.example .env
    echo "✓ Archivo .env creado"
    echo "⚠️  Asegúrate de actualizar MONGO_URI en .env"
    echo ""
fi

# Iniciar servidor
echo "🔌 Iniciando servidor en puerto 5000..."
echo "📡 Endpoints disponibles:"
echo "   - Health: http://localhost:5000/api/health"
echo "   - Contacto: POST http://localhost:5000/api/contact"
echo "   - Mensajes: http://localhost:5000/api/messages"
echo ""
echo "💡 Presiona Ctrl+C para detener el servidor"
echo ""

npm run dev
