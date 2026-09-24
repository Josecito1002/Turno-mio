import { MiTurnoApp } from '@/app-shell/MiTurnoApp';

/* Usar la app sin cuenta: nada se guarda en el servidor, solo en este navegador. */
export const metadata = { title: 'Mi turno (invitado)' };

export default function InvitadoPage() {
  return <MiTurnoApp invitado />;
}
