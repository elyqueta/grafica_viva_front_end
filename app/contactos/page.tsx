import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import PageShell from '../components/homeComponents/PageShell';
import ContactosHero from '../components/contactosComponents/ContactosHero';
import ContactosInfo from '../components/contactosComponents/ContactosInfo';
import ContactosMapa from '../components/contactosComponents/ContactosMapa';

export const metadata = {
  title: 'Contactos | Gráfica Viva',
  description: 'Contacte a Gráfica Viva por email, telefone ou WhatsApp. Visite o nosso estúdio em Luanda.',
};

export default function ContactosPage() {
  return (
    <PageShell footer={<Footer />}>
      <Navbar />
      <ContactosHero />
      <ContactosInfo />
      <ContactosMapa />
    </PageShell>
  );
}
