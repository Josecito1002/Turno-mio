/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useId, useState } from 'react';
import { S } from '@/app-shell/estado';
import { norm } from '@/shared/utils/texto';
import { Boton, Campo, Dialogo, claseBotonGrande, claseCampo } from '@/shared/ui/kit';
import { todosConjuros } from '@/features/biblioteca/domain/biblioteca';
import { conjuroDeLaLista, listaDeConjuros } from '@/features/reglas/domain/restricciones';
import { cambiarConjuro, recuperarEspacios, recuperarPuntos } from '../../acciones';

/* Rasgos que se usan fuera de combate y hacen algo en la hoja: recuperar espacios o puntos, cambiar un conjuro.
   Cada uno sale como un botón debajo del rasgo. */
const CON_HERRAMIENTA = new Set(['recuperacion arcana', 'recuperacion natural', 'astucia magica', 'restauracion hechicera', 'memorizar conjuro']);
/** Si el rasgo tiene botón propio (va a la derecha de su tarjeta) */
export const tieneHerramienta = (e: any) => S.view === 'ficha' && !!S.c && CON_HERRAMIENTA.has(norm(e.nombre));

/** El botón grande de la derecha, con una línea debajo que dice qué hace */
function Grande({ texto, debajo, disabled, onClick }: { texto: string; debajo: string; disabled?: boolean; onClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <button type="button" disabled={disabled} onClick={onClick} className={claseBotonGrande}>{texto}</button>
      <small className="mt-0.5 max-w-32 text-xs text-muted">{debajo}</small>
    </div>
  );
}

export function Herramienta({ e }: { e: any }) {
  const c = S.c, n = norm(e.nombre);
  if (!c || S.view !== 'ficha') return null;
  if (n === 'recuperacion arcana') return <RecuperarEspacios max={Math.ceil(c.lvl / 2)} recurso="recup" />;
  if (n === 'recuperacion natural') return <RecuperarEspacios max={Math.ceil(c.lvl / 2)} recurso={e.recurso} />;
  if (n === 'astucia magica') return <RecuperarPuntos id="pacto" n={Math.ceil((recurso('pacto')?.max || 0) / 2)} recurso="astucia" que="espacios de pacto" />;
  if (n === 'restauracion hechicera') return <RecuperarPuntos id="ph" n={Math.floor(c.lvl / 2)} recurso="restau" que="puntos de hechicería" />;
  if (n === 'memorizar conjuro') return <MemorizarConjuro />;
  return null;
}

const recurso = (id: string) => S.c?.recursos?.find((r: any) => r.id === id);
const gastados = (id: string) => { const r = recurso(id); return r ? Math.min(S.pj.used?.[id] || 0, r.max) : 0; };
const sinUsos = (id?: string) => !!id && !!recurso(id) && gastados(id) >= recurso(id).max;

