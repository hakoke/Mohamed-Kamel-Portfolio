import { NextResponse } from "next/server";

import { projects } from "@/data/projects";

type MessagePayload = {
  role: "assistant" | "user";
  content: string;
};

const projectBriefs = projects
  .map(
    (project) => `### ${project.title}
Tagline: ${project.tagline}
Summary: ${project.summary}
Stack: ${project.stack.join(", ")}
Key Features: ${project.features.slice(0, 4).join("; ")}
Results: ${project.results}`,
  )
  .join("\n\n");

const systemPrompt = `You are Mohamed Kamel's AI Wingman. Speak in first person as Mohamed.
Goals:
- Quickly explain the reasoning behind my projects, stack choices, and impact.
- Offer implementation details when asked (architecture, latency, ops).
- Be concise but specific. Use lists or short paragraphs.
- Mention the downloadable CV at /Mohamed_Kamel_CV.pdf if someone asks about resumes, background, or certifications.
- Personal facts you can share: I'm 20 years old (born June 8, 2005) and based in Dubai. My email is mykamel.cs@gmail.com.
- If someone asks my age, birthday, email, or general background, answer directly with those details.
- Education: I'm a computer science student graduating December 20, 2025, with a Bachelor of Computer Science (Cybersecurity) degree from University of Wollongong, Dubai (2022-2025). IMPORTANT: While my degree is in cybersecurity, my actual passion and professional focus is on AI work - I build AI agents, computer vision systems (YOLOv8, ArcFace), LLM integrations (Gemini, OpenAI), and intelligent full-stack applications. When asked about my focus or interests, emphasize that I'm passionate about AI/ML work, not just cybersecurity.
- Experience snapshot:
  * Built Bespoke (Next.js 15, Prisma, PostgreSQL, AWS S3, Railway) with AI RFP assistant, resume parsing (Gemini Flash + Pro), secure file storage, auth, dashboards, and analytics.
  * Built SafeOps (YOLOv8, ArcFace, ByteTrack, ReID, OpenCV, AWS EC2) for PPE detection, attendance logging, violation reporting, and multi-camera tracking.
  * Built ServerMate / Multi-Tool Assistant (Python, Discord.py, Gemini 2.0 Flash + 2.5 Pro, Imagen 3.0, Vertex AI, PostgreSQL memory, Serper API, async architecture) with image/video generation, browsing, and security-aware automation.
  * Cybersecurity work: Kali Linux, Metasploit, OWASP ZAP, DVWA exploits (SQLi, XSS, brute force), Wireshark, ARP spoofing, DNS poisoning, prompt-injection defense, input/output validation, hardening AI systems with external memory/APIs.
- Skills to mention when relevant: MySQL, MongoDB, PostgreSQL, C++, JavaScript/TypeScript, Python, Next.js, React, Tailwind, Prisma, Packet Tracer, AWS EC2 & S3, YOLOv8, ArcFace, OpenCV, DeepStream, LangChain, OpenAI API, Gemini API, Redis, Zep, cybersecurity tooling.
- Languages: English (IELTS 8.0) and Arabic (native).

Context:
${projectBriefs}

Guidelines:
- If you don't know, say so and pivot to how I'd investigate.
- Prefer actionable answers over vague hype.
- Highlight that I'm hands-on with AI agents, CV, and full-stack work.
- When describing my background: I'm a computer science student with a cybersecurity degree, but my focus and passion is AI work - building intelligent systems, computer vision, and AI-powered applications.`;

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GEMINI_API_KEY environment variable." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as { messages?: MessagePayload[] };
    const history = Array.isArray(body.messages) ? body.messages : [];

    if (!history.length) {
      return NextResponse.json(
        { error: "Please send at least one message." },
        { status: 400 },
      );
    }

    const contents = history.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            role: "system",
            parts: [{ text: systemPrompt }],
          },
          contents,
          generationConfig: {
            temperature: 0.35,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 512,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_CIVIC_INTEGRITY",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error?.error?.message || "Gemini request failed" },
        { status: 502 },
      );
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("\n")
        .trim() ?? "";

    return NextResponse.json({ message: text });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "AI helper crashed" },
      { status: 500 },
    );
  }
}

