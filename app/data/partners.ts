/**
 * ⚠️ DADOS DE EXEMPLO, só para pré-visualizares a página de Parceiros.
 * NÃO SÃO PARCEIROS REAIS. Substitui por dados reais antes de publicar.
 * Os logótipos vêm de um serviço de placeholder (placehold.co), não são
 * ficheiros locais.
 */

export type Partner = {
  slug: string;
  name: string;
  logo: string;
  url: string;
  category: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
};

export const PARTNERS: Partner[] = [
  {
    slug: 'empresa-a',
    name: 'EXEMPLO · Empresa A',
    logo: 'https://placehold.co/160x64/292929/f5f0e6?text=Empresa+A',
    url: 'https://exemplo-empresa-a.com',
    category: 'tecnologia',
    description: 'parceiro estratégico em soluções digitais e impressão de documentos institucionais.',
    contactEmail: 'contacto@empresaa.exemplo',
    contactPhone: '+244 900 000 001',
  },
  {
    slug: 'empresa-b',
    name: 'EXEMPLO · Empresa B',
    logo: 'https://placehold.co/140x64/1f2937/f5f0e6?text=Empresa+B',
    url: 'https://exemplo-empresa-b.com',
    category: 'retalho',
    description: 'colaboramos em campanhas publicitárias e materiais de ponto de venda.',
    contactEmail: 'contacto@empresab.exemplo',
    contactPhone: '+244 900 000 002',
  },
  {
    slug: 'empresa-c',
    name: 'EXEMPLO · Empresa C',
    logo: 'https://placehold.co/180x64/44403c/f5f0e6?text=Empresa+C',
    url: 'https://exemplo-empresa-c.com',
    category: 'eventos',
    description: 'parceria em eventos corporativos, sinalética temporária e brindes personalizados.',
    contactEmail: 'contacto@empresac.exemplo',
    contactPhone: '+244 900 000 003',
  },
  {
    slug: 'empresa-d',
    name: 'EXEMPLO · Empresa D',
    logo: 'https://placehold.co/150x64/3f3f46/f5f0e6?text=Empresa+D',
    url: 'https://exemplo-empresa-d.com',
    category: 'branding',
    description: 'desenvolvimento de identidade visual, papelaria e manuais de marca.',
    contactEmail: 'contacto@empresad.exemplo',
    contactPhone: '+244 900 000 004',
  },
  {
    slug: 'empresa-e',
    name: 'EXEMPLO · Empresa E',
    logo: 'https://placehold.co/170x64/292929/f5f0e6?text=Empresa+E',
    url: 'https://exemplo-empresa-e.com',
    category: 'logística',
    description: 'impressão de documentação operacional, etiquetas e comunicação de frota.',
    contactEmail: 'contacto@empresae.exemplo',
    contactPhone: '+244 900 000 005',
  },
  {
    slug: 'empresa-f',
    name: 'EXEMPLO · Empresa F',
    logo: 'https://placehold.co/140x64/1c1917/f5f0e6?text=Empresa+F',
    url: 'https://exemplo-empresa-f.com',
    category: 'retalho',
    description: 'suporte em lançamentos de produto, embalagens e materiais promocionais.',
    contactEmail: 'contacto@empresaf.exemplo',
    contactPhone: '+244 900 000 006',
  },
  {
    slug: 'empresa-g',
    name: 'EXEMPLO · Empresa G',
    logo: 'https://placehold.co/160x64/27272a/f5f0e6?text=Empresa+G',
    url: 'https://exemplo-empresa-g.com',
    category: 'tecnologia',
    description: 'produção de interfaces impressas, manuais e suporte a comunicação digital.',
    contactEmail: 'contacto@empresag.exemplo',
    contactPhone: '+244 900 000 007',
  },
  {
    slug: 'empresa-h',
    name: 'EXEMPLO · Empresa H',
    logo: 'https://placehold.co/150x64/292524/f5f0e6?text=Empresa+H',
    url: 'https://exemplo-empresa-h.com',
    category: 'eventos',
    description: 'execução de eventos institucionais, backdrops, placas de sinalização e convites.',
    contactEmail: 'contacto@empresah.exemplo',
    contactPhone: '+244 900 000 008',
  },
];

export const PARTNER_CATEGORIES = Array.from(
  new Set(PARTNERS.map((partner) => partner.category)),
);