# Clube Camisa Surpresa — protótipo

Protótipo de e-commerce de assinatura mensal de camisas de futebol sortidas, feito com React + Vite.

## Requisitos
- Node.js 18 ou superior
- npm

## Rodar localmente
```bash
npm install
npm run dev
```
Abra o endereço local mostrado pelo Vite.

## Gerar versão para hospedagem
```bash
npm run build
```
O Vite cria a pasta `dist/`. É o conteúdo dessa pasta que deve ser enviado para a hospedagem.

## Publicar no GitHub Pages
1. Suba este projeto para um repositório GitHub.
2. Em uma máquina com Node.js, execute `npm install` e `npm run build`.
3. Publique o conteúdo da pasta `dist/` no GitHub Pages (por exemplo, usando GitHub Actions ou enviando os arquivos compilados para a branch/pasta configurada).
4. O `vite.config.js` usa `base: './'`, o que facilita publicar em subpastas e hospedagens estáticas.

## Publicar em hospedagem compartilhada (ex.: InfinityFree)
1. Execute `npm install` e `npm run build`.
2. Entre no gerenciador de arquivos da hospedagem.
3. Envie **os arquivos de dentro da pasta `dist/`** para `htdocs` (ou a pasta pública equivalente).
4. Acesse o domínio.

## Personalização
- Logo: `public/logo-clube-camisa.png`
- Textos, planos e preços de demonstração: `src/main.jsx`
- Identidade visual e responsividade: `src/styles.css`

## Importante antes de vender
Este projeto é somente um protótipo de interface. Não possui banco de dados, login, painel administrativo, gestão de estoque, recorrência de pagamento ou integração de frete. O modal de escolha apenas demonstra a seleção do plano; não realiza pedido nem cobrança. Para produção, será necessário integrar backend e um gateway de pagamento com recorrência, além de definir tamanhos, política de troca, cancelamento, entrega e procedência das camisas.

Os preços exibidos são ilustrativos e devem ser ajustados pelo responsável pelo negócio.
