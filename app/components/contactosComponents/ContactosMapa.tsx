import { CONTACT_ADDRESS, CONTACT_MAPS_URL } from '../../lib/constants';

export default function ContactosMapa() {
  return (
    <section className="relative w-full bg-amber-50 px-6 pb-24 lg:px-10 lg:pb-32">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-sm">
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT_ADDRESS)}&output=embed`}
            title="Localização da Gráfica Viva"
            loading="lazy"
            className="h-80 w-full rounded-sm lg:h-[420px]"
          />
        </div>

        <div className="mt-4 text-center">
          <a
            href={CONTACT_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-black/70 underline underline-offset-4 transition-colors hover:text-black"
          >
            abrir no Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
