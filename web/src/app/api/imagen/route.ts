import { leerExtra } from '@/features/biblioteca/server/repositorio';
import { db } from '@/shared/db/cliente';

/** Una imagen de la biblioteca (especie, clase…). La dirección lleva `v`, que cambia con la imagen: se guarda un año. */
export async function GET(request: Request) {
  const k = new URL(request.url).searchParams.get('k');
  const valor = k ? await leerExtra(db, 'img', k) : null;
  const m = typeof valor === 'string' ? /^data:(image\/[\w.+-]+);base64,([\s\S]*)$/.exec(valor) : null;
  if (!m) return new Response('No existe esa imagen.', { status: 404 });
  return new Response(Buffer.from(m[2], 'base64'), {
    headers: { 'content-type': m[1], 'cache-control': 'public, max-age=31536000, immutable' },
  });
}
