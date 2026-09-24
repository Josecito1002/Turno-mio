'use client';
import { useEffect, useState } from 'react';
import { S } from '@/app-shell/estado';
import { avisar } from '@/shared/ui/avisos';
import { Aviso, EncabezadoPagina, Fila, Lista, Nota, Seccion, claseCampo, cx } from '@/shared/ui/kit';
import { cambiarRol, listarCuentas, type Cuenta } from '../api';

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
                  <label className="flex items-center gap-2 text-sm font-bold">
                    <span className="sr-only">Rol de {c.nombre}</span>
                    <select value={c.rol} disabled={guardando === c.id} onChange={e => cambiar(c, e.target.value)} className={cx(claseCampo, 'w-44! cursor-pointer')}>
                      {ROLES.map(([k, n]) => <option key={k} value={k}>{n}</option>)}
                    </select>
                  </label>
                </Fila>
              ))}
            </Lista>
          )}
        <Nota>Siempre tiene que quedar al menos un administrador.</Nota>
      </Seccion>
    </>
  );
}
