#!/bin/bash

echo "📦 Instalando dependências do Electron no WSL..."
echo ""
echo "⚠️  Este script precisa de permissões sudo."
echo "Você será solicitado a digitar sua senha."
echo ""

# Atualiza os repositórios
echo "🔄 Atualizando repositórios..."
sudo apt-get update

# Instala as dependências do Electron
echo ""
echo "📥 Instalando bibliotecas necessárias..."
sudo apt-get install -y \
  libnss3 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libxkbcommon0 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libasound2t64 \
  libgtk-3-0 \
  libgdk-pixbuf2.0-0 \
  libcairo2 \
  libpango-1.0-0 \
  libx11-xcb1 \
  libxcb-dri3-0

echo ""
echo "✅ Dependências instaladas com sucesso!"
echo ""
echo "Agora você pode executar:"
echo "  npm start"
