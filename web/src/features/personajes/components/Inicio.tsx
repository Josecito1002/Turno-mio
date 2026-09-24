'use client';
import { S, render, irArriba } from '@/app-shell/estado';
import { Shape } from './piezas';
import { abrir, nuevo } from '../acciones';

export function Inicio({ elegirArchivos }: { elegirArchivos: () => void }) {
  const ir = (v: 'lib' | 'mesa') => { S.view = v; if (v === 'mesa') S.camp = null; render(); irArriba(); };
  const econ = (
    <div className="econ">
      <div><Shape t="accion" /><span><b>Acción.</b> Una por turno: atacar, lanzar un conjuro, correr.</span></div>
      <div><Shape t="adicional" /><span><b>Acción adicional.</b> Una por turno, solo si algo la usa.</span></div>
      <div><Shape t="reaccion" /><span><b>Reacción.</b> Una por ronda, incluso en el turno de otro.</span></div>
    </div>
  );
  const botones = (
    <div className="row">
      <button className="btn" onClick={nuevo}>Crear personaje</button>
      <button className="btn ghost" onClick={elegirArchivos}>Importar JSON</button>
      <button className="btn ghost" onClick={() => ir('lib')}>Biblioteca</button>
      <button className="btn ghost" onClick={() => ir('mesa')}>Mesa del DM</button>
    </div>
  );
  if (!S.list.length) return (
    <section className="empty">
      <h1>Tu personaje, turno por turno</h1>
      <p>Créalo paso a paso con las reglas de 2024, tira los dados desde la hoja y mira qué puedes hacer en cada turno.</p>
      {botones}
      <p className="note">La biblioteca del grupo ya está en el servidor con todas las clases, especies y conjuros. También puedes importar respaldos de D&amp;D Builder o de Mi turno. Todo se guarda en tu cuenta.</p>
      {econ}
    </section>
  );
  return (
    <section className="empty">
      <h1>Personajes</h1>
      <div className="plist">{S.list.map(p => <button key={p.id} className="card" onClick={() => abrir(p.id)}><b>{p.name}</b><span>{p.sub || ''}</span></button>)}</div>
      {botones}
    </section>
  );
}
