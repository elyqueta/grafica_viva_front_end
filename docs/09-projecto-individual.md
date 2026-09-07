# 09 — Página Individual de Projecto (`/portfolio/[slug]`)

# Estado

Status: COMPLETED

---

## Objectivo

Dar a cada projecto de `app/data/portfolio.ts` uma página própria com
storytelling, para reforçar prova de trabalho real (ainda que com dados
mockados por agora).

## Âmbito

Depende do bloco `08` estar concluído (precisa da grelha e dos slugs
clicáveis a apontar para aqui).

1. Criar `app/portfolio/[slug]/page.tsx`, `generateStaticParams` a partir
   de `PROJECTS`.
2. Estrutura por página (adaptar aos dados mockados disponíveis, sem
   inventar detalhes técnicos irrealistas):
   - Hero visual com a imagem principal do projecto.
   - Nome do projecto, cliente, categoria (se `serviceId` estiver
     preenchido, mostrar o nome do serviço associado via
     `app/data/servicos.ts`).
   - Objectivo / o que o cliente precisava (texto mockado curto,
     coerente com o `title` já existente, ex: "rebranding e embalagem"
     → objectivo de reposicionar a marca).
   - Solução aplicada (2 a 3 parágrafos).
   - Galeria (2 a 4 imagens adicionais mockadas via Unsplash, coerentes
     com a categoria do projecto).
   - Projectos relacionados (2 a 3 outros de `PROJECTS`, idealmente do
     mesmo `serviceId` quando existir).
   - CTA final para `/orcamento`.
3. Não implementar vídeo nesta página enquanto não houver ficheiros de
   vídeo reais (ver regra em `AGENTS.md`, ponto 7). Se o utilizador
   fornecer vídeos entretanto, ligar ao bloco `15`.

## Critérios de aceitação

- Todas as páginas de projecto carregam sem erro a partir dos slugs de
  `PROJECTS`.
- Nenhuma estatística, prazo ou dado técnico inventado como se fosse
  real (deixar claro nos comentários do código que o texto é mockado,
  seguindo o padrão já usado em `app/data/partners.ts`).
- Consistência de layout entre todas as páginas de projecto.

## Resultado da implementação

- O que foi alterado:
  - `app/portfolio/[slug]/page.tsx` criado com estrutura completa: hero visual, objetivo, solução aplicada, galeria, projectos relacionados e CTA final para `/orcamento`.
  - `app/data/portfolio.ts` enriquecido com campos `category`, `objective`, `solution` e `gallery` em cada projecto, mantendo o aviso de dados de exemplo.
  - `app/components/servicosComponents/RelatedProjects.tsx` atualizado para suportar links para páginas individuais de projecto via prop `asDetailLinks`.
  - `app/portfolio/page.tsx` atualizado para que cada card da grelha aponte para a página individual do projecto (`/portfolio/[slug]`).
- Componentes criados: `app/portfolio/[slug]/page.tsx`.
- Componentes reutilizados: `NavBar`, `Footer`, `PageShell`, `RelatedProjects`, `Image` (next/image), `Link` (next/link).
- Problemas encontrados:
  - `app/data/portfolio.ts` não tinha campos suficientes para storytelling (objective, solution, gallery).
  - `RelatedProjects.tsx` tinha links hardcoded para `/portfolio`, não servia para páginas individuais.
  - `app/portfolio/page.tsx` usava `<article>` sem link, impedindo navegação para detalhe do projecto.
- Problemas corrigidos:
  - Enriquecidos os dados mockados de `portfolio.ts` com campos de storytelling, mantendo o aviso de exemplo.
  - `RelatedProjects.tsx` ganhou prop `asDetailLinks` para gerar hrefs dinâmicos por projecto.
  - `app/portfolio/page.tsx` agora usa `<Link>` em cada card da grelha, apontando para `/portfolio/${project.slug}`.
- Problemas ainda existentes:
  - Nenhum.
- Ficheiros alterados:
  - `app/portfolio/[slug]/page.tsx` (criado)
  - `app/data/portfolio.ts` (atualizado)
  - `app/components/servicosComponents/RelatedProjects.tsx` (atualizado)
  - `app/portfolio/page.tsx` (atualizado)
- Testes realizados:
  - `npx tsc --noEmit` sem erros.
  - `npm run build` compila com sucesso e gera as 6 páginas estáticas via `generateStaticParams`.
  - `npm run lint` sem erros novos nos ficheiros alterados.
