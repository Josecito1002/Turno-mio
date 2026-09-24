/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Campo, Casilla as CasillaKit, Nota } from '@/shared/ui/kit';
import { avisar } from '@/shared/ui/avisos';
import { getSubs, getSubAltos, subNivel, descSubclase } from '@/features/biblioteca/domain/biblioteca';
import { compute } from '../../domain/calculo';
import { setVal } from '../../acciones';
import { Entrada } from '../piezas';
import { Selector } from './campos';
import { EtiquetaFuente } from './Tarjetas';
import { fuenteSubclase } from '@/features/reglas/data/fuentes';

/* Qué da una subclase en cada nivel: calcula el personaje en cada nivel en que la subclase da algo,
   con esa subclase puesta, para mostrar los rasgos con sus números y reglas revisadas de ese nivel. */
export function rasgosPorNivel(pj: any, sk: string) {
  const S = getSubs(pj, pj.clase).find((s: any) => s.key === sk);
  if (!S) return { niveles: [], elecciones: [] };
  const base = subNivel(pj, pj.clase);
  const rs = [...(S.rasgos || []), ...(getSubAltos(pj, pj.clase, sk) || [])];
  const niveles = [...new Set(rs.map((r: any) => Math.max(1, +r.n || 1)))].sort((a, b) => a - b);
  // Elecciones de la subclase: con tu nivel actual (así el máximo de fórmulas es el tuyo); si aún no llegas, las del primer nivel en que aparecen
  const elecciones = new Map<string, any>();
  const deSub = (c: any) => (c.elecciones || []).filter((e: any) => e.grupo === 'sub' && !elecciones.has(e.id)).forEach((e: any) => elecciones.set(e.id, e));
  if (+pj.nivel >= base) deSub(compute({ ...structuredClone(pj), subclase: sk }));
  const porNivel = niveles.map(L => {
    const c = compute({ ...structuredClone(pj), nivel: Math.max(L, base), subclase: sk });
    deSub(c);
    return { nivel: L, entradas: c.entries.filter((e: any) => e.grupo === 'sub' && (e.nivel || 1) === L) };
  });
  return { niveles: porNivel.filter(n => n.entradas.length), elecciones: [...elecciones.values()] };
}

/** Selectores de lo que se elige dentro de un rasgo (el patrón de un pacto, el modelo de una armadura...).
    Cada opción dice qué hace. Con `soloVer` se listan las opciones sin poder elegir (subclase aún no disponible). */
export function ElegirElecciones({ pj, elecciones, soloVer }: { pj: any; elecciones: any[]; soloVer?: boolean }) {
  if (!elecciones.length) return null;
  if (soloVer) return <>{elecciones.map((el: any) => <OpcionesSoloVer key={el.id} el={el} />)}</>;
  const varias = elecciones.filter(el => el.multi), una = elecciones.filter(el => !el.multi);
  return (
    <>
      {varias.map((el: any) => <EleccionVarias key={el.id} pj={pj} el={el} />)}
      {una.map((el: any) => <EleccionUna key={el.id} pj={pj} el={el} />)}
    </>
  );
}

const Desc = ({ texto }: { texto?: string }) => texto ? <span className="block text-sm text-muted">{texto}</span> : null;
const cuando = (el: any) => `Lo pide ${el.src}${el.nivel > 1 ? ` (nivel ${el.nivel})` : ''}.`;

