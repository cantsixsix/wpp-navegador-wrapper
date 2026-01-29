# 📱 WhatsApp Desktop para Windows (WSL)

Aplicativo desktop do WhatsApp que roda no WSL mas abre como janela nativa no Windows com ícone na área de trabalho.

## ✨ Características

- 🪟 **Funciona como programa nativo do Windows** (sem mostrar terminal!)
- 🎨 Ícone personalizado do WhatsApp
- 🖥️ Janela dedicada (não fica misturado com abas do navegador)
- 🚀 Inicia rapidamente e de forma invisível
- 📌 Atalho na área de trabalho do Windows
- 🔇 WSL roda em segundo plano (invisível)
- ✨ Pode fixar na barra de tarefas

## 🔧 Instalação

### 1. Instalar dependências do Electron no WSL

Primeiro, instale as bibliotecas necessárias no WSL:

```bash
./install-dependencies.sh
```

Você será solicitado a digitar sua senha do Linux.

### 2. Criar atalho na área de trabalho do Windows

```bash
npm run setup
```

Este comando irá:
1. Criar um diretório no Windows (`C:\Users\SeuUsuario\AppData\Local\WhatsAppDesktop`)
2. Copiar os arquivos necessários para lá
3. Criar um atalho na sua área de trabalho do Windows
4. Configurar tudo automaticamente

### 3. Transformar em executável Windows nativo (JÁ FEITO! ✅)

O comando abaixo já foi executado e transformou o WhatsApp em um programa que funciona como qualquer aplicativo do Windows:

```bash
npm run make-executable
```

Agora o WhatsApp:
- ✅ Abre sem mostrar terminal do WSL
- ✅ Funciona como qualquer programa nativo do Windows
- ✅ Pode ser fixado na barra de tarefas
- ✅ Pode iniciar automaticamente com o Windows

## 🚀 Como usar

### Opção 1: Ícone na Área de Trabalho (Recomendado)
Basta clicar duas vezes no ícone **WhatsApp** na sua área de trabalho do Windows!
- Abre instantaneamente
- Sem terminal ou janela preta
- Funciona como qualquer programa

### Opção 2: Menu Iniciar
Execute o comando para adicionar ao Menu Iniciar:
```bash
npm run add-shortcuts
```
Depois, pressione a tecla Windows e digite "WhatsApp"

### Opção 3: Fixar na Barra de Tarefas (MELHOR!)
1. Clique com botão direito no atalho do WhatsApp
2. Selecione **"Fixar na barra de tarefas"**
3. Agora você tem acesso com 1 clique!

### Opção 4: Via terminal WSL
No WSL, execute:
```bash
npm start
```

## 📂 Arquivos criados

- [main.js](main.js) - Código principal do Electron
- [package.json](package.json) - Configuração do projeto
- [create-shortcut.js](create-shortcut.js) - Script para criar atalho no Windows
- `WhatsApp.bat` - Script para iniciar o app do Windows
- `icon.png` / `icon.ico` / `icon.svg` - Ícones do aplicativo

## 🔍 Nota

Este aplicativo carrega o WhatsApp Web. Na primeira vez, você precisará escanear o QR Code com seu celular.
