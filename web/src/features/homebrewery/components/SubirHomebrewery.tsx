'use client';
import { useState } from 'react';
import { avisar } from '@/shared/ui/avisos';
import { Aviso, Boton, Campo, Fila, Lista, Nota, Seccion, claseCampo } from '@/shared/ui/kit';
import { guiaABloques } from '../domain/guia';
import { paginar } from '../domain/paginar';
import { cuantosImprimibles, extraerImprimibles, paginaImprimibles, type Imprimibles } from '../domain/imprimibles';
import { tituloDe } from '../domain/brew';
import { crearMedidor } from '../client/medidor';
import { abrirVentana, paginaPdf } from '../client/pdf';

type Guia = {
  archivo: string; texto: string; titulo: string;
  /** ya viene en formato Homebrewery (.txt hecho antes); si no, es una guía en Markdown que hay que maquetar */
  lista: boolean;
  imprimibles: string;
  /** el texto para Homebrewery, cuando ya se maquetó */
  brew?: string;
  /** la página del PDF, ya preparada: se abre con el siguiente toque */
  pdf?: string;
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
  // fuera de la página, algunos navegadores del móvil no descargan nada
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 60_000);
}

/** «3 documentos, 4 mapas y estadísticas»: lo que sale en Imprimibles, o vacío si no hay nada. */
function resumen(x: Imprimibles): string {
  if (!cuantosImprimibles(x)) return '';
  const partes = [
    x.docs.length && `${x.docs.length} documento${x.docs.length === 1 ? '' : 's'}`,
    x.mapas.length && `${x.mapas.length} mapa${x.mapas.length === 1 ? '' : 's'}`,
    x.dm.length && 'páginas del DM',
  ].filter(Boolean) as string[];
  return partes.length > 1 ? `${partes.slice(0, -1).join(', ')} y ${partes[partes.length - 1]} para imprimir` : `${partes[0]} para imprimir`;
}

const bloqueada = () => avisar('El navegador bloqueó la ventana nueva: permite las ventanas emergentes para esta página.', 'aviso');

function abrirImprimibles(g: Guia) {
  if (!abrirVentana(paginaImprimibles(g.titulo, extraerImprimibles(g.texto), location.origin))) bloqueada();
}

const enlaceBoton = 'inline-flex min-h-11 items-center justify-center rounded-xl px-3 text-center text-sm font-bold ring-1 ring-inset ring-rule hover:bg-soft sm:min-h-9';

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
      return { archivo: f.name, texto, titulo, lista, imprimibles: resumen(extraerImprimibles(texto)) };
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

  /** El texto ya maquetado de una guía (lo maqueta si hace falta). */
  const brewDe = async (i: number) => {
    const g = guias[i];
    if (g.lista) return g.texto;
    if (g.brew) return g.brew;
    const lista = await maquetar(guias.map((x, j) => (j === i ? x : { ...x, lista: true })));
    setOcupado('');
    return lista[i].brew;
  };

  /** Primer toque: maqueta, sube a Homebrewery (si aún no está) y prepara el PDF con la app delante. Segundo: lo abre. */
  const pdf = async (i: number) => {
    const g = guias[i];
    if (g.pdf) { if (!abrirVentana(g.pdf)) bloqueada(); return; }
    try {
      const brew = await brewDe(i);
      if (!brew) return;
      if (!g.leer) {
        setOcupado(`Subiendo ${g.titulo}…`);
        try {
          const r = await subirUna(g.archivo, brew, cookie);
          cambiar(i, { editar: r.editar, leer: r.leer, error: undefined });
        } catch (e) {
          cambiar(i, { error: `No se subió a Homebrewery: ${e instanceof Error ? e.message : 'sin conexión'}. El PDF sale igual.` });
        }
      }
      setOcupado(`Preparando el PDF de ${g.titulo}…`);
      cambiar(i, { pdf: await paginaPdf(brew, g.titulo) });
      avisar('El PDF está listo: pulsa «Abrir PDF».');
    } catch (e) {
      console.error('[homebrewery] pdf', e);
      // con el motivo, para poder arreglarlo (en el móvil no hay consola)
      avisar(`No se pudo preparar el PDF: ${e instanceof Error ? e.message : String(e)}`, 'aviso');
    } finally {
      setOcupado('');
    }
  };

  const txt = async (i: number) => {
    try {
      const brew = await brewDe(i);
      if (brew) descargar(nombreTxt(guias[i].archivo), brew);
    } finally {
      setOcupado('');
    }
  };

  return (
    <Seccion titulo="Guías de sesión" descripcion="Elige la guía (.md, o el .txt ya maquetado) y la app la maqueta como un manual: descárgala en PDF, imprime los documentos para entregar o súbela a homebrewery.naturalcrit.com.">
      <div className="grid gap-3">
        <Campo etiqueta="Guías (.md o .txt)" ayuda="Puedes elegir varias a la vez.">
          <input type="file" accept=".md,.markdown,.txt,text/plain,text/markdown" multiple className={claseCampo} disabled={!!ocupado}
            onChange={(e) => { void elegir([...(e.target.files || [])]); }} />
        </Campo>
        {guias.length > 0 && (
          <Lista etiqueta="Guías elegidas">
            {guias.map((g, i) => (
              <Fila key={g.archivo} className="grid justify-stretch gap-2 py-3">
                <span className="grid min-w-0 gap-0.5">
                  <b className="[overflow-wrap:anywhere]">{g.titulo}</b>
                  <span className="text-sm text-muted">
                    {g.lista ? 'Ya maquetada' : 'Guía en Markdown: se maqueta al usarla'}
                    {g.imprimibles && ` · ${g.imprimibles}`}
                  </span>
                </span>
                {ocupado && ocupado.includes(g.titulo) && <span role="status" className="text-sm font-bold">{ocupado}</span>}
                {g.error && <Aviso tipo="error" titulo="No se pudo">{g.error}</Aviso>}
                <span className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                  <Boton tamano="sm" variante={g.pdf ? 'primario' : undefined} disabled={!!ocupado} onClick={() => pdf(i)}>{g.pdf ? 'Abrir PDF' : g.leer ? 'Preparar PDF' : 'Subir y PDF'}</Boton>
                  {g.imprimibles && <Boton tamano="sm" onClick={() => abrirImprimibles(g)}>Imprimibles</Boton>}
                  {!g.lista && <Boton tamano="sm" disabled={!!ocupado} onClick={() => txt(i)}>Descargar .txt</Boton>}
                  {g.leer && <a className={enlaceBoton} href={g.leer} target="_blank" rel="noreferrer">Leer en Homebrewery</a>}
                  {g.editar && <a className={enlaceBoton} href={g.editar} target="_blank" rel="noreferrer">Editar en Homebrewery</a>}
                  {g.leer && <Boton tamano="sm" variante="fantasma" onClick={() => copiar(g.leer!)}>Copiar enlace</Boton>}
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
        {guias.some((g) => g.leer) && <Nota>Guarda los enlaces: cada subida crea una copia nueva y Homebrewery no la borra sola. «Editar» es solo para ti.</Nota>}
      </div>
    </Seccion>
  );
}
