import React, { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button';
import Sparkline from '../components/Sparkline';

const capabilityPills = [
  'Prompt Engineering Systems',
  'Microservices & API Mesh',
  'Civic Data Platform Architecture',
  'Multi-agent Orchestration',
  'Responsible AI Ops',
  'Scalable Experimentation'
];

const interests = [
  {
    title: 'LLM Safety & Guardrails',
    caption: 'Designing redaction, policy tuning, and community feedback loops for equitable civic copilots.'
  },
  {
    title: 'GovTech Multi-Agent Studio',
    caption: 'Building cooperative agents that accelerate public benefits tooling and unlock faster service delivery.'
  },
  {
    title: 'Observability for ML',
    caption: 'Surfacing drift, bias, and SLA breaches with intuitive dashboards that engineers actually use.'
  },
  {
    title: 'EquityChain Homebuying Pilot',
    caption: 'Exploring blockchain + AI handoffs to streamline affordable housing approvals without compromising privacy.'
  }
];

const projects = [
  {
    title: 'ClassRAG: Experiment-Based RAG Pipeline System',
    description:
      'Modular RAG framework that orchestrates 480+ automated experiments to recommend architecture pairings by query intent.',
    tags: ['LangChain', 'Hugging Face', 'Redis', 'FastAPI'],
    links: [
      { label: 'GitHub', href: 'https://github.com/thealphacubicle/ClassRAG' }
    ]
  },
  {
    title: "BlockchainViz: Bitcoin's Live Profitability Lens",
    description:
      'Streaming pipeline and Tableau surface that ingests >450 batches of blockchain data to highlight miner profitability.',
    tags: ['Kafka', 'MongoDB', 'Tableau', 'Python'],
    links: [
      { label: 'GitHub', href: 'https://github.com/thealphacubicle/Amtrak-Review-Analysis' },
      { label: 'Medium', href: 'https://medium.com/@srihari.raman/a-real-time-discovery-of-bitcoin-through-tableau-345c94681cc1' }
    ]
  },
  {
    title: 'Linguisight: NLP Analysis Framework',
    description:
      'Three-tier NLP toolkit that lets business teams explore 7M+ patents through topic clustering, embeddings, and storytelling.',
    tags: ['PyTorch', 'BERT', 'Azure', 'Dash'],
    links: [
      { label: 'GitHub', href: 'https://github.com/thealphacubicle/Linguisight' }
    ]
  }
];

const pipelines = [
  {
    name: 'Azure LLM Firewall',
    status: 'Live',
    highlight: '80% faster PII redaction',
    description: 'Async NLP inference and rule authoring system deployed for Fyras Solutions firewall MVP.'
  },
  {
    name: 'Databricks Reliability Suite',
    status: 'Shipped',
    highlight: '95% efficiency gain',
    description: 'Delta Live Tables pipelines and quality checks powering Gillette embedded systems analytics.'
  },
  {
    name: 'Patent Intelligence Lab',
    status: 'In Research',
    highlight: '7M+ documents parsed',
    description: 'Parallelized BERT transformers uncovering commercialization themes for Northeastern University.'
  }
];

const DEFAULT_SNAPSHOT = [
  {
    key: 'pushes',
    label: 'Push Bursts',
    value: '—',
    delta: 'awaiting signal',
    points: [1, 2, 3, 2, 4, 5]
  },
  {
    key: 'pullRequests',
    label: 'PR Launches',
    value: '—',
    delta: 'sync required',
    points: [2, 1, 3, 2, 4, 3]
  },
  {
    key: 'merges',
    label: 'Merge Wins',
    value: '—',
    delta: 'sync required',
    points: [0, 1, 1, 2, 2, 3]
  },
  {
    key: 'reviews',
    label: 'Review Boosts',
    value: '—',
    delta: 'sync required',
    points: [1, 2, 2, 3, 4, 5]
  }
];

const CUSTOM_SNAPSHOT_ENDPOINT = process.env.REACT_APP_GITHUB_METRICS_ENDPOINT;
const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'thealphacubicle';
const SNAPSHOT_DEFAULT_LOOKUP = DEFAULT_SNAPSHOT.reduce((acc, metric) => {
  acc[metric.key] = metric;
  return acc;
}, {});

const formatNumber = (value) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return '—';
  }
  const number = Number(value);
  if (number < 1000) {
    return number.toString();
  }
  if (number < 1000000) {
    return `${(number / 1000).toFixed(1)}k`;
  }
  return `${(number / 1000000).toFixed(1)}m`;
};

