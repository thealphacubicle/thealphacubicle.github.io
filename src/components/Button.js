import React from 'react';
import { Link } from 'react-router-dom';

const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream';

const variants = {
  primary: 'bg-gradient-to-r from-brand via-brand-light to-brand text-brand-cream shadow-glow hover:shadow-card hover:-translate-y-0.5',
  secondary: 'border border-brand/30 bg-brand-sand/80 text-brand-deep hover:border-brand hover:bg-brand-sand hover:-translate-y-0.5',
  outline: 'border border-brand text-brand hover:bg-brand/10',
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
    return (
      <a className={classes} href={href} {...rest}>
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
