/**
 * The command terminal as an explicit state machine.
 *
 * Every way a visitor can interact with the terminal (keyboard shortcut,
 * typing, arrow keys, Tab, Enter, clicking a suggestion, Escape) is an
 * event, and `transition` is the single place that decides what each event
 * does. The function is pure: it never touches the DOM or `window`.
 * Side effects (scrolling the page, opening the mail composer) are returned
 * as an `effect` for the caller to run.
 *
 * To add a command: add it to `commands` in content/commands.ts, handle it
 * in `runCommand` below, and (if it prints) add a `TerminalBody` kind that
 * components/terminal/command-output.tsx renders.
 */

import {
  commands,
  navigateTargets,
  parseCommandInput,
  resolveNavigateTarget,
  type CommandDef,
  type NavigateTarget,
} from "@/content/commands";

// ---------------------------------------------------------------------------
// Output

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

// ---------------------------------------------------------------------------
// Suggestions

export type Suggestion =
  | { kind: "command"; key: string; command: CommandDef }
  | { kind: "section"; key: string; target: NavigateTarget };

/**
 * What the suggestion list is offering:
 * - "command": picking a command (`/he` → `/help`)
 * - "section": picking a destination for `/navigate` (`/navigate wo` → `work`)
 */
export type InputMode = "command" | "section";

export function inputMode(input: string): InputMode {
  const { name, hasArgSeparator } = parseCommandInput(input);
  return name === "navigate" && hasArgSeparator ? "section" : "command";
}

export function suggestionsFor(input: string): Suggestion[] {
  const { name, arg } = parseCommandInput(input);

  if (inputMode(input) === "section") {
    const query = arg.toLowerCase();
    return navigateTargets
      .filter(
        (target) =>
          query.length === 0 ||
          target.id.startsWith(query) ||
          target.aliases.some((alias) => alias.startsWith(query)),
      )
      .map((target) => ({ kind: "section" as const, key: target.id, target }));
  }

  return commands
    .filter((command) => command.name.startsWith(name))
    .map((command) => ({ kind: "command" as const, key: command.name, command }));
}

export function suggestionLabel(suggestion: Suggestion): string {
  return suggestion.kind === "command"
    ? suggestion.command.usage
    : `/navigate ${suggestion.target.id}`;
}

export function suggestionDescription(suggestion: Suggestion): string {
  return suggestion.kind === "command"
    ? suggestion.command.description
    : suggestion.target.description;
}

// ---------------------------------------------------------------------------
// State

export type TerminalState = {
  status: "closed" | "open";
  /** Always starts with "/". */
  input: string;
  /** Requested highlight; read it through `activeIndex`, which clamps it. */
  highlight: number;
  entries: TerminalEntry[];
  nextEntryId: number;
};

export const initialTerminalState: TerminalState = {
  status: "closed",
  input: "/",
  highlight: 0,
  entries: [],
  nextEntryId: 1,
};

export function activeIndex(state: TerminalState): number {
  const count = suggestionsFor(state.input).length;
  return count === 0 ? 0 : Math.min(state.highlight, count - 1);
}

// ---------------------------------------------------------------------------
// Events and effects

export type TerminalEvent =
  /** ⌘K / Ctrl+K, or a "Press ⌘K" button. */
  | { type: "toggle" }
  | { type: "open" }
  /** Escape, clicking outside, or a command that leaves the terminal. */
  | { type: "close" }
  | { type: "input"; value: string }
  /** Arrow keys. Wraps around. */
  | { type: "move"; delta: 1 | -1 }
  /** Mouse over a suggestion. */
  | { type: "hover"; index: number }
  /** Tab: fill the input with the highlighted suggestion without running it. */
  | { type: "complete" }
  /** Enter: run the highlighted suggestion, or the typed text if none. */
  | { type: "submit" }
  /** Click on a suggestion: same as highlighting it and pressing Enter. */
  | { type: "pick"; index: number };

export type TerminalEffect =
  | { kind: "navigate"; target: NavigateTarget }
  | { kind: "contact" };

