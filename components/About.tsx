"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cpu, Gamepad2 } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const interests = [
    {
      icon: <Code2 size={32} />,
      title: "Web Development",
      desc: "Building responsive and interactive web apps with modern frameworks",
    },
    {
      icon: <Cpu size={32} />,
      title: "AI & Machine Learning",
      desc: "Exploring neural networks and training custom models",
    },
    {
      icon: <Gamepad2 size={32} />,
      title: "Game Development",
      desc: "Creating multiplayer games with engaging mechanics",
    },
  ];

  return (
    <section id="about" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>

          <div className="mb-16 max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              I&apos;m a passionate full-stack developer with a strong focus on AI/ML integration 
              and real-time applications. My journey in software development began with a curiosity 
              about how things work, which led me to explore everything from web development to 
              computer vision and machine learning.
            </p>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              I specialize in building scalable applications using modern technologies like Next.js, 
              React, and Python. My recent work includes developing AI-powered systems for safety 
              monitoring, creating intelligent Discord bots, and building multiplayer games with 
              real-time synchronization.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I&apos;m not coding, I enjoy exploring new AI frameworks, contributing to open-source 
              projects, and continuously learning about emerging technologies in the field.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {interests.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="text-blue-500 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

