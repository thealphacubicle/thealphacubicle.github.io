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
import { cn } from "@/lib/utils";

const STORAGE_KEY = "command-hint-modal-dismissed-v2";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setOpen(true);
    }, 400);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const dismissOnShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") {
        return;
      }

      setOpen(false);
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    };

    window.addEventListener("keydown", dismissOnShortcut);
    return () => window.removeEventListener("keydown", dismissOnShortcut);
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          window.sessionStorage.setItem(STORAGE_KEY, "1");
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
