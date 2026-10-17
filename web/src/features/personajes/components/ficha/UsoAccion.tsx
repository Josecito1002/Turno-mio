/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { Boton, Dialogo } from '@/shared/ui/kit';
import { avisar } from '@/shared/ui/avisos';
import { esc, modStr, norm, richT } from '@/shared/utils/texto';
import { TIPOS } from '@/features/reglas/data/caracteristicas';
import { CampoTirada, totalTirada } from '@/features/dados/components/CampoTirada';
import { partesTirada } from '@/features/dados/domain/dados';
import { CONDICIONES } from '@/features/mesa/domain/combate';
import { hastaDesde, rondasDe, textoDuracion } from '@/features/mesa/domain/duracion';
import { gastarEspacio, gastarRecurso, setMano } from '../../acciones';
import { ARMAS } from '@/features/reglas/data/equipo';
import { escalarDados } from '@/features/reglas/data/efectos-conjuro';
import { dadosAlLanzar, espaciosPara, type Extra } from '../../domain/lanzar';
import { enviarGolpeMesa, enviarSalvacionMesa, usarAccionMesa, type TipoAccionRonda } from '@/features/mesa/api';

/** Algo que el jugador puede hacer con una acción: un ataque, un conjuro, un rasgo o una acción básica. */
/** Lo que un conjuro deja sobre un objetivo y se puede repetir en los siguientes turnos (Rayo de hechicería, Calentar metal…) */
export type Marca = {
  id: string; nombre: string; texto: string; dexpr: string; tipo: string; en: 'accion' | 'adicional'; desde: 'ya' | 'siguiente';
  objetivo: boolean; atk?: number; salv?: string; cd?: number; porNivel?: string; nivelBase?: number;
};
/** Alguien del combate a quien se le puede hacer algo: enemigos y aliados (otros jugadores, mascotas, tú mismo) */
export type Objetivo = { k: string; nombre: string; aliado?: boolean };

export type Uso = {
  tipo: TipoAccionRonda; nombre: string; coste?: string;
  /** Qué hace, en texto (con formato si `raw`) */
  texto: string; raw?: boolean;
  /** Ataque con tirada: bono al impacto */
  atk?: number;
  /** Salvación que tiran los objetivos (FUE, DES…) y su CD */
  salv?: string; cd?: number;
  /** Los dados de daño, para tirar uno virtual si el jugador lo prefiere */
  dexpr?: string;
  /** Cuántos golpes o ataques hace de una vez (Uno-Dos: 2); cada uno se registra por separado y el daño se suma */
  golpes?: number;
  /** Efectos que suman ataques solo si se cumplen (el jugador marca si valen ahora) */
  renuncia?: boolean;
  condiciones?: { rasgo: string; texto: string; mas: number }[];
  /** Deja una marca en el objetivo que sigue haciendo daño en tus siguientes turnos como acción adicional (Rayo de hechicería) */
  marca?: Marca;
  /** Deja un efecto (bono, protección…) en la criatura elegida, que se le muestra en su pantalla */
  efecto?: { condicion: string; bono: string };
  /** Pone en tu mano un arma cuerpo a cuerpo que eliges (Pacto del Filo) */
  equipar?: boolean;
  /** Cura en lugar de dañar */
  cura?: boolean;
  /** Cantidad fija (una curación de 25 PG): ya viene escrita */
  fijo?: number;
  /** Si hace daño o impone algo a otros */
  afecta: boolean;
  /** Lista de opciones que se pueden usar con este rasgo (los conjuros de Conjuro Apresurado) */
  lista?: { titulo: string; items: { nombre: string; nota: string; texto?: string }[] };
  /** Recurso que gasta al usarlo (un uso del rasgo) */
  gasta?: string;
  /** Cuántas rondas dura lo que deja (Bendición: 10), si lo dice su duración */
  duracion?: number;
  /** De dónde sale el bono del ataque ("3 FUE + 2 competencia") y el del daño ("3 FUE"), y el tipo de daño */
  atkDesg?: string; dmgDesg?: string; tipoDano?: string;
  /** Lo que se puede sumar al acertar (Castigo divino, Ataque furtivo…), con lo que gasta */
  extras?: Extra[];
  /** Conjuro de nivel 1 o más: se paga con un espacio (o con el rasgo que lo da, o como ritual) */
  conjuro?: { nivel: number; rasgo?: string; ritual?: boolean; desc: string; base: string; bono: number };
};

