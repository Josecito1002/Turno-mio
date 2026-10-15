'use client';
import { useState } from 'react';
import { avisar } from '@/shared/ui/avisos';
import { Aviso, Boton, Campo, Fila, Lista, Nota, Seccion, claseCampo } from '@/shared/ui/kit';
import { guiaABloques } from '../domain/guia';
import { paginar } from '../domain/paginar';
import { extraerEntregables, paginaImprimibles } from '../domain/imprimibles';
import { tituloDe } from '../domain/brew';
import { crearMedidor } from '../client/medidor';

type Guia = {
  archivo: string; texto: string; titulo: string;
  /** ya viene en formato Homebrewery (.txt hecho antes); si no, es una guía en Markdown que hay que maquetar */
  lista: boolean;
  entregables: number;
  /** el texto para Homebrewery, cuando ya se maquetó */
  brew?: string;
  editar?: string; leer?: string; error?: string;
};

const esHomebrewery = (t: string) => /\{\{frontCover\}\}|^\\page$/m.test(t);

async function subirUna(archivo: string, texto: string, cookie: string) {
  const r = await fetch('/api/homebrewery', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ archivo, texto, cookie }),
  });
  if (!r.ok) throw new Error((await r.text()) || `Error ${r.status}`);
  return (await r.json()) as { titulo: string; editar: string; leer: string };
}

const copiar = (t: string) => navigator.clipboard.writeText(t).then(() => avisar('Enlace copiado.'), () => avisar('No se pudo copiar el enlace.', 'aviso'));

