'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Boton, Dialogo, cx } from '@/shared/ui/kit';
import { resolver, rnd, type OpcionesTirada, type Resultado } from '../domain/dados';

type Tirar = (expr: string, label: string, o?: OpcionesTirada) => Promise<Resultado>;
const DadosCtx = createContext<Tirar>(() => Promise.reject(new Error('Sin bandeja de dados')));
export const useDados = () => useContext(DadosCtx);

const DIE_PTS: Record<number, string> = {
  4: '50,6 96,90 4,90', 8: '50,3 97,50 50,97 3,50', 10: '50,3 95,40 50,97 5,40',
  12: '50,3 97,37 79,95 21,95 3,37', 20: '50,2 95,26 95,74 50,98 5,74 5,26',
};

function Dado({ sides, cls, valor }: { sides: number; cls: string; valor: number | string }) {
  const y = sides === 4 ? 64 : sides === 10 ? 47 : 52;
  return (
    <svg className={`die ${cls}`} viewBox="0 0 100 100" aria-hidden="true">
      {sides === 6 ? <rect x="9" y="9" width="82" height="82" rx="14" /> : <polygon points={DIE_PTS[sides] || DIE_PTS[20]} />}
      {sides === 20 && <polygon points="50,24 76,68 24,68" className="ln" />}
      {sides === 8 && <polyline points="3,50 97,50" className="ln" />}
      <text x="50" y={y} textAnchor="middle" dominantBaseline="middle">{valor}</text>
    </svg>
  );
}

const EXTRA_T: Record<string, string> = { adicional: 'acción adicional', gratis: 'sin acción', reaccion: 'reacción' };

type Estado = { r: Resultado; rolling: boolean; caras: number[]; seq: number };

