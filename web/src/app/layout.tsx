import type { Metadata, Viewport } from 'next';
import { EB_Garamond, Geist } from 'next/font/google';
import { Toaster } from 'sileo';
import './globals.css';

const ebGaramond = EB_Garamond({ variable: '--font-eb-garamond', subsets: ['latin'], weight: 'variable', style: ['normal', 'italic'] });
const geist = Geist({ variable: '--font-geist', subsets: ['latin'], weight: 'variable' });

export const metadata: Metadata = {
  title: 'Mi turno: creador y hoja de D&D 2024',
  description: 'Crea tu personaje paso a paso con las reglas de 2024, tira los dados desde la hoja y lleva el combate de tu mesa.',
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es" className={`${ebGaramond.variable} ${geist.variable}`}>
      <head>
        {/* Íconos del diseño (Material Symbols); next/font no incluye fuentes de íconos.
            display=block: en una fuente de íconos, mostrar la de respaldo enseñaría el nombre ("shield") en vez del ícono */}
        {/* La regla no-page-custom-font es del router de pages; esto es el layout raíz y carga en todas las páginas */}
        {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
      </head>
      <body>
        {children}
        <Toaster position="bottom-center" theme="dark" />
      </body>
    </html>
  );
}
