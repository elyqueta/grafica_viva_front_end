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
    title: 'Comunicação institucional',
    category: 'Comunicação institucional',
    description:
      'Materiais que apresentam a sua empresa com uma imagem profissional e consistente.',
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
    href: '/servicos/comunicacao-institucional',
    needTitle: 'Uma primeira impressão profissional',
    needCategory: 'Cartões de visita',
    serviceTitle: 'Identidade visual que traduz a sua marca',
    subtitle: 'Gráfica Viva',
  },
  {
    id: 'publicidade-propaganda',
    slug: 'publicidade-propaganda',
    number: '02',
    title: 'Publicidade e propaganda',
    category: 'Publicidade e propaganda',
    description: 'Soluções para colocar a sua marca à frente das pessoas certas.',
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
    href: '/servicos/publicidade-propaganda',
    needTitle: 'A sua mensagem, clara e apelativa',
    needCategory: 'Flyers e brochuras',
    serviceTitle: 'Qualidade e atenção ao detalhe',
    subtitle: 'Gráfica Viva',
  },
  {
    id: 'servicos-graficos',
    slug: 'servicos-graficos',
    number: '03',
    title: 'Serviços gráficos',
    category: 'Serviços gráficos',
    description:
      'Do ficheiro final ao produto físico, tratamos da produção dos seus materiais gráficos.',
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
    href: '/servicos/servicos-graficos',
    needTitle: 'Visibilidade em grande formato',
    needCategory: 'Banners e lonas',
    serviceTitle: 'Banners, lonas e visibilidade',
    subtitle: 'Gráfica Viva',
  },
  {
    id: 'brindes-personalizados',
    slug: 'brindes-personalizados',
    number: '04',
    title: 'Brindes personalizados',
    category: 'Brindes personalizados',
    description: 'Transforme objectos do dia a dia em pontos de contacto com a sua marca.',
    items: ['canetas', 't shirts', 'sacos', 'canecas', 'agendas'],
    accent: 'bg-pink-400',
    image:
      'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=900&q=80',
    href: '/servicos/brindes-personalizados',
    needTitle: 'Valorize a apresentação do produto',
    needCategory: 'Embalagens',
    serviceTitle: 'Soluções que valorizam o produto',
    subtitle: 'Gráfica Viva',
  },
  {
    id: 'websites-profissionais',
    slug: 'websites-profissionais',
    number: '05',
    title: 'Websites profissionais',
    category: 'Websites profissionais',
    description:
      'Criamos websites modernos, responsivos e pensados para representar o seu negócio no digital.',
    items: [
      'websites institucionais',
      'landing pages',
      'websites empresariais',
      'páginas de apresentação de produtos e serviços',
    ],
    accent: 'bg-orange-500',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80',
    href: '/servicos/websites-profissionais',
    needTitle: 'A marca em cada objeto',
    needCategory: 'Brindes personalizados',
    serviceTitle: 'Espaços com identidade profissional',
    subtitle: 'Gráfica Viva',
  },
  {
    id: 'aplicacoes',
    slug: 'aplicacoes',
    number: '06',
    title: 'Aplicações à medida',
    category: 'Aplicações',
    description:
      'Soluções digitais desenvolvidas para responder às necessidades específicas do seu negócio.',
    items: [
      'aplicações móveis',
      'sistemas internos',
      'plataformas digitais',
      'soluções personalizadas',
    ],
    accent: 'bg-amber-500',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80',
    href: '/servicos/aplicacoes',
    needTitle: 'Espaços com identidade clara',
    needCategory: 'Sinalética',
    serviceTitle: 'Materiais para empresas e eventos',
    subtitle: 'Gráfica Viva',
  },
];
