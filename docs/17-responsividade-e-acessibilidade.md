# 17 — Responsividade e Acessibilidade

# Estado

Status: PENDING

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

_(preencher ao executar este bloco)_

- O que foi alterado:
- Componentes criados:
- Componentes reutilizados:
- Problemas encontrados:
- Problemas corrigidos:
- Problemas ainda existentes:
- Ficheiros alterados:
- Testes realizados:
