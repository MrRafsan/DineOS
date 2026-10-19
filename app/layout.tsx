import React from 'react';
import './globals.css';

export const metadata = {
  title: 'DineOS — The AI Brain Behind Your Restaurant | AI-Powered Restaurant OS',
  description:
    "DineOS is Bangladesh's first AI-powered restaurant OS. Predict sales, understand customers, manage inventory, and grow your restaurant with DineOS AI.",
  keywords: [
    'DineOS',
    'DineOS POS',
    'DineOS AI',
    'AI Restaurant POS',
    'Restaurant OS',
    'Sales Forecast',
    'Bangladesh Restaurant Software',
    'KDS POS',
  ],
  authors: [{ name: 'DineOS Team' }],
  metadataBase: new URL('https://dineos.com'),
  alternates: {
    canonical: 'https://dineos.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'DineOS — The AI Brain Behind Your Restaurant | AI-Powered Restaurant OS',
    description:
      "DineOS is Bangladesh's first AI-powered restaurant OS. Predict sales, understand customers, manage inventory, and grow your restaurant with DineOS AI.",
    url: 'https://dineos.com',
    siteName: 'DineOS',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'DineOS AI Restaurant OS Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DineOS — The AI Brain Behind Your Restaurant | AI-Powered Restaurant OS',
    description:
      "DineOS is Bangladesh's first AI-powered restaurant OS. Predict sales, understand customers, manage inventory, and grow your restaurant with DineOS AI.",
    images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0F] text-[#FFFFFF] antialiased selection:bg-[#22C55E] selection:text-black min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
