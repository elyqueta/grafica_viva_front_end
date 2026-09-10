/**
 * ⚠️ DADOS DE EXEMPLO, só para pré-visualizares a listagem de artigos.
 * NÃO SÃO ARTIGOS REAIS. Substitui por conteúdo real antes de publicar.
 * As imagens vêm de um serviço remoto (Unsplash), não são ficheiros locais.
 */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  body: string[];
  gallery: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "papel-certo-para-a-tua-marca",
    title: "Como escolher o papel certo para a tua marca",
    excerpt:
      "A textura e a gramagem do papel comunicam tanto quanto o design. um guia prático para não errar na escolha.",
    date: "jan 2026",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80",
    category: "Papel",
    body: [
      "O papel é o suporte mais antigo da comunicação visual e continua a ser o primeiro contacto físico entre uma marca e o seu público. antes de escolher, é importante entender que a gramagem influencia a percepção de valor: um cartão de visita com 250 g/m2 transmite solidez, enquanto um folheto de 135 g/m2 sugere leveza e economia.",
      "A textura também comunica. Papéis com acabamento mate funcionam bem para marcas que querem passar serenidade e sobriedade; papéis com verniz ou acabamento cold set adicionam destaque a pontos específicos sem perder a elegância. para embalagens, a resistência à rutura e à humidade pode ser mais importante do que a cor.",
      "Na prática, recomendamos pedir provas físicas antes de fechar tiragem. a cor no monitor nunca é igual à cor impressa, e pequenas diferenças de tonalidade podem alterar completamente o resultado final. se o briefing pedir consistência com elementos digitais, o melhor caminho é um papel com revestimento uniforme e calibração de cor em offset.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80",
    ],
  },
  {
    slug: "embalagem-sustentavel-2026",
    title: "Tendências de embalagem sustentável em 2026",
    excerpt:
      "Materiais reciclados, menos tinta, mais impacto. o que estamos a ver mudar na produção de embalagens.",
    date: "fev 2026",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
    category: "Embalagem",
    body: [
      "A sustentabilidade deixou de ser um diferencial para ser uma expectativa. em 2026, os pedidos de embalagens recicladas, com certificação florestal e menor consumo de tinta continuam a crescer. a boa notícia é que é possível reduzir o impacto ambiental sem sacrificar a protecção do produto.",
      "Um dos erros mais comuns é escolher um material reciclado sem testar a resistência final. papel reciclado pode ter gramagens mais baixas e menor homogeneidade; por isso, a estrutura da embalagem deve ser redesenhada, não só substituída a matéria-prima. outro ponto importante é reduzir o número de cores na impressão: menos tinta significa menor impacto e custo.",
      "Na gráfica, temos visto uma adesão forte a tintas base água e a vernizes aquosos, que preservam a reciclabilidade da embalagem. se o projecto permitir, sugerimos layouts mais enxutos, com espaço para mensagens curtas e códigos QR que ligam a conteúdos digitais.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
      "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=1200&q=80",
    ],
  },
  {
    slug: "sinaletica-que-vende",
    title: "Sinalética que vende: o que aprendemos em 50 projectos",
    excerpt:
      "Nem sempre o maior letreiro é o mais eficaz. partilhamos os padrões que realmente funcionam.",
    date: "mar 2026",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    category: "Sinalética",
    body: [
      "Ao longo de 50 projectos de sinalética, percebemos que a eficácia raramente está no tamanho, mas na clareza da mensagem e na relação entre o suporte e o contexto. um letreiro grande mal colocado comunica menos do que um sinal médio na altura dos olhos, com contraste suficiente para ser lido em movimento.",
      "O segundo padrão que repetimos é a redução da informação. cada ponto de contacto deve ter apenas o essencial: nome, actividade e, quando necessário, um indicador de direcção. cores em quantidade reduzem a legibilidade; preferimos paletas enxutas, com uma cor dominante e um acento para destaque.",
      "Para exteriores, o suporte deve ser escolhido com base na exposição solar e à chuva. materiais como alumínio composto e pvc expandido resistem bem, mas o acabamento superficial faz diferença: um mate com UV protege a cor por mais tempo e reduz o brilho incómodo para condutores.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    ],
  },
  {
    slug: "identidade-visual-para-startups",
    title: "Identidade visual para startups: por onde começar",
    excerpt:
      "Do logo às regras de aplicação, um percurso enxuto para quem está a lançar uma marca do zero.",
    date: "abr 2026",
    image:
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&q=80",
    category: "Identidade visual",
    body: [
      "Para uma startup, a identidade visual não precisa ser um sistema complexo desde o primeiro dia. o mais importante é definir uma paleta enxuta, uma tipografia legível e um logotipo que funcione em tamanhos pequenos, como favicon e cartões de visita.",
      "Recomendamos começar por um manual básico: cores principais e secundárias, regras de uso do logotipo, modelo de cartão de visita e padrão para redes sociais. isso evita que cada designer ou parceiro aplique a marca de forma diferente. com quatro ou cinco regras claras, a consistência aparece naturalmente.",
      "A eficácia da identidade mede-se pela velocidade de reconhecimento. se o cliente consegue identificar a marca num cartão, num post ou num saco sem ler o nome, o sistema está a funcionar. essa é a métrica que usamos nos primeiros meses de implementação.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
    ],
  },
  {
    slug: "design-para-redes-sociais",
    title: "Design para redes sociais: consistência sem aborrecimento",
    excerpt:
      "Como manter uma linguagem visual coerente sem repetir sempre a mesma peça.",
    date: "mai 2026",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    category: "Digital",
    body: [
      "A consistência nas redes sociais não significa repetir a mesma imagem todos os dias. significa criar uma linguagem que o público reconhece mesmo sem ver o nome da marca. para isso, usamos ângulos de composição semelhantes, paleta fixa e um tratamento tipográfico repetido.",
      "Um erro frequente é adaptar peças criadas para impressão directamente para digital, sem ajustar contraste ou leitura em ecrãs pequenos. para redes sociais, recomendamos contrastes mais fortes e texto reduzido ao mínimo. a peça deve ser compreendida em menos de dois segundos.",
      "Outro ponto é o calendário editorial: se a marca publica todas as semanas no mesmo dia e com a mesma estrutura, o utilizador cria expectativa. essa cadência, associada a uma linguagem visual coerente, gera confiança sem necessidade de campanhas caras.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    ],
  },
  {
    slug: "impressao-digital-vs-offset",
    title: "Impressão digital ou offset: qual escolher para o seu projecto",
    excerpt:
      "entenda as diferenças de tiragem, custo e acabamento para tomar a decisão mais económica.",
    date: "jun 2026",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
    category: "Impressão",
    body: [
      "A escolha entre impressão digital e offset depende, acima de tudo, da tiragem e do prazo. para tiragens curtas, até 500 unidades, a digital costuma ser mais económica porque não excede a preparação de clichês. para tiragens maiores, o offset compensa pelo custo por unidade mais baixo e pela qualidade de cor mais consistente.",
      "O acabamento também influencia a decisão. se o projecto pedir verniz localizado, relevo ou corte especial, o offset oferece mais flexibilidade porque os clichês são produzidos em separado. na digital, esses acabamentos existem, mas com opções mais limitadas e custo por unidade superior.",
      "Recomendamos fazer uma prova física em ambos os processos quando a qualidade for critica. a cor pode variar entre digital e offset, especialmente em tons pastel ou preto intenso. a prova evita surpresas e permite ajustes antes da tiragem final.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    ],
  },
];

export const BLOG_CATEGORIES = Array.from(
  new Set(BLOG_POSTS.map((post) => post.category)),
);
