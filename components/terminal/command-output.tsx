"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { GitHubMark } from "@/components/site/social-marks";
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
  bkgText,
  commandNotFoundHint,
  commands,
} from "@/content/commands";
import { projects, type Project } from "@/content/projects";
import { expertise } from "@/content/skills";
import { cn, goldFocusRing } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export type TerminalBody =
  | { kind: "projects" }
  | { kind: "skills" }
  | { kind: "help"; hint?: string }
  | { kind: "bkg" }
  | { kind: "error"; text: string };

export type TerminalEntry = {
  id: number;
  prompt?: string;
  body: TerminalBody;
};

function FadeIn({
  children,
  index,
  className,
}: {
  children: ReactNode;
  index: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.32, delay: index * 0.07, ease }}
    >
      {children}
    </motion.div>
  );
}

function TerminalCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card
      size="sm"
      className={cn(
        "min-w-0 bg-muted/40 font-sans ring-foreground/8",
        className,
      )}
    >
      {children}
    </Card>
  );
}

function linkLabel(project: Project): string {
  if (project.link.kind === "github") {
    return project.link.handle;
  }

  try {
    return new URL(project.link.href).host;
  } catch {
    return project.link.label;
  }
}

function ProjectOutputCard({ project }: { project: Project }) {
  const github = project.link.kind === "github";

  return (
    <TerminalCard>
      <CardHeader className="gap-1">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-primary">
          {project.number}
        </span>
        <CardTitle className="heading text-[0.95rem] leading-snug">
          {project.name}
        </CardTitle>
        {project.tagline ? (
          <CardDescription className="text-pretty text-xs leading-relaxed text-primary/85">
            {project.tagline}
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="mt-2">
        <p className="text-pretty text-xs leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <Badge key={tag.label} variant="outline" className="font-sans">
              {tag.label}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-3 font-sans">
        <Button variant="link" size="xs" className="h-auto px-0" asChild>
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={goldFocusRing}
          >
            {github ? <GitHubMark className="size-3" /> : null}
            {linkLabel(project)}
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
      </CardFooter>
    </TerminalCard>
  );
}

function renderBody(body: TerminalBody): ReactNode {
  switch (body.kind) {
    case "projects":
      return (
        <div className="space-y-2">
          {projects.map((project, index) => (
            <FadeIn key={project.id} index={index}>
              <ProjectOutputCard project={project} />
            </FadeIn>
          ))}
        </div>
      );
    case "skills":
      return (
        <div className="space-y-2">
          {expertise.map((group, index) => (
            <FadeIn key={group.category} index={index}>
              <TerminalCard>
                <CardHeader>
                  <CardTitle className="heading text-sm">
                    {group.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-2">
                  <div className="flex flex-wrap gap-1">
                    {group.items.map((item) => (
                      <Badge key={item} variant="outline" className="font-sans">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </TerminalCard>
            </FadeIn>
          ))}
        </div>
      );
    case "help":
      return (
        <FadeIn index={0}>
          <TerminalCard>
            {body.hint ? (
              <CardHeader className="border-b pb-2">
                <CardDescription className="font-mono text-xs text-primary">
                  {body.hint}
                </CardDescription>
              </CardHeader>
            ) : null}
            <CardContent className={body.hint ? "pt-2" : undefined}>
              <ul className="divide-y divide-border">
                {commands.map((command) => (
                  <li
                    key={command.name}
                    className="flex items-baseline justify-between gap-3 py-2 first:pt-0 last:pb-0"
                  >
                    <span className="shrink-0 font-mono text-xs text-foreground">
                      {command.usage}
                    </span>
                    <span className="text-right text-xs leading-relaxed text-muted-foreground">
                      {command.description}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </TerminalCard>
        </FadeIn>
      );
    case "bkg":
      return (
        <FadeIn index={0}>
          <TerminalCard>
            <CardContent>
              <p className="text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {bkgText}
              </p>
            </CardContent>
          </TerminalCard>
        </FadeIn>
      );
    case "error":
      return (
        <FadeIn index={0}>
          <TerminalCard>
            <CardContent className="space-y-1">
              <p className="font-mono text-xs text-foreground">{body.text}</p>
              <p className="text-xs text-muted-foreground">{commandNotFoundHint}</p>
            </CardContent>
          </TerminalCard>
        </FadeIn>
      );
  }
}

export function CommandOutput({ entries }: { entries: TerminalEntry[] }) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div
      data-lenis-prevent=""
      data-lenis-prevent-wheel=""
      className="min-h-0 max-h-[min(24rem,50svh)] flex-1 overflow-x-hidden overflow-y-auto overscroll-contain border-b border-border px-3 py-3 [scrollbar-gutter:stable]"
    >
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-2.5">
            {entry.prompt ? (
              <p className="font-mono text-[0.8rem] text-foreground">
                <span className="text-primary">$ </span>
                {entry.prompt}
              </p>
            ) : null}
            {renderBody(entry.body)}
          </div>
        ))}
      </div>
    </div>
  );
}
