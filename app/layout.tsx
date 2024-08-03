import type { Metadata } from 'next';
import { Inter, Saira } from 'next/font/google';
import './globals.css';
import './globalicon.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const saira = Saira({ subsets: ['latin'], variable: '--font-saira', display: 'swap' });

export const metadata: Metadata = {
  title: 'Octalysis Tool',
  description: 'Gamification Building Developing Online Tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${inter.variable} ${saira.variable}`}>
      <body>{children}</body>
    </html>
  );
}
