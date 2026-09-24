/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { setLib } from '@/features/biblioteca/domain/biblioteca';
import { compute } from '@/features/personajes/domain/calculo';
import { nuevoPj } from '@/features/personajes/domain/modelo';
import { textoArmaduras, textoArmas } from './competencias';
import { mejoraDeDote } from './mejora-dote';

/* Un mago (sin armaduras, solo armas sencillas) con una especie y dotes de prueba */
const especie = (texto: string) => ({ n: 'Especie de prueba', lib: true, vel: 30, vision: 0, rasgos: [{ nombre: 'Entrenamiento', t: 'pasiva', texto }] });
const dote = (n: string, texto: string) => ({ n, t: 'pasiva', texto, cat: 'General', nivelMin: 1 });
function pj(opts: { especie?: string; dotes?: string[]; armadura?: string; escudo?: boolean; armas?: [string, number][]; elecciones?: Record<string, any>; clase?: string; subclase?: string; nivel?: number; mejoras?: Record<number, any> } = {}) {
  const p: any = nuevoPj();
  Object.assign(p, { clase: opts.clase || 'mago', subclase: opts.subclase || '', nivel: opts.nivel || 1, mejoras: opts.mejoras || {}, armadura: opts.armadura || 'ninguna', escudo: !!opts.escudo, armas: opts.armas || [], elecciones: opts.elecciones || {} });
  if (opts.especie) p.especie = { ...p.especie, key: opts.especie };
  p.dotesExtra = (opts.dotes || []).map(key => ({ key }));
  p.gen.metodo = 'manual';
  Object.assign(p.gen.manual, { fue: 14, des: 14, con: 14, int: 16, sab: 12, car: 8 });
  return compute(p);
}
const aviso = (c: any, t: string) => c.avisos.some((a: any) => a.t === t);

beforeEach(() => setLib({
  clases: {
    guerrero: { subclases: { 'maestro-batalla': { n: 'Maestro de Batalla', rasgos: [{ nombre: 'Estudiante de la Guerra', n: 3, t: 'pasiva', texto: 'Competencia con herramientas de artesano.' }] } } },
  },
  especies: {
    'lib:prueba': especie('Competencia con espada larga y espada corta.'),
    'lib:githyanki': { n: 'Githyanki', lib: true, vel: 30, vision: 0, rasgos: [{ nombre: 'Conocimiento Astral', t: 'fuera', texto: 'Al terminar un descanso largo ganas competencia en una habilidad y en un arma o herramienta a tu elección.' }] },
    'lib:autognomo': { n: 'Autognomo', lib: true, vel: 30, vision: 0, rasgos: [{ nombre: 'Diseño Especializado', t: 'pasiva', texto: 'Competencia con dos herramientas a tu elección.' }] },
  },
  dotes: {
    'lib:pesada': dote('Fuertemente Acorazado', 'Aumentas tu FUE en 1. Ganas competencia con armaduras pesadas.'),
    'lib:ligera': dote('Ligeramente Acorazado', 'Ganas competencia con armaduras ligeras, medias y escudos.'),
    'lib:media': dote('Maestro de Armadura Media', 'Requisito: competencia con armaduras medias. Tu DES suma hasta 3.'),
    'lib:eleccion': dote('Versátil', 'Ganas competencia con un arma o herramienta a tu elección.'),
    'lib:mente': dote('Mente de Hierro', 'Ganas competencia en salvaciones de fuerza.'),
    'lib:chef': dote('Chef', 'Ganas competencia con utensilios de cocina.'),
    'lib:maestro-armas': dote('Maestro de Armas', 'Sumas +1 a Fuerza o Destreza. Ganas competencia con 4 armas y una maestría.'),
    'lib:resiliente': dote('Resiliente', 'Aumentas una característica en +1 y ganas competencia en sus tiradas de salvación.'),
    'lib:actor': dote('Actor', 'Sumas +1 a Carisma. Ventaja en Engaño e Interpretación al hacerte pasar por otro.'),
    'lib:don': { ...dote('Don de Fortaleza', 'Sumas +1 a una característica (máx 30). +40 PG máximos.'), cat: 'Épica', nivelMin: 19 },
    'lib:con-preposicion': dote('Prueba', 'Sumas +1 a Fuerza o Destreza con un arma.'),
  },
}));

