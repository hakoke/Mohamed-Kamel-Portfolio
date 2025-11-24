"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-purple-900/10 to-[#0a0a0a] relative">
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}

