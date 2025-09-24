import React from 'react';
import Button from '../components/Button';

const experience = [
  {
    role: 'Software Engineering Intern',
    company: 'Fyras Solutions',
    location: 'Seattle, WA',
    period: 'Apr 2025 – Present',
    achievements: [
      'Architected AI content moderation service for an MVP firewall product to protect digital community spaces, reducing PII redaction time by 80% via async NLP inference models.',
      'Engineered Azure-based client authorization system that improved scalability and auditing coverage by 75% for accountable civic deployments.',
      'Built dynamic rule-set editor for LLM firewall, enabling stakeholders to encode localized safety policies across tenants.'
    ]
  },
  {
    role: 'R&D Data Science Co-Op',
    company: 'Procter & Gamble (Gillette)',
    location: 'Boston, MA',
    period: 'Jul 2024 – Dec 2024',
    achievements: [
      'Built two end-to-end Databricks pipelines for embedded systems telemetry, boosting processing efficiency by 95% and supporting safer consumer hardware programs.',
      'Optimized smart systems pipelines with Delta Live Tables to cut cleaned-data lead times by 85%, accelerating insights for sustainability squads.',
      'Instrumented automated quality checks to surface drift trends for operations partners in near real time, reinforcing responsible analytics practices.'
    ]
  },
  {
    role: 'Undergraduate Research Assistant',
    company: 'Northeastern University (DMSB)',
    location: 'Boston, MA',
    period: 'Sep 2023 – Feb 2024',
    achievements: [
      'Contributed to NLP research framework analyzing 7M+ patent topics for commercialization signals.',
      'Implemented BERT-based transformers with cloud parallelization to process 20+ years of claim data for open academic access.',
      'Visualized insights from word clusters to guide stakeholder narratives and funding proposals for mission-driven innovation.'
    ]
  }
];

const education = [
  {
    school: 'Northeastern University, Boston, MA',
    college: 'Khoury College of Computer Sciences',
    degree: 'B.S. in Data Science & Finance',
    period: 'Jan 2023 – Present',
    gpa: '3.83 / 4.0 GPA',
    highlights: [
      'Dean’s List (DMSB)',
      'NU DATA Club — Data Researcher',
      'AI Northeastern — Club Member',
      'Knack — Peer Tutor',
      'NU Aaroh — Lead Musician'
    ],
    coursework: [
      'Blockchain in Finance',
      'Algorithmic Robo Trading',
      'Database Design',
      'Business Statistics',
      'Supply Chain'
    ]
  }
];

const skills = {
  languages: ['Python', 'SQL (Spark SQL, RediSQL, MQL)', 'Java', 'HTML', 'CSS', 'Solidity'],
  technologies: [
    'AWS',
    'Microsoft Azure',
    'Databricks',
    'Apache Spark',
    'Docker',
    'MLflow',
    'Django',
    'MongoDB',
    'scikit-learn',
    'Hugging Face',
    'Tableau',
    'Jira',
    'JMP Statistics',
    'RedisDB',
    'GitHub Actions'
  ],
  certifications: ['AWS Certified Cloud Practitioner', 'Databricks Lakehouse Fundamentals']
};

const projects = [
  {
    name: 'ClassRAG: Experiment-Based RAG Pipeline System',
    links: [
      { label: 'GitHub', href: 'https://github.com/thealphacubicle/ClassRAG' }
    ],
    timeline: 'Feb 2025 – Present',
    highlights: [
      'Designed modular “plug-and-play” RAG framework, reducing pipeline construction overhead by 70% for education support tools.',
      'Automated experiments testing 480+ build combinations to recommend optimal architectures by query type, ensuring equitable information access.'
    ]
  },
  {
    name: 'BlockchainViz: Real-Time Dashboarding on Bitcoin’s Network',
    links: [
      { label: 'GitHub', href: 'https://github.com/thealphacubicle/Amtrak-Review-Analysis' },
      { label: 'Medium', href: 'https://medium.com/@srihari.raman/a-real-time-discovery-of-bitcoin-through-tableau-345c94681cc1' }
    ],
    timeline: 'Feb 2024 – Jun 2024',
    highlights: [
      'Built end-to-end data pipeline handling 450+ batches of Bitcoin blockchain data to improve transparency in decentralized finance.',
      'Developed Tableau dashboard querying 5,000+ MongoDB records in real time to surface equitable profitability insights for independent miners.'
    ]
  },
  {
    name: 'Linguisight: NLP Analysis Framework',
    links: [
      { label: 'GitHub', href: 'https://github.com/thealphacubicle/Linguisight' }
    ],
    timeline: 'Nov 2023 – Jan 2024',
    highlights: [
      'Architected a three-tier NLP framework to streamline textual data exploration for research and non-profit partners.',
      'Led a 3-person engineering team to deliver an MVP with strong cadence, documentation, and stakeholder demos focused on impact storytelling.'
    ]
  }
];

const professionalLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/srihari-r-006034176/' },
  { label: 'GitHub', href: 'https://github.com/thealphacubicle' }
];

