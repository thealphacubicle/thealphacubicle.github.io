import React from 'react';
import Button from '../components/Button';

const skills = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'Design Systems',
  'Accessibility',
];

const interests = ['UI/UX Design', 'Design Ops', 'Mentorship', 'Open Source', 'Performance'];

function Home() {
  return (
    <div className="bg-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/10 via-transparent to-brand/5" />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:items-center">
          <div className="max-w-xl text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-muted">{/* Update tagline */}Product Designer</p>
            <h1 className="mt-4 text-4xl font-heading font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {/* Replace with your name and title */}
              Hello, I'm <span className="text-brand">Your Name</span>. I design & build experiences.
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              {/* Replace the paragraph below with your bio */}
              I'm a multidisciplinary product designer and front-end developer focused on crafting human-centered digital
              experiences. I combine thoughtful design, scalable systems, and clean code to bring ideas to life.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button to="/resume">View Resume</Button>
              <Button href="mailto:hello@example.com" variant="secondary">
                Contact Me
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-brand/20 blur-3xl" aria-hidden="true" />
            <img
              src="/profile-placeholder.svg"
              alt="Profile placeholder"
              className="relative mx-auto h-56 w-56 rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-white/5 object-cover shadow-xl shadow-black/40 ring-1 ring-white/10 sm:h-72 sm:w-72"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="section-heading">Skills &amp; Expertise</h2>
              <p className="mt-4 text-base text-slate-300">
                {/* Update this list with your top technical and creative skills */}
                With a blend of design and engineering expertise, I translate complex requirements into engaging, intuitive
                interfaces. Recent work includes building scalable design systems and high-impact product features.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-brand hover:text-brand"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="section-heading">Currently Interested In</h2>
              <p className="mt-4 text-base text-slate-300">
                {/* Share the topics or focus areas you are excited about */}
                I'm passionate about inclusive design, thoughtful collaboration, and tooling that accelerates teams. Beyond
                work, I love exploring emerging tech, mentoring early-career designers, and experimenting with creative
                coding.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {interests.map((interest) => (
                  <li
                    key={interest}
                    className="group rounded-xl border border-white/5 bg-white/[0.04] p-4 transition hover:-translate-y-1 hover:border-brand hover:bg-white/10"
                  >
                    <p className="text-sm font-medium text-white">{interest}</p>
                    <p className="mt-2 text-xs text-brand-muted">
                      {/* Optional: add short descriptions */}Always exploring new ways to connect design and engineering.
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="section-heading">Let's build something meaningful.</h2>
          <p className="mt-4 text-base text-slate-300">
            {/* Update the call-to-action below */}
            Whether you're launching a new product or refining an existing experience, I'm ready to collaborate and ship
            exceptional work.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="mailto:hello@example.com">Start a conversation</Button>
            <Button to="/resume" variant="secondary">
              Explore my experience
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
