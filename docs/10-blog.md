# 10 — Blog (`/blog`)

# Estado

Status: PENDING

---

## Objectivo

Substituir o stub actual por uma listagem editorial real. A Home já
antecipa 3 artigos (`homeComponents/Blog.tsx`, dados inline) que devem
passar a vir de uma fonte de dados partilhada.

## Âmbito

1. Criar `app/data/blog.ts`, tipado, migrando os 3 posts já usados em
   `homeComponents/Blog.tsx` (`papel-certo-para-a-tua-marca`,
   `embalagem-sustentavel-2026`, `sinaletica-que-vende`) para esta fonte
   única. Actualizar `homeComponents/Blog.tsx` para importar deste
   ficheiro em vez de manter o array `POSTS` local.
2. Adicionar mais alguns posts mockados (o utilizador pediu que "todos
   os espaços do site já sejam visivelmente preenchidos") com imagens
   Unsplash coerentes com temas de impressão/branding/design gráfico, e
   categorias plausíveis para uma gráfica (papel, embalagem, sinalética,
   identidade visual, digital).
3. Construir `app/blog/page.tsx`:
   - Não replicar o layout accordion da Home (que é um teaser). A página
     dedicada deve ser mais rica visualmente, seguindo o pedido do
     briefing: imagens grandes, composição editorial, não uma grelha
     simples de cartões com texto.
   - Considerar um artigo em destaque (o mais recente) com imagem maior,
     seguido de grelha para os restantes.
   - Categorias como filtro simples (client-side, sem nova dependência).
4. Cada artigo aponta para `/blog/[slug]` (bloco `11`).

## Critérios de aceitação

- `/blog` deixa de mostrar "Página em desenvolvimento".
- Fonte de dados única partilhada entre a Home e `/blog`.
- Nenhuma imagem quebrada, todos os espaços preenchidos.
- Filtro (se implementado) não requer nova dependência.

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
