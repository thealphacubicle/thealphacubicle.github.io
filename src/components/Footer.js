import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand/20 bg-brand-deep text-brand-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">Srihari Raman</h3>
          <p className="mt-3 text-sm text-brand-cream/80">
            AI Engineer and Implementation Consultant. Designing and deploying production-ready AI systems that drive business value.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              Email:{' '}
              <a className="text-brand-light hover:text-brand" href="mailto:thealphacubicle.dev@gmail.com">
                thealphacubicle.dev@gmail.com
              </a>
            </li>
            <li>Location: Boston, MA · Remote friendly</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">Follow</h4>
          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
            {/* Replace # with your social profile links */}
            <li>
              <a className="text-brand-light transition hover:text-brand" href="https://www.linkedin.com/in/srihari-r-006034176/" aria-label="LinkedIn">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="text-brand-light transition hover:text-brand" href="https://github.com/thealphacubicle" aria-label="GitHub">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand/25 bg-brand-ink/60 py-4">
        <p className="mx-auto max-w-6xl px-6 text-xs text-brand-muted">
          &copy; {year} Srihari Raman. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