const buildMetric = (source, fallback) => {
  if (source === undefined) {
    return fallback;
  }

  if (typeof source === 'number') {
    return {
      ...fallback,
      value: formatNumber(source),
      delta: 'updated',
      points: fallback.points
    };
  }

  const total =
    source.total ?? source.count ?? source.value ?? source.merged ?? source.open ?? source.closed ?? fallback.value;
  const history = Array.isArray(source.trend)
    ? source.trend
    : Array.isArray(source.history)
    ? source.history
    : fallback.points;
  const delta = source.delta ?? source.note ?? 'live';

  return {
    ...fallback,
    value: formatNumber(total),
    delta,
    points: history.length ? history : fallback.points
  };
};

const ensureDailyBucket = (bucketMap, dateKey) => {
  if (!bucketMap.has(dateKey)) {
    bucketMap.set(dateKey, {
      pushes: 0,
      pullRequests: 0,
      merges: 0,
      reviews: 0
    });
  }

  return bucketMap.get(dateKey);
};

const buildSnapshotFromEvents = (events = []) => {
  const totals = {
    pushes: 0,
    pullRequests: 0,
    merges: 0,
    reviews: 0
  };

  const dailyTotals = new Map();

  events.forEach((event) => {
    if (!event || !event.created_at) {
      return;
    }

    const dateKey = event.created_at.slice(0, 10);
    const bucket = ensureDailyBucket(dailyTotals, dateKey);

    switch (event.type) {
      case 'PushEvent': {
        const addition =
          event.payload?.size ??
          (Array.isArray(event.payload?.commits) ? event.payload.commits.length : undefined) ??
          1;
        totals.pushes += addition;
        bucket.pushes += addition;
        break;
      }
      case 'PullRequestEvent': {
        const action = event.payload?.action;
        const pullRequest = event.payload?.pull_request;
        if (action === 'opened') {
          totals.pullRequests += 1;
          bucket.pullRequests += 1;
        }
        if (pullRequest?.merged) {
          totals.merges += 1;
          bucket.merges += 1;
        }
        break;
      }
      case 'PullRequestReviewEvent':
      case 'PullRequestReviewCommentEvent': {
        totals.reviews += 1;
        bucket.reviews += 1;
        break;
      }
      default:
        break;
    }
  });

  const orderedDates = Array.from(dailyTotals.keys()).sort();
  const windowDescriptor = orderedDates.length
    ? `last ${orderedDates.length} day${orderedDates.length === 1 ? '' : 's'}`
    : `last ${Math.min(events.length, 100)} events`;

  const buildHistory = (key) => {
    const fallback = SNAPSHOT_DEFAULT_LOOKUP[key];
    const targetLength = fallback.points.length;

    if (!orderedDates.length) {
      return fallback.points;
    }

    const values = orderedDates.map((date) => dailyTotals.get(date)[key]);
    const windowed = values.slice(-targetLength);

    while (windowed.length < targetLength) {
      windowed.unshift(0);
    }

    return windowed;
  };

  return {
    pushes: { total: totals.pushes, trend: buildHistory('pushes'), delta: windowDescriptor },
    pullRequests: { total: totals.pullRequests, trend: buildHistory('pullRequests'), delta: windowDescriptor },
    merges: { total: totals.merges, trend: buildHistory('merges'), delta: windowDescriptor },
    reviews: { total: totals.reviews, trend: buildHistory('reviews'), delta: windowDescriptor }
  };
};

