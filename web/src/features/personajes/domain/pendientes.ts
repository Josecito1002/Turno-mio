/* eslint-disable @typescript-eslint/no-explicit-any */
import { norm } from '@/shared/utils/texto';

/** Lo que hay que elegir al subir de nivel, sacado de los avisos de la hoja.
 *  Cada clave es una sección del diálogo de subida: 'subclase', 'estilo', 'mejora-4', 'pericia', 'conjuros', 'maestria', 'elecciones'. */
export function pendientes(c: any): string[] {
  const out: string[] = [];
  for (const a of c.avisos || []) {
    const t = norm(a.t);
    if (t === 'falta la subclase') out.push('subclase');
    else if (t === 'estilo de combate') out.push('estilo');
    else if (/^mejora de nivel \d+/.test(t)) out.push('mejora-' + t.match(/\d+/)![0]);
    else if (t === 'pericia') out.push('pericia');
    else if (/truco|conjuro/.test(t)) out.push('conjuros');
    else if (/maestria/.test(t)) out.push('maestria');
    else if (/^falta elegir/.test(t)) out.push('elecciones');
  }
  return [...new Set(out)];
}

/** Lo que se muestra al subir de nivel: lo pendiente y, en el nivel de la subclase, la subclase siempre,
 *  aunque ya estuviera marcada desde el editor, para confirmarla o cambiarla. */
export function pendientesAlSubir(c: any, haySubclases: boolean): string[] {
  const out = pendientes(c);
  if (haySubclases && c.lvl === c.subNivel && !out.includes('subclase')) out.unshift('subclase');
  return out;
}

/** Lo que falta elegir y no deja subir de nivel: especie, clase, trasfondo, subclase, estilo, mejoras, habilidades,
 *  pericias, maestrías y elecciones de rasgos. Los conjuros por preparar y el equipo no lo impiden. */
export function faltaParaSubir(c: any): any[] {
  return (c.avisos || []).filter((a: any) => a.nivel === 'aviso'
    && (['especie', 'clase', 'trasfondo', 'stats', 'habs'].includes(a.paso) || /maestria/.test(norm(a.t))));
}