function descargar(nombre: string, texto: string) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([texto], { type: 'text/plain;charset=utf-8' }));
  a.download = nombre;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function abrirImprimibles(g: Guia) {
  const html = paginaImprimibles(g.titulo, extraerEntregables(g.texto), location.origin);
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
  if (!window.open(url, '_blank')) avisar('El navegador bloqueó la ventana nueva: permite las ventanas emergentes para esta página.', 'aviso');
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

const nombreTxt = (archivo: string) => archivo.replace(/\.(md|txt|markdown)$/i, '') + '.homebrewery.txt';

/** Guías de sesión: las maqueta para The Homebrewery, las sube y saca sus documentos para imprimir. */
export function SubirHomebrewery() {
  const [guias, setGuias] = useState<Guia[]>([]);
  const [cookie, setCookie] = useState('');
  const [ocupado, setOcupado] = useState('');

  const elegir = async (files: File[]) => {
    setGuias(await Promise.all(files.map(async (f) => {
      const texto = await f.text();
      const lista = esHomebrewery(texto);
      const titulo = lista ? tituloDe(texto, f.name) : (() => { const { meta } = guiaABloques(texto); return [meta.title, meta.subtitle].filter(Boolean).join(' · '); })();
      return { archivo: f.name, texto, titulo, lista, entregables: extraerEntregables(texto).length };
    })));
  };

  const cambiar = (i: number, x: Partial<Guia>) => setGuias((gs) => gs.map((g, j) => (j === i ? { ...g, ...x } : g)));

  /** Maqueta en el navegador las guías en Markdown que aún no lo están. */
  const maquetar = async (lista: Guia[]) => {
    const pendientes = lista.map((g, i) => [g, i] as const).filter(([g]) => !g.lista && !g.brew);
    if (!pendientes.length) return lista;
    const medidor = await crearMedidor();
    const out = [...lista];
    try {
      for (const [g, i] of pendientes) {
        setOcupado(`Maquetando ${g.titulo}…`);
        try {
          const { meta, bloques } = guiaABloques(g.texto);
          const brew = await paginar(bloques, meta, medidor, (n) => setOcupado(`Maquetando ${g.titulo}: página ${n}…`));
          out[i] = { ...g, brew, error: undefined };
        } catch (e) {
          console.error('[homebrewery] maquetar', e);
          out[i] = { ...g, error: 'No se pudo maquetar esta guía.' };
        }
        cambiar(i, out[i]);
      }
    } finally {
      medidor.cerrar();
    }
    return out;
  };

  const subir = async () => {
    const lista = await maquetar(guias);
    let bien = 0;
    for (const [i, g] of lista.entries()) {
      const texto = g.lista ? g.texto : g.brew;
      if (!texto) continue;
      setOcupado(`Subiendo ${g.titulo}…`);
      try {
        const r = await subirUna(g.archivo, texto, cookie);
        cambiar(i, { editar: r.editar, leer: r.leer, error: undefined });
        bien++;
      } catch (e) {
        cambiar(i, { error: e instanceof Error ? e.message : 'No se pudo conectar con la app.' });
      }
    }
    setOcupado('');
    avisar(bien === lista.length ? `${bien} guía${bien === 1 ? '' : 's'} en Homebrewery.` : `Subidas ${bien} de ${lista.length}.`, bien === lista.length ? undefined : 'aviso');
  };

  const soloMaquetar = async (i: number) => {
    const lista = await maquetar(guias.map((g, j) => (j === i ? g : { ...g, lista: true })));
    setOcupado('');
    const brew = lista[i].brew;
    if (brew) descargar(nombreTxt(guias[i].archivo), brew);
  };

  return (
    <Seccion titulo="Guías de sesión" descripcion="Elige la guía (.md) y la app la maqueta como un manual, la sube a homebrewery.naturalcrit.com y saca los documentos para entregar listos para imprimir. También acepta los .txt ya maquetados.">
      <div className="grid gap-3">
        <Campo etiqueta="Guías (.md o .txt)" ayuda="Puedes elegir varias a la vez.">
          <input type="file" accept=".md,.markdown,.txt,text/plain,text/markdown" multiple className={claseCampo} disabled={!!ocupado}
            onChange={(e) => { void elegir([...(e.target.files || [])]); }} />
        </Campo>
        {guias.length > 0 && (
          <Lista etiqueta="Guías elegidas">
            {guias.map((g, i) => (
              <Fila key={g.archivo}>
                <span className="grid min-w-0 gap-1">
                  <b className="[overflow-wrap:anywhere]">{g.titulo}</b>
                  {g.error && <Aviso tipo="error" titulo="No se pudo">{g.error}</Aviso>}
                </span>
                <span className="flex flex-wrap items-center gap-2">
                  {g.leer && <a className="font-bold underline" href={g.editar} target="_blank" rel="noreferrer">Editar</a>}
                  {g.leer && <a className="font-bold underline" href={g.leer} target="_blank" rel="noreferrer">Leer</a>}
                  {g.leer && <Boton tamano="sm" variante="fantasma" onClick={() => copiar(g.leer!)}>Copiar enlace</Boton>}
                  {g.entregables > 0 && <Boton tamano="sm" variante="secundario" onClick={() => abrirImprimibles(g)}>Imprimibles ({g.entregables})</Boton>}
                  {!g.lista && <Boton tamano="sm" variante="fantasma" disabled={!!ocupado} onClick={() => (g.brew ? descargar(nombreTxt(g.archivo), g.brew) : soloMaquetar(i))}>Descargar .txt</Boton>}
                </span>
              </Fila>
            ))}
          </Lista>
        )}
        <Campo etiqueta="Tu cookie nc_session (opcional)"
          ayuda="Sin ella, las guías se crean sin dueño: las abre quien tenga el enlace, pero no salen en tu lista de Homebrewery. Para que salgan en tu cuenta, entra en Homebrewery desde un ordenador y copia el valor de nc_session (F12 › Aplicación › Cookies). No se guarda.">
          <input type="password" autoComplete="off" value={cookie} onChange={(e) => setCookie(e.target.value)} placeholder="eyJ0eXAi…" className={claseCampo} />
        </Campo>
        <div>
          <Boton variante="primario" disabled={!guias.length || !!ocupado} onClick={subir}>
            {ocupado || (guias.length > 1 ? `Subir ${guias.length} guías a Homebrewery` : 'Subir a Homebrewery')}
          </Boton>
        </div>
        {guias.some((g) => g.leer) && <Nota>Guarda los enlaces: cada subida crea una copia nueva y Homebrewery no la borra sola. «Editar» es solo para ti. Para el PDF, abre «Leer» y pulsa «Get PDF» arriba.</Nota>}
      </div>
    </Seccion>
  );
}
