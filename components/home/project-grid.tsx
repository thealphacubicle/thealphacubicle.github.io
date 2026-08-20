"use client";

import { ArrowUpRight } from "lucide-react";

import { ProjectVisualCanvas } from "@/components/home/project-visuals";
import { GitHubMark } from "@/components/site/social-marks";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { projects, type Project, type ProjectTag } from "@/content/projects";
import { cn, goldFocusRing } from "@/lib/utils";

function TagBadge({ tag }: { tag: ProjectTag }) {
  return (
    <HoverCard openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>
        <Badge
          variant={tag.label === "Live" ? "default" : "outline"}
          className="cursor-default"
        >
          {tag.label}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto max-w-56 px-3 py-2 text-xs leading-relaxed">
        {tag.detail}
      </HoverCardContent>
    </HoverCard>
  );
}

function GitHubAvatarLink({
  href,
  handle,
}: {
  href: string;
  handle: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${handle}. View on GitHub.`}
          className={goldFocusRing}
        >
          <Avatar
            size="lg"
            className="bg-muted text-foreground ring-2 ring-background motion-safe:transition-transform motion-safe:duration-200 hover:z-10 hover:scale-105"
          >
            <AvatarFallback className="bg-muted text-foreground">
              <GitHubMark />
            </AvatarFallback>
          </Avatar>
        </a>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="flex-col items-start gap-0.5 py-2"
      >
        <span className="font-medium">{handle}</span>
        <span className="text-[0.7rem] text-background/70">View on GitHub</span>
      </TooltipContent>
    </Tooltip>
  );
}

function LiveLink({
  href,
  label,
  featured = false,
}: {
  href: string;
  label: string;
  featured?: boolean;
}) {
  return (
    <Button variant={featured ? "gold" : "outline"} size={featured ? "lg" : "default"} asChild>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
        <ArrowUpRight data-icon="inline-end" />
      </a>
    </Button>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <HoverCard openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>
        <span className="w-fit cursor-default font-mono text-xs uppercase tracking-[0.16em] text-primary">
          {project.number}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto max-w-60 px-3 py-2 text-xs leading-relaxed">
        {project.context}
      </HoverCardContent>
    </HoverCard>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Card
      className={cn(
        "relative gap-0 py-0 ring-foreground/10 md:flex-row",
        "motion-safe:transition-[transform,box-shadow] motion-safe:duration-300",
        "hover:-translate-y-0.5 hover:ring-primary/35",
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
      />
      <ProjectVisualCanvas
        visual={project.visual}
        className="min-h-52 md:min-h-[22rem] md:w-[42%] md:shrink-0 md:self-stretch"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center py-6 md:py-8">
        <CardHeader className="gap-3">
          <ProjectMeta project={project} />
          <CardTitle className="heading text-2xl font-semibold sm:text-3xl md:text-4xl">
            {project.name}
          </CardTitle>
          {project.tagline ? (
            <CardDescription className="max-w-[42ch] text-base text-primary/90 sm:text-lg">
              {project.tagline}
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className="mt-4">
          <p className="max-w-[54ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TagBadge key={tag.label} tag={tag} />
            ))}
          </div>
          {project.link.kind === "live" ? (
            <div className="mt-8">
              <LiveLink href={project.link.href} label={project.link.label} featured />
            </div>
          ) : null}
        </CardContent>
      </div>
    </Card>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const github = project.link.kind === "github" ? project.link : null;
  const live = project.link.kind === "live" ? project.link : null;

  return (
    <Card
      className={cn(
        "h-full gap-0 py-0 ring-foreground/10",
        "motion-safe:transition-[transform,box-shadow] motion-safe:duration-300",
        "hover:-translate-y-0.5 hover:ring-primary/35",
      )}
    >
      <ProjectVisualCanvas visual={project.visual} className="h-40" />
      <CardHeader className="mt-5 gap-2">
        <ProjectMeta project={project} />
        <CardTitle className="heading text-xl font-semibold sm:text-2xl">
          {project.name}
        </CardTitle>
        {project.tagline ? (
          <CardDescription className="text-base text-primary/90">
            {project.tagline}
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="mt-3 flex-1">
        <p className="text-base leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TagBadge key={tag.label} tag={tag} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-5">
        {live ? <LiveLink href={live.href} label={live.label} /> : null}
        {github ? (
          <GitHubAvatarLink href={github.href} handle={github.handle} />
        ) : null}
      </CardFooter>
    </Card>
  );
}

export function ProjectGrid() {
  const [featured, ...rest] = projects;

  return (
    <div className="space-y-6">
      <FeaturedProjectCard project={featured} />
      <div className="grid gap-6 md:grid-cols-2">
        {rest.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
