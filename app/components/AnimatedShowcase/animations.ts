export type ShowcaseState = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  advantages: string[];
  ctaLabel: string;
  image: string;
};

export const SHOWCASE_STATES: ShowcaseState[] = [
  {
    id: "catalog",  
    title: "Gráfica Viva",
    subtitle: "[a marca]",
    description:
      "Mais de uma década a transformar ideias em impressões de qualidade, com atenção ao detalhe em cada projeto.",
    advantages: ["Impressão premium", "Acabamentos à medida", "Prazos cumpridos"],
    ctaLabel: "Ver Portfólio",
    image: "https://picsum.photos/seed/gv-catalogo-1/1000/1200",
  },
  {
    id: "cards",
    title: "Cartões de Visita",
    subtitle: "[identidade impressa]",
    description:
      "Papel texturado, verniz seletivo e acabamentos que fazem a diferença logo no primeiro aperto de mão.",
    advantages: ["Verniz UV seletivo", "Papel 350g texturado", "Corte a laser"],
    ctaLabel: "Ver Cartões",
    image: "https://picsum.photos/seed/gv-cartao-1/1000/1200",
  },
  {
    id: "packaging",
    title: "Embalagens",
    subtitle: "[proteção com marca]",
    description:
      "Packaging que protege o produto e comunica a marca — do saco de loja à caixa de envio personalizada.",
    advantages: ["Sacos em papel kraft", "Caixas rígidas premium", "Design à medida"],
    ctaLabel: "Ver Embalagens",
    image: "https://picsum.photos/seed/gv-saco-1/1000/1200",
  },
  {
    id: "outdoor",
    title: "Publicidade Exterior",
    subtitle: "[grande escala]",
    description:
      "Rollups, banners e outdoors com grande escala e qualidade de impressão que se veem à distância.",
    advantages: ["Rollups profissionais", "Banners de grande formato", "Outdoors personalizados"],
    ctaLabel: "Ver Publicidade Exterior",
    image: "https://picsum.photos/seed/gv-outdoor-1/1000/1200",
  },
  {
    id: "gifts",
    title: "Brindes Corporativos",
    subtitle: "[memória de marca]",
    description:
      "Canecas, powerbanks, t-shirts e cadernos com a sua marca — o toque final que fica na memória do cliente.",
    advantages: ["Canecas personalizadas", "Powerbanks com marca", "T-shirts & cadernos"],
    ctaLabel: "Ver Brindes",
    image: "https://picsum.photos/seed/gv-brinde-1/1000/1200",
  },
  {
    id: "final",
    title: "Um Só Parceiro",
    subtitle: "[tudo o que precisa]",
    description:
      "Do catálogo aos brindes, a Gráfica Viva acompanha a sua marca em cada peça impressa.",
    advantages: ["Catálogo completo", "Acompanhamento próximo", "Um único parceiro gráfico"],
    ctaLabel: "Ver Portfólio",
    image: "https://picsum.photos/seed/gv-final-1/1000/1200",
  },
];