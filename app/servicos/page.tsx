import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import PageShell from '../components/homeComponents/PageShell';
import ServicosGrid from '../components/servicosComponents/ServicosGrid';
import ServicosWhy from '../components/servicosComponents/ServicosWhy';

export default function ServicosPage() {
  return (
    <PageShell footer={<Footer />}>
      <Navbar />
      <ServicosGrid />
      <ServicosWhy />
    </PageShell>
  );
}