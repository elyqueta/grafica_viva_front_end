export type PortfolioCard = {
  slug: string;
  client: string;
  title: string;
  image: string;
  /** por preencher: liga este projecto a um serviço de app/data/servicos.ts quando existir a relação real */
  serviceId?: string;
};

export const PROJECTS: PortfolioCard[] = [
  {
    slug: 'sabores-de-angola',
    client: 'sabores de angola',
    title: 'catálogo de produto',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&q=80',
  },
  {
    slug: 'cafe-kianda',
    client: 'café kianda',
    title: 'rebranding e embalagem',
    image:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=80',
  },
  {
    slug: 'mercado-central',
    client: 'mercado central',
    title: 'sinalética exterior',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80',
  },
  {
    slug: 'nova-vida-eventos',
    client: 'nova vida eventos',
    title: 'materiais de evento',
    image:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=900&q=80',
  },
  {
    slug: 'grupo-luanda-norte',
    client: 'grupo luanda norte',
    title: 'identidade corporativa',
    image:
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=900&q=80',
  },
  {
    slug: 'feira-do-artesao',
    client: 'feira do artesão',
    title: 'sinalética e brindes',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80',
  },
];