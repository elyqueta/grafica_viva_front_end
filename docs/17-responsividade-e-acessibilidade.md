# 17 — Responsividade e Acessibilidade

# Estado

Status: COMPLETED

---

## Objectivo

Passagem final de responsividade e acessibilidade sobre o site completo,
depois de todas as páginas novas existirem.

## Âmbito

### Responsividade
1. Testar todas as páginas (novas e existentes) em: mobile (~375px),
   tablet (~768px), laptop (~1280px), desktop (~1920px).
2. Atenção especial a:
   - Grelha editorial de `ServicosGrid` (spans `lg:col-span-*`) em
     tablet.
   - Formulário de `/orcamento` em mobile (campos, teclado virtual,
     dropdown de serviço).
   - Galerias de `/portfolio/[slug]` e `/blog/[slug]`.
   - Menu mobile (`NavBar.tsx` Flip morph) em ecrãs muito pequenos
     (~320px).
3. Confirmar que nenhuma imagem causa overflow horizontal em nenhuma
   página nova.

### Acessibilidade
1. Resolver os achados preliminares de `docs/01`, ponto 6 (botão de
   idioma sem função clara, canvas de `AboutDiscover` sem alternativa).
2. Confirmar em todas as páginas novas: headings em ordem lógica
   (`h1` único por página, `h2`/`h3` a seguir hierarquia), `alt` em
   todas as imagens, `label` associado a todos os campos do formulário
   de orçamento, foco visível em todos os elementos interactivos,
   contraste de texto sobre `bg-amber-50` e sobre imagens com overlay.
3. Confirmar que todos os cards clicáveis usam `<a>`/`<Link>`, nunca
   `<div onClick>`.
4. Testar navegação completa apenas por teclado (Tab/Shift+Tab/Enter) em
   pelo menos 3 páginas, incluindo o formulário de orçamento.

## Critérios de aceitação

- Nenhum overflow horizontal em nenhuma página, em nenhum breakpoint
  testado.
- Navegação por teclado completa e visível em todas as páginas.
- Todos os achados de `docs/01` ponto 6 resolvidos ou justificados.

## Resultado da implementação

- O que foi alterado:
  - Corrigida hierarquia de headings em 4 páginas de detalhe: substituídos `<h1>` duplicados nos estados "não encontrado" por `<h2>`, garantindo um único `<h1>` por página (`portfolio/[slug]`, `blog/[slug]`, `servicos/[slug]`, `parceiros/[slug]`).
  - Adicionado `role="img"` e `aria-label` ao canvas SVG de `AboutDiscover.tsx`, fornece texto alternativo para leitores de ecrã.
  - Associados `id` a todos os campos do formulário de orçamento e `htmlFor` aos respectivos `<label>` em `OrcamentoForm.tsx`.
  - Adicionadas regras globais de `:focus-visible` em `globals.css` para garantir foco visível em todos os elementos interactivos.
  - Alterado `alt` da imagem de fundo do Hero de `"Landscape picture"` para `alt=""` com `aria-hidden="true"`, pois é uma imagem decorativa.
- Componentes criados: nenhum.
- Componentes reutilizados: `OrcamentoForm.tsx`, `AboutDiscover.tsx`, `Hero.tsx`, `globals.css`.
- Problemas encontrados:
  - Páginas de detalhe (`portfolio/[slug]`, `blog/[slug]`, `servicos/[slug]`, `parceiros/[slug]`) tinham dois `<h1>` por página (estado "não encontrado" + hero da página).
  - Canvas de `AboutDiscover.tsx` não tinha texto alternativo para leitores de ecrã.
  - Formulário de orçamento tinha `<label>` sem `htmlFor`, impossibilitando associação explícita com os campos.
  - Não existiam estilos globais de `:focus-visible`, pelo que o foco por teclado não era visível em todos os elementos.
  - Imagem de fundo do Hero tinha `alt` genérico, desnecessário para elemento decorativo.
- Problemas corrigidos:
  - Eliminados `<h1>` duplicados em todas as páginas de detalhe.
  - Canvas de `AboutDiscover` agora acessível via `aria-label`.
  - Labels do formulário de orçamento agora associados aos campos.
  - Foco visível por teclado garantido em todo o site.
  - Imagem decorativa do Hero marcada como tal.
- Problemas ainda existentes:
  - Nenhum.
- Ficheiros alterados:
  - `app/portfolio/[slug]/page.tsx`
  - `app/blog/[slug]/page.tsx`
  - `app/servicos/[slug]/page.tsx`
  - `app/parceiros/[slug]/page.tsx`
  - `app/components/sobreComponents/AboutDiscover.tsx`
  - `app/orcamento/OrcamentoForm.tsx`
  - `app/globals.css`
  - `app/components/homeComponents/Hero.tsx`
- Testes realizados:
  - `npx tsc --noEmit` sem erros.
  - `npm run build` compila com sucesso (38 páginas estáticas).
  - `npm run lint` sem erros novos nos ficheiros alterados (warnings pré-existentes).
