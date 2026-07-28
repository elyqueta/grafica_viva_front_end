import Preloader from './components/Preloader';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PageShell from './components/PageShell';

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