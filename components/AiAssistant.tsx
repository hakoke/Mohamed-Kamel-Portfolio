"use client";

import React, { useEffect, useRef, useState } from "react";
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

// Helper function to render message with markdown formatting and CV links
// Handles: line breaks, bullet points, bold, italic, and CV links
function renderMessageWithLinks(content: string) {
  // First, handle CV links by replacing them with placeholders
  const cvPlaceholders: Array<{ placeholder: string; element: JSX.Element }> = [];
  let linkIndex = 0;
  
  const cvPatterns = [
    // Markdown links: [text](/Mohamed_Kamel_CV.pdf)
    {
      pattern: /\[([^\]]*)\]\(\/?Mohamed[_\s\\]*Kamel[_\s\\]*CV[_\s\\]*\.pdf\)/gi,
      isMarkdown: true,
    },
    // Full file path references
    {
      pattern: /\/?Mohamed[_\s\\]*Kamel[_\s\\]*CV[_\s\\]*\.pdf/gi,
      isMarkdown: false,
    },
    // Full name with file context
    {
      pattern: /Mohamed[_\s\\]*Kamel[_\s\\]*CV(?=\s+(?:at|here|below|above|file|PDF|pdf|downloadable|available|link|download|document|is\s+available|can\s+be|will\s+be)|$)/gi,
      isMarkdown: false,
    },
  ];

  let processedContent = content;
  const matches: Array<{ start: number; end: number; isMarkdown: boolean; linkText?: string; matchedText: string }> = [];

  // Collect all CV matches
  cvPatterns.forEach(({ pattern, isMarkdown }) => {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const linkText = isMarkdown ? match[1] : undefined;
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        isMarkdown,
        linkText,
        matchedText: match[0],
      });
    }
  });

  // Sort and remove overlaps
  matches.sort((a, b) => a.start - b.start);
  const nonOverlappingMatches: typeof matches = [];
  for (const match of matches) {
    const overlaps = nonOverlappingMatches.some(
      (existing) => !(match.end <= existing.start || match.start >= existing.end)
    );
    if (!overlaps) {
      nonOverlappingMatches.push(match);
    }
  }

  // Replace CV links with placeholders (process from end to start to preserve indices)
  for (let i = nonOverlappingMatches.length - 1; i >= 0; i--) {
    const match = nonOverlappingMatches[i];
    const placeholder = `__CV_LINK_${linkIndex}__`;
    const displayText = match.isMarkdown && match.linkText 
      ? match.linkText.trim() || "CV"
      : "Mohamed_Kamel_CV";
    
    cvPlaceholders.push({
      placeholder,
      element: (
        <a
          key={`cv-link-${linkIndex}`}
          href="/Mohamed_Kamel_CV.pdf"
          download
          className="inline-flex items-center gap-1 font-semibold text-cyan-400 underline underline-offset-2 hover:text-cyan-300 transition-colors"
        >
          {displayText}
          <Download size={14} className="inline" />
        </a>
      ),
    });
    
    processedContent = 
      processedContent.slice(0, match.start) + 
      placeholder + 
      processedContent.slice(match.end);
    linkIndex++;
  }

  // Now process markdown formatting
  return renderMarkdown(processedContent, cvPlaceholders);
}

