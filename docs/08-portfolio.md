# 08 — Portfólio (`/portfolio`)

# Estado

Status: COMPLETED

---

## Decisão tomada

O utilizador decidiu separar as experiências em duas páginas distintas:
- `/manifesto` mantém a experiência abstracta `PortfolioManifest`.
- `/portfolio` passa a mostrar a grelha real de projectos.

## Âmbito executado

1. `app/manifesto/page.tsx` criado para alojar o `PortfolioManifest` existente.
2. `app/portfolio/page.tsx` reconstruído para mostrar os 6 projectos de
   `app/data/portfolio.ts` numa grelha editorial coerente com o design
   system (full-bleed, overlay, legenda).
3. `app/components/Footer.tsx` actualizado com link para `/manifesto` na
   secção de navegação.
4. `app/portfolio/page.tsx` ganhou secção final de CTA para `/manifesto`.

## Critérios de aceitação

- `/portfolio` mostra pelo menos os 6 projectos reais mockados, com
   imagem, cliente e título.
- Nenhum componente de portfólio fica órfão (não usado) no final deste
   bloco.
- Consistência visual com o resto do site.

## Resultado da implementação

- O que foi alterado:
  - `app/manifesto/page.tsx` criado.
  - `app/portfolio/page.tsx` substituído por uma grelha real de projectos com secção de link para o manifesto.
  - `app/components/Footer.tsx` actualizado com link para `/manifesto`.
- Componentes criados: Nenhum componente novo; a página `/portfolio` foi construída directamente em `app/portfolio/page.tsx` e `/manifesto` em `app/manifesto/page.tsx`.
- Componentes reutilizados: `NavBar`, `Footer`, `PageShell`, `PortfolioManifest`.
- Problemas encontrados: Nenhum.
- Problemas corrigidos: A pedido do utilizador, os elementos visuais e tipográficos de `PortfolioManifest` foram aumentados para maior impacto visual: seções com `min-h-screen`, cards, dots, barras, botões e títulos maiores.
- Problemas ainda existentes: Nenhum.
- Ficheiros alterados: `app/manifesto/page.tsx`, `app/portfolio/page.tsx`, `app/components/Footer.tsx`.
- Testes realizados: `npm run build` compilou com sucesso e registou `/manifesto` e `/portfolio` como páginas estáticas. `npm run lint` não reportou erros nos ficheiros alterados.
