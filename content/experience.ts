export type Role = {
  title: string;
  org: string;
  period: string;
  location?: string;
  summary?: string;
};

export type ExperienceGroup = {
  roles: [Role, ...Role[]];
};

export const workHeading = "My Work";

export function roleLabel(role: Role): string {
  return `${role.title} @ ${role.org}`;
}

export const experience: ExperienceGroup[] = [
  {
    roles: [
      {
        title: "SWE",
        org: "JP Morgan",
        period: "Jul 2026 – Present",
        location: "Wilmington, DE",
      },
    ],
  },
  {
    roles: [
      {
        title: "Freelance Tutor",
        org: "Wyzant",
        period: "Feb 2026 – Present",
        location: "Remote",
        summary:
          "Tech, math, and statistics tutoring — 5.0 across 32 reviews.",
      },
    ],
  },
  {
    roles: [
      {
        title: "AI Engineer",
        org: "City of Boston",
        period: "Sep 2025 – Jul 2026",
        location: "Boston, MA",
        summary:
          "Built OpenContext so city staff can ask questions of public data instead of hunting spreadsheets.",
      },
      {
        title: "AI Product Developer",
        org: "Burnes Center",
        period: "Sep 2025 – Dec 2025",
        location: "Boston, MA",
        summary: "Precursor to the City of Boston seat — same civic AI thread.",
      },
    ],
  },
  {
    roles: [
      {
        title: "Peer Tutor",
        org: "Northeastern University",
        period: "Sep 2022 – May 2026",
        location: "Boston, MA",
        summary:
          "Tutored 65+ students in data science, databases, and statistics.",
      },
    ],
  },
  {
    roles: [
      {
        title: "Part-Time Technical Director",
        org: "Fyras Solutions",
        period: "Apr 2025 – Sep 2025",
        location: "Seattle, WA",
        summary:
          "Built a first-pass AI firewall that redacts sensitive text much faster than the old flow.",
      },
    ],
  },
  {
    roles: [
      {
        title: "R&D Engineer",
        org: "Gillette",
        period: "Jul 2024 – Dec 2024",
        location: "Boston, MA",
        summary:
          "Built two factory-data pipelines that cut processing time by most of the old wait.",
      },
    ],
  },
];
