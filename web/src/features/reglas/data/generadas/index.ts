/* Índice de lo generado por scripts/gemini/revisar.ts (no editar a mano: se rehace al aplicar un lote) */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as druida from './druida';
import * as explorador from './explorador';
import * as guerrero from './guerrero';
import * as hechicero from './hechicero';
import * as mago from './mago';

const todas: any[] = [druida, explorador, guerrero, hechicero, mago];
export const REGLAS_GENERADAS: any[] = todas.flatMap(x => x.reglas);
export const FUENTES_GENERADAS: Record<string, string> = Object.assign({}, ...todas.map(x => x.fuentes));
export const DESCRIPCIONES_GENERADAS: Record<string, string> = Object.assign({}, ...todas.map(x => x.descripciones));
