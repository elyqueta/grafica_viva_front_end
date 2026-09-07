# 16 — UX e CTAs

# Estado

Status: PENDING

---

## Objectivo

Rever todos os CTAs do site depois de todas as páginas estarem
completas (blocos `05` a `14`), garantindo hierarquia clara e nenhum CTA
fraco ou redundante.

## Âmbito

1. Levantar todos os CTAs existentes no site (Home, Serviços, Serviço
   individual, Portfólio, Projecto individual, Blog, Artigo individual,
   Orçamento, Contactos, Footer) e confirmar que seguem a hierarquia:
   - Principal: "pedir orçamento" → `/orcamento` (ou
     `/orcamento?servico=slug` quando aplicável).
   - Secundário: "falar pelo whatsapp" → constante central.
   - Terciário (navegação de conteúdo): "conhecer serviço", "ver
     projecto", "ler artigo" — nunca "saber mais"/"ver mais" genérico
     quando existe uma opção mais específica e orientada à acção.
2. Confirmar que cada página tem um único CTA principal visualmente
   dominante (evitar 2 botões `rose-600` fortes na mesma secção,
   conforme já ajustado em `ServicosWhy.tsx` durante o bloco `06`).
3. Rever a página de destino de cada CTA terciário identificado no
   código actual (ex: "saber mais" em `PortfolioManifest.tsx`, que hoje
   não parece ter destino funcional).
4. Confirmar que o botão flutuante/link de WhatsApp está consistente em
   todas as páginas (Navbar mobile tem link WhatsApp no painel; Footer
   tem WhatsApp; confirmar que não faltam nem sobram pontos de contacto).

## Critérios de aceitação

- Nenhum CTA com texto genérico quando existe alternativa mais
  específica.
- Nenhuma página com dois CTAs `rose-600` a competir visualmente.
- Todos os CTAs testados manualmente, sem destino morto.

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
