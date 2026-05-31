import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Educators from "./components/sections/Educators";

export default function Home() {
  return (
    <main className="bg-[#071122] min-h-screen">
      <Navbar />
      <Hero />
      <Educators />
    </main>
  );
}