describe('Competencias de rasgos', () => {
  test('la clase sola: el mago no tiene armaduras ni armas marciales', () => {
    const c = pj();
    assert.equal(textoArmaduras(c), 'Ninguna');
    assert.equal(textoArmas(c), 'Armas sencillas');
    assert.deepEqual(c.compFuentes, []);
  });
  test('una dote da armaduras y escudos, y dice de dónde salen', () => {
    const c = pj({ dotes: ['lib:ligera'], armadura: 'escamas', escudo: true });
    assert.equal(textoArmaduras(c), 'Armaduras ligeras, medias y escudos');
    assert.deepEqual(c.compFuentes.map((f: any) => f.src), ['Ligeramente Acorazado', 'Ligeramente Acorazado', 'Ligeramente Acorazado']);
    assert.equal(aviso(c, 'Armadura sin competencia'), false);
    assert.equal(aviso(c, 'Escudo sin competencia'), false);
  });
  test('Fuertemente Acorazado da armaduras pesadas', () => {
    assert.equal(pj({ dotes: ['lib:pesada'] }).compArm.pesada, true);
  });
  test('un requisito o una elección no dan competencia', () => {
    const c = pj({ dotes: ['lib:media', 'lib:eleccion'] });
    assert.equal(c.compArm.media, false);
    assert.deepEqual(c.compFuentes, []);
  });
  test('armas concretas de la especie: salen en Armas y suman competencia al ataque', () => {
    const sin = pj({ armas: [['espada_larga', 1]] }), con = pj({ especie: 'lib:prueba', armas: [['espada_larga', 1]] });
    assert.equal(con.armas[0].atk, sin.armas[0].atk + con.pb);
    assert.equal(sin.armas[0].notas.includes('Sin competencia'), true);
    assert.equal(textoArmas(con), 'Armas sencillas, Espada larga, Espada corta');
  });
  test('salvaciones y herramientas que da una dote', () => {
    const sin = pj(), c = pj({ dotes: ['lib:mente', 'lib:chef'] });
    assert.equal(c.saveProf.includes('fue'), true);
    assert.equal(c.saves.fue, sin.saves.fue + c.pb);
    assert.deepEqual(c.herramientas.map((h: any) => h.que), ['Utensilios de cocina']);
  });
});

describe('Sin competencia (reglas 2024)', () => {
  test('el escudo no suma a la CA y avisa', () => {
    const sin = pj(), c = pj({ escudo: true });
    assert.equal(c.ac, sin.ac);
    assert.equal(aviso(c, 'Escudo sin competencia'), true);
  });
  test('armadura sin competencia: avisa, pero la CA de la armadura se mantiene', () => {
    const c = pj({ armadura: 'cuero' });
    assert.equal(c.ac, 11 + 2);
    assert.equal(aviso(c, 'Armadura sin competencia'), true);
  });
});

