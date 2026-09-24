import { redirect } from 'next/navigation';
import { auth } from '@/features/cuentas/server/auth';
import { MiTurnoApp } from '@/app-shell/MiTurnoApp';

export default async function Page() {
  const sesion = await auth();
  if (!sesion?.user) redirect('/login');
  return <MiTurnoApp />;
}
