# 05 — Home

# Estado

Status: PENDING

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

_(preencher ao executar este bloco)_

- O que foi alterado:
- Componentes criados:
- Componentes reutilizados:
- Problemas encontrados:
- Problemas corrigidos:
- Problemas ainda existentes:
- Ficheiros alterados:
- Testes realizados:
