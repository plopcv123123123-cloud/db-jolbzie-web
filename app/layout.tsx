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
  title: 'DB_JOLBZIE — Arte digital y creaciones para Roblox',
  description: 'Arte a tu medida para tu mundo de Roblox. Descubre UGC, caras personalizadas, arte digital y comisiones de Jolbzie.',
  openGraph: { title: 'DB_JOLBZIE — Un poco de imaginación. Mucha personalidad.', description: 'UGC, caras personalizadas, dibujos y mucho más para darle vida a tus ideas.', type: 'website', locale: 'es_ES' },
  twitter: { card: 'summary', title: 'DB_JOLBZIE — Arte digital y creaciones para Roblox', description: 'Arte personalizado, UGC y comisiones de Jolbzie.' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${handwrittenFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
