"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Send } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus("error");
      return;
    }
    
    setSending(true);
    setStatus('idle');

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          email: formData.email.trim(), // Trim email before sending
        }),
      });
      
      const data = await response.json().catch(() => ({ 
        error: "Failed to parse server response",
        success: false 
      }));

      if (!response.ok || !data.success) {
        console.error("Email send failed:", data.error || "Unknown error");
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email send error:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-white/[0.02] scroll-mt-28 sm:scroll-mt-32"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
                <p className="text-lg text-gray-400 mb-8">
                  I&apos;m always open to new opportunities and collaborations. Feel free
                  to reach out if you want to work together or just chat about tech!
              </p>

              <div className="space-y-4">
                <a
                  href="https://github.com/hakoke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={24} />
                  <span>github.com/hakoke</span>
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail size={24} />
                  <span>mykamel.cs@gmail.com</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  required
                />
              </div>
              {status === 'success' && (
                <p className="text-green-400 text-center">Message sent successfully! 🎉</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-center">Failed to send. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all flex items-center justify-center gap-2 font-semibold transform hover:scale-105 shadow-lg shadow-purple-500/50"
              >
                {sending ? 'Sending...' : 'Send Message'}
                <Send size={20} />
              </button>
            </form>
          </div>

          <div className="mt-16 text-center text-gray-500">
            <p>&copy; 2025 Mohamed Kamel. Built with Next.js</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

