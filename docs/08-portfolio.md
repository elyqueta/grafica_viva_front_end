# 08 — Portfólio (`/portfolio`)

# Estado

Status: PENDING

---

## Objectivo

Resolver o achado mais importante da auditoria (`docs/01`, ponto 2.4 e
3.1): `/portfolio` não mostra nenhum trabalho real da Gráfica Viva, só
uma experiência conceptual (`PortfolioManifest`), enquanto existe um
componente pronto (`Portfolio.tsx`) com os 6 projectos mockados de
`app/data/portfolio.ts` que nunca chegou a ser usado.

## Âmbito

**Decisão prévia obrigatória (com o utilizador, antes de codificar):**
o `PortfolioManifest` (a experiência abstracta actual) fica:

- (a) removido e substituído por uma grelha real de projectos, ou
- (b) mantido como introdução/manifesto da marca, seguido de uma secção
  de grelha real de projectos abaixo, ou
- (c) outra combinação.

Não decidir isto sozinho, está marcado como decisão em aberto desde o
bloco `02`.

Uma vez decidido:

1. Construir a grelha de projectos reais a partir de
   `app/data/portfolio.ts`, reaproveitando o padrão visual já validado
   nos cards de `ServicosGrid`/`Needs`/`WhyUs` (full-bleed, overlay,
   legenda), não o carrossel horizontal pinado de `Portfolio.tsx` se essa
   interacção não for a pretendida para uma galeria de portfólio (avaliar
   com o utilizador; o carrossel pode ser mais adequado à Home, uma
   grelha normal mais adequada a `/portfolio`).
2. Cada projecto deve ser clicável para `/portfolio/[slug]` (bloco `09`).
3. Se `PortfolioManifest` for mantido, garantir que não compete
   visualmente com a nova grelha (ex: manifesto primeiro, depois "os
   nossos trabalhos" como secção separada com heading próprio).
4. Alinhar com o bloco `02`: quando existirem `serviceId` preenchidos,
   confirmar que esta página consegue eventualmente filtrar por serviço
   (preparar a estrutura, não necessariamente construir o filtro já).

## Critérios de aceitação

- `/portfolio` mostra pelo menos os 6 projectos reais mockados, com
  imagem, cliente e título.
- Nenhum componente de portfólio fica órfão (não usado) no final deste
  bloco.
- Consistência visual com o resto do site.

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
