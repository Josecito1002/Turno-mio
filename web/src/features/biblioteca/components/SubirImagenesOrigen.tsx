'use client';
import { useId, useState } from 'react';
import { render } from '@/app-shell/estado';
import { guardarLibExtras } from '@/app-shell/almacen';
import { Nota, Plegable, cx } from '@/shared/ui/kit';
import { avisar } from '@/shared/ui/avisos';
import { getLib } from '../domain/biblioteca';
import { PREFIJO_ORIGEN, catalogoActual, claveOrigen, reconocerArchivo } from '../domain/imagenes-origen';
import { achicarImagen } from './PanelMedia';
import { leerZip } from '@/shared/utils/zip';

/* Se guardan sin recortar, hasta 1024 px de lado: las tarjetas las muestran cuadradas desde arriba (la cara) y el
   cuadro grande entera. Con calidad 0.85 cada una pesa unos 150 KB, para que cientos quepan en la base. */
const LADO = 1024, CALIDAD = 0.85;

type Estado = { hechas: number; total: number; fallidas: string[]; sinReconocer: string[]; activo: boolean };

/** Guarda las imágenes de a una (cada una puede pesar varios cientos de KB) y avisa del avance. Fuera del componente,
    que solo la llama. */
const ES_IMAGEN = /\.(jpe?g|png|webp)$/i;
const TIPO: Record<string, string> = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

/** Las imágenes elegidas y las que vienen dentro de los .zip (en cualquier carpeta; solo cuenta el nombre del archivo) */
async function abrirArchivos(elegidos: File[]): Promise<File[]> {
  const out: File[] = [];
  for (const f of elegidos) {
    if (!/\.zip$/i.test(f.name)) { out.push(f); continue; }
    for (const e of leerZip(await f.arrayBuffer())) {
      const nombre = e.nombre.split('/').pop()!;
      if (!ES_IMAGEN.test(nombre) || nombre.startsWith('._') || e.nombre.includes('__MACOSX')) continue;
      out.push(new File([await e.datos() as BlobPart], nombre, { type: TIPO[nombre.split('.').pop()!.toLowerCase()] }));
    }
  }
  return out;
}

async function subirImagenes(elegidos: File[], avance: (f: (e: Estado) => Estado) => void) {
  const LIB = getLib(), cat = catalogoActual();
  let archivos: File[];
  try { archivos = await abrirArchivos(elegidos); }
  catch (e) { avisar(`No se pudo abrir el .zip: ${e instanceof Error ? e.message : e}`, 'error'); return; }
  const reconocidas = archivos.map(f => ({ f, o: reconocerArchivo(f.name, cat) }));
  const sinReconocer = reconocidas.filter(x => !x.o).map(x => x.f.name);
  const buenas = reconocidas.filter(x => x.o);
  const fallidas: string[] = [];
  avance(() => ({ hechas: 0, total: buenas.length, fallidas: [], sinReconocer, activo: true }));
  for (const [i, { f, o }] of buenas.entries()) {
    try {
      const k = claveOrigen(o!), img = await achicarImagen(f, LADO, CALIDAD);
      await guardarLibExtras([{ tipo: 'img', clave: k, valor: img }]);
      (LIB.img = LIB.img || {})[k] = img;
    } catch { fallidas.push(f.name); }
    avance(x => ({ ...x, hechas: i + 1, fallidas: [...fallidas] }));
  }
  avance(x => ({ ...x, activo: false }));
  render();
}

/** El administrador elige muchas imágenes a la vez, nombradas "especie-subraza-clase-subclase-género.jpg"
    (por ejemplo "draconido-bronce-brujo-el-filo-maldito-femenino.jpg"), y se guardan de a una. */
export function SubirImagenesOrigen() {
  const id = useId(), LIB = getLib();
  const [e, setE] = useState<Estado>({ hechas: 0, total: 0, fallidas: [], sinReconocer: [], activo: false });
  const guardadas = Object.keys(LIB.img || {}).filter(k => k.startsWith(PREFIJO_ORIGEN)).length;

  return (
    <Plegable titulo="Subir imágenes de especie y clase" nota={`${guardadas}`}>
      <div className="grid gap-2">
        <p className="m-0">Elige un .zip (como el que baja Google Drive) o varias imágenes a la vez. Cada nombre dice especie, subraza
          (si tiene), clase, subclase y género, separados por guiones: <code>draconido-bronce-brujo-el-filo-maldito-femenino.jpg</code>.
          Al crear un personaje, cada clase y subclase muestra la de su especie. El género se guarda pero por ahora no cambia qué
          imagen se ve. Una imagen con el mismo nombre reemplaza a la anterior.</p>
        <label htmlFor={id} className={cx('inline-flex min-h-11 w-fit cursor-pointer items-center rounded-xl bg-surface px-3 text-sm font-bold ring-1 ring-inset ring-rule hover:bg-soft focus-within:outline-3 focus-within:outline-rea', e.activo && 'pointer-events-none opacity-60')}>
          {e.activo ? `Subiendo ${e.hechas} de ${e.total}…` : 'Subir .zip o imágenes'}
          <input id={id} type="file" accept="image/*,.zip,application/zip" multiple className="sr-only" disabled={e.activo}
            onChange={ev => { const fs = [...(ev.target.files || [])]; ev.target.value = ''; if (fs.length) subirImagenes(fs, setE); }} />
        </label>
        <div aria-live="polite">
          {!e.activo && e.total > 0 && <p className="m-0 font-bold">Se guardaron {e.hechas - e.fallidas.length} de {e.total}.</p>}
          {e.sinReconocer.length > 0 && <Nota>No se reconoció el nombre de {e.sinReconocer.length}: {e.sinReconocer.join(', ')}. Renómbralas con el formato de arriba y vuelve a subirlas.</Nota>}
          {e.fallidas.length > 0 && <Nota>No se pudieron guardar: {e.fallidas.join(', ')}. Vuelve a subirlas.</Nota>}
        </div>
      </div>
    </Plegable>
  );
}
