import { auth } from '@/features/cuentas/server/auth';
import { MiTurnoApp } from '@/app-shell/MiTurnoApp';
import { Portada } from './Portada';

/* Sin sesión: la página de inicio pública. Con sesión: la app, que abre en «Tus personajes». */
export default async function Page() {
  const sesion = await auth();
  if (!sesion?.user) return <Portada />;
  return <MiTurnoApp />;
}