// Helper function to render markdown formatting
function renderMarkdown(
  content: string,
  cvPlaceholders: Array<{ placeholder: string; element: JSX.Element }>
): JSX.Element {
  const parts: (string | JSX.Element)[] = [];
  
  // Split by double newlines for paragraphs
  const paragraphs = content.split(/\n\n+/);
  
  paragraphs.forEach((paragraph, paraIndex) => {
    if (paraIndex > 0) {
      parts.push(<br key={`para-break-${paraIndex}`} />);
      parts.push(<br key={`para-break-${paraIndex}-2`} />);
    }
    
    // Check if this is a bullet list
    const lines = paragraph.split('\n');
    const isBulletList = lines.some(line => /^[\s]*[-*]\s+/.test(line.trim()));
    
    if (isBulletList) {
      // Process as bullet list
      lines.forEach((line, lineIndex) => {
        const bulletMatch = line.match(/^[\s]*[-*]\s+(.+)$/);
        if (bulletMatch) {
          const bulletContent = bulletMatch[1];
          const formatted = formatInlineMarkdown(bulletContent, cvPlaceholders);
          parts.push(
            <div key={`bullet-${paraIndex}-${lineIndex}`} className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>{formatted}</span>
            </div>
          );
        } else if (line.trim()) {
          // Regular line within paragraph
          const formatted = formatInlineMarkdown(line, cvPlaceholders);
          parts.push(<div key={`line-${paraIndex}-${lineIndex}`}>{formatted}</div>);
        }
      });
    } else {
      // Regular paragraph - process inline markdown
      const formatted = formatInlineMarkdown(paragraph, cvPlaceholders);
      parts.push(<div key={`para-${paraIndex}`}>{formatted}</div>);
    }
  });
  
  return <>{parts}</>;
}

// Helper function to format inline markdown (bold, italic, CV placeholders)
function formatInlineMarkdown(
  text: string,
  cvPlaceholders: Array<{ placeholder: string; element: JSX.Element }>
): (string | JSX.Element)[] {
  // Find all placeholder positions
  const placeholderPositions: Array<{ start: number; end: number; element: JSX.Element }> = [];
  cvPlaceholders.forEach(({ placeholder, element }) => {
    let searchIndex = 0;
    while (true) {
      const index = text.indexOf(placeholder, searchIndex);
      if (index === -1) break;
      placeholderPositions.push({
        start: index,
        end: index + placeholder.length,
        element,
      });
      searchIndex = index + 1;
    }
  });
  
  // Sort by position
  placeholderPositions.sort((a, b) => a.start - b.start);
  
  // Remove overlaps (keep first)
  const nonOverlapping: typeof placeholderPositions = [];
  for (const pos of placeholderPositions) {
    const overlaps = nonOverlapping.some(
      (existing) => !(pos.end <= existing.start || pos.start >= existing.end)
    );
    if (!overlaps) {
      nonOverlapping.push(pos);
    }
  }
  
  // Build result by processing text segments and placeholders
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let keyIndex = 0;
  
  nonOverlapping.forEach((pos) => {
    // Add text before placeholder (with formatting)
    if (pos.start > lastIndex) {
      const before = text.slice(lastIndex, pos.start);
      parts.push(...formatBoldItalic(before, keyIndex));
      keyIndex += before.length;
    }
    // Add placeholder element
    parts.push(React.cloneElement(pos.element, { key: `cv-${keyIndex++}` }));
    lastIndex = pos.end;
  });
  
  // Add remaining text (with formatting)
  if (lastIndex < text.length) {
    const remaining = text.slice(lastIndex);
    parts.push(...formatBoldItalic(remaining, keyIndex));
  }
  
  return parts.length > 0 ? parts : formatBoldItalic(text, 0);
}

