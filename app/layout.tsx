import type { Metadata } from 'next';
import { Outfit, DM_Sans, Caveat } from 'next/font/google';
import './globals.css';

const bodyFont = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
});

const displayFont = Outfit({
  variable: '--font-display',
  subsets: ['latin'],
});

const handwrittenFont = Caveat({ variable: '--font-handwritten', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DB_JOLBZIE — Digital Artist & Roblox Creator',
  description: 'Custom art made for your Roblox world. Explore UGC, custom faces, digital art and creative commissions by Jolbzie.',
  openGraph: { title: 'DB_JOLBZIE — A little imagination. A world of personality.', description: 'UGC, custom faces, drawings and more, made to bring your ideas to life.', type: 'website' },
  twitter: { card: 'summary', title: 'DB_JOLBZIE — Digital Artist & Roblox Creator', description: 'Custom art, UGC and creative commissions by Jolbzie.' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${handwrittenFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
