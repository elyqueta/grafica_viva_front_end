import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import PageShell from "../components/homeComponents/PageShell";
import AboutStatement from "../components/sobreComponents/AboutStatement";
import AboutBio from "../components/sobreComponents/AboutBio";
import AboutTools from "../components/sobreComponents/AboutTools";
import AboutValues from "../components/sobreComponents/AboutValues";
import AboutDiscover from "../components/sobreComponents/AboutDiscover";

export default function AboutPage() {
  return (
    <PageShell footer={<Footer />}>
      <Navbar />
      <AboutStatement />
      <AboutBio />
      <AboutTools />
      <AboutValues />
      <AboutDiscover />
    </PageShell>
  );
}