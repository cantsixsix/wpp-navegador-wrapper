const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Instalando WhatsApp Desktop no Windows...\n');

// Obtém o nome de usuário do Windows
const username = execSync('cmd.exe /c echo %USERNAME%', { encoding: 'utf8' }).trim();
const programsDir = `C:\\Users\\${username}\\AppData\\Local\\WhatsAppDesktop`;

console.log('📁 Criando diretório de instalação...');
try {
  execSync(`cmd.exe /c mkdir "${programsDir}" 2>nul`, { stdio: 'ignore' });
} catch (e) {
  // Diretório já existe, tudo bem
}

// Caminho atual do WSL
const currentDir = process.cwd();

// Cria o script de inicialização no Windows
console.log('📝 Criando script de inicialização...');
const startScript = `@echo off
wsl.exe bash -c "cd '${currentDir}' && npm start"`;

const startBatPath = `${programsDir}\\start-whatsapp.bat`;
execSync(`cmd.exe /c "echo ${startScript.split('\n').join(' & echo ')} > ${startBatPath}"`);

console.log('✅ Script criado em:', startBatPath);

// Cria o script PowerShell para criar o atalho
console.log('🔗 Criando atalho na área de trabalho...');
const psScript = `${programsDir}\\create-shortcut.ps1`;
const psContent = `
$WshShell = New-Object -comObject WScript.Shell
$DesktopPath = [Environment]::GetFolderPath('Desktop')
$ShortcutPath = Join-Path $DesktopPath 'WhatsApp.lnk'
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = '${startBatPath}'
$Shortcut.WorkingDirectory = '${programsDir}'
$Shortcut.Description = 'WhatsApp Desktop'
$Shortcut.Save()
Write-Host 'Atalho criado com sucesso!'
`.trim();

// Salva o script PowerShell
execSync(`cmd.exe /c "echo ${psContent.split('\n').map(l => l.trim()).join(' & echo ')} > ${psScript}"`);

// Executa o script PowerShell
try {
  execSync(`powershell.exe -ExecutionPolicy Bypass -File "${psScript}"`, { stdio: 'inherit' });
  console.log('✅ Atalho criado na área de trabalho!');
} catch (error) {
  console.error('❌ Erro ao criar atalho');
  console.log('\n📝 Instruções manuais:');
  console.log('1. Pressione Win+R');
  console.log('2. Cole e execute:');
  console.log(`   ${startBatPath}`);
  console.log('\nPara criar atalho manualmente:');
  console.log('1. Clique com botão direito na área de trabalho');
  console.log('2. Novo > Atalho');
  console.log(`3. Cole: ${startBatPath}`);
  console.log('4. Nomeie como "WhatsApp"');
}

console.log('\n✅ Instalação concluída!');
console.log('📱 Você pode executar o WhatsApp de 3 formas:');
console.log('   1. Clicar no atalho "WhatsApp" na área de trabalho');
console.log(`   2. Executar: ${startBatPath}`);
console.log('   3. No WSL: npm start');
