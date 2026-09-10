import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import PageShell from '../../components/homeComponents/PageShell';
import MediaReveal from '../../components/MediaReveal';
import RelatedProjects from '../../components/servicosComponents/RelatedProjects';
import ScrollFillHeading from '../../components/servicosComponents/ScrollFillHeading';
import { SERVICES } from '../../data/servicos';
import { PROJECTS } from '../../data/portfolio';
import { WHATSAPP_LINK, ORCAMENTO_LINK } from '../../lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';

type ServicePageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: 'Serviço | Gráfica Viva',
      description: 'Serviços de impressão, branding e digital da Gráfica Viva.',
    };
  }

  return {
    title: `${service.title} | Gráfica Viva`,
    description: service.description,
  };
}

export default async function ServicoPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    return (
      <PageShell footer={<Footer />}>
        <Navbar />
        <section className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl">
              Serviço não encontrado
            </h2>
            <p className="mt-4 text-base text-black/60 sm:text-lg">
              O serviço que procura não existe ou foi removido.
            </p>
            <Link
              href="/servicos"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Ver todos os serviços
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  const relatedProjects = PROJECTS.filter(
    (project) => project.serviceId === service.id,
  );

  const relatedServices = SERVICES.filter((item) => item.id !== service.id);

  return (
    <PageShell footer={<Footer />}>
      <Navbar />

      <section className="relative w-full bg-amber-50">
        <div className="relative h-[55vh] w-full overflow-hidden sm:h-[65vh] lg:h-[75vh]">
          <MediaReveal
            poster={service.image}
            alt={service.title}
            priority
            videoSrc="/videos/servicos-slug.mp4"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 lg:px-10 lg:pb-16">
            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-semibold tracking-widest text-white/70">
                [{service.number}]
              </p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-base leading-relaxed text-black/70 sm:text-lg">
            {service.description}
          </p>

          <div className="mt-12">
            <h2 className="text-2xl font-extrabold leading-tight text-black sm:text-3xl">
              O que fazemos
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.items.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-rose-600">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-base text-black/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="relative w-full bg-amber-50 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold tracking-widest text-black/40">
              [projectos relacionados]
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-black sm:text-3xl">
              Exemplos reais
            </h2>
            <div className="mt-10">
              <RelatedProjects projects={relatedProjects} />
            </div>
          </div>
        </section>
      )}

      <section className="relative w-full bg-amber-50 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-black/40">
            [outros serviços]
          </p>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight text-black sm:text-3xl">
              Serviços relacionados
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.slice(0, 3).map((related) => (
              <Link
                key={related.id}
                href={`/servicos/${related.slug}`}
                className="group relative block h-64 w-full overflow-hidden rounded-sm"
              >
                <Image
                  src={related.image}
                  alt={related.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
                  <p className="text-xs font-semibold tracking-widest text-white/70">
                    [{related.number}]
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                    {related.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollFillHeading
            text="            Já sabe do que precisa?"
            className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
          />
          <p className="mt-6 text-base text-black/60 sm:text-lg">
            Fale connosco e peça um orçamento para o seu próximo projecto.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`${ORCAMENTO_LINK}?servico=${service.slug}`}
              className="inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Pedir orçamento
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-6 py-3 text-sm font-semibold text-black/80 transition-colors hover:bg-black/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