// Helper function to format bold, italic, and URLs
function formatBoldItalic(text: string, startKey: number): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  let keyIndex = startKey;

  const matches: Array<{
    start: number;
    end: number;
    type: "email" | "url" | "bold" | "italic";
    value?: string;
    content?: string;
    priority: number;
  }> = [];

  const emailRegex =
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?=[\s.,;:!?)\]}]|$)/gi;
  let match: RegExpExecArray | null = null;
  emailRegex.lastIndex = 0;
  while ((match = emailRegex.exec(text)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      type: "email",
      value: match[0],
      priority: 0,
    });
  }

  const urlRegex =
    /(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+)/gi;
  urlRegex.lastIndex = 0;
  while ((match = urlRegex.exec(text)) !== null) {
    const rawUrl = match[0];
    const cleanedUrl = rawUrl.replace(/[.,;:!?)\]}]+$/, "");
    const trimmedLength = rawUrl.length - cleanedUrl.length;
    const endIndex = match.index + cleanedUrl.length;
    if (!cleanedUrl) {
      continue;
    }

    matches.push({
      start: match.index,
      end: endIndex,
      type: "url",
      value: cleanedUrl,
      priority: 1,
    });
  }

  const bareDomainRegex =
    /(?<!@)\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s<>"']*)?/gi;
  const allowedBareDomains = ["bespoke-ae.com"];
  bareDomainRegex.lastIndex = 0;
  while ((match = bareDomainRegex.exec(text)) !== null) {
    const rawDomain = match[0];
    if (/^(https?:\/\/|www\.)/i.test(rawDomain)) {
      continue;
    }
    const cleanedDomain = rawDomain.replace(/[.,;:!?)\]}]+$/, "");
    const lowerDomain = cleanedDomain.toLowerCase();
    if (!cleanedDomain || !allowedBareDomains.includes(lowerDomain)) {
      continue;
    }
    matches.push({
      start: match.index,
      end: match.index + cleanedDomain.length,
      type: "url",
      value: `https://${lowerDomain}`,
      priority: 1,
    });
  }

  const patterns = [
    {
      type: "bold" as const,
      regex: /\*\*([^*]+)\*\*/g,
      component: (content: string, key: number) => (
        <strong key={key}>{content}</strong>
      ),
    },
    {
      type: "italic" as const,
      regex: /\*([^*]+)\*/g,
      component: (content: string, key: number) => (
        <em key={key}>{content}</em>
      ),
    },
  ];

  patterns.forEach(({ regex, type }, typeIndex) => {
    regex.lastIndex = 0;
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        type,
        content: match[1],
        priority: type === "bold" ? 2 : 3,
      });
    }
  });

  matches.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return a.priority - b.priority;
  });

  const nonOverlapping: typeof matches = [];
  for (const current of matches) {
    const overlaps = nonOverlapping.some(
      (existing) =>
        !(current.end <= existing.start || current.start >= existing.end),
    );
    if (!overlaps) {
      nonOverlapping.push(current);
    }
  }

  let lastIndex = 0;
  nonOverlapping.forEach((current) => {
    if (current.start > lastIndex) {
      parts.push(text.slice(lastIndex, current.start));
    }

    if (current.type === "email" && current.value) {
      parts.push(
        <a
          key={`email-${keyIndex++}`}
          href={`mailto:${current.value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
        >
          {current.value}
        </a>,
      );
    } else if (current.type === "url" && current.value) {
      const href = current.value.startsWith("www.")
        ? `https://${current.value}`
        : current.value;
      parts.push(
        <a
          key={`url-${keyIndex++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
        >
          {current.value}
        </a>,
      );
    } else if (current.content) {
      const Component =
        current.type === "bold" ? patterns[0].component : patterns[1].component;
      parts.push(Component(current.content, keyIndex++));
    }

    lastIndex = current.end;
  });

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

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
      className="relative overflow-hidden bg-gradient-to-b from-transparent via-indigo-900/20 to-transparent py-24 px-4 scroll-mt-28 sm:scroll-mt-32"
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
            Gemini 2.0 Flash has real context on my projects,
            diagrams, CV, and how I solve problems. Think of it as a teammate that knows my work.
            you can ask about SafeOps, Bespoke, ServerMate, or how I approach new AI challenges.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldCheck size={18} className="text-cyan-300" />
                Context aware replies
              </div>
              <p className="mt-2 text-sm text-gray-300">
                It gives context aware replies based on this repo, so the answers don’t feel generic.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Zap size={18} className="text-pink-300" />
                Gemini 2.0 Flash
              </div>
              <p className="mt-2 text-sm text-gray-300">
                It runs on Gemini 2.0 Flash, a low-latency model tuned for clear, 
                grounded responses without fluff or hallucinations.
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
              <a
                href="/Mohamed_Kamel_CV.pdf"
                download
                className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline"
              >
                Download my CV <Download size={16} />
              </a>
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
          <div className="mt-4 flex flex-1 flex-col min-h-[460px] max-h-[520px] sm:min-h-[520px] sm:max-h-[560px]">
            <div
              ref={chatScrollRef}
              className="flex-1 space-y-4 overflow-y-auto pr-2"
            >
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
                    {message.role === "assistant"
                      ? renderMessageWithLinks(message.content)
                      : message.content}
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