const AREA = /esfera|cubo|cono|l[ií]nea|cilindro|radio|[aá]rea|a tu alrededor|emanaci[oó]n/i;
const NO_IMPONIBLES = ['Concentrado', 'Agotamiento', 'Invisible', 'Inconsciente'];
/** Condiciones que el texto menciona (con su raíz, para "Apresado/a", "Derribado"…). */
export function condicionesEn(texto: string): string[] {
  const t = norm(texto);
  return CONDICIONES.filter(n => !NO_IMPONIBLES.includes(n) && t.includes(norm(n).slice(0, -1)));
}

/** Efectos activos que suman (o restan) un dado a tus tiradas de ataque. */
const DADOS_ATAQUE = [
  { re: /^(bendicion|bendecid)/, nombre: 'Bendición', dados: '1d4', expr: '1d4', signo: 1 },
  { re: /^perdicion/, nombre: 'Perdición', dados: '1d4', expr: '1d4', signo: -1 },
];
const NUM_OBJ: Record<string, number> = { dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6 };
/** "Hasta tres criaturas": a cuántos se puede elegir (1 si no lo dice). */
function maxObjetivos(texto: string) {
  const m = /hasta (dos|tres|cuatro|cinco|seis|\d+) (?:criaturas|objetivos|aliados)/i.exec(texto);
  return m ? (NUM_OBJ[m[1].toLowerCase()] ?? +m[1]) : 1;
}
/** Las opciones de lo que se suma al acertar, juntas por rasgo: Castigo divino gratis o con cada nivel de espacio es una sola elección. */
function gruposExtras(extras: Extra[]) {
  const g: { base: string; t: string; opciones: Extra[] }[] = [];
  for (const x of extras) {
    if (x.atk || !x.expr) continue; // otro ataque (la otra arma) se usa aparte
    const base = x.nombre.replace(/ (gratis|con espacio de nivel \d+)$/, '');
    const y = g.find(z => z.base === base);
    if (y) y.opciones.push(x); else g.push({ base, t: x.t, opciones: [x] });
  }
  return g;
}

/** Confirmar el uso de una acción: lee sus efectos, elige a quién afecta y, al confirmar, la gasta y se lo cuenta al DM. */
export function UsoAccion({ c, uso, ventaja, enemigos, mesa, yaGastada, alCerrar, alUsar, alMarcar, ahora }: {
  /** La ronda del combate y tu lugar en el orden, para saber cuándo termina lo que dejas */
  ahora?: { ronda: number; k: string };
  alMarcar?: (m: Marca, objetivo: string, nombre: string) => void;
  c: any; uso: Uso | null; ventaja?: '' | 'v' | 'd'; enemigos: Objetivo[]; mesa: { dmId: string; campanaId: string; personajeId: string };
  yaGastada: boolean; alCerrar: () => void; alUsar: (t: TipoAccionRonda) => void;
}) {
  return (
    <Dialogo abierto={!!uso} onCerrar={alCerrar} titulo={uso?.nombre || ''} ancho="lg"
      descripcion={uso ? `${TIPOS[uso.tipo][0]}${uso.coste ? ` · ${uso.coste}` : ''}` : undefined}>
      {uso && <Cuerpo key={uso.nombre + uso.tipo} c={c} uso={uso} ventaja={ventaja} enemigos={enemigos} mesa={mesa} yaGastada={yaGastada} alCerrar={alCerrar} alUsar={alUsar} alMarcar={alMarcar} ahora={ahora} />}
    </Dialogo>
  );
}

