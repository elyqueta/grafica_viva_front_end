# 14 — Orçamento (`/orcamento`)

# Estado

Status: PENDING — PRIORIDADE MÁXIMA

---

## Objectivo

Substituir o stub actual pelo formulário de conversão principal do site.
**Todos os CTAs "pedir orçamento" do site inteiro dependem desta
página** (ver `docs/01`, ponto 2.6). Este é o bloco de maior impacto de
negócio entre todos os pendentes.

## Âmbito

1. Campos do formulário (manter curto, conforme regra do briefing):
   nome, email, telefone, empresa (opcional), serviço (dropdown, opções
   de `app/data/servicos.ts`, pré-seleccionado se a página for aberta
   via `/orcamento?servico=slug` vindo do bloco `07`), tipo de
   projecto/descrição (textarea), prazo desejado (opcional).
2. Sem nova dependência de formulários: `useState` nativo, validação
   manual simples (campos obrigatórios, formato de email).
3. Estados: normal, foco (usar o mesmo tratamento visual de
   `rose-600`/`black/10` já usado nos botões do site), a submeter,
   sucesso, erro. Sem loading spinners genéricos, usar o vocabulário
   visual já existente (ex: mensagem de confirmação com o mesmo padrão
   `rounded-sm` + `bg-black/5` usado noutros feedbacks do site).
4. Sem backend real ainda: decidir com o utilizador o destino do
   submit (ex: `mailto:` simples via link, endpoint futuro, ou serviço
   de terceiros tipo Formspree). Não assumir uma solução sem confirmar,
   dado que envolve dados de cliente.
5. Layout: manter a identidade visual (`bg-amber-50`, `rose-600`,
   `rounded-sm`), Hero curto semelhante ao de `/servicos`, seguido do
   formulário, seguido de um CTA WhatsApp alternativo para quem prefira
   contacto directo em vez de formulário.

## Critérios de aceitação

- `/orcamento` deixa de mostrar "Página em desenvolvimento".
- Formulário funcional do lado do cliente (validação, estados),
  independentemente da solução de envio escolhida.
- Campo "serviço" pré-preenchido quando vindo de `/servicos/[slug]`.
- Acessível: labels associados, mensagens de erro anunciadas, navegável
  por teclado.

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
