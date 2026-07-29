import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import PageShell from '../components/homeComponents/PageShell';
import Hero from '../components/homeComponents/Hero';

export default function AboutPage() {
  return (
    <PageShell footer={<Footer />}>
      <Navbar />

      <Hero />
     
    </PageShell>
  );
}