/** Bandeja de dados. Cualquier botón con data-roll en la página tira al tocarlo. */
/** `gastar(id)`: gasta un recurso del personaje (un espacio de conjuro) antes de tirar un extra que lo pide; false si no queda. */
export function BandejaDados({ children, gastar }: { children: ReactNode; gastar?: (id: string) => boolean }) {
  const [st, setSt] = useState<Estado | null>(null);
  const [abierta, setAbierta] = useState(false);
  const [hist, setHist] = useState<Resultado[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const seq = useRef(0);

  const tirar = useCallback<Tirar>((expr, label, o = {}) => {
    const r = resolver(expr, o);
    r.label = label; r.o = o;
    const mySeq = ++seq.current;
    if (timer.current) clearInterval(timer.current);
    setAbierta(true);
    const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    return new Promise<Resultado>(res => {
      const finish = () => {
        if (timer.current) clearInterval(timer.current);
        setSt({ r, rolling: false, caras: r.groups.flatMap(g => g.vals), seq: mySeq });
        setHist(h => [r, ...h].slice(0, 12));
        res(r);
      };
      if (reduce || !r.groups.length) { finish(); return; }
      const girar = () => r.groups.flatMap(g => g.vals.map(() => rnd(g.d)));
      setSt({ r, rolling: true, caras: girar(), seq: mySeq });
      let t = 0;
      timer.current = setInterval(() => {
        t += 70;
        if (t >= 770) { finish(); return; }
        setSt(s => (s && s.seq === mySeq ? { ...s, caras: girar() } : s));
      }, 70);
    });
  }, []);

  const cerrar = useCallback(() => { if (timer.current) clearInterval(timer.current); setAbierta(false); }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest?.('[data-roll]') as HTMLElement | null;
      if (!b) return;
      const ds = b.dataset;
      if (ds.gasta && gastar && !gastar(ds.gasta)) return;
      let extras;
      try { extras = ds.extras ? JSON.parse(ds.extras) : undefined; } catch { extras = undefined; }
      tirar(ds.roll!, ds.label || 'Tirada', ds.dmg ? { dmg: ds.dmg, dmgLabel: ds.dmglabel, dmgMin3: !!ds.min3, extras } : { min3: !!ds.min3, crit: ds.crit === '1' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [tirar, gastar]);

  const r = st?.r, o = r?.o || {};
  const kind = r ? (r.groups.some(g => g.d === 20) ? 'd20' : o.neutral ? 'neu' : 'dmg') : '';
  const nDice = r ? r.groups.reduce((s, g) => s + g.vals.length, 0) : 0;
  const listo = r && !st!.rolling;
  const critico = !!r && (r.nat === 20 || !!o.crit);
  // Lo que pide ventaja (Ataque Furtivo) solo se ofrece si la tirada de ataque fue con ventaja; en el daño, si lo fue el ataque
  const conVentaja = (o.adv || 0) > 0 || !!o.conVentaja;
  const extrasVis = (o.extras || []).filter(x => x.requiere !== 'ventaja' || conVentaja);
  const sinVentaja = o.dmg && (o.adv || 0) >= 0 && !conVentaja ? (o.extras || []).filter(x => x.requiere === 'ventaja') : [];
  const botones: [string, string][] = [];
  let desc = '';
  if (listo) {
    const partes = r.groups.map(g => (g.s < 0 ? '− ' : '') + g.vals.filter((_, i) => g.kept[i]).map(v => (o.min3 && v < 3 ? `${v}→3` : v)).join(' + '));
    if (r.consts) partes.push((r.consts < 0 ? '− ' : '') + Math.abs(r.consts));
    desc = partes.join(' + ').replace(/\+ −/g, '−') + (partes.length > 1 || r.consts ? ` = ${r.total}` : '');
    const single20 = r.groups.length === 1 && r.groups[0].d === 20 && !o.keep;
    if (single20) botones.push(['adv', 'Con ventaja'], ['dis', 'Con desventaja']);
    // Con un 20 natural el ataque es crítico: el daño tira el doble de dados (el modificador no se duplica)
    if (o.dmg) botones.push(r.nat === 20 ? ['crit', 'Tirar daño crítico'] : ['dmg', 'Tirar daño']);
    if (!single20 && !o.noRepeat) botones.push(['again', 'Otra vez']);
  }
  const accion = (a: string) => {
    if (!r) return;
    if (a === 'adv' || a === 'dis') tirar(r.expr, r.label!, { ...o, adv: a === 'adv' ? 1 : -1 });
    if (a === 'again') tirar(r.expr, r.label!, o);
    if (a === 'dmg' || a === 'crit') tirar(o.dmg!, o.dmgLabel || 'Daño', { min3: o.dmgMin3, crit: a === 'crit', extras: o.extras, conVentaja: (o.adv || 0) > 0 });
  };
  const titulo = r ? r.label + (o.adv! > 0 ? ' (con ventaja)' : o.adv! < 0 ? ' (con desventaja)' : '') + (o.crit ? ' (crítico)' : '') : 'Tirada';

  let j = 0;
  return (
    <DadosCtx.Provider value={tirar}>
      {children}
      <Dialogo abierto={abierta} onCerrar={cerrar} titulo={titulo} descripcion={r ? `Dados: ${r.expr}` : undefined} abajo>
        <div className="flex min-h-24 flex-wrap items-center justify-center gap-2.5">
          {r && (r.groups.length
            ? r.groups.flatMap(g => g.vals.map((v, i) => {
                const idx = j++;
                const cls = cx(kind, nDice > 5 && 'sm', st!.rolling && 'rolling', listo && !g.kept[i] && 'dropped', listo && o.min3 && v < 3 && g.kept[i] && 'min3');
                return <Dado key={`${st!.seq}-${idx}`} sides={g.d} cls={cls} valor={st!.caras[idx]} />;
              }))
            : <span className="text-sm text-muted">Valor fijo, sin dados</span>)}
        </div>
        <div className="text-center" aria-live="polite" aria-atomic="true">
          {listo ? (
            <>
              <b className={cx('dado-pop block font-serif text-6xl font-extrabold leading-none', r.nat === 20 && 'text-adi', r.nat === 1 && 'text-acc')}>
                <span className="sr-only">Resultado: </span>{r.total}
              </b>
              <span className="mt-1 block text-muted">{desc}</span>
              {r.nat === 20 && <em className="mt-1 block font-extrabold not-italic text-adi">¡20 natural!</em>}
              {r.nat === 1 && <em className="mt-1 block font-extrabold not-italic text-acc">1 natural</em>}
            </>
          ) : <b className="block font-serif text-6xl leading-none" aria-hidden="true">…</b>}
        </div>
        {listo && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {botones.map(([k, n]) => <Boton key={k} variante={k === 'dmg' || k === 'crit' ? 'primario' : 'secundario'} onClick={() => accion(k)}>{n}</Boton>)}
            <Boton variante="fantasma" onClick={cerrar}>Cerrar</Boton>
          </div>
        )}
        {listo && extrasVis.length > 0 && (
          <div className="mt-4 border-t border-soft pt-3 text-center">
            <p className="m-0 text-sm text-muted">{critico ? 'Es crítico: si usas alguno, sus dados también se duplican.' : 'Si aciertas, puedes seguir con:'}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {extrasVis.map(x => {
                const txt = `${x.nombre}${x.atk ? ` (${x.atk.replace('1d20', '')} al ataque)` : x.expr ? `: ${x.expr}` : ''}${EXTRA_T[x.t] ? `, ${EXTRA_T[x.t]}` : ''}`;
                return x.atk || x.expr
                  ? <button key={x.nombre} type="button" data-roll={x.atk || x.expr} data-label={x.nombre + (critico && !x.atk ? ' (crítico)' : '')}
                      data-dmg={x.atk ? x.expr : undefined} data-dmglabel={x.atk ? `${x.nombre}: daño` : undefined}
                      data-crit={critico && !x.atk ? '1' : undefined} data-gasta={x.gasta}
                      className="min-h-11 cursor-pointer rounded-lg bg-soft px-2.5 text-sm font-bold hover:bg-rule/70">{txt}</button>
                  : <span key={x.nombre} className="inline-flex min-h-11 items-center rounded-lg px-2.5 text-sm font-bold ring-1 ring-inset ring-rule">{txt}</span>;
              })}
            </div>
          </div>
        )}
        {listo && sinVentaja.length > 0 && (
          <p className="mb-0 mt-3 text-center text-sm text-muted">Con ventaja podrías sumar {sinVentaja.map(x => x.nombre).join(' y ')}: vuelve a tirar con ventaja.</p>
        )}
        {hist.length > 1 && (
          <details className="mt-3 text-sm">
            <summary className="min-h-11 cursor-pointer py-2 text-muted">Tiradas anteriores</summary>
            <ol className="m-0 list-decimal pl-5">{hist.slice(1).map((h, i) => <li key={i}>{h.label}: <b>{h.total}</b></li>)}</ol>
          </details>
        )}
      </Dialogo>
    </DadosCtx.Provider>
  );
}
