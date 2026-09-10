import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import PageShell from '../../components/homeComponents/PageShell';
import MediaReveal from '../../components/MediaReveal';
import { PARTNERS } from '../../data/partners';
import Link from 'next/link';

// vídeo de placeholder para teste de performance, substituir por vídeo real da marca
const PARCEIRO_VIDEO = '/videos/parceiro-individual.mp4';

type ParceiroPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return PARTNERS.map((partner) => ({
    slug: partner.slug,
  }));
}

export async function generateMetadata({ params }: ParceiroPageProps) {
  const { slug } = await params;
  const partner = PARTNERS.find((item) => item.slug === slug);

  if (!partner) {
    return {
      title: 'Parceiro | Gráfica Viva',
      description: 'Parceiros da Gráfica Viva.',
    };
  }

  return {
    title: `${partner.name} | Gráfica Viva`,
    description: partner.description,
  };
}

export default async function ParceiroPage({ params }: ParceiroPageProps) {
  const { slug } = await params;
  const partner = PARTNERS.find((item) => item.slug === slug);

  if (!partner) {
    return (
      <PageShell footer={<Footer />}>
        <Navbar />
        <section className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl">
              Parceiro não encontrado
            </h1>
            <p className="mt-4 text-base text-black/60 sm:text-lg">
              O parceiro que procura não existe ou foi removido.
            </p>
            <Link
              href="/parceiros"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Ver todos os parceiros
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell footer={<Footer />}>
      <Navbar />

      <section className="relative w-full bg-amber-50">
        <div className="relative h-[55vh] w-full overflow-hidden sm:h-[65vh] lg:h-[75vh]">
          <MediaReveal
            poster={partner.logo}
            alt={partner.name}
            priority
            videoSrc={PARCEIRO_VIDEO}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 lg:px-10 lg:pb-16">
            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-semibold tracking-widest text-white/70">
                [{partner.category}]
              </p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {partner.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-extrabold leading-tight text-black sm:text-3xl">
            Sobre
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/70 sm:text-lg">
            {partner.description}
          </p>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-black/40">
            [contactos]
          </p>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight text-black sm:text-3xl">
            Informações e contactos
          </h2>
          <div className="mt-8 space-y-6">
            <div>
              <p className="text-xs font-semibold text-black/50">Email</p>
              <a
                href={`mailto:${partner.contactEmail}`}
                className="mt-1 block text-sm text-black/80 underline underline-offset-4 hover:text-black"
              >
                {partner.contactEmail}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold text-black/50">Telefone</p>
              <a
                href={`tel:${partner.contactPhone}`}
                className="mt-1 block text-sm text-black/80 underline underline-offset-4 hover:text-black"
              >
                {partner.contactPhone}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold text-black/50">Website</p>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-sm text-black/80 underline underline-offset-4 hover:text-black"
              >
                {partner.url}
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
