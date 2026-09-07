# 07 — Página Individual de Serviço (`/servicos/[slug]`)

# Estado

Status: COMPLETED

---

## Objectivo

Cada card de `/servicos` deve abrir uma página própria com detalhe
suficiente para o visitante avançar para orçamento com confiança. Hoje
todos os CTAs de `ServicosGrid` apontam para `/orcamento` directamente;
este bloco introduz a página intermédia `/servicos/[slug]`.

## Âmbito

1. Criar `app/servicos/[slug]/page.tsx` como rota dinâmica, usando
   `app/data/servicos.ts` (fonte única do bloco `02`) via `slug` já
   existente em cada `ServiceItem`.
2. Estrutura da página, seguindo a hierarquia já validada para
   `/servicos` (serviço → o que fazemos → o que o cliente obtém →
   exemplos reais quando existirem → confiança → CTA):
   - Imagem principal (a mesma de `ServiceItem.image`, ou uma variante
     mockada da mesma categoria via Unsplash).
   - Nome do serviço e descrição (`ServiceItem.description`).
   - Lista de exemplos (`ServiceItem.items`), apresentada com mais
     espaço do que na grelha (ex: grid de 2 colunas com ícone/checkmark).
   - `RelatedProjects` (reutilizar o componente do bloco `06`), mostrando
     projectos reais quando existir `serviceId` a apontar para este
     serviço; nada quando não existir.
   - CTA para `/orcamento`, com o serviço pré-identificado se o
     formulário do bloco `14` suportar um campo "serviço" pré-preenchido
     via query param (`/orcamento?servico=slug`).
   - "Serviços relacionados": mostrar 2 a 3 outros serviços do mesmo
     array, não os 6, para não duplicar a grelha completa.
3. `generateStaticParams` a partir de `SERVICES` para pré-gerar as 6
   páginas.
4. `generateMetadata` por serviço (title, description) — ligado ao
   bloco `18` de SEO, mas o essencial (title/description por página)
   deve ficar já aqui.
5. Actualizar `ServicosGrid.tsx`: o CTA principal de cada card passa a
   apontar para `service.href` como página de detalhe
   (`/servicos/[slug]`) em vez de ir directo a `/orcamento` — decidir com
   o utilizador se o pill do hover mantém o texto "pedir orçamento" ou
   passa a "conhecer serviço", dado que deixa de ser um link directo de
   conversão.

## Critérios de aceitação

- As 6 páginas de serviço existem e carregam sem erro.
- Cada página distingue-se visualmente das outras apenas pelo conteúdo,
  não pela estrutura (consistência de design system).
- Nenhuma informação inventada (preços, prazos, certificações).
- CTA final de cada página aponta para `/orcamento`.

## Resultado da implementação

- O que foi alterado: 
  - `app/servicos/[slug]/page.tsx` criado.
  - `app/data/servicos.ts`: `href` de cada serviço actualizado para `/servicos/[slug]`.
  - `app/components/servicosComponents/ServicosGrid.tsx`: texto do CTA no hover alterado de "pedir orçamento" para "conhecer serviço".
- Componentes criados: Nenhum componente novo; a página de detalhe foi construída directamente em `app/servicos/[slug]/page.tsx`.
- Componentes reutilizados: `NavBar`, `Footer`, `PageShell`, `RelatedProjects`, `ScrollFillHeading`, `Check` (lucide-react).
- Problemas encontrados: Em runtime, `params` em Server Components do Next.js 15+ é uma Promise; a página estava a usar `params.slug` de forma síncrona, resultando em `slug === undefined` e na página “serviço não encontrado” para todas as rotas.
- Problemas corrigidos: `generateMetadata` e `ServicoPage` agora fazem `await params` e usam `slug` correctamente. `generateStaticParams` mantém-se inalterado e valida os slugs.
- Problemas ainda existentes: Nenhum.
- Ficheiros alterados: `app/servicos/[slug]/page.tsx`, `app/data/servicos.ts`, `app/components/servicosComponents/ServicosGrid.tsx`.
- Testes realizados: `npm run build` compilou com sucesso e gerou as 6 páginas estáticas via `generateStaticParams`. `npm run lint` não reportou erros novos nos ficheiros alterados.
