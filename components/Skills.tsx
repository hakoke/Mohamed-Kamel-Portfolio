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
    <section id="skills" className="py-20 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-center">Skills & Technologies</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
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
                className="p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <h3 className="text-lg font-semibold mb-4 text-blue-400">
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
                  className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
                >
                  <h4 className="text-xl font-semibold mb-2">{lang.name}</h4>
                  <p className="text-gray-400">{lang.level}</p>
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
              <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm">
                Full-Stack Development
              </span>
              <span className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-sm">
                Computer Vision
              </span>
              <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm">
                Cybersecurity
              </span>
              <span className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-sm">
                Cloud Architecture
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

