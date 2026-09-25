/* Índice de lo generado por scripts/gemini/revisar.ts (no editar a mano: se rehace al aplicar un lote) */
/* eslint-disable @typescript-eslint/no-explicit-any */

const todas: { reglas: any[]; fuentes: Record<string, string>; descripciones: Record<string, string> }[] = [];
export const REGLAS_GENERADAS: any[] = todas.flatMap(x => x.reglas);
export const FUENTES_GENERADAS: Record<string, string> = Object.assign({}, ...todas.map(x => x.fuentes));
export const DESCRIPCIONES_GENERADAS: Record<string, string> = Object.assign({}, ...todas.map(x => x.descripciones));
