'use client';
import type { BibliotecaAnidada } from './domain/mapeo';

/*
 * Copia de la biblioteca en este navegador (IndexedDB: pesa más de lo que cabe en localStorage), con la versión que
 * tenía en el servidor. Si la versión no cambió, la app la usa sin volver a descargarla. Cualquier fallo (modo privado,
 * sin espacio, navegador viejo) solo hace que se descargue como antes.
 */
const BASE = 'miturno', ALMACEN = 'biblioteca', CLAVE = 'actual';
/** `formato` es la consulta con que se pidió: si una versión nueva de la app pide otros campos, la copia no sirve. */
export type CopiaBiblioteca = { version: string; formato: string; lib: BibliotecaAnidada };

function abrir(): Promise<IDBDatabase> {
  return new Promise((ok, mal) => {
    const pet = indexedDB.open(BASE, 1);
    pet.onupgradeneeded = () => pet.result.createObjectStore(ALMACEN);
    pet.onsuccess = () => ok(pet.result);
    pet.onerror = () => mal(pet.error);
  });
}

async function usar<T>(modo: IDBTransactionMode, hacer: (a: IDBObjectStore) => IDBRequest): Promise<T> {
  const db = await abrir();
  try {
    return await new Promise<T>((ok, mal) => {
      const pet = hacer(db.transaction(ALMACEN, modo).objectStore(ALMACEN));
      pet.onsuccess = () => ok(pet.result as T);
      pet.onerror = () => mal(pet.error);
    });
  } finally { db.close(); }
}

export async function leerCopiaBiblioteca(formato: string): Promise<CopiaBiblioteca | null> {
  try {
    const c = await usar<CopiaBiblioteca | undefined>('readonly', a => a.get(CLAVE));
    return c && typeof c.version === 'string' && c.formato === formato && c.lib ? c : null;
  } catch { return null; }
}

export async function guardarCopiaBiblioteca(version: string, formato: string, lib: BibliotecaAnidada) {
  if (!version || version === '0') return; // base sin la migración de la versión: no hay forma de saber si cambió
  try { await usar('readwrite', a => a.put({ version, formato, lib }, CLAVE)); } catch { /* sin copia: la próxima vez se descarga */ }
}