/** Elige qué espacios gastados recuperar: la suma de sus niveles no pasa de `max` y ninguno es de nivel 6 o más. */
function RecuperarEspacios({ max, recurso: rid }: { max: number; recurso?: string }) {
  const [abierto, setAbierto] = useState(false);
  const [elegidos, setElegidos] = useState<Record<number, number>>({});
  const niveles = (S.c.slots || []).filter((s: any) => s.nivel <= 5).map((s: any) => ({ nivel: s.nivel, gastados: gastados('slot' + s.nivel) }));
  const suma = Object.entries(elegidos).reduce((t, [nv, k]) => t + +nv * k, 0);
  const cambiar = (nv: number, d: number) => setElegidos(x => ({ ...x, [nv]: Math.max(0, (x[nv] || 0) + d) }));
  const confirmar = () => {
    const lista = Object.entries(elegidos).flatMap(([nv, k]) => Array(k).fill(+nv));
    if (lista.length) recuperarEspacios(lista, rid);
    setAbierto(false); setElegidos({});
  };
  const nada = !niveles.some((x: any) => x.gastados > 0);
  return (
    <>
      <Grande texto="Recuperar" debajo={sinUsos(rid) ? 'ya lo usaste' : nada ? 'no tienes espacios gastados' : `espacios, hasta ${max} niveles`}
        disabled={sinUsos(rid) || nada} onClick={() => setAbierto(true)} />
      <Dialogo abierto={abierto} onCerrar={() => setAbierto(false)} titulo="Recuperar espacios"
        descripcion={`Elige espacios gastados cuyos niveles sumen ${max} o menos (ninguno de nivel 6 o más).`} abajo>
        <ul className="m-0 grid list-none gap-2 p-0">
          {niveles.map((x: any) => {
            const k = elegidos[x.nivel] || 0;
            return (
              <li key={x.nivel} className="flex items-center justify-between gap-3">
                <span>Nivel {x.nivel} <small className="text-muted">({x.gastados} gastado{x.gastados === 1 ? '' : 's'})</small></span>
                <span className="flex items-center gap-1.5">
                  <Boton tamano="sm" disabled={!k} onClick={() => cambiar(x.nivel, -1)} aria-label={`Uno menos de nivel ${x.nivel}`}>−</Boton>
                  <b className="w-6 text-center">{k}</b>
                  <Boton tamano="sm" disabled={k >= x.gastados || suma + x.nivel > max} onClick={() => cambiar(x.nivel, 1)} aria-label={`Uno más de nivel ${x.nivel}`}>+</Boton>
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mb-0 mt-3 text-sm text-muted">Suma: {suma} de {max}</p>
        <div className="mt-4 flex justify-end gap-2">
          <Boton onClick={() => setAbierto(false)}>Cancelar</Boton>
          <Boton variante="primario" disabled={!suma} onClick={confirmar}>Recuperar</Boton>
        </div>
      </Dialogo>
    </>
  );
}

/** Recupera hasta `n` puntos de un recurso de reserva (o espacios de pacto) de una vez. */
function RecuperarPuntos({ id, n, recurso: rid, que }: { id: string; n: number; recurso: string; que: string }) {
  const k = Math.min(n, gastados(id));
  return (
    <Grande texto={k ? `+${k}` : 'Recuperar'} debajo={sinUsos(rid) ? 'ya lo usaste' : k ? que : `no tienes ${que} gastados`}
      disabled={!k || sinUsos(rid)} onClick={() => recuperarPuntos(id, k, rid)} />
  );
}

/** Cambia un conjuro preparado de nivel 1 o más por otro de la lista de la clase. */
function MemorizarConjuro() {
  const c = S.c, pj = S.pj, id = useId();
  const [abierto, setAbierto] = useState(false);
  const [sale, setSale] = useState(''), [entra, setEntra] = useState('');
  const propios = (pj.conjuros || []).filter((s: any) => +s.nivel > 0 && !c.esExtra(s));
  const lista = listaDeConjuros(pj.clase, c.C) || c.listaSub;
  const tiene = (s: any) => (pj.conjuros || []).some((x: any) => norm(x.nombre) === norm(s.nombre));
  const opciones = lista ? todosConjuros().filter(s => conjuroDeLaLista(s, lista) && +s.nivel > 0 && +s.nivel <= c.nivelMax && !tiene(s))
    .sort((a, b) => +a.nivel - +b.nivel || a.nombre.localeCompare(b.nombre)) : [];
  const confirmar = () => {
    const s = opciones.find(x => x.nombre === entra);
    if (sale && s) cambiarConjuro(sale, s);
    setAbierto(false); setSale(''); setEntra('');
  };
  return (
    <>
      <Grande texto="Cambiar" debajo="un conjuro preparado" disabled={!propios.length} onClick={() => setAbierto(true)} />
      <Dialogo abierto={abierto} onCerrar={() => setAbierto(false)} titulo="Memorizar conjuro" descripcion="Cambias un conjuro preparado por otro de tu libro." abajo>
        <div className="grid gap-3">
          <Campo etiqueta="Dejas de preparar">
            <select id={id + 's'} value={sale} onChange={ev => setSale(ev.target.value)} className={claseCampo}>
              <option value="">Elige uno…</option>
              {propios.map((s: any) => <option key={s.nombre} value={s.nombre}>{s.nombre} (nivel {s.nivel})</option>)}
            </select>
          </Campo>
          <Campo etiqueta="Preparas en su lugar">
            <select id={id + 'e'} value={entra} onChange={ev => setEntra(ev.target.value)} className={claseCampo}>
              <option value="">Elige uno…</option>
              {opciones.map(s => <option key={s.nombre} value={s.nombre}>{s.nombre} (nivel {s.nivel})</option>)}
            </select>
          </Campo>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Boton onClick={() => setAbierto(false)}>Cancelar</Boton>
          <Boton variante="primario" disabled={!sale || !entra} onClick={confirmar}>Cambiar</Boton>
        </div>
      </Dialogo>
    </>
  );
}
