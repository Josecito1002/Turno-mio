/* Índice de lo generado por scripts/gemini/revisar.ts (no editar a mano: se rehace al aplicar un lote) */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as druida from './druida';
import * as explorador from './explorador';
import * as guerrero from './guerrero';
import * as hechicero from './hechicero';
import * as mago from './mago';
import * as monje from './monje';
import * as paladin from './paladin';
import * as picaro from './picaro';
import * as playtest2026 from './playtest-2026';
import * as psion from './psion';

const todas: any[] = [druida, explorador, guerrero, hechicero, mago, monje, paladin, picaro, playtest2026, psion];
export const REGLAS_GENERADAS: any[] = todas.flatMap(x => x.reglas);
export const FUENTES_GENERADAS: Record<string, string> = Object.assign({}, ...todas.map(x => x.fuentes));
export const DESCRIPCIONES_GENERADAS: Record<string, string> = Object.assign({}, ...todas.map(x => x.descripciones));
export const CLAVES_PLAYTEST_GENERADAS: Record<string, string> = { ...playtest2026.clavesPlaytest, ...psion.clavesPlaytest };
