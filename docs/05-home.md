# 05 — Home

# Estado

Status: COMPLETED

---

## Objectivo

A Home já está funcionalmente completa (ver `docs/01`, ponto 2.1). Este
bloco é de refinamento, não de reconstrução: alinhar a Home com as
decisões tomadas no bloco `02` (constantes, dados de serviços unificados)
e resolver o único achado crítico que lhe diz respeito: o componente
`Portfolio.tsx` não usado.

## Âmbito

1. Actualizar `Needs.tsx` e `homeComponents/Services.tsx` para consumirem
   `app/data/servicos.ts` (resultado do bloco `02`), em vez de arrays
   locais.
2. Decidir e aplicar o destino de `homeComponents/Portfolio.tsx`, de
   acordo com o que ficou decidido no bloco `02` (ex: montá-lo na Home
   como secção "trabalhos realizados" antes ou depois de `WhyUs`, se essa
   for a decisão, ou remover se for redundante com o bloco `08`).
3. Substituir `WHATSAPP_LINK`, email, telefone hardcoded em `Hero.tsx`,
   `Contact.tsx`, `FinalCta.tsx` pelas constantes de `app/lib/constants.ts`.
4. Rever `Contact.tsx`: decidir se continua também na Home (secção
   `id="contactos"`, útil para quem não quer sair da Home) além de
   existir na página dedicada `/contactos`, ou se passa a ser exclusivo
   de `/contactos` com um CTA na Home a apontar para lá. Esta decisão
   deve ser tomada em conjunto com o utilizador, não assumida.
5. **Implementar `app/contactos/page.tsx`** com conteúdo real,
   substituindo o stub actual (`docs/01`, ponto 2.7). Reutilizar
   `Contact.tsx` (ou uma versão adaptada, conforme a decisão do ponto 4)
   em vez de recriar a secção de contacto do zero. Esta página está
   ligada directamente à Navbar, é uma correcção de prioridade alta, por
   isso foi incluída neste bloco de Home em vez de ficar para mais
   tarde.
5. Confirmar que a Home carrega bem em mobile: `Preloader`, carrossel de
   `Services`, `Partners` marquee, pills magnéticas de `Contact`.

## Critérios de aceitação

- Home sem arrays de serviços duplicados.
- Nenhum hardcode de contacto/WhatsApp na Home.
- Decisão sobre `Portfolio.tsx` e sobre duplicação de `Contact.tsx`
  documentada e aplicada.
- Nenhuma regressão visual ou de animação nas secções já existentes.

## Resultado da implementação

- O que foi alterado:
  - Confirmado que `Needs.tsx` e `homeComponents/Services.tsx` já consumiam `app/data/servicos.ts` (resultado do bloco `02`). Nenhuma alteração necessária.
  - Removido `app/components/homeComponents/Portfolio.tsx` (código morto, não importado em lado nenhum), conforme decisão do bloco `02`.
  - Atualizado `Hero.tsx` para importar `ORCAMENTO_LINK` de `app/lib/constants.ts` e usá-lo no CTA "PEDIR ORÇAMENTO", eliminando o hardcode `/orcamento`.
  - Modificado `Contact.tsx` para aceitar uma prop opcional `sectionId?: string`, permitindo reutilizar o componente tanto na Home (com `id="contactos"`) como na página dedicada `/contactos` (sem id duplicado).
  - Implementada `app/contactos/page.tsx` com conteúdo real, reutilizando `Contact.tsx` com Navbar e PageShell.
- Componentes criados: `app/contactos/page.tsx`.
- Componentes reutilizados: `Contact.tsx` (modificado para aceitar prop), `Hero.tsx` (actualizado), `NavBar.tsx`, `Footer.tsx`, `PageShell.tsx`.
- Problemas encontrados:
  - `homeComponents/Portfolio.tsx` era código morto, não importado em lado nenhum (confirmado por grep). Removido.
  - `Hero.tsx` tinha `/orcamento` hardcoded no CTA, apesar de `FinalCta.tsx` e `Contact.tsx` já usarem constantes.
  - `Contact.tsx` tinha `id="contactos"` hardcoded, impedindo a reutilização segura em `/contactos/page.tsx` sem duplicação de ID.
  - `app/contactos/page.tsx` era um stub sem conteúdo.
- Problemas corrigidos:
  - Eliminado hardcode `/orcamento` em `Hero.tsx`.
  - `Contact.tsx` agora reutilizável em múltiplas páginas via prop `sectionId`.
  - `app/contactos/page.tsx` deixou de ser stub e passou a ter conteúdo real.
- Problemas ainda existentes:
  - Nenhum.
- Decisão sobre `Contact.tsx` na Home vs `/contactos`:
  - `Contact.tsx` continua na Home (útil para CTA direto sem sair da página) com `sectionId="contactos"`.
  - `/contactos/page.tsx` reutiliza `Contact.tsx` sem id, evitando duplicação.
- Ficheiros alterados:
  - `app/components/homeComponents/Portfolio.tsx` (removido)
  - `app/components/homeComponents/Hero.tsx`
  - `app/components/homeComponents/Contact.tsx`
  - `app/page.tsx`
  - `app/contactos/page.tsx`
  - `docs/05-home.md`
- Testes realizados:
  - `npx tsc --noEmit` sem erros.
  - `npm run build` compila com sucesso.
