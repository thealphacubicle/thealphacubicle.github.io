export type ProjectTag = {
  label: string;
  detail: string;
};

export type ProjectLink =
  | {
      kind: "live";
      href: string;
      label: string;
    }
  | {
      kind: "github";
      href: string;
      handle: string;
    };

export type ProjectVisual = "opencontext" | "onus" | "classrag";

export type Project = {
  id: string;
  number: string;
  name: string;
  tagline?: string;
  summary: string;
  context: string;
  tags: ProjectTag[];
  visual: ProjectVisual;
  featured?: boolean;
  link: ProjectLink;
};

export const projectsHeading = "Projects";

export const projects: Project[] = [
  {
    id: "opencontext",
    number: "01",
    name: "OpenContext",
    tagline: "Empowering Agentic Connectivity to Public Sector Data",
    summary:
      "A remote MCP prototype I built for the City of Boston that helps civil employees and citizens interact with city data in a more language-native way. Now being tested by 12+ cities across the U.S. and in Ukraine.",
    context: "In testing with 12+ cities across the U.S. and Ukraine.",
    tags: [
      { label: "Civic AI", detail: "Built for the City of Boston" },
      { label: "MCP", detail: "Remote Model Context Protocol prototype" },
      { label: "Live", detail: "Open the deployed prototype" },
    ],
    visual: "opencontext",
    featured: true,
    link: {
      kind: "live",
      href: "https://opencontext-mcp.vercel.app/home",
      label: "Visit live site",
    },
  },
  {
    id: "onus",
    number: "02",
    name: "Onus",
    summary:
      "Part of HackHealth 2026 @ Northeastern. Onus is built on the principle that rewards consistency through negative bias. Backed by consumer psychology and data analytics, it combines rewards, statistics, and geofencing to help build discipline.",
    context: "HackHealth 2026 hackathon prototype at Northeastern.",
    tags: [
      { label: "Hackathon", detail: "HackHealth 2026 @ Northeastern" },
      { label: "Geofencing", detail: "Location-aware discipline loops" },
      { label: "Live", detail: "Open the deployed prototype" },
    ],
    visual: "onus",
    link: {
      kind: "live",
      href: "https://onus-kappa.vercel.app",
      label: "Visit live site",
    },
  },
  {
    id: "classrag",
    number: "03",
    name: "ClassRAG",
    tagline: "RAG Experimentation",
    summary:
      "A local RAG system created to retrieve, process, and generate custom responses as part of Northeastern University's DS4300 (Large-Scale Database Retrieval) course.",
    context: "DS4300 · Large-Scale Database Retrieval",
    tags: [
      { label: "RAG", detail: "Retrieve, process, and generate locally" },
      { label: "Coursework", detail: "Northeastern DS4300" },
    ],
    visual: "classrag",
    link: {
      kind: "github",
      href: "https://github.com/thealphacubicle/ClassRAG",
      handle: "thealphacubicle/ClassRAG",
    },
  },
];
