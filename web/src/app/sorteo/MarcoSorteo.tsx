import Link from 'next/link';
import type { ReactNode } from 'react';

/* Las páginas de sorteo van fuera de la app: se abren con un enlace y no piden cuenta. */
export function MarcoSorteo({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-4 px-4 pb-10 pt-4">
      <nav className="flex items-center justify-between gap-2 text-sm">
        <Link href="/" className="font-serif text-xl font-extrabold text-primary">Mi turno</Link>
        <Link href="/sorteo" className="text-muted underline">Sorteos</Link>
      </nav>
      <main className="flex flex-col gap-4">{children}</main>
    </div>
  );
}
