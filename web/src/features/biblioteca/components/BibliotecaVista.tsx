/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import type { ReactNode } from 'react';
import { S, render, esAdmin, nuevoDraft } from '@/app-shell/estado';
import { guardarLib } from '@/app-shell/almacen';
import { avisar } from '@/shared/ui/avisos';
import { setPath, slug } from '@/shared/utils/texto';
import { Aviso, Boton, Campo, EncabezadoPagina, Fila, Lista, Nota, Plegable, Seccion, Tarjeta, claseCampo } from '@/shared/ui/kit';
import { CLASES } from '@/features/reglas/data/clases';
import { esDote } from '@/features/reglas/domain/restricciones';
import { FormaTipo } from '@/features/reglas/components/TipoAccion';
import { RasgoForm } from '@/features/personajes/components/editor/PasosMagia';
import { bajarArchivo, leerRasgo } from '@/features/personajes/acciones';
import { getC, getLib } from '../domain/biblioteca';

function quitar(ref: string, nombre: string) {
  const LIB: any = getLib(), [t, k, sk] = ref.split('|');
  if (!confirm(`¿Quitar «${nombre}» de la biblioteca? Los personajes que ya lo usan lo conservan.`)) return;
  if (t === 'sub') delete LIB.clases[k].subclases[sk];
  else if (t === 'clase') {
    const subs = LIB.clases[k].subclases; delete LIB.clases[k];
    if (subs && Object.keys(subs).length && !k.startsWith('lib:')) LIB.clases[k] = { subclases: subs };
  } else delete LIB[t][k];
  guardarLib(true); render(); avisar(`${nombre} quitado.`);
}

/** Campo del borrador de especie/subclase: se guarda en S.draft sin redibujar. */
function Borrador({ path, value, type = 'text', ...rest }: { path: string; value: any; type?: string; id?: string }) {
  return <input {...rest} type={type} defaultValue={value} className={claseCampo} onChange={e => setPath(S.draft, path, type === 'number' ? +e.target.value : e.target.value)} />;
}

