"use client";

import {
  commandHint,
  commandHintAria,
  commandHintPrefix,
  commandHintSuffix,
} from "@/content/profile";
import { toggleCommandTerminal } from "@/lib/command-terminal";
import { cn, goldFocusRing } from "@/lib/utils";

function Keycap({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "lg";
}) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-muted font-mono font-medium tracking-[0.12em] text-foreground",
        size === "lg"
          ? "rounded-lg px-2.5 py-1 text-base sm:text-lg"
          : "px-1.5 py-0.5 text-[0.65rem]",
        className,
      )}
    >
      {commandHint}
    </kbd>
  );
}

export function CommandHintButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => toggleCommandTerminal()}
      aria-label={commandHintAria}
      className={cn(
        "inline-flex items-center text-muted-foreground hover:text-foreground",
        goldFocusRing,
        className,
      )}
    >
      <Keycap />
    </button>
  );
}

export function CommandHintCallout({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => toggleCommandTerminal()}
      aria-label={commandHintAria}
      className={cn(
        "inline-flex items-center gap-3 text-base text-muted-foreground motion-safe:transition-colors hover:text-foreground sm:text-lg md:text-xl",
        goldFocusRing,
        className,
      )}
    >
      <span>{commandHintPrefix}</span>
      <Keycap size="lg" />
      <span>{commandHintSuffix}</span>
    </button>
  );
}
