# AGENTS.md — Gráfica Viva

Este ficheiro é o manual operacional do projecto. Qualquer agente (Kilo Code,
Claude, ou outro) que trabalhe neste repositório deve ler este documento
**antes** de tocar em código.

---

## 1. O que é este projecto

Website institucional multi-página da **Gráfica Viva**, um estúdio criativo
angolano (Luanda) que oferece serviços de impressão, branding, digital e
promocionais. Construído com Next.js App Router, TypeScript, Tailwind CSS,
GSAP + ScrollTrigger e Lenis para scroll suave.

O objectivo final é um produto real, pronto para produção, não um protótipo.
**Qualidade > velocidade. Reutilização > duplicação. Consistência >
criatividade desnecessária. UX > efeitos. Produto real > aparência de
template.**

## 2. Referência visual

Site de referência (apenas inspiração de qualidade visual, composição, ritmo
e comportamento de interacção): `https://yeqq.com.tr/`.

**Nunca copiar directamente.** A Gráfica Viva mantém identidade própria e o
design system descrito abaixo.

## 3. Stack (não adicionar bibliotecas sem necessidade real)

- Next.js (App Router) — actualmente `16.2.12`
- React `19.2.4` / React DOM `19.2.4`
- TypeScript `5.9` (`strict: true`)
- Tailwind CSS `4.x` (via `@tailwindcss/postcss`)
- GSAP `3.15` + `@gsap/react` + `ScrollTrigger` + `Flip`
- Lenis `1.3.25` (smooth scroll)
- lucide-react (ícones). Font Awesome está instalado mas não é usado
  activamente — não introduzir novos usos sem motivo forte.
- Imagens: `next/image`, remoto via `images.unsplash.com` (placeholders) e
  `placehold.co` (parceiros de exemplo).

Não instalar bibliotecas de formulários, animação, ou UI kits novos sem
aprovação explícita. Antes de resolver um problema com uma dependência nova,
verificar se GSAP, Tailwind ou React puro já resolvem.

## 4. Identidade visual e orthografia (regras fixas)

- Base `bg-amber-50`, acento `rose-600`, cards `rounded-sm`.
- Linguagem editorial disciplinada, cards full-bleed (imagem domina,
  overlay no hover, pill CTA central), não usar cards pequenos com imagem
  no topo + texto por baixo, salvo indicação explícita.
- Todo o conteúdo em **português de Portugal, pré-AO90**
  (`projecto`, `objectivo`, `contacto`, `orçamento`, não `projeto`,
  `objetivo`).
- **Nunca usar travessões** (`—` nem `–`) em texto de interface. Usar
  vírgulas, dois pontos ou frases curtas.
- CTAs "pedir orçamento" apontam sempre para `/orcamento`.
- CTAs de WhatsApp apontam sempre para `https://wa.me/244924666323`
  (ver regra de constantes no ponto 6).
- Nav aponta para páginas dedicadas (`/sobre`, `/servicos`, `/portfolio`,
  `/blog`, `/contactos`), não para âncoras, excepto `#parceiros` na Home.

## 5. Regras de animação (GSAP)

- Usar `gsap.context()` dentro de `useEffect` em componentes React, e
  limpar sempre com `ctx.revert()` no cleanup.
- Entradas de secção: `gsap.from(...)` com `ScrollTrigger`,
  `start: 'top 80%'` (ou `75%`/`85%` conforme o ritmo pretendido), sem
  `scrub`, sem `pin`, easing `power2.out`, stagger `0.05` a `0.12`.
- Animações ligadas à posição do scroll (parallax, preenchimento de texto,
  pin de carrossel horizontal) usam `scrub: true` e nunca `once`. Devem
  ser reversíveis ao subir o scroll.
- Nunca usar bounce, escalas agressivas, rotações ou movimentos rápidos.
- Antes de criar uma animação nova, procurar se já existe um padrão igual
  no projecto (ver `docs/02-design-system-e-componentizacao.md`).

## 6. Regra de constantes (obrigatória, sem excepções)

**Nunca hardcodar isoladamente** em múltiplos ficheiros:

- Números de contacto, WhatsApp, email, morada.
- URLs externas (redes sociais, mapas).
- Tokens de cor/acento repetidos entre secções.
- Variáveis de ambiente ou URLs de API/CMS futuras.

Estes valores devem viver num único ficheiro central,
`app/lib/constants.ts` (segue a convenção já existente de `app/lib/`), e
todos os componentes devem importar de lá. Ver auditoria em
`docs/01-auditoria-e-arquitectura.md` para a lista de ficheiros que hoje
violam esta regra (ex: `WHATSAPP_LINK` está duplicado em pelo menos 6
componentes).

Variáveis de ambiente (quando existirem, ex: URL de CMS/API futura) vivem
em `.env.local` e são acedidas via um único módulo `app/lib/env.ts`, nunca
via `process.env.X` espalhado pelos componentes.

## 7. Regras de dados mockados

Enquanto não existir CMS/API real:

- Estruturas de dados vivem em `app/data/*.ts`, tipadas, nunca strings
  soltas dentro de JSX.
