import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import PageShell from '../components/homeComponents/PageShell';
import PortfolioManifest from '../components/portfolioComponents/PortfolioManifest';

export default function PortfolioPage() {
  return (
    <PageShell footer={<Footer />}>
      <Navbar />
      <PortfolioManifest />
    </PageShell>
  );
}