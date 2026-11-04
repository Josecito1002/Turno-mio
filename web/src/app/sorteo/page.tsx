import { auth } from '@/features/cuentas/server/auth';
import { EntrarSorteo } from '@/features/sorteos/components/EntrarSorteo';
import { MarcoSorteo } from './MarcoSorteo';

export const metadata = { title: 'Sorteos · Mi turno' };

export default async function SorteoPage() {
  const sesion = await auth();
  return (
    <MarcoSorteo>
      <header>
        <h1 className="m-0 font-serif text-[clamp(2rem,8vw,3rem)] font-extrabold leading-tight">Sorteos y tiradas</h1>
        <p className="mb-0 mt-2 max-w-prose text-muted">
          Tira dados, lanza una moneda o gira una ruleta delante de todos. Comparte el enlace: quien entra ve cada
          resultado al momento y quién está conectado. No hace falta cuenta.
        </p>
      </header>
      <EntrarSorteo nombreCuenta={sesion?.user?.name || undefined} />
    </MarcoSorteo>
  );
}
