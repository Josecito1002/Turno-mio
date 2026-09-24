'use client';
import { useEffect, useState } from 'react';
import { S } from '@/app-shell/estado';
import { avisar } from '@/shared/ui/avisos';
import { Aviso, Boton, EncabezadoPagina, Fila, Lista, Nota, Seccion, claseCampo, cx } from '@/shared/ui/kit';
import { confirmar } from '@/shared/ui/confirmar';
import { cambiarRol, listarCuentas, restablecerContrasena, type Cuenta } from '../api';

const ROLES: [string, string, string][] = [
  ['jugador', 'Jugador', 'Crea y usa sus propios personajes.'],
  ['dm', 'DM', 'Además usa la Mesa del DM: campañas, iniciativa y combate.'],
  ['admin', 'Administrador', 'Además edita la biblioteca y los roles de las cuentas.'],
];

/** Solo administradores: lista de cuentas y su rol. */
export function CuentasVista() {
  const [cuentas, setCuentas] = useState<Cuenta[] | null>(null);
  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState('');

  useEffect(() => { listarCuentas().then(setCuentas).catch((e: Error) => setError(e.message)); }, []);

  const [temporales, setTemporales] = useState<Record<string, string>>({});
  const restablecer = async (c: Cuenta) => {
    if (!(await confirmar({ titulo: `¿Restablecer la contraseña de ${c.nombre}?`, si: 'Restablecer',
      texto: 'Su contraseña actual deja de servir. Se genera una temporal que tendrás que pasarle; al entrar podrá cambiarla.' }))) return;
    setGuardando(c.id);
    try { const t = await restablecerContrasena(c.id); setTemporales(x => ({ ...x, [c.id]: t })); }
    catch (e) { avisar((e as Error).message, 'error'); }
    finally { setGuardando(''); }
  };

  const cambiar = async (c: Cuenta, rol: string) => {
    setGuardando(c.id);
    try {
      const n = await cambiarRol(c.id, rol);
      setCuentas(cs => cs!.map(x => (x.id === n.id ? n : x)));
      avisar(`${c.nombre} ahora es ${ROLES.find(r => r[0] === rol)![1].toLowerCase()}.`);
      // Si cambió el propio rol, se recarga para traer (o dejar de traer) lo que ese rol puede ver.
      if (c.id === S.usuario?.id) window.location.reload();
    } catch (e) { avisar((e as Error).message, 'error'); }
    finally { setGuardando(''); }
  };

  return (
    <>
      <EncabezadoPagina id="titulo-vista" titulo="Cuentas" subtitulo="Elige qué puede hacer cada persona. El cambio aplica de inmediato." />
      <Seccion titulo="Roles">
        <dl className="m-0 grid gap-2 sm:grid-cols-3">
          {ROLES.map(([k, n, d]) => <div key={k} className="rounded-2xl bg-surface p-3 ring-1 ring-rule/60"><dt className="font-bold">{n}</dt><dd className="m-0 text-sm text-muted">{d}</dd></div>)}
        </dl>
      </Seccion>
      <Seccion titulo="Personas">
        {error ? <Aviso tipo="error" titulo="No se pudieron cargar las cuentas">{error}</Aviso>
          : !cuentas ? <Nota>Cargando…</Nota>
          : (
            <Lista etiqueta="Cuentas registradas">
              {cuentas.map(c => (
                <Fila key={c.id}>
                  <span className="min-w-0">
                    <b className="block">{c.nombre}{c.id === S.usuario?.id && <span className="ml-1 font-normal text-muted">(tú)</span>}</b>
                    <span className="block truncate text-sm text-muted">{c.email}</span>
                  </span>
                  <span className="flex flex-wrap items-center justify-end gap-2">
                    <label className="flex items-center gap-2 text-sm font-bold">
                      <span className="sr-only">Rol de {c.nombre}</span>
                      <select value={c.rol} disabled={guardando === c.id} onChange={e => cambiar(c, e.target.value)} className={cx(claseCampo, 'w-44! cursor-pointer')}>
                        {ROLES.map(([k, n]) => <option key={k} value={k}>{n}</option>)}
                      </select>
                    </label>
                    {c.id !== S.usuario?.id && <Boton tamano="sm" variante="fantasma" disabled={guardando === c.id} onClick={() => restablecer(c)}>Restablecer contraseña</Boton>}
                  </span>
                  {temporales[c.id] && (
                    <p role="status" className="m-0 w-full rounded-xl bg-soft p-3 text-sm">
                      Contraseña temporal de {c.nombre}: <b className="select-all font-mono text-base">{temporales[c.id]}</b>. Pásasela; al entrar, que la cambie en «Cambiar mi contraseña». No se vuelve a mostrar.
                    </p>
                  )}
                </Fila>
              ))}
            </Lista>
          )}
        <Nota>Siempre tiene que quedar al menos un administrador.</Nota>
      </Seccion>
    </>
  );
}
