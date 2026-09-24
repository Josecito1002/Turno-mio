/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S } from '@/app-shell/estado';
import { sign } from '@/shared/utils/texto';
import { Boton, Dialogo, Segmentado, Tarjeta } from '@/shared/ui/kit';
import { EtiquetaTipo } from '@/features/reglas/components/TipoAccion';
import { useDados } from '@/features/dados/components/Bandeja';
import { compute } from '../../domain/calculo';
import { periciaN } from '@/features/reglas/data/clases';
import { pendientes } from '../../domain/pendientes';
import { CampoNumero } from '../editor/campos';
import { ElegirEstilo, ElegirSubclase } from '../editor/PasosOrigen';
import { ElegirMaestrias, ElegirPericia, MejoraNivel } from '../editor/PasosAtributos';
import { ContadoresConjuros, ListaConjuros } from '../editor/PasosMagia';
import { ElegirElecciones } from '../editor/InfoSubclase';
import { cerrarSubida, confirmarSubida, deshacerSubida, pgPromedio, tirarPg } from '../../acciones';

/* Si la subclase se elige en el diálogo, su panel ya trae sus elecciones (patrón, fórmulas...): aparte solo van las demás */
const eleccionesSueltas = (c: any, conSubclase: boolean) => (c.elecciones || []).filter((e: any) => !(conSubclase && e.grupo === 'sub'));

/** Una elección de la subida de nivel, hecha aquí mismo con las mismas piezas del editor. */
function Eleccion({ clave, pj, c, lista, conSubclase }: { clave: string; pj: any; c: any; lista: boolean; conSubclase: boolean }) {
  const L = clave.startsWith('mejora-') ? +clave.slice(7) : 0;
  const titulo = ({
    subclase: 'Tu subclase', estilo: 'Estilo de combate', pericia: `Pericia (${periciaN(pj.clase, c.lvl)})`,
    conjuros: 'Trucos y conjuros', maestria: `Maestría con armas (${pj.maestrias.length} de ${c.C?.maestrias || 0})`, elecciones: 'Elige también',
  } as Record<string, string>)[clave] || (L ? `Mejora de nivel ${L}` : clave);
  return (
    <Tarjeta as="section" aria-label={titulo} className="bg-soft/60">
      <h3 className="m-0 flex items-center gap-2 font-serif text-lg font-bold text-adi">
        {titulo}{lista && <span className="font-sans text-sm font-bold text-pas">✓ Listo</span>}
      </h3>
      {clave === 'subclase' && <ElegirSubclase pj={pj} c={c} />}
      {clave === 'estilo' && <ElegirEstilo pj={pj} c={c} />}
      {L > 0 && <MejoraNivel pj={pj} c={c} L={L} sinTitulo />}
      {clave === 'pericia' && <ElegirPericia pj={pj} c={c} />}
      {clave === 'maestria' && <ElegirMaestrias pj={pj} c={c} />}
      {clave === 'elecciones' && <ElegirElecciones pj={pj} elecciones={eleccionesSueltas(c, conSubclase)} />}
      {clave === 'conjuros' && (
        <>
          <ContadoresConjuros c={c} />
          <div className="mt-3"><ListaConjuros pj={pj} c={c} /></div>
        </>
      )}
    </Tarjeta>
  );
}

