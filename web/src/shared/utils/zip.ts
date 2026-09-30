/* Lector mínimo de .zip (como los que baja Google Drive) con lo que ya trae el navegador: el índice del final del
   archivo dice dónde está cada entrada, y las comprimidas se abren con DecompressionStream('deflate-raw'). */

export type EntradaZip = { nombre: string; datos: () => Promise<Uint8Array> };

const u16 = (v: DataView, o: number) => v.getUint16(o, true);
const u32 = (v: DataView, o: number) => v.getUint32(o, true);

async function inflar(b: Uint8Array): Promise<Uint8Array> {
  const s = new Blob([b as BlobPart]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  return new Uint8Array(await new Response(s).arrayBuffer());
}

/** Las entradas de un .zip (sin las carpetas). `datos()` la descomprime cuando se pide, de a una. */
export function leerZip(buf: ArrayBuffer): EntradaZip[] {
  const v = new DataView(buf), bytes = new Uint8Array(buf);
  // Fin del índice central: firma 0x06054b50, a lo más 64 KB (el comentario) antes del final
  let fin = -1;
  for (let i = buf.byteLength - 22; i >= Math.max(0, buf.byteLength - 22 - 0xffff); i--) if (u32(v, i) === 0x06054b50) { fin = i; break; }
  if (fin < 0) throw new Error('No es un archivo .zip válido.');
  const n = u16(v, fin + 10);
  let p = u32(v, fin + 16);
  const utf8 = new TextDecoder('utf-8'), latin = new TextDecoder('latin1'), out: EntradaZip[] = [];
  for (let i = 0; i < n; i++) {
    if (u32(v, p) !== 0x02014b50) throw new Error('El índice del .zip está dañado.');
    const bandera = u16(v, p + 8), metodo = u16(v, p + 10), tam = u32(v, p + 20);
    const ln = u16(v, p + 28), le = u16(v, p + 30), lc = u16(v, p + 32), local = u32(v, p + 42);
    const nombre = (bandera & 0x800 ? utf8 : latin).decode(bytes.subarray(p + 46, p + 46 + ln));
    p += 46 + ln + le + lc;
    if (nombre.endsWith('/')) continue;
    out.push({
      nombre,
      datos: async () => {
        const ini = local + 30 + u16(v, local + 26) + u16(v, local + 28), crudo = bytes.subarray(ini, ini + tam);
        if (metodo === 0) return crudo;
        if (metodo === 8) return inflar(crudo);
        throw new Error(`${nombre}: compresión no soportada.`);
      },
    });
  }
  return out;
}
