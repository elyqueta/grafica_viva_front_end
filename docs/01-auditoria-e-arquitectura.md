# 01 — Auditoria e Arquitectura

# Estado

Status: COMPLETED

---

## Objectivo

Compreender o estado real do projecto antes de qualquer alteração:
arquitectura, páginas existentes/incompletas, duplicações, problemas de
UX, performance, responsividade, navegação, Footer e media.

## Método usado nesta sessão

Esta auditoria foi feita com base em duas fontes:

1. **Código-fonte** dos componentes partilhados ao longo da conversa
   (Navbar, Footer, PageShell, todas as secções da Home, `/sobre`,
   `/servicos`, `/portfolio`, `package.json`, `tsconfig.json`,
   `globals.css`).
2. **Site em produção**, `https://grafica-viva-front-end-t6oc.vercel.app/`,
   consultado directamente (`/`, `/servicos`, `/portfolio`, `/blog`,
   `/contactos`, `/orcamento`) para confirmar o que está realmente
   deployado.

**Limitação importante:** este agente não tem acesso ao sistema de
ficheiros real do repositório, apenas ao código colado na conversa e ao
HTML renderizado do site publicado. Ficheiros nunca partilhados nesta
conversa (`next.config.ts`, `.env`, `middleware.ts`, `layout` metadata
completo, `robots.ts`/`sitemap.ts`, CI/CD) **não foram auditados** e devem
ser revistos por quem tiver acesso directo ao repositório no início do
bloco `02`.

---

## 1. Arquitectura actual

```
app/
├── layout.tsx                         (fonte Poppins + Geist Mono, lang="pt-PT")
├── globals.css                        (Tailwind import + scroll-behavior)
├── page.tsx                           (Home)
├── sobre/page.tsx                     (completo)
├── servicos/page.tsx                  (completo, ver nota 2.3)
├── portfolio/page.tsx                 (usa PortfolioManifest, ver nota 3.1)
├── blog/page.tsx                      (stub)
├── contactos/page.tsx                 (stub)
├── orcamento/page.tsx                 (stub)
├── produtos/page.tsx                  (stub órfão, não referenciado em nav/footer)
├── data/
│   ├── services.ts / servicos.ts      (DUPLICADO, ver 4.1)
│   ├── portfolio.ts                   (6 projectos mockados, sem serviceId preenchido)
│   └── partners.ts                    (marcado como dados de exemplo, correcto)
├── lib/
│   ├── fontawesome.ts                 (configurado mas não usado)
│   └── useHorizontalScroll.ts         (hook, ver 4.4 sobre uso real)
└── components/
    ├── NavBar.tsx, Footer.tsx
    ├── Preloader.tsx
    ├── homeComponents/  (Hero, About, Services, Needs, HowItWorks, WhyUs,
    │                     Partners, Blog, Contact, FinalCta, Portfolio,
    │                     PageShell, MagneticPillField, ScrollArrows)
    ├── sobreComponents/ (AboutStatement, AboutBio, AboutTools, AboutValues,
    │                     AboutDiscover)
    ├── servicosComponents/ (ServicosHero, ServicosGrid, ServicosGuia,
    │                        ServicosProcesso, ServicosWhy, ServicosCtaFinal,
    │                        ScrollFillHeading, RelatedProjects)
    └── portfolioComponents/ (PortfolioManifest)
```

## 2. Estado real de cada página (confirmado via fetch ao site em produção)

### 2.1 Home (`/`) — completa
Hero, Needs, About, Services (carrossel horizontal pinado), HowItWorks,
WhyUs, Partners (marquee infinito), Blog (teaser), FinalCta, Contact,
Footer. Funcional e rica em conteúdo.

**Achado:** `Portfolio.tsx` (componente de carrossel de projectos reais
com imagens, em `homeComponents/`) **não é importado em lado nenhum**,
nem em `page.tsx` da Home nem em `/portfolio`. É código morto neste
momento. Ver 3.1.

