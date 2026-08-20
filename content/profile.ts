export type NavItem = {
  name: string;
  to: string;
};

export type ContentLink = {
  label: string;
  handle: string;
  href: string;
};

export const name = "Srihari Raman";
export const title = "SWE @ JP Morgan";

export const email = "thealphacubicle.dev@gmail.com";
export const emailHref = `mailto:${email}`;
export const gmailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

export const location = "Wilmington, DE";

export const linkedin: ContentLink = {
  label: "LinkedIn",
  handle: "srihari-r",
  href: "https://www.linkedin.com/in/srihari-r-006034176/",
};

export const github: ContentLink = {
  label: "GitHub",
  handle: "thealphacubicle",
  href: "https://github.com/thealphacubicle",
};

export const medium: ContentLink = {
  label: "Medium",
  handle: "srihari.raman",
  href: "https://medium.com/@srihari.raman",
};

export const wyzant: ContentLink = {
  label: "Wyzant",
  handle: "Srihari R.",
  href: "https://www.wyzant.com/match/tutor/89959555",
};

export const socialLinks: ContentLink[] = [linkedin, github, medium, wyzant];

export const navItems: NavItem[] = [
  { name: "Work", to: "#work" },
  { name: "Projects", to: "#projects" },
  { name: "About", to: "#about" },
  { name: "Connect", to: "#connect" },
];

export const aboutHeading = "A Little About Me";
export const aboutPlaceholder = `
🇮🇳 with a mix of 🇺🇸, 🎾, 🏓, 🤖, and 🛫. 

Hi!
I am Srihari (@thealphacubicle), and I am a SWE @ JPM, currently working in Corporate Technology. 
I am an avid aviation enthusiast, and I love working on code in the intersection between agents, AI, and product development. I am also passionate about teaching
and sharing my knowledge with others, and am an freelance tutor for technology, math, and statistics.
`;

export function aboutCopy(text: string): { lead: string; rest: string } {
  const trimmed = text.trim();
  const match = trimmed.match(/^(.+?\.)\s+([\s\S]+)$/);

  if (!match) {
    return { lead: trimmed, rest: "" };
  }

  return { lead: match[1], rest: match[2].trim() };
}
export const connectHeading = "Connect with me";

export const commandHint = "⌘K";
export const commandHintWindows = "Ctrl+K";
export const commandHintAria = "Open command terminal (⌘K or Ctrl+K)";
export const commandHintPrefix = "Press";
export const commandHintSuffix = "to explore";

export const commandHintModalTitle = "Explore from the keyboard";
export const commandHintModalDescription =
  "Press ⌘K on Mac or Ctrl+K on Windows to open the command bar.";
export const commandHintModalMac = "Mac";
export const commandHintModalWindows = "Windows";

export function copyrightLine(year: number): string {
  return `© ${year} ${name}`;
}
