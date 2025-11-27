"use client";

import { motion } from "framer-motion";
import { Github, Mail, ArrowDown, Download } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-4"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold md:text-7xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Mohamed Kamel
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300 leading-relaxed">
            I turn ambiguous ideas into production software. My happy place is
            blending full-stack craft with computer vision, LLM ops, and the
            glue that makes teams trust the data they see. If a feature needs
            design polish, GPU inference, or a careful rollout plan, I stay with
            it until it ships. (You can also quiz my new AI wingman below.)
          </p>

          <div className="mt-10 mb-12 flex gap-4 justify-center">
            <a
              href="https://github.com/hakoke"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 transition-all hover:border-purple-500/50 hover:from-purple-500/30 hover:to-pink-500/30 hover:scale-110"
            >
              <Github size={24} className="text-purple-300" />
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 transition-all hover:border-cyan-500/50 hover:from-cyan-500/30 hover:to-blue-500/30 hover:scale-110"
            >
              <Mail size={24} className="text-cyan-300" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 px-8 py-4 font-semibold shadow-lg shadow-pink-500/50 transition-all hover:scale-105 hover:opacity-90"
            >
              View Projects
              <ArrowDown size={20} />
            </a>
            <a
              href="/Mohamed_Kamel_CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10"
            >
              Download CV
              <Download size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 grid w-full gap-4 text-left sm:grid-cols-3"
        >
          {[
            { label: "Products shipped", value: "3 prod builds" },
            { label: "Data streaming & CV hours", value: "1,200+" },
            { label: "Stack", value: "Next.js · Python · GPUs" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                {stat.label}
              </p>
              <p className="mt-2 text-xl font-semibold text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 blur-3xl" />
        <div
          className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 blur-3xl"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute left-1/3 top-3/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl"
          style={{ animationDelay: "0.5s" }}
        />
      </div>
    </section>
  );
}

