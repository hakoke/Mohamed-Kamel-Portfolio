export type ProjectImage = {
  url: string;
  alt: string;
  title: string;
  description: string;
};

export type ProjectCodeSnippet = {
  language: string;
  title: string;
  description?: string;
  highlights?: string[];
  code: string;
};

export type ProjectModel = {
  name: string;
  description: string;
  type: string;
};

export type ProjectHosting = {
  ai?: string;
  web?: string;
};

export type ProjectStat = {
  label: string;
  value: string;
  detail?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  gradient: string;
  gradientLight: string;
  logo: {
    type: "image" | "emoji";
    src: string;
    alt: string;
  };
  links: {
    github?: string;
    githubPrivateMessage?: string;
    demo?: string;
    website?: string;
  };
  stack: string[];
  overview: string;
  features: string[];
  challenges: string[];
  results: string;
  demoVideo?: string | null;
  models?: ProjectModel[];
  hosting?: ProjectHosting;
  images: ProjectImage[];
  codeSnippets: ProjectCodeSnippet[];
  stats?: ProjectStat[];
  heroHighlights?: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "dashboard-ai",
    title: "SafeOps PPE Detection",
    tagline: "AI-Powered Warehouse Safety & Attendance",
    summary:
      "Computer-vision platform that watches every camera feed, tracks PPE compliance, marks attendance with ArcFace, and ships alerts in real time.",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    gradientLight: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    logo: {
      type: "image",
      src: "/SafeOps.png",
      alt: "SafeOps logo",
    },
    links: {
      github: "https://github.com/hakoke/Dashboard_AI",
    },
    stack: [
      "YOLOv8",
      "OpenCV",
      "ArcFace",
      "Python",
      "Flask",
      "MongoDB",
      "ByteTrack",
      "ReID",
      "AWS",
      "Railway",
    ],
    overview:
      "SafeOps is a production-ready AI monitoring system for warehouses. It watches multiple live camera feeds, detects PPE violations, manages attendance via ArcFace, and pushes violation packets with annotated evidence to security in real time. Attendance is automatic: first detection marks entry, leaving all cameras for 5 minutes closes the shift.",
    features: [
      "Real-time PPE detection across helmets, vests, gloves, and boots using a custom YOLOv8 model",
      "Facial recognition attendance with ArcFace, powered by 3-angle employee photos and automatic entry/exit rules",
      "Cross-camera tracking with ByteTrack + ReID so employees stay identified even when they move between zones",
      "Violation dedupe engine with cool-downs and NMS-style filtering to avoid spammy alerts",
      "Actionable violation viewer with timestamp, camera, employee, violation type, and image evidence",
      "Live camera management that accepts HTTP or RTSP feeds and syncs new sources from AWS every 5 minutes",
      "Click-to-locate employee map that surfaces the latest detection camera instantly",
    ],
    challenges: [
      "Keeping latency low while ingesting multiple high-resolution camera feeds on modest GPU resources",
      "Maintaining identity persistence across cameras with ReID embeddings and custom track-id logic",
      "Deploying and supervising several AI models (YOLOv8, ArcFace, ReID) inside one streaming pipeline",
      "Balancing alert noise with accuracy using multi-layered violation filtering",
      "Coordinating AWS GPU inference with a Railway-hosted web stack and MongoDB Atlas",
    ],
    results:
      "SafeOps is running in production, pushing reliable PPE and attendance insights with high recall. Security teams now focus on the small set of verified violations instead of staring at screens all day.",
    demoVideo: "/SafeOps_Video.mp4",
    models: [
      {
        name: "ArcFace",
        description:
          "Pre-trained facial recognition for employee identification and attendance.",
        type: "Pre-trained",
      },
      {
        name: "YOLOv8",
        description:
          "Custom-trained PPE detection model running on AWS GPU inference endpoints.",
        type: "Custom Model",
      },
      {
        name: "ByteTrack",
        description:
          "Multi-object tracking to keep IDs stable across frames and camera angles.",
        type: "Algorithm",
      },
      {
        name: "ReID",
        description:
          "Person re-identification model for cross-camera tracking and location lookup.",
        type: "Model",
      },
      {
        name: "OpenCV",
        description: "Core computer-vision operations and spatial math utilities.",
        type: "Library",
      },
      {
        name: "PyTorch",
        description:
          "GPU-accelerated inference for ReID models and embedding generation.",
        type: "Framework",
      },
    ],
    hosting: {
      ai: "AWS GPU instances running the CV/AI workers",
      web: "Railway (Next.js frontend, Flask backend, MongoDB Atlas)",
    },
    images: [
      {
        url: "/safeops-dashboard.jpg",
        alt: "SafeOps Admin Dashboard",
        title: "Safety Command Center",
        description:
          "Monitor camera uptime, new violations, and real-time charts that surface hotspots by location and employee.",
      },
      {
        url: "/safeops-cameras.jpg",
        alt: "Camera Management",
        title: "Camera Control Plane",
        description:
          "Add RTSP/HTTP feeds, preview health, and let AWS poll new camera data every five minutes automatically.",
      },
      {
        url: "/safeops-employees.jpg",
        alt: "Employee Management",
        title: "ArcFace Employee Profiles",
        description:
          "Upload three-angle shots per employee so ArcFace can run high-confidence attendance and identity checks.",
      },
      {
        url: "/safeops-violations.jpg",
        alt: "Safety Violations",
        title: "Verified Violation Log",
        description:
          "Cooldown logic and deduping keep this feed meaningful—each card links to the annotated evidence image.",
      },
      {
        url: "/safeops1.jpg",
        alt: "Safety Reports Dashboard",
        title: "Reporting & Trends",
        description:
          "Time-based filtering, trend graphs, and per-location leaderboards highlight the riskiest shifts instantly.",
      },
      {
        url: "/Attendance.jpg",
        alt: "Attendance Management",
        title: "Live Attendance Ledger",
        description:
          "Automatic entry/exit logging and live duration tracking keep HR synced with what the cameras see, no manual check-ins needed.",
      },
      {
        url: "/safeops3.jpg",
        alt: "Employee Location Tracking",
        title: "Find Anyone Fast",
        description:
          "Click an employee ID to see their latest camera detection and timestamp.",
      },
      {
        url: "/SafeOpsDatabase.jpg",
        alt: "MongoDB Architecture",
        title: "Production Database Topology",
        description:
          "The system runs on ten MongoDB collections that handle attendance, violations, schedules, and all warehouse-related data.",
      },
    ],
    codeSnippets: [
      {
        language: "python",
        title: "PPE Detection with YOLOv8",
        description:
          "Custom safety classes, confidence tuning, and violation mapping run on every frame.",
        highlights: [
          "Custom YOLOv8 model for helmets, vests, gloves, and boots",
          "Frame-by-frame violation classification with confidence scoring",
          "NMS-like filtering to keep the feed clean",
        ],
        code: `# Load PPE model once during service boot
try:
    if not Path(ppe_model_path).exists():
        raise FileNotFoundError(f"PPE model not found: {ppe_model_path}")
    self.ppe_model = YOLO(ppe_model_path)
except Exception as exc:
    print(f"[ERROR] Failed to load PPE model: {exc}")
    raise

# Run detection
ppe_results = self.ppe_model(frame, conf=self.conf_threshold, verbose=False)[0]

for box in ppe_results.boxes:
    class_id = int(box.cls[0].item())
    class_name = ppe_results.names.get(class_id, f"class_{class_id}")
    confidence = float(box.conf[0].item())
    bbox = box.xyxy[0].cpu().numpy()

    violation_type = self._map_ppe_class_to_violation_type(class_name)
    if violation_type != "unknown":
        self._record_violation(
            violation_type=violation_type,
            bbox=bbox,
            confidence=confidence,
            camera_id=camera_id,
        )`,
      },
      {
        language: "python",
        title: "Employee Recognition with ArcFace",
        description:
          "Cosine similarity matching keeps attendance accurate even with imperfect lighting.",
        highlights: [
          "ArcFace initialization with GPU/CPU fallback",
          "Cosine similarity against stored embeddings",
          "Track ID mapping so identities persist during a shift",
        ],
        code: `def _recognize_face(self, person_crop: np.ndarray) -> tuple[str | None, float]:
    faces = self.face_app.get(person_crop)
    if not faces:
        return None, 0.0

    query_embedding = faces[0].embedding
    best_match_id = None
    best_similarity = 0.0

    for emp_id, db_embedding in self.employee_embeddings.items():
        similarity = np.dot(query_embedding, db_embedding) / (
            np.linalg.norm(query_embedding) * np.linalg.norm(db_embedding) + 1e-8
        )
        if similarity > best_similarity:
            best_similarity = similarity
            best_match_id = emp_id

    if best_similarity >= self.face_threshold:
        return best_match_id, best_similarity
    return None, best_similarity`,
      },
      {
        language: "python",
        title: "ByteTrack + ReID Pipeline",
        description:
          "Keeps employees identified across angles so we can follow violations throughout the warehouse.",
        highlights: [
          "ByteTrack handles intra-camera IDs",
          "ReID embeddings provide cross-camera identity",
          "GPU or CPU fallback with adaptive thresholds",
        ],
        code: `if self.enable_reid:
    reid_device = "cuda" if torch.cuda.is_available() else "cpu"
    reid_model = PersonReIDModel(device=reid_device)
    self.reid_tracker = ReIDTracker(reid_model, similarity_threshold=0.6)

if self.enable_tracking:
    person_results = self.person_model.track(
        frame,
        conf=self.conf_threshold,
        verbose=False,
        persist=True,
    )[0]

    if self.enable_reid and self.reid_tracker:
        track_ids = person_results.boxes.id.int().tolist()
        camera_id_int = hash(camera_id) if camera_id else 0

        for idx, box in enumerate(person_results.boxes.xyxy):
            if idx >= len(track_ids):
                continue
            track_id = track_ids[idx]
            x1, y1, x2, y2 = map(int, box[:4])
            person_crop = frame[y1:y2, x1:x2]

            if person_crop.size > 0:
                global_id, confidence = self.reid_tracker.update(
                    camera_id_int,
                    track_id,
                    person_crop,
                    np.array([x1, y1, x2, y2]),
                )`,
      },
    ],
    stats: [
      { label: "Cameras Online", value: "4+", detail: "multi-stream inference" },
      { label: "PPE Events Filtered", value: "217", detail: "spam-free alerts" },
      { label: "Attendance Accuracy", value: "99%", detail: "ArcFace powered" },
      { label: "Latency", value: "< 2s", detail: "AWS GPU inference" },
    ],
    heroHighlights: [
      "Realtime PPE, attendance, and violation tracking",
      "ArcFace powered identity with ByteTrack + ReID",
      "Ship-ready Mongo + AWS architecture",
    ],
    featured: true,
  },
  {
    slug: "bespoke",
    title: "Bespoke",
    tagline: "AI Platform for Architecture & Engineering Talent",
    summary:
      "Next.js 15 platform where clients chat with an AI RFP partner while resumes stream through a two-stage parsing pipeline.",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    gradientLight: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
    logo: {
      type: "image",
      src: "/bespoke/BespokeLogo-removebg-preview.png",
      alt: "Bespoke logo",
    },
    links: {
      githubPrivateMessage: "Sorry—this repo is private. Reach out and I'll walk you through it live.",
      website: "https://bespoke-ae.com/",
    },
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Prisma",
      "PostgreSQL",
      "Google Gemini",
      "AWS S3",
      "SSE",
      "JWT",
    ],
    overview:
      "Bespoke connects clients with vetted architecture and engineering talent. I built two signature AI systems: a streaming RFP copilot that switches between fast and smart Gemini models, and a resume pipeline that first extracts structured data then performs deep profiling to match services, set rates, and craft narratives.",
    features: [
      "Streaming RFP assistant with Server-Sent Events and sub-500ms first-token latency in fast mode",
      "Two-stage resume parsing: Gemini 2.0 Flash extracts structured data, Gemini 3 Pro performs deep analysis",
      "Automatic model routing that chooses between Gemini 2.0 Flash and Gemini 3 Pro per query complexity",
      "Fuzzy service catalog mapping that aligns 100+ engineering/architecture services to user inputs",
      "Rate engine that blends region, seniority, and job history to output realistic hourly recommendations",
      "Memory system with importance scoring, fast-mode context truncation, and fallback protections",
      "S3-backed resume ingestion with presigned URLs and DOCX/PDF support",
    ],
    challenges: [
      "Delivering real-time streaming UX while juggling context loading and error handling",
      "Preventing hallucinations by forcing strict JSON mode and defensive parsing",
      "Balancing cost and latency with a multi-model strategy and automatic fallbacks",
      "Designing an ergonomic services catalog that still supports fuzzy lookups and aliases",
      "Keeping database queries snappy across memory, knowledge, chat history, and profiles",
    ],
    results:
      "Resume ingestion now takes minutes, not hours. Clients can talk through complex requirements like a real PM, while AI suggests services, talent matches, and pricing in one flow. The platform is live at bespoke-ae.com with Railway hosting behind Cloudflare, the GoDaddy-managed domain, and indexing handled via Google Search Console.",
    demoVideo: "/Bespoke_Demo.mp4",
    images: [
      {
        url: "/bespoke/homepage.jpg",
        alt: "Bespoke landing page",
        title: "Guided Landing Experience",
        description:
          "Two clear entry paths—hire talent or apply as talent—plus a transparent roadmap build trust immediately.",
      },
      {
        url: "/bespoke/resume-processing.jpg",
        alt: "Resume processing pipeline",
        title: "AI Resume Builder",
        description:
          "Progressive disclosure explains each stage (Extract → Analyze → Profile) so users know what the AI is doing.",
      },
      {
        url: "/bespoke/service-catalog.jpg",
        alt: "Service catalog",
        title: "Searchable Service Catalog",
        description:
          "100+ services across Architecture, Engineering, Specialty and Project Management cateogries with filters and fuzzy search.",
      },
      {
        url: "/bespoke/talent-dashboard.jpg",
        alt: "Talent dashboard",
        title: "Talent Workspace",
        description:
          "Return users land in a personalized dashboard with action shortcuts and active engagement tracking.",
      },
      {
        url: "/bespoke/talent-profile.jpg",
        alt: "Talent profile management",
        title: "Profile Editor",
        description:
          "Profile management keeps long-form profile editing manageable and fully editable",
      },
    ],
    codeSnippets: [
      {
        language: "typescript",
        title: "Streaming AI Agent with Multi-Model Selection",
        description:
          "Routes prompts to the right Gemini model and streams tokens back over SSE.",
        highlights: [
          "Fast mode detection for greetings/startups",
          "Dynamic temperature + token limits",
          "Automatic fallback to backup models",
        ],
        code: `const fastMode = init || ["start", "services"].includes(step);
const miniModel = getFastModel();
const chatModel = fastMode ? miniModel : (env.GEMINI_MODEL || SMART_MODEL);

const stream = new ReadableStream<Uint8Array>({
  start: async (controller) => {
    const enc = new TextEncoder();
    const write = (obj: any) =>
      controller.enqueue(enc.encode(\`data: \${JSON.stringify(obj)}\\n\\n\`));

    const baseReq = {
      model: chatModel,
      messages: [{ role: "system", content: system }, ...history],
      stream: true,
      temperature: fastMode ? 0.2 : 0.4,
      max_tokens: fastMode ? 512 : 1000,
    };

    const completion = await openai.chat.completions.create(baseReq);
    for await (const part of completion as any) {
      const delta = part?.choices?.[0]?.delta;
      if (delta?.content) {
        assistantText += delta.content;
        write({ type: "text", content: delta.content });
      }
    }
  },
});`,
      },
      {
        language: "typescript",
        title: "Two-Stage Resume Processing Pipeline",
        description:
          "Stage one uses Gemini 2.0 Flash for lightning-fast extraction, stage two taps Gemini 3 Pro for reasoning-heavy profiling.",
        highlights: [
          "Stage handoff: Flash for field extraction, Pro for deep profiling",
          "Strict JSON outputs with validation",
          "Service catalog injected into the prompt",
        ],
        code: `export async function parseResume(resumeUrl: string) {
  const resumeText = await extractTextFromResume(resumeUrl);
  const flash = await callFlashStage(resumeText); // gemini-2.0-flash
  const pro = await callProStage(resumeText, flash); // gemini-3.0-pro
  return { resumeUrl, resumeText, flash, pro };
}`,
      },
      {
        language: "typescript",
        title: "Fuzzy Service Matching",
        description:
          "Maps user text to the correct service by checking aliases, regex patterns, and known service names, then normalizes and deduplicates the results.",
        highlights: [
          "Keyword + regex alias dictionary",
          "Direct lookup map for fast paths",
          "Set-based deduplication",
        ],
        code: `function mapServiceAlias(label: string): string {
  const trimmed = label.trim();
  const direct = SERVICE_NAME_LOOKUP.get(trimmed.toLowerCase());
  if (direct) return direct;

  const alias = matchServiceAlias(trimmed);
  if (alias) return alias;
  return trimmed;
}

function coerceServices(labels: string[]): string[] {
  return Array.from(
    new Set(labels.map(mapServiceAlias).map(resolveServiceName).filter(Boolean))
  );
}`,
      },
      {
        language: "typescript",
        title: "Rate Recommendation Engine",
        description:
          "Combines seniority, geography, and history to suggest realistic hourly rates.",
        highlights: [
          "Country-aware rate bands",
          "Band position math for nuance",
          "Clamp logic to keep values sane",
        ],
        code: `const band = inferRateBand(mini.seniority);
if (band) {
  const rateBands = getRateBands(inferredCountry);
  const range = rateBands[band];
  const position = computeRatePosition(band, {
    jobHistoryCount: jobHistory.length,
    seniority: mini.seniority,
    servicesCount: services.length,
  });

  const corridor = range.max - range.min;
  const conservativeTarget = range.min + Math.round(corridor * position);
  const baseValue = rateGuess?.value || conservativeTarget;
  const value = Math.min(Math.max(Math.round(baseValue), range.min), range.max);
  return {
    value,
    currency: inferredCurrency,
    rationale: \`AI recommendation at \${band} level with \${services.length} services\`,
  };
}`,
      },
    ],
    stats: [
      { label: "Resume Parsing", value: "≤ 2 min", detail: "two-stage AI" },
      { label: "Services Catalog", value: "100+", detail: "architecture & engineering" },
      { label: "Streaming Latency", value: "< 500ms", detail: "fast mode" },
      { label: "AI Models", value: "4", detail: "Flash + Pro routing" },
    ],
    heroHighlights: [
      "Live at bespoke-ae.com (Railway + Cloudflare + GoDaddy + Google Search Console)",
      "Streaming RFP assistant with multi-model routing",
      "Resume automation with strict anti-hallucination guardrails",
    ],
    featured: true,
  },
  {
    slug: "discord-ai",
    title: "ServerMate Discord AI",
    tagline: "Dual-Model Discord AI With Real Memory",
    summary:
      "A Discord bot that decides when to be lightning-fast and when to go deep, while remembering every user it meets.",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    gradientLight: "from-indigo-500/20 via-purple-500/20 to-pink-500/20",
    logo: {
      type: "image",
      src: "/Servermate/Profilepic.jpg",
      alt: "ServerMate icon",
    },
    links: {
      github: "https://github.com/hakoke/Discord_AI",
    },
    stack: [
      "Python",
      "Discord.py",
      "Google Gemini",
      "Gemini 2.0 Flash",
      "Gemini 2.5 Pro",
      "Imagen 3.0",
      "Vertex AI",
      "PostgreSQL",
      "Serper API",
      "AsyncIO",
    ],
    overview:
      "ServerMate feels alive in Discord servers. It inspects every incoming message, decides whether it needs deep reasoning or lightweight banter, and swaps between Gemini 2.0 Flash and Gemini 2.5 Pro automatically. Beyond chat, it generates images/videos, browses the web (respecting CAPTCHAs), and maintains per-user memory so conversations stay personal.",
    features: [
      "AI-driven model selection that routes casual chat to the fast model and complex prompts to the smart model",
      "Long-term memory per user and per server with transparency commands (!memory and !forget)",
      "Imagen 3.0-powered image generation plus video generation flows",
      "Vision analysis so users can drop screenshots, diagrams, or equations",
      "Web browsing with guardrails that explain CAPTCHAs instead of bypassing them",
      "Serper-powered search for real-time research",
      "Command suite covering stats, reminders, and creative tooling",
    ],
    challenges: [
      "Optimizing API costs while keeping responses instantaneous",
      "Designing a normalized Postgres schema for memory, interactions, learned behaviours, and multimedia logs",
      "Handling multi-server concurrency with AsyncIO and rate-limit friendly queues",
      "Building consistent personality while still answering technical prompts accurately",
      "Blending multimedia generation and browsing without blocking Discord event loops",
    ],
    results:
      "ServerMate runs across multiple Discord servers today, generating thousands of interactions. Users notice the personality, the recall, and the fact that it can swap from joking to debugging in one turn.",
    demoVideo: null,
    images: [
      {
        url: "/Servermate/servermate1.jpg",
        alt: "Web browsing flow",
        title: "Web Browsing & Safety",
        description:
          "ServerMate records what it sees when browsing, including the CAPTCHA that stopped this request—transparency first.",
      },
      {
        url: "/Servermate/Servermate2.jpg",
        alt: "Image generation example",
        title: "Imagen 3.0 Output",
        description:
          "A natural conversation led to a cinematic image request; the bot delivered and described the result in chat.",
      },
      {
        url: "/Servermate/Servermate3.jpg",
        alt: "Video generation example",
        title: "Video Generation",
        description:
          "ServerMate stitches short videos on demand and returns them inline without blocking other users.",
      },
      {
        url: "/Servermate/Servermate4.jpg",
        alt: "Multiple image comparison",
        title: "Comparative Reasoning",
        description:
          "It can compare multiple regions with sourced photos, writing a travel-guide style breakdown on the fly.",
      },
      {
        url: "/Servermate/servermatedatabase.jpg",
        alt: "PostgreSQL schema",
        title: "Production Database",
        description:
          "Eleven normalized tables keep memory scoped per server, track behaviours, and log multimedia jobs.",
      },
    ],
    codeSnippets: [
      {
        language: "python",
        title: "AI-Driven Model Selection",
        description:
          "Routes casual talk to Gemini Flash and tough prompts to Pro with guardrails for image queries.",
        highlights: [
          "Special-casing small talk and image searches",
          "Fast model used unless the classifier flags deep reasoning",
          "Logging choices for debugging cost/perf",
        ],
        code: `async def decide_model(message_meta: dict) -> bool:
    if wants_image_search or message_meta.get("small_talk"):
        return False  # fast model

    decision_model = get_fast_model()
    prompt = f"User message: '{message.content}'\\nDoes this need deep reasoning?"
    decision = await decision_model.generate_content(prompt)
    return "deep" in decision.text.lower()`,
      },
      {
        language: "python",
        title: "Memory Write Pipeline",
        description:
          "Stores per-user traits, mood, and preferences without blocking the event loop.",
        highlights: [
          "Async Postgres writes",
          "Importance scoring",
          "Per-server isolation",
        ],
        code: `async def remember(user_id: str, guild_id: str, memory: Memory):
    async with db.pool.acquire() as conn:
        await conn.execute(
            """
            insert into user_memory (user_id, guild_id, label, value, importance)
            values ($1, $2, $3, $4, $5)
            on conflict (user_id, guild_id, label)
            do update set value = $4, importance = greatest(user_memory.importance, $5)
            """,
            user_id,
            guild_id,
            memory.label,
            memory.value,
            memory.importance,
        )`,
      },
    ],
    stats: [
      { label: "Servers Online", value: "10+", detail: "multi-guild" },
      { label: "Memories Stored", value: "50k+", detail: "PostgreSQL" },
      { label: "Image/Video Jobs", value: "350+", detail: "Imagen 3.0 + Vertex" },
      { label: "API Savings", value: "90%", detail: "fast model routing" },
    ],
    heroHighlights: [
      "Dual-model intelligence keeps costs low",
      "Memory + personality tuned per server",
      "Imagen, video, browsing, and research in one bot",
    ],
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectSlugs = projects.map((project) => project.slug);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

