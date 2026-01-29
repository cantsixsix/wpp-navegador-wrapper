const https = require('https');
const fs = require('fs');
const path = require('path');

const iconUrl = 'https://raw.githubusercontent.com/Automattic/node-canvas/master/examples/public/images/whatsapp.png';
const iconPath = path.join(__dirname, 'icon.png');

console.log('📥 Baixando ícone do WhatsApp...');

https.get(iconUrl, (response) => {
  if (response.statusCode === 200) {
    const fileStream = fs.createWriteStream(iconPath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log('✅ Ícone baixado com sucesso:', iconPath);

      // Cria também um arquivo .ico básico (cópia do PNG)
      const icoPath = path.join(__dirname, 'icon.ico');
      fs.copyFileSync(iconPath, icoPath);
      console.log('✅ Arquivo .ico criado:', icoPath);
    });
  } else {
    console.log('⚠️  Não foi possível baixar o ícone. Criando ícone alternativo...');
    createFallbackIcon();
  }
}).on('error', (err) => {
  console.log('⚠️  Erro ao baixar ícone:', err.message);
  createFallbackIcon();
});

function createFallbackIcon() {
  // Se não conseguir baixar, vamos criar um ícone SVG simples
  const svgIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="256" rx="30" fill="#25D366"/>
  <path d="M128 40c-48.6 0-88 39.4-88 88 0 15.6 4.1 30.3 11.3 43L40 216l46.5-11.1c12.3 6.7 26.4 10.5 41.5 10.5 48.6 0 88-39.4 88-88s-39.4-88-88-88zm0 160c-13.4 0-26-3.7-36.8-10.1l-2.6-1.6-27.1 6.5 6.6-26.4-1.7-2.7C60.4 156 56 142.4 56 128c0-39.7 32.3-72 72-72s72 32.3 72 72-32.3 72-72 72z" fill="white"/>
  <path d="M160 140c-1.3-.7-7.8-3.8-9-4.3-1.2-.4-2.1-.7-3 .7s-3.4 4.3-4.2 5.2c-.8.9-1.5 1-2.8.3-1.3-.7-5.4-2-10.3-6.3-3.8-3.4-6.4-7.5-7.1-8.8-.8-1.3-.1-2 .6-2.6.6-.6 1.3-1.5 1.9-2.3.6-.8.8-1.3 1.2-2.1.4-.9.2-1.7-.1-2.3-.3-.7-3-7.2-4.1-9.8-1.1-2.6-2.2-2.2-3-.2-.8 2-1.6 2-2.4 2-.8 0-2.1-.3-3.2-1.5-1.1-1.2-4.3-4.2-4.3-10.2s4.4-11.8 5-12.6c.6-.8 8.6 13.7 20.8 19.2 2.9 1.3 5.2 2.1 7 2.7 2.9.9 5.6.8 7.7.5 2.4-.4 7.8-3.2 8.9-6.3 1.1-3.1 1.1-5.8.8-6.3-.3-.6-1.2-.9-2.5-1.6z" fill="white"/>
</svg>`;

  fs.writeFileSync(path.join(__dirname, 'icon.svg'), svgIcon, 'utf8');
  console.log('✅ Ícone SVG alternativo criado');

  // Cria arquivos vazios como placeholder
  fs.writeFileSync(iconPath, '', 'utf8');
  fs.writeFileSync(path.join(__dirname, 'icon.ico'), '', 'utf8');
}
