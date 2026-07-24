import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

// Split evenly left/right of the centered wordmark (Apple-style symmetry).
const leftNav = [
  { name: 'Home', to: '/' },
  { name: 'Consulting', to: '/consulting' },
];

const rightNav = [{ name: 'Resume', to: '/resume' }];

const navLinkClass = ({ isActive }) =>
  [
    'font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200',
    isActive
      ? 'text-accent'
      : 'text-ink-500 hover:text-ink-black dark:hover:text-white',
  ].join(' ');

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-9 w-9 items-center justify-center rounded border border-ink-300 text-ink-700 transition-colors hover:border-ink-700 hover:text-ink-black dark:border-ink-700 dark:text-ink-300 dark:hover:border-ink-300 dark:hover:text-white"
    >
      {isDark ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4l1.4-1.4" />
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const allNav = [...leftNav, ...rightNav];

  return (
    <header className="sticky top-0 z-50 border-b border-ink-300 bg-white/90 backdrop-blur dark:border-ink-700 dark:bg-ink-black/90">
      <div className="mx-auto grid max-w-content grid-cols-2 items-center px-6 py-4 md:grid-cols-3">
        {/* Left nav (desktop) */}
        <nav className="hidden items-center gap-6 md:flex">
          {leftNav.map((item) => (
            <NavLink key={item.name} to={item.to} className={navLinkClass}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Centered wordmark */}
        <Link
          to="/"
          className="flex flex-col justify-self-start md:items-center md:justify-self-center"
        >
          <span className="text-base font-medium tracking-tight text-ink-black dark:text-white">
            Srihari Raman
          </span>
          <span className="eyebrow mt-0.5 hidden sm:block">AI Engineer & Implementation Consultant</span>
        </Link>

        {/* Right nav + toggle (desktop) */}
        <nav className="hidden items-center justify-end gap-6 md:flex">
          {rightNav.map((item) => (
            <NavLink key={item.name} to={item.to} className={navLinkClass}>
              {item.name}
            </NavLink>
          ))}
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center justify-end gap-2 md:hidden">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-ink-300 text-ink-700 transition-colors hover:border-ink-700 dark:border-ink-700 dark:text-ink-300"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Toggle navigation menu</span>
            <svg
              className="h-5 w-5"
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
      </div>

      {isOpen && (
        <div className="border-t border-ink-300 bg-white dark:border-ink-700 dark:bg-ink-black md:hidden">
          <div className="mx-auto flex max-w-content flex-col px-6 py-4">
            {allNav.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'border-b border-ink-300/60 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors dark:border-ink-700/60',
                    isActive ? 'text-accent' : 'text-ink-500 hover:text-ink-black dark:hover:text-white',
                  ].join(' ')
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
