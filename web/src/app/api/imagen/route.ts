import { leerExtra } from '@/features/biblioteca/server/repositorio';
import { db } from '@/shared/db/cliente';

const esperar = (ms: number) => new Promise(r => setTimeout(r, ms));

/* Al abrir la lista de especies se piden muchas imágenes a la vez y la base admite pocas conexiones: si una consulta
   falla se reintenta, y si igual falla se contesta 503 sin guardar, para que el navegador vuelva a pedirla. */
async function leerImagen(k: string) {
  for (let i = 0; ; i++) {
    try { return await leerExtra(db, 'img', k); }
    catch (e) { if (i >= 2) throw e; await esperar(300 * (i + 1)); }
  }
}

/** Una imagen de la biblioteca (especie, clase…). La dirección lleva `v`, que cambia con la imagen: el navegador y
    la CDN de Vercel la guardan un año, así la base solo se consulta la primera vez. */
export async function GET(request: Request) {
  const k = new URL(request.url).searchParams.get('k');
  let valor: unknown;
  try { valor = k ? await leerImagen(k) : null; }
  catch (e) {
    console.error('[imagen]', k, e instanceof Error ? e.message : e);
    return new Response('No se pudo leer la imagen; vuelve a intentarlo.', { status: 503, headers: { 'cache-control': 'no-store', 'retry-after': '1' } });
  }
  const m = typeof valor === 'string' ? /^data:(image\/[\w.+-]+);base64,([\s\S]*)$/.exec(valor) : null;
  if (!m) return new Response('No existe esa imagen.', { status: 404, headers: { 'cache-control': 'no-store' } });
  return new Response(Buffer.from(m[2], 'base64'), {
    headers: { 'content-type': m[1], 'cache-control': 'public, max-age=31536000, s-maxage=31536000, immutable' },
  });
}
