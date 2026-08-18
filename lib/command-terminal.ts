export const COMMAND_TERMINAL_TOGGLE = "command-terminal-toggle";

export function toggleCommandTerminal() {
  window.dispatchEvent(new Event(COMMAND_TERMINAL_TOGGLE));
}