- Imagens mockadas: usar Unsplash (já configurado em `next.config`),
  escolhendo fotos que representem realisticamente o serviço/projecto
  (impressão, papel, embalagem, sinalética, etc.), nunca imagens genéricas
  de stock que não façam sentido para uma gráfica angolana.
- Vídeo: **não inventar URLs de vídeo hospedado**. Enquanto não houver
  ficheiros de vídeo reais fornecidos pelo cliente, qualquer secção que
  preveja vídeo deve funcionar apenas com a imagem (poster) como camada
  final, não com um placeholder de vídeo quebrado. Confirmar com o
  utilizador antes de introduzir qualquer URL de vídeo externo.
- Nunca inventar: preços, prazos, número de clientes, estatísticas,
  prémios, certificações, parceiros reais, testemunhos. Ver
  `app/data/partners.ts`, que já está claramente marcado como dados de
  exemplo — seguir o mesmo padrão de aviso em qualquer novo dado mockado.

## 8. Princípio de reutilização

Antes de criar um componente novo, procurar um equivalente:

- Card de serviço/projecto/artigo → já existe um padrão de card
  full-bleed usado em `Needs.tsx`, `WhyUs.tsx`, `ServicosGrid.tsx`. Não
  criar um quarto padrão de card sem generalizar os três primeiros.
- CTA de orçamento/WhatsApp → usar as constantes do ponto 6, não recriar
  o par de botões em cada secção sem partilhar a marcação.
- Título com preenchimento por scroll → já existe
  `ScrollFillHeading.tsx` (em `app/components/servicosComponents/`).
  Reutilizar ou promover para uma pasta partilhada antes de duplicar.
- Ver auditoria (`docs/01`) para a lista completa de duplicações actuais
  a resolver antes de criar componentes novos.

## 9. Estrutura de execução (regra mais importante)

Este projecto executa-se **um bloco de `/docs` por sessão**.

1. Ler este `AGENTS.md`.
2. Ler `docs/` e encontrar o primeiro documento com `Status: PENDING`.
3. Ler esse documento por completo.
4. Verificar o estado actual do código relevante (o código pode ter
   mudado desde a última auditoria).
5. Executar **apenas** esse bloco.
6. Preencher a secção "Resultado da implementação" desse documento.
7. Mudar `Status` para `COMPLETED` (ou manter `IN_PROGRESS` se ficou a
   meio, explicando porquê).
8. **Parar.** Não avançar automaticamente para o bloco seguinte.
9. Reportar ao utilizador: o que foi feito, ficheiros alterados,
   problemas encontrados/corrigidos, e pedir para testar manualmente.

Se o utilizador encontrar um problema num bloco já marcado `COMPLETED`,
o bloco reabre: voltar a `IN_PROGRESS`, corrigir, documentar a correcção,
voltar a pedir teste. Só depois disso o bloco seguinte pode começar.

## 10. Regra de não destruição

Não remover componentes, animações, bibliotecas ou estilos existentes sem
verificar primeiro se estão a ser usados e porquê. Se uma solução actual
funciona e está alinhada com o objectivo, reutiliza-se, não se substitui
por preferência estética.

## 11. Critério de qualidade para cada bloco

Antes de marcar um bloco como concluído, confirmar:

- **Visual**: parece profissional e coerente com o resto do site?
- **UX**: o utilizador sabe qual é o próximo passo?
- **Performance**: imagens optimizadas, sem Client Components
  desnecessários, sem listeners a mais?
- **Código**: TypeScript estrito, sem `any`, nomes claros?
- **Componentização**: existe reutilização real, não duplicação?
- **Responsividade**: testado mentalmente/via código em mobile, tablet,
  desktop?
- **Acessibilidade**: HTML semântico, `alt`, `aria-label` quando
  necessário, foco visível, `button`/`a` usados correctamente?
- **Consistência**: usa as constantes do ponto 6, não hardcode isolado?
- **pt-PT**: pré-AO90, sem travessões?

## 12. Relação com `/docs`

```
docs/
├── 01-auditoria-e-arquitectura.md      [COMPLETED — ler primeiro sempre]
├── 02-design-system-e-componentizacao.md
├── 03-correcao-global-de-navegacao.md
├── 04-footer-e-interaccoes.md
├── 05-home.md
├── 06-servicos.md
├── 07-servico-individual.md
├── 08-portfolio.md
├── 09-projecto-individual.md
├── 10-blog.md
├── 11-artigo-individual.md
├── 12-tutoriais.md                     [a confirmar, ver nota em 01]
├── 13-tutorial-individual.md           [a confirmar, ver nota em 01]
├── 14-orcamento.md
├── 15-media-assincrona.md
├── 16-ux-e-cta.md
├── 17-responsividade-e-acessibilidade.md
├── 18-performance-e-seo.md
└── 19-auditoria-final.md
```

`docs/01-auditoria-e-arquitectura.md` já está `COMPLETED` com uma auditoria
inicial. Os restantes estão `PENDING`, com objectivo e critérios de
aceitação definidos mas ainda por executar. Executar pela ordem numérica,
salvo dependência explícita indicada num documento.
