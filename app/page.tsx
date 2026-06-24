import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Educators from "./components/sections/Educators";
import LearningPaths from "./components/sections/LearningPaths";
import InsideApp from "./components/sections/InsideApp";
import Languages from "./components/sections/Languages";
import RealTools from "./components/sections/RealTools";
import Certification from "./components/sections/Certification";
import Stats from "./components/sections/Stats";
import Roadmap from "./components/sections/Roadmap";
import FAQ from "./components/sections/FAQ";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <main className="relative z-0 min-h-screen">
      <Navbar />
      <Hero />
      <Educators />
      <LearningPaths />
      <InsideApp />
      <Languages />
      <RealTools />
      <Certification />
      <Stats />
      <Roadmap />
      <FAQ />
      <Footer />
    </main>
  );
}
