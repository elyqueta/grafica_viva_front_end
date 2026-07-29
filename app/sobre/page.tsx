import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import PageShell from "../components/homeComponents/PageShell";

export default function AboutPage() {
  return (
    <PageShell footer={<Footer />}>
      <Navbar />
      <div className="p-20 h-100 text-center text-3xl font-bold">
        <h1>Página em desenvolvimento</h1>
      </div>
    </PageShell>
  );
}
