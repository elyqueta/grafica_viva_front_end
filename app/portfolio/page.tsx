import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import PageShell from '../components/homeComponents/PageShell';
import { PROJECTS } from '../data/portfolio';
import Image from 'next/image';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <PageShell footer={<Footer />}>
      <Navbar />

      <section className="relative w-full bg-amber-50 px-6 pt-36 lg:px-10 lg:pt-44">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-black/40">
            [portfólio]
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl">
            os nossos trabalhos
          </h1>
          <p className="mt-4 text-base leading-relaxed text-black/60 sm:text-lg">
            uma selecção de projectos reais em impressão, branding e digital.
          </p>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 pb-16 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <article key={project.slug} className="group relative block h-80 w-full overflow-hidden rounded-sm">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
                  <p className="text-xs font-semibold tracking-widest text-white/70">
                    {project.client}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                    {project.title}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-widest text-black/40">
            [manifesto]
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-black sm:text-4xl">
            o que acreditamos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/60 sm:text-lg">
            antes de qualquer impressão, há uma forma de pensar. o manifesto
            explica por que fazemos as coisas como fazemos.
          </p>
          <Link
            href="/manifesto"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            ler manifesto
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
