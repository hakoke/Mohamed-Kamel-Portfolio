"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Hi, I&apos;m <span className="text-blue-500">Mohamed Kamel</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Full-Stack Developer & AI Enthusiast
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            I build interactive web applications and experiment with machine learning.
            Currently working on game development and AI projects.
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <a
              href="https://github.com/hakoke"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="#contact"
              className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>

          <a
            href="#about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Learn More
            <ArrowDown size={20} />
          </a>
        </motion.div>
      </div>

      {/* background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}

