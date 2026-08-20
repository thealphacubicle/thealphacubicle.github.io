import { cn } from "@/lib/utils";
import type { ProjectVisual } from "@/content/projects";
import type { ReactNode } from "react";

function VisualFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate overflow-hidden bg-muted",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_55%)]",
        "motion-safe:transition-transform motion-safe:duration-500 group-hover/card:scale-[1.04]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function OpenContextVisual() {
  const nodes = [
    { x: 48, y: 78, r: 4.5, pulse: true },
    { x: 108, y: 42, r: 3 },
    { x: 168, y: 96, r: 3.5, gold: true },
    { x: 214, y: 38, r: 2.5 },
    { x: 268, y: 72, r: 4, gold: true },
    { x: 318, y: 118, r: 2.5 },
    { x: 86, y: 148, r: 2.5 },
    { x: 148, y: 168, r: 3, gold: true },
    { x: 236, y: 154, r: 2.5 },
    { x: 292, y: 188, r: 3.5, pulse: true },
  ] as const;

  const edges: Array<[number, number]> = [
    [0, 1],
    [0, 2],
    [0, 6],
    [1, 3],
    [2, 4],
    [2, 7],
    [3, 4],
    [4, 5],
    [4, 8],
    [6, 7],
    [7, 8],
    [8, 9],
    [5, 9],
  ];

  return (
    <svg viewBox="0 0 360 220" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="oc-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M24 0H0V24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            className="text-foreground/10"
          />
        </pattern>
      </defs>
      <rect width="360" height="220" fill="url(#oc-grid)" />
      {edges.map(([from, to]) => (
        <line
          key={`${from}-${to}`}
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          className="stroke-primary/35"
          strokeWidth="1"
        />
      ))}
      {nodes.map((node, index) => (
        <g key={index}>
          {"pulse" in node && node.pulse ? (
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r + 8}
              className="fill-primary/20 motion-safe:animate-pulse"
            />
          ) : null}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            className={"gold" in node && node.gold ? "fill-primary" : "fill-foreground/55"}
          />
        </g>
      ))}
    </svg>
  );
}

function OnusVisual() {
  return (
    <svg viewBox="0 0 360 220" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
      <g className="origin-center" style={{ transformOrigin: "180px 118px" }}>
        {[86, 62, 38].map((radius) => (
          <circle
            key={radius}
            cx="180"
            cy="118"
            r={radius}
            fill="none"
            className="stroke-foreground/15"
            strokeWidth="1.2"
          />
        ))}
        <circle
          cx="180"
          cy="118"
          r="86"
          fill="none"
          className="stroke-primary/70"
          strokeWidth="2.2"
          strokeDasharray="86 454"
          strokeLinecap="round"
          transform="rotate(-90 180 118)"
        />
        <circle cx="180" cy="32" r="4" className="fill-primary" />
        <circle cx="180" cy="118" r="7" className="fill-primary" />
        <circle cx="180" cy="118" r="2.5" className="fill-primary-foreground" />
        <circle cx="248" cy="78" r="3" className="fill-foreground/45" />
        <circle cx="132" cy="168" r="3" className="fill-foreground/45" />
      </g>
    </svg>
  );
}

function ClassRagVisual() {
  const chunks = [
    { y: 78, width: 220, opacity: "opacity-90" },
    { y: 108, width: 188, opacity: "opacity-100" },
    { y: 138, width: 156, opacity: "opacity-70" },
    { y: 168, width: 124, opacity: "opacity-40" },
  ];

  return (
    <svg viewBox="0 0 360 220" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
      <rect x="70" y="36" width="168" height="22" rx="11" className="fill-primary/90" />
      <circle cx="86" cy="47" r="4" className="fill-primary-foreground/80" />
      <rect x="98" y="43" width="108" height="8" rx="4" className="fill-primary-foreground/70" />
      {chunks.map((chunk, index) => (
        <g key={chunk.y} className={chunk.opacity}>
          <rect
            x="70"
            y={chunk.y}
            width={chunk.width}
            height="22"
            rx="6"
            className={index === 1 ? "fill-primary/35 stroke-primary/70" : "fill-foreground/10"}
            strokeWidth={index === 1 ? 1 : 0}
          />
          <rect
            x="82"
            y={chunk.y + 7}
            width={chunk.width * 0.55}
            height="8"
            rx="4"
            className={index === 1 ? "fill-primary/80" : "fill-foreground/25"}
          />
        </g>
      ))}
    </svg>
  );
}

export function ProjectVisualCanvas({
  visual,
  className,
}: {
  visual: ProjectVisual;
  className?: string;
}) {
  return (
    <VisualFrame className={className}>
      {visual === "opencontext" ? (
        <OpenContextVisual />
      ) : visual === "onus" ? (
        <OnusVisual />
      ) : (
        <ClassRagVisual />
      )}
    </VisualFrame>
  );
}
