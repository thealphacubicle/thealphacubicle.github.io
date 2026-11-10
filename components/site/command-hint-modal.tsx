"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  commandHint,
  commandHintModalDescription,
  commandHintModalMac,
  commandHintModalTitle,
  commandHintModalWindows,
  commandHintWindows,
} from "@/content/profile";
import { COMMAND_TERMINAL_TOGGLE, isCommandShortcut } from "@/lib/command-terminal";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "command-hint-modal-dismissed-v2";
const SHOW_DELAY_MS = 400;

/**
 * The hint's lifecycle, once per browser tab session:
 *
 *   waiting ──(400ms)──▶ shown ──(close / ⌘K / terminal opened)──▶ dismissed
 *      └──────────────(⌘K / terminal opened)───────────────────────────┘
 *
 * "dismissed" is final and remembered in sessionStorage. Opening the
 * terminal in any way counts as dismissing: the visitor already found it.
 */
type HintPhase = "waiting" | "shown" | "dismissed";

// Storage can throw (blocked cookies, some private modes). The hint is a
// nicety, so failing to read or write it must never break the page.
function wasDismissed(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberDismissed() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Ignore: worst case the hint shows again next visit.
  }
}

function Keycap({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-muted px-2.5 py-1 font-mono text-sm font-medium tracking-[0.12em] text-foreground",
        className,
      )}
    >
      {children}
    </kbd>
  );
}

function Shortcut({
  keys,
  label,
}: {
  keys: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <Keycap>{keys}</Keycap>
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function CommandHintModal() {
  const [phase, setPhase] = useState<HintPhase>("waiting");

  useEffect(() => {
    // Read storage after mount: sessionStorage does not exist during the
    // static build, so this cannot be the initial state.
    if (wasDismissed()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from browser storage
      setPhase("dismissed");
      return;
    }

    const timeout = window.setTimeout(() => {
      // Only a hint that is still waiting may appear; one the visitor already
      // made redundant (by opening the terminal) stays dismissed.
      setPhase((current) => (current === "waiting" ? "shown" : current));
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (phase === "dismissed") {
      return;
    }

    const dismiss = () => {
      setPhase("dismissed");
      rememberDismissed();
    };
    const onKey = (event: KeyboardEvent) => {
      if (isCommandShortcut(event)) {
        dismiss();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener(COMMAND_TERMINAL_TOGGLE, dismiss);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(COMMAND_TERMINAL_TOGGLE, dismiss);
    };
  }, [phase]);

  return (
    <Dialog
      open={phase === "shown"}
      onOpenChange={(next) => {
        if (!next) {
          setPhase("dismissed");
          rememberDismissed();
        }
      }}
    >
      <DialogContent className="flex w-80 max-w-[calc(100%-2rem)] flex-col gap-5 p-5 sm:max-w-80">
        <DialogHeader className="gap-2 pr-6 text-center sm:text-center">
          <DialogTitle className="heading text-lg">
            {commandHintModalTitle}
          </DialogTitle>
          <DialogDescription className="text-pretty leading-relaxed">
            {commandHintModalDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-start justify-center gap-5">
          <Shortcut keys={commandHint} label={commandHintModalMac} />
          <span className="mt-2 font-mono text-xs text-muted-foreground">or</span>
          <Shortcut keys={commandHintWindows} label={commandHintModalWindows} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
