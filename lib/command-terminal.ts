export const COMMAND_TERMINAL_TOGGLE = "command-terminal-toggle";

/** Ask the command terminal to open (or close, if it is already open). */
export function toggleCommandTerminal() {
  window.dispatchEvent(new Event(COMMAND_TERMINAL_TOGGLE));
}

/** ⌘K on Mac, Ctrl+K elsewhere. */
export function isCommandShortcut(event: KeyboardEvent): boolean {
  return (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
}
