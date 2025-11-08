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
            <p className="text-lg text-gray-400 mb-4">
              I'm a developer who loves building things that live on the internet.
              My interest in development started back when I wanted to create my own games
              and applications.
            </p>
            <p className="text-lg text-gray-400">
              These days, I focus on creating interactive experiences with JavaScript/TypeScript
              and exploring the possibilities of AI. When I'm not coding, you can find me
              working on game projects or training machine learning models.
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

