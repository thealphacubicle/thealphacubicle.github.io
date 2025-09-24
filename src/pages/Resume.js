import React from 'react';
import Button from '../components/Button';

const experience = [
  {
    role: 'Senior Product Designer',
    company: 'Forward Studio',
    period: '2021 — Present',
    achievements: [
      'Led design for a SaaS analytics platform adopted by 50+ enterprise teams.',
      'Built a robust design system that reduced delivery time by 40%.',
      'Partnered with engineering to launch accessibility-first UI components.',
    ],
  },
  {
    role: 'Product Designer',
    company: 'Studio North',
    period: '2018 — 2021',
    achievements: [
      'Shipped a new onboarding experience that increased activation by 27%.',
      'Introduced user research rituals to align cross-functional teams.',
    ],
  },
];

const education = [
  {
    school: 'University of Somewhere',
    degree: 'B.A. in Interaction Design',
    period: '2014 — 2018',
  },
];

function Resume() {
  return (
    <div className="bg-slate-900">
      <section className="border-b border-white/5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-muted">Resume</p>
              <h1 className="mt-3 text-4xl font-heading font-semibold text-white">{/* Replace with your name */}Your Name</h1>
              <p className="mt-4 max-w-xl text-base text-slate-300">
                {/* Customize the summary below */}
                Product designer & front-end developer with 6+ years crafting elegant, performant digital experiences. I
                thrive in collaborative environments that balance strategy, research, and hands-on making.
              </p>
            </div>
            <Button href="/resume.pdf" download>
              Download PDF
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="section-heading">Experience</h2>
          <p className="section-subtitle mt-2">
            {/* Update each role below with your real experience */}
            A snapshot of recent projects, impact, and responsibilities.
          </p>
          <div className="mt-10 space-y-10">
            {experience.map((job) => (
              <article
                key={job.role}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_10px_40px_-20px_rgba(14,165,233,0.45)] transition hover:border-brand hover:shadow-glow"
              >
                <header className="flex flex-col gap-3 border-b border-white/5 pb-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                    <p className="text-sm text-brand-light">{job.company}</p>
                  </div>
                  <span className="text-xs uppercase tracking-wide text-brand-muted">{job.period}</span>
                </header>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
                  {job.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 bg-slate-900/60">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="section-heading">Education</h2>
              <p className="section-subtitle mt-2">Formal education & ongoing learning.</p>
              <div className="mt-8 space-y-6">
                {education.map((item) => (
                  <div key={item.school} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <h3 className="text-lg font-semibold text-white">{item.school}</h3>
                    <p className="mt-1 text-sm text-brand-light">{item.degree}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-brand-muted">{item.period}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="section-heading">Details</h2>
              <p className="section-subtitle mt-2">Essentials for quick reference.</p>
              <dl className="mt-6 space-y-4 text-sm text-slate-300">
                <div>
                  <dt className="font-medium text-white">Location</dt>
                  <dd className="mt-1 text-brand-muted">{/* Update location */}Remote / Your City</dd>
                </div>
                <div>
                  <dt className="font-medium text-white">Email</dt>
                  <dd className="mt-1">
                    <a className="text-brand-light hover:text-brand" href="mailto:hello@example.com">
                      hello@example.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-white">Portfolio</dt>
                  <dd className="mt-1">
                    <a className="text-brand-light hover:text-brand" href="https://example.com">
                      https://example.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-white">Focus</dt>
                  <dd className="mt-1 text-brand-muted">Design Systems · Product Strategy · Front-end Development</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="section-heading">References available upon request</h2>
          <p className="mt-4 text-base text-slate-300">
            {/* Share next steps or preferred ways to connect */}
            I'm excited to learn about your team's goals. Feel free to reach out for case studies, design systems work, or
            collaboration opportunities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="mailto:hello@example.com">Schedule a chat</Button>
            <Button to="/" variant="secondary">
              Return home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resume;
