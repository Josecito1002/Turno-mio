import type { Metadata, Viewport } from 'next';
import { Alegreya, Alegreya_Sans } from 'next/font/google';
import { Toaster } from 'sileo';
import './globals.css';

const alegreya = Alegreya({ variable: '--font-alegreya', subsets: ['latin'], weight: ['500', '700', '800'] });
const alegreyaSans = Alegreya_Sans({ variable: '--font-alegreya-sans', subsets: ['latin'], weight: ['400', '500', '700', '800'], style: ['normal', 'italic'] });

export const metadata: Metadata = {
  title: 'Mi turno: creador y hoja de D&D 2024',
  description: 'Crea tu personaje paso a paso con las reglas de 2024, tira los dados desde la hoja y lleva el combate de tu mesa.',
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es" className={`${alegreya.variable} ${alegreyaSans.variable}`}>
      <body>
        {children}
        <Toaster position="bottom-center" theme="system" />
      </body>
    </html>
  );
}
