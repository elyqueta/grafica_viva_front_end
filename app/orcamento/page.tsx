import { Suspense } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import PageShell from "../components/homeComponents/PageShell";
import MediaReveal from "../components/MediaReveal";
import { OrcamentoForm } from "./OrcamentoForm";

// vídeo de placeholder para teste de performance, substituir por vídeo real da marca
const ORCAMENTO_VIDEO = '/videos/orçamento.mp4';

function FormSkeleton() {
  return (
    <div className="mx-auto max-w-3xl mt-10 space-y-6">
      <div className="h-10 w-full rounded-sm bg-black/5" />
      <div className="h-10 w-full rounded-sm bg-black/5" />
      <div className="h-10 w-full rounded-sm bg-black/5" />
    </div>
  );
}

export default function OrcamentoPage() {
  return (
    <PageShell footer={<Footer />}>
      <Navbar />

      <section className="relative w-full bg-amber-50">
        <div className="relative h-[55vh] w-full overflow-hidden sm:h-[65vh] lg:h-[75vh]">
          <MediaReveal
            poster="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1600&q=80"
            alt="Orçamento"
            priority
            videoSrc={ORCAMENTO_VIDEO}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 lg:px-10 lg:pb-16">
            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-semibold tracking-widest text-white/70">
                [orçamento]
              </p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                Pedir orçamento
              </h1>
              <p className="mt-2 text-base text-white/80 sm:text-lg">
                Conte-nos o que precisa e devolvemos uma proposta simples e clara.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-amber-50 px-6 pb-16 lg:px-10 lg:pb-24">
        <Suspense fallback={<FormSkeleton />}>
          <OrcamentoForm />
        </Suspense>
      </section>
    </PageShell>
  );
}
