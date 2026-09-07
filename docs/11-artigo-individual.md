# 11 — Artigo Individual (`/blog/[slug]`)

# Estado

Status: PENDING

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

_(preencher ao executar este bloco)_

- O que foi alterado:
- Componentes criados:
- Componentes reutilizados:
- Problemas encontrados:
- Problemas corrigidos:
- Problemas ainda existentes:
- Ficheiros alterados:
- Testes realizados:
