const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Obtém o caminho do Windows para a área de trabalho
function getWindowsDesktopPath() {
  try {
    const username = execSync('cmd.exe /c echo %USERNAME%', { encoding: 'utf8' }).trim();
    return `/mnt/c/Users/${username}/Desktop`;
  } catch (error) {
    console.error('Erro ao obter nome de usuário:', error.message);
    return null;
  }
}

// Obtém o caminho WSL atual convertido para Windows
function getWindowsPath(wslPath) {
  try {
    const windowsPath = execSync(`wslpath -w "${wslPath}"`, { encoding: 'utf8' }).trim();
    return windowsPath;
  } catch (error) {
    console.error('Erro ao converter caminho:', error.message);
    return null;
  }
}

// Cria o script .bat para iniciar o app
function createBatScript() {
  const currentDir = process.cwd();
  const windowsPath = getWindowsPath(currentDir);

  if (!windowsPath) {
    console.error('Não foi possível converter o caminho para Windows');
    return null;
  }

  const batContent = `@echo off
cd /d "${windowsPath}"
wsl.exe bash -c "cd '${currentDir}' && npm start"
`;

  const batPath = path.join(currentDir, 'WhatsApp.bat');
  fs.writeFileSync(batPath, batContent, 'utf8');
  console.log('✅ Arquivo .bat criado:', batPath);

  return batPath;
}

// Cria o atalho VBS na área de trabalho do Windows
function createDesktopShortcut(batPath) {
  const desktopPath = getWindowsDesktopPath();

  if (!desktopPath) {
    console.error('Não foi possível encontrar a área de trabalho do Windows');
    return false;
  }

  const windowsBatPath = getWindowsPath(batPath);
  const iconPath = getWindowsPath(path.join(process.cwd(), 'icon.ico'));

  // Converte o caminho da área de trabalho para Windows
  const windowsDesktopPath = desktopPath.replace('/mnt/c', 'C:').replace(/\//g, '\\');

  // Cria o VBS em um diretório temporário do Windows
  const tempDir = execSync('cmd.exe /c echo %TEMP%', { encoding: 'utf8' }).trim();
  const windowsVbsPath = `${tempDir}\\create-whatsapp-shortcut.vbs`;

  const vbsContent = `Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile = "${windowsDesktopPath}\\WhatsApp.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = "${windowsBatPath}"
oLink.WorkingDirectory = "${path.dirname(windowsBatPath)}"
oLink.Description = "WhatsApp Desktop"
oLink.IconLocation = "${iconPath}"
oLink.Save
`;

  try {
    // Escreve o VBS no diretório temp do Windows
    execSync(`cmd.exe /c "echo ${vbsContent.split('\n').map(line => line.trim()).join(' & echo ')} > ${windowsVbsPath}"`, { shell: true });

    // Executa o VBS
    execSync(`cmd.exe /c cscript.exe "${windowsVbsPath}" //Nologo`);

    // Remove o VBS temporário
    execSync(`cmd.exe /c del "${windowsVbsPath}"`);

    console.log('✅ Atalho criado na área de trabalho do Windows!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao criar atalho:', error.message);

    // Tenta criar manualmente com PowerShell como alternativa
    console.log('🔄 Tentando método alternativo com PowerShell...');
    return createShortcutWithPowerShell(windowsBatPath, iconPath, windowsDesktopPath);
  }
}

// Método alternativo usando PowerShell
function createShortcutWithPowerShell(batPath, iconPath, desktopPath) {
  const psCommand = `$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('${desktopPath}\\WhatsApp.lnk'); $Shortcut.TargetPath = '${batPath}'; $Shortcut.IconLocation = '${iconPath}'; $Shortcut.Description = 'WhatsApp Desktop'; $Shortcut.Save()`;

  try {
    execSync(`powershell.exe -Command "${psCommand}"`, { stdio: 'inherit' });
    console.log('✅ Atalho criado com PowerShell!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao criar atalho com PowerShell:', error.message);
    console.log('\n⚠️  Não foi possível criar o atalho automaticamente.');
    console.log('📝 Você pode criar manualmente:');
    console.log(`   1. Clique com botão direito na área de trabalho`);
    console.log(`   2. Novo > Atalho`);
    console.log(`   3. Cole este caminho: ${batPath}`);
    console.log(`   4. Nomeie como "WhatsApp"`);
    return false;
  }
}

// Execução principal
console.log('🚀 Criando atalho do WhatsApp na área de trabalho...\n');

const batPath = createBatScript();
if (batPath) {
  createDesktopShortcut(batPath);
  console.log('\n✅ Pronto! Agora você tem um atalho do WhatsApp na sua área de trabalho!');
  console.log('📱 Clique duas vezes no ícone "WhatsApp" para abrir o app.');
} else {
  console.error('\n❌ Não foi possível criar o atalho.');
}
