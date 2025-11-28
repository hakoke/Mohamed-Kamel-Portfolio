"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Code,
  Cpu,
  Github,
  Image as ImageIcon,
  Play,
  Video,
  Zap,
  Cloud,
} from "lucide-react";

import type { Project } from "@/data/projects";

type Props = {
  project: Project;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function ProjectDetail({ project }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Preload adjacent images when activeImage changes
  useEffect(() => {
    if (typeof window === 'undefined' || !project.images || project.images.length <= 1) {
      return;
    }

    // Preload next and previous images
    const nextIndex = (activeImage + 1) % project.images.length;
    const prevIndex = activeImage === 0 ? project.images.length - 1 : activeImage - 1;

    [nextIndex, prevIndex].forEach((idx) => {
      const img = new window.Image();
      img.src = project.images[idx].url;
    });
  }, [activeImage, project.images]);

  // Preload all images for instant navigation
  useEffect(() => {
    if (typeof window === 'undefined' || !project.images || project.images.length === 0) {
      return;
    }

    // Preload all images aggressively using native Image API for immediate browser cache
    const imagePromises = project.images.map((image) => {
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Resolve even on error to not block
        img.src = image.url;
      });
    });

    // Also use link prefetch for Next.js optimization (only on client)
    project.images.forEach((image) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = image.url;
      document.head.appendChild(link);
    });

    // Cleanup function to remove prefetch links when component unmounts
    return () => {
      if (typeof document !== 'undefined') {
        const prefetchLinks = document.head.querySelectorAll('link[rel="prefetch"][as="image"]');
        prefetchLinks.forEach((link) => {
          if (project.images?.some((img) => link.getAttribute('href') === img.url)) {
            link.remove();
          }
        });
      }
    };
  }, [project.images]);

  const gradient = useMemo(() => project.gradient, [project.gradient]);
  const gradientLight = useMemo(
    () => project.gradientLight ?? `${project.gradient}/20`,
    [project.gradient, project.gradientLight],
  );
  const privateRepoMessage =
    project.links.githubPrivateMessage ||
    "Sorry, this repository is private. Reach out and I'll walk you through it live.";
  const logoBadge =
    project.logo?.type === "image" ? (
      <span className="relative inline-flex h-32 w-32 items-center justify-center overflow-hidden">
        <Image
          src={project.logo.src}
          alt={project.logo.alt}
          fill
          className="object-contain"
          sizes="80px"
        />
      </span>
    ) : (
      <span className="inline-flex h-32 w-32 items-center justify-center text-5xl">
        {project.logo?.src}
      </span>
    );

  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className={`absolute inset-x-0 top-[-20%] h-[60vh] blur-[140px] opacity-80 bg-gradient-to-r ${gradient}`}
        />
        <div
          className={`absolute inset-x-0 bottom-[-30%] h-[50vh] blur-[180px] opacity-60 bg-gradient-to-l ${gradientLight}`}
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-cyan-300"
          >
            <ArrowLeft size={18} />
            Back to portfolio
          </Link>

          <div className="flex items-center gap-3">
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
              >
                <Github size={16} />
                View source
                <span className="pointer-events-none absolute -bottom-10 left-1/2 z-10 -translate-x-1/2 rounded-md bg-black/80 px-3 py-1 text-xs opacity-0 transition group-hover:opacity-100">
                  View source on GitHub
                </span>
              </a>
            ) : project.links.githubPrivateMessage ? (
              <button
                type="button"
                onClick={(event) => event.preventDefault()}
                className="group relative inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/70"
              >
                <Github size={16} />
                Private repo
                <span className="pointer-events-none absolute -bottom-16 left-1/2 z-10 w-56 -translate-x-1/2 rounded-md bg-black/80 px-3 py-2 text-xs opacity-0 transition group-hover:opacity-100">
                  {privateRepoMessage}
                </span>
              </button>
            ) : null}
            <a
              href="mailto:mykamel.cs@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:opacity-90"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </header>

      <main className="px-4 pb-24 pt-24">
        <div className="mx-auto max-w-6xl space-y-16">
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12"
          >
            <div
              className={`pointer-events-none absolute inset-0 opacity-60 blur-3xl bg-gradient-to-br ${gradient}`}
            />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center gap-4">
                  {logoBadge}
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-gray-300">
                      {project.tagline}
                    </p>
                    <h1 className="text-4xl font-bold text-balance md:text-6xl">
                      {project.title}
                    </h1>
                  </div>
                </div>
                <p className="text-lg text-gray-100">{project.summary}</p>

                <div className="flex flex-wrap gap-3 pt-2">
                  {project.heroHighlights?.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-white/15 px-4 py-1 text-sm text-gray-100"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {project.stats && (
                <div className="grid flex-1 grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-white/5 p-4">
                      <p className="text-sm uppercase tracking-wide text-gray-400">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-3xl font-semibold text-white">
                        {stat.value}
                      </p>
                      {stat.detail && (
                        <p className="text-sm text-gray-400">{stat.detail}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.section>

          <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl"
            >
              <h2 className="text-3xl font-semibold">Overview</h2>
              <p className="mt-4 text-gray-300 leading-relaxed">
                {project.overview}
              </p>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl"
            >
              <h3 className="text-xl font-semibold">Stack</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 px-3 py-1 text-sm text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>
          </div>

          {project.demoVideo && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur"
            >
              <div className="mb-4 flex items-center gap-3 text-xl font-semibold">
                <Video />
                Live demo
              </div>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
                {!isVideoPlaying ? (
                  <button
                    type="button"
                    className="relative flex h-full w-full items-center justify-center"
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    <video
                      src={project.demoVideo}
                      className="absolute inset-0 h-full w-full object-cover opacity-60"
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="relative flex flex-col items-center gap-3 rounded-full bg-black/60 px-8 py-6 text-white">
                      <Play size={28} />
                      <span className="text-sm uppercase tracking-[0.3em]">
                        Watch build
                      </span>
                    </div>
                  </button>
                ) : (
                  <video
                    src={project.demoVideo}
                    className="h-full w-full"
                    controls
                    autoPlay
                    playsInline
                    onEnded={() => setIsVideoPlaying(false)}
                  />
                )}
              </div>
            </motion.section>
          )}

          {project.models && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.25}
              className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 text-2xl font-semibold">
                <Cpu />
                AI & algorithms
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {project.models.map((model) => (
                  <div
                    key={model.name}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-semibold">{model.name}</h3>
                      <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-wide text-cyan-300">
                        {model.type}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-gray-300">
                      {model.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {project.hosting && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="grid gap-6 rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl md:grid-cols-2"
            >
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/20 to-amber-500/10 p-6">
                <div className="flex items-center gap-3 text-xl font-semibold">
                  <Cloud />
                  AI infrastructure
                </div>
                <p className="mt-4 text-gray-100">{project.hosting.ai}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/20 to-pink-500/10 p-6">
                <div className="flex items-center gap-3 text-xl font-semibold">
                  <Cloud />
                  Application hosting
                </div>
                <p className="mt-4 text-gray-100">{project.hosting.web}</p>
              </div>
            </motion.section>
          )}

          {project.images.length > 0 && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.35}
              className="rounded-3xl border border-white/10 bg-black/50 p-8 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 text-2xl font-semibold">
                <ImageIcon />
                Visual tour
              </div>

              <div className="mt-6">
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={project.images[activeImage].url}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={project.images[activeImage].url}
                        alt={project.images[activeImage].alt}
                        fill
                        sizes="(min-width: 1024px) 900px, 100vw"
                        className="object-contain"
                        priority={activeImage === 0}
                        quality={85}
                        loading={activeImage === 0 ? "eager" : "lazy"}
                        unoptimized={false}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {project.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous image"
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white transition hover:bg-black/90"
                        onClick={() =>
                          setActiveImage((prev) =>
                            prev === 0 ? project.images.length - 1 : prev - 1,
                          )
                        }
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <button
                        type="button"
                        aria-label="Next image"
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white transition hover:bg-black/90"
                        onClick={() =>
                          setActiveImage((prev) =>
                            prev === project.images.length - 1 ? 0 : prev + 1,
                          )
                        }
                      >
                        <ArrowRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-xl font-semibold">
                    {project.images[activeImage].title}
                  </h3>
                  <p className="mt-2 text-gray-300">
                    {project.images[activeImage].description}
                  </p>
                </div>

                {project.images.length > 1 && (
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {project.images.map((image, idx) => (
                      <button
                        type="button"
                        key={image.title}
                        onClick={() => setActiveImage(idx)}
                        className={`h-2 w-8 rounded-full transition ${
                          idx === activeImage
                            ? "bg-gradient-to-r from-pink-500 to-cyan-500"
                            : "bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {project.codeSnippets.length > 0 && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="rounded-3xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 text-2xl font-semibold">
                <Code />
                Code highlights
              </div>

              <div className="mt-6 space-y-6">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-black">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={project.codeSnippets[activeSnippet].title}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.4 }}
                      className="p-6"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                            {project.codeSnippets[activeSnippet].language}
                          </p>
                          <h3 className="text-2xl font-semibold">
                            {project.codeSnippets[activeSnippet].title}
                          </h3>
                        </div>
                      </div>
                      {project.codeSnippets[activeSnippet].description && (
                        <p className="mt-3 text-gray-300">
                          {project.codeSnippets[activeSnippet].description}
                        </p>
                      )}

                      <pre className="mt-4 max-h-[420px] overflow-auto rounded-2xl border border-white/5 bg-black/70 p-4 text-sm text-green-300">
                        <code>
                          {project.codeSnippets[activeSnippet].code.trim()}
                        </code>
                      </pre>
                    </motion.div>
                  </AnimatePresence>

                  {project.codeSnippets.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous snippet"
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                        onClick={() =>
                          setActiveSnippet((prev) =>
                            prev === 0
                              ? project.codeSnippets.length - 1
                              : prev - 1,
                          )
                        }
                      >
                        <ArrowLeft size={18} />
                      </button>
                      <button
                        type="button"
                        aria-label="Next snippet"
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                        onClick={() =>
                          setActiveSnippet((prev) =>
                            prev === project.codeSnippets.length - 1
                              ? 0
                              : prev + 1,
                          )
                        }
                      >
                        <ArrowRight size={18} />
                      </button>
                    </>
                  )}
                </div>

                {project.codeSnippets[activeSnippet].highlights && (
                  <ul className="grid gap-3 md:grid-cols-2">
                    {project.codeSnippets[activeSnippet].highlights!.map(
                      (highlight) => (
                        <li
                          key={highlight}
                          className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200"
                        >
                          {highlight}
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </div>
            </motion.section>
          )}

          {project.features.length > 0 && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.45}
              className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 text-2xl font-semibold">
                <Zap />
                Key outcomes
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-gray-200"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {project.challenges.length > 0 && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="rounded-3xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl"
            >
              <h2 className="text-3xl font-semibold">Challenges tackled</h2>
              <ul className="mt-6 space-y-4 text-gray-200">
                {project.challenges.map((challenge) => (
                  <li
                    key={challenge}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    {challenge}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {project.results && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={0.55}
              className={`rounded-3xl border border-white/20 bg-gradient-to-br ${gradientLight} p-8 backdrop-blur-xl`}
            >
              <h2 className="text-3xl font-semibold">Impact</h2>
              <p className="mt-4 text-lg text-gray-100">{project.results}</p>
            </motion.section>
          )}
        </div>
      </main>
    </div>
  );
}

