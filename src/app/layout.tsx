import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WriteFlow AI | Premium SaaS Agentic Content Workspace',
  description:
    'Collaborate with advanced AI agents inside a multi-role workspace to automate outline, draft, rewrite, and review summaries.',
  keywords: ['AI Content Generator', 'SaaS Content Workspace', 'Agentic Workflows', 'Multi-role AI'],
  authors: [{ name: 'WriteFlow AI Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
