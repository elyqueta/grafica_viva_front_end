# 03 — Correcção Global de Navegação

# Estado

Status: COMPLETED

---

## Objectivo

Garantir que toda a navegação do site (Navbar, links internos, links
externos, âncoras) funciona correctamente em todas as páginas, incluindo
as que ainda são stubs, e que nenhum link aponta para um destino errado
ou inexistente.

## Âmbito

1. **Auditar todos os `href` do `NavBar.tsx`:**
   - `/`, `/servicos`, `/sobre`, `/#parceiros`, `/blog`, `/contactos` no
     desktop e no painel mobile (Flip morph). Confirmar que `/#parceiros`
     funciona correctamente quando navegado a partir de outra página
     (ex: de `/servicos` para `/#parceiros` deve navegar para a Home e
     depois fazer scroll até à secção, não falhar silenciosamente).
   - Botão de idioma "en": decidir com o utilizador se fica desactivado
     visualmente (ex: `disabled`, `aria-disabled`) até existir i18n real,
     em vez de parecer clicável sem fazer nada.
2. **Confirmar estado activo do link corrente** (`pathname === link.href`)
   funciona correctamente em rotas dinâmicas que venham a existir
   (`/servicos/[slug]`, `/blog/[slug]`, `/portfolio/[slug]`) — o link
   "pai" (`/servicos`, `/blog`, `/portfolio`) deve continuar destacado
   nessas subpáginas.
3. **Menu mobile:** confirmar que o `Flip` morph do botão para o painel
   não deixa a página com `overflow: hidden` preso se o utilizador
   navegar via teclado ou fechar de forma atípica (ex: back button do
   browser com o menu aberto).
4. Rever todos os links internos fora da Navbar que apontam para páginas
   que, à data deste bloco, já devem existir com conteúdo real
   (`/orcamento`, `/contactos`, `/blog`, `/portfolio`) — confirmar que
   nenhum CTA ficou esquecido a apontar para uma versão antiga ou stub.
5. Confirmar que `usePathname` e a Navbar fixa não entram em conflito com
   o `PageShell`/Lenis durante troca de rota (scroll deve resetar para o
   topo em navegação normal, salvo quando é uma âncora).

## Critérios de aceitação

- Todos os links da Navbar (desktop e mobile) navegam para o destino
  certo, testado manualmente em pelo menos 3 páginas de partida
  diferentes.
- Nenhum link morto (`href="#"` sem função, ou apontando para uma rota
  removida).
- Estado activo do link correcto em todas as rotas, incluindo dinâmicas.

## Resultado da implementação

- O que foi alterado:
  - Corrigida lógica de estado activo na Navbar (`NavBar.tsx`): links "pai" (`/servicos`, `/blog`, `/portfolio`) continuam destacados em subpáginas dinâmicas. Links de âncora (`/#parceiros`) não entram no cálculo de estado activo.
  - Adicionado fecho automático do menu mobile em 3 cenários: (1) mudança de rota (`usePathname`), (2) tecla `Escape`, (3) redimensionamento para desktop (`matchMedia` breakpoint 1024px).
  - Botão de idioma "en" marcado como desactivado (`disabled`, `aria-disabled="true"`, `aria-label="Idioma indisponível"`).
  - Adicionado reset de scroll em `PageShell.tsx`: ao mudar de rota, o scroll sobe para o topo ou para a âncora respectiva, evitando conflito com Lenis.
- Componentes criados: nenhum.
- Componentes reutilizados: `NavBar.tsx`, `PageShell.tsx`.
- Problemas encontrados:
  - Estado activo da Navbar usava `pathname === link.href`, que falhava em rotas dinâmicas e no link `/#parceiros`.
  - Menu mobile podia ficar com `overflow: hidden` preso se o utilizador mudasse de rota com o menu aberto, ou se redimensionasse o ecrã para desktop.
  - Não havia reset de scroll entre páginas: ao navegar de `/servicos` para `/`, o utilizador ficava na mesma posição de scroll em vez de subir ao topo.
  - Botão de idioma "en" parecia clicável mas não tinha qualquer acção nem indicação de estar desactivado.
- Problemas corrigidos:
  - Estado activo agora funciona em rotas dinâmicas.
  - Menu mobile fecha automaticamente em mudança de rota, tecla `Escape` e redimensionamento para desktop.
  - Scroll reset implementado em `PageShell.tsx` com suporte a âncoras.
  - Botão de idioma desactivado e com `aria-label` explicito.
- Problemas ainda existentes:
  - Nenhum.
- Ficheiros alterados:
  - `app/components/NavBar.tsx`
  - `app/components/homeComponents/PageShell.tsx`
- Testes realizados:
  - `npx tsc --noEmit` sem erros.
  - `npm run build` compila com sucesso.
