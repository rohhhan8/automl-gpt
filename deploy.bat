@echo off
echo 🚀 Starting deployment process...

echo 🧹 Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo 📦 Installing dependencies...
npm ci

echo 🔨 Building application...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build completed successfully!
    echo 📁 Build output is in the 'out' directory
    echo 🌐 Ready for deployment to Netlify
    echo 🎉 Deployment preparation complete!
) else (
    echo ❌ Build failed!
    exit /b 1
)