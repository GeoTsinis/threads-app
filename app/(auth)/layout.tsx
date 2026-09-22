import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'A Next.js 13 Meta Threads Application',
};

const inter = Inter({ subsets: ['latin'] });
const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const body = (
    <html lang="en">
      <body className={`${inter.className} bg-dark-1`}>{children}</body>
    </html>
  );

  if (!hasClerk) {
    return body;
  }

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      {body}
    </ClerkProvider>
  );
}
