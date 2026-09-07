# 06 — Serviços (`/servicos`)

# Estado

Status: PENDING

---

## Objectivo

Ao contrário das outras páginas, `/servicos` já está implementada e
deployada com sucesso (Hero, grelha editorial de 6 serviços, secção "não
sabe por onde começar", processo em 4 passos, "porque escolher",
`ScrollFillHeading` no CTA final). Este bloco é apenas de consolidação,
não de reconstrução.

## Âmbito

1. Resolver a duplicação de dados: confirmar que `ServicosGrid.tsx`
   importa de `app/data/servicos.ts` (fonte única definida no bloco `02`)
   e não de `app/data/services.ts`.
2. Confirmar que `WHATSAPP_LINK` em `ServicosHero.tsx`, `ServicosGuia.tsx`,
   `ServicosWhy.tsx`, `ServicosCtaFinal.tsx` foi substituído pela
   constante central (bloco `02`).
3. Testar em produção o efeito `ScrollFillHeading` no CTA final: scroll
   para baixo revela os caracteres, scroll para cima reverte, sem
   `pin`, sem saltos, em desktop e mobile.
4. Confirmar que `RelatedProjects` continua a devolver `null` de forma
   correcta em todos os serviços (nenhum projecto tem `serviceId` ainda),
   e que a grelha não quebra visualmente com este componente "vazio"
   dentro da legenda de cada card.
5. Revisão fina de responsividade: grelha `lg:grid-cols-12` com spans
   variáveis em tablet (breakpoint entre mobile empilhado e desktop
   editorial) — confirmar que não há um estado intermédio estranho.

## Critérios de aceitação

- Uma só fonte de dados de serviços em uso nesta página.
- Nenhum hardcode de contacto.
- `ScrollFillHeading` reversível e sem `pin`, confirmado visualmente.
- Grelha de serviços sem quebras em nenhum breakpoint.

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
