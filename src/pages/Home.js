import React from 'react';
import Button from '../components/Button';

const capabilities = [
  'LLM Integration & Fine-tuning',
  'RAG Pipeline Architecture',
  'Multi-Agent Orchestration',
  'Production AI Deployment',
];

const interests = [
  {
    title: 'LLM Safety & Guardrails',
    caption: 'Redaction, policy tuning, and feedback loops for enterprise AI firewall systems.'
  },
  {
    title: 'Multi-Agent Systems',
    caption: 'Cooperative LLM agents that orchestrate multi-step workflows and automate operational processes.'
  },
  {
    title: 'Production AI Infrastructure',
    caption: 'The monitoring, deployment pipelines, and tooling that keep AI systems running once they leave the notebook.'
  }
];

const projects = [
  {
    title: 'ClassRAG: Experiment-Based RAG Pipeline System',
    description:
      'Modular RAG framework that runs 480+ automated experiments to recommend architecture pairings by query intent.',
    tags: ['LangChain', 'Hugging Face', 'Redis', 'FastAPI'],
    links: [
      { label: 'GitHub', href: 'https://github.com/thealphacubicle/ClassRAG' }
    ]
  },
  {
    title: 'OpenContext: Production MCP for Government OpenData',
    description:
      'Template-style platform that lets city entities and governments deploy production MCP servers for their OpenData portals.',
    tags: ['MCP', 'AWS Bedrock', 'Claude', 'Multi-Agent AI'],
    links: [
      { label: 'View Project', href: 'https://thealphacubicle.dev/OpenContext-Site/' }
    ]
  },
  {
    title: 'Linguisight: NLP Analysis Framework',
    description:
      'Three-tier NLP toolkit that lets teams explore 7M+ patents through topic clustering, embeddings, and narrative reporting.',
    tags: ['PyTorch', 'BERT', 'Azure', 'Dash'],
    links: [
      { label: 'GitHub', href: 'https://github.com/thealphacubicle/Linguisight' }
    ]
  }
];

const pipelines = [
  {
    name: 'OpenContext',
    status: 'In Production',
    highlight: 'Production MCP for government OpenData',
    description: 'Template-style platform that packages MCP server infrastructure for municipal OpenData portals.',
    href: 'https://thealphacubicle.dev/OpenContext-Site/'
  },
  {
    name: 'Fyras Solutions LLM Firewall',
    status: 'Handed Off',
    highlight: 'Enterprise PII moderation and policy tuning',
    description: 'Async NLP inference and rule-authoring system built for the Fyras Solutions firewall MVP.'
  },
  {
    name: 'Gillette Databricks IoT Integration',
    status: 'Shipped',
    highlight: '95% processing-efficiency gain',
    description: 'Delta Live Tables pipelines and quality checks powering Gillette embedded-systems analytics.'
  }
];

function Home() {
  return (
    <div>
      {/* Hero — centered, name-forward */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto flex max-w-content flex-col items-center px-6 py-section text-center">
          <p className="eyebrow">AI Engineer & Implementation Consultant</p>
          <h1 className="mt-8 text-5xl font-medium leading-[1.02] tracking-tight text-ink-black dark:text-white sm:text-7xl lg:text-8xl">
            Srihari Raman
          </h1>
          <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-ink-700 dark:text-ink-300">
            I build LLM systems that run in production: RAG pipelines, multi-agent workflows, and the
            infrastructure behind them. Recent work includes government OpenData platforms, an enterprise
            AI firewall, and industrial data pipelines.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button to="/consulting">Consulting Services</Button>
            <Button href="https://koalendar.com/e/discovery-call-with-srihari" variant="secondary">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Capabilities + Currently Exploring — bento */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto max-w-content px-6 py-section">
          <p className="eyebrow">Capabilities</p>
          <h2 className="section-heading mt-4">What I build</h2>
          <p className="section-subtitle mt-4 max-w-[65ch]">
            From LLM integration to multi-agent orchestration, I build AI systems teams can actually deploy and maintain.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {capabilities.map((skill) => (
              <span key={skill} className="tag">
                {skill}
              </span>
            ))}
          </div>

          <p className="eyebrow mt-section">Currently Exploring</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {interests.map((interest, index) => (
              <article
                key={interest.title}
                className={`card card-hover p-8 ${index === 2 ? 'md:col-span-2' : ''}`}
              >
                <h3 className="text-lg font-medium text-ink-black dark:text-white">{interest.title}</h3>
                <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                  {interest.caption}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto max-w-content px-6 py-section">
          <p className="eyebrow">Selected Projects</p>
          <h2 className="section-heading mt-4">Production AI systems</h2>
          <p className="section-subtitle mt-4 max-w-[65ch]">
            LLM, RAG, and enterprise AI infrastructure I've built and shipped for real teams.
          </p>
          <div className="mt-8 grid gap-6">
            {projects.map((project) => (
              <article key={project.title} className="card card-hover p-8">
                <h3 className="text-lg font-medium text-ink-black dark:text-white">{project.title}</h3>
                <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.links.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-4">
                    {project.links.map((link) => (
                      <a
                        key={`${project.title}-${link.label}`}
                        className="font-mono text-xs text-accent transition-colors hover:text-accent-dark dark:hover:text-accent-muted"
                        href={link.href}
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms & Pipelines */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto max-w-content px-6 py-section">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Platforms & Pipelines</p>
              <h2 className="section-heading mt-4">Shipped work</h2>
              <p className="section-subtitle mt-4 max-w-[60ch]">
                From enterprise LLM firewalls to the data pipelines that feed them.
              </p>
            </div>
            <Button href="https://www.linkedin.com/in/srihari-r-006034176/" variant="secondary">
              Connect on LinkedIn
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pipelines.map((pipeline) => (
              <article key={pipeline.name} className="card card-hover flex flex-col p-8">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-base font-medium text-ink-black dark:text-white">{pipeline.name}</p>
                </div>
                <span className="tag mt-4 self-start">{pipeline.status}</span>
                <p className="mt-4 text-sm font-medium text-ink-black dark:text-white">{pipeline.highlight}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-700 dark:text-ink-300">{pipeline.description}</p>
                {pipeline.href && (
                  <a
                    href={pipeline.href}
                    className="mt-6 font-mono text-xs text-accent transition-colors hover:text-accent-dark dark:hover:text-accent-muted"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project →
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section>
        <div className="mx-auto max-w-content px-6 py-section">
          <p className="eyebrow">Get in touch</p>
          <h2 className="section-heading mt-4 max-w-[20ch]">Building an AI system? Let's talk specifics.</h2>
          <p className="section-subtitle mt-4 max-w-[60ch]">
            From first architecture sketch to the day it goes live, I help teams ship AI they can rely on.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="https://koalendar.com/e/discovery-call-with-srihari">
              Schedule a Consultation
            </Button>
            <Button to="/consulting" variant="secondary">
              Learn About Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
