'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
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
      <title>{`d${sides}`}</title>
    </svg>
  );
}

type Estado = { r: Resultado; rolling: boolean; caras: number[]; seq: number };

/** Bandeja de dados. Cualquier botón con data-roll en la página tira al hacer clic, como en la versión original. */
export function BandejaDados({ children }: { children: ReactNode }) {
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
    const plano = r.groups.flatMap(g => g.vals);
    return new Promise<Resultado>(res => {
      const finish = () => {
        if (timer.current) clearInterval(timer.current);
        setSt({ r, rolling: false, caras: plano, seq: mySeq });
        setHist(h => [r, ...h].slice(0, 12));
        res(r);
      };
      if (reduce || !r.groups.length) { finish(); return; }
      setSt({ r, rolling: true, caras: r.groups.flatMap(g => g.vals.map(() => rnd(g.d))), seq: mySeq });
      let t = 0;
      timer.current = setInterval(() => {
        t += 70;
        if (t >= 770) { finish(); return; }
        setSt(s => (s && s.seq === mySeq ? { ...s, caras: r.groups.flatMap(g => g.vals.map(() => rnd(g.d))) } : s));
      }, 70);
    });
  }, []);

  const cerrar = useCallback(() => { if (timer.current) clearInterval(timer.current); setAbierta(false); }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest?.('[data-roll]') as HTMLElement | null;
      if (!b || b.closest('#dice') || b.dataset.rollManual != null) return;
      const ds = b.dataset;
      tirar(ds.roll!, ds.label || 'Tirada', ds.dmg ? { dmg: ds.dmg, dmgLabel: ds.dmglabel, dmgMin3: !!ds.min3 } : { min3: !!ds.min3 });
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') cerrar(); };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); };
  }, [tirar, cerrar]);

  const r = st?.r, o = r?.o || {};
  const kind = r ? (r.groups.some(g => g.d === 20) ? 'd20' : o.neutral ? 'neu' : 'dmg') : '';
  const nDice = r ? r.groups.reduce((s, g) => s + g.vals.length, 0) : 0;
  let total: ReactNode = <b>…</b>;
  const botones: [string, string][] = [];
  if (r && !st!.rolling) {
    const partes = r.groups.map(g => (g.s < 0 ? '− ' : '') + g.vals.filter((_, i) => g.kept[i]).map(v => (o.min3 && v < 3 ? `${v}→3` : v)).join(' + '));
    if (r.consts) partes.push((r.consts < 0 ? '− ' : '') + Math.abs(r.consts));
    const desc = partes.join(' + ').replace(/\+ −/g, '−');
    total = (
      <>
        <b className={`pop${r.nat === 20 ? ' nat20' : r.nat === 1 ? ' nat1' : ''}`}>{r.total}</b>
        <span>{desc}{partes.length > 1 || r.consts ? ` = ${r.total}` : ''}</span>
        {r.nat === 20 ? <em className="nat20">¡20 natural!</em> : r.nat === 1 ? <em className="nat1">1 natural</em> : null}
      </>
    );
    const single20 = r.groups.length === 1 && r.groups[0].d === 20 && !o.keep;
    if (single20) botones.push(['adv', 'Ventaja'], ['dis', 'Desventaja']);
    if (o.dmg) { botones.push(['dmg', 'Tirar daño']); if (r.nat === 20) botones.push(['crit', 'Daño crítico']); }
    if (!single20 && !o.noRepeat) botones.push(['again', 'Otra vez']);
    botones.push(['close', 'Cerrar']);
  }
  const accion = (a: string) => {
    if (!r) return;
    if (a === 'close') cerrar();
    if (a === 'adv' || a === 'dis') tirar(r.expr, r.label!, { ...o, adv: a === 'adv' ? 1 : -1 });
    if (a === 'again') tirar(r.expr, r.label!, o);
    if (a === 'dmg' || a === 'crit') tirar(o.dmg!, o.dmgLabel || 'Daño', { min3: o.dmgMin3, crit: a === 'crit' });
  };

  let j = 0;
  return (
    <DadosCtx.Provider value={tirar}>
      {children}
      <div className="dice-back" hidden={!abierta} onClick={cerrar} />
      <section className="dice" id="dice" hidden={!abierta} role="dialog" aria-label="Tirada de dados" aria-live="polite">
        <div className="dice-top">
          <p className="dice-l">{r ? r.label + (o.adv! > 0 ? ' (con ventaja)' : o.adv! < 0 ? ' (con desventaja)' : '') + (o.crit ? ' (crítico)' : '') : ''}</p>
          <button className="x" onClick={cerrar} aria-label="Cerrar">×</button>
        </div>
        <div className="dice-row">
          {r && (r.groups.length
            ? r.groups.flatMap(g => g.vals.map((v, i) => {
                const idx = j++;
                const cls = `${kind}${nDice > 5 ? ' sm' : ''}${st!.rolling ? ' rolling' : ''}${!st!.rolling && !g.kept[i] ? ' dropped' : ''}${!st!.rolling && o.min3 && v < 3 && g.kept[i] ? ' min3' : ''}`;
                return <Dado key={`${st!.seq}-${idx}`} sides={g.d} cls={cls} valor={st!.caras[idx]} />;
              }))
            : <span className="note">Valor fijo, sin dados</span>)}
        </div>
        <div className="dice-total">{total}</div>
        <div className="dice-btns">
          {botones.map(([k, n]) => <button key={k} className={`btn${k === 'dmg' || k === 'crit' ? '' : ' ghost'}`} onClick={() => accion(k)}>{n}</button>)}
        </div>
        <details className="dice-h"><summary>Tiradas anteriores</summary>
          <ol>{hist.map((h, i) => <li key={i}>{h.label}: <b>{h.total}</b></li>)}</ol>
        </details>
      </section>
    </DadosCtx.Provider>
  );
}
