/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { S, render, esAdmin, nuevoDraft } from '@/app-shell/estado';
import { guardarLib } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { setPath, slug } from '@/shared/utils/texto';
import { CLASES } from '@/features/reglas/data/clases';
import { Shape } from '@/features/personajes/components/piezas';
import { RasgoForm } from '@/features/personajes/components/editor/PasosMagia';
import { bajarArchivo, leerRasgo } from '@/features/personajes/acciones';
import { getC, getLib } from '../domain/biblioteca';

function quitar(ref: string) {
  const LIB: any = getLib(), [t, k, sk] = ref.split('|');
  if (!confirm('¿Quitar de la biblioteca? Los personajes que ya lo usan lo conservan.')) return;
  if (t === 'sub') delete LIB.clases[k].subclases[sk];
  else if (t === 'clase') {
    const subs = LIB.clases[k].subclases; delete LIB.clases[k];
    if (subs && Object.keys(subs).length && !k.startsWith('lib:')) LIB.clases[k] = { subclases: subs };
  } else delete LIB[t][k];
  guardarLib(true); render();
}

/** Campo del borrador de especie/subclase: se guarda en S.draft sin redibujar, como antes. */
function Borrador({ path, value, type = 'text' }: { path: string; value: any; type?: string }) {
  return <input type={type} defaultValue={value} onChange={e => setPath(S.draft, path, type === 'number' ? +e.target.value : e.target.value)} />;
}

