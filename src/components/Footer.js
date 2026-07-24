import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-300 bg-white dark:border-ink-700 dark:bg-ink-black">
      <div className="mx-auto grid max-w-content gap-8 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="text-base font-medium tracking-tight text-ink-black dark:text-white">Srihari Raman</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-500">
            AI Engineer & Implementation Consultant. I design and deploy production LLM systems.
          </p>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-700 dark:text-ink-300">
            <li>
              <a
                className="text-accent transition-colors hover:text-accent-dark dark:hover:text-accent-muted"
                href="mailto:thealphacubicle.dev@gmail.com"
              >
                thealphacubicle.dev@gmail.com
              </a>
            </li>
            <li>Boston, MA · Open to remote</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Follow</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                className="text-accent transition-colors hover:text-accent-dark dark:hover:text-accent-muted"
                href="https://www.linkedin.com/in/srihari-r-006034176/"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="text-accent transition-colors hover:text-accent-dark dark:hover:text-accent-muted"
                href="https://github.com/thealphacubicle"
                aria-label="GitHub"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-300 dark:border-ink-700">
        <p className="mx-auto max-w-content px-6 py-6 font-mono text-xs uppercase tracking-[0.15em] text-ink-500">
          &copy; {year} Srihari Raman
        </p>
      </div>
    </footer>
  );
}

export default Footer;
