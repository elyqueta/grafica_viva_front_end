export type ServiceItem = {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  items: string[];
  accent: string;
  image: string;
  href: string;
  needTitle: string;
  needCategory: string;
  serviceTitle: string;
  subtitle: string;
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'comunicacao-institucional',
    slug: 'comunicacao-institucional',
    number: '01',
    title: 'comunicação institucional',
    category: 'comunicação institucional',
    description:
      'materiais que apresentam a sua empresa com uma imagem profissional e consistente.',
    items: [
      'cartões de visita',
      'papel de carta',
      'envelopes',
      'pastas',
      'apresentações institucionais',
      'brochuras',
      'catálogos',
      'materiais corporativos',
    ],
    accent: 'bg-violet-500',
    image:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=80',
    href: '/orcamento',
    needTitle: 'uma primeira impressão profissional',
    needCategory: 'cartões de visita',
    serviceTitle: 'identidade visual que traduz a sua marca',
    subtitle: 'gráfica viva',
  },
  {
    id: 'publicidade-propaganda',
    slug: 'publicidade-propaganda',
    number: '02',
    title: 'publicidade e propaganda',
    category: 'publicidade e propaganda',
    description: 'soluções para colocar a sua marca à frente das pessoas certas.',
    items: [
      'flyers',
      'cartazes',
      'banners',
      'lonas',
      'materiais promocionais',
      'campanhas publicitárias',
      'comunicação para eventos',
    ],
    accent: 'bg-sky-500',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    href: '/orcamento',
    needTitle: 'a sua mensagem, clara e apelativa',
    needCategory: 'flyers e brochuras',
    serviceTitle: 'qualidade e atenção ao detalhe',
    subtitle: 'gráfica viva',
  },
  {
    id: 'servicos-graficos',
    slug: 'servicos-graficos',
    number: '03',
    title: 'serviços gráficos',
    category: 'serviços gráficos',
    description:
      'do ficheiro final ao produto físico, tratamos da produção dos seus materiais gráficos.',
    items: [
      'impressão digital',
      'impressão de documentos',
      'flyers',
      'cartões',
      'brochuras',
      'catálogos',
      'convites',
      'materiais personalizados',
    ],
    accent: 'bg-rose-500',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80',
    href: '/orcamento',
    needTitle: 'visibilidade em grande formato',
    needCategory: 'banners e lonas',
    serviceTitle: 'banners, lonas e visibilidade',
    subtitle: 'gráfica viva',
  },
  {
    id: 'brindes-personalizados',
    slug: 'brindes-personalizados',
    number: '04',
    title: 'brindes personalizados',
    category: 'brindes personalizados',
    description: 'transforme objectos do dia a dia em pontos de contacto com a sua marca.',
    items: ['canetas', 't shirts', 'sacos', 'canecas', 'agendas'],
    accent: 'bg-pink-400',
    image:
      'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=900&q=80',
    href: '/orcamento',
    needTitle: 'valorize a apresentação do produto',
    needCategory: 'embalagens',
    serviceTitle: 'soluções que valorizam o produto',
    subtitle: 'gráfica viva',
  },
  {
    id: 'websites-profissionais',
    slug: 'websites-profissionais',
    number: '05',
    title: 'websites profissionais',
    category: 'websites profissionais',
    description:
      'criamos websites modernos, responsivos e pensados para representar o seu negócio no digital.',
    items: [
      'websites institucionais',
      'landing pages',
      'websites empresariais',
      'páginas de apresentação de produtos e serviços',
    ],
    accent: 'bg-orange-500',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80',
    href: '/orcamento',
    needTitle: 'a marca em cada objeto',
    needCategory: 'brindes personalizados',
    serviceTitle: 'espaços com identidade profissional',
    subtitle: 'gráfica viva',
  },
  {
    id: 'aplicacoes',
    slug: 'aplicacoes',
    number: '06',
    title: 'aplicações à medida',
    category: 'aplicações',
    description:
      'soluções digitais desenvolvidas para responder às necessidades específicas do seu negócio.',
    items: [
      'aplicações móveis',
      'sistemas internos',
      'plataformas digitais',
      'soluções personalizadas',
    ],
    accent: 'bg-amber-500',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80',
    href: '/orcamento',
    needTitle: 'espaços com identidade clara',
    needCategory: 'sinalética',
    serviceTitle: 'materiais para empresas e eventos',
    subtitle: 'gráfica viva',
  },
];
