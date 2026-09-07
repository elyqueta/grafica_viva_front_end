import { Suspense } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import PageShell from "../components/homeComponents/PageShell";
import { OrcamentoForm } from "./OrcamentoForm";

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

      <section className="relative w-full bg-amber-50 px-6 pt-36 lg:px-10 lg:pt-44">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-black/40">
            [orçamento]
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl">
            pedir orçamento
          </h1>
          <p className="mt-4 text-base leading-relaxed text-black/60 sm:text-lg">
            conte-nos o que precisa e devolvemos uma proposta simples e
            clara. se preferir falar directamente, use o WhatsApp.
          </p>
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
