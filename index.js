#!/usr/bin/env node

console.log('🚀 Abrindo WhatsApp...');

// Importa o módulo open dinamicamente (suporta ES Modules)
import('open')
  .then((module) => {
    const open = module.default;
    return open('https://web.whatsapp.com');
  })
  .then(() => {
    console.log('✅ WhatsApp aberto com sucesso!');
  })
  .catch((err) => {
    console.error('❌ Erro ao abrir WhatsApp:', err.message);
    process.exit(1);
  });