const fetchGitHubEventsSnapshot = async (signal) => {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/events/public?per_page=100`,
    {
      headers: {
        Accept: 'application/vnd.github+json'
      },
      signal
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub events request failed with ${response.status}`);
  }

  const events = await response.json();
  return buildSnapshotFromEvents(Array.isArray(events) ? events : []);
};

const fetchCustomSnapshot = async (signal) => {
  if (!CUSTOM_SNAPSHOT_ENDPOINT) {
    return null;
  }

  const response = await fetch(CUSTOM_SNAPSHOT_ENDPOINT, {
    headers: {
      Accept: 'application/json'
    },
    signal
  });

  if (!response.ok) {
    throw new Error(`Custom snapshot request failed with ${response.status}`);
  }

  return response.json();
};

const requestSnapshot = async (signal) => {
  if (CUSTOM_SNAPSHOT_ENDPOINT) {
    try {
      const custom = await fetchCustomSnapshot(signal);
      if (custom) {
        return custom;
      }
    } catch (error) {
      console.warn('Custom metrics endpoint unavailable, falling back to GitHub events.', error);
    }
  }

  return fetchGitHubEventsSnapshot(signal);
};

function useGitHubSnapshot() {
  const [snapshot, setSnapshot] = useState(DEFAULT_SNAPSHOT);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMetrics() {
      try {
        const payload = await requestSnapshot(controller.signal);
        const transformed = DEFAULT_SNAPSHOT.map((item) => buildMetric(payload[item.key], item));
        setSnapshot(transformed);
        setUpdatedAt(new Date().toISOString());
        setIsLive(true);
      } catch (error) {
        console.info('Unable to load live GitHub metrics:', error.message);
        setIsLive(false);
      }
    }

    loadMetrics();

    return () => controller.abort();
  }, []);

  return {
    snapshot,
    updatedAt,
    isLive
  };
}

