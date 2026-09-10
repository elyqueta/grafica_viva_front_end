/**
 * ⚠️ DADOS DE EXEMPLO, só para pré-visualizares a galeria de projectos.
 * NÃO SÃO PROJECTOS REAIS. Substitui por dados reais antes de publicar.
 * As imagens vêm de um serviço remoto (Unsplash), não são ficheiros locais.
 */

export type PortfolioCard = {
  slug: string;
  client: string;
  title: string;
  image: string;
  category: string;
  serviceId?: string;
  objective: string;
  solution: string[];
  gallery: string[];
};

export const PROJECTS: PortfolioCard[] = [
  {
    slug: 'sabores-de-angola',
    client: 'Sabores de Angola',
    title: 'Catálogo de produto',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&q=80',
    category: 'Serviços gráficos',
    serviceId: 'servicos-graficos',
    objective: 'Reforçar a presença no mercado nacional com um catálogo físico que transmitisse qualidade e tradição.',
    solution: [
      'Desenvolvemos uma linha editorial alinhada com a identidade visual da marca, escolhendo papéis com toque quente e acabamento mate.',
      'A estrutura do catálogo priorizou a legibilidade, com hierarquia clara entre famílias de produto e detalhes técnicos.',
      'A impressão foi feita em offset de quatro cores, com revisão de cor presencial para garantir fidelidade ao briefing.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    ],
  },
  {
    slug: 'cafe-kianda',
    client: 'Café Kianda',
    title: 'Rebranding e embalagem',
    image:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=80',
    category: 'Comunicação institucional',
    serviceId: 'comunicacao-institucional',
    objective: 'Modernizar a imagem da marca sem perder a ligação à origem angolana do café.',
    solution: [
      'Criámos um sistema de marca coerente, com paleta enxuta, tipografia com personalidade e regras de aplicação claras.',
      'Desenhámos embalagens funcionais para canal de retalho e para gamas premium, otimizando espaço de prateleira.',
      'Produzimos o primeiro lote com controlo de cor e acabamento, garantindo consistência entre o digital e o físico.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=80',
      'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=900&q=80',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=80',
    ],
  },
  {
    slug: 'mercado-central',
    client: 'Mercado Central',
    title: 'Sinalética exterior',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80',
    category: 'Publicidade e propaganda',
    serviceId: 'publicidade-propaganda',
    objective: 'Tornar o espaço mais intuitivo para visitantes e comerciantes, com uma linguagem visual comum.',
    solution: [
      'Levantamento prévio das zonas de maior fluxo para definir hierarquia de informação e suportes mais adequados.',
      'Desenvolvemos painéis em lona reforçada e pórticos em alumínio, preparados para exterior e manutenção simples.',
      'Implementámos um sistema modular, com peças de reposição independentes, reduzindo custos de atualização.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=900&q=80',
    ],
  },
  {
    slug: 'nova-vida-eventos',
    client: 'Nova Vida Eventos',
    title: 'Materiais de evento',
    image:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=900&q=80',
    category: 'Publicidade e propaganda',
    serviceId: 'publicidade-propaganda',
    objective: 'Criar uma experiência coerente entre o espaço físico e os suportes digitais do evento.',
    solution: [
      'Desenhámos um sistema visual modular para palcos, zonas de entrada e áreas de catering, com elementos reutilizáveis.',
      'Produzimos painéis, roll-ups, crachás e sacos com a mesma paleta e estilo, garantindo consistência.',
      'A execução foi acompanhada presencialmente durante o evento para ajustes de última hora e reposição de stock.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=900&q=80',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    ],
  },
  {
    slug: 'grupo-luanda-norte',
    client: 'Grupo Luanda Norte',
    title: 'Identidade corporativa',
    image:
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=900&q=80',
    category: 'Comunicação institucional',
    serviceId: 'comunicacao-institucional',
    objective: 'Unificar a comunicação de várias empresas do grupo sob uma marca forte e reconhecível.',
    solution: [
      'Desenvolvemos uma identidade visual flexível, com versões para comunicação digital e impressa, sem perder legibilidade.',
      'Criámos um manual de aplicação com regras para papelaria, sinalética, redes sociais e apresentações institucionais.',
      'Acompanhámos a implementação ao longo de seis meses, garantindo consistência em todos os touchpoints.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=900&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80',
    ],
  },
  {
    slug: 'feira-do-artesao',
    client: 'Feira do Artesão',
    title: 'Sinalética e brindes',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80',
    category: 'brindes personalizados',
    serviceId: 'brindes-personalizados',
    objective: 'Dar visibilidade aos artesãos locais e tornar o espaço da feira mais apelativo para visitantes.',
    solution: [
      'Desenhámos uma linha de sinalética com materiais resistentes, adequada a condições exteriores e montagem temporária.',
      'Produzimos brindes personalizados com motivos inspirados no trabalho dos artesãos, funcionando como cartão de visita.',
      'Coordenámos a produção com o calendário do evento, cumprindo prazos apertados sem sacrificar a qualidade.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80',
      'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=900&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80',
    ],
  },
];
