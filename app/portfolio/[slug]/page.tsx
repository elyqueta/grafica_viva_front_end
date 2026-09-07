import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import PageShell from '../../components/homeComponents/PageShell';
import RelatedProjects from '../../components/servicosComponents/RelatedProjects';
import { PROJECTS } from '../../data/portfolio';
import { SERVICES } from '../../data/servicos';
import { WHATSAPP_LINK, ORCAMENTO_LINK } from '../../lib/constants';
import Link from 'next/link';
import Image from 'next/image';

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: 'Projecto | Gráfica Viva',
      description: 'Projectos de impressão, branding e digital da Gráfica Viva.',
    };
  }

  return {
    title: `${project.title} | ${project.client} | Gráfica Viva`,
    description: project.objective,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  const service = project?.serviceId
    ? SERVICES.find((item) => item.id === project.serviceId)
    : undefined;

  if (!project) {
    return (
      <PageShell footer={<Footer />}>
        <Navbar />
        <section className="relative w-full bg-amber-50 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl">
              projecto não encontrado
            </h1>
            <p className="mt-4 text-base text-black/60 sm:text-lg">
              o projecto que procura não existe ou foi removido.
            </p>
            <Link
              href="/portfolio"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              ver todos os projectos
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  const relatedProjects = PROJECTS.filter(
    (item) => item.slug !== project.slug && item.serviceId === project.serviceId,
  );

  const fallbackRelated = PROJECTS.filter(
    (item) => item.slug !== project.slug && !relatedProjects.includes(item),
  );

  const finalRelated = relatedProjects.length > 0
    ? relatedProjects
    : fallbackRelated.slice(0, 3);

  return (
    <PageShell footer={<Footer />}>
      <Navbar />

      <section className="relative w-full bg-amber-50">
        <div className="relative h-[55vh] w-full overflow-hidden sm:h-[65vh] lg:h-[75vh]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 lg:px-10 lg:pb-16">
            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-semibold tracking-widest text-white/70">
                [projecto]
              </p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>
              <p className="mt-2 text-base font-semibold text-white/90 sm:text-lg">
                {project.client}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold tracking-widest text-black/40">
              [{project.category}]
            </p>
            {service && (
              <span className="text-xs text-black/40">·</span>
            )}
            {service && (
              <p className="text-xs text-black/60">
                {service.title}
              </p>
            )}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-extrabold leading-tight text-black sm:text-3xl">
              objectivo
            </h2>
            <p className="mt-4 text-base leading-relaxed text-black/70 sm:text-lg">
              {project.objective}
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-extrabold leading-tight text-black sm:text-3xl">
            solução aplicada
          </h2>
          <div className="mt-8 space-y-6">
            {project.solution.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-black/70 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 pb-16 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-black/40">
            [galeria]
          </p>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight text-black sm:text-3xl">
            imagens do projecto
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-sm"
              >
                <Image
                  src={src}
                  alt={`${project.title} — galeria`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {finalRelated.length > 0 && (
        <section className="relative w-full bg-amber-50 px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-semibold tracking-widest text-black/40">
              [projectos relacionados]
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-black sm:text-3xl">
              trabalhos semelhantes
            </h2>
            <div className="mt-10">
              <RelatedProjects projects={finalRelated} asDetailLinks />
            </div>
          </div>
        </section>
      )}

      <section className="relative w-full bg-amber-50 px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl">
            já sabe do que precisa?
          </h2>
          <p className="mt-6 text-base text-black/60 sm:text-lg">
            fale connosco e peça um orçamento para o seu próximo projecto.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={ORCAMENTO_LINK}
              className="inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              pedir orçamento
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-6 py-3 text-sm font-semibold text-black/80 transition-colors hover:bg-black/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
              falar pelo whatsapp
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