function Hecho({ c, s }: { c: any; s: any }) {
  const tirar = useDados();
  const pj = S.pj, i = c.lvl - 2, die = c.die, con = c.m.con;
  const delta = c.hpMax - s.hpAntes, v = pj.pgTiradas?.[i];
  let base: number, modo: string;
  if (pj.pgModo === 'maximo') { base = die; modo = 'max'; }
  else if (pj.pgModo === 'tiradas' && v) { base = v; modo = 'tirada'; }
  else { base = die / 2 + 1; modo = 'prom'; }
  const extra = delta - Math.max(1, base + con);
  const desglose = `${modo === 'max' ? 'Máximo del dado' : modo === 'tirada' ? 'Tirada' : 'Promedio'} ${base} ${con >= 0 ? '+' : '−'} ${Math.abs(con)} de CON${extra > 0 ? ` + ${extra} de rasgos` : ''}`;
  const grupos: [string, string][] = [['clase', `De ${c.C?.n || 'tu clase'}`], ['sub', c.SD ? `De ${c.SD.n}` : 'De tu subclase'], ['especie', 'De tu especie'], ['dote', 'De tus dotes'], ['extra', 'Rasgos propios']];
  // Rasgos nuevos en vivo: si eliges la subclase o una dote aquí mismo, aparecen sin cerrar el diálogo
  const antes = compute({ ...structuredClone(pj), nivel: c.lvl - 1 });
  const vistos = new Set(antes.entries.map((e: any) => e.nombre + '|' + e.texto));
  const nuevos = c.entries.filter((e: any) => e.grupo !== 'reglas' && !vistos.has(e.nombre + '|' + e.texto));
  // Lo que había que elegir al subir, más lo que haya surgido después (por ejemplo, el patrón de la subclase recién elegida)
  const ahora = pendientes(c);
  const conSubclase = !!s.elegir?.includes('subclase');
  const secciones = [...new Set([...(s.elegir || []), ...ahora])].filter(k => k !== 'elecciones' || eleccionesSueltas(c, conSubclase).length > 0);
  return (
    <div className="flex flex-col gap-3">
      <Tarjeta className="bg-soft/60">
        <h3 className="m-0 font-serif text-lg font-bold text-adi">Puntos de golpe</h3>
        <p className="m-0 font-serif text-3xl font-extrabold">+{delta} <span className="font-sans text-base font-normal text-muted">ahora tienes {c.hpMax} máximos</span></p>
        <p className="m-0 text-sm text-muted">{desglose}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Segmentado etiqueta="Cómo calcular los PG de este nivel" valor={modo === 'tirada' ? 'tirada' : 'prom'}
            opciones={[['prom', `Promedio (${die / 2 + 1})`], ['tirada', modo === 'tirada' ? 'Volver a tirar' : `Tirar d${die}`]]}
            onCambiar={k => (k === 'prom' ? pgPromedio() : tirarPg(tirar, i))} />
          <label className="flex items-center gap-2 text-sm font-bold">A mano
            <CampoNumero path={`pgTiradas.${i}`} value={modo === 'tirada' ? v : ''} min={1} max={die} placeholder="—" className="w-20!" aria-label={`Resultado de tu d${die}`} />
          </label>
        </div>
      </Tarjeta>
      <Tarjeta className="bg-soft/60">
        <h3 className="m-0 font-serif text-lg font-bold text-adi">Rasgos nuevos</h3>
        {nuevos.length ? grupos.map(([g, t]) => {
          const xs = nuevos.filter((n: any) => n.grupo === g);
          return xs.length ? (
            <div key={g} className="mt-2"><p className="m-0 text-sm text-muted">{t}</p>
              <ul className="m-0 mt-1 list-disc pl-5">{xs.map((n: any, k: number) => (
                <li key={k} className="my-1"><b>{n.nombre}</b> {n.t && <EtiquetaTipo t={n.t} />}
                  {n.texto && <span className="block text-sm text-muted">{String(n.texto).split(/(?<=[.;])\s+/)[0]}</span>}</li>
              ))}</ul>
            </div>
          ) : null;
        }) : <p className="m-0 mt-1 text-sm text-muted">Este nivel no trae rasgos nuevos cargados.</p>}
      </Tarjeta>
      {secciones.map(k => <Eleccion key={k} clave={k} pj={pj} c={c} lista={!ahora.includes(k)} conSubclase={conSubclase} />)}
      <div className="flex flex-wrap justify-end gap-2">
        <Boton onClick={deshacerSubida}>Deshacer</Boton>
        <Boton variante="primario" onClick={cerrarSubida}>Listo</Boton>
      </div>
    </div>
  );
}

/** Subida de nivel: primero se confirma la clase, luego se muestra lo que se ganó. */
export function SubidaNivel() {
  const s = S.subida;
  const abierto = !!(s && S.pj && s.id === S.pj.id && (S.view === 'ficha' || S.view === 'editor'));
  const c = abierto ? compute(S.pj) : null;
  const elegir = s?.fase === 'elegir';
  return (
    <Dialogo abierto={abierto} onCerrar={cerrarSubida} ancho="lg"
      titulo={c ? (elegir ? 'Subir de nivel' : `¡Subiste a nivel ${c.lvl}!`) : ''}
      descripcion={c ? (elegir ? `${S.pj.nombre || 'Tu personaje'}, nivel ${c.lvl} de 20` : `${c.C?.n || ''}: nivel ${c.lvl - 1} → ${c.lvl}${c.pb > s.pbAntes ? `. Tu competencia sube a ${sign(c.pb)}` : ''}`) : undefined}>
      {c && (elegir ? (
        <>
          <p className="mt-0">Elige qué clase gana el nivel:</p>
          <button type="button" onClick={confirmarSubida}
            className="flex w-full cursor-pointer flex-col gap-0.5 rounded-2xl bg-soft p-4 text-left ring-1 ring-rule hover:ring-adi focus-visible:outline-3 focus-visible:outline-rea">
            <b className="font-serif text-lg">{c.C?.n || 'Clase'}{c.SD ? `, ${c.SD.n}` : ''}</b>
            <span className="text-sm text-muted">Nivel {c.lvl} → {c.lvl + 1}</span>
          </button>
          <div className="mt-4 flex justify-end"><Boton onClick={cerrarSubida}>Cancelar</Boton></div>
        </>
      ) : <Hecho c={c} s={s} />)}
    </Dialogo>
  );
}
