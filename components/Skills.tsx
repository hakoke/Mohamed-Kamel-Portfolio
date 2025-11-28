"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skillCategories = [
    {
      category: "Programming Languages",
      skills: ["Python", "JavaScript", "C++", "HTML", "TypeScript"],
    },
    {
      category: "Web Development",
      skills: ["Next.js", "React.js", "Tailwind CSS", "Prisma", "Node.js"],
    },
    {
      category: "Database Management",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    },
    {
      category: "AI / Machine Learning",
      skills: ["YOLOv8", "OpenCV", "ArcFace", "DeepStream SDK", "Langchain", "OpenAI API", "Zep"],
    },
    {
      category: "Cloud & DevOps",
      skills: ["AWS EC2", "AWS S3", "Docker", "Railway"],
    },
    {
      category: "Cybersecurity",
      skills: ["Kali Linux", "Metasploit", "OWASP ZAP", "Wireshark", "Burp Suite"],
    },
    {
      category: "Network & Tools",
      skills: ["Packet Tracer", "Git", "Socket.IO", "Express"],
    },
  ];

  const languages = [
    { name: "English", level: "IELTS 8.0" },
    { name: "Arabic", level: "Native" },
  ];

  return (
    <section
      id="skills"
      className="py-20 px-4 scroll-mt-28 sm:scroll-mt-32"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto text-lg">
            A comprehensive toolkit spanning full-stack development, AI/ML, cybersecurity, and cloud infrastructure
          </p>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {skillCategories.map((cat, idx) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/20 hover:border-white/40 hover:from-white/15 hover:to-white/10 transition-all transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  {cat.category}
                </h3>
                <ul className="space-y-2">
                  {cat.skills.map((skill) => (
                    <li key={skill} className="text-gray-400 text-sm">
                      • {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Languages Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center">Languages</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {languages.map((lang, idx) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                  className="p-6 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-lg border-2 border-white/30 hover:border-white/50 transition-all transform hover:scale-105"
                >
                  <h4 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">{lang.name}</h4>
                  <p className="text-gray-300 font-medium">{lang.level}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Expertise Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-wrap gap-3 justify-center">
              <span className="px-5 py-2.5 bg-gradient-to-r from-pink-500/30 to-rose-500/30 border-2 border-pink-500/50 rounded-full text-sm font-semibold hover:scale-110 transition-transform">
                Full-Stack Development
              </span>
              <span className="px-5 py-2.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-2 border-cyan-500/50 rounded-full text-sm font-semibold hover:scale-110 transition-transform">
                Computer Vision
              </span>
              <span className="px-5 py-2.5 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 border-2 border-purple-500/50 rounded-full text-sm font-semibold hover:scale-110 transition-transform">
                Cybersecurity
              </span>
              <span className="px-5 py-2.5 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border-2 border-emerald-500/50 rounded-full text-sm font-semibold hover:scale-110 transition-transform">
                Cloud Architecture
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

