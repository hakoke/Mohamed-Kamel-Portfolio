import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectDetail from "@/components/projects/ProjectDetail";
import { getProjectBySlug, projectSlugs } from "@/data/projects";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: "Project · Mohamed Kamel",
      description: "Projects by Mohamed Kamel.",
    };
  }

  const description = project.summary || project.overview.slice(0, 160);
    
    return {
    title: `${project.title} · Mohamed Kamel`,
    description,
    openGraph: {
      title: `${project.title} · Mohamed Kamel`,
      description,
      images: project.images.length
        ? [
            {
              url: project.images[0].url,
              alt: project.images[0].alt,
            },
          ]
        : undefined,
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}

