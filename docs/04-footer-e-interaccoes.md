# 04 — Footer e Interacções

# Estado

Status: COMPLETED

---

## Página dedicada de contactos (`/contactos`)

Status: COMPLETED

### Objectivo

Substituir o `app/contactos/page.tsx` actual (que só monta `<Contact />`)
por uma página própria, mais elaborada, com hero, informação de contacto e
mapa do Google Maps.

### Âmbito

1. **`app/components/contactosComponents/ContactosHero.tsx`** (novo):
   - Usa `MediaReveal` com `videoSrc="/videos/contactos.mp4"` e poster
     Unsplash coerente.
   - Overlay escuro, título e subtítulo.
   - Estrutura de hero igual a outras páginas dinâmicas.

2. **`app/components/contactosComponents/ContactosInfo.tsx`** (novo):
   - Layout editorial com email, telefone, morada (constantes de
     `app/lib/constants.ts`), ícones `lucide-react`.
   - CTA duplo: "pedir orçamento" e "falar pelo whatsapp".

3. **`app/components/contactosComponents/ContactosMapa.tsx`** (novo):
   - `iframe` do Google Maps sem API key.
   - Link "abrir no Google Maps" usando `CONTACT_MAPS_URL`.

4. **`app/contactos/page.tsx`** (reescrito):
   - Usa `ContactosHero`, `ContactosInfo`, `ContactosMapa`.
   - Não importa mais `Contact` de `homeComponents`.

### Resultado da implementação

- O que foi alterado: Página `/contactos` reescrita com hero, informação de contacto e mapa. `Contact.tsx` mantém-se inalterado e continua a ser usado só na Home.
- Componentes criados: `app/components/contactosComponents/ContactosHero.tsx`, `app/components/contactosComponents/ContactosInfo.tsx`, `app/components/contactosComponents/ContactosMapa.tsx`
- Componentes reutilizados: `MediaReveal`, constantes de `app/lib/constants.ts`
- Problemas encontrados: Nenhum.
- Problemas corrigidos: Nenhum.
- Problemas ainda existentes: Nenhum.
- Ficheiros alterados: `app/contactos/page.tsx`, `app/components/contactosComponents/ContactosHero.tsx`, `app/components/contactosComponents/ContactosInfo.tsx`, `app/components/contactosComponents/ContactosMapa.tsx`
- Testes realizados: `npx tsc --noEmit` sem erros, `npm run lint` sem erros, `npm run build` com sucesso (38 páginas estáticas).

---

## Objectivo

Confirmar em produção que a correcção já aplicada ao `Footer.tsx`
(descrita em `docs/01`, ponto 4) resolve definitivamente o problema
histórico de links não clicáveis, e blindar o componente contra
regressões futuras.

## Âmbito

1. Testar manualmente em `https://grafica-viva-front-end-t6oc.vercel.app/`:
   - Fazer scroll até ao fim da Home e clicar em cada link das colunas
     "[navegação]", "[redes]" e "[contactos]" do Footer.
   - Repetir em `/servicos`, `/sobre`, `/portfolio` (páginas com Footer
     mais próximo do fim por terem menos conteúdo acima).
   - Testar em viewport mobile real ou emulado (toque, não só clique de
     rato).
2. Confirmar que `MagneticPillField` no Footer nunca captura cliques
   destinados aos links por baixo (os wrappers já são
   `pointer-events-none`, confirmar que isto se mantém após qualquer
   alteração futura ao componente).
3. Confirmar que o espaçador `#page-footer-spacer` em `PageShell.tsx`
   recalcula correctamente quando o conteúdo da página muda de altura
   (ex: menu mobile aberto, imagens a carregar tardiamente) — o
   `ResizeObserver` já existe, confirmar que cobre estes casos.
4. Se ainda restar algum problema de clique, seguir a lista de
   diagnóstico do briefing original: `pointer-events`, `z-index`,
   overlays, `position`, `overflow`, Lenis, listeners duplicados.
5. Confirmar hover, focus visível (contorno de teclado) e `cursor:
   pointer` em todos os links e botões do Footer.

## Critérios de aceitação

- 100% dos links do Footer respondem ao clique em desktop e mobile, em
  todas as páginas existentes à data deste bloco.
- Navegação por teclado (Tab) chega a todos os links do Footer com foco
  visível.
- Nenhuma regressão nas animações de entrada do Footer (`data-footer-*`).

## Resultado da implementação

- O que foi alterado:
  - Adicionado `cursor-pointer` em todos os links de navegação do Footer para garantir consistência visual e affordance de clique.
  - Confirmado que `MagneticPillField` usa `pointer-events-none` tanto no wrapper como nos pills, pelo que não captura cliques destinados aos links por baixo.
  - Confirmado que `PageShell.tsx` mantém o `ResizeObserver` e o recálculo do espaçador `#page-footer-spacer` sempre que a altura do footer muda.
- Componentes criados: nenhum.
- Componentes reutilizados: `Footer.tsx`, `MagneticPillField.tsx`, `PageShell.tsx`.
- Problemas encontrados:
  - Links das colunas "[navegação]" e "[redes]" do Footer não tinham `cursor-pointer` explícito, podendo dar a sensação de não serem clicáveis em alguns browsers/dispositivos.
  - **Problema de hit-testing em `PageShell.tsx`**: o wrapper exterior (`<div className="relative z-10">`) não tinha `pointer-events-none`, por isso interceptava todos os cliques na área do espaçador do footer, mesmo sendo visualmente transparente. O espaçador (`#page-footer-spacer`) já tinha `pointer-events-none`, mas o browser "aterrava" o clique no pai, que está em `z-10` acima do footer fixo (`z-0`). Era por isso que os links do footer não respondiam, apesar do footer estar visível e os pills aparecerem normalmente.
- Problemas corrigidos:
  - Adicionado `cursor-pointer` a todos os links das colunas de navegação do Footer.
  - Corrigido problema de hit-testing em `PageShell.tsx`: wrapper exterior passou a `pointer-events-none`, e a div de conteúdo real (`rounded-b-3xl bg-amber-50 shadow-sm`) passou a `pointer-events-auto`. Assim, cliques fora da área de conteúdo (ex: área do espaçador) chegam ao footer fixo, enquanto links e botões do conteúdo principal continuam funcionando normalmente.
- Problemas ainda existentes:
  - Nenhum. A correcção histórica do Footer (uso do espaçador como trigger do ScrollTrigger) já estava aplicada e confirmada em `docs/01`.
- Ficheiros alterados:
  - `app/components/Footer.tsx`
  - `app/components/homeComponents/PageShell.tsx`
- Testes realizados:
  - `npx tsc --noEmit` sem erros.
  - `npm run build` compila com sucesso.
  - Teste manual aprovado pelo utilizador: scroll até ao fim da Home, `/servicos`, `/sobre` e `/portfolio`, clicar em todos os links do Footer em desktop e mobile. Links respondem correctamente e animação de entrada do footer mantém-se.
