import { and, eq } from 'drizzle-orm';
import { auth } from '@/features/cuentas/server/auth';
import { db } from '@/shared/db/cliente';
import { mesaJugadores } from '@/features/mesa/server/tablas';
import { transmitirMesa, type EventoMesa } from '@/features/mesa/server/realtime';

export async function POST(req: Request) {
  const s = await auth();
  if (!s?.user?.id) return new Response('No autorizado', { status: 401 });

  const cuerpo = await req.json().catch(() => null);
  if (!cuerpo || !cuerpo.personajeId) return new Response('Datos inválidos', { status: 400 });

  // Si viene campanaId explícito, transmitir directamente a esa mesa
  if (cuerpo.campanaId) {
    transmitirMesa(cuerpo.campanaId, { ...cuerpo, jugadorId: s.user.id } as EventoMesa);
    return Response.json({ ok: true, transmitido: 1 });
  }

  // Si no viene campanaId, buscar todas las mesas donde este personaje esté unido
  const mesas = await db.select({ campanaId: mesaJugadores.campanaId })
    .from(mesaJugadores)
    .where(and(eq(mesaJugadores.jugadorId, s.user.id), eq(mesaJugadores.personajeId, cuerpo.personajeId)));

  for (const m of mesas) {
    transmitirMesa(m.campanaId, { ...cuerpo, campanaId: m.campanaId, jugadorId: s.user.id });
  }

  return Response.json({ ok: true, transmitido: mesas.length });
}
