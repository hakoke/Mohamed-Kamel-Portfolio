"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects = [
    {
      title: "SafeOps PPE Detection",
      slug: "dashboard-ai",
      desc: "AI-powered warehouse safety monitoring system with real-time PPE detection, facial recognition for attendance, and automated violation alerts using computer vision",
      tech: ["YOLOv8", "OpenCV", "ArcFace", "DeepStream", "Python", "Flask", "MongoDB", "ByteTrack"],
      github: "https://github.com/hakoke/Dashboard_AI",
      gradient: "from-blue-500/30 via-cyan-500/30 to-teal-500/30",
      image: "/SafeOps.png",
    },
    {
      title: "Bespoke",
      slug: "bespoke",
      desc: "AI-powered talent onboarding platform with intelligent candidate matching, modern UI, and seamless user experience",
      tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      github: "https://github.com/hakoke/Bespoke",
      gradient: "from-purple-500/30 via-pink-500/30 to-red-500/30",
      image: "💼",
    },
    {
      title: "ServerMate Discord AI",
      slug: "discord-ai",
      desc: "Intelligent Discord bot with dual-model AI that automatically chooses between fast and smart models, advanced memory system, image/video generation, web browsing, and personalized conversations",
      tech: ["Python", "Discord.py", "Google Gemini API", "Imagen 3.0", "Vertex AI", "PostgreSQL"],
      github: "https://github.com/hakoke/Discord_AI",
      gradient: "from-indigo-500/30 via-purple-500/30 to-pink-500/30",
      image: "/Servermate/Profilepic.jpg",
    },
  ];

  // Preload project logos/images
  useEffect(() => {
    projects.forEach((project) => {
      if (project.image && project.image.startsWith('/')) {
        const img = new window.Image();
        img.src = project.image;
      }
    });
  }, []);

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent relative overflow-hidden" ref={ref}>
      {/* Colorful background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-gray-300 text-center mb-16 max-w-2xl mx-auto text-lg">
            Showcasing my expertise in full-stack development, AI/ML integration, and real-time applications
          </p>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="group relative p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-xl hover:from-white/15 hover:to-white/10 transition-all cursor-pointer border-2 border-white/20 hover:border-white/40 h-full overflow-hidden transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl -z-10`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="text-blue-400" size={24} />
                    </div>

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {project.image && (
                          project.image.startsWith('/') ? (
                            <div className={`w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden ${project.title === "SafeOps PPE Detection" ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10' : 'bg-transparent'}`}>
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="max-w-full max-h-full object-contain"
                                style={{ 
                                  filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.3))'
                                }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            </div>
                          ) : (
                            <span className="text-3xl">{project.image}</span>
                          )
                        )}
                        <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={20} />
                      </a>
                    </div>

                    <p className="text-gray-400 mb-6 leading-relaxed">{project.desc}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-sm bg-white/10 rounded-full border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
