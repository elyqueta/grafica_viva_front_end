import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import PageShell from '../components/homeComponents/PageShell';
import { PARTNERS } from '../data/partners';
import Image from 'next/image';
import Link from 'next/link';

export default function ParceirosPage() {
  return (
    <PageShell footer={<Footer />}>
      <Navbar />

      <section className="relative w-full bg-amber-50">
        <div className="relative h-[55vh] w-full overflow-hidden sm:h-[65vh] lg:h-[75vh]">
          <Image
            src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1600&q=80"
            alt="parceiros"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 lg:px-10 lg:pb-16">
            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-semibold tracking-widest text-white/70">
                [parceiros]
              </p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                marcas que confiam na gráfica viva
              </h1>
              <p className="mt-2 text-base text-white/80 sm:text-lg">
                conheça os nossos parceiros e saiba como colaboramos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 pt-16 pb-16 lg:px-10 lg:pt-24 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PARTNERS.map((partner) => (
              <Link
                key={partner.slug}
                href={`/parceiros/${partner.slug}`}
                className="group flex flex-col rounded-sm border border-black/5 bg-white p-5 transition-colors hover:border-rose-600/30 hover:shadow-sm"
              >
                <div className="relative mx-auto mb-4 h-20 w-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 35vw, 80vw"
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold tracking-widest text-black/40">
                    [{partner.category}]
                  </p>
                  <p className="mt-1 text-sm font-semibold text-black sm:text-base">
                    {partner.name}
                  </p>
                  <p className="mt-2 text-xs text-black/60 line-clamp-3">
                    {partner.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
