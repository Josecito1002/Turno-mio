'use client';
import { useState } from 'react';
import { avisar } from '@/shared/ui/avisos';
import { Boton, Campo, Plegable, Segmentado, claseCampo } from '@/shared/ui/kit';
import { Desplegable } from '@/shared/ui/desplegable';
import { norm } from '@/shared/utils/texto';
import { ARMAS, ARMADURAS } from '@/features/reglas/data/equipo';
import { OBJETOS_MAGICOS, RAREZAS } from '@/features/reglas/data/objetos-magicos';
import { EQUIPO_AVENTURA, OBJETOS_CON_FICHA } from '@/features/reglas/data/equipo-aventura';
import { esPropia } from '@/features/personajes/domain/inventario';
import { darObjetoDm } from '../api';
import type { ObjetoEntregado } from '../domain/entregas';

type Tipo = 'objeto' | 'magico' | 'arma' | 'armadura';
const Mayus = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** DM: da un objeto a un personaje de la mesa. Le llega a su hoja en cuanto la tenga abierta. */
export function DarObjeto({ campId, personajeId, nombre }: { campId: string; personajeId: string; nombre: string }) {
  const [tipo, setTipo] = useState<Tipo>('objeto');
  const [n, setN] = useState(''), [q, setQ] = useState('1'), [t, setT] = useState('');
  const [sel, setSel] = useState(''), [base, setBase] = useState(''), [buscar, setBuscar] = useState('');
  const [enviando, setEnviando] = useState(false);
  // Objeto mágico propio: el DM lo arma con nombre, tipo, bonos y texto
  const [propio, setPropio] = useState(false);
  const [mp, setMp] = useState({ n: '', rareza: 'poco común', clase: 'maravilloso', sint: false, bono: '0', bonoCA: '0', bonoSalv: '0', danoExtra: '', cargas: '0', reset: 'largo', texto: '' });
  const ponMp = (k: string, v: string | boolean) => setMp(x => ({ ...x, [k]: v }));
  const baseDe = (c: string) => (c === 'arma' || c === 'armadura' || c === 'escudo' ? c : undefined);
  const defPropio = propio && mp.n.trim() ? {
    n: mp.n.trim(), rareza: mp.rareza, tipo: mp.clase, texto: mp.texto.trim() || 'Objeto mágico creado por tu DM.',
    ...(baseDe(mp.clase) ? { base: baseDe(mp.clase) } : {}), ...(mp.sint ? { sint: true } : {}),
    ...(+mp.bono ? { bono: +mp.bono } : {}), ...(+mp.bonoCA ? { bonoCA: +mp.bonoCA } : {}), ...(+mp.bonoSalv ? { bonoSalv: +mp.bonoSalv } : {}),
    ...(mp.clase === 'arma' && mp.danoExtra.trim() ? { danoExtra: mp.danoExtra.trim() } : {}),
    ...(+mp.cargas > 0 ? { cargas: { max: Math.min(99, Math.trunc(+mp.cargas)), reset: mp.reset } } : {}),
  } : null;
  const d = tipo === 'magico' ? (propio ? defPropio : OBJETOS_MAGICOS[sel]) : null;
  const pideBase = !!d && (d.base === 'arma' || d.base === 'armadura');
  const objeto: ObjetoEntregado | null =
    tipo === 'objeto' ? (n.trim() ? { tipo, n: n.trim(), q: Math.max(1, +q || 1), ...(t.trim() ? { t: t.trim() } : {}) } : null)
      : tipo === 'magico' ? (d && (!pideBase || base)
        ? (propio ? { tipo, def: defPropio as Record<string, unknown>, ...(base ? { base } : {}) } : { tipo, k: sel, ...(base ? { base } : {}) })
        : null)
        : sel ? { tipo, k: sel } : null;
  const dar = async () => {
    if (!objeto) return;
    setEnviando(true);
    try {
      await darObjetoDm(campId, personajeId, objeto);
      avisar(`Enviado a ${nombre}: le llega a su hoja en cuanto la abra.`);
      setN(''); setQ('1'); setT(''); setSel(''); setBase('');
    } catch (e) { avisar(`No se pudo dar: ${(e as Error).message}`, 'error'); }
    finally { setEnviando(false); }
  };
  const qb = norm(buscar.trim());
  const magicos = Object.keys(OBJETOS_MAGICOS).filter(k => !qb || norm(OBJETOS_MAGICOS[k].n).includes(qb))
    .sort((a, b) => OBJETOS_MAGICOS[a].n.localeCompare(OBJETOS_MAGICOS[b].n, 'es'));
  return (
    <Plegable titulo={`Dar un objeto a ${nombre}`}>
      <div className="flex flex-col gap-3 px-4 pb-4">
        <Segmentado etiqueta="Qué le das" valor={tipo} onCambiar={v => { setTipo(v); setSel(''); setBase(''); }}
          opciones={[['objeto', 'Objeto'], ['magico', 'Mágico'], ['arma', 'Arma'], ['armadura', 'Armadura']]} />
        {tipo === 'objeto' && (
          <>
            <Campo etiqueta="Uno con ficha y dibujo (opcional)">
              <Desplegable value="" onChange={e => { if (e.target.value) { setN(e.target.value); setT(''); } }}>
                <option value="">Elige…</option>
                <optgroup label="De la campaña">{OBJETOS_CON_FICHA.map(o => <option key={o.n} value={o.n}>{o.n}</option>)}</optgroup>
                <optgroup label="Equipo de aventura">{EQUIPO_AVENTURA.filter(o => o.img).map(o => <option key={o.n} value={o.n}>{o.n}</option>)}</optgroup>
              </Desplegable>
            </Campo>
            <div className="flex flex-wrap items-end gap-2">
              <Campo etiqueta="Nombre" className="min-w-52 flex-1"><input value={n} onChange={e => setN(e.target.value)} placeholder="El libro verde" className={claseCampo} /></Campo>
              <Campo etiqueta="Cantidad" className="w-24"><input type="number" inputMode="numeric" min={1} value={q} onChange={e => setQ(e.target.value)} className={claseCampo} /></Campo>
            </div>
            <Campo etiqueta="Qué pone su ficha (opcional)">
              <textarea value={t} onChange={e => setT(e.target.value)} rows={3} maxLength={600} className={claseCampo} placeholder="Lo que ven los personajes: cómo es, de dónde salió, qué hace." />
            </Campo>
          </>
        )}
        {tipo === 'magico' && (
          <>
            <Segmentado etiqueta="De dónde sale" valor={propio ? 'propio' : 'catalogo'} onCambiar={v => { setPropio(v === 'propio'); setSel(''); setBase(''); }}
              opciones={[['catalogo', 'Del catálogo'], ['propio', 'Crear uno propio']]} />
            {!propio ? (
              <>
                <Campo etiqueta="Buscar"><input type="search" value={buscar} onChange={e => setBuscar(e.target.value)} placeholder="Anillo, gafas, capa…" className={claseCampo} /></Campo>
                <Campo etiqueta="Objeto mágico">
                  <Desplegable value={sel} onChange={e => { setSel(e.target.value); setBase(''); }}>
                    <option value="">Elige…</option>
                    {RAREZAS.map(r => { const xs = magicos.filter(k => OBJETOS_MAGICOS[k].rareza === r); return xs.length ? (
                      <optgroup key={r} label={Mayus(r)}>{xs.map(k => <option key={k} value={k}>{OBJETOS_MAGICOS[k].n}</option>)}</optgroup>) : null; })}
                  </Desplegable>
                </Campo>
                {d && <p className="m-0 text-sm">{d.texto}</p>}
              </>
            ) : (
              <>
                <Campo etiqueta="Nombre"><input value={mp.n} onChange={e => ponMp('n', e.target.value)} maxLength={80} placeholder="Espada del Pozo" className={claseCampo} /></Campo>
                <div className="grid grid-cols-2 gap-2">
                  <Campo etiqueta="Qué es">
                    <Desplegable value={mp.clase} onChange={e => { ponMp('clase', e.target.value); setBase(''); }}>
                      {[['arma', 'Arma'], ['armadura', 'Armadura'], ['escudo', 'Escudo'], ['anillo', 'Anillo'], ['maravilloso', 'Objeto maravilloso'], ['varita', 'Varita'], ['bastón', 'Bastón'], ['poción', 'Poción']].map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </Desplegable>
                  </Campo>
                  <Campo etiqueta="Rareza">
                    <Desplegable value={mp.rareza} onChange={e => ponMp('rareza', e.target.value)}>{RAREZAS.map(r => <option key={r} value={r}>{Mayus(r)}</option>)}</Desplegable>
                  </Campo>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {baseDe(mp.clase) && <Campo etiqueta={mp.clase === 'arma' ? 'Bono ataque/daño' : 'Bono a la CA'}><input type="number" min={0} max={3} value={mp.bono} onChange={e => ponMp('bono', e.target.value)} className={claseCampo} /></Campo>}
                  {!baseDe(mp.clase) && <Campo etiqueta="Bono a la CA"><input type="number" min={0} max={3} value={mp.bonoCA} onChange={e => ponMp('bonoCA', e.target.value)} className={claseCampo} /></Campo>}
                  <Campo etiqueta="Bono a salvaciones"><input type="number" min={0} max={3} value={mp.bonoSalv} onChange={e => ponMp('bonoSalv', e.target.value)} className={claseCampo} /></Campo>
                  <Campo etiqueta="Cargas"><input type="number" min={0} max={99} value={mp.cargas} onChange={e => ponMp('cargas', e.target.value)} className={claseCampo} /></Campo>
                </div>
                {+mp.cargas > 0 && (
                  <Campo etiqueta="Las cargas vuelven con">
                    <Desplegable value={mp.reset} onChange={e => ponMp('reset', e.target.value)}><option value="largo">Descanso largo (o el amanecer)</option><option value="corto">Descanso corto</option></Desplegable>
                  </Campo>
                )}
                {mp.clase === 'arma' && <Campo etiqueta="Daño extra (opcional)"><input value={mp.danoExtra} onChange={e => ponMp('danoExtra', e.target.value)} placeholder="1d6 fuego" className={claseCampo} /></Campo>}
                <label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={mp.sint} onChange={e => ponMp('sint', e.target.checked)} className="size-5" />Requiere sintonización</label>
                <Campo etiqueta="Qué hace">
                  <textarea value={mp.texto} onChange={e => ponMp('texto', e.target.value)} rows={3} maxLength={600} className={claseCampo} placeholder="Lo que pone en la hoja del jugador." />
                </Campo>
              </>
            )}
            {pideBase && (
              <Campo etiqueta={d!.base === 'arma' ? 'Qué arma es' : 'Qué armadura es'}>
                <Desplegable value={base} onChange={e => setBase(e.target.value)}>
                  <option value="">Elige…</option>
                  {Object.keys(d!.base === 'arma' ? ARMAS : ARMADURAS).filter(k => !esPropia(k))
                    .map(k => <option key={k} value={k}>{(d!.base === 'arma' ? ARMAS : ARMADURAS)[k].n}</option>)}
                </Desplegable>
              </Campo>
            )}
          </>
        )}
        {(tipo === 'arma' || tipo === 'armadura') && (
          <Campo etiqueta={tipo === 'arma' ? 'Arma' : 'Armadura'}>
            <Desplegable value={sel} onChange={e => setSel(e.target.value)}>
              <option value="">Elige…</option>
              {Object.keys(tipo === 'arma' ? ARMAS : ARMADURAS).filter(k => !esPropia(k))
                .map(k => <option key={k} value={k}>{(tipo === 'arma' ? ARMAS : ARMADURAS)[k].n}</option>)}
              {tipo === 'armadura' && <option value="escudo">Escudo</option>}
            </Desplegable>
          </Campo>
        )}
        <div><Boton variante="primario" disabled={!objeto || enviando} onClick={dar}>{enviando ? 'Enviando…' : `Dar a ${nombre}`}</Boton></div>
      </div>
    </Plegable>
  );
}

/** DM: corrige el inventario de un personaje de la mesa (quitar objetos o armas, sumar o restar oro).
    Igual que al dar un objeto, el cambio le llega a su hoja en cuanto la abra. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditarInventario({ campId, personajeId, nombre, pj }: { campId: string; personajeId: string; nombre: string; pj: any }) {
  const [oro, setOro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const mandar = async (o: ObjetoEntregado, que: string) => {
    setEnviando(true);
    try { await darObjetoDm(campId, personajeId, o); avisar(`${que}. Se aplica en la hoja de ${nombre} en cuanto la abra.`); }
    catch (e) { avisar(`No se pudo enviar: ${(e as Error).message}`, 'error'); }
    finally { setEnviando(false); }
  };
  const objetos: { n: string; q: number }[] = pj?.objetos || [];
  const armas: [string, number][] = pj?.armas || [];
  const nombreArma = (k: string) => pj?.armasPropias?.[k]?.n || ARMAS[k]?.n || k;
  const fila = 'flex min-h-11 items-center gap-2 border-b border-surface-container-highest py-1 last:border-0';
  return (
    <Plegable titulo={`Editar el inventario de ${nombre}`}>
      <div className="flex flex-col gap-4 px-4 pb-4">
        <div>
          <p className="m-0 mb-1 text-label-caps uppercase tracking-wider text-outline">Dinero: {+pj?.oro || 0} po</p>
          <div className="flex flex-wrap items-end gap-2">
            <Campo etiqueta="Cantidad (po)" className="w-32"><input type="number" min={1} value={oro} onChange={e => setOro(e.target.value)} className={claseCampo} /></Campo>
            <Boton tamano="sm" disabled={enviando || !(+oro > 0)} onClick={() => { mandar({ tipo: 'oro', d: Math.trunc(+oro) }, `+${Math.trunc(+oro)} po`); setOro(''); }}>Dar oro</Boton>
            <Boton tamano="sm" disabled={enviando || !(+oro > 0)} onClick={() => { mandar({ tipo: 'oro', d: -Math.trunc(+oro) }, `−${Math.trunc(+oro)} po`); setOro(''); }}>Quitar oro</Boton>
          </div>
        </div>
        <div>
          <p className="m-0 mb-1 text-label-caps uppercase tracking-wider text-outline">Armas</p>
          {armas.length ? <ul className="m-0 list-none p-0">{armas.map(([k, q]) => (
            <li key={k} className={fila}>
              <span className="flex-1">{q > 1 ? `${q} × ` : ''}{nombreArma(k)}</span>
              <Boton tamano="sm" variante="fantasma" disabled={enviando} onClick={() => mandar({ tipo: 'quitarArma', k }, `Quitada: ${nombreArma(k)}`)} aria-label={`Quitar ${nombreArma(k)}`}>Quitar</Boton>
            </li>
          ))}</ul> : <p className="m-0 text-sm text-muted">No lleva armas.</p>}
        </div>
        <div>
          <p className="m-0 mb-1 text-label-caps uppercase tracking-wider text-outline">Objetos</p>
          {objetos.length ? <ul className="m-0 list-none p-0">{objetos.map((o, i) => (
            <li key={i} className={fila}>
              <span className="flex-1">{o.q > 1 ? `${o.q} × ` : ''}{o.n}</span>
              {o.q > 1 && <Boton tamano="sm" disabled={enviando} onClick={() => mandar({ tipo: 'quitar', n: o.n, q: 1 }, `Quitado 1 × ${o.n}`)} aria-label={`Quitar uno de ${o.n}`}>−1</Boton>}
              <Boton tamano="sm" variante="fantasma" disabled={enviando} onClick={() => mandar({ tipo: 'quitar', n: o.n, q: o.q }, `Quitado: ${o.n}`)} aria-label={`Quitar ${o.n}`}>Quitar</Boton>
            </li>
          ))}</ul> : <p className="m-0 text-sm text-muted">Sin objetos en el inventario.</p>}
        </div>
        <p className="m-0 text-xs text-muted">Para agregar cosas usa «Dar un objeto». Lo que ves aquí es su hoja al último cambio que guardó.</p>
      </div>
    </Plegable>
  );
}
