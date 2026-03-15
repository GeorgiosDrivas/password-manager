import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { AppProvider } from '../shared/providers/appContent';
import { Rubik, Fira_Sans } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
});

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-fira',
});

export const metadata: Metadata = {
  title: 'Password Manager',
  description: 'Create and manage your passwords securely',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${firaSans.variable}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
