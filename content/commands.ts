export type CommandDef = {
  name: string;
  usage: string;
  description: string;
};

export type NavigateTarget = {
  id: string;
  aliases: string[];
  description: string;
  hash: string | null;
};

export const HEADER_OFFSET = -80;

export const commands: CommandDef[] = [
  {
    name: "navigate",
    usage: "/navigate <section>",
    description: "Jump to a section on this page",
  },
  {
    name: "bkg",
    usage: "/bkg",
    description: "Who I am",
  },
  {
    name: "projects",
    usage: "/projects",
    description: "Projects I've worked on",
  },
  {
    name: "contact",
    usage: "/contact",
    description: "Email me",
  },
  {
    name: "skills",
    usage: "/skills",
    description: "Technologies I've used",
  },
  {
    name: "help",
    usage: "/help",
    description: "List commands",
  },
];

export const navigateTargets: NavigateTarget[] = [
  {
    id: "work",
    aliases: ["work", "my-work"],
    description: "My Work",
    hash: "#work",
  },
  {
    id: "projects",
    aliases: ["projects", "project"],
    description: "Projects",
    hash: "#projects",
  },
  {
    id: "about",
    aliases: ["about", "me"],
    description: "A Little About Me",
    hash: "#about",
  },
  {
    id: "connect",
    aliases: ["connect"],
    description: "Connect with me",
    hash: "#connect",
  },
  {
    id: "top",
    aliases: ["top", "home"],
    description: "Back to the top",
    hash: null,
  },
];

export const bkgText = `Engineer in Wilmington. I build AI systems teams can actually run — search over their own data, tools that do multi-step work, and the cloud underneath. SWE @ JP Morgan. Before that: civic AI for Boston (Burnes Center → City), an LLM firewall at Fyras, and factory data pipelines at Gillette.`;

export const commandNotFoundHint = "type /help for a list of commands";

export function resolveNavigateTarget(
  arg: string,
): NavigateTarget | undefined {
  const query = arg.trim().toLowerCase();
  if (!query) {
    return undefined;
  }

  return navigateTargets.find(
    (target) =>
      target.id === query || target.aliases.includes(query),
  );
}

export function parseCommandInput(value: string): {
  name: string;
  arg: string;
  hasArgSeparator: boolean;
} {
  const trimmed = value.trim();
  const body = trimmed.startsWith("/") ? trimmed.slice(1) : trimmed;
  const separator = body.indexOf(" ");

  if (separator === -1) {
    return { name: body.toLowerCase(), arg: "", hasArgSeparator: false };
  }

  return {
    name: body.slice(0, separator).toLowerCase(),
    arg: body.slice(separator + 1).trim(),
    hasArgSeparator: true,
  };
}
