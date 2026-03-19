#!/bin/bash

echo "🚀 Iniciando despliegue de la app de Gonza..."

echo "🏗️ 1. Compilando Angular para producción..."
npm run build

echo "📦 2. Subiendo archivos a Hostinger..."
# Sube el contenido de la carpeta browser a public_html
scp -P 65002 -r dist/frontend/browser/* u243756829@191.101.79.202:/home/u243756829/domains/digiobra.com/public_html/

echo "✅ ¡Listo, Gonza! Tu app ya está en www.digiobra.com 🔥"
