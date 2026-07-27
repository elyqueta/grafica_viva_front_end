import Image from "next/image";

// components/Hero.tsx
export default function Hero() {
  return (
    <section
      id="inicio"
      data-hero-fade
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-black opacity-0"
    >
      <Image width={800} height={500} src="/hero-bg.jpeg" alt="Landscape picture" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 lg:px-10">
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-amber-50 sm:text-5xl lg:text-6xl">
          Imprimimos Qualidade,
          <br />
          Damos Vida às Suas Ideias
        </h1>

        <p className="mt-6 max-w-xl text-base text-amber-50 sm:text-lg">
          Soluções gráficas completas com criatividade, precisão e compromisso.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <a
            href="#sobre"
            className="rounded-sm border border-amber-50 px-6 py-3 text-sm font-bold tracking-wide text-amber-50 transition-colors hover:bg-amber-50 hover:text-black"
          >
            SAIBA MAIS
          </a>
          <a
            href="#servicos"
            className="rounded-sm bg-amber-50 px-6 py-3 text-sm font-bold tracking-wide text-black transition-colors hover:bg-white/90"
          >
            NOSSOS SERVIÇOS
          </a>
        </div>
      </div>
    </section>
  );
}