function Resume() {
  return (
    <div className="bg-brand-cream text-brand-ink">
      <section className="border-b border-brand/20 bg-gradient-to-br from-brand-deep via-brand to-brand-deep text-brand-cream">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-muted">Resume</p>
              <h1 className="mt-3 text-4xl font-heading font-semibold text-brand-cream">Srihari Raman</h1>
              <p className="mt-4 max-w-xl text-base text-brand-cream/80">
                Civic technologist blending data science, blockchain, and microservice architecture to deploy AI that uplifts
                social programs, public benefits, and community-first services.
              </p>
            </div>
            <Button href="/resume.pdf" download variant="secondary" className="border-brand/40 bg-transparent text-brand-cream">
              Download PDF
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-brand/10 bg-brand-cream/95">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="section-heading">Technical Skills</h2>
          <p className="section-subtitle mt-2">Tooling, languages, and certifications powering equitable AI and digital service delivery.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-brand/15 bg-white/80 p-6 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-muted">Languages</p>
              <ul className="mt-4 space-y-2 text-sm text-brand-ink/80">
                {skills.languages.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-brand/15 bg-white/80 p-6 shadow-lg md:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-muted">Technologies &amp; Libraries</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-wide text-brand-muted">
                {skills.technologies.map((tech) => (
                  <span key={tech} className="rounded-full border border-brand/20 bg-brand-sand px-3 py-1 text-brand-deep">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-brand/15 bg-white/80 p-6 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-muted">Certifications</p>
              <ul className="mt-4 space-y-2 text-sm text-brand-ink/80">
                {skills.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-brand/10 bg-brand-cream/95">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="section-heading">Experience</h2>
          <p className="section-subtitle mt-2">Delivering responsible AI, data platforms, and experimentation engines for public good initiatives.</p>
          <div className="mt-10 space-y-10">
            {experience.map((role) => (
              <article
                key={role.company}
                className="rounded-3xl border border-brand/15 bg-white/80 p-8 shadow-lg transition hover:-translate-y-1 hover:border-brand hover:shadow-card"
              >
                <header className="flex flex-col gap-3 border-b border-brand/10 pb-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-deep">{role.role}</h3>
                    <p className="text-sm text-brand">{role.company}</p>
                  </div>
                  <div className="text-right text-xs uppercase tracking-wide text-brand-muted">
                    <p>{role.period}</p>
                    <p className="mt-1 text-brand-muted/90">{role.location}</p>
                  </div>
                </header>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-brand-ink/70">
                  {role.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-brand/10 bg-brand-sand/70">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="section-heading">Education</h2>
              {education.map((item) => (
                <div key={item.school} className="mt-8 space-y-6">
                  <div className="rounded-2xl border border-brand/15 bg-white/85 p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-brand-deep">{item.school}</h3>
                    <p className="mt-1 text-sm text-brand">{item.college}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-brand-muted">{item.period}</p>
                    <p className="mt-4 text-sm font-medium text-brand-deep/80">{item.degree}</p>
                    <p className="mt-2 text-xs uppercase tracking-wide text-brand-muted">{item.gpa}</p>
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wide text-brand-muted">Awards &amp; Activities</p>
                      <ul className="mt-2 space-y-2 text-sm text-brand-ink/70">
                        {item.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wide text-brand-muted">Relevant Coursework</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs uppercase tracking-wide text-brand-muted">
                        {item.coursework.map((course) => (
                          <span key={course} className="rounded-full border border-brand/20 bg-brand-cream px-3 py-1 text-brand-deep">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2 className="section-heading">Details</h2>
              <p className="section-subtitle mt-2">Quick facts &amp; ways to connect with the mission.</p>
              <dl className="mt-6 space-y-4 text-sm text-brand-ink/75">
                <div>
                  <dt className="font-medium text-brand-deep">Location</dt>
                  <dd className="mt-1 text-brand-muted">Boston, MA (open to remote)</dd>
                </div>
                <div>
                  <dt className="font-medium text-brand-deep">Email</dt>
                  <dd className="mt-1">
                    <a className="text-brand hover:text-brand-light" href="mailto:srihari.raman@northeastern.edu">
                      srihari.raman@northeastern.edu
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-brand-deep">Focus</dt>
                  <dd className="mt-1 text-brand-muted">Civic AI · Social Impact Microservices · Responsible Experimentation</dd>
                </div>
                <div>
                  <dt className="font-medium text-brand-deep">Links</dt>
                  <dd className="mt-2 space-y-1">
                    {professionalLinks.map((link) => (
                      <div key={link.href}>
                        <a className="text-brand hover:text-brand-light" href={link.href}>
                          {link.label}
                        </a>
                      </div>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-brand/10 bg-brand-cream/95">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="section-heading">Select Projects</h2>
              <p className="section-subtitle mt-2">
                Independent initiatives exploring the edges of civic infrastructure, experimentation, and storytelling.
              </p>
            </div>
            <Button variant="outline" href="mailto:srihari.raman@northeastern.edu" className="border-brand text-brand hover:text-brand-light">
              Request a demo
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.name}
                className="flex h-full flex-col justify-between rounded-3xl border border-brand/15 bg-white/80 p-6 shadow-lg transition hover:-translate-y-1 hover:border-brand hover:shadow-card"
              >
                <div>
                  <p className="text-lg font-semibold text-brand-deep">{project.name}</p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-brand-muted">{project.timeline}</p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-brand-ink/70">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-wide text-brand-muted">
                  {project.links.map((link) => (
                    <a
                      key={`${project.name}-${link.label}`}
                      className="rounded-full border border-brand/20 bg-brand-sand px-3 py-1 text-brand-deep transition hover:border-brand hover:text-brand"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-deep text-brand-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="section-heading text-brand-cream">References available upon request</h2>
          <p className="mt-4 text-base text-brand-cream/80">
            Partnering with teams advancing social welfare tech. Reach out for deeper case studies or to co-create the next civic impact wave.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="mailto:srihari.raman@northeastern.edu">Schedule a chat</Button>
            <Button to="/" variant="secondary" className="border-brand/40 bg-transparent text-brand-cream">
              Return home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resume;
