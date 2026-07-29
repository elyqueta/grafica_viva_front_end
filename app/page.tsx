import Preloader from './components/Preloader';
import Navbar from './components/NavBar';
import Hero from './components/homeComponents/Hero';
import About from './components/homeComponents/About';
import Services from './components/homeComponents/Services';
import Portfolio from './components/homeComponents/Portfolio';
import Blog from './components/homeComponents/Blog';
import Contact from './components/homeComponents/Contact';
import Footer from './components/Footer';
import PageShell from './components/homeComponents/PageShell';

export default function Home() {
  return (
    <PageShell footer={<Footer />}>
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Blog />
      <Contact />
    </PageShell>
  );
}