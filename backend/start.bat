@echo off
REM Script para iniciar el backend en Windows PowerShell

echo.
echo 🚀 Iniciando Backend del Portfolio...
echo.

REM Verificar que Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js no está instalado. Descárgalo desde https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✓ Node.js version: %NODE_VERSION%
echo ✓ npm version: %NPM_VERSION%
echo.

REM Verificar que estamos en el directorio backend
if not exist "package.json" (
    echo ❌ No se encontró package.json. Asegúrate de estar en el directorio 'backend'
    pause
    exit /b 1
)

REM Instalar dependencias si no existen
if not exist "node_modules" (
    echo 📦 Instalando dependencias...
    call npm install
    echo.
)

REM Verificar .env
if not exist ".env" (
    echo ⚠️  Archivo .env no encontrado
    echo Creando .env desde .env.example...
    copy .env.example .env
    echo ✓ Archivo .env creado
    echo ⚠️  Asegúrate de actualizar MONGO_URI en .env
    echo.
)

REM Iniciar servidor
echo 🔌 Iniciando servidor en puerto 5000...
echo 📡 Endpoints disponibles:
echo    - Health: http://localhost:5000/api/health
echo    - Contacto: POST http://localhost:5000/api/contact
echo    - Mensajes: http://localhost:5000/api/messages
echo.
echo 💡 Presiona Ctrl+C para detener el servidor
echo.

call npm run dev
pause
