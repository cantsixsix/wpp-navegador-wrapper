# 💡 Ideia: WhatsApp Desktop

> Este repositório é uma **ideia em validação**. Mapa completo de todas as ideias: [IDEIAS.md no repo `dev`](https://github.com/cantsixsix/dev/blob/claude/serene-bardeen-1tjfw2/IDEIAS.md).
>
> Estágios: 💡 ideia · 🧪 protótipo · 🚀 no ar · ✅ validada · 🗄️ arquivada.
> Regra: antes de escrever mais código, rodar o **teste** de uma variação. Sem reação em 2 semanas → 🗄️.

## P4 · WhatsApp Desktop — `wpp-navegador-wrapper` 🧪

- **P4.a WhatsApp no WSL** — o app atual. *Teste:* *release* com instalador e contar downloads.
- **P4.b Wrapper genérico** — transforma qualquer site (Gmail, Notion, Trello) em app de janela. *Teste:* trocar a URL e publicar.
- **P4.c Multi-contas** — duas contas de WhatsApp lado a lado (pessoal + trabalho).

<!-- validacao:inicio -->

## 🧪 Como validar

Teste de 7 dias. Resultados vão na [Bancada de Ideias](https://claude.ai/artifact/Y4H9MCxyvwwLDmhL812znj).

### P4 · WhatsApp Desktop no WSL

**Em uma frase:** Abre o WhatsApp como um aplicativo de verdade no Windows, mesmo para quem desenvolve dentro do WSL.

- **Problema:** Quem programa no Windows pelo WSL fica com o WhatsApp Web perdido entre abas do navegador.
- **Para quem:** Desenvolvedores que usam o WSL no Windows e conversam com clientes pelo WhatsApp.
- **Como funciona:** Um app Electron com ícone, atalho e janela própria que carrega o WhatsApp Web.
- **Como ganha dinheiro:** Grátis (projeto de portfólio) ou R$ 19 único na versão com várias contas.

| Teste | |
|---|---|
| Tipo | Colocar pessoas usando |
| Página | https://validar-ideias.netlify.app/p4/ |
| Onde divulgar | Release no GitHub + post em r/brdev e grupos de WSL |
| Preço testado | R$ 19 (versão multi-contas) |
| Meta em 7 dias | **50 downloads em 14 dias** |

<!-- validacao:fim -->
