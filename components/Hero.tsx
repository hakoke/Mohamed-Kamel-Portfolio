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
            Hi, I&apos;m <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">Mohamed Kamel</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            I like taking on new projects, figuring things out as I go, and building real, usable solutions.
          </p>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            I&apos;m especially interested in AI, computer vision, and full stack development.
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <a
              href="https://github.com/hakoke"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-lg transition-all border border-purple-500/30 hover:border-purple-500/50 transform hover:scale-110"
            >
              <Github size={24} className="text-purple-300" />
            </a>
            <a
              href="#contact"
              className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 rounded-lg transition-all border border-cyan-500/30 hover:border-cyan-500/50 transform hover:scale-110"
            >
              <Mail size={24} className="text-cyan-300" />
            </a>
          </div>

          <a
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:opacity-90 rounded-lg transition-all transform hover:scale-105 font-semibold shadow-lg shadow-pink-500/50"
          >
            Learn More
            <ArrowDown size={20} />
          </a>
        </motion.div>
      </div>

      {/* background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-1/3 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </section>
  );
}

