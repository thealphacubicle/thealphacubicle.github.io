import React from 'react';
import Button from '../components/Button';
import InquiraWidget from '../components/InquiraWidget';

const services = [
  {
    title: 'AI System Architecture & Design',
    description: 'Design scalable AI architectures tailored to your business needs. From LLM integration to multi-agent orchestration, I help you build robust AI systems that deliver measurable results.',
    highlights: [
      'Custom LLM integration and fine-tuning',
      'Multi-agent system design and orchestration',
      'RAG pipeline architecture and optimization',
      'Cloud architecture for AI workloads'
    ]
  },
  {
    title: 'AI Implementation & Deployment',
    description: 'End-to-end implementation of AI solutions from concept to production. I handle the technical complexity so you can focus on business outcomes.',
    highlights: [
      'Production-ready AI model deployment',
      'Cloud infrastructure setup (AWS, Azure, GCP)',
      'CI/CD pipelines for Generative AI systems',
      'Monitoring and observability for AI systems'
    ]
  },
  {
    title: 'AI Strategy & Consulting',
    description: 'Strategic guidance on AI adoption, technology selection, and implementation. I help organizations navigate the AI landscape with confidence.',
    highlights: [
      'AI adoption assessment and strategy',
      'Technology stack recommendations',
      'Team training and knowledge transfer'
    ]
  }
];

const expertise = [
  {
    category: 'AI/ML Technologies',
    items: ['LLMs & Prompt Engineering', 'RAG Systems', 'Multi-Agent Orchestration', 'Fine-tuning & Transfer Learning', 'NLP & Text Analysis', 'Computer Vision']
  },
  {
    category: 'Infrastructure & Platforms',
    items: ['AWS', 'Microsoft Azure', 'Databricks', 'Apache Spark', 'Docker & Kubernetes', 'MLflow', 'Hugging Face']
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
    description: 'We start with understanding your business goals, current infrastructure, and AI opportunities. This includes technical assessment and strategic planning.'
  },
  {
    step: '02',
    title: 'Design & Architecture',
    description: 'I design a tailored AI solution architecture that aligns with your requirements, budget, and timeline. This includes technology selection and system design.'
  },
  {
    step: '03',
    title: 'Implementation & Development',
    description: 'Hands-on development and implementation of your AI solution. I work closely with your team to ensure smooth integration and knowledge transfer.'
  },
  {
    step: '04',
    title: 'Deployment & Optimization',
    description: 'Production deployment with monitoring, optimization, and ongoing support. I ensure your AI system performs reliably and scales with your business.'
  }
];

const caseStudies = [
  {
    title: 'Enterprise LLM Firewall System',
    client: 'Fyras Solutions',
    challenge: 'Build a scalable AI content moderation system for enterprise clients',
    solution: 'Architected async NLP inference pipeline with customizable policy tuning, now currently in MVP development',
    technologies: ['Azure', 'Python', 'NLP', 'Microservices']
  },
  {
    title: 'Launchpad 2.0',
    client: 'City of Boston',
    challenge: 'Create a scalable solution that catered helps city staff complete process improvement projects faster',
    solution: 'Built an full-stack AI-based process improvement website that helps city staff complete process improvement projects faster',
    technologies: ['AI', 'Process Improvement', 'Government Tech', 'Scalable Solutions']
  }
];

function Consulting() {
  return (
    <div className="bg-brand-cream text-brand-ink">
      <section className="border-b border-brand/20 bg-gradient-to-br from-brand-deep via-brand to-brand-deep text-brand-cream">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-sand/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              AI Implementation Consulting
            </span>
            <h1 className="mt-6 text-4xl font-heading font-semibold tracking-tight text-brand-cream sm:text-5xl lg:text-[52px]">
              Transform Your Business with AI
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-cream/80">
              I help organizations design, build, and deploy AI systems that drive real business value. From LLM integration to production-ready AI infrastructure, I deliver end-to-end AI solutions tailored to your needs.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="https://koalendar.com/e/discovery-call-with-srihari?month=2025-10&duration=30&date=2025-10-03">
                Schedule a Consultation
              </Button>
              <Button to="/resume" variant="secondary">
                View My Experience
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-brand/10 bg-brand-cream/95 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="section-heading">Services</h2>
            <p className="section-subtitle mt-2 max-w-2xl mx-auto">
              Comprehensive AI engineering and implementation services to accelerate your AI adoption journey.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="flex h-full flex-col rounded-3xl border border-brand/15 bg-white/80 p-6 shadow-lg transition hover:-translate-y-1 hover:border-brand hover:shadow-card"
              >
                <h3 className="text-xl font-semibold text-brand-deep">{service.title}</h3>
                <p className="mt-4 text-sm text-brand-ink/70">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-brand-ink/70">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-brand/10 bg-brand-sand/70 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="section-heading">Technical Expertise</h2>
          <p className="section-subtitle mt-2">Deep expertise across the modern AI stack.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {expertise.map((category) => (
              <div key={category.category} className="rounded-3xl border border-brand/15 bg-white/80 p-6 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-muted">{category.category}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className="rounded-full border border-brand/20 bg-brand-sand px-3 py-1 text-xs text-brand-deep">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-brand/10 bg-brand-cream/95 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="section-heading">Implementation Process</h2>
          <p className="section-subtitle mt-2">A structured approach to delivering AI solutions that work.</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <article
                key={item.step}
                className="rounded-3xl border border-brand/15 bg-white/80 p-6 shadow-lg transition hover:-translate-y-1 hover:border-brand hover:shadow-card"
              >
                <span className="text-2xl font-heading font-semibold text-brand">{item.step}</span>
                <h3 className="mt-4 text-lg font-semibold text-brand-deep">{item.title}</h3>
                <p className="mt-3 text-sm text-brand-ink/70">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-brand/10 bg-brand-deep text-brand-cream py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="section-heading text-brand-cream">Case Studies</h2>
          <p className="section-subtitle mt-2 text-brand-cream/80">
            Real-world AI implementations delivering measurable business impact.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {caseStudies.map((study) => (
              <article
                key={study.title}
                className="flex h-full flex-col rounded-3xl border border-brand/30 bg-brand-cream/10 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-brand hover:bg-brand-cream/20"
              >
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wide text-brand-muted">{study.client}</p>
                  <h3 className="mt-2 text-lg font-semibold text-brand-cream">{study.title}</h3>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-brand-cream/90">Challenge</p>
                  <p className="mt-1 text-sm text-brand-cream/70">{study.challenge}</p>
                  <p className="mt-4 text-sm font-medium text-brand-cream/90">Solution</p>
                  <p className="mt-1 text-sm text-brand-cream/70">{study.solution}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {study.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-brand/30 bg-brand-cream/10 px-3 py-1 text-xs uppercase tracking-wide text-brand-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream/95 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="section-heading">Ready to Build Your AI Solution?</h2>
          <p className="mt-4 text-base text-brand-ink/70">
            Let's discuss how AI can transform your business. I offer flexible engagement models from strategic consulting to full implementation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="https://koalendar.com/e/discovery-call-with-srihari?month=2025-10&duration=30&date=2025-10-03">
              Schedule a Discovery Call
            </Button>
            <Button to="/" variant="secondary">
              Learn More About Me
            </Button>
          </div>
        </div>
      </section>
      <InquiraWidget />
    </div>
  );
}

export default Consulting;

