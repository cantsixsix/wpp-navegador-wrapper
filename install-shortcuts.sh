#!/bin/bash

echo "📌 Instalando atalhos do WhatsApp no Windows..."
echo ""

# Obtém o nome de usuário do Windows
WIN_USER=$(cmd.exe /c "echo %USERNAME%" 2>/dev/null | tr -d '\r')

# Diretórios
INSTALL_DIR="/mnt/c/Users/$WIN_USER/AppData/Local/WhatsAppDesktop"
DESKTOP="/mnt/c/Users/$WIN_USER/Desktop"
START_MENU="/mnt/c/Users/$WIN_USER/AppData/Roaming/Microsoft/Windows/Start Menu/Programs"
STARTUP="/mnt/c/Users/$WIN_USER/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup"

echo "✅ Atalho já criado na área de trabalho!"
echo ""

# Pergunta se quer adicionar ao Menu Iniciar
read -p "📋 Deseja adicionar ao Menu Iniciar do Windows? (s/n): " ADD_START_MENU

if [[ $ADD_START_MENU =~ ^[Ss]$ ]]; then
  echo "📋 Adicionando ao Menu Iniciar..."
  cd "$INSTALL_DIR"
  cscript.exe //Nologo criar-atalho-menu.vbs 2>/dev/null || {
    # Cria o VBS para o Menu Iniciar
    cat > criar-atalho-menu.vbs << 'VBS_EOF'
Set WshShell = CreateObject("WScript.Shell")
StartMenuPath = WshShell.SpecialFolders("Programs")
Set oShellLink = WshShell.CreateShortcut(StartMenuPath & "\WhatsApp.lnk")
oShellLink.TargetPath = WshShell.CurrentDirectory & "\WhatsApp.bat"
oShellLink.WindowStyle = 1
oShellLink.Description = "WhatsApp Desktop"
oShellLink.WorkingDirectory = WshShell.CurrentDirectory
oShellLink.Save
WScript.Echo "Atalho criado no Menu Iniciar!"
VBS_EOF
    cscript.exe //Nologo criar-atalho-menu.vbs
  }
  echo "✅ Atalho adicionado ao Menu Iniciar!"
fi

echo ""
# Pergunta se quer iniciar com o Windows
read -p "🚀 Deseja iniciar automaticamente com o Windows? (s/n): " ADD_STARTUP

if [[ $ADD_STARTUP =~ ^[Ss]$ ]]; then
  echo "🚀 Configurando inicialização automática..."
  cd "$INSTALL_DIR"

  # Cria o VBS para o Startup
  cat > criar-atalho-startup.vbs << 'VBS_EOF'
Set WshShell = CreateObject("WScript.Shell")
StartupPath = WshShell.SpecialFolders("Startup")
Set oShellLink = WshShell.CreateShortcut(StartupPath & "\WhatsApp.lnk")
oShellLink.TargetPath = WshShell.CurrentDirectory & "\WhatsApp.bat"
oShellLink.WindowStyle = 1
oShellLink.Description = "WhatsApp Desktop"
oShellLink.WorkingDirectory = WshShell.CurrentDirectory
oShellLink.Save
WScript.Echo "Atalho criado no Startup!"
VBS_EOF

  cscript.exe //Nologo criar-atalho-startup.vbs
  echo "✅ WhatsApp vai iniciar automaticamente com o Windows!"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Configuração concluída!"
echo ""
echo "📱 Como abrir o WhatsApp:"
echo "   1. Ícone na área de trabalho: Clique duas vezes em 'WhatsApp'"
if [[ $ADD_START_MENU =~ ^[Ss]$ ]]; then
  echo "   2. Menu Iniciar: Procure por 'WhatsApp'"
fi
if [[ $ADD_STARTUP =~ ^[Ss]$ ]]; then
  echo "   3. Inicialização automática: Abrirá ao ligar o PC"
fi
echo ""
echo "💡 Dica: Você pode fixar o atalho na barra de tarefas:"
echo "   - Clique com botão direito no atalho"
echo "   - Selecione 'Fixar na barra de tarefas'"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
