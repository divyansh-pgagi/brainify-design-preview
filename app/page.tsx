import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import BrandStory from "./components/sections/BrandStory";
import Educators from "./components/sections/Educators";
import LearningPaths from "./components/sections/LearningPaths";
import InsideApp from "./components/sections/InsideApp";
import GlobalReach from "./components/sections/GlobalReach";
import RealTools from "./components/sections/RealTools";
import Certification from "./components/sections/Certification";
// import Roadmap from "./components/sections/Roadmap";
import FAQ from "./components/sections/FAQ";
import Footer from "./components/sections/Footer";
import RobotJourney from "./components/ui/RobotJourney";

export default function Home() {
  return (
    <main className="relative z-0 min-h-screen">
      <RobotJourney />
      <Navbar />
      <Hero />
      <Educators />
      <LearningPaths />
      <InsideApp />
      <GlobalReach />
      <RealTools />
      <Certification />
      {/* <Roadmap /> */}
      <FAQ />
      <BrandStory />
      <Footer />
    </main>
  );
}
