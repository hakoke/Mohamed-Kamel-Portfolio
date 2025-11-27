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

Context:
${projectBriefs}

Guidelines:
- If you don't know, say so and pivot to how I'd investigate.
- Prefer actionable answers over vague hype.
- Highlight that I'm hands-on with AI agents, CV, and full-stack work.`;

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

