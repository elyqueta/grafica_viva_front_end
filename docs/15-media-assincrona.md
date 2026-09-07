# 15 — Media Assíncrona (Imagens e Vídeo)

# Estado

Status: PENDING

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

_(preencher ao executar este bloco)_

- O que foi alterado:
- Componentes criados:
- Componentes reutilizados:
- Problemas encontrados:
- Problemas corrigidos:
- Problemas ainda existentes:
- Ficheiros alterados:
- Testes realizados:
