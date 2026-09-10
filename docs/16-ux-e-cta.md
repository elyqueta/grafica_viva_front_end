# 16 — UX e CTAs

# Estado

Status: COMPLETED

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

- O que foi alterado:
  - `Needs.tsx`: CTA "saber mais →" alterado para "ver soluções", mantendo o link para `/servicos`.
  - `Services.tsx`: CTA "• ver mais" alterado para "• ver todos os serviços", mantendo o link para `/servicos`. `href="/orcamento"` substituído por `ORCAMENTO_LINK` da constante central.
  - `PortfolioManifest.tsx`: botão de expandir/recolher alterado de "saber mais" para "ler manifesto", mais alinhado com o contexto do manifesto.
  - `ServicosHero.tsx`: `href="/orcamento"` substituído por `ORCAMENTO_LINK`.
  - `ServicosGuia.tsx`: `href="/orcamento"` substituído por `ORCAMENTO_LINK`.
  - `ServicosCtaFinal.tsx`: `href="/orcamento"` substituído por `ORCAMENTO_LINK`.
  - `Footer.tsx`: `href="/orcamento"` substituído por `ORCAMENTO_LINK`.
  - `FinalCta.tsx`: `href="/orcamento"` substituído por `ORCAMENTO_LINK`.
  - `OrcamentoForm.tsx`: substituído uso incorreto de `WHATSAPP_LINK` para extrair número de telefone no `mailto:` por `CONTACT_EMAIL`, que é o valor correcto para envio de email.
- Componentes criados: nenhum.
- Componentes reutilizados: `Needs.tsx`, `Services.tsx`, `PortfolioManifest.tsx`, `ServicosHero.tsx`, `ServicosGuia.tsx`, `ServicosCtaFinal.tsx`, `Footer.tsx`, `FinalCta.tsx`, `OrcamentoForm.tsx`.
- Problemas encontrados:
  - CTAs genéricos "saber mais" e "ver mais" em `Needs.tsx` e `Services.tsx`, sem ligação clara ao destino.
  - Texto "saber mais" em `PortfolioManifest.tsx`, genérico para o contexto do manifesto.
  - Vários componentes com `href="/orcamento"` hardcoded em vez de usarem `ORCAMENTO_LINK` da constante central, violando a regra de constantes.
  - `OrcamentoForm.tsx` usava `WHATSAPP_LINK.replace("https://wa.me/", "")` para gerar um endereço `mailto:`, o que não faz sentido (mailto deve usar email, não número de telefone).
- Problemas corrigidos:
  - Eliminados textos genéricos de CTA, substituídos por alternativas específicas orientadas à acção.
  - Eliminados todos os hardcodes isolados de `/orcamento` nos CTAs principais, passando a usar `ORCAMENTO_LINK` em todos os componentes afectados.
  - Corrigido `mailto:` em `OrcamentoForm.tsx` para usar `CONTACT_EMAIL` em vez do número de WhatsApp.
- Problemas ainda existentes:
  - Nenhum. WhatsApp está consistente em todas as páginas via constante `WHATSAPP_LINK` (NavBar mobile, Footer, Contact, Orcamento, Serviços, Portfolio, Blog).
- Ficheiros alterados:
  - `app/components/homeComponents/Needs.tsx`
  - `app/components/homeComponents/Services.tsx`
  - `app/components/portfolioComponents/PortfolioManifest.tsx`
  - `app/components/servicosComponents/ServicosHero.tsx`
  - `app/components/servicosComponents/ServicosGuia.tsx`
  - `app/components/servicosComponents/ServicosCtaFinal.tsx`
  - `app/components/Footer.tsx`
  - `app/components/homeComponents/FinalCta.tsx`
  - `app/orcamento/OrcamentoForm.tsx`
  - `docs/16-ux-e-cta.md`
- Testes realizados:
  - `npx tsc --noEmit` sem erros.
  - `npm run build` compila com sucesso (38 páginas estáticas).
  - `npm run lint` sem erros novos nos ficheiros alterados (warnings pré-existentes em `NavBar.tsx`, `Preloader.tsx`, `MagneticPillField.tsx`, `PortfolioManifest.tsx`).

## Capitalização de textos (pt-PT)

Após a conclusão do bloco `16`, foi executada uma correcção adicional de capitalização em todo o conteúdo textual do site, garantindo que todas as frases e títulos começam com letra maiúscula, conforme regras gramaticais do pt-PT.

### Âmbito

1. **Componentes React**: actualizados todos os textos visíveis nos componentes de todas as páginas (Home, Serviços, Portfólio, Blog, Orçamento, Contactos, Sobre, Parceiros), incluindo títulos, botões, parágrafos, labels, mensagens de erro, placeholders e aria-labels.
2. **Dados mockados**: actualizados todos os textos em `app/data/servicos.ts`, `app/data/portfolio.ts`, `app/data/blog.ts` e `app/data/partners.ts`, mantendo a estrutura existente e apenas corrigindo a capitalização de parágrafos e títulos.

### Ficheiros alterados

- `app/components/homeComponents/*.tsx`
- `app/components/servicosComponents/*.tsx`
- `app/components/portfolioComponents/*.tsx`
- `app/components/contactosComponents/*.tsx`
- `app/components/sobreComponents/*.tsx`
- `app/components/Footer.tsx`
- `app/components/NavBar.tsx`
- `app/orcamento/OrcamentoForm.tsx`
- `app/orcamento/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/portfolio/page.tsx`
- `app/portfolio/[slug]/page.tsx`
- `app/servicos/[slug]/page.tsx`
- `app/parceiros/page.tsx`
- `app/parceiros/[slug]/page.tsx`
- `app/data/servicos.ts`
- `app/data/portfolio.ts`
- `app/data/blog.ts`
- `app/data/partners.ts`

### Validação

- `npx tsc --noEmit` sem erros.
- `npm run build` compila com sucesso (38 páginas estáticas).
