# 09 — Página Individual de Projecto (`/portfolio/[slug]`)

# Estado

Status: PENDING

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

_(preencher ao executar este bloco)_

- O que foi alterado:
- Componentes criados:
- Componentes reutilizados:
- Problemas encontrados:
- Problemas corrigidos:
- Problemas ainda existentes:
- Ficheiros alterados:
- Testes realizados:
