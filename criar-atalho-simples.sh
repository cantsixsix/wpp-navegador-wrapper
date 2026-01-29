#!/bin/bash

echo "🚀 Criando atalho simples do WhatsApp (sem precisar instalar nada)..."
echo ""

WIN_USER=$(cmd.exe /c "echo %USERNAME%" 2>/dev/null | tr -d '\r')
DESKTOP="/mnt/c/Users/$WIN_USER/Desktop"

# Criar VBS que abre o WhatsApp Web no navegador padrão em modo app
cat > "$DESKTOP/WhatsApp.vbs" << 'EOF'
Set WshShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Tenta encontrar o Chrome
chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
If Not objFSO.FileExists(chromePath) Then
    chromePath = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
End If

' Tenta encontrar o Edge se Chrome não existir
If Not objFSO.FileExists(chromePath) Then
    chromePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
End If

If Not objFSO.FileExists(chromePath) Then
    ' Usa o navegador padrão
    WshShell.Run "https://web.whatsapp.com", 1
Else
    ' Abre em modo app (sem barra de endereço)
    WshShell.Run """" & chromePath & """ --app=https://web.whatsapp.com", 1, False
End If
EOF

echo "✅ Atalho criado na área de trabalho!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ WhatsApp pronto para usar!"
echo ""
echo "📱 Clique duas vezes em 'WhatsApp.vbs' na área de trabalho"
echo "   O WhatsApp abrirá em uma janela dedicada do Chrome/Edge"
echo ""
echo "💡 Para melhorar:"
echo "   - Clique direito no WhatsApp.vbs > Criar atalho"
echo "   - Renomeie o atalho para 'WhatsApp'"
echo "   - Fixe na barra de tarefas"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
