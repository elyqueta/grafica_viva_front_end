import Preloader from './components/Preloader';
import Navbar from './components/NavBar';
import Hero from './components/homeComponents/Hero';
import About from './components/homeComponents/About';
import Services from './components/homeComponents/Services';
import Blog from './components/homeComponents/Blog';
import Contact from './components/homeComponents/Contact';
import Footer from './components/Footer';
import PageShell from './components/homeComponents/PageShell';
import Needs from './components/homeComponents/Needs';
import HowItWorks from './components/homeComponents/HowItWorks';
import WhyUs from './components/homeComponents/WhyUs';
import Partners from './components/homeComponents/Partners';
import FinalCta from './components/homeComponents/FinalCta';

export default function Home() {
  return (
    <PageShell footer={<Footer />}>
      <Preloader />
      <Navbar />
      <Hero />
      <Needs />
      <About />
      <Services />
      <HowItWorks />
      <WhyUs />
      <Partners sectionId="parceiros" />
      <Blog />
      <FinalCta />
      <Contact sectionId="contactos" />
    </PageShell>
  );
}