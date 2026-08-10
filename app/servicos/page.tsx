import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import PageShell from '../components/homeComponents/PageShell';
import ServicosHero from '../components/servicosComponents/ServicosHero';
import ServicosGrid from '../components/servicosComponents/ServicosGrid';
import ServicosGuia from '../components/servicosComponents/ServicosGuia';
import ServicosProcesso from '../components/servicosComponents/ServicosProcesso';
import ServicosCtaFinal from '../components/servicosComponents/ServicosCtaFinal';

export default function ServicosPage() {
  return (
    <PageShell footer={<Footer />}>
      <Navbar />
      <ServicosHero />
      <ServicosGrid />
      <ServicosGuia />
      <ServicosProcesso />
      <ServicosCtaFinal />
    </PageShell>
  );
}