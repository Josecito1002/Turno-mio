import { auth } from '@/features/cuentas/server/auth';
import { MiTurnoApp } from '@/app-shell/MiTurnoApp';

/* Enlace para compartir un personaje: con sesión se abre en la cuenta (y se puede copiar a ella);
   sin sesión, en modo invitado (la copia queda en este navegador). */
export const metadata = { title: 'Personaje compartido · Mi turno' };

export default async function EnlacePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const sesion = await auth();
  return <MiTurnoApp invitado={!sesion?.user} enlace={token} />;
}
