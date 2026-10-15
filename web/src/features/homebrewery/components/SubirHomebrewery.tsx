'use client';
import { useState } from 'react';
import { avisar } from '@/shared/ui/avisos';
import { Aviso, Boton, Campo, Fila, Lista, Nota, Seccion, claseCampo } from '@/shared/ui/kit';

type Subida = { archivo: string; titulo?: string; editar?: string; leer?: string; error?: string };

async function subirUna(f: File, cookie: string): Promise<Subida> {
  const r = await fetch('/api/homebrewery', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ archivo: f.name, texto: await f.text(), cookie }),
  });
  if (!r.ok) return { archivo: f.name, error: (await r.text()) || `Error ${r.status}` };
  return { archivo: f.name, ...(await r.json()) };
}

const copiar = (t: string) => navigator.clipboard.writeText(t).then(() => avisar('Enlace copiado.'), () => avisar('No se pudo copiar el enlace.', 'aviso'));

/** Sube guías ya convertidas al formato de Homebrewery (.txt) y deja sus enlaces a mano. */
export function SubirHomebrewery() {
  const [archivos, setArchivos] = useState<File[]>([]);
  const [cookie, setCookie] = useState('');
  const [ocupado, setOcupado] = useState('');
  const [hechas, setHechas] = useState<Subida[]>([]);

  const subir = async () => {
    const lista = [];
    for (const f of archivos) {
      setOcupado(`Subiendo ${f.name}…`);
      lista.push(await subirUna(f, cookie).catch(() => ({ archivo: f.name, error: 'No se pudo conectar con la app.' })));
      setHechas([...lista]);
    }
    setOcupado('');
    const bien = lista.filter(x => !x.error).length;
    avisar(bien === lista.length ? `${bien} guía${bien === 1 ? '' : 's'} en Homebrewery.` : `Subidas ${bien} de ${lista.length}.`, bien === lista.length ? undefined : 'aviso');
  };

  return (
    <Seccion titulo="Guías a Homebrewery" descripcion="Sube los .txt de tus guías y se crean en homebrewery.naturalcrit.com, sin copiar ni pegar.">
      <div className="grid gap-3">
        <Campo etiqueta="Guías (.txt)" ayuda="Puedes elegir varias a la vez.">
          <input type="file" accept=".txt,.md,text/plain,text/markdown" multiple className={claseCampo}
            onChange={e => { setArchivos([...(e.target.files || [])]); setHechas([]); }} />
        </Campo>
        <Campo etiqueta="Tu cookie nc_session (opcional)"
          ayuda="Sin ella, las guías se crean sin dueño: las abre quien tenga el enlace, pero no salen en tu lista de Homebrewery. Para que salgan en tu cuenta, entra en Homebrewery desde un ordenador y copia el valor de nc_session (F12 › Aplicación › Cookies). No se guarda.">
          <input type="password" autoComplete="off" value={cookie} onChange={e => setCookie(e.target.value)} placeholder="eyJ0eXAi…" className={claseCampo} />
        </Campo>
        <div>
          <Boton variante="primario" disabled={!archivos.length || !!ocupado} onClick={subir}>
            {ocupado || (archivos.length > 1 ? `Subir ${archivos.length} guías` : 'Subir a Homebrewery')}
          </Boton>
        </div>
        {hechas.length > 0 && (
          <Lista etiqueta="Guías subidas">
            {hechas.map(x => (
              <Fila key={x.archivo}>
                {x.error ? <Aviso tipo="error" titulo={x.archivo}>{x.error}</Aviso> : (
                  <>
                    <b className="min-w-0 [overflow-wrap:anywhere]">{x.titulo}</b>
                    <span className="flex flex-wrap gap-2">
                      <a className="font-bold underline" href={x.editar} target="_blank" rel="noreferrer">Editar</a>
                      <a className="font-bold underline" href={x.leer} target="_blank" rel="noreferrer">Leer</a>
                      <Boton tamano="sm" variante="fantasma" onClick={() => copiar(x.leer!)}>Copiar enlace para leer</Boton>
                    </span>
                  </>
                )}
              </Fila>
            ))}
          </Lista>
        )}
        {hechas.some(x => !x.error) && <Nota>Guarda los enlaces: cada subida crea una copia nueva y Homebrewery no la borra sola. «Editar» es solo para ti.</Nota>}
      </div>
    </Seccion>
  );
}
