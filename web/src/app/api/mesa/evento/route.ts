import { and, eq } from 'drizzle-orm';
import { auth } from '@/features/cuentas/server/auth';
import { db } from '@/shared/db/cliente';
import { mesaJugadores } from '@/features/mesa/server/tablas';
import { transmitirMesa } from '@/features/mesa/server/realtime';

const numero = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : undefined);

export async function POST(req: Request) {
  const s = await auth();
  if (!s?.user?.id) return new Response('No autorizado', { status: 401 });

  const cuerpo = await req.json().catch(() => null);
  if (!cuerpo || typeof cuerpo.personajeId !== 'string' || !cuerpo.personajeId) return new Response('Datos inválidos', { status: 400 });

  // Solo a las mesas donde este jugador unió ese personaje (así nadie escribe en la mesa de otro), y solo los PG
  const mesas = await db.select({ campanaId: mesaJugadores.campanaId })
    .from(mesaJugadores)
    .where(and(eq(mesaJugadores.jugadorId, s.user.id), eq(mesaJugadores.personajeId, cuerpo.personajeId)));

  for (const m of mesas) {
    transmitirMesa(m.campanaId, {
      tipo: 'cambio_pg', campanaId: m.campanaId, jugadorId: s.user.id, personajeId: cuerpo.personajeId,
      pgUsados: numero(cuerpo.pgUsados), pgTemp: numero(cuerpo.pgTemp), muerteExitos: numero(cuerpo.muerteExitos), muerteFallos: numero(cuerpo.muerteFallos),
    });
  }

  return Response.json({ ok: true, transmitido: mesas.length });
}