/** Varias opciones con un máximo (fórmulas conocidas, maldiciones conocidas...). */
function EleccionVarias({ pj, el }: { pj: any; el: any }) {
  const sel: string[] = [].concat(pj.elecciones?.[el.id] || []);
  const cambiar = (k: string, marcada: boolean, input: HTMLInputElement) => {
    if (marcada && sel.length >= el.max) { avisar(`Solo puedes elegir ${el.max}.`, 'aviso'); input.checked = false; return; }
    setVal(`elecciones.${el.id}`, marcada ? [...sel, k] : sel.filter(x => x !== k));
  };
  return (
    <fieldset className="m-0 mt-3 border-0 p-0">
      <legend className="font-bold">{el.titulo}</legend>
      <p aria-live="polite" className="m-0 text-sm text-muted">{sel.length} de {el.max} elegidas. {cuando(el)}</p>
      <div className="mt-1 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-x-4 gap-y-1">
        {el.opciones.map((o: any) => (
          <CasillaKit key={o.key} checked={sel.includes(o.key)} onChange={(v, input) => cambiar(o.key, v, input)} nota={o.nota}>
            {o.nombre}<Desc texto={o.desc} />
          </CasillaKit>
        ))}
      </div>
    </fieldset>
  );
}

/** Una sola opción: el selector y, debajo, qué hace la elegida (o todas, si aún no eliges). */
function EleccionUna({ pj, el }: { pj: any; el: any }) {
  const actual = el.opciones.find((o: any) => o.key === pj.elecciones?.[el.id]);
  return (
    <div className="mt-3">
      <Campo etiqueta={el.titulo} ayuda={cuando(el)}>
        <Selector path={`elecciones.${el.id}`} value={pj.elecciones?.[el.id] || ''}>
          <option value="">Elige…</option>
          {el.opciones.map((o: any) => <option key={o.key} value={o.key}>{o.nombre}</option>)}
        </Selector>
      </Campo>
      {actual ? <p className="mb-0 mt-1 text-sm"><b>{actual.nombre}:</b> {actual.desc}</p> : <ListaOpciones el={el} />}
    </div>
  );
}

function ListaOpciones({ el }: { el: any }) {
  if (!el.opciones.some((o: any) => o.desc)) return null;
  return (
    <ul className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
      {el.opciones.map((o: any) => <li key={o.key}><b>{o.nombre}</b>{o.nota ? ` ${o.nota}` : ''}{o.desc ? `: ${o.desc}` : ''}</li>)}
    </ul>
  );
}

function OpcionesSoloVer({ el }: { el: any }) {
  return (
    <div className="mt-3">
      <p className="m-0 font-bold">{el.titulo}{el.multi ? ` (eliges ${el.max})` : ' (eliges una)'}</p>
      <ListaOpciones el={el} />
    </div>
  );
}

/** Panel de la subclase elegida: descripción, lo que se elige dentro de ella y lo que da en cada nivel. */
export function InfoSubclase({ pj, sk, lvl, soloVer }: { pj: any; sk: string; lvl: number; soloVer?: boolean }) {
  const S = getSubs(pj, pj.clase).find((s: any) => s.key === sk);
  if (!S) return null;
  const { niveles, elecciones } = rasgosPorNivel(pj, sk);
  const desc = descSubclase(sk);
  return (
    <section aria-labelledby="info-subclase" className="mt-4 rounded-2xl bg-soft p-4 ring-1 ring-rule/60">
      <h3 id="info-subclase" className="m-0 font-serif text-xl font-bold">{S.n}{soloVer && <span className="ml-2 text-sm font-normal text-muted">(vista previa)</span>}<EtiquetaFuente fuente={fuenteSubclase(S, pj.clase)} className="ml-2 align-middle font-sans" /></h3>
      {desc && <p className="mb-0 mt-1">{desc}</p>}
      <ElegirElecciones pj={pj} elecciones={elecciones} soloVer={soloVer} />
      {niveles.length ? niveles.map(n => (
        <div key={n.nivel} className="mt-4">
          <h4 className="m-0 font-serif text-lg font-bold">Nivel {n.nivel}{n.nivel > lvl && <span className="ml-2 text-sm font-normal text-muted">(más adelante)</span>}</h4>
          {n.entradas.map((e: any, i: number) => <Entrada key={i} e={e} />)}
        </div>
      )) : <Nota>Esta subclase no trae rasgos cargados. Agrégalos en Rasgos propios.</Nota>}
    </section>
  );
}
