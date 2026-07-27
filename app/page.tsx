import Preloader from './components/Preloader';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import AnimatedShowcase from './components/AnimatedShowcase/AnimatedShowcase';

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <AnimatedShowcase />

      <div className='h-300 bg-amber-50'></div>
    </>
  );
}