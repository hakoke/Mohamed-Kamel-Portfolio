import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import AiAssistant from "@/components/AiAssistant";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-purple-900/10 to-[#0a0a0a] relative">
      <Navigation />
      <Hero />
      <Projects />
      <AiAssistant />
      <Skills />
      <Contact />
    </main>
  );
}

