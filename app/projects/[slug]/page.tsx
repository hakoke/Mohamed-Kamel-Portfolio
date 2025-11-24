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
    "dashboard-ai": {
      title: "Dashboard AI",
      tagline: "AI-Powered Warehouse Safety Monitoring System",
      github: "https://github.com/hakoke/Dashboard_AI",
      gradient: "from-blue-500/30 via-cyan-500/30 to-teal-500/30",
      image: "🤖",
      overview: "A comprehensive AI monitoring system designed for warehouse safety, utilizing computer vision and machine learning to detect safety violations, track employee attendance, and generate automated alerts.",
      features: [
        "Real-time PPE detection using YOLOv8 (helmets, vests, gloves, boots)",
        "Facial recognition for employee attendance tracking using ArcFace",
        "Multi-camera person tracking with ByteTrack and ReID",
        "Automated violation alerts and incident reporting",
        "Daily and weekly safety compliance reports",
        "Spatial mapping for 3D warehouse representation",
        "DeepStream SDK integration for live video processing"
      ],
      tech: ["YOLOv8", "OpenCV", "ArcFace", "DeepStream SDK", "Python", "Flask", "MongoDB", "ByteTrack", "ReID", "AWS"],
      challenges: [
        "Optimized real-time video processing for multiple camera feeds",
        "Implemented cross-camera person tracking using ReID embeddings",
        "Integrated multiple AI models (YOLOv8, ArcFace) in a unified pipeline",
        "Designed scalable architecture for handling high-volume video streams"
      ],
      results: "Successfully deployed system capable of processing multiple camera feeds in real-time, achieving high accuracy in PPE detection and employee recognition, with automated reporting reducing manual monitoring workload by 80%."
    },
    "bespoke": {
      title: "Bespoke",
      tagline: "AI-Powered Talent Onboarding Platform",
      github: "https://github.com/hakoke/Bespoke",
      gradient: "from-purple-500/30 via-pink-500/30 to-red-500/30",
      image: "💼",
      overview: "A modern talent onboarding platform that leverages AI to match candidates with opportunities, streamlining the recruitment process with intelligent automation and a beautiful user interface.",
      features: [
        "AI-powered candidate matching and recommendation system",
        "Modern, responsive UI built with Next.js 15 and React 19",
        "Real-time collaboration features for hiring teams",
        "Comprehensive candidate profile management",
        "Automated workflow orchestration",
        "Advanced search and filtering capabilities"
      ],
      tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "NextAuth"],
      challenges: [
        "Built scalable architecture to handle large candidate databases",
        "Implemented real-time updates using server-side rendering",
        "Created intuitive UX for complex matching algorithms",
        "Optimized performance for fast search and filtering"
      ],
      results: "Delivered a production-ready platform that significantly reduces time-to-hire through intelligent automation, with a modern tech stack ensuring maintainability and scalability."
    },
    "discord-ai": {
      title: "Discord AI",
      tagline: "Intelligent Discord Bot with AI Features",
      github: "https://github.com/hakoke/Discord_AI",
      gradient: "from-indigo-500/30 via-purple-500/30 to-pink-500/30",
      image: "🤖",
      overview: "An advanced Discord bot that integrates AI capabilities to enhance server management, provide intelligent responses, and automate various server tasks using natural language processing.",
      features: [
        "AI-powered natural language understanding and responses",
        "Context-aware conversation handling",
        "Server management automation",
        "Custom command system with extensible architecture",
        "Integration with OpenAI API and LangChain",
        "Persistent data storage for user preferences"
      ],
      tech: ["Python", "Discord.py", "OpenAI API", "LangChain", "PostgreSQL", "AsyncIO"],
      challenges: [
        "Implemented efficient async/await patterns for handling multiple concurrent requests",
        "Designed conversation context management for coherent AI interactions",
        "Optimized API usage to minimize costs while maintaining responsiveness",
        "Created modular architecture for easy feature expansion"
      ],
      results: "Successfully deployed bot serving multiple Discord servers with reliable AI-powered features, demonstrating proficiency in API integration, async programming, and chatbot development."
    },
    "monopoly": {
      title: "Monopoly Multiplayer",
      tagline: "Real-Time Multiplayer Monopoly Game",
      github: "https://github.com/hakoke/MONOPOLY_working",
      gradient: "from-green-500/30 via-emerald-500/30 to-teal-500/30",
      image: "🎲",
      overview: "A fully functional multiplayer Monopoly game built for the web, featuring real-time gameplay, persistent game state, and modern UI/UX design.",
      features: [
        "Real-time multiplayer gameplay using WebSocket (Socket.IO)",
        "Persistent game state with PostgreSQL database",
        "Live chat functionality for player communication",
        "Beautiful, responsive UI with smooth animations",
        "Game lobby system for matchmaking",
        "Turn-based game logic with validation",
        "Property management and trading system"
      ],
      tech: ["Socket.IO", "Node.js", "Express", "PostgreSQL", "JavaScript", "HTML5", "CSS3", "EJS"],
      challenges: [
        "Synchronized game state across multiple clients in real-time",
        "Implemented complex game logic for Monopoly rules",
        "Handled connection drops and reconnection scenarios",
        "Optimized database queries for fast game state retrieval",
        "Created intuitive UI for complex game interactions"
      ],
      results: "Delivered a polished multiplayer game experience that supports multiple concurrent games, demonstrating expertise in real-time web applications, WebSocket programming, and game development."
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
              <div className="flex items-center gap-4 mb-4">
                {project.image && (
                  <span className="text-6xl">{project.image}</span>
                )}
                <h1 className="text-5xl md:text-6xl font-bold">
                  {project.title}
                </h1>
              </div>
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

          {/* Project Details */}
          {project.overview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 space-y-12"
            >
              {/* Overview */}
              <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold mb-4">Overview</h2>
                <p className="text-gray-400 text-lg leading-relaxed">{project.overview}</p>
              </div>

              {/* Features */}
              {project.features && (
                <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                  <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {project.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-blue-400 mt-1">✓</span>
                        <span className="text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              {project.tech && (
                <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                  <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges */}
              {project.challenges && (
                <div className="bg-white/5 rounded-xl p-8 border border-white/10">
                  <h2 className="text-3xl font-bold mb-6">Challenges & Solutions</h2>
                  <ul className="space-y-4">
                    {project.challenges.map((challenge: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-orange-400 mt-1">⚡</span>
                        <span className="text-gray-400">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Results */}
              {project.results && (
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-blue-500/20">
                  <h2 className="text-3xl font-bold mb-4">Results & Impact</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">{project.results}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Fallback for projects without details */}
          {!project.overview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-8">
                <Construction className="text-yellow-500" size={24} />
                <span className="text-yellow-500 font-semibold">Details Coming Soon</span>
              </div>
              
              <div className="bg-white/5 rounded-xl p-12 border border-white/10">
                <h2 className="text-3xl font-bold mb-4">Project Information</h2>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                  Detailed information about this project is being prepared. Check back soon for
                  in-depth information about the architecture, challenges, and solutions.
                </p>
              </div>
            </motion.div>
          )}

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