export type Transition = {
  state: TerminalState;
  effect?: TerminalEffect;
};

const SECTION_LIST = navigateTargets.map((target) => target.id).join(", ");

function normalizeInput(value: string): string {
  return value.startsWith("/") ? value : `/${value.replaceAll("/", "")}`;
}

function withInput(state: TerminalState, input: string): TerminalState {
  return { ...state, input, highlight: 0 };
}

function print(
  state: TerminalState,
  body: TerminalBody,
  prompt: string,
): TerminalState {
  return {
    ...state,
    entries: [...state.entries, { id: state.nextEntryId, prompt, body }],
    nextEntryId: state.nextEntryId + 1,
  };
}

function close(state: TerminalState): TerminalState {
  return { ...state, status: "closed" };
}

function open(state: TerminalState): TerminalState {
  return {
    ...state,
    status: "open",
    input: "/",
    highlight: 0,
    entries: [],
  };
}

function runCommand(
  state: TerminalState,
  name: string,
  arg: string,
  prompt: string,
): Transition {
  switch (name) {
    case "help":
    case "bkg":
    case "projects":
    case "skills":
      return { state: withInput(print(state, { kind: name }, prompt), "/") };
    case "contact":
      return { state: close(state), effect: { kind: "contact" } };
    case "navigate": {
      const target = resolveNavigateTarget(arg);
      if (!target) {
        const hint = arg
          ? `unknown section "${arg}". try one of: ${SECTION_LIST}`
          : `usage: /navigate <section>. sections: ${SECTION_LIST}`;
        return {
          state: withInput(print(state, { kind: "help", hint }, prompt), "/navigate "),
        };
      }
      return { state: close(state), effect: { kind: "navigate", target } };
    }
    default:
      return {
        state: withInput(
          print(state, { kind: "error", text: `command not found: /${name || "?"}` }, prompt),
          "/",
        ),
      };
  }
}

function submitAt(state: TerminalState, index: number): Transition {
  const suggestion = suggestionsFor(state.input)[index];
  const parsed = parseCommandInput(state.input);

  if (suggestion?.kind === "section") {
    return {
      state: close(state),
      effect: { kind: "navigate", target: suggestion.target },
    };
  }

  if (suggestion?.kind === "command") {
    // `/navigate` needs a section first, so pressing Enter on it moves the
    // visitor to the section picker instead of failing.
    if (suggestion.command.name === "navigate" && !parsed.hasArgSeparator) {
      return { state: withInput(state, "/navigate ") };
    }
    const { name } = suggestion.command;
    return runCommand(state, name, parsed.arg, `/${name}`);
  }

  return runCommand(state, parsed.name, parsed.arg, state.input.trim() || "/");
}

export function transition(state: TerminalState, event: TerminalEvent): Transition {
  if (state.status === "closed") {
    // While closed, only opening does anything.
    return event.type === "open" || event.type === "toggle"
      ? { state: open(state) }
      : { state };
  }

  switch (event.type) {
    case "open":
      return { state };
    case "toggle":
    case "close":
      return { state: close(state) };
    case "input":
      return { state: withInput(state, normalizeInput(event.value) || "/") };
    case "move": {
      const count = suggestionsFor(state.input).length;
      if (count === 0) {
        return { state };
      }
      const highlight = (activeIndex(state) + event.delta + count) % count;
      return { state: { ...state, highlight } };
    }
    case "hover":
      return { state: { ...state, highlight: event.index } };
    case "complete": {
      const suggestion = suggestionsFor(state.input)[activeIndex(state)];
      if (!suggestion) {
        return { state };
      }
      if (suggestion.kind === "section") {
        return { state: withInput(state, `/navigate ${suggestion.target.id}`) };
      }
      return {
        state: withInput(
          state,
          suggestion.command.name === "navigate" ? "/navigate " : `/${suggestion.command.name}`,
        ),
      };
    }
    case "submit":
      return submitAt(state, activeIndex(state));
    case "pick":
      return submitAt({ ...state, highlight: event.index }, event.index);
  }
}
