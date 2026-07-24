import React from 'react';
import Button from '../components/Button';

const experience = [
  {
    role: 'AI Engineer',
    company: 'Burnes Center for Social Change',
    location: 'Boston, MA',
    period: 'Sep 2025 – Present',
    achievements: [
      'Built OpenContext, a template-style platform that lets city entities and governments deploy production MCP servers for their OpenData portals, integrating 200+ municipal datasets for real-time AI agent access.',
      'Architected a multi-agent AI system on Claude Sonnet 4 over OpenContext to automate process-improvement workflows for Boston city employees, enabling autonomous data retrieval and analysis.',
      'Deployed cloud infrastructure with AWS Bedrock, Lambda, API Gateway, and CDK for Infrastructure as Code, ensuring reliable performance for city department stakeholders.'
    ]
  },
  {
    role: 'Part-Time Technical Director',
    company: 'Fyras Solutions',
    location: 'Seattle, WA',
    period: 'Apr 2025 – Dec 2025',
    achievements: [
      'Architected an AI content-moderation service for an MVP firewall product, reducing PII redaction time by 80% via async NLP inference models.',
      'Engineered an Azure-based client authorization system that improved scalability and auditing coverage by 75%.',
      'Built a dynamic rule-set editor for the LLM firewall, letting stakeholders encode localized safety policies across tenants.'
    ]
  },
  {
    role: 'Undergraduate Peer Tutor',
    company: 'Northeastern University',
    location: 'Boston, MA',
    period: 'Sep 2023 – Present',
    achievements: [
      'Tutored 65+ students in Data Science Fundamentals, Advanced Database Systems, and Business Statistics.',
      'Completed 190+ hours of tutoring, helping students build a solid grasp of core concepts.',
      'Mentoring a cohort of 5+ peer tutors to improve communication between administrators and tutors.',
      'Earned a CRLA L1 Peer Tutoring Certification.'
    ]
  },
  {
    role: 'R&D Data Science Co-Op',
    company: 'Procter & Gamble (Gillette)',
    location: 'Boston, MA',
    period: 'Jul 2024 – Dec 2024',
    achievements: [
      'Built two end-to-end Databricks pipelines for embedded-systems telemetry, boosting processing efficiency by 95%.',
      'Optimized smart-systems pipelines with Delta Live Tables to cut cleaned-data lead times by 85%.',
      'Instrumented automated quality checks to surface drift trends for operations partners in near real time.'
    ]
  },
  {
    role: 'Undergraduate Research Assistant',
    company: 'Northeastern University (DMSB)',
    location: 'Boston, MA',
    period: 'Sep 2023 – Feb 2024',
    achievements: [
      'Contributed to an NLP research framework analyzing 7M+ patent topics for commercialization signals.',
      'Implemented BERT-based transformers with cloud parallelization to process 20+ years of claim data.',
      'Visualized word-cluster insights to guide stakeholder narratives and funding proposals.'
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
      "Dean's List (DMSB)",
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
    'AWS Bedrock',
    'AWS Lambda',
    'API Gateway',
    'AWS CDK',
    'Microsoft Azure',
    'Databricks',
    'Apache Spark',
    'Docker',
    'MLflow',
    'Django',
    'MongoDB',
    'scikit-learn',
    'Hugging Face',
    'Claude (Anthropic)',
    'Model Context Protocol (MCP)',
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
    links: [{ label: 'GitHub', href: 'https://github.com/thealphacubicle/ClassRAG' }],
    timeline: 'Feb 2025 – Present',
    highlights: [
      'Designed a modular "plug-and-play" RAG framework, reducing pipeline construction overhead by 70%.',
      'Automated experiments across 480+ build combinations to recommend optimal architectures by query type.'
    ]
  },
  {
    name: 'OpenContext: Production MCP for Government OpenData',
    links: [{ label: 'View Project', href: 'https://thealphacubicle.dev/OpenContext-Site/' }],
    timeline: 'Sep 2025 – Present',
    highlights: [
      'Built a template-style platform that lets governments deploy production MCP servers for their OpenData portals.',
      'Integrated 200+ municipal datasets via custom MCP servers for real-time AI agent access to city operations data.'
    ]
  },
  {
    name: 'Linguisight: NLP Analysis Framework',
    links: [{ label: 'GitHub', href: 'https://github.com/thealphacubicle/Linguisight' }],
    timeline: 'Nov 2023 – Jan 2024',
    highlights: [
      'Architected a three-tier NLP framework to streamline textual-data exploration for research and non-profit partners.',
      'Led a 3-person engineering team to deliver an MVP with strong cadence, documentation, and stakeholder demos.'
    ]
  }
];

const professionalLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/srihari-r-006034176/' },
  { label: 'GitHub', href: 'https://github.com/thealphacubicle' }
];

