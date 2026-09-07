# 04 — Footer e Interacções

# Estado

Status: PENDING

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

_(preencher ao executar este bloco)_

- O que foi alterado:
- Componentes criados:
- Componentes reutilizados:
- Problemas encontrados:
- Problemas corrigidos:
- Problemas ainda existentes:
- Ficheiros alterados:
- Testes realizados:
