/**
 * ⚠️ DADOS DE EXEMPLO, só para pré-visualizares a faixa de "Parceiros" em loop.
 * NÃO SÃO PARCEIROS REAIS. Substitui por dados reais antes de publicar.
 * Os logótipos vêm de um serviço de placeholder (placehold.co), não são
 * ficheiros locais. Uma faixa em loop fica melhor com mais itens (mínimo
 * recomendado: 6 a 8), para o movimento não parecer repetitivo demasiado
 * depressa.
 */
export type Partner = {
  name: string;
  logo: string;
  url: string;
};

export const PARTNERS: Partner[] = [
  {
    name: 'EXEMPLO · Empresa A',
    logo: 'https://placehold.co/160x64/292929/f5f0e6?text=Empresa+A',
    url: 'https://exemplo-empresa-a.com',
  },
  {
    name: 'EXEMPLO · Empresa B',
    logo: 'https://placehold.co/140x64/1f2937/f5f0e6?text=Empresa+B',
    url: 'https://exemplo-empresa-b.com',
  },
  {
    name: 'EXEMPLO · Empresa C',
    logo: 'https://placehold.co/180x64/44403c/f5f0e6?text=Empresa+C',
    url: 'https://exemplo-empresa-c.com',
  },
  {
    name: 'EXEMPLO · Empresa D',
    logo: 'https://placehold.co/150x64/3f3f46/f5f0e6?text=Empresa+D',
    url: 'https://exemplo-empresa-d.com',
  },
  {
    name: 'EXEMPLO · Empresa E',
    logo: 'https://placehold.co/170x64/292929/f5f0e6?text=Empresa+E',
    url: 'https://exemplo-empresa-e.com',
  },
  {
    name: 'EXEMPLO · Empresa F',
    logo: 'https://placehold.co/140x64/1c1917/f5f0e6?text=Empresa+F',
    url: 'https://exemplo-empresa-f.com',
  },
  {
    name: 'EXEMPLO · Empresa G',
    logo: 'https://placehold.co/160x64/27272a/f5f0e6?text=Empresa+G',
    url: 'https://exemplo-empresa-g.com',
  },
  {
    name: 'EXEMPLO · Empresa H',
    logo: 'https://placehold.co/150x64/292524/f5f0e6?text=Empresa+H',
    url: 'https://exemplo-empresa-h.com',
  },
];