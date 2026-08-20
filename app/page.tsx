import Image from "next/image";

import { ConnectAvatars } from "@/components/home/connect-avatars";
import { ProjectGrid } from "@/components/home/project-grid";
import { WorkList } from "@/components/home/work-list";
import { CommandHintCallout } from "@/components/site/command-hint-button";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import {
  aboutCopy,
  aboutHeading,
  aboutPlaceholder,
  connectHeading,
  name,
  title,
} from "@/content/profile";
import { workHeading } from "@/content/experience";
import { projectsHeading } from "@/content/projects";

export default function HomePage() {
  const { lead, rest } = aboutCopy(aboutPlaceholder);

  return (
    <main>
      <Section
        id="top"
        className="relative overflow-hidden"
        innerClassName="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center py-28 md:py-36"
      >
        <Image
          src="/logo.png"
          alt=""
          width={640}
          height={640}
          priority
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-0 z-0 w-32 max-w-none -translate-y-1/2 select-none opacity-[0.1] invert sm:w-48 md:w-64 lg:w-80"
        />
        <div className="stagger-container relative z-10">
          <div className="stagger-item stagger-delay-1">
            <h1 className="display-name max-w-5xl text-balance text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              {name}
            </h1>
          </div>
          <div className="stagger-item stagger-delay-2">
            <p className="mt-6 font-mono text-xl tracking-tight text-muted-foreground sm:text-2xl md:text-3xl">
              {title}
            </p>
          </div>
          <div className="stagger-item stagger-delay-3 mt-10">
            <CommandHintCallout />
          </div>
        </div>
      </Section>

      <Section id="work" className="border-t border-border">
        <Reveal>
          <h2 className="heading text-4xl sm:text-5xl md:text-6xl">{workHeading}</h2>
          <div className="mt-12">
            <WorkList />
          </div>
        </Reveal>
      </Section>

      <Section id="projects" className="border-t border-border">
        <Reveal>
          <h2 className="heading text-4xl sm:text-5xl md:text-6xl">{projectsHeading}</h2>
          <div className="mt-12">
            <ProjectGrid />
          </div>
        </Reveal>
      </Section>

      <Section id="about" className="border-t border-border">
        <Reveal>
          <h2 className="heading text-4xl sm:text-5xl md:text-6xl">{aboutHeading}</h2>
          <div className="mt-8 max-w-[62ch] space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>{lead}</p>
            {rest ? <p>{rest}</p> : null}
          </div>
        </Reveal>
      </Section>

      <Section id="connect" className="border-t border-border">
        <Reveal>
          <h2 className="heading text-3xl sm:text-4xl">{connectHeading}</h2>
          <div className="mt-10">
            <ConnectAvatars />
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
