import React, { useState, useEffect } from 'react';
import HomePage from '../app/page';
import AboutPage from '../app/about/page';
import FeaturesPage from '../app/features/page';
import PricingPage from '../app/pricing/page';
import ContactPage from '../app/contact/page';
import DashboardPage from '../app/dashboard/page';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');

  useEffect(() => {
    // Set initial path from window.location
    if (typeof window !== 'undefined') {
      const path = window.location.pathname || '/';
      // Normalize trailing slash
      const normalizedPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
      setCurrentPath(normalizedPath);
    }

    const handleLocationChange = () => {
      const path = window.location.pathname || '/';
      const normalizedPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
      setCurrentPath(normalizedPath);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Route matching
  switch (currentPath) {
    case '/about':
      return <AboutPage />;
    case '/features':
      return <FeaturesPage />;
    case '/pricing':
      return <PricingPage />;
    case '/contact':
      return <ContactPage />;
    case '/dashboard':
      return <DashboardPage />;
    case '/':
    default:
      return <HomePage />;
  }
}
