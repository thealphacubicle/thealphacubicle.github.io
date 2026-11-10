"use client";

import { useLenis } from "lenis/react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { CommandOutput } from "@/components/terminal/command-output";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  HEADER_OFFSET,
  commandNotFoundHint,
  type NavigateTarget,
} from "@/content/commands";
import { gmailComposeHref } from "@/content/profile";
import { COMMAND_TERMINAL_TOGGLE, isCommandShortcut } from "@/lib/command-terminal";
import {
  activeIndex as activeIndexOf,
  initialTerminalState,
  inputMode,
  suggestionDescription,
  suggestionLabel,
  suggestionsFor,
  transition,
  type TerminalEffect,
  type TerminalEvent,
} from "@/lib/terminal-machine";
import { cn } from "@/lib/utils";

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

/**
 * Renders the terminal. All behavior lives in `transition`
 * (lib/terminal-machine.ts); this component only turns DOM events into
 * machine events and runs the effects the machine asks for.
 */
export function CommandTerminal() {
  const lenis = useLenis();
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const [state, setState] = useState(initialTerminalState);
  // Mirrors `state` so `dispatch` can compute the next state synchronously.
  // That keeps effects like window.open inside the click/keypress that caused
  // them, which is what browsers require to allow a new tab.
  const stateRef = useRef(state);

  const open = state.status === "open";
  const suggestions = useMemo(() => suggestionsFor(state.input), [state.input]);
  const activeIndex = activeIndexOf(state);
  const mode = inputMode(state.input);
  const optionId = (index: number) => `${listId}-option-${index}`;

  const scrollToTarget = useCallback(
    (target: NavigateTarget) => {
      lenis?.start();

      if (!target.hash) {
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const element = document.querySelector(target.hash);
      const node = element instanceof HTMLElement ? element : null;

      if (lenis) {
        lenis.scrollTo(node ?? target.hash, { offset: HEADER_OFFSET });
        return;
      }

      node?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [lenis],
  );

  const runEffect = useCallback(
    (effect: TerminalEffect) => {
      switch (effect.kind) {
        case "contact":
          window.open(gmailComposeHref, "_blank", "noopener,noreferrer");
          return;
        case "navigate":
          // Wait a frame so the dialog has released the page before scrolling.
          requestAnimationFrame(() => scrollToTarget(effect.target));
          return;
      }
    },
    [scrollToTarget],
  );

  const dispatch = useCallback(
    (event: TerminalEvent) => {
      const { state: next, effect } = transition(stateRef.current, event);
      stateRef.current = next;
      setState(next);
      if (effect) {
        runEffect(effect);
      }
    },
    [runEffect],
  );

  useEffect(() => {
    const onToggle = () => dispatch({ type: "toggle" });

    window.addEventListener(COMMAND_TERMINAL_TOGGLE, onToggle);
    return () => window.removeEventListener(COMMAND_TERMINAL_TOGGLE, onToggle);
  }, [dispatch]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!isCommandShortcut(event) || isTypingField(event.target, rootRef.current)) {
        return;
      }

      event.preventDefault();
      dispatch({ type: "toggle" });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatch]);

  useEffect(() => {
    if (!lenis) {
      return;
    }

    if (open) {
      lenis.stop();
      return;
    }

    lenis.start();
    return () => {
      lenis.start();
    };
  }, [lenis, open]);

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    const keyEvents: Partial<Record<string, TerminalEvent>> = {
      ArrowDown: { type: "move", delta: 1 },
      ArrowUp: { type: "move", delta: -1 },
      Tab: { type: "complete" },
      Enter: { type: "submit" },
    };
    const machineEvent = keyEvents[event.key];
    if (!machineEvent) {
      return;
    }

    event.preventDefault();
    dispatch(machineEvent);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => dispatch({ type: next ? "open" : "close" })}
    >
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[min(40rem,85svh)] max-w-lg flex-col gap-0 overflow-hidden p-0 font-mono sm:max-w-xl"
      >
        <div
          ref={rootRef}
          data-command-terminal=""
          data-mode={mode}
          data-lenis-prevent=""
          className="flex min-h-0 min-w-0 flex-1 flex-col"
        >
          <DialogTitle className="sr-only">Command terminal</DialogTitle>
          <DialogDescription className="sr-only">
            Type a slash command. Use the arrow keys to choose a suggestion,
            Enter to run, Tab to complete, Escape to close.
          </DialogDescription>

          <div className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5">
            <span aria-hidden="true" className="size-2 rounded-full bg-muted-foreground/40" />
            <span aria-hidden="true" className="size-2 rounded-full bg-muted-foreground/40" />
            <span aria-hidden="true" className="size-2 rounded-full bg-muted-foreground/40" />
            <span className="ml-2 text-[0.7rem] tracking-tight text-muted-foreground">
              srihari@thealphacubicle
            </span>
          </div>

          <CommandOutput entries={state.entries} />

          <label className="flex shrink-0 items-center gap-2 px-4 py-3">
            <span className="text-primary" aria-hidden="true">
              $
            </span>
            <input
              value={state.input}
              role="combobox"
              aria-label="Command"
              aria-autocomplete="list"
              aria-expanded={suggestions.length > 0}
              aria-controls={listId}
              aria-activedescendant={
                suggestions.length > 0 ? optionId(activeIndex) : undefined
              }
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none"
              onChange={(event) => dispatch({ type: "input", value: event.target.value })}
              onKeyDown={onInputKeyDown}
            />
          </label>

          {suggestions.length > 0 ? (
            <ul
              id={listId}
              role="listbox"
              aria-label={mode === "section" ? "Sections" : "Commands"}
              className="shrink-0 border-t border-border py-1"
            >
              {suggestions.map((suggestion, index) => {
                const active = index === activeIndex;
                return (
                  <li key={suggestion.key} role="presentation">
                    <button
                      id={optionId(index)}
                      type="button"
                      role="option"
                      tabIndex={-1}
                      aria-selected={active}
                      className={cn(
                        "flex w-full items-baseline justify-between gap-4 px-4 py-2 text-left text-[0.8rem]",
                        active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                      )}
                      onMouseEnter={() => dispatch({ type: "hover", index })}
                      onMouseDown={(event) => {
                        // Keep focus in the input so typing can continue.
                        event.preventDefault();
                        dispatch({ type: "pick", index });
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
            <p
              id={listId}
              className="shrink-0 border-t border-border px-4 py-2 text-[0.75rem] text-muted-foreground"
            >
              {commandNotFoundHint}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
