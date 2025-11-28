"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

import { featuredProjects } from "@/data/projects";

// CSS for GitHub icon hover tooltip isolation
const githubIconStyles = `
  .github-wrapper {
    isolation: isolate;
  }
  .github-wrapper:hover .github-tooltip {
    opacity: 1 !important;
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: idx * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const cards = useMemo(() => featuredProjects, []);
  const handlePrivateRepoClick = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
      <style>{githubIconStyles}</style>
      <section
        id="projects"
        ref={sectionRef}
        className="relative overflow-hidden bg-gradient-to-b from-transparent via-purple-900/10 to-transparent py-24 px-4 scroll-mt-28 sm:scroll-mt-32"
      >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-pink-500/10 to-rose-500/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-gray-400"
        >
          Selected Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-balance text-4xl font-bold md:text-6xl"
        >
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Production AI, full-stack craft,
          </span>
          <br className="hidden md:block" />
          and everything in between.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-3xl text-lg text-gray-300"
        >
          I like to work on projects that involve real people and real problems. 
          Each one of these pushed me to learn something new and build something that actually works in the real world.
        </motion.p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((project, idx) => (
          <motion.article
            key={project.slug}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={idx}
            className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-purple-500/20"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="flex h-full flex-col gap-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  {project.logo.type === "image" ? (
                    <span className="relative inline-flex h-32 w-32 items-center justify-center overflow-hidden">
                      <Image
                        src={project.logo.src}
                        alt={project.logo.alt}
                        fill
                        className="object-contain"
                        sizes="128px"
                        priority={idx === 0}
                      />
                    </span>
                  ) : (
                    <span className="inline-flex h-32 w-32 items-center justify-center text-5xl">
                      {project.logo.src}
                    </span>
                  )}
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                      {project.tagline}
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>
                {project.links.github ? (
                  <div
                    className="relative github-wrapper"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-gray-400 transition-colors hover:text-white"
                    >
                      <Github size={22} />
                    </a>
                    <span className="github-tooltip pointer-events-none absolute -bottom-9 left-1/2 z-10 w-max -translate-x-1/2 rounded-md bg-black/80 px-2.5 py-1 text-xs text-white opacity-0 transition">
                      View source
                    </span>
                  </div>
                ) : project.links.githubPrivateMessage ? (
                  <div className="relative github-wrapper">
                    <button
                      type="button"
                      onClick={handlePrivateRepoClick}
                      className="inline-flex text-gray-500 transition-colors hover:text-white"
                    >
                      <Github size={22} />
                    </button>
                    <span className="github-tooltip pointer-events-none absolute -bottom-14 left-1/2 z-10 w-48 -translate-x-1/2 rounded-md bg-black/80 px-3 py-2 text-xs text-white opacity-0 transition">
                      {project.links.githubPrivateMessage}
                    </span>
                  </div>
                ) : null}
              </div>

              <p className="flex-1 text-left text-gray-300">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-2 text-left">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                    +{project.stack.length - 4} more
                  </span>
                )}
              </div>

              {project.heroHighlights && (
                <ul className="space-y-2 text-left text-sm text-gray-400">
                  {project.heroHighlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-center justify-between pt-4 text-sm font-semibold text-white/80">
                <span className="inline-flex items-center gap-2">
                  Explore case study
                </span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all group-hover:translate-x-1 group-hover:bg-white/20">
                  <ArrowRight size={18} />
                </span>
              </div>

              <div
                className={`pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 blur-3xl transition duration-500 group-hover:opacity-100 bg-gradient-to-br ${project.gradient}`}
              />
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
    </>
  );
}