export function BibliotecaVista({ elegirArchivos }: { elegirArchivos: () => void }) {
  const LIB: any = getLib(), d = S.draft, admin = esAdmin();
  const clases = Object.entries<any>(LIB.clases);
  const item = (label: string, sub: string, del: string) => (
    <div className="li" key={del}><span>{label}{sub && <> <span className="note">{sub}</span></>}</span>{admin && <button className="btn ghost small" onClick={() => quitar(del)}>Quitar</button>}</div>
  );
  const sec = (t: string, rows: React.ReactNode[]) => (
    <><h2 className="plain">{t}</h2><div className="list">{rows.length ? rows : <div className="li"><span className="note">Nada todavía.</span></div>}</div></>
  );
  const lista = (rs: any[], tipo: 'esp' | 'sub') => rs.length ? (
    <div className="list">{rs.map((r, i) => (
      <div className="li" key={i}><span><Shape t={r.t} /> {r.nombre} <span className="note">nivel {r.n}</span></span>
        <button className="btn ghost small" onClick={() => { S.draft[tipo].rasgos.splice(i, 1); S.draft.abierto = tipo; render(); }}>Quitar</button></div>
    ))}</div>
  ) : <p className="note">Sin rasgos todavía.</p>;
  const exportar = () => bajarArchivo('biblioteca-mi-turno.json', JSON.stringify({ tipo: 'miturno-biblioteca', v: 1, ...LIB, imgOrig: undefined }));
  const nConj = Object.keys(LIB.conjuros || {}).length;
  const clasesTodas: [string, any][] = [...Object.entries(CLASES), ...clases.filter(([, v]) => v.dado)];

  const agregarRasgo = (tipo: 'esp' | 'sub') => { const r = leerRasgo(tipo === 'esp' ? 'de' : 'ds'); if (!r) return; S.draft[tipo].rasgos.push(r); S.draft.abierto = tipo; render(); };
  const guardarEsp = () => {
    const e = S.draft.esp; if (!e.n.trim()) { avisar('Ponle nombre a la especie.', 'aviso'); return; }
    LIB.especies['lib:' + slug(e.n)] = { n: e.n.trim(), lib: true, src: 'Creada', r: 'De tu biblioteca', vel: +e.vel || 30, vision: +e.vision || 0, subL: 'Subespecie', subs: null, rasgos: e.rasgos };
    guardarLib(true); avisar(`${e.n} guardada.`); S.draft = nuevoDraft(); render();
  };
  const guardarSub = () => {
    const s = S.draft.sub; if (!s.clase || !s.n.trim()) { avisar('Elige la clase y ponle nombre.', 'aviso'); return; }
    LIB.clases[s.clase] = LIB.clases[s.clase] || { subclases: {} }; LIB.clases[s.clase].subclases = LIB.clases[s.clase].subclases || {};
    LIB.clases[s.clase].subclases[slug(s.n)] = { n: s.n.trim(), rasgos: s.rasgos };
    guardarLib(true); avisar(`${s.n} guardada.`); S.draft = nuevoDraft(); render();
  };

  return (
    <>
      <section className="hero"><h1>Biblioteca</h1>
        <p className="who">Contenido extra para crear personajes, compartido con todo el grupo. Importa personajes de D&amp;D Builder o archivos de datos (clases, especies, trasfondos, dotes, conjuros), varios a la vez; lo nuevo se agrega a la biblioteca de todos.{admin ? ' Como administrador también puedes crear, editar y quitar contenido.' : ''}</p>
      </section>
      <div className="row">
        <button className="btn" onClick={elegirArchivos}>Importar JSON</button>
        <button className="btn ghost" onClick={exportar}>Guardar biblioteca para compartir</button>
      </div>
      <h2 className="plain">Administrador</h2>
      <div className="list" style={{ padding: '10px 12px' }}>
        <p style={{ margin: 0 }}>{admin
          ? 'Tu cuenta administra la biblioteca: puedes editar imágenes, descripciones, crear y quitar contenido, y mover rasgos para todos los personajes.'
          : 'Solo las cuentas de administrador editan la biblioteca. Tú puedes usarla y agregarle lo que importes.'}</p>
      </div>
      {sec('Clases', clases.filter(([, v]) => v.dado).map(([k, v]) => item(v.n, `${Object.keys(v.subclases || {}).length} subclases`, 'clase|' + k)))}
      {sec('Subclases', clases.flatMap(([k, v]) => Object.entries<any>(v.subclases || {}).map(([sk, s]) => item(s.n, getC(null, k)?.n || '', `sub|${k}|${sk}`))))}
      {sec('Especies', Object.entries<any>(LIB.especies).map(([k, v]) => item(v.n, v.subs ? `${Object.keys(v.subs).length} subespecies` : '', 'especies|' + k)))}
      {sec('Trasfondos', Object.entries<any>(LIB.trasfondos).map(([k, v]) => item(v.n, '', 'trasfondos|' + k)))}
      {sec('Dotes', Object.entries<any>(LIB.dotes).map(([k, v]) => item(v.n, '', 'dotes|' + k)))}
      <h2 className="plain">Conjuros</h2>
      <div className="list"><div className="li">
        <span>{nConj ? `${nConj} conjuros importados` : <span className="note">Nada todavía.</span>}</span>
        {nConj > 0 && admin && <button className="btn ghost small" onClick={() => { if (confirm('¿Quitar todos los conjuros importados? Los personajes conservan los que ya tienen.')) { LIB.conjuros = {}; guardarLib(true); render(); } }}>Quitar todos</button>}
      </div></div>
      {admin && (
        <>
          <h2 className="plain">Crear</h2>
          <details className="more" open={d.abierto === 'esp'}><summary>Nueva especie</summary>
            <div className="form" key={`${d.id}-${d.esp.rasgos.length}`}>
              <label>Nombre<Borrador path="esp.n" value={d.esp.n} /></label>
              <div className="row">
                <label>Velocidad en pies<Borrador path="esp.vel" value={d.esp.vel} type="number" /></label>
                <label>Visión en la oscuridad<Borrador path="esp.vision" value={d.esp.vision} type="number" /></label>
              </div>
              <b>Rasgos</b>{lista(d.esp.rasgos, 'esp')}<RasgoForm p="de" />
              <button className="btn ghost" onClick={() => agregarRasgo('esp')}>Agregar este rasgo a la especie</button>
              <button className="btn" onClick={guardarEsp}>Guardar especie en la biblioteca</button>
            </div>
          </details>
          <details className="more" open={d.abierto === 'sub'}><summary>Nueva subclase</summary>
            <div className="form" key={`${d.id}-${d.sub.rasgos.length}`}>
              <label>Clase
                <select defaultValue={d.sub.clase} onChange={e => setPath(S.draft, 'sub.clase', e.target.value)}>
                  <option value="">Elige…</option>{clasesTodas.map(([k, x]) => <option key={k} value={k}>{x.n}</option>)}
                </select>
              </label>
              <label>Nombre<Borrador path="sub.n" value={d.sub.n} /></label>
              <b>Rasgos</b>{lista(d.sub.rasgos, 'sub')}<RasgoForm p="ds" />
              <button className="btn ghost" onClick={() => agregarRasgo('sub')}>Agregar este rasgo a la subclase</button>
              <button className="btn" onClick={guardarSub}>Guardar subclase en la biblioteca</button>
            </div>
          </details>
        </>
      )}
    </>
  );
}
