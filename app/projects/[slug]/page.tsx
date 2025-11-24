"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Code, Image as ImageIcon, Play, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Project data mapping
  const projects: Record<string, any> = {
    "dashboard-ai": {
      title: "SafeOps PPE Detection",
      tagline: "AI-Powered Warehouse Safety Monitoring System",
      github: "https://github.com/hakoke/Dashboard_AI",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      gradientLight: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
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
      results: "Successfully deployed system capable of processing multiple camera feeds in real-time, achieving high accuracy in PPE detection and employee recognition, with automated reporting reducing manual monitoring workload by 80%.",
      images: [
        { url: "/placeholder-dashboard-1.jpg", alt: "Dashboard Overview" },
        { url: "/placeholder-dashboard-2.jpg", alt: "PPE Detection" },
        { url: "/placeholder-dashboard-3.jpg", alt: "Analytics View" },
      ],
      codeSnippets: [
        {
          language: "python",
          title: "PPE Detection Pipeline",
          code: `# Placeholder for PPE detection code
def detect_ppe(frame):
    # YOLOv8 model inference
    results = model(frame)
    # Process detections
    return violations`,
        },
        {
          language: "python",
          title: "Face Recognition",
          code: `# Placeholder for ArcFace recognition
def recognize_employee(face_embedding):
    # Compare with database
    matches = compare_embeddings(face_embedding)
    return employee_id`,
        },
      ],
    },
    "bespoke": {
      title: "Bespoke",
      tagline: "AI-Powered Talent Onboarding Platform",
      github: "https://github.com/hakoke/Bespoke",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      gradientLight: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
      image: "💼",
      overview: "A modern talent onboarding platform that leverages AI to match candidates with opportunities, streamlining the recruitment process with intelligent automation and a beautiful user interface.",
      features: [
        "AI-powered candidate matching and recommendation system using OpenAI",
        "Modern, responsive UI built with Next.js 15 and React 19",
        "Real-time collaboration features for hiring teams",
        "Comprehensive candidate profile management",
        "Automated workflow orchestration",
        "Advanced search and filtering capabilities"
      ],
      tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "NextAuth", "OpenAI API"],
      challenges: [
        "Built scalable architecture to handle large candidate databases",
        "Implemented real-time updates using server-side rendering",
        "Created intuitive UX for complex matching algorithms",
        "Optimized performance for fast search and filtering"
      ],
      results: "Delivered a production-ready platform that significantly reduces time-to-hire through intelligent automation, with a modern tech stack ensuring maintainability and scalability.",
      images: [
        { url: "/placeholder-bespoke-1.jpg", alt: "Dashboard View" },
        { url: "/placeholder-bespoke-2.jpg", alt: "Candidate Matching" },
        { url: "/placeholder-bespoke-3.jpg", alt: "Profile Management" },
      ],
      codeSnippets: [
        {
          language: "typescript",
          title: "AI Matching Algorithm (OpenAI)",
          code: `// Placeholder for OpenAI-powered matching logic
async function matchCandidates(job: Job) {
  const candidates = await findMatches(job);
  return rankByAI(candidates, { model: 'gpt-4' });
}`,
        },
        {
          language: "typescript",
          title: "Real-time Updates",
          code: `// Placeholder for real-time sync
useEffect(() => {
  const subscription = subscribeToUpdates();
  return () => subscription.unsubscribe();
}, []);`,
        },
      ],
    },
    "discord-ai": {
      title: "ServerMate Discord AI",
      tagline: "Intelligent Discord Bot with AI Features",
      github: "https://github.com/hakoke/Discord_AI",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      gradientLight: "from-indigo-500/20 via-purple-500/20 to-pink-500/20",
      image: "🤖",
      overview: "An advanced Discord bot that integrates AI capabilities to enhance server management, provide intelligent responses, and automate various server tasks using natural language processing powered by Google Gemini.",
      features: [
        "AI-powered natural language understanding and responses",
        "Context-aware conversation handling",
        "Server management automation",
        "Custom command system with extensible architecture",
        "Integration with Google Gemini API and LangChain",
        "Persistent data storage for user preferences"
      ],
      tech: ["Python", "Discord.py", "Google Gemini API", "LangChain", "PostgreSQL", "AsyncIO"],
      challenges: [
        "Implemented efficient async/await patterns for handling multiple concurrent requests",
        "Designed conversation context management for coherent AI interactions",
        "Optimized API usage to minimize costs while maintaining responsiveness",
        "Created modular architecture for easy feature expansion"
      ],
      results: "Successfully deployed bot serving multiple Discord servers with reliable AI-powered features, demonstrating proficiency in API integration, async programming, and chatbot development.",
      images: [
        { url: "/placeholder-discord-1.jpg", alt: "Bot Interface" },
        { url: "/placeholder-discord-2.jpg", alt: "AI Responses" },
        { url: "/placeholder-discord-3.jpg", alt: "Command System" },
      ],
      codeSnippets: [
        {
          language: "python",
          title: "AI Response Handler (Gemini)",
          code: `# Placeholder for Google Gemini integration
async def handle_message(message):
    response = await gemini.generate(message.content)
    await message.channel.send(response)`,
        },
        {
          language: "python",
          title: "Context Management",
          code: `# Placeholder for context handling
def maintain_context(conversation_id):
    context = get_context(conversation_id)
    return context`,
        },
      ],
    },
    "monopoly": {
      title: "Monopoly Multiplayer",
      tagline: "Real-Time Multiplayer Monopoly Game",
      github: "https://github.com/hakoke/MONOPOLY_working",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      gradientLight: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
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
      results: "Delivered a polished multiplayer game experience that supports multiple concurrent games, demonstrating expertise in real-time web applications, WebSocket programming, and game development.",
      images: [
        { url: "/placeholder-monopoly-1.jpg", alt: "Game Board" },
        { url: "/placeholder-monopoly-2.jpg", alt: "Multiplayer Lobby" },
        { url: "/placeholder-monopoly-3.jpg", alt: "Gameplay View" },
      ],
      codeSnippets: [
        {
          language: "javascript",
          title: "WebSocket Game State",
          code: `// Placeholder for real-time sync
io.on('connection', (socket) => {
  socket.on('move', (data) => {
    gameState.update(data);
    io.emit('stateUpdate', gameState);
  });
});`,
        },
        {
          language: "javascript",
          title: "Game Logic",
          code: `// Placeholder for game rules
function processTurn(player, action) {
  const result = validateAction(player, action);
  if (result.valid) {
    executeAction(player, action);
  }
}`,
        },
      ],
    },
  };

  const project = projects[slug];

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-purple-900/20 to-[#0a0a0a] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Project Not Found</h1>
          <Link href="/#projects" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-purple-900/20 to-[#0a0a0a] relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${project.gradientLight} opacity-30 blur-3xl animate-pulse`} />
        <div className={`absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl ${project.gradientLight} opacity-20 blur-3xl animate-pulse`} style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent font-semibold">Back to Portfolio</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl blur-3xl opacity-20`} />
            
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 md:p-12 border border-white/20 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                <span className="text-7xl md:text-8xl">{project.image}</span>
                <div className="flex-1">
                  <h1 className={`text-5xl md:text-7xl font-bold mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                    {project.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300">{project.tagline}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.gradient} hover:opacity-90 rounded-lg transition-all transform hover:scale-105 font-semibold`}
                >
                  <Github size={20} />
                  View on GitHub
                </a>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all border border-white/20">
                  <Play size={20} />
                  Live Demo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-20">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 backdrop-blur-xl"
          >
            <h2 className={`text-4xl font-bold mb-6 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
              Overview
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">{project.overview}</p>
          </motion.div>

          {/* Image Gallery */}
          {project.images && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <ImageIcon className={`text-transparent bg-gradient-to-r ${project.gradient} bg-clip-text`} size={32} />
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  Project Showcase
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {project.images.map((img: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                    className="group relative aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="mx-auto mb-2 text-white/40" size={48} />
                        <p className="text-white/60 text-sm">{img.alt}</p>
                        <p className="text-white/40 text-xs mt-1">Image Placeholder</p>
                      </div>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientLight} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Code Snippets */}
          {project.codeSnippets && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Code className={`text-transparent bg-gradient-to-r ${project.gradient} bg-clip-text`} size={32} />
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  Code Highlights
                </h2>
              </div>
              <div className="space-y-6">
                {project.codeSnippets.map((snippet: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                    className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-white/10 overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">{snippet.title}</h3>
                      <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                        {snippet.language}
                      </span>
                    </div>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto border border-white/5">
                      <code className="text-green-400 font-mono text-sm">{snippet.code}</code>
                    </pre>
                    <p className="text-white/40 text-xs mt-3 italic">Code snippet placeholder - Replace with actual code</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Features */}
          {project.features && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className={`text-transparent bg-gradient-to-r ${project.gradient} bg-clip-text`} size={32} />
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  Key Features
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + idx * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                  >
                    <span className={`text-2xl bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent font-bold`}>✓</span>
                    <span className="text-gray-300 flex-1">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tech Stack */}
          {project.tech && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 backdrop-blur-xl"
            >
              <h2 className={`text-4xl font-bold mb-6 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech: string, idx: number) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1 + idx * 0.05 }}
                    className={`px-5 py-2.5 bg-gradient-to-r ${project.gradientLight} border border-white/20 rounded-full text-sm font-semibold hover:scale-110 transition-transform cursor-default`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Challenges */}
          {project.challenges && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 backdrop-blur-xl"
            >
              <h2 className={`text-4xl font-bold mb-6 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                Challenges & Solutions
              </h2>
              <div className="space-y-4">
                {project.challenges.map((challenge: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1.2 + idx * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20"
                  >
                    <span className="text-orange-400 text-2xl">⚡</span>
                    <span className="text-gray-300 flex-1">{challenge}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Results */}
          {project.results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className={`bg-gradient-to-br ${project.gradientLight} rounded-2xl p-8 border-2 border-white/30 backdrop-blur-xl`}
            >
              <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                Results & Impact
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed">{project.results}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
