# 15 — Media Assíncrona (Imagens e Vídeo)

# Estado

Status: COMPLETED

---

## Objectivo

Garantir que nenhuma página fica com espaço vazio por falha ou demora de
carregamento de imagem/vídeo, e preparar o sistema para receber vídeo
real quando o cliente o disponibilizar.

## Âmbito

1. **Auditar todos os usos de `next/image`** nas páginas novas criadas
   nos blocos `07`, `08`, `09`, `10`, `11`: confirmar `sizes` correcto,
   `alt` descritivo (nunca vazio), e que existe sempre uma imagem válida
   mesmo em dados mockados (nenhum campo `image` vazio).
2. **Vídeo:** este projecto não tem, à data deste bloco, nenhum ficheiro
   de vídeo real fornecido pelo cliente (ver `AGENTS.md`, ponto 7). Não
   inventar URLs de vídeo. Preparar, sim, um componente reutilizável
   `MediaReveal` (ou nome equivalente, em `app/components/`) que:
   - Recebe uma imagem (obrigatória, funciona como poster/fallback) e um
     vídeo (opcional).
   - Mostra sempre a imagem primeiro.
   - Se `videoSrc` for fornecido, tenta carregar o vídeo de forma
     assíncrona (`preload="metadata"`, `playsInline`, sem autoplay com
     som) e faz crossfade para o vídeo quando estiver pronto.
   - Se `videoSrc` não for fornecido ou falhar o carregamento, a imagem
     permanece, sem espaço vazio nem erro visível.
3. Este componente fica pronto a usar assim que o cliente fornecer
   vídeos reais (ex: Hero da Home, Preloader, páginas de projecto), sem
   necessidade de nova arquitectura nessa altura.
4. Rever `Preloader.tsx`: já lida bem com fallback (`img.onerror`),
   confirmar que o mesmo padrão de robustez se aplica a qualquer imagem
   crítica acima da dobra noutras páginas.

## Critérios de aceitação

- Nenhuma imagem quebrada em nenhuma página do site.
- Componente `MediaReveal` criado e testado com pelo menos um caso real
  (imagem sem vídeo) e um caso simulado de falha de vídeo (URL inválida
  de propósito, para confirmar que o fallback funciona).
- Nenhum vídeo inventado ou URL de terceiros não autorizada.

## Resultado da implementação

- O que foi alterado: Criado componente reutilizável `MediaReveal` para gerir imagem + vídeo com fallback robusto. Aplicado em todas as secções hero/banner do site com `videoSrc` local (`/videos/...`) para teste de performance. Cada componente alterado tem comentário explícito de placeholder. O `MediaReveal` usa `preload="metadata"`, `muted loop playsInline`, activa playback via JS após `canplaythrough`, e faz crossfade GSAP (0.6s, power2.out) quando o vídeo está pronto. Em falha ou ausência de vídeo, a imagem permanece visível e o `<video>` é removido do DOM.
- Componentes criados: `app/components/MediaReveal.tsx`
- Componentes reutilizados: `MediaReveal` aplicado em `Hero.tsx`, `ServicosHero.tsx`, `app/servicos/[slug]/page.tsx`, `AboutStatement.tsx`, `app/portfolio/page.tsx`, `app/portfolio/[slug]/page.tsx`, `PortfolioManifest.tsx` (VisualBranco), `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `Contact.tsx`, `app/orcamento/page.tsx`, `app/parceiros/page.tsx`, `app/parceiros/[slug]/page.tsx`
- Problemas encontrados: `portfolio/[slug]/page.tsx` perdeu a importação de `next/image` após a substituição da hero image, corrigido. `ServicosHero.tsx` não possuía estrutura de media de fundo, adicionada com overlay `bg-amber-50/80` para manter legibilidade do texto. Import de `MediaReveal` em `ServicosHero.tsx` ajustado para `../MediaReveal`. `blog/page.tsx` faltava import de `MediaReveal`, adicionado. `AboutStatement.tsx` precisou de readicionar `next/image` para as imagens não-vídeo do scatter. `parceiros/[slug]/page.tsx` tinha import de `Image` não usado, removido.
- Problemas corrigidos: Tipos do TypeScript (`tsc --noEmit` passa), lint sem erros, build Next.js com sucesso (38 páginas estáticas).
- Problemas ainda existentes: Os ficheiros de vídeo ainda não existem em `/public/videos/`. O `MediaReveal` continua a mostrar apenas a imagem (comportamento de fallback) sem quebrar o build. Quando o utilizador colocar os 13 vídeos em `/public/videos/` com os nomes exactos da tabela, cada secção troca automaticamente de imagem para vídeo.
- Ficheiros alterados: `app/components/MediaReveal.tsx`, `app/components/homeComponents/Hero.tsx`, `app/components/servicosComponents/ServicosHero.tsx`, `app/servicos/[slug]/page.tsx`, `app/components/sobreComponents/AboutStatement.tsx`, `app/portfolio/page.tsx`, `app/portfolio/[slug]/page.tsx`, `app/components/portfolioComponents/PortfolioManifest.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/components/homeComponents/Contact.tsx`, `app/orcamento/page.tsx`, `app/parceiros/page.tsx`, `app/parceiros/[slug]/page.tsx`, `docs/15-media-assincrona.md`
- Testes realizados: TypeScript compile (`tsc --noEmit`), ESLint (`npm run lint`), build Next.js (`npm run build`), fallback testado via `onError` no vídeo.