### 2.2 Sobre (`/sobre`) — completa
Cinco componentes, incluindo o canvas interactivo `AboutDiscover`. Sem
problemas visíveis no código.

### 2.3 Serviços (`/servicos`) — completa e já deployada
Confirmado via fetch: Hero, grelha de 6 serviços com descrição e
exemplos, secção "não sabe por onde começar", "processo" em 4 passos,
"porque escolher a gráfica viva", CTA final. Todos os CTAs "pedir
orçamento" apontam correctamente para `/orcamento`. Este bloco de
trabalho está concluído; falta apenas resolver a duplicação de dados
referida em 4.1 e o `/orcamento` de destino (que é um stub, ver 2.6).

### 2.4 Portfolio (`/portfolio`) — incompleta, sem projectos reais
Confirmado via fetch: a página usa `PortfolioManifest.tsx`, uma
experiência conceptual/abstracta (secções "branco", "entropia",
"pareto", "o ofício", etc.) com pequenas interacções (SVG, contadores,
toggle). **Não mostra nenhum dos 6 projectos reais de `app/data/portfolio.ts`
nem nenhuma imagem de trabalho realizado.** Para um estúdio de gráfica, a
ausência de uma galeria visual real de trabalhos é uma lacuna crítica de
prova social. Este é provavelmente o achado mais importante da auditoria.

### 2.5 Blog (`/blog`) — stub
Confirmado via fetch: apenas "Página em desenvolvimento". A Home já lista
3 posts (`Blog.tsx`, dados inline) que apontam para
`/blog/[slug]`, rotas que não existem ainda.

### 2.6 Orçamento (`/orcamento`) — stub, crítico
Confirmado via fetch: apenas "Página em desenvolvimento". **Todos os
CTAs "pedir orçamento" do site inteiro (Home, Serviços, Footer, Sobre)
apontam para esta página.** É o destino de conversão principal do site e
está vazio. Prioridade máxima entre todos os stubs.

### 2.7 Contactos (`/contactos`) — stub, duplica conteúdo já existente
Confirmado via fetch: apenas "Página em desenvolvimento". Existe já um
componente `Contact.tsx` completo (secção com pills magnéticas, morada,
telefone, email, CTA WhatsApp) mas está montado **apenas na Home**
(`id="contactos"`), não na página dedicada `/contactos` para onde a nav
aponta. Resultado: o link "Contactos" do menu leva a uma página vazia,
quando o conteúdo já existe e só precisa de ser movido/reutilizado.

### 2.8 Produtos (`/produtos`) — stub órfão
Existe o ficheiro mas não há nenhum link para `/produtos` em nenhuma nav,
footer ou CTA visto no código. Confirmar com o utilizador se esta rota
deve ser removida ou se está reservada para uso futuro; não decidir
sozinho.

## 3. Duplicações e componentes órfãos

### 3.1 Dois sistemas de "portfolio" incompatíveis
- `homeComponents/Portfolio.tsx`: carrossel horizontal pinado (GSAP +
  ScrollTrigger), mostra imagens reais dos 6 projectos de
  `data/portfolio.ts`. **Não usado em nenhuma página.**
- `portfolioComponents/PortfolioManifest.tsx`: experiência textual
  abstracta, é o que está de facto em `/portfolio`. Não usa
  `data/portfolio.ts`.

Isto viola directamente a regra de reutilização do `AGENTS.md` (ponto 8):
existem dois componentes a resolver o mesmo domínio sem se falarem. A
decisão de qual manter, fundir, ou como coexistirem (ex: manifesto como
introdução + grelha real de projectos a seguir) é do utilizador e deve
ser tomada no bloco `08-portfolio.md`, não aqui.

### 3.2 Dados de serviços duplicados
- `app/data/services.ts` (nome original, ainda referenciado por
  `homeComponents/Services.tsx`, que tem o seu **próprio** array local
  `SERVICES: ServiceCard[]`, com uma forma de dados diferente,
  focada em carrossel da Home).
