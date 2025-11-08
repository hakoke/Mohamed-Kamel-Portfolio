"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects = [
    {
      title: "Monopoly",
      desc: "A digital implementation of the classic Monopoly board game with TypeScript",
      tech: ["TypeScript", "Game Logic", "Board Games"],
      github: "https://github.com/hakoke/Monopoly",
      color: "from-red-500/20 to-yellow-500/20",
    },
    {
      title: "Capital Clash",
      desc: "Interactive multiplayer game built with JavaScript",
      tech: ["JavaScript", "Multiplayer", "Web Games"],
      github: "https://github.com/hakoke/Capital-Clash",
      color: "from-blue-500/20 to-purple-500/20",
    },
    {
      title: "llama4",
      desc: "Machine learning project exploring language model capabilities",
      tech: ["Python", "AI/ML", "NLP"],
      github: "https://github.com/hakoke/llama4",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "AI Model Training",
      desc: "Custom neural network training implementations and experiments",
      tech: ["Python", "Deep Learning", "PyTorch"],
      github: "https://github.com/hakoke/AI_Model_Training",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Automatic",
      desc: "Automation tools and scripts for various development tasks",
      tech: ["Python", "Automation", "Scripts"],
      github: "https://github.com/hakoke/Automatic",
      color: "from-orange-500/20 to-red-500/20",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-white/[0.02]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10`}
                />

                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>

                <p className="text-gray-400 mb-4">{project.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-sm bg-white/10 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