function Home() {
  const { snapshot, updatedAt, isLive } = useGitHubSnapshot();

  const lastUpdated = useMemo(() => {
    if (!updatedAt) {
      return 'awaiting refresh';
    }
    const timestamp = new Date(updatedAt);
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [updatedAt]);

  return (
    <div className="relative">
      <section className="relative overflow-hidden pb-20 pt-16">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(123,45,58,0.12)_0%,rgba(244,237,225,0.9)_55%,rgba(251,246,238,1)_100%)]" />
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 bg-[radial-gradient(circle_at_top,rgba(123,45,58,0.3),transparent_65%)] lg:block" />
        <div className="absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(rgba(123,45,58,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(123,45,58,0.09)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-sand/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Impact Builder
            </span>
            <h1 className="mt-6 text-4xl font-heading font-semibold tracking-tight text-brand-deep sm:text-5xl lg:text-[52px]">
              Srihari Raman · Impact AI Maker
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-ink/80">
              Northeastern University Data Science &amp; Finance student architecting civic-facing AI, microservices, and digital
              products that democratize access to public services and social support.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button to="/resume">Open Impact Dossier</Button>
              <Button href="mailto:thealphacubicle.dev@gmail.com" variant="secondary">
                Collaborate with me
              </Button>
            </div>
          </div>
          <div className="w-full max-w-sm rounded-3xl border border-brand/15 bg-brand-cream/80 p-6 shadow-card backdrop-blur">
            <div className="relative overflow-hidden rounded-2xl bg-brand-deep/90 p-4 text-left text-brand-cream">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-brand-muted">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                  </span>
                  GitImpact
                </div>
                <span className="text-[10px] uppercase tracking-wide text-brand-muted">Updated {lastUpdated}</span>
              </div>
              <p className="mt-3 text-lg font-semibold">ImpactOps Pulse</p>
              <div className="mt-6 space-y-6">
                {snapshot.map((metric) => (
                  <div key={metric.key} className="rounded-xl bg-brand-cream/10 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-brand-cream/80">{metric.label}</p>
                      <span className="text-xs text-brand-muted">{isLive ? metric.delta : 'standby signal'} </span>
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                      <span className="text-3xl font-semibold text-brand-cream">{metric.value}</span>
                      <Sparkline points={metric.points} stroke="#6ee7b7" fill="rgba(110,231,183,0.18)" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-brand/15 bg-brand-cream/90 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="section-heading">Capabilities</h2>
              <p className="mt-4 text-base text-brand-ink/70">
                I design modular civic-tech ecosystems—microservices, agents, and AI guardrails—that let public orgs ship
                trustworthy digital services at community speed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {capabilityPills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-brand/15 bg-brand-sand px-4 py-2 text-sm text-brand-deep transition hover:-translate-y-0.5 hover:border-brand"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="section-heading">Currently Exploring</h2>
              <div className="mt-6 grid gap-4">
                {interests.map((interest) => (
                  <article
                    key={interest.title}
                    className="group rounded-2xl border border-brand/15 bg-white/70 p-5 shadow-lg transition hover:-translate-y-1 hover:border-brand hover:shadow-card"
                  >
                    <p className="text-sm font-semibold text-brand-deep">{interest.title}</p>
                    <p className="mt-2 text-sm text-brand-ink/70">{interest.caption}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-brand/20 bg-brand-deep text-brand-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-16 lg:flex-row lg:items-stretch">
          <div className="flex-1 rounded-3xl border border-brand/30 bg-brand-cream/10 p-6 shadow-card backdrop-blur">
            <img
              src="/headshot.png"
              alt="Portrait of Srihari Raman"
              className="h-full w-full rounded-2xl object-cover object-center ring-2 ring-brand/50"
            />
          </div>
          <div className="flex-1">
            <h2 className="section-heading text-brand-cream">Selected Projects</h2>
            <p className="mt-2 max-w-xl text-base text-brand-cream/80">
              High-impact systems and explorations keeping AI, finance, and social good in the same conversation.
            </p>
            <div className="mt-10 grid gap-6">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="flex h-full flex-col justify-between rounded-3xl border border-brand/30 bg-brand-cream/10 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-brand hover:bg-brand-cream/20"
                >
                  <div>
                    <p className="text-lg font-semibold text-brand-cream">{project.title}</p>
                    <p className="mt-3 text-sm text-brand-cream/80">{project.description}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-wide text-brand-muted">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-brand/30 bg-brand-cream/10 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.links.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-wide text-brand-muted">
                      {project.links.map((link) => (
                        <a
                          key={`${project.title}-${link.label}`}
                          className="rounded-full border border-brand/30 bg-brand-cream/15 px-3 py-1 text-brand-cream transition hover:border-brand hover:text-brand"
                          href={link.href}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-brand/15 bg-brand-cream/95 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="section-heading">Platforms &amp; Pipelines</h2>
              <p className="section-subtitle mt-2 max-w-2xl">
                A systems view of initiatives I lead—from Azure-native LLM safety to blockchain-assisted housing journeys.
              </p>
            </div>
            <Button variant="outline" href="https://www.linkedin.com/in/srihari-r-006034176/" className="border-brand text-brand hover:text-brand-light">
              Connect on LinkedIn
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pipelines.map((pipeline) => (
              <article
                key={pipeline.name}
                className="rounded-3xl border border-brand/15 bg-white/80 p-6 shadow-lg transition hover:-translate-y-1 hover:border-brand hover:shadow-card"
              >
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-semibold text-brand-deep">{pipeline.name}</p>
                  <span className="rounded-full bg-brand-deep/10 px-3 py-1 text-xs uppercase tracking-wide text-brand">
                    {pipeline.status}
                  </span>
                </div>
                <p className="mt-4 text-lg font-semibold text-brand-deep">{pipeline.highlight}</p>
                <p className="mt-3 text-sm text-brand-ink/70">{pipeline.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand/15 bg-brand-deep text-brand-cream">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="section-heading text-brand-cream">Let’s launch the next civic impact wave.</h2>
          <p className="mt-4 text-base text-brand-cream/80">
            From hypothesis to deployed model, I help public-minded teams operationalize AI so insights land with the communities that need them most.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="mailto:thealphacubicle.dev@gmail.com">Start a conversation</Button>
            <Button to="/resume" variant="secondary" className="border-brand/40 bg-transparent text-brand-cream">
              View Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