function Resume() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto max-w-content px-6 py-section">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="eyebrow">Resume</p>
              <h1 className="mt-6 text-4xl font-medium tracking-tight text-ink-black dark:text-white">Srihari Raman</h1>
              <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-700 dark:text-ink-300">
                AI Engineer & Implementation Consultant specializing in LLM integration, RAG systems, and production
                AI infrastructure.
              </p>
            </div>
            <Button href="/resume.pdf" download>
              Download PDF
            </Button>
          </div>
        </div>
      </section>

      {/* Technical Skills — bento */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto max-w-content px-6 py-section">
          <p className="eyebrow">Technical Skills</p>
          <h2 className="section-heading mt-4">Languages, tools & certifications</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-12">
            <div className="card p-8 md:col-span-4">
              <p className="eyebrow">Languages</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-700 dark:text-ink-300">
                {skills.languages.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="card p-8 md:col-span-8">
              <p className="eyebrow">Technologies & Libraries</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.technologies.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="card p-8 md:col-span-4">
              <p className="eyebrow">Certifications</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-700 dark:text-ink-300">
                {skills.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience — stacked list */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto max-w-content px-6 py-section">
          <p className="eyebrow">Experience</p>
          <h2 className="section-heading mt-4">Where I've worked</h2>
          <div className="mt-10 divide-y divide-ink-300 dark:divide-ink-700">
            {experience.map((role) => (
              <article key={`${role.company}-${role.period}`} className="py-8 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-ink-black dark:text-white">{role.role}</h3>
                    <p className="text-sm text-ink-500">{role.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <span className="font-mono text-xs text-ink-500">{role.period}</span>
                    <span className="font-mono text-xs text-ink-500">{role.location}</span>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {role.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                      <span className="font-mono text-accent" aria-hidden>—</span>
                      <span className="max-w-[75ch]">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Education + Details */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto grid max-w-content gap-6 px-6 py-section lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">Education</p>
            {education.map((item) => (
              <div key={item.school} className="card mt-6 p-8">
                <h3 className="text-lg font-medium text-ink-black dark:text-white">{item.school}</h3>
                <p className="mt-1 text-sm text-ink-500">{item.college}</p>
                <p className="eyebrow mt-2">{item.period}</p>
                <p className="mt-4 text-sm font-medium text-ink-black dark:text-white">{item.degree}</p>
                <p className="eyebrow mt-1">{item.gpa}</p>
                <div className="mt-6 border-t border-ink-300 pt-6 dark:border-ink-700">
                  <p className="eyebrow">Awards & Activities</p>
                  <ul className="mt-3 space-y-2 text-sm text-ink-700 dark:text-ink-300">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <p className="eyebrow">Relevant Coursework</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.coursework.map((course) => (
                      <span key={course} className="tag">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <p className="eyebrow">Details</p>
            <dl className="mt-6 space-y-6 text-sm">
              <div>
                <dt className="eyebrow">Location</dt>
                <dd className="mt-1 text-ink-700 dark:text-ink-300">Boston, MA · Open to remote</dd>
              </div>
              <div>
                <dt className="eyebrow">Email</dt>
                <dd className="mt-1">
                  <a
                    className="text-accent transition-colors hover:text-accent-dark dark:hover:text-accent-muted"
                    href="mailto:thealphacubicle.dev@gmail.com"
                  >
                    thealphacubicle.dev@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Focus</dt>
                <dd className="mt-1 text-ink-700 dark:text-ink-300">
                  AI Engineering · LLM Implementation · Production AI Systems · Enterprise AI Consulting
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Links</dt>
                <dd className="mt-2 space-y-1">
                  {professionalLinks.map((link) => (
                    <div key={link.href}>
                      <a
                        className="text-accent transition-colors hover:text-accent-dark dark:hover:text-accent-muted"
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    </div>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="border-b border-ink-300 dark:border-ink-700">
        <div className="mx-auto max-w-content px-6 py-section">
          <p className="eyebrow">Selected Projects</p>
          <h2 className="section-heading mt-4">Things I've built</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.name} className="card card-hover flex flex-col p-8">
                <h3 className="text-base font-medium text-ink-black dark:text-white">{project.name}</h3>
                <p className="eyebrow mt-2">{project.timeline}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                      <span className="font-mono text-accent" aria-hidden>—</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-4">
                  {project.links.map((link) => (
                    <a
                      key={`${project.name}-${link.label}`}
                      className="font-mono text-xs text-accent transition-colors hover:text-accent-dark dark:hover:text-accent-muted"
                      href={link.href}
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-content px-6 py-section">
          <p className="eyebrow">Get in touch</p>
          <h2 className="section-heading mt-4 max-w-[24ch]">Let's talk about your AI system.</h2>
          <p className="section-subtitle mt-4 max-w-[60ch]">
            References and case studies available on request.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="https://koalendar.com/e/discovery-call-with-srihari">
              Schedule a Consultation
            </Button>
            <Button to="/consulting" variant="secondary">
              View Consulting Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resume;
