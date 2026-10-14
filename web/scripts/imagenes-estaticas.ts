/* Copia las imágenes de la biblioteca (lib_extra, tipo img) a archivos de public/ al compilar, para que la web las
   pida a la CDN de Vercel y no a la base: al abrir la lista de especies se piden decenas a la vez y la base solo
   admite 15 conexiones. El índice (huella → extensión) lo lee urlImagen; lo que se suba después de publicar sigue
   saliendo de /api/imagen hasta la próxima publicación. */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { and, eq, inArray, sql } from 'drizzle-orm';
import type { crearDb } from '../src/shared/db/conectar';
import { libExtra } from '../src/features/biblioteca/server/tablas';
import { CARPETA_ESTATICAS, extensionImagen } from '../src/features/biblioteca/server/imagenes';

type Db = ReturnType<typeof crearDb>['db'];
const INDICE = 'src/features/biblioteca/server/imagenes-estaticas.json';

/** Escribe los archivos y el índice. El índice se escribe al final: si algo falla, queda como estaba. */
export async function exportarImagenes(db: Db) {
  const claves = (await db.select({ clave: libExtra.clave }).from(libExtra).where(eq(libExtra.tipo, 'img'))).map(x => x.clave);
  const carpeta = `public${CARPETA_ESTATICAS}`;
  rmSync(carpeta, { recursive: true, force: true });
  mkdirSync(carpeta, { recursive: true });
  const indice: Record<string, string> = {};
  for (let i = 0; i < claves.length; i += 25) {
    const filas = await db.select({ v: sql<string>`md5(${libExtra.valor}::text)`, valor: libExtra.valor }).from(libExtra)
      .where(and(eq(libExtra.tipo, 'img'), inArray(libExtra.clave, claves.slice(i, i + 25))));
    for (const f of filas) {
      const m = typeof f.valor === 'string' ? /^data:(image\/[\w.+-]+);base64,([\s\S]*)$/.exec(f.valor) : null;
      const ext = m && extensionImagen(m[1]);
      if (!m || !ext) continue;
      writeFileSync(`${carpeta}/${f.v}.${ext}`, Buffer.from(m[2], 'base64'));
      indice[f.v] = ext;
    }
  }
  writeFileSync(INDICE, JSON.stringify(indice) + '\n');
  return Object.keys(indice).length;
}
