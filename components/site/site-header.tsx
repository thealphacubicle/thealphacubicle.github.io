"use client";

import { useEffect, useState } from "react";

import { CommandHintButton } from "@/components/site/command-hint-button";
import { name, navItems } from "@/content/profile";
import { cn, goldFocusRing } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b motion-safe:transition-[background-color,border-color,backdrop-filter] motion-safe:duration-300",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-6">
        <a href="#top" className={cn("heading text-base tracking-tight", goldFocusRing)}>
          {name}
        </a>

        <nav aria-label="Primary" className="flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className={cn(
                "hidden font-manrope text-sm font-medium tracking-tight text-muted-foreground motion-safe:transition-colors hover:text-foreground md:inline",
                goldFocusRing,
              )}
            >
              {item.name}
            </a>
          ))}
          <CommandHintButton />
        </nav>
      </div>
    </header>
  );
}
