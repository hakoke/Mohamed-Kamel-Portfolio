"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Code, Image as ImageIcon, Play, Zap, Cpu, Cloud, Video, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Project data mapping
  const projects: Record<string, any> = {
    "dashboard-ai": {
      title: "SafeOps PPE Detection",
      tagline: "AI-Powered Warehouse Safety Monitoring System",
      github: "https://github.com/hakoke/Dashboard_AI",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      gradientLight: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
      image: "🤖",
      overview: "SafeOps is a production-ready AI monitoring system designed for warehouse safety. The system uses computer vision to detect safety violations in real-time, track employee attendance through facial recognition, and automatically alert security personnel when violations occur. Built to handle multiple camera feeds simultaneously, SafeOps processes video streams continuously to ensure workplace safety compliance. The attendance system automatically tracks when employees enter the warehouse (first detection time) and records exit time when they're gone from all cameras for more than 5 minutes.",
      features: [
        "Real-time PPE detection using YOLOv8 (helmets, vests, gloves, boots)",
        "Facial recognition for employee attendance tracking using ArcFace with 3 photos per employee (side, front, side)",
        "Automatic attendance tracking: records entry time on first detection and exit time when employee is gone from all cameras for 5+ minutes",
        "Multi-camera person tracking with ByteTrack and ReID for following employees across different camera views",
        "Smart violation filtering: 30-90 second cooldown per person, per-frame deduplication, and NMS-like filtering to prevent spam violations",
        "View violation images with detailed info: timestamp, camera location, employee, violation type, and AI confidence",
        "Camera management: add cameras via HTTP or RTSP URLs with automatic data pulling from AWS every 5 minutes",
        "Real-time employee location tracking: click employee ID to see which camera detected them"
      ],
      tech: ["YOLOv8", "OpenCV", "ArcFace", "Python", "Flask", "MongoDB", "ByteTrack", "ReID", "AWS", "Railway"],
      models: [
        {
          name: "ArcFace",
          description: "Pre-trained model for facial recognition and employee identification",
          type: "Pre-trained"
        },
        {
          name: "YOLOv8",
          description: "Trained on public datasets from Roboflow for PPE detection, running on AWS GPU instances",
          type: "Custom Trained"
        },
        {
          name: "ByteTrack",
          description: "Multi-object tracking algorithm for following individuals across video frames",
          type: "Algorithm"
        },
        {
          name: "ReID",
          description: "Person re-identification model for cross-camera tracking",
          type: "Model"
        },
        {
          name: "OpenCV",
          description: "Computer vision library for image processing and spatial operations",
          type: "Library"
        }
      ],
      hosting: {
        ai: "AWS (GPU instances for model inference)",
        web: "Railway (frontend, backend, and MongoDB database)"
      },
      demoVideo: "/placeholder-demo-video.mp4",
      challenges: [
        "Optimized real-time video processing to handle multiple camera feeds simultaneously without performance degradation",
        "Implemented cross-camera person tracking using ReID embeddings to maintain identity across different camera views",
        "Integrated multiple AI models including YOLOv8 and ArcFace into a unified processing pipeline",
        "Designed scalable architecture that can handle high-volume video streams while maintaining low latency",
        "Managed model deployment on AWS GPU instances with efficient resource utilization"
      ],
      results: "SafeOps is successfully deployed and processing multiple camera feeds in real-time. The system achieves high accuracy in both PPE detection and employee recognition. Automated violation alerts have significantly reduced the need for manual monitoring, allowing security teams to focus on responding to actual incidents rather than constantly watching video feeds.",
      images: [
        { 
          url: "/safeops-dashboard.jpg", 
          alt: "Admin Dashboard",
          title: "Admin Dashboard",
          description: "The main control panel gives you a complete overview of your warehouse safety at a glance. You can see all 4 cameras are online, track employee presence (we added 0 employees for this demo), and monitor 217 new unreviewed safety violations. Interactive charts show violations by location and by employee, making it easy to spot patterns and address safety concerns quickly."
        },
        { 
          url: "/safeops-cameras.jpg", 
          alt: "Camera Management",
          title: "Camera Management",
          description: "Add and manage all your security cameras from one place. You can add cameras using either HTTP or RTSP URLs, whatever works best for your setup. The page shows each camera's ID, name, location, URL type, and whether it's online. AWS automatically pulls in data from new cameras every 5 minutes, so you don't have to manually refresh anything."
        },
        { 
          url: "/safeops-employees.jpg", 
          alt: "Employee Management",
          title: "Employee Management",
          description: "This is where you add and manage all warehouse employees. For each person, you upload 3 photos from different angles (side, front, side) which ArcFace uses for facial recognition and attendance tracking. Each employee shows their ID, name, holiday days, schedule, and uploaded photos. Click an employee ID to see their current location and which camera detected them in real-time."
        },
        { 
          url: "/safeops-violations.jpg", 
          alt: "Safety Violations",
          title: "Safety Violations",
          description: "All detected safety violations show up here in real-time. To prevent spam violations, we built in smart filtering: a 30 to 90 second cooldown per person, per-frame deduplication that groups violations by camera, person, and violation type, and NMS-like filtering that keeps only the highest confidence detection. Each violation shows the status, employee name (or Unknown if not recognized), timestamp, location, violation type (missing helmet, vest, gloves, or boots), and AI confidence percentage. You can click to view the actual image of the person committing the violation and see all the details like exact time, camera location, and employee information."
        },
      ],
      codeSnippets: [
        {
          language: "python",
          title: "PPE Detection with YOLOv8",
          code: `def detect_ppe(frame, model):
    """Detect PPE violations in a video frame using YOLOv8 model."""
    results = model(frame, conf=0.5)
    violations = []
    
    for detection in results:
        if detection.class not in REQUIRED_PPE:
            violations.append({
                'type': 'missing_ppe',
                'item': detection.class,
                'confidence': detection.conf,
                'bbox': detection.bbox
            })
    
    return violations`,
        },
        {
          language: "python",
          title: "Employee Recognition with ArcFace",
          code: `def recognize_employee(face_image, arcface_model, db):
    """Recognize employee using ArcFace embeddings."""
    embedding = arcface_model.get_embedding(face_image)
    
    # Compare with stored embeddings in MongoDB
    employees = db.employees.find({})
    best_match = None
    best_score = 0.0
    
    for employee in employees:
        similarity = cosine_similarity(
            embedding, 
            employee['face_embedding']
        )
        if similarity > best_score and similarity > THRESHOLD:
            best_score = similarity
            best_match = employee
    
    return best_match['employee_id'] if best_match else None`,
        },
        {
          language: "python",
          title: "Multi-Camera Tracking with ByteTrack and ReID",
          code: `def track_person_across_cameras(frame, camera_id, tracker, reid_model):
    """Track person across multiple camera feeds."""
    # ByteTrack for single camera tracking
    tracks = tracker.update(frame)
    
    # Extract ReID features for cross-camera matching
    for track in tracks:
        person_crop = extract_person_crop(frame, track.bbox)
        reid_features = reid_model.extract_features(person_crop)
        
        # Match with tracks from other cameras
        matched_track = match_across_cameras(
            reid_features, 
            camera_id,
            global_track_pool
        )
        
        if matched_track:
            update_global_track(matched_track, track)
    
    return tracks`,
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
                {project.demoVideo && (
                  <button 
                    onClick={() => setIsVideoOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all border border-white/20"
                  >
                    <Video size={20} />
                    Watch Demo
                  </button>
                )}
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

          {/* Live Demo Video */}
          {project.demoVideo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Video className={`text-transparent bg-gradient-to-r ${project.gradient} bg-clip-text`} size={32} />
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  Live Demo
                </h2>
              </div>
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden border-2 border-white/20 group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Play size={40} className="text-white ml-1" />
                    </div>
                    <p className="text-white text-lg font-semibold">Click to watch full demo</p>
                    <p className="text-white/60 text-sm mt-2">See SafeOps in action</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Models Section */}
          {project.models && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Cpu className={`text-transparent bg-gradient-to-r ${project.gradient} bg-clip-text`} size={32} />
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  AI Models & Algorithms
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {project.models.map((model: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 + idx * 0.05 }}
                    className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">{model.name}</h3>
                      <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs text-cyan-300">
                        {model.type}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{model.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Infrastructure & Hosting */}
          {project.hosting && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Cloud className={`text-transparent bg-gradient-to-r ${project.gradient} bg-clip-text`} size={32} />
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  Infrastructure & Hosting
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-lg border border-orange-500/20">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <Cloud size={20} className="text-orange-400" />
                    AI Models
                  </h3>
                  <p className="text-gray-300">{project.hosting.ai}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <Cloud size={20} className="text-purple-400" />
                    Web Application
                  </h3>
                  <p className="text-gray-300">{project.hosting.web}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Image Carousel */}
          {project.images && project.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <ImageIcon className={`text-transparent bg-gradient-to-r ${project.gradient} bg-clip-text`} size={32} />
                <h2 className={`text-4xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  Project Showcase
                </h2>
              </div>

              {/* Image Carousel */}
              <div className="relative">
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden border-2 border-white/20 mb-4">
                  <img
                    src={project.images[currentImageIndex].url}
                    alt={project.images[currentImageIndex].alt}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `data:image/svg+xml,${encodeURIComponent(`
                        <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                          <rect width="800" height="600" fill="#1a1a1a"/>
                          <text x="400" y="300" font-family="Arial" font-size="24" fill="#666" text-anchor="middle">
                            ${project.images[currentImageIndex].title}
                          </text>
                        </svg>
                      `)}`;
                    }}
                  />
                  
                  {/* Navigation Buttons */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>

                {/* Image Description */}
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 rounded-lg p-6 border border-white/10"
                >
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {project.images[currentImageIndex].title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.images[currentImageIndex].description}
                  </p>
                </motion.div>

                {/* Image Indicators */}
                {project.images.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {project.images.map((_: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? `bg-gradient-to-r ${project.gradient} scale-125`
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
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

      {/* Video Modal */}
      {isVideoOpen && project.demoVideo && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden border-2 border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white transition-colors"
            >
              <span className="text-2xl">×</span>
            </button>
            <video
              src={project.demoVideo}
              controls
              autoPlay
              className="w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
