#!/bin/bash

echo "📦 Configurando WhatsApp Desktop..."
echo ""

# Obtém o nome de usuário do Windows
WIN_USER=$(cmd.exe /c "echo %USERNAME%" 2>/dev/null | tr -d '\r')

# Define o diretório de instalação
INSTALL_DIR="/mnt/c/Users/$WIN_USER/AppData/Local/WhatsAppDesktop"
WIN_INSTALL_DIR="C:\\Users\\$WIN_USER\\AppData\\Local\\WhatsAppDesktop"

echo "📁 Criando diretório: $INSTALL_DIR"
mkdir -p "$INSTALL_DIR"

# Copia os arquivos necessários
echo "📋 Copiando arquivos..."
cp WhatsApp.bat "$INSTALL_DIR/"
cp criar-atalho.vbs "$INSTALL_DIR/"

# Copia os ícones se existirem
if [ -f "icon.png" ]; then
  cp icon.png "$INSTALL_DIR/"
fi
if [ -f "icon.ico" ]; then
  cp icon.ico "$INSTALL_DIR/"
fi
if [ -f "icon.svg" ]; then
  cp icon.svg "$INSTALL_DIR/"
fi

echo "✅ Arquivos copiados!"
echo ""
echo "🔗 Criando atalho na área de trabalho..."

# Executa o VBS a partir do diretório do Windows
cd "$INSTALL_DIR"
cscript.exe //Nologo criar-atalho.vbs

echo ""
echo "✅ Instalação concluída!"
echo ""
echo "📱 Você pode abrir o WhatsApp de 3 formas:"
echo "   1. Clicando no atalho 'WhatsApp' na área de trabalho"
echo "   2. Executando: $WIN_INSTALL_DIR\\WhatsApp.bat"
echo "   3. No WSL: cd /home/edenpc/wpp && npm start"
echo ""
echo "🎉 Aproveite seu WhatsApp Desktop!"
