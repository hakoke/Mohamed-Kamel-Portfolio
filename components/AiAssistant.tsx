"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  Download,
  Loader2,
  Send,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const introMessage: ChatMessage = {
  id: "intro",
  role: "assistant",
  content:
    "Hey, I'm MK's AI Wingman powered by Gemini 2.0 Flash. Ask me about my builds, dev process, or how I'd tackle your project. I answer in plain English but come armed with architecture details.",
};

const quickPrompts = [
  "Give me the TL;DR of SafeOps in under 5 bullets.",
  "How does the Bespoke resume pipeline keep latency low?",
  "What AI stack do you use for ServerMate and why?",
];

export default function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([introMessage]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = chatScrollRef.current;
    if (!node) return;
    node.scrollTo({
      top: node.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  const handleSend = async (prompt?: string) => {
    const text = (prompt ?? input).trim();
    if (!text || isThinking) return;

    const outgoing: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, outgoing]);
    setInput("");
    setIsThinking(true);

    try {
      const res = await fetch("/api/ai-helper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, outgoing].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to reach AI helper");
      }

      const reply = data?.message?.trim();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            reply ||
            "I hit a snag reaching Gemini. Try again and I'll pick it right up.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            error instanceof Error
              ? `Wingman error: ${error.message}`
              : "Whoops—Gemini didn't respond in time. Give it another shot in a few seconds.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <section
      id="ai"
      className="relative overflow-hidden bg-gradient-to-b from-transparent via-indigo-900/20 to-transparent py-24 px-4"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-12 h-64 w-64 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.3fr,1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gray-200">
            <Sparkles size={14} />
            AI WINGMAN
          </div>
          <h2 className="mt-4 text-4xl font-semibold text-white">
            Ask anything about my builds, stack, or thought process.
          </h2>
          <p className="mt-4 text-gray-200">
            Gemini 2.0 Flash has real context on my flagship projects,
            architecture diagrams, CV, and problem-solving style. Treat it like
            a personal demo teammate—you can drill into safety systems, resume
            automation, Discord bots, or the way I approach new AI briefs.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldCheck size={18} className="text-cyan-300" />
                Context aware replies
              </div>
              <p className="mt-2 text-sm text-gray-300">
                Knows my stack, timelines, and metrics pulled straight from this
                repo—so answers don&apos;t sound generic.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Zap size={18} className="text-pink-300" />
                Gemini 2.0 Flash
              </div>
              <p className="mt-2 text-sm text-gray-300">
                Ultra-low latency model with a temperature tuned for clear,
                grounded responses (no fluff, no hallucinations).
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">
              Jump-start prompts
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-black/50 p-4 text-sm text-gray-300">
            <Bot size={20} className="text-cyan-300" />
            <span>
              Need the PDF?{" "}
              <Link
                href="/Mohamed_Kamel_CV.pdf"
                className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline"
              >
                Download my CV <Download size={16} />
              </Link>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur-2xl"
        >
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">
            Live chat
            <span className="rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 px-2 py-0.5 text-xs text-white">
              beta
            </span>
          </div>
          <div className="mt-4 flex flex-1 flex-col">
            <div
              ref={chatScrollRef}
              className="h-[420px] overflow-y-auto pr-2 sm:h-[520px]"
            >
              <div className="flex h-full flex-col justify-end gap-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === "assistant"
                          ? "bg-white/10 text-gray-100"
                          : "bg-gradient-to-r from-pink-500 to-cyan-500 text-white"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Drafting response…
                  </div>
                )}
              </div>
            </div>

            <form
              className="mt-4 flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-2"
              onSubmit={(event) => {
                event.preventDefault();
                handleSend();
              }}
            >
              <textarea
                rows={2}
                placeholder="Ask how I designed SafeOps, tuned Bespoke, or scaled ServerMate..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                className="w-full resize-none bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isThinking}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isThinking ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send size={18} />}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

