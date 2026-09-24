import { sileo } from 'sileo';

export type TipoAviso = 'exito' | 'info' | 'aviso' | 'error';
const TITULO: Record<TipoAviso, string> = { exito: 'Listo', info: 'Aviso', aviso: 'Atención', error: 'Algo falló' };
const FN = { exito: sileo.success, info: sileo.info, aviso: sileo.warning, error: sileo.error } as const;

/** Toast con sileo. Los mensajes cortos van como título; los largos, como descripción. */
export function avisar(msg: string, tipo: TipoAviso = 'exito') {
  if (!msg) return;
  if (msg.length <= 34) FN[tipo]({ title: msg });
  else FN[tipo]({ title: TITULO[tipo], description: msg });
}