export function BibliotecaVista({ elegirArchivos }: { elegirArchivos: () => void }) {
  const LIB: any = getLib(), d = S.draft, admin = esAdmin();
  const clases = Object.entries<any>(LIB.clases);
  const item = (label: string, sub: string, del: string) => (
    <Fila key={del}>
      <span>{label}{sub && <span className="ml-2 text-sm text-muted">{sub}</span>}</span>
      {admin && <Boton tamano="sm" variante="peligro" onClick={() => quitar(del, label)} aria-label={`Quitar ${label}`}>Quitar</Boton>}
    </Fila>
  );
  const categoria = (t: string, filas: ReactNode[]) => (
    <Plegable titulo={t} nota={`${filas.length}`}>
      {filas.length ? <Lista className="bg-bg">{filas}</Lista> : <Nota>Nada todavía.</Nota>}
    </Plegable>
  );
  const lista = (rs: any[], tipo: 'esp' | 'sub') => rs.length ? (
    <Lista className="bg-bg">{rs.map((r, i) => (
      <Fila key={i}>
        <span className="flex items-center gap-2"><FormaTipo t={r.t} /> {r.nombre} <span className="text-sm text-muted">nivel {r.n}</span></span>
        <Boton tamano="sm" onClick={() => { S.draft[tipo].rasgos.splice(i, 1); S.draft.abierto = tipo; render(); }} aria-label={`Quitar ${r.nombre}`}>Quitar</Boton>
      </Fila>
    ))}</Lista>
  ) : <Nota>Sin rasgos todavía.</Nota>;
  const exportar = () => bajarArchivo('biblioteca-mi-turno.json', JSON.stringify({ tipo: 'miturno-biblioteca', v: 1, ...LIB, imgOrig: undefined }));
  const nConj = Object.keys(LIB.conjuros || {}).length;
  const clasesTodas: [string, any][] = [...Object.entries(CLASES), ...clases.filter(([, v]) => v.dado)];
  const dotes = Object.entries<any>(LIB.dotes).filter(([, v]) => esDote(v));
  const objetos = Object.entries<any>(LIB.dotes).filter(([, v]) => !esDote(v));

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
      <EncabezadoPagina id="titulo-vista" titulo="Biblioteca"
        subtitulo="Contenido extra para crear personajes, compartido con todo el grupo. Lo que importes (personajes de D&D Builder o archivos de clases, especies, trasfondos, dotes y conjuros) se agrega para todos.">
        <Boton variante="primario" onClick={elegirArchivos}>Importar archivos JSON</Boton>
        <Boton onClick={exportar}>Descargar biblioteca</Boton>
      </EncabezadoPagina>
      {!admin && <Aviso tipo="info" titulo="Solo lectura">Solo las cuentas de administrador editan o quitan contenido. Tú puedes usarlo y agregar lo que importes.</Aviso>}
      <Seccion titulo="Contenido">
        {categoria('Clases', clases.filter(([, v]) => v.dado).map(([k, v]) => item(v.n, `${Object.keys(v.subclases || {}).length} subclases`, 'clase|' + k)))}
        {categoria('Subclases', clases.flatMap(([k, v]) => Object.entries<any>(v.subclases || {}).map(([sk, s]) => item(s.n, getC(null, k)?.n || '', `sub|${k}|${sk}`))))}
        {categoria('Especies', Object.entries<any>(LIB.especies).map(([k, v]) => item(v.n, v.subs ? `${Object.keys(v.subs).length} subespecies` : '', 'especies|' + k)))}
        {categoria('Trasfondos', Object.entries<any>(LIB.trasfondos).map(([k, v]) => item(v.n, '', 'trasfondos|' + k)))}
        {categoria('Dotes', dotes.map(([k, v]) => item(v.n, v.cat || '', 'dotes|' + k)))}
        {objetos.length > 0 && categoria('Objetos y equipo importados', objetos.map(([k, v]) => item(v.n, v.cat || '', 'dotes|' + k)))}
        <Tarjeta className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <span>{nConj ? <><b>{nConj}</b> conjuros importados</> : <span className="text-muted">Sin conjuros importados.</span>}</span>
          {nConj > 0 && admin && <Boton tamano="sm" variante="peligro" onClick={() => { if (confirm('¿Quitar todos los conjuros importados? Los personajes conservan los que ya tienen.')) { LIB.conjuros = {}; guardarLib(true); render(); } }}>Quitar todos</Boton>}
        </Tarjeta>
      </Seccion>
      {admin && (
        <Seccion titulo="Crear contenido">
          <Plegable titulo="Nueva especie" abierto={d.abierto === 'esp'}>
            <div className="grid gap-3" key={`${d.id}-${d.esp.rasgos.length}`}>
              <Campo etiqueta="Nombre"><Borrador path="esp.n" value={d.esp.n} /></Campo>
              <div className="grid gap-3 sm:grid-cols-2">
                <Campo etiqueta="Velocidad (pies)"><Borrador path="esp.vel" value={d.esp.vel} type="number" /></Campo>
                <Campo etiqueta="Visión en la oscuridad (pies)"><Borrador path="esp.vision" value={d.esp.vision} type="number" /></Campo>
              </div>
              <h3 className="m-0 font-serif text-lg font-bold">Rasgos</h3>
              {lista(d.esp.rasgos, 'esp')}
              <RasgoForm p="de" />
              <div className="flex flex-wrap gap-2">
                <Boton onClick={() => agregarRasgo('esp')}>Agregar este rasgo</Boton>
                <Boton variante="primario" onClick={guardarEsp}>Guardar especie</Boton>
              </div>
            </div>
          </Plegable>
          <Plegable titulo="Nueva subclase" abierto={d.abierto === 'sub'}>
            <div className="grid gap-3" key={`${d.id}-${d.sub.rasgos.length}`}>
              <Campo etiqueta="Clase">
                <select defaultValue={d.sub.clase} className={claseCampo} onChange={e => setPath(S.draft, 'sub.clase', e.target.value)}>
                  <option value="">Elige…</option>{clasesTodas.map(([k, x]) => <option key={k} value={k}>{x.n}</option>)}
                </select>
              </Campo>
              <Campo etiqueta="Nombre"><Borrador path="sub.n" value={d.sub.n} /></Campo>
              <h3 className="m-0 font-serif text-lg font-bold">Rasgos</h3>
              {lista(d.sub.rasgos, 'sub')}
              <RasgoForm p="ds" />
              <div className="flex flex-wrap gap-2">
                <Boton onClick={() => agregarRasgo('sub')}>Agregar este rasgo</Boton>
                <Boton variante="primario" onClick={guardarSub}>Guardar subclase</Boton>
              </div>
            </div>
          </Plegable>
        </Seccion>
      )}
    </>
  );
}
