"use client";

import { useLenis } from "lenis/react";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  HEADER_OFFSET,
  bkgText,
  commandNotFoundHint,
  commands,
  formatHelpOutput,
  formatSkillsCommandOutput,
  navigateTargets,
  parseCommandInput,
  resolveNavigateTarget,
  type CommandDef,
  type NavigateTarget,
} from "@/content/commands";
import { gmailComposeHref } from "@/content/profile";
import { COMMAND_TERMINAL_TOGGLE } from "@/lib/command-terminal";
import { cn } from "@/lib/utils";

type CommandSuggestion = {
  kind: "command";
  key: string;
  command: CommandDef;
};

type SectionSuggestion = {
  kind: "section";
  key: string;
  target: NavigateTarget;
};

type Suggestion = CommandSuggestion | SectionSuggestion;

type OutputLine = {
  id: number;
  prompt?: string;
  text: string;
};

function suggestionsFor(value: string): Suggestion[] {
  const { name, arg, hasArgSeparator } = parseCommandInput(value);

  if (name === "navigate" && hasArgSeparator) {
    const query = arg.toLowerCase();
    return navigateTargets
      .filter(
        (target) =>
          query.length === 0 ||
          target.id.startsWith(query) ||
          target.aliases.some((alias) => alias.startsWith(query)),
      )
      .map((target) => ({
        kind: "section" as const,
        key: target.id,
        target,
      }));
  }

  return commands
    .filter((command) => command.name.startsWith(name))
    .map((command) => ({
      kind: "command" as const,
      key: command.name,
      command,
    }));
}

function suggestionLabel(suggestion: Suggestion): string {
  return suggestion.kind === "command"
    ? suggestion.command.usage
    : `/navigate ${suggestion.target.id}`;
}

function suggestionDescription(suggestion: Suggestion): string {
  return suggestion.kind === "command"
    ? suggestion.command.description
    : suggestion.target.description;
}

function isTypingField(element: EventTarget | null, terminalRoot: HTMLElement | null) {
  if (!(element instanceof HTMLElement)) {
    return false;
  }

  const tag = element.tagName;
  const isField =
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    element.isContentEditable;

  if (!isField) {
    return false;
  }

  return !terminalRoot?.contains(element);
}