function Cuerpo({ c, uso, ventaja, enemigos, mesa, yaGastada, alCerrar, alUsar, alMarcar, ahora }: { ahora?: { ronda: number; k: string }; alMarcar?: (m: Marca, objetivo: string, nombre: string) => void; c: any; uso: Uso; ventaja?: '' | 'v' | 'd'; enemigos: Objetivo[]; mesa: { dmId: string; campanaId: string; personajeId: string }; yaGastada: boolean; alCerrar: () => void; alUsar: (t: TipoAccionRonda) => void }) {
  const area = !!uso.salv && AREA.test(uso.texto);
  const conds = condicionesEn(uso.texto);
  const [objetivos, setObjetivos] = useState<string[]>([]);
  // Efectos que suman ataques solo si se cumplen: el jugador marca cuáles valen ahora
  const [marcadas, setMarcadas] = useState<string[]>([]);
  const [renuncia, setRenuncia] = useState(false);
  const extra = (uso.condiciones || []).filter(x => marcadas.includes(x.rasgo)).reduce((t, x) => t + x.mas, 0);
  const maxGolpes = (uso.golpes && uso.golpes > 1 ? uso.golpes : 1) + (uso.condiciones || []).reduce((t, x) => t + x.mas, 0);
  const nGolpes = (uso.golpes && uso.golpes > 1 ? uso.golpes : 1) + extra;
  // Daño sin dados (un golpe sin armas de 1 + FUE, una curación fija): ya viene escrito
  const fijoInicial = uso.fijo != null ? String(uso.fijo) : uso.dexpr && !partesTirada(uso.dexpr).conDados ? String(partesTirada(uso.dexpr).mod) : '';
  // Con dados, `danos` guarda solo la suma de los dados (el número fijo se suma solo); sin dados, el total
  const [danos, setDanos] = useState<string[]>(() => Array(maxGolpes).fill(fijoInicial));
  // El d20 natural de cada ataque
  const [nats, setNats] = useState<string[]>(() => Array(maxGolpes).fill(''));
  // Una tirada virtual se hace una sola vez: después el valor queda fijo (o se escribe a mano desde el principio)
  const [tiradas, setTiradas] = useState<boolean[]>(() => Array(maxGolpes).fill(false));
  const [tiradasAtk, setTiradasAtk] = useState<boolean[]>(() => Array(maxGolpes).fill(false));
  const [cond, setCond] = useState(uso.salv ? conds[0] || '' : '');
  // Dados que se suman al ataque por un efecto activo (Bendición, Perdición) y lo que salió en cada uno, por ataque
  const dadosAtk = uso.atk != null ? DADOS_ATAQUE.filter(d => (c.pj.efectos || []).some((e: any) => d.re.test(norm(e.nombre || '')))) : [];
  const [valAtk, setValAtk] = useState<Record<string, string>>({});
  // Lo que se suma al acertar: una opción por grupo (Castigo divino con un espacio u otro) y lo que salió en sus dados, por ataque
  const grupos = gruposExtras(uso.extras || []);
  const [selExtra, setSelExtra] = useState<Record<string, string>>({});
  const [valExtra, setValExtra] = useState<Record<string, string>>({});
  const elegidos = (i: number) => grupos.map(g => g.opciones.find(o => o.nombre === selExtra[`${i}|${g.base}`])).filter(Boolean) as Extra[];
  const extraDe = (i: number) => nats[i] === '1' ? 0 : elegidos(i).reduce((t, x) => t + Math.max(0, totalTirada(x.expr, valExtra[`${i}|${x.nombre}`] || '', nats[i] === '20') ?? 0), 0);
  // Pacto del Filo: el arma de pacto se conjura en la mano; se elige una de tus armas cuerpo a cuerpo
  const armasMano: string[] = uso.equipar ? (c.pj.armas || []).map(([k]: any) => k).filter((k: string) => ARMAS[k] && !ARMAS[k].dist) : [];
  const [arma, setArma] = useState(() => (armasMano.includes(c.manos?.a) ? c.manos.a : armasMano[0] || ''));
  const [ocupado, setOcupado] = useState(false);
  // Con qué se paga un conjuro de nivel: un espacio (de ese nivel o mayor), el rasgo que lo da o, si es ritual, sin gastar
  const cj = uso.conjuro;
  const espacios = cj ? espaciosPara(c, cj.nivel) : [];
  const rasgoRec = cj?.rasgo ? (c.recursos || []).find((r: any) => r.id === cj.rasgo) : null;
  const quedaRasgo = rasgoRec ? rasgoRec.max - Math.min(c.pj.used?.[rasgoRec.id] || 0, rasgoRec.max) : 0;
  const primero = espacios.find((e: any) => e.quedan > 0);
  const [via, setVia] = useState<string>(cj ? (rasgoRec && quedaRasgo ? 'rasgo' : primero ? 'slot' + primero.nivel : cj.ritual ? 'ritual' : '') : '');
  const nivelUsado = via.startsWith('slot') ? +via.slice(4) : cj?.nivel || 0;
  const dexpr = cj ? dadosAlLanzar(cj.base, cj.nivel, nivelUsado, cj.desc, cj.bono) || undefined : uso.dexpr;
  const recGasta = uso.gasta ? (c.recursos || []).find((r: any) => r.id === uso.gasta) : null;
  const quedaGasta = recGasta ? recGasta.max - Math.min(c.pj.used?.[recGasta.id] || 0, recGasta.max) : 0;
  const mitad = !!uso.salv && /mitad/i.test(uso.texto);
  const campo = 'min-h-11 w-full rounded bg-surface-container-lowest px-2 text-body-md text-on-surface';
  // Varios objetivos: un área, o "hasta tres criaturas" (Bendición, Perdición)
  const maxObj = maxObjetivos(uso.texto + ' ' + (uso.efecto?.bono || '')), varios = (!!uso.salv && area) || maxObj > 1;
  const alternar = (k: string) => setObjetivos(o => (varios ? (o.includes(k) ? o.filter(x => x !== k) : maxObj > 1 && o.length >= maxObj ? o : [...o, k]) : o[0] === k ? [] : [k]));
  // Cuánto dura lo que deja en el objetivo (una condición o un efecto)
  const rondas = uso.duracion ?? rondasDe(`${uso.efecto?.bono || ''} ${uso.texto}`);
  const duracion = rondas && ahora ? { rondas, hastaRonda: hastaDesde(rondas, ahora.ronda, ahora.k).ronda, hastaK: ahora.k } : rondas ? { rondas } : {};
  const nombres = objetivos.map(k => enemigos.find(e => e.k === k)?.nombre || '').filter(Boolean);
  // Las salvaciones solo se mandan a enemigos; lo demás (ataques, curas, bonos) puede ir a cualquiera, aliados incluidos
  const posibles = uso.salv && !uso.cura ? enemigos.filter(e => !e.aliado) : enemigos;
  const sinDano = !!uso.efecto && !dexpr;
  const etiquetaDano = uso.cura ? 'Curación' : 'Daño';
  const parcial = (x: string) => Math.max(0, Math.round(+x || 0));
  const adv = ventaja && !renuncia ? (ventaja === 'v' ? 1 : -1) : 0;
  const modoDano = dexpr && partesTirada(dexpr).conDados ? 'dados' : 'total';
  /** Lo que hace cada golpe: con un 1 natural falla; con un 20 el daño es crítico */
  const danoDe = (i: number) => nats[i] === '1' ? 0
    : (modoDano === 'dados' ? Math.max(0, totalTirada(dexpr!, danos[i], nats[i] === '20') ?? 0) : parcial(danos[i])) + extraDe(i);
  const masAtk = (i: number) => dadosAtk.map(d => ({ dados: d.dados, por: d.nombre, signo: d.signo, valor: valAtk[`${i}|${d.nombre}`] ? Math.round(+valAtk[`${i}|${d.nombre}`] || 0) : null }));
  const totalAtk = (i: number) => nats[i] === '' || uso.atk == null ? null : Math.round(+nats[i]) + uso.atk + masAtk(i).reduce((t, x) => t + x.signo * (x.valor ?? 0), 0);
  const golpes = Array.from({ length: nGolpes }, (_, i) => i);
  const n = golpes.reduce((t, i) => t + danoDe(i), 0);
  const deDano = uso.cura ? 'de curación' : 'de daño';
  const golpeTxt = (i: number) => [
    uso.atk != null && nats[i] !== '' ? `impacto ${totalAtk(i)}${nats[i] === '20' ? ' (20 natural)' : nats[i] === '1' ? ' (1 natural)' : ''}` : '',
    danoDe(i) ? `${danoDe(i)} ${deDano}` : '',
    elegidos(i).length && nats[i] !== '1' ? `con ${elegidos(i).map(x => x.nombre).join(' y ')}` : '',
  ].filter(Boolean).join(', ');

  const confirmar = async () => {
    if (cj && !via) { avisar('Elige con qué lo lanzas.', 'error'); return; }
    if (uso.equipar && !arma) { avisar('Primero agrega un arma cuerpo a cuerpo a tu inventario.', 'error'); return; }
    if (uso.marca?.objetivo && !objetivos.length) { avisar('Elige a quién marca, acierte o no.', 'error'); return; }
    if ((uso.efecto || uso.cura) && !objetivos.length) { avisar('Elige a quién se lo haces.', 'error'); return; }
    if (n && !objetivos.length) { avisar('Elige a quién le haces el daño.', 'error'); return; }
    // Primero se paga: si no queda con qué, no se hace nada (lo que se suma al acertar, solo si el ataque no falló con un 1)
    const pagar = golpes.flatMap(i => (nats[i] === '1' ? [] : elegidos(i)));
    for (const x of pagar) if (x.gasta && !(/^slot\d+$/.test(x.gasta) ? gastarEspacio(+x.gasta.slice(4)) : gastarRecurso(x.gasta))) return;
    if (via === 'rasgo' && rasgoRec && !gastarRecurso(rasgoRec.id)) return;
    if (uso.gasta && !gastarRecurso(uso.gasta)) return;
    if (via.startsWith('slot') && !gastarEspacio(nivelUsado)) return;
    setOcupado(true);
    try {
      const pago = via === 'rasgo' ? `con ${rasgoRec?.nombre}` : via.startsWith('slot') ? `con espacio de nivel ${nivelUsado}` : cj?.ritual ? 'como ritual' : '';
      const resumen = [pago, nombres.length ? `a ${nombres.join(', ')}` : '', nGolpes > 1 && golpes.some(i => golpeTxt(i)) ? `${golpes.map(i => `ataque ${i + 1}: ${golpeTxt(i) || 'sin tirar'}`).join('; ')}${n ? ` = ${n} ${deDano}` : ''}` : nGolpes > 1 ? '' : golpeTxt(0), uso.salv && objetivos.length ? `salvación de ${uso.salv} CD ${uso.cd}` : '', cond].filter(Boolean).join(' · ');
      await usarAccionMesa(mesa, uso.tipo, uso.nombre, resumen);
      if (objetivos.length && (n || cond || uso.efecto)) {
        const tipoDano = n && !uso.cura && uso.tipoDano ? { tipoDano: uso.tipoDano } : {};
        const dura = cond || uso.efecto ? duracion : {};
        if (uso.salv && uso.cd && !uso.cura) await enviarSalvacionMesa(mesa, { objetivos, salv: uso.salv, cd: uso.cd, dano: n, mitad, ...(cond ? { condicion: cond } : {}), nota: uso.nombre, ...tipoDano, ...dura });
        else for (const objetivo of objetivos) await enviarGolpeMesa(mesa, { objetivo, dano: n, ...(uso.cura ? { cura: true } : {}), ...(cond || uso.efecto ? { condicion: cond || uso.efecto!.condicion } : {}), ...(uso.efecto ? { bono: uso.efecto.bono } : {}), nota: uso.nombre, ...tipoDano, ...dura });
      }
      if (uso.equipar && arma) setMano('a', arma);
      alUsar(uso.tipo);
      // Lo que se sumó gastando la acción adicional (Castigo divino) también la gasta
      const adicional = pagar.find(x => x.t === 'adicional');
      if (adicional && uso.tipo !== 'adicional') { await usarAccionMesa(mesa, 'adicional', adicional.nombre, `con ${uso.nombre}`); alUsar('adicional'); }
      if (uso.marca) alMarcar?.({ ...uso.marca, dexpr: escalarDados(uso.marca.dexpr, uso.marca.porNivel, nivelUsado - (uso.marca.nivelBase || nivelUsado)) }, objetivos[0] || '', nombres[0] || '');
      avisar(`${uso.nombre}: listo${nGolpes > 1 && n ? `, ${golpes.map(danoDe).join(' + ')} = ${n} ${deDano}` : ''}. ${objetivos.length && uso.salv ? 'Tu DM verá qué enemigos deben tirar la salvación.' : 'Tu DM ya lo ve.'}`);
      alCerrar();
    } catch (e) { avisar(`No se pudo confirmar: ${(e as Error).message}`, 'error'); }
    finally { setOcupado(false); }
  };

  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-surface-container-low p-3 text-body-md text-on-surface-variant">
        <span className="text-label-caps uppercase text-outline">Qué hace</span>
        <p className="m-0 mt-1" dangerouslySetInnerHTML={{ __html: uso.raw ? richT(uso.texto) : esc(uso.texto) }} />
        {uso.atk != null && <p className="m-0 mt-1 font-bold text-on-surface">Ataque: {uso.atk >= 0 ? '+' : ''}{uso.atk} al impacto{ventaja && !renuncia ? <span className={ventaja === 'v' ? ' text-green-400' : ' text-error'}> · {ventaja === 'v' ? 'con ventaja' : 'con desventaja'} (lo puso tu DM)</span> : ''}</p>}
        {uso.renuncia && ventaja === 'v' && (
          <label className="mt-2 flex min-h-11 cursor-pointer items-center gap-2 rounded bg-surface-container-lowest px-2 text-body-sm text-on-surface">
            <input type="checkbox" checked={renuncia} onChange={e => setRenuncia(e.target.checked)} className="size-4" />
            <span>Renuncio a la ventaja en este ataque</span>
          </label>
        )}
        {(uso.condiciones || []).map(x => (
          <label key={x.rasgo} className="mt-2 flex min-h-11 cursor-pointer items-center gap-2 rounded bg-surface-container-lowest px-2 text-body-sm text-on-surface">
            <input type="checkbox" checked={marcadas.includes(x.rasgo)} onChange={e => setMarcadas(m => (e.target.checked ? [...m, x.rasgo] : m.filter(y => y !== x.rasgo)))} className="size-4" />
            <span>{x.texto} (se cumple)</span>
          </label>
        ))}
        {uso.salv && <p className="m-0 mt-1 font-bold text-on-surface">Los objetivos tiran salvación de {uso.salv} contra CD {uso.cd}</p>}
      </div>

      {uso.lista && (
        <div className="grid gap-1 rounded-lg bg-surface-container-low p-3">
          <span className="text-label-caps uppercase text-outline">{uso.lista.titulo}</span>
          {uso.lista.items.length ? uso.lista.items.map(x => (
            <details key={x.nombre} className="rounded bg-surface-container-lowest">
              <summary className="min-h-11 cursor-pointer list-none px-2 py-2 text-body-md text-on-surface"><b>{x.nombre}</b> <small className="text-outline">{x.nota}</small></summary>
              {x.texto && <p className="m-0 px-2 pb-2 text-body-sm text-on-surface-variant" dangerouslySetInnerHTML={{ __html: richT(x.texto) }} />}
            </details>
          )) : <p className="m-0 text-body-sm text-outline">Tu grimorio no tiene conjuros que se lancen con una acción o una acción adicional. Agrega conjuros a tu hoja en el paso Conjuros del editor.</p>}
        </div>
      )}

      {uso.equipar && (
        <div className="grid gap-2 rounded-lg bg-surface-container-low p-3">
          <span className="text-label-caps uppercase text-outline">Arma que conjuras: queda en tu mano principal</span>
          {armasMano.length ? (
            <select aria-label="Arma de pacto" value={arma} onChange={e => setArma(e.target.value)} className={campo}>
              {armasMano.map(k => <option key={k} value={k}>{ARMAS[k].n}</option>)}
            </select>
          ) : <p className="m-0 text-body-sm text-error">No tienes armas cuerpo a cuerpo en tu inventario. Agrega una en la hoja.</p>}
        </div>
      )}

      {recGasta && (
        <p className="m-0 rounded-lg bg-surface-container-low p-3 text-body-md text-on-surface">Gasta 1 de <b>{recGasta.nombre}</b>: <span className={quedaGasta ? '' : 'text-error'}>{quedaGasta ? `quedan ${quedaGasta}, te quedarían ${quedaGasta - 1}` : 'ya no te queda'}</span></p>
      )}

      {cj && (
        <div className="grid gap-2 rounded-lg bg-surface-container-low p-3">
          <span className="text-label-caps uppercase text-outline">¿Con qué lo lanzas? Se gasta al confirmar</span>
          {rasgoRec && <Opcion marcada={via === 'rasgo'} deshabilitada={!quedaRasgo} alElegir={() => setVia('rasgo')}>Con {rasgoRec.nombre} <small className="text-outline">quedan {quedaRasgo}</small></Opcion>}
          {espacios.map((e: any) => (
            <Opcion key={e.nivel} marcada={via === 'slot' + e.nivel} deshabilitada={!e.quedan} alElegir={() => setVia('slot' + e.nivel)}>
              {e.nombre} <small className="text-outline">{e.quedan ? `quedan ${e.quedan}, te quedarían ${e.quedan - 1}` : 'sin espacios'}</small>
            </Opcion>
          ))}
          {cj.ritual && <Opcion marcada={via === 'ritual'} alElegir={() => setVia('ritual')}>Como ritual (10 minutos más, sin espacio)</Opcion>}
          {!espacios.length && !rasgoRec && !cj.ritual && <p className="m-0 text-body-sm text-error">No tienes espacios de este nivel o más.</p>}
        </div>
      )}

      {uso.afecta && (
        <div className="grid gap-2 rounded-lg bg-surface-container-low p-3">
          <span className="text-label-caps uppercase text-outline">{area ? 'Quiénes están en el área' : uso.salv ? 'Objetivo' : 'Objetivo del ataque'}</span>
          {posibles.length ? (
            [['Enemigos', posibles.filter(e => !e.aliado)], ['Aliados', posibles.filter(e => e.aliado)]].map(([titulo, lista]) => (lista as Objetivo[]).length > 0 && (
              <div key={titulo as string} className="grid gap-1">
                <span className="text-body-sm font-bold text-outline">{titulo as string}</span>
                <ul className="m-0 grid list-none gap-1 p-0">
                  {(lista as Objetivo[]).map(e => (
                    <li key={e.k}>
                      <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded bg-surface-container-lowest px-2 text-body-md text-on-surface">
                        <input type={varios ? 'checkbox' : 'radio'} name="objetivo" checked={objetivos.includes(e.k)} onChange={() => alternar(e.k)} className="size-4" />{e.nombre}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : <p className="m-0 text-body-sm text-outline">No hay a quién elegir en el combate todavía.</p>}

          {maxObj > 1 && <p className="m-0 text-body-sm text-outline">Puedes elegir hasta {maxObj} ({objetivos.length} elegido{objetivos.length === 1 ? '' : 's'}).</p>}
          {objetivos.length > 0 && rondas && (uso.efecto || uso.salv || conds.length > 0) ? <p className="m-0 text-body-sm font-bold text-on-surface">Dura {textoDuracion(rondas)}: se descuenta solo en cada turno tuyo.</p> : null}
          {!objetivos.length && posibles.length > 0 && <p className="m-0 text-body-sm text-outline">Elige primero a quién{sinDano ? '' : uso.atk != null ? '; después te decimos qué dados tirar' : '; después pones el daño'}.</p>}
          {objetivos.length > 0 && uso.efecto && <p className="m-0 rounded bg-surface-container-lowest p-2 text-body-sm text-on-surface"><b>{uso.efecto.condicion}:</b> {uso.efecto.bono}</p>}
          {objetivos.length > 0 && !sinDano && Array.from({ length: nGolpes }, (_, i) => (
            <div key={i} className="grid gap-3 rounded bg-surface-container-lowest p-3">
              {nGolpes > 1 && <span className="text-body-md font-bold text-on-surface">{['Primer', 'Segundo', 'Tercer', 'Cuarto'][i] || `${i + 1}.º`} ataque</span>}
              {uso.atk != null && (
                <div className="grid gap-2">
                  <span className="text-label-caps uppercase text-outline">1. Tirada de ataque</span>
                  <CampoTirada tipo="ataque" expr={`1d20${modStr(uso.atk)}`} valor={nats[i]} alCambiar={v => setNats(x => x.map((y, j) => (j === i ? v : y)))}
                    etiqueta={`${uso.nombre}: ataque${nGolpes > 1 ? ` ${i + 1}` : ''}`} adv={adv} unaVez bloqueado={tiradasAtk[i]} alTirar={() => setTiradasAtk(x => x.map((y, j) => (j === i ? true : y)))}
                    claseInput={campo} desglose={uso.atkDesg} mas={masAtk(i)} nota={`Si iguala o supera la CA de ${nombres[0] || 'tu objetivo'}, acierta. Tu DM ve este total al confirmar.`} />
                  {dadosAtk.map(d => (
                    <div key={d.nombre} className="grid gap-1 border-l-2 border-primary/50 pl-2">
                      <span className="text-body-sm font-bold text-on-surface">{d.nombre}: {d.signo < 0 ? 'resta' : 'suma'} {d.dados} al ataque</span>
                      <CampoTirada tipo="dano" expr={d.expr} valor={valAtk[`${i}|${d.nombre}`] || ''} alCambiar={v => setValAtk(x => ({ ...x, [`${i}|${d.nombre}`]: v }))}
                        etiqueta={`${d.nombre} (ataque${nGolpes > 1 ? ` ${i + 1}` : ''})`} claseInput={campo} />
                    </div>
                  ))}
                </div>
              )}
              {nats[i] !== '1' && (
                <div className="grid gap-2">
                  <span className="text-label-caps uppercase text-outline">{uso.atk != null ? `2. Si acierta, ${uso.cura ? 'la curación' : 'el daño'}` : etiquetaDano}{mitad ? ' (si falla; mitad si supera la salvación)' : ''}</span>
                  {grupos.length > 0 && (
                    <div className="grid gap-1 rounded bg-surface-container-low p-2">
                      <span className="text-body-sm font-bold text-on-surface">¿Le sumas algo al acertar?</span>
                      {grupos.map(g => (
                        <label key={g.base} className="grid gap-1 text-body-sm text-on-surface-variant">
                          <span>{g.base}{g.t === 'adicional' ? ' (gasta tu acción adicional)' : ''}</span>
                          <select value={selExtra[`${i}|${g.base}`] || ''} onChange={e => setSelExtra(x => ({ ...x, [`${i}|${g.base}`]: e.target.value }))} className={campo}>
                            <option value="">No</option>
                            {g.opciones.map(o => <option key={o.nombre} value={o.nombre}>{o.nombre === g.base ? 'Sí' : o.nombre.slice(g.base.length + 1)}: {o.expr}{o.requiere === 'ventaja' ? ' (con ventaja o un aliado junto al objetivo)' : ''}</option>)}
                          </select>
                        </label>
                      ))}
                    </div>
                  )}
                  {modoDano === 'dados' ? (
                    <CampoTirada tipo="dano" expr={dexpr!} valor={danos[i]} alCambiar={v => setDanos(d => d.map((x, j) => (j === i ? v : x)))} crit={nats[i] === '20'}
                      desglose={uso.dmgDesg} tipoDano={uso.cura ? undefined : uso.tipoDano}
                      mas={elegidos(i).map(x => ({ dados: partesTirada(x.expr, nats[i] === '20').dados || x.expr, por: x.nombre, valor: totalTirada(x.expr, valExtra[`${i}|${x.nombre}`] || '', nats[i] === '20') }))}
                      etiqueta={`${uso.nombre}: ${uso.cura ? 'curación' : 'daño'}${nGolpes > 1 ? ` (ataque ${i + 1})` : ''}`} unaVez bloqueado={tiradas[i]} alTirar={() => setTiradas(t => t.map((x, j) => (j === i ? true : x)))} claseInput={campo} />
                  ) : (
                    <input aria-label={`${etiquetaDano}${nGolpes > 1 ? ` del ataque ${i + 1}` : ''}`} type="number" inputMode="numeric" min={0} placeholder="El total que hiciste"
                      value={danos[i]} onChange={e => setDanos(d => d.map((x, j) => (j === i ? e.target.value : x)))} className={campo} />
                  )}
                  {elegidos(i).map(x => (
                    <div key={x.nombre} className="grid gap-1 border-l-2 border-primary/50 pl-2">
                      <span className="text-body-sm font-bold text-on-surface">{x.nombre}</span>
                      <CampoTirada tipo="dano" expr={x.expr} valor={valExtra[`${i}|${x.nombre}`] || ''} alCambiar={v => setValExtra(y => ({ ...y, [`${i}|${x.nombre}`]: v }))}
                        crit={nats[i] === '20'} etiqueta={`${x.nombre}${nGolpes > 1 ? ` (ataque ${i + 1})` : ''}`} claseInput={campo} />
                    </div>
                  ))}
                  {elegidos(i).length > 0 && danoDe(i) > 0 && <p className="m-0 text-body-md font-bold text-on-surface">Daño de este ataque: {danoDe(i)}</p>}
                </div>
              )}
            </div>
          ))}
          {objetivos.length > 0 && !sinDano && nGolpes > 1 && n > 0 && (
            <p className="m-0 rounded bg-surface-container-lowest p-2 text-body-md font-bold text-on-surface">En total: {n} {uso.cura ? 'de curación' : 'de daño'}</p>
          )}

          {objetivos.length > 0 && !uso.cura && (uso.salv || conds.length > 0) && (
            <>
              <span className="mt-1 text-label-caps uppercase text-outline">{uso.salv ? 'Condición si falla la salvación' : 'Condición que impone'}</span>
              <select aria-label="Condición" value={cond} onChange={e => setCond(e.target.value)} className={campo}>
                <option value="">Ninguna</option>
                {[...new Set([...conds, ...CONDICIONES])].map(c => <option key={c}>{c}</option>)}
              </select>
            </>
          )}
        </div>
      )}

      {yaGastada && <p className="m-0 text-body-sm text-error">Ya marcaste esta acción como gastada esta ronda.</p>}
      <Boton variante="primario" disabled={ocupado} onClick={confirmar}>Confirmar</Boton>
    </div>
  );
}

function Opcion({ marcada, deshabilitada, alElegir, children }: { marcada: boolean; deshabilitada?: boolean; alElegir: () => void; children: React.ReactNode }) {
  return (
    <label className={`flex min-h-11 items-center gap-2 rounded bg-surface-container-lowest px-2 text-body-md text-on-surface ${deshabilitada ? 'opacity-50' : 'cursor-pointer'}`}>
      <input type="radio" name="pago" disabled={deshabilitada} checked={marcada} onChange={alElegir} className="size-4" /><span>{children}</span>
    </label>
  );
}
