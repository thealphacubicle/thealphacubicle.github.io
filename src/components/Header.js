import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Button from './Button';

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Resume', to: '/resume' },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white transition hover:text-brand-light"
        >
          {/* Replace the text below with your personal branding */}
          <span className="text-brand">Your Name</span>
          <span className="hidden text-sm font-medium uppercase tracking-[0.2em] text-brand-muted sm:inline">
            Portfolio
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-brand-muted md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                [
                  'transition-colors duration-200 hover:text-white',
                  isActive ? 'text-white' : 'text-brand-muted',
                ].join(' ')
              }
            >
              {item.name}
            </NavLink>
          ))}
          <Button to="/resume" variant="secondary" className="text-sm font-semibold">
            View Resume
          </Button>
        </nav>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-brand hover:text-brand md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Toggle navigation menu</span>
          <svg
            className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-45' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="border-t border-white/10 bg-slate-900/95 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col space-y-2 px-6 py-4 text-base text-brand-muted">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'rounded-lg px-3 py-2 transition hover:bg-white/10 hover:text-white',
                    isActive ? 'bg-white/5 text-white' : 'text-brand-muted',
                  ].join(' ')
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Button to="/resume" className="w-full justify-center">
              View Resume
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