export function CommandTerminal() {
  const lenis = useLenis();
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const lineId = useRef(0);
  const openRef = useRef(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("/");
  const [highlight, setHighlight] = useState(0);
  const [lines, setLines] = useState<OutputLine[]>([]);

  const suggestions = useMemo(() => suggestionsFor(value), [value]);
  const activeIndex =
    suggestions.length === 0
      ? 0
      : Math.min(highlight, suggestions.length - 1);

  const openTerminal = useCallback(() => {
    setValue("/");
    setHighlight(0);
    setLines([]);
    openRef.current = true;
    setOpen(true);
  }, []);

  const closeTerminal = useCallback(() => {
    openRef.current = false;
    setOpen(false);
  }, []);

  const toggleTerminal = useCallback(() => {
    if (openRef.current) {
      closeTerminal();
      return;
    }
    openTerminal();
  }, [closeTerminal, openTerminal]);

  useEffect(() => {
    const onToggle = () => {
      toggleTerminal();
    };

    window.addEventListener(COMMAND_TERMINAL_TOGGLE, onToggle);
    return () => window.removeEventListener(COMMAND_TERMINAL_TOGGLE, onToggle);
  }, [toggleTerminal]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") {
        return;
      }
      if (isTypingField(event.target, rootRef.current)) {
        return;
      }

      event.preventDefault();
      toggleTerminal();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleTerminal]);

  const print = useCallback((text: string, prompt?: string) => {
    lineId.current += 1;
    setLines((current) => [
      ...current,
      { id: lineId.current, prompt, text },
    ]);
  }, []);

  const scrollToTarget = useCallback(
    (target: NavigateTarget) => {
      if (!target.hash) {
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const element = document.querySelector(target.hash);
      if (lenis) {
        lenis.scrollTo(target.hash, { offset: HEADER_OFFSET });
        return;
      }

      if (element instanceof HTMLElement) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenis],
  );

  const runNavigate = useCallback(
    (target: NavigateTarget) => {
      scrollToTarget(target);
      closeTerminal();
    },
    [closeTerminal, scrollToTarget],
  );

  const execute = useCallback(
    (name: string, arg: string, prompt: string) => {
      switch (name) {
        case "help":
          print(formatHelpOutput(), prompt);
          setValue("/");
          setHighlight(0);
          return;
        case "bkg":
          print(bkgText, prompt);
          setValue("/");
          setHighlight(0);
          return;
        case "skills":
          print(formatSkillsCommandOutput(), prompt);
          setValue("/");
          setHighlight(0);
          return;
        case "contact":
          window.open(gmailComposeHref, "_blank", "noopener,noreferrer");
          closeTerminal();
          return;
        case "navigate": {
          const target = resolveNavigateTarget(arg);
          if (!target) {
            print(
              `usage: /navigate <section>\n${formatHelpOutput()}`,
              prompt,
            );
            setValue("/navigate ");
            setHighlight(0);
            return;
          }
          runNavigate(target);
          return;
        }
        default:
          print(
            `command not found: /${name || "?"}\n${commandNotFoundHint}`,
            prompt,
          );
          setValue("/");
          setHighlight(0);
      }
    },
    [closeTerminal, print, runNavigate],
  );

  const completeSuggestion = useCallback((suggestion: Suggestion) => {
    if (suggestion.kind === "section") {
      setValue(`/navigate ${suggestion.target.id}`);
      setHighlight(0);
      return;
    }

    setValue(
      suggestion.command.name === "navigate"
        ? "/navigate "
        : `/${suggestion.command.name}`,
    );
    setHighlight(0);
  }, []);

  const submit = useCallback(() => {
    const suggestion = suggestions[activeIndex];
    const parsed = parseCommandInput(value);

    if (suggestion?.kind === "section") {
      runNavigate(suggestion.target);
      return;
    }

    if (
      suggestion?.kind === "command" &&
      suggestion.command.name === "navigate" &&
      !parsed.hasArgSeparator
    ) {
      setValue("/navigate ");
      setHighlight(0);
      return;
    }

    if (suggestion?.kind === "command") {
      execute(suggestion.command.name, parsed.arg, `/${suggestion.command.name}`);
      return;
    }

    execute(parsed.name, parsed.arg, value.trim() || "/");
  }, [activeIndex, execute, runNavigate, suggestions, value]);

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (suggestions.length === 0) {
        return;
      }
      setHighlight((current) => (current + 1) % suggestions.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (suggestions.length === 0) {
        return;
      }
      setHighlight((current) =>
        current === 0 ? suggestions.length - 1 : current - 1,
      );
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const suggestion = suggestions[activeIndex];
      if (suggestion) {
        completeSuggestion(suggestion);
      }
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    }
  };

  const onValueChange = (next: string) => {
    const normalized = next.startsWith("/") ? next : `/${next.replaceAll("/", "")}`;
    setValue(normalized.length === 0 ? "/" : normalized);
    setHighlight(0);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) {
          openTerminal();
          return;
        }
        closeTerminal();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-lg gap-0 overflow-hidden p-0 font-mono sm:max-w-lg"
      >
        <div ref={rootRef} data-command-terminal="">
          <DialogTitle className="sr-only">Command terminal</DialogTitle>
          <DialogDescription className="sr-only">
            Type a slash command. Press Enter to run, Tab to complete, Escape
            to close.
          </DialogDescription>

          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <span aria-hidden="true" className="size-2 rounded-full bg-muted-foreground/40" />
            <span aria-hidden="true" className="size-2 rounded-full bg-muted-foreground/40" />
            <span aria-hidden="true" className="size-2 rounded-full bg-muted-foreground/40" />
            <span className="ml-2 text-[0.7rem] tracking-tight text-muted-foreground">
              srihari@thealphacubicle
            </span>
          </div>

          {lines.length > 0 ? (
            <div className="max-h-48 overflow-auto border-b border-border px-4 py-3 text-[0.8rem] leading-relaxed text-muted-foreground">
              {lines.map((line) => (
                <div key={line.id} className="whitespace-pre-wrap">
                  {line.prompt ? (
                    <p className="text-foreground">
                      <span className="text-primary">$ </span>
                      {line.prompt}
                    </p>
                  ) : null}
                  <p className="mt-1">{line.text}</p>
                </div>
              ))}
            </div>
          ) : null}

          <label className="flex items-center gap-2 px-4 py-3">
            <span className="text-primary" aria-hidden="true">
              $
            </span>
            <input
              ref={inputRef}
              value={value}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              aria-label="Command"
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none"
              onChange={(event) => onValueChange(event.target.value)}
              onKeyDown={onInputKeyDown}
            />
          </label>

          {suggestions.length > 0 ? (
            <ul className="border-t border-border py-1" role="listbox">
              {suggestions.map((suggestion, index) => {
                const active = index === activeIndex;
                return (
                  <li key={suggestion.key}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      className={cn(
                        "flex w-full items-baseline justify-between gap-4 px-4 py-2 text-left text-[0.8rem]",
                        active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                      )}
                      onMouseEnter={() => setHighlight(index)}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        if (suggestion.kind === "section") {
                          runNavigate(suggestion.target);
                          return;
                        }
                        if (suggestion.command.name === "navigate") {
                          completeSuggestion(suggestion);
                          return;
                        }
                        execute(
                          suggestion.command.name,
                          "",
                          `/${suggestion.command.name}`,
                        );
                      }}
                    >
                      <span className="shrink-0 text-foreground">
                        {suggestionLabel(suggestion)}
                      </span>
                      <span className="truncate text-right">
                        {suggestionDescription(suggestion)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="border-t border-border px-4 py-2 text-[0.75rem] text-muted-foreground">
              {commandNotFoundHint}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
