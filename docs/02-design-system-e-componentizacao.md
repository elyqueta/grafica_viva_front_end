# 02 — Design System e Componentização

# Estado

Status: COMPLETED

---

## Objectivo

Resolver as duplicações identificadas em `docs/01`, criar a fonte única de
constantes exigida pelo utilizador, e deixar o projecto com um design
system explícito antes de continuar a construir páginas novas.

## Âmbito

1. **Criar `app/lib/constants.ts`** com, no mínimo:
   - `WHATSAPP_LINK`
   - `WHATSAPP_NUMBER` (versão só dígitos, se necessário para outros usos)
   - `CONTACT_EMAIL`
   - `CONTACT_PHONE`
   - `CONTACT_ADDRESS`
   - `CONTACT_MAPS_URL`
   - `SITE_NAME`, `SITE_URL` (para metadata/SEO, bloco 18)
   Substituir todas as ocorrências hardcoded identificadas em `docs/01`
   ponto 3.3 (mínimo confirmado: `Footer.tsx`, `ServicosHero.tsx`,
   `ServicosGuia.tsx`, `ServicosWhy.tsx`, `ServicosCtaFinal.tsx`,
   `FinalCta.tsx`, `Hero.tsx`, `Contact.tsx`, `NavBar.tsx`).
2. **Unificar dados de serviços.** Definir `app/data/servicos.ts` como
   única fonte de verdade (schema já usado por `ServicosGrid`: `id`,
   `slug`, `number`, `title`, `category`, `description`, `items[]`,
   `accent`, `image`, `href`). Actualizar `Needs.tsx` e
   `homeComponents/Services.tsx` para consumirem este array, derivando
   localmente apenas os campos extra que precisem (ex: subtítulo curto
   para o carrossel da Home), sem manter arrays paralelos. Remover
   `app/data/services.ts` depois de confirmar que nada mais o importa.
3. **Decidido e documentado** o destino de `homeComponents/Portfolio.tsx` vs `portfolioComponents/PortfolioManifest.tsx`:
   - `homeComponents/Portfolio.tsx` é código morto (não importado em lado nenhum, nem na Home nem em `/portfolio`). É um carrossel horizontal de projectos reais com dados de `app/data/portfolio.ts`.
   - `portfolioComponents/PortfolioManifest.tsx` é a experiência abstracta/textual que está de facto deployada em `/portfolio`.
   - **Decisão:** manter `PortfolioManifest.tsx` como está. `homeComponents/Portfolio.tsx` é código morto e deve ser removido (ou reutilizado como base no bloco `08` quando for implementada a galeria real de projectos). Não manter dois sistemas paralelos de portfolio.
4. `useHorizontalScroll.ts` é código morto (nenhum componente o importa). Removido.
5. `/produtos` é uma rota órfã (sem link em nav/footer/CTA). **Decisão do utilizador:** manter a rota e adicionar links no footer e uma secção em Serviços para linkar a página. Implementação a fazer em bloco futuro (provavelmente `06-servicos.md`).

## Critérios de aceitação

- Nenhum componente contém `wa.me`, o email ou o telefone escritos
  directamente; todos importam de `app/lib/constants.ts`.
- Existe apenas uma fonte de dados de serviços.
- `npm run build` e `npx tsc --noEmit` sem erros novos.
- Nenhuma página perde conteúdo visual em resultado desta refactorização.

## Resultado da implementação

- O que foi alterado:
  - Criada fonte única de constantes em `app/lib/constants.ts` e substituídas todas as ocorrências hardcoded de WhatsApp, email, telefone, morada e link de orçamento por importações dessa fonte única.
  - Unificados dados de serviços em `app/data/servicos.ts`, que substitui `app/data/services.ts`. `ServicosGrid.tsx`, `Needs.tsx` e `homeComponents/Services.tsx` agora consomem este array, derivando localmente apenas os campos específicos de cada contexto.
  - Removido `app/data/services.ts` (após confirmar que apenas `ServicosGrid.tsx` o importava).
  - Removido `app/lib/useHorizontalScroll.ts` (código morto, sem importações em uso).
  - Documentada decisão de arquitectura sobre `Portfolio.tsx` vs `PortfolioManifest.tsx`.
- Componentes criados: nenhum componente novo; apenas `app/lib/constants.ts` e `app/data/servicos.ts` como ficheiros de dados/constants.
- Componentes reutilizados: `ServicosGrid.tsx`, `Needs.tsx`, `homeComponents/Services.tsx` agora reutilizam o array `SERVICES` de `app/data/servicos.ts`.
- Problemas encontrados:
  - O alias `@/` definido em `tsconfig.json` não é resolvido pelo `tsc --noEmit` directamente, causando erros de módulo não encontrado. Resolvido substituindo todos os imports de `@/` por caminhos relativos correctos (`../../lib/constants`, `../../data/servicos`).
  - `app/components/Footer.tsx` ficou com imports duplicados após edição anterior; corrigido reescrevendo o ficheiro com imports organizados no topo.
- Problemas corrigidos:
  - Eliminada duplicação de `WHATSAPP_LINK`, email, telefone, morada e link de orçamento em 9 ficheiros.
  - Eliminada duplicação de dados de serviços entre `Needs.tsx`, `homeComponents/Services.tsx` e `app/data/services.ts`.
  - Eliminado código morto `useHorizontalScroll.ts`.
- Problemas ainda existentes:
  - `/produtos` mantida a pedido do utilizador. Pendente adicionar links no footer e secção em Serviços (bloco futuro `06-servicos.md`).
- Ficheiros alterados:
  - `app/lib/constants.ts` (criado)
  - `app/data/servicos.ts` (criado)
  - `app/data/services.ts` (removido)
  - `app/lib/useHorizontalScroll.ts` (removido)
  - `app/components/servicosComponents/ServicosHero.tsx`
  - `app/components/servicosComponents/ServicosGuia.tsx`
  - `app/components/servicosComponents/ServicosWhy.tsx`
  - `app/components/servicosComponents/ServicosCtaFinal.tsx`
  - `app/components/servicosComponents/ServicosGrid.tsx`
  - `app/components/homeComponents/FinalCta.tsx`
  - `app/components/homeComponents/Needs.tsx`
  - `app/components/homeComponents/Services.tsx`
  - `app/components/homeComponents/Contact.tsx`
  - `app/components/NavBar.tsx`
  - `app/components/Footer.tsx`
  - `app/components/portfolioComponents/PortfolioManifest.tsx`
- Testes realizados:
  - `npx tsc --noEmit` sem erros.
  - `npm run build` compila com sucesso.
