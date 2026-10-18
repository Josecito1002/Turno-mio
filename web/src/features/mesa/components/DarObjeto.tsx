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
  const d = tipo === 'magico' ? OBJETOS_MAGICOS[sel] : null;
  const pideBase = !!d && (d.base === 'arma' || d.base === 'armadura');
  const objeto: ObjetoEntregado | null =
    tipo === 'objeto' ? (n.trim() ? { tipo, n: n.trim(), q: Math.max(1, +q || 1), ...(t.trim() ? { t: t.trim() } : {}) } : null)
      : tipo === 'magico' ? (d && (!pideBase || base) ? { tipo, k: sel, ...(base ? { base } : {}) } : null)
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
            <Campo etiqueta="Buscar"><input type="search" value={buscar} onChange={e => setBuscar(e.target.value)} placeholder="Anillo, gafas, capa…" className={claseCampo} /></Campo>
            <Campo etiqueta="Objeto mágico">
              <Desplegable value={sel} onChange={e => { setSel(e.target.value); setBase(''); }}>
                <option value="">Elige…</option>
                {RAREZAS.map(r => { const xs = magicos.filter(k => OBJETOS_MAGICOS[k].rareza === r); return xs.length ? (
                  <optgroup key={r} label={Mayus(r)}>{xs.map(k => <option key={k} value={k}>{OBJETOS_MAGICOS[k].n}</option>)}</optgroup>) : null; })}
              </Desplegable>
            </Campo>
            {d && <p className="m-0 text-sm">{d.texto}</p>}
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