- `app/data/servicos.ts` (introduzido para alimentar `ServicosGrid.tsx`
  em `/servicos`, com uma forma de dados mais rica: `items[]`,
  `description`, `href`).

Resultado: existem **três** fontes de "serviços" no projecto —
`Needs.tsx` (array `NEEDS` local), `homeComponents/Services.tsx` (array
`SERVICES` local) e `data/servicos.ts` (`SERVICES` exportado, usado por
`ServicosGrid`). Nenhuma delas partilha dados com as outras, apesar de
descreverem essencialmente a mesma oferta de 6 categorias. Resolver no
bloco `02-design-system-e-componentizacao.md`: decidir uma fonte única
em `app/data/servicos.ts` e fazer `Needs.tsx` e `homeComponents/Services.tsx`
consumirem dela (derivando os campos específicos de cada carrossel, como
imagem de destaque ou subtítulo curto), em vez de manter três arrays
independentes.

### 3.3 `WHATSAPP_LINK` redefinido isoladamente
A mesma constante `const WHATSAPP_LINK = 'https://wa.me/244924666323'`
está copiada, pelo menos, em: `Footer.tsx`, `ServicosHero.tsx`,
`ServicosGuia.tsx`, `ServicosWhy.tsx`, `ServicosCtaFinal.tsx`,
`FinalCta.tsx`, e usada directamente como `href` sem constante em
`Hero.tsx`, `Contact.tsx`, `NavBar.tsx`. O mesmo padrão aplica-se ao
email (`geral@graficaviva.co.ao`), telefone (`+244 924 666 323`) e morada
("Nova Vida, Luanda, Angola"), repetidos em `Footer.tsx` e `Contact.tsx`.
Isto é exactamente o problema identificado pelo utilizador ("não usar
hardcoders isolados"). Resolver no bloco `02`, criando
`app/lib/constants.ts`.

### 3.4 Hook `useHorizontalScroll`
Existe e está bem escrito, mas os carrosséis horizontais actuais
(`Services.tsx`, `Portfolio.tsx`) implementam o próprio pin+scrub GSAP
directamente no componente, sem usar o hook. Confirmar se o hook está a
ser usado nalgum componente não partilhado nesta conversa, ou se é código
morto a remover/reutilizar no bloco `02`.

## 4. Footer — investigação do problema reportado

O `Footer.tsx` actual (versão mais recente partilhada) já contém uma nota
no próprio código a explicar a causa raiz encontrada anteriormente: o
`ScrollTrigger` do Footer usava o próprio `footerRef` (que é `fixed`)
como `trigger`, o que nunca progride com o scroll, deixando os elementos
presos em `opacity: 0` (logo visualmente presentes no DOM mas
"inertes"/invisíveis a cliques por estarem com opacidade zero, não por
`pointer-events`). A correcção já aplicada usa o `#page-footer-spacer`
(elemento no fluxo normal do documento, criado por `PageShell.tsx`) como
`trigger`. **Esta correcção está no código actual e parece resolver a
causa raiz identificada em sessões anteriores.**

Falta, ainda assim, verificação manual em produção (bloco `04`):
- Confirmar em `https://.../` que os links do Footer respondem ao
  clique depois do scroll completo até ao fim da página.
- Confirmar que `MagneticPillField` no Footer (`pointer-events-none` nos
  wrappers) não interfere com os links por baixo, dado que a versão
  actual do componente já foi desenhada precisamente para evitar esse
  bloqueio (comentário no próprio ficheiro `MagneticPillField.tsx`
  explica a razão).
- Testar em mobile (Lenis + touch) especificamente, não só desktop.

## 5. Stack e versões confirmadas (`package.json`)

```
next: 16.2.12       react: 19.2.4        react-dom: 19.2.4
typescript: ^5      tailwindcss: ^4      @tailwindcss/postcss: ^4
gsap: ^3.15.0       @gsap/react: ^2.1.2  lenis: ^1.3.25
lucide-react: ^1.27.0
@fortawesome/*: ^7.3.1 (instalado, não usado activamente)
```

Nada a instalar de novo para completar o roadmap deste `AGENTS.md`.
Formulário de `/orcamento` deve ser feito com `useState` nativo e
validação manual, sem `react-hook-form`/`zod`, salvo decisão explícita em
contrário no bloco `14`.

## 6. Achados de acessibilidade e semântica (preliminares)

- `NavBar.tsx`: botão de idioma ("en") é um `<button>` sem acção
  associada nem `aria-label` a explicar que ainda não muda o idioma —
  confirmar se é intencional (feature futura) ou remover até estar
  funcional.
- `AboutDiscover.tsx` e `PortfolioManifest.tsx` usam bastante interacção
  por `onPointerDown`/`onClick` em `<svg>`/`<button>` sem `aria-label`
  descritivo em alguns casos (ex: botões de "porta" em `VisualEscolha`
  têm `aria-label`, correcto; mas o canvas de desenho em `AboutDiscover`
  não tem texto alternativo para quem não pode desenhar com rato/dedo).
- Imagens `<img>` nativas (não `next/image`) em `NavBar.tsx` (logo) e
  `Preloader.tsx` têm `alt`, correcto.

Auditoria de acessibilidade completa fica para o bloco `17`, este ponto é
só um registo do que já se detectou incidentalmente.

## 7. Pergunta em aberto para o utilizador (não decidida nesta auditoria)

O briefing mestre pede blocos `12-tutoriais.md` e `13-tutorial-individual.md`
(área de tutoriais). **Esta secção nunca apareceu em nenhuma instrução
anterior deste projecto** (nem no briefing inicial de identidade, nem nas
etapas de `/servicos`). Para um estúdio de impressão/branding, uma área de
"tutoriais" é possível (ex: "como preparar um ficheiro para impressão"),
mas não está confirmada como parte real da oferta da Gráfica Viva.

**Os documentos `12` e `13` foram criados como `PENDING` mas marcados
"a confirmar"**: não devem ser executados até o utilizador confirmar que
esta secção deve mesmo existir no site.

---

## Resultado da implementação

- **O que foi alterado:** nenhuma alteração de código nesta sessão,
  apenas auditoria e criação de `AGENTS.md` + `docs/`.
- **Componentes criados:** nenhum.
- **Componentes reutilizados:** n/a.
- **Problemas encontrados:**
  1. `/orcamento` stub (crítico, todos os CTAs do site dependem dele).
  2. `/contactos` stub, duplica conteúdo já existente em `Contact.tsx`.
  3. `/blog` stub, sem rotas `/blog/[slug]`.
  4. `/portfolio` sem galeria real de projectos (`PortfolioManifest`
     abstracto vs. `Portfolio.tsx` não usado).
  5. Dados de serviços duplicados em três ficheiros/componentes
     diferentes (`Needs.tsx`, `homeComponents/Services.tsx`,
     `data/servicos.ts`).
  6. `WHATSAPP_LINK`, email, telefone e morada duplicados em, no mínimo,
     8 ficheiros diferentes.
  7. `/produtos` rota órfã, sem link em nenhuma navegação.
  8. Falta confirmação sobre âmbito de "tutoriais" (blocos 12 e 13).
- **Problemas corrigidos nesta sessão:** nenhum (sessão de auditoria).
- **Problemas ainda existentes:** todos os listados acima, distribuídos
  pelos blocos seguintes.
- **Ficheiros alterados:** nenhum ficheiro de código. Criados
  `AGENTS.md` e `docs/*.md`.
- **Testes realizados:** `fetch` directo às páginas `/`, `/servicos`,
  `/portfolio`, `/blog`, `/contactos`, `/orcamento` do site em produção
  para confirmar estado real (não apenas o código partilhado na
  conversa).
