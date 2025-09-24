import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-900">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{/* Replace with your name */}Your Name</h3>
          <p className="mt-3 text-sm text-brand-muted">
            {/* Update with your contact details */}
            Available for freelance opportunities and exciting full-time roles. Let's build something great together.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              Email:{' '}
              <a className="text-brand-light hover:text-brand" href="mailto:hello@example.com">
                hello@example.com
              </a>
            </li>
            <li>Location: Remote / Your City</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">Follow</h4>
          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
            {/* Replace # with your social profile links */}
            <li>
              <a className="text-brand-light transition hover:text-brand" href="#" aria-label="LinkedIn">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="text-brand-light transition hover:text-brand" href="#" aria-label="GitHub">
                GitHub
              </a>
            </li>
            <li>
              <a className="text-brand-light transition hover:text-brand" href="#" aria-label="Twitter">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 bg-slate-900/80 py-4">
        <p className="mx-auto max-w-6xl px-6 text-xs text-brand-muted">
          &copy; {year} {/* Replace with your name */}Your Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
