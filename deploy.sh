#!/bin/bash

# Deployment script for AutoML Pro
echo "🚀 Starting deployment process..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build output is in the 'out' directory"
    echo "🌐 Ready for deployment to Netlify"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Deployment preparation complete!"