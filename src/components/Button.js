import React from 'react';
import { Link } from 'react-router-dom';

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-ink-black';

// Black/white only — no colored, gradient, or pill buttons. Sharp 4px corners.
const variants = {
  primary:
    'bg-ink-black text-white hover:bg-ink-900 dark:bg-white dark:text-ink-black dark:hover:bg-ink-100',
  secondary:
    'border border-ink-300 bg-transparent text-ink-black hover:border-ink-700 dark:border-ink-700 dark:text-white dark:hover:border-ink-300',
};

function Button({ children, to, href, variant = 'primary', className = '', ...rest }) {
  const classes = [baseStyles, variants[variant] || variants.primary, className]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link className={classes} to={to} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    // External links open in a new tab so visitors don't lose the site.
    const isExternal = /^https?:\/\//i.test(href);
    const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a className={classes} href={href} {...externalProps} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...rest}>
      {children}
    </button>
  );
}

export default Button;
