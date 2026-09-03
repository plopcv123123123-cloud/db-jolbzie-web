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
  title: 'DB_JOLBZIE — Vista previa temporal',
  // Keep the unfinished public preview out of search results until launch is approved.
  robots: { index: false, follow: false },
  description: 'Somos Jolbzie, un colectivo creativo. Creamos UGC para Roblox, caras personalizadas, dibujos, ilustraciones, iconos, banners y comisiones a tu medida.',
  openGraph: { title: 'DB_JOLBZIE — Vista previa temporal', description: 'Arte digital, UGC, caras personalizadas, dibujos, ilustraciones y banners. Un colectivo creativo para darle vida a tus ideas.', type: 'website', locale: 'es_ES' },
  twitter: { card: 'summary', title: 'DB_JOLBZIE — Vista previa temporal', description: 'Creamos arte digital, UGC, ilustraciones y comisiones con personalidad.' },
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
