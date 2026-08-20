"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GitHubMark } from "@/components/site/social-marks";
import { socialLinks, type ContentLink } from "@/content/profile";
import { goldFocusRing } from "@/lib/utils";

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12M7.12 20.45H3.56V9h3.56zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0" />
    </svg>
  );
}

function MediumMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

function WyzantMark() {
  return (
    <span aria-hidden="true" className="font-manrope text-[0.65rem] font-semibold tracking-tight">
      W
    </span>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return <LinkedInMark />;
  }
  if (label === "GitHub") {
    return <GitHubMark />;
  }
  if (label === "Medium") {
    return <MediumMark />;
  }
  return <WyzantMark />;
}

function SocialAvatar({ link }: { link: ContentLink }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.handle}. Official ${link.label} page.`}
          className={goldFocusRing}
        >
          <Avatar
            size="lg"
            className="bg-muted text-foreground ring-2 ring-background motion-safe:transition-transform motion-safe:duration-200 hover:z-10 hover:scale-105"
          >
            <AvatarFallback className="bg-muted text-foreground">
              <SocialIcon label={link.label} />
            </AvatarFallback>
          </Avatar>
        </a>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="flex-col items-start gap-0.5 py-2"
      >
        <span className="font-medium">{link.handle}</span>
        <span className="text-[0.7rem] text-background/70">
          Official {link.label} page.
        </span>
      </TooltipContent>
    </Tooltip>
  );
}

export function ConnectAvatars() {
  return (
    <AvatarGroup className="-space-x-3">
      {socialLinks.map((link) => (
        <SocialAvatar key={link.href} link={link} />
      ))}
    </AvatarGroup>
  );
}
