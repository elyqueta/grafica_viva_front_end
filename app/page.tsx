import Preloader from './components/Preloader';
import Navbar from './components/NavBar';
import Hero from './components/Hero';

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />

      <div className='h-300 bg-amber-50'></div>
    </>
  );
}