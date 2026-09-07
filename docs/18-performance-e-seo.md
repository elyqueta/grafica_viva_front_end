# 18 — Performance e SEO

# Estado

Status: PENDING

---

## Objectivo

Optimizar o site completo e garantir metadata adequada em todas as
páginas antes de considerar o projecto pronto para produção real.

## Âmbito

### Performance
1. Confirmar que nenhum componente que não precise de interactividade
   está marcado `'use client'` desnecessariamente (rever especialmente
   componentes de página novos dos blocos `07` a `14`, que podem ser
   Server Components na maior parte, com apenas as partes interactivas
   isoladas em Client Components filhos).
2. Confirmar `sizes` correcto em todas as imagens `next/image` (auditar
   também as já existentes, não só as novas).
3. Rever se `GSAP`/`ScrollTrigger` está a criar múltiplos contextos
   desnecessários por página, e se todos têm `ctx.revert()` no cleanup
   (confirmar em todos os componentes novos criados nos blocos
   anteriores).
4. Rever bundle: `@fortawesome/*` está instalado mas não usado (ver
   `docs/01`) — remover a dependência se continuar sem uso após todos os
   blocos anteriores.

### SEO
1. `app/layout.tsx`: completar metadata global (Open Graph, ícone,
   `metadataBase` usando `SITE_URL` de `app/lib/constants.ts`).
2. `generateMetadata` por página dinâmica (`/servicos/[slug]`,
   `/portfolio/[slug]`, `/blog/[slug]`), usando título e descrição
   específicos de cada item.
3. Criar `app/sitemap.ts` e `app/robots.ts` a partir dos dados
   estruturados (`servicos.ts`, `portfolio.ts`, `blog.ts`).
4. Confirmar `lang="pt-PT"` mantido em `layout.tsx` (já está correcto,
   apenas confirmar que nenhuma alteração o quebrou).

## Critérios de aceitação

- Nenhum Client Component desnecessário nas páginas novas.
- Metadata (title/description/OG) presente em todas as páginas,
  incluindo dinâmicas.
- `sitemap.xml` e `robots.txt` gerados correctamente.
- Dependências não usadas removidas do `package.json`.

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
