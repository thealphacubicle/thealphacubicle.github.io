import React from 'react';
import Button from '../components/Button';

const services = [
  {
    title: 'AI System Architecture & Design',
    description: 'I design the architecture for your AI system: LLM integration, multi-agent orchestration, and RAG pipelines, shaped around what you actually need to build.',
    highlights: [
      'Custom LLM integration and fine-tuning',
      'Multi-agent system design and orchestration',
      'RAG pipeline architecture and optimization',
      'Cloud architecture for AI workloads'
    ]
  },
  {
    title: 'AI Implementation & Deployment',
    description: 'I take the system from prototype to production and handle the hard parts: models, infrastructure, pipelines, and monitoring.',
    highlights: [
      'Production AI model deployment',
      'Cloud infrastructure setup (AWS, Azure, GCP)',
      'CI/CD pipelines for generative AI systems',
      'Monitoring and observability for AI systems'
    ]
  },
  {
    title: 'AI Strategy & Consulting',
    description: 'Straight answers on where AI fits, which tools to use, and the trade-offs that decide whether a project ships.',
    highlights: [
      'Where AI fits your business (and where it does not)',
      'Tooling and stack recommendations',
      'Team training and handoff, so your engineers own it'
    ]
  }
];

const expertise = [
  {
    category: 'AI/ML Technologies',
    items: ['LLMs & Prompt Engineering', 'Claude (Anthropic)', 'RAG Systems', 'Multi-Agent Orchestration', 'Model Context Protocol (MCP)', 'Fine-tuning & Transfer Learning', 'NLP & Text Analysis', 'Computer Vision']
  },
  {
    category: 'Infrastructure & Platforms',
    items: ['AWS', 'AWS Bedrock', 'AWS Lambda', 'API Gateway', 'AWS CDK', 'Microsoft Azure', 'Databricks', 'Apache Spark', 'Docker & Kubernetes', 'MLflow', 'Hugging Face']
  },
  {
    category: 'Languages & Frameworks',
    items: ['Python', 'SQL', 'Java', 'LangChain', 'PyTorch', 'scikit-learn', 'FastAPI', 'Django']
  }
];

const process = [
  {
    step: '01',
    title: 'Discovery & Assessment',
    description: 'We map your goals, your current infrastructure, and where AI can help, then turn that into a technical assessment and a concrete plan.'
  },
  {
    step: '02',
    title: 'Design & Architecture',
    description: 'A tailored solution architecture aligned to your requirements, budget, and timeline, including technology selection.'
  },
  {
    step: '03',
    title: 'Implementation & Development',
    description: 'Hands-on development and integration, working with your team to transfer knowledge as we go.'
  },
  {
    step: '04',
    title: 'Deployment & Optimization',
    description: 'Production deployment with monitoring and optimization, so the system performs reliably and scales.'
  }
];

const caseStudies = [
  {
    title: 'Enterprise LLM Firewall System',
    client: 'Fyras Solutions',
    challenge: 'Build a scalable AI content-moderation system for enterprise clients.',
    solution: 'Architected an async NLP inference pipeline with customizable policy tuning, now in MVP development.',
    technologies: ['Azure', 'Python', 'NLP', 'Microservices']
  },
  {
    title: 'OpenContext',
    client: 'Burnes Center for Social Change (City of Boston)',
    challenge: 'Give city entities a repeatable, production-ready way to expose OpenData portals to AI agents via MCP.',
    solution: 'Built OpenContext, a template-style platform packaging MCP server infrastructure for OpenData portals, deployed on AWS Bedrock with Lambda and API Gateway, provisioned via CDK.',
    technologies: ['AWS Bedrock', 'Claude Sonnet 4', 'MCP', 'AWS Lambda', 'API Gateway', 'AWS CDK', 'Multi-Agent AI'],
    href: 'https://thealphacubicle.dev/OpenContext-Site/'
  }
];

function Consulting() {
  return (
    <div>
      {/* Intro */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto max-w-content px-6 py-section">
          <p className="eyebrow">AI Implementation Consulting</p>
          <h1 className="mt-6 max-w-[20ch] text-4xl font-medium leading-tight tracking-tight text-ink-black dark:text-white sm:text-5xl">
            I design and deploy production AI systems.
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ink-700 dark:text-ink-300">
            I take AI systems from the first design through deployment: the architecture, the implementation,
            and the operational work that keeps them running afterward.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="https://koalendar.com/e/discovery-call-with-srihari">
              Schedule a Consultation
            </Button>
            <Button to="/resume" variant="secondary">
              View My Experience
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto max-w-content px-6 py-section">
          <p className="eyebrow">Services</p>
          <h2 className="section-heading mt-4">How I can help</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="card card-hover flex flex-col p-8">
                <h3 className="text-lg font-medium text-ink-black dark:text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-700 dark:text-ink-300">{service.description}</p>
                <ul className="mt-6 space-y-3 border-t border-ink-300 pt-6 dark:border-ink-700">
                  {service.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm text-ink-700 dark:text-ink-300">
                      <span className="font-mono text-accent" aria-hidden>—</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto max-w-content px-6 py-section">
          <p className="eyebrow">Technical Expertise</p>
          <h2 className="section-heading mt-4">The stack</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {expertise.map((category) => (
              <div key={category.category} className="card p-8">
                <p className="eyebrow">{category.category}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto max-w-content px-6 py-section">
          <p className="eyebrow">Implementation Process</p>
          <h2 className="section-heading mt-4">A structured approach</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <article key={item.step} className="card card-hover p-8">
                <span className="font-mono text-sm text-ink-500">{item.step}</span>
                <h3 className="mt-4 text-base font-medium text-ink-black dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-700 dark:text-ink-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto max-w-content px-6 py-section">
          <p className="eyebrow">Case Studies</p>
          <h2 className="section-heading mt-4">Selected engagements</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {caseStudies.map((study) => (
              <article key={study.title} className="card card-hover flex flex-col p-8">
                <p className="eyebrow">{study.client}</p>
                <h3 className="mt-3 text-lg font-medium text-ink-black dark:text-white">{study.title}</h3>
                <div className="mt-6 flex-1 space-y-4 border-t border-ink-300 pt-6 dark:border-ink-700">
                  <div>
                    <p className="font-mono text-xs text-ink-500">Challenge</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-ink-300">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-ink-500">Solution</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-ink-300">{study.solution}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {study.technologies.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
                {study.href && (
                  <a
                    href={study.href}
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

      {/* CTA — single wide card */}
      <section>
        <div className="mx-auto max-w-content px-6 py-section">
          <div className="card p-12">
            <p className="eyebrow">Get in touch</p>
            <h2 className="section-heading mt-4 max-w-[24ch]">Let's discuss what you're building.</h2>
            <p className="section-subtitle mt-4 max-w-[60ch]">
              Flexible engagement models, from strategic consulting to full implementation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="https://koalendar.com/e/discovery-call-with-srihari">
                Schedule a Discovery Call
              </Button>
              <Button to="/" variant="secondary">
                Learn More About Me
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Consulting;
