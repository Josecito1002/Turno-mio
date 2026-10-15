import { auth } from '@/features/cuentas/server/auth';
import { HOMEBREWERY, enlaces, prepararBrew, versionPedida } from '@/features/homebrewery/domain/brew';

/* Homebrewery no deja que otra web le mande documentos desde el navegador, así que el envío lo hace el servidor.
   La versión que exige su API cambia con cada publicación suya: se recuerda la última que pidió. */
let version = '0';

async function enviar(cuerpo: unknown, cookie: string) {
  return fetch(`${HOMEBREWERY}/api`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json', 'Homebrewery-Version': version, ...(cookie ? { cookie: `nc_session=${cookie}` } : {}) },
    body: JSON.stringify(cuerpo),
  });
}

/** Crea un documento en Homebrewery con un .txt de guía y devuelve sus enlaces. Solo para el DM. */
export async function POST(req: Request) {
  const s = await auth();
  if (!s?.user?.id) return new Response('No autorizado', { status: 401 });
  if (s.user.rol !== 'dm' && s.user.rol !== 'admin') return new Response('Solo el DM puede subir guías.', { status: 403 });

  const datos = await req.json().catch(() => null) as { texto?: unknown; archivo?: unknown; cookie?: unknown } | null;
  if (!datos || typeof datos.texto !== 'string' || !datos.texto.trim()) return new Response('Falta el texto de la guía.', { status: 400 });
  const cookie = typeof datos.cookie === 'string' ? datos.cookie.trim().replace(/^nc_session=/, '').replace(/[^\w.-]/g, '') : '';
  const brew = prepararBrew(datos.texto, typeof datos.archivo === 'string' ? datos.archivo : '');

  try {
    let r = await enviar(brew, cookie);
    if (r.status === 412) {
      const v = versionPedida(await r.text());
      if (v) { version = v; r = await enviar(brew, cookie); }
    }
    if (!r.ok) {
      const t = (await r.text()).slice(0, 300);
      console.error('[homebrewery]', r.status, t);
      return new Response(`Homebrewery respondió ${r.status}: ${t}`, { status: 502 });
    }
    const hecho = await r.json() as { editId?: string; shareId?: string };
    if (!hecho.editId || !hecho.shareId) return new Response('Homebrewery no devolvió los enlaces.', { status: 502 });
    return Response.json({ titulo: brew.title, ...enlaces(hecho.editId, hecho.shareId) });
  } catch (e) {
    console.error('[homebrewery]', e);
    return new Response('No se pudo conectar con Homebrewery; vuelve a intentarlo.', { status: 502 });
  }
}
