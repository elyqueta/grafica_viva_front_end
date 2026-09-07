# 11 — Artigo Individual (`/blog/[slug]`)

# Estado

Status: COMPLETED

---

## Objectivo

Dar a cada post de `app/data/blog.ts` uma página de leitura completa,
substituindo o link morto actual (a Home já aponta para
`/blog/[slug]`, rotas que hoje não existem).

## Âmbito

Depende do bloco `10`.

1. Criar `app/blog/[slug]/page.tsx`, `generateStaticParams` a partir dos
   posts.
2. Estrutura: imagem principal, categoria, data, título, introdução,
   corpo do artigo (parágrafos mockados mas coerentes com o excerto já
   existente), 1 a 2 imagens intermédias, conteúdo relacionado (2 a 3
   outros posts), CTA para `/orcamento`, navegação artigo
   anterior/seguinte.
3. Conteúdo do corpo do artigo deve ser escrito com cuidado editorial
   (não lorem ipsum), em pt-PT pré-AO90, coerente com o tom já usado nos
   excertos existentes.

## Critérios de aceitação

- Todos os slugs de `app/data/blog.ts` resolvem para uma página válida.
- Nenhum "lorem ipsum" ou texto de preenchimento óbvio.
- Navegação anterior/seguinte funcional e sem sair do padrão de design.

## Resultado da implementação

- O que foi alterado:
  - `app/data/blog.ts` enriquecido com campos `body` e `gallery` para cada post, mantendo o aviso de dados de exemplo.
  - `app/blog/[slug]/page.tsx` criado com estrutura completa: hero visual, categoria, data, título, introdução, corpo do artigo, galeria, artigos relacionados, CTA final e navegação anterior/seguinte.
- Componentes criados: `app/blog/[slug]/page.tsx`.
- Componentes reutilizados: `NavBar`, `Footer`, `PageShell`, `next/image`, `next/link`.
- Problemas encontrados:
  - `app/data/blog.ts` não tinha conteúdo de corpo nem galeria, impossibilitando uma página de leitura real.
  - Rotas `/blog/[slug]` não existiam, gerando 404 a partir dos links da Home e de `/blog`.
- Problemas corrigidos:
  - Adicionados `body` e `gallery` a cada post, com texto editorial coerente e imagens Unsplash temáticas.
  - Páginas individuais de artigo criadas e pré-geradas via `generateStaticParams`.
- Problemas ainda existentes:
  - Nenhum.
- Ficheiros alterados:
  - `app/data/blog.ts` (atualizado)
  - `app/blog/[slug]/page.tsx` (criado)
  - `docs/11-artigo-individual.md` (atualizado)
- Testes realizados:
  - `npx tsc --noEmit` sem erros.
  - `npm run build` compila com sucesso e gera as 6 páginas estáticas via `generateStaticParams`.
  - `npm run lint` sem erros novos nos ficheiros alterados.