describe('Competencias que se eligen', () => {
  test('Githyanki: el arma elegida da competencia; sin elegir, ninguna', () => {
    const sin = pj({ especie: 'lib:githyanki', armas: [['espadon', 1]] });
    const con = pj({ especie: 'lib:githyanki', armas: [['espadon', 1]], elecciones: { 'githyanki-astral': 'arma:espadon' } });
    assert.equal(sin.armas[0].notas.includes('Sin competencia'), true);
    assert.equal(con.armas[0].atk, sin.armas[0].atk + con.pb);
    assert.equal(con.elecciones.find((e: any) => e.id === 'githyanki-astral').opciones.some((o: any) => o.key === 'herr:ladron'), true);
  });
  test('Autognomo: dos herramientas elegidas salen en la hoja', () => {
    const c = pj({ especie: 'lib:autognomo', elecciones: { 'autognomo-herramientas': ['herr:ladron', 'herr:herrero'] } });
    assert.deepEqual(c.herramientas.map((h: any) => h.que), ['Herramientas de ladrón', 'Herramientas de herrero']);
    assert.equal(c.elecciones.find((e: any) => e.id === 'autognomo-herramientas').max, 2);
  });
  test('Maestro de Armas (2024): la maestría elegida aparece en el arma, aunque la clase no tenga maestrías', () => {
    const sin = pj({ dotes: ['lib:maestro-armas'], armas: [['daga', 1]] });
    const con = pj({ dotes: ['lib:maestro-armas'], armas: [['daga', 1]], elecciones: { 'maestro-armas': 'daga' } });
    assert.equal(sin.armas[0].maestria, null);
    assert.match(con.armas[0].maestria, /^Mellar/);
    assert.equal(con.elecciones.find((e: any) => e.id === 'maestro-armas').grupo, 'dote');
  });
  test('Estudiante de la Guerra: herramienta de artesano y habilidad elegidas', () => {
    const c = pj({ clase: 'guerrero', subclase: 'lib:maestro-batalla', nivel: 3, elecciones: { 'estudiante-guerra-herr': 'herr:herrero', 'estudiante-guerra-hab': 'historia' } });
    assert.equal(c.herramientas.some((h: any) => h.que === 'Herramientas de herrero'), true);
    assert.equal(c.skillProf.historia, true);
    assert.deepEqual(c.elecciones.filter((e: any) => e.grupo === 'sub').map((e: any) => e.id), ['estudiante-guerra-herr', 'estudiante-guerra-hab']);
  });
});

describe('El +1 a una característica de las dotes', () => {
  const conDote = (key: string, sube = '', nivel = 4, extra: any = {}) => pj({ nivel, mejoras: { [nivel >= 19 ? 19 : 4]: { modo: 'dote', key, sube } }, ...extra });
  test('lee a qué características puede subir', () => {
    assert.deepEqual(mejoraDeDote({ texto: 'Sumas +1 a Fuerza o Destreza. Algo más.' }), { opciones: ['fue', 'des'], max: 20 });
    assert.deepEqual(mejoraDeDote({ texto: 'Sumas +1 a una característica (máx 30).' })?.max, 30);
    assert.deepEqual(mejoraDeDote({ texto: 'Aumenta CON +1.' })?.opciones, ['con']);
    assert.deepEqual(mejoraDeDote({ texto: 'Sumas +1 a Fuerza o Destreza con un arma.' })?.opciones, ['fue', 'des']);
    assert.equal(mejoraDeDote({ texto: 'Ganas competencia con armaduras pesadas.' }), null);
  });
  test('con una sola opción se aplica sola; con varias, la elegida', () => {
    const sin = pj({ nivel: 4 });
    assert.equal(conDote('lib:actor').sc.car, sin.sc.car + 1);
    assert.equal(conDote('lib:maestro-armas', 'des').sc.des, sin.sc.des + 1);
    assert.equal(conDote('lib:maestro-armas').sc.des, sin.sc.des);
    assert.equal(conDote('lib:maestro-armas').avisos.some((a: any) => /Elige qué característica sube 1/.test(a.txt)), true);
  });
  test('Resiliente: la característica que sube también da la salvación', () => {
    const sin = pj({ nivel: 4 }), c = conDote('lib:resiliente', 'con');
    assert.equal(c.sc.con, sin.sc.con + 1);
    assert.equal(c.saves.con, c.m.con + c.pb);
    assert.equal(c.compFuentes.some((f: any) => f.src === 'Resiliente'), true);
  });
  test('los dones épicos pueden pasar de 20', () => {
    const c = conDote('lib:don', 'fue', 19, {});
    const base = pj({ nivel: 19 });
    assert.equal(c.sc.fue, base.sc.fue + 1);
    const p: any = nuevoPj(); Object.assign(p, { clase: 'mago', nivel: 19, mejoras: { 19: { modo: 'dote', key: 'lib:don', sube: 'fue' } } });
    p.gen.metodo = 'manual'; Object.assign(p.gen.manual, { fue: 20 });
    assert.equal(compute(p).sc.fue, 21);
  });
});
