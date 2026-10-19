'use client';

import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  scroll?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className,
  onClick,
  scroll = true,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // If external link or modified click (ctrl/cmd), allow default browser behavior
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey
    ) {
      return;
    }

    // Client-side smooth navigation
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      if (scroll) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

export default Link;
