"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Construction } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Project data mapping
  const projects: Record<string, any> = {
    "bespoke": {
      title: "Bespoke",
      tagline: "AI-Powered Talent Onboarding Platform",
      github: "https://github.com/hakoke/Bespoke",
      gradient: "from-purple-500/30 via-pink-500/30 to-red-500/30",
    },
    "poordown": {
      title: "Poordown.io",
      tagline: "Real-Time Multiplayer Monopoly",
      github: "https://github.com/hakoke/MONOPOLY_working",
      gradient: "from-green-500/30 via-emerald-500/30 to-teal-500/30",
    },
    "safetyvision-ai": {
      title: "SafetyVision AI",
      tagline: "Advanced PPE Detection & Safety Monitoring",
      github: "https://github.com/hakoke/AI_Model_Training",
      gradient: "from-blue-500/30 to-cyan-500/30",
    },
    "capital-clash": {
      title: "Capital Clash",
      tagline: "Interactive Multiplayer Strategy Game",
      github: "https://github.com/hakoke/Capital-Clash",
      gradient: "from-orange-500/30 to-amber-500/30",
    },
    "llama-research": {
      title: "LLaMA Research",
      tagline: "Language Model Experimentation",
      github: "https://github.com/hakoke/llama4",
      gradient: "from-indigo-500/30 to-purple-500/30",
    },
    "devops-automation": {
      title: "DevOps Automation Suite",
      tagline: "Streamline Your Development Workflow",
      github: "https://github.com/hakoke/Automatic",
      gradient: "from-rose-500/30 to-pink-500/30",
    },
  };

  const project = projects[slug];

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/#projects" className="text-blue-400 hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl blur-3xl opacity-30`}
            />
            
            <div className="relative bg-white/5 rounded-2xl p-12 border border-white/10">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-400 mb-8">{project.tagline}</p>

              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Github size={20} />
                  View on GitHub
                </a>
              </div>
            </div>
          </motion.div>

          {/* Under Construction Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-8">
              <Construction className="text-yellow-500" size={24} />
              <span className="text-yellow-500 font-semibold">Under Construction</span>
            </div>
            
            <div className="bg-white/5 rounded-xl p-12 border border-white/10">
              <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                I&apos;m currently working on creating detailed case studies for this project.
                Check back soon for in-depth information about the architecture, challenges,
                and solutions.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="p-6 bg-white/5 rounded-lg">
                  <h3 className="font-semibold mb-2">Overview</h3>
                  <p className="text-sm text-gray-400">Project background and goals</p>
                </div>
                <div className="p-6 bg-white/5 rounded-lg">
                  <h3 className="font-semibold mb-2">Technical Details</h3>
                  <p className="text-sm text-gray-400">Architecture and tech stack</p>
                </div>
                <div className="p-6 bg-white/5 rounded-lg">
                  <h3 className="font-semibold mb-2">Results</h3>
                  <p className="text-sm text-gray-400">Impact and outcomes</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-400 mb-4">
              Want to learn more about this project?
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

