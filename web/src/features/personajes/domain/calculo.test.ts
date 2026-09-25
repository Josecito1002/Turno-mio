/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { setLib, getSubs } from '@/features/biblioteca/domain/biblioteca';
import { compute } from './calculo';
import { nuevoPj } from './modelo';
import { pendientes, pendientesAlSubir } from './pendientes';
import { ARMADURAS } from '@/features/reglas/data/equipo';
import { CLASES } from '@/features/reglas/data/clases';
import { EQUIPO_CLASES, kitClase } from '@/features/reglas/data/equipo-clases';
import { ESPECIES_2025 } from '../../../../scripts/datos/especies-2025';
import { BARBARO_2024 } from '../../../../scripts/datos/barbaro-2024';
import { BARDO_2024 } from '../../../../scripts/datos/bardo-2024';
import { CLERIGO_2024 } from '../../../../scripts/datos/clerigo-2024';
import { BRUJO_2024 } from '../../../../scripts/datos/brujo-2024';
import { DRUIDA_2024 } from '../../../../scripts/datos/druida-2024';
import { TRASFONDOS } from '@/features/reglas/data/trasfondos';
import { ARMAS } from '@/features/reglas/data/equipo';
import { EQUIPO_TRASFONDOS, kitTrasfondo } from '@/features/reglas/data/equipo-trasfondos';

/* Biblioteca mínima: solo nombres y niveles; las reglas revisadas se encuentran por nombre y origen */
const r = (n: number, nombre: string, texto = '') => ({ nombre, n, t: 'pasiva', texto, usos: 0, reset: 'largo' });
const cazador = {
  n: 'Cazador de Sangre', lib: true, dado: 10, sv: ['des', 'int'], habN: 3, habs: 'todas', w: { simple: 1, martial: 1 }, lanz: 'int', caster: null,
  recursosTabla: Array.from({ length: 20 }, (_, i) => ({ maldiciones_conocidas: i >= 16 ? 5 : i >= 12 ? 4 : i >= 9 ? 3 : i >= 5 ? 2 : 1 })),
  asi: [4, 8, 12, 16, 19], hasta: 0,
  rasgos: [r(1, 'Perdición del Cazador'), r(1, 'Maldición de Sangre'), r(2, 'Rito Carmesí'), r(5, 'Ataque Extra'), r(6, 'Marca de Castigo'),
    r(10, 'Aumento Oscuro'), r(13, 'Marca de Atadura')],
  subclases: {
    licantropo: { n: 'Orden del Licántropo', rasgos: [
      r(3, 'Transformación Híbrida', 'Tus ataques desarmados se convierten en garras que infligen 1d6 de daño cortante.'),
      r(7, 'Zancada Acechante'), r(18, 'Licantropía Maestra')] },
    'alma-profana': { n: 'Orden del Alma Profana', rasgos: [r(3, 'Pacto del Ocultismo'), r(3, 'Magia del Pacto'), r(7, 'Magia del Rito Imbuido')] },
    cazafantasmas: { n: 'Orden del Cazafantasmas', rasgos: [r(3, 'Maldición del Espectro'), r(7, 'Paso Etéreo'), r(15, 'Alma Sangrienta')] },
    mutante: { n: 'Orden del Mutante', rasgos: [r(3, 'Fórmulas Alquímicas'), r(3, 'Fabricación de Mutágenos')] },
  },
};
const pugilista = { n: 'Pugilista', lib: true, dado: 10, sv: ['fue', 'con'], habN: 2, habs: 'todas', w: { simple: 1 }, lanz: null, caster: null, hasta: 0,
  recursosTabla: [0, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 11, 12].map(moxie => ({ moxie })),
  rasgos: [r(1, 'Pugilismo'), r(1, 'Mentón de Hierro'), r(2, 'Determinación (Moxie)', 'Recuperas tu Moxie al terminar un descanso corto o largo.')],
  subclases: {
    'mala-leche': { n: 'Pura Mala Leche', rasgos: [r(3, 'Mala Actitud')] },
    'circulo-cuadrado': { n: 'El Círculo Cuadrado', rasgos: [r(3, 'Masa Muscular')] },
    'santo-callejero': { n: 'Santo Callejero', rasgos: [r(3, 'Imposición de Manos')] },
    'matones-sabuesos': { n: 'Matones Sabuesos', rasgos: [r(3, 'Trabajo de Detective')] },
    'mano-pavor': { n: 'Mano del Pavor', rasgos: [r(6, 'Trato con el Diablo')] },
    'perro-sabueso': { n: 'El Perro y el Sabueso', rasgos: [r(3, 'El Mejor Amigo del Luchador')] },
  } };

const arcanista = {
  n: 'Arcanista (Artífice)', lib: true, dado: 8, sv: ['con', 'int'], habN: 2, habs: 'todas', w: { simple: 1, martial: 0, light: 0, finesseLight: 0 },
  lanz: 'int', caster: 'tabla', slotsTabla: Array.from({ length: 20 }, () => [2]), asi: [4, 8, 12, 16], hasta: 0,
  recursosTabla: Array.from({ length: 20 }, (_, i) => ({ infusiones_conocidas: 4, items_infundidos: 2, cantrips: i >= 13 ? 4 : i >= 9 ? 3 : 2 })),
  rasgos: [r(1, 'Lanzamiento de Conjuros'), r(1, 'Magia de Manitas'), r(7, 'Destello de Genio')],
  subclases: {
    alquimista: { n: 'Alquimista', rasgos: [r(3, 'Herramientas del Oficio'), r(3, 'Elixir Experimental')] },
    armero: { n: 'Armero', rasgos: [r(3, 'Herramientas del Oficio'), r(3, 'Armadura Arcana y Modelo')] },
    artillero: { n: 'Artillero', rasgos: [r(3, 'Herramientas del Oficio'), r(3, 'Cañón Sobrenatural')] },
    'herrero-batalla': { n: 'Herrero de Batalla', rasgos: [r(3, 'Herramientas del Oficio y Preparado para Batalla'), r(3, 'Defensor de Acero'), r(9, 'Sacudida Arcana')] },
  },
};

function pj(clase: string, nivel: number, subclase = '', stats: Record<string, number> = {}, extra: Record<string, any> = {}) {
  const p: any = nuevoPj();
  Object.assign(p, { clase, nivel, subclase }, extra);
  p.gen.metodo = 'manual';
  Object.assign(p.gen.manual, { fue: 14, des: 14, con: 14, int: 16, sab: 10, car: 8 }, stats);
  return compute(p);
}
const recurso = (c: any, nombre: string) => c.recursos.find((x: any) => x.nombre === nombre);
const entrada = (c: any, nombre: string) => c.entries.find((e: any) => e.nombre === nombre);

beforeEach(() => setLib({ clases: { 'lib:cazador-sangre': cazador, 'lib:pugilista': pugilista, 'lib:arcanista': arcanista } }));

describe('Cazador de Sangre', () => {
  test('Maldición de Sangre: usos por descanso corto según nivel', () => {
    for (const [nivel, usos] of [[1, 1], [5, 1], [6, 2], [13, 3], [17, 4]]) {
      const m = recurso(pj('lib:cazador-sangre', nivel), 'Maldición de Sangre');
      assert.equal(m?.max, usos, `nivel ${nivel}`);
      assert.equal(m.reset, 'corto');
    }
  });
  test('las maldiciones conocidas no aparecen como recurso que se gasta', () => {
    assert.equal(pj('lib:cazador-sangre', 10).recursos.some((x: any) => /conocid/i.test(x.nombre)), false);
  });
  test('las 8 maldiciones 2022 salen como entradas propias, con su tipo', () => {
    const c = pj('lib:cazador-sangre', 1);
    assert.equal(c.entries.filter((e: any) => e.src === 'Maldición de Sangre').length, 8);
    assert.equal(entrada(c, 'Maldición de los Sin Ojos')?.t, 'reaccion');
    assert.equal(entrada(c, 'Maldición del Títere Caído')?.t, 'reaccion');
    assert.equal(entrada(c, 'Maldición de la Mente Confusa')?.t, 'adicional');
    assert.match(entrada(c, 'Maldición de la Atadura').texto, /CD 13/); // 8 + 2 + INT 3
  });
  test('Rito Carmesí: el dado de hemomancia sube con el nivel', () => {
    assert.equal(entrada(pj('lib:cazador-sangre', 4), 'Rito Carmesí').coste, 'recibes 1d4 necrótico');
    assert.equal(entrada(pj('lib:cazador-sangre', 11), 'Rito Carmesí').coste, 'recibes 1d8 necrótico');
  });
  test('Marca de Castigo: 1 uso por descanso corto; daño INT, doble desde nivel 13', () => {
    const c6 = pj('lib:cazador-sangre', 6);
    assert.equal(entrada(c6, 'Marca de Castigo').t, 'gratis');
    assert.equal(recurso(c6, 'Marca de Castigo')?.reset, 'corto');
    assert.match(entrada(c6, 'Marca de Castigo').texto, /recibe 3 de daño psíquico/);
    assert.match(entrada(pj('lib:cazador-sangre', 13), 'Marca de Castigo').texto, /recibe 6 de daño psíquico/);
    assert.match(entrada(pj('lib:cazador-sangre', 6, '', { int: 8 }), 'Marca de Castigo').texto, /recibe 1 de daño psíquico/);
  });
  test('Aumento Oscuro: +5 de velocidad y +INT a salvaciones de FUE, DES y CON', () => {
    const c9 = pj('lib:cazador-sangre', 9), c10 = pj('lib:cazador-sangre', 10);
    assert.equal(c9.speed, 30);
    assert.equal(c10.speed, 35);
    assert.equal(c10.saves.fue, c9.saves.fue + 3);
    assert.equal(c10.saves.des, c9.saves.des + 3); // misma competencia (+4) en nivel 9 y 10
    assert.equal(c10.saves.sab, c9.saves.sab);
  });
});

describe('Orden del Licántropo', () => {
  test('Zancada Acechante suma 10 de velocidad, y se acumula con Aumento Oscuro', () => {
    assert.equal(pj('lib:cazador-sangre', 7, 'lib:licantropo').speed, 40);
    assert.equal(pj('lib:cazador-sangre', 10, 'lib:licantropo').speed, 45);
  });
  const garras = (c: any) => c.naturales.find((a: any) => /Garras/.test(a.nombre));
  test('garras: mejor de FUE o DES, Poder Feral al daño y bono al ataque desde nivel 7; no cambian el golpe sin armas normal', () => {
    const c3 = pj('lib:cazador-sangre', 3, 'lib:licantropo', { fue: 10, des: 16 });
    assert.deepEqual([garras(c3).atk, garras(c3).expr], [5, '1d6+4']); // comp 2 + DES 3; DES 3 + feral 1
    assert.equal(c3.unarmed.expr, '1'); // golpe normal con FUE 0
    const c11 = pj('lib:cazador-sangre', 11, 'lib:licantropo');
    assert.deepEqual([garras(c11).atk, garras(c11).expr], [8, '1d8+4']); // comp 4 + 2 + 2; mod 2 + feral 2
  });
  test('Transformación Híbrida: 1 uso por descanso corto, 2 desde nivel 11, sin límite desde 18', () => {
    const c5 = recurso(pj('lib:cazador-sangre', 5, 'lib:licantropo'), 'Transformación Híbrida');
    assert.deepEqual([c5?.max, c5?.reset], [1, 'corto']);
    assert.equal(recurso(pj('lib:cazador-sangre', 11, 'lib:licantropo'), 'Transformación Híbrida')?.max, 2);
    const c18 = pj('lib:cazador-sangre', 18, 'lib:licantropo');
    assert.equal(recurso(c18, 'Transformación Híbrida'), undefined);
    assert.equal(entrada(c18, 'Transformación Híbrida').coste, 'sin límite');
  });
});

describe('Otras órdenes', () => {
  test('Alma Profana: espacios de pacto que vuelven con descanso corto', () => {
    const e3 = pj('lib:cazador-sangre', 3, 'lib:alma-profana').recursos.filter((x: any) => /pacto/.test(x.nombre));
    assert.deepEqual(e3.map((x: any) => [x.nombre, x.max, x.reset]), [['Espacios de pacto (nivel 1)', 1, 'corto']]);
    const c7 = pj('lib:cazador-sangre', 7, 'lib:alma-profana');
    assert.equal(recurso(c7, 'Espacios de pacto (nivel 2)')?.max, 2);
    assert.equal(c7.nivelMax, 2);
    assert.equal(entrada(c7, 'Frenesí Místico')?.t, 'adicional');
    assert.equal(recurso(c7, 'Arcano Revelado')?.max, 1);
  });
  test('Mutante: mutágenos por descanso 1, 2 desde nivel 7 y 3 desde 15; tomarlo es acción adicional', () => {
    for (const [nivel, n] of [[3, 1], [7, 2], [15, 3]]) assert.equal(recurso(pj('lib:cazador-sangre', nivel, 'lib:mutante'), 'Alquimia de Mutágenos')?.max, n);
    assert.equal(entrada(pj('lib:cazador-sangre', 3, 'lib:mutante'), 'Tomar un mutágeno')?.t, 'adicional');
  });
  test('Cazafantasmas: rasgos con su nombre 2022 y un uso más de Maldición de Sangre', () => {
    const c15 = pj('lib:cazador-sangre', 15, 'lib:cazafantasmas');
    assert.ok(entrada(c15, 'Especialista en Maldiciones'));
    assert.equal(entrada(c15, 'Maldición del Espectro'), undefined);
    assert.equal(entrada(c15, 'Maldición del Exorcista')?.t, 'adicional');
    assert.equal(recurso(pj('lib:cazador-sangre', 3, 'lib:cazafantasmas'), 'Maldición de Sangre')?.max, 2);
  });
  test('Cazafantasmas: Paso Etéreo 1 uso, 2 desde nivel 15', () => {
    assert.equal(recurso(pj('lib:cazador-sangre', 7, 'lib:cazafantasmas'), 'Paso Etéreo')?.max, 1);
    assert.equal(recurso(pj('lib:cazador-sangre', 15, 'lib:cazafantasmas'), 'Paso Etéreo')?.max, 2);
  });
});

describe('Pugilista 2024', () => {
  const P = 'lib:pugilista';
  test('dado de Pugilismo: 1d8, 1d10 en 5, 1d12 en 11 y 2d6 en 17', () => {
    assert.deepEqual([1, 5, 11, 17].map(n => pj(P, n).unarmed.expr), ['1d8+2', '1d10+2', '1d12+2', '2d6+2']);
  });
  test('Mentón de Hierro: CA 12 + CON sin armadura o con armadura ligera, no con escudo', () => {
    assert.equal(pj(P, 1, '', { des: 10, con: 16 }).ac, 15);
    assert.equal(pj(P, 1, '', { des: 10, con: 16 }, { armadura: 'cuero' }).ac, 15);
    // Con escudo pierde Mentón de Hierro, y sin competencia con escudos (reglas 2024) el escudo tampoco suma
    assert.equal(pj(P, 1, '', { des: 10, con: 16 }, { escudo: true }).ac, 10);
  });
  test('Moxie: puntos por nivel y sus tres usos como acción adicional', () => {
    assert.equal(recurso(pj(P, 2), 'Determinación (Moxie)')?.max, 2);
    assert.equal(recurso(pj(P, 20), 'Determinación (Moxie)')?.max, 12);
    const c = pj(P, 2);
    assert.deepEqual(['Prepárate', 'Uno-Dos', 'Pegar y Moverse'].map(n => entrada(c, n)?.t), ['adicional', 'adicional', 'adicional']);
  });
  test('Pura Mala Leche: competencia en Intimidación más FUE', () => {
    const sin = pj(P, 2, '', { fue: 16 }), con = pj(P, 3, 'lib:mala-leche', { fue: 16 });
    assert.equal(con.skill.intimidacion, sin.skill.intimidacion + 2 + 3);
  });
  test('Círculo Cuadrado: Masa Muscular da competencia o pericia en la habilidad elegida', () => {
    const base = pj(P, 3, 'lib:circulo-cuadrado').skill.atletismo;
    assert.equal(pj(P, 3, 'lib:circulo-cuadrado', {}, { elecciones: { 'masa-muscular': 'atletismo' } }).skill.atletismo, base + 2);
    assert.equal(pj(P, 3, 'lib:circulo-cuadrado', {}, { habClase: ['Atletismo'], elecciones: { 'masa-muscular': 'atletismo' } }).skill.atletismo, base + 4);
  });
  test('Santo Callejero: Imposición de Manos es una reserva de 3 × nivel', () => {
    const r5 = recurso(pj(P, 5, 'lib:santo-callejero'), 'Imposición de Manos');
    assert.deepEqual([r5?.max, r5?.tipo], [15, 'pool']);
  });
  test('Matones Sabuesos: las dos habilidades elegidas dan competencia y suben la Percepción pasiva', () => {
    const c = pj(P, 3, 'lib:matones-sabuesos', {}, { elecciones: { detective: ['percepcion', 'perspicacia'] } });
    assert.equal(c.skillProf.percepcion, true);
    assert.equal(c.passive, 10 + c.skill.percepcion);
  });
  test('El Perro y el Sabueso: el mordisco del sabueso sale en Ataques con CON', () => {
    const m = pj('lib:pugilista', 3, 'lib:perro-sabueso', { con: 16 }).naturales.find((a: any) => /Mordisco/.test(a.nombre));
    assert.deepEqual([m?.atk, m?.expr], [5, '2d4+5']); // competencia 2 + CON 3; 2 + CON 3
  });
  test('Mano del Pavor: Trato con el Diablo deja solo la opción elegida, con su tipo de acción', () => {
    const c = pj(P, 6, 'lib:mano-pavor', {}, { elecciones: { 'trato-diablo': 'paso' } });
    assert.equal(entrada(c, 'Paso de Otro Mundo')?.t, 'adicional');
    assert.equal(entrada(c, 'Manto de Sombras'), undefined);
  });
});

describe('Arcanista (Artífice 2025)', () => {
  const A = 'lib:arcanista';
  test('trucos y conjuros cuentan como conteos, no como recursos que se gastan', () => {
    const c = pj(A, 10);
    assert.equal(c.recursos.some((x: any) => /cantrip|infundid/i.test(x.nombre)), false);
  });
  test('límite de trucos y conjuros preparados según la tabla de 2025', () => {
    for (const [nivel, t, p] of [[1, 2, 2], [9, 2, 9], [10, 3, 9], [14, 4, 11], [20, 4, 15]]) {
      const c = pj(A, nivel);
      assert.deepEqual([c.trucosMax, c.prepMax], [t, p], `nivel ${nivel}`);
    }
    const c = pj(A, 1, '', {}, { conjuros: [{ nombre: 'Reparar', nivel: 0 }, { nombre: 'Luz', nivel: 0 }, { nombre: 'Mano de mago', nivel: 0 }] });
    assert.ok(c.avisos.some((a: any) => a.t === 'Demasiados trucos'));
  });
  test('Destello de Genio y Magia de Manitas: usos igual a INT (mínimo 1)', () => {
    assert.equal(recurso(pj(A, 7), 'Destello de Genio')?.max, 3);
    assert.equal(recurso(pj(A, 7, '', { int: 8 }), 'Destello de Genio')?.max, 1);
    assert.equal(entrada(pj(A, 7), 'Destello de Genio').t, 'reaccion');
    assert.equal(recurso(pj(A, 1), 'Magia de Manitas')?.max, 3);
  });
  test('Armero: armas del modelo con INT, +1 desde nivel 9 y dados mayores en 15', () => {
    const fila = (c: any, re: RegExp) => { const a = c.naturales.find((x: any) => re.test(x.nombre)); return [a.atk, a.expr]; };
    const c3 = pj(A, 3, 'lib:armero');
    assert.deepEqual(fila(c3, /Demoledor/), [5, '1d10+3']);
    assert.deepEqual(fila(pj(A, 9, 'lib:armero'), /Pulso/), [8, '1d8+4']);
    assert.deepEqual(fila(pj(A, 15, 'lib:armero'), /Lanzador/), [9, '2d6+4']);
  });
  test('Artillero: competencia solo con armas marciales a distancia; la balista sube a 3d8 en nivel 9', () => {
    const c = pj(A, 3, 'lib:artillero', {}, { armas: [['arco_largo', 1], ['espada_larga', 1]] });
    const arma = (k: string) => c.armas.find((a: any) => a.k === k);
    assert.equal(arma('arco_largo').notas.includes('Sin competencia'), false);
    assert.equal(arma('espada_larga').notas.includes('Sin competencia'), true);
    assert.equal(c.naturales.find((a: any) => /Balista/.test(a.nombre)).expr, '2d8');
    assert.equal(pj(A, 9, 'lib:artillero').naturales.find((a: any) => /Balista/.test(a.nombre)).expr, '3d8');
  });
  test('Herrero de Batalla: competencia con armas marciales y Sacudida Arcana con usos de INT', () => {
    const c = pj(A, 9, 'lib:herrero-batalla', {}, { armas: [['espada_larga', 1]] });
    assert.equal(c.armas[0].notas.includes('Sin competencia'), false);
    assert.equal(recurso(c, 'Sacudida Arcana')?.max, 3);
    assert.equal(c.naturales.find((a: any) => /Desgarro/.test(a.nombre)).expr, '1d8+5');
  });
  test('conjuros de subclase: siempre preparados y sin contar en el límite, según el nivel', () => {
    const c = pj(A, 5, 'lib:alquimista');
    assert.equal(c.esExtra({ nombre: 'Esfera flamígera' }), true);
    assert.equal(c.esExtra({ nombre: 'Forma Gaseosa' }), false);
    assert.equal(recurso(c, 'Elixir Experimental')?.max, 3);
  });
});

describe('Elecciones dentro de una subclase', () => {
  const entradas = (c: any, re: RegExp) => c.entries.filter((e: any) => re.test(e.nombre)).map((e: any) => [e.nombre, e.t]);
  test('Alma Profana: sin patrón pide elegirlo; con patrón solo sale su Enfoque del Rito y su conjuro', () => {
    const sin = pj('lib:cazador-sangre', 7, 'lib:alma-profana');
    assert.ok(sin.elecciones.some((e: any) => e.id === 'patron-alma-profana'));
    assert.deepEqual(entradas(sin, /^Enfoque del Rito/), []);
    const cel = pj('lib:cazador-sangre', 7, 'lib:alma-profana', {}, { elecciones: { 'patron-alma-profana': 'celestial' } });
    assert.deepEqual(entradas(cel, /^Enfoque del Rito/), [['Enfoque del Rito (Celestial)', 'adicional']]);
    assert.match(entrada(cel, 'Arcano Revelado').texto, /Restablecimiento menor/);
    assert.doesNotMatch(entrada(cel, 'Arcano Revelado').texto, /Silencio/);
    const hex = pj('lib:cazador-sangre', 7, 'lib:alma-profana', {}, { elecciones: { 'patron-alma-profana': 'hexblade' } });
    assert.equal(entrada(hex, 'Arcano Revelado').t, 'adicional'); // Golpe marcador es acción adicional
  });
  test('Armero: el modelo elegido deja solo su arma y sus opciones; el Infiltrador suma 5 de velocidad', () => {
    const sin = pj('lib:arcanista', 3, 'lib:armero');
    assert.equal(sin.naturales.length, 3);
    assert.ok(entrada(sin, 'Estatura gigante (Acorazado)'));
    const inf = pj('lib:arcanista', 3, 'lib:armero', {}, { elecciones: { 'modelo-armero': 'infiltrador' } });
    assert.deepEqual(inf.naturales.map((a: any) => a.nombre), ['Lanzador de relámpagos (Infiltrador)']);
    assert.equal(entrada(inf, 'Estatura gigante (Acorazado)'), undefined);
    assert.equal(inf.speed, sin.speed + 5);
  });
  test('cada rasgo y opción sabe en qué nivel se gana', () => {
    const c = pj('lib:arcanista', 9, 'lib:herrero-batalla');
    assert.equal(entrada(c, 'Sacudida Arcana').nivel, 9);
    assert.equal(entrada(c, 'Ordenar al Defensor').nivel, 3);
  });
});

describe('Qué hay que elegir al subir de nivel', () => {
  test('subclase al llegar a su nivel, mejora en nivel 4, y el patrón cuando la subclase lo pide', () => {
    assert.ok(pendientes(pj('lib:cazador-sangre', 3)).includes('subclase'));
    assert.ok(!pendientes(pj('lib:cazador-sangre', 2)).includes('subclase'));
    assert.ok(pendientes(pj('lib:cazador-sangre', 4, 'lib:licantropo')).includes('mejora-4'));
    assert.ok(pendientes(pj('lib:cazador-sangre', 3, 'lib:alma-profana')).includes('elecciones'));
    assert.ok(!pendientes(pj('lib:cazador-sangre', 3, 'lib:alma-profana', {}, { elecciones: { 'patron-alma-profana': 'genio', maldiciones: ['marcado'], ritos: ['llama'] } })).includes('elecciones'));
  });
  test('trucos y conjuros por elegir cuando la clase tiene límite', () => {
    assert.ok(pendientes(pj('lib:arcanista', 1)).includes('conjuros'));
  });
});

describe('Equipo de los trasfondos', () => {
  test('todos los trasfondos de las reglas tienen kit, con opción de 50 po', () => {
    for (const [k, t] of Object.entries<any>(TRASFONDOS).filter(([, t]) => !t.custom)) {
      const kit = kitTrasfondo(k, t);
      assert.ok(kit, `${k} sin kit`);
      assert.equal(kit!.alternativa, 50, k);
    }
  });
  test('las armas de los kits existen en la tabla de armas', () => {
    for (const [k, v] of Object.entries(EQUIPO_TRASFONDOS)) for (const [a] of v.armas || []) assert.ok(ARMAS[a], `${k}: ${a}`);
  });
  test('la hoja avisa hasta que se toma el equipo del trasfondo', () => {
    const aviso = (c: any) => c.avisos.some((a: any) => a.t === 'Equipo del trasfondo');
    assert.equal(aviso(pj('lib:pugilista', 1, '', {}, { trasfondo: { key: 'criminal', modo: '21', a: 'des', b: 'con' } })), true);
    assert.equal(aviso(pj('lib:pugilista', 1, '', {}, { trasfondo: { key: 'criminal', modo: '21', a: 'des', b: 'con', equipo: 'A' } })), false);
  });
});

describe('Subida a nivel de subclase', () => {
  test('la subclase se ofrece aunque ya estuviera marcada desde el editor', () => {
    const c = pj('lib:cazador-sangre', 3, 'lib:alma-profana', {}, { elecciones: { 'patron-alma-profana': 'genio' } });
    assert.ok(!pendientes(c).includes('subclase'));
    assert.equal(pendientesAlSubir(c, true)[0], 'subclase');
    assert.ok(!pendientesAlSubir(pj('lib:cazador-sangre', 4, 'lib:alma-profana'), true).includes('subclase'));
  });
});

describe('Equipo de las clases', () => {
  test('todas las clases de las reglas y las de la biblioteca tienen kit', () => {
    for (const k of [...Object.keys(CLASES), 'lib:arcanista', 'lib:cazador-sangre', 'lib:pugilista']) assert.ok(kitClase(k), k);
  });
  test('armas y armaduras de los kits existen', () => {
    for (const [k, kit] of Object.entries(EQUIPO_CLASES)) for (const v of kit.variantes) {
      for (const [a] of v.armas || []) assert.ok(ARMAS[a], `${k}: ${a}`);
      if (v.armadura) assert.ok(ARMADURAS[v.armadura], `${k}: ${v.armadura}`);
    }
  });
});

describe('Elecciones de varias opciones', () => {
  test('maldiciones: el máximo sube con el nivel y solo salen las que conoces', () => {
    const el = (c: any) => c.elecciones.find((e: any) => e.id === 'maldiciones');
    assert.deepEqual([el(pj('lib:cazador-sangre', 1)).max, el(pj('lib:cazador-sangre', 6)).max, el(pj('lib:cazador-sangre', 18)).max], [1, 2, 5]);
    const todas = pj('lib:cazador-sangre', 6).entries.filter((e: any) => e.src === 'Maldición de Sangre').length;
    const c = pj('lib:cazador-sangre', 6, '', {}, { elecciones: { maldiciones: ['marcado', 'sin-ojos'] } });
    assert.equal(todas, 8);
    assert.deepEqual(c.entries.filter((e: any) => e.src === 'Maldición de Sangre').map((e: any) => e.nombre).sort(), ['Maldición de los Sin Ojos', 'Maldición del Marcado']);
    assert.ok(!c.avisos.some((a: any) => /maldiciones/.test(a.t)));
    assert.ok(pj('lib:cazador-sangre', 6, '', {}, { elecciones: { maldiciones: ['marcado'] } }).avisos.some((a: any) => /maldiciones/.test(a.t)));
  });
  test('ritos: los esotéricos solo se ofrecen desde nivel 14', () => {
    const ops = (n: number) => pj('lib:cazador-sangre', n).elecciones.find((e: any) => e.id === 'ritos').opciones.map((o: any) => o.key);
    assert.deepEqual(ops(2), ['llama', 'escarcha', 'tormenta']);
    assert.equal(ops(14).length, 6);
  });
  test('Mutante: fórmulas con requisito de nivel; cada fórmula elegida sale como acción adicional', () => {
    const el = (c: any) => c.elecciones.find((e: any) => e.id === 'formulas-mutante');
    const c3 = pj('lib:cazador-sangre', 3, 'lib:mutante');
    assert.equal(el(c3).max, 4);
    assert.ok(!el(c3).opciones.some((o: any) => o.key === 'eter'));
    assert.ok(el(pj('lib:cazador-sangre', 11, 'lib:mutante')).opciones.some((o: any) => o.key === 'eter'));
    const c = pj('lib:cazador-sangre', 11, 'lib:mutante', {}, { elecciones: { 'formulas-mutante': ['potencia', 'rapidez'] } });
    // De la última elegida a la primera: se eligió Potencia y después Rapidez
    assert.deepEqual(c.entries.filter((e: any) => /^Mutágeno:/.test(e.nombre)).map((e: any) => [e.nombre, e.t]), [['Mutágeno: Rapidez', 'adicional'], ['Mutágeno: Potencia', 'adicional']]);
    assert.match(entrada(c, 'Mutágeno: Potencia').texto, /suben 4/);
    assert.equal(entrada(c, 'Tomar un mutágeno'), undefined);
  });
});

test('la subclase elegida no cambia el orden de la lista', () => {
  const orden = (p: any) => getSubs(p, 'lib:cazador-sangre').map((s: any) => s.key);
  const antes = orden({});
  const conCopia = { contenido: { subclases: { 'lib:mutante': { n: 'Orden del Mutante', clase: 'lib:cazador-sangre', rasgos: [] } } } };
  assert.deepEqual(orden(conCopia), antes);
  assert.notEqual(antes[0], 'lib:mutante');
});

describe('Especies (Lote 4)', () => {
  const NOMBRES: Record<string, string> = { tabaxi: 'Tabaxi', forjado: 'Forjado (Warforged)', harengon: 'Harengon', dhampiro: 'Dhampiro', tortle: 'Tortle', 'hombre-lagarto': 'Hombre Lagarto', 'hibrido-simic': 'Híbrido Simic', kenku: 'Kenku' };
  const conEspecies = () => setLib({ clases: { 'lib:cazador-sangre': cazador }, especies: Object.fromEntries(Object.entries(NOMBRES).map(([k, n]) => [`lib:${k}`, { n, lib: true, ...ESPECIES_2025[k] }])) });
  const esp = (k: string, nivel = 1, stats: Record<string, number> = {}, extra: Record<string, any> = {}) => {
    conEspecies();
    return pj('lib:cazador-sangre', nivel, '', { des: 14, con: 14, ...stats }, { especie: { key: `lib:${k}`, sub: '', nombre: '', vel: 30, vision: 0 }, ...extra });
  };
  test('Tabaxi: Percepción y Sigilo con competencia, y garras en Ataques', () => {
    const c = esp('tabaxi');
    assert.deepEqual([c.skillProf.percepcion, c.skillProf.sigilo], [true, true]);
    assert.equal(c.naturales.find((a: any) => /Garras/.test(a.nombre))?.expr, '1d6+2');
  });
  test('Forjado +1 a la CA y Harengon suma competencia a la iniciativa', () => {
    const base = esp('kenku', 1, { des: 10, con: 10 });
    assert.equal(esp('forjado', 1, { des: 10, con: 10 }).ac, base.ac + 1);
    assert.equal(esp('harengon', 1).init, esp('kenku', 1).init + 2);
  });
  test('Dhampiro: el mordisco usa CON', () => {
    assert.equal(esp('dhampiro', 1, { con: 16 }).naturales.find((a: any) => /Mordisco/.test(a.nombre))?.expr, '1d4+3');
  });
  test('Tortle CA 17 y Hombre Lagarto 13 + DES sin armadura', () => {
    assert.equal(esp('tortle', 1, { des: 10, con: 10 }).ac, 17);
    assert.equal(esp('hombre-lagarto', 1, { des: 16, con: 10 }).ac, 16);
  });
  test('Híbrido Simic: mejora de nivel 5 con selector; Caparazón da +1 a la CA', () => {
    assert.ok(!esp('hibrido-simic', 4).elecciones.some((e: any) => e.id === 'simic-5'));
    const sin = esp('hibrido-simic', 5, { des: 10, con: 10 });
    const con = esp('hibrido-simic', 5, { des: 10, con: 10 }, { elecciones: { 'simic-5': 'caparazon' } });
    assert.equal(con.ac, sin.ac + 1);
    assert.ok(sin.avisos.some((a: any) => /mejora animal/.test(a.t) && a.paso === 'especie'));
  });
  test('Kenku: sus dos habilidades a elegir cuentan como extra', () => {
    const c = esp('kenku', 1, {}, { habExtra: ['Engaño', 'Sigilo'] });
    assert.ok(!c.avisos.some((a: any) => a.t === 'Habilidades de más'));
  });
});

describe('Bárbaro 2024 (Lote 5)', () => {
  const bar = (nivel: number, sub = '', extra: Record<string, any> = {}) => { setLib({ clases: { barbaro: BARBARO_2024 } }); return pj('barbaro', nivel, sub, {}, extra); };
  test('Golpe Brutal: dos efectos en 9, cuatro desde 13 y 2d10 en 17', () => {
    const efectos = (c: any) => c.entries.filter((e: any) => e.src === 'Golpe Brutal').length;
    assert.deepEqual([efectos(bar(9)), efectos(bar(13))], [2, 4]);
    assert.match(entrada(bar(17), 'Golpe Brutal').texto, /2d10/);
    assert.ok(entrada(bar(13), 'Golpe Brutal Mejorado'));
  });
  test('Berserker: Frenesí usa el daño de Furia en d6 y Presencia Intimidante es de nivel 14', () => {
    assert.match(entrada(bar(9, 'lib:senda-berserker'), 'Frenesí').texto, /3d6/);
    assert.equal(entrada(bar(10, 'lib:senda-berserker'), 'Presencia Intimidante'), undefined);
    assert.equal(entrada(bar(14, 'lib:senda-berserker'), 'Presencia Intimidante')?.t, 'adicional');
  });
  test('Corazón Salvaje: Búho suma 60 pies de visión en la oscuridad', () => {
    const sin = bar(6, 'lib:senda-corazon-salvaje'), con = bar(6, 'lib:senda-corazon-salvaje', { elecciones: { 'aspecto-salvaje': 'buho' } });
    assert.equal(con.vision, sin.vision + 60);
  });
  test('Fanático: la reserva de Guerrero de los Dioses es 4, 5, 6 y 7 d12', () => {
    assert.deepEqual([3, 6, 12, 17].map(n => recurso(bar(n, 'lib:senda-fanatico'), 'Guerrero de los Dioses')?.max), [4, 5, 6, 7]);
  });
});

describe('Bardo 2024 (Lote 6)', () => {
  const bardo = (nivel: number, sub = '', stats: Record<string, number> = {}, extra: Record<string, any> = {}) => { setLib({ clases: { bardo: BARDO_2024 } }); return pj('bardo', nivel, sub, stats, extra); };
  test('Danza: CA 10 + DES + CAR sin armadura y golpe sin armas con el dado de Inspiración y DES', () => {
    const c = bardo(5, 'lib:colegio-danza', { des: 16, car: 16 });
    assert.equal(c.ac, 16);
    assert.equal(c.naturales.find((a: any) => /Danza/.test(a.nombre))?.expr, '1d8+3');
  });
  test('Valor: competencia con armas marciales', () => {
    const c = bardo(3, 'lib:colegio-valor', {}, { armas: [['espada_larga', 1]] });
    assert.equal(c.armas[0].notas.includes('Sin competencia'), false);
  });
  test('Conocimiento: sus tres habilidades a elegir cuentan como extra', () => {
    assert.ok(!bardo(3, 'lib:colegio-conocimiento', {}, { habExtra: ['Engaño', 'Sigilo', 'Historia'] }).avisos.some((a: any) => a.t === 'Habilidades de más'));
    assert.ok(bardo(3, '', {}, { habExtra: ['Engaño', 'Sigilo', 'Historia'] }).avisos.some((a: any) => a.t === 'Habilidades de más'));
  });
  test('Secretos Mágicos abre las listas de clérigo, druida y mago en nivel 10', () => {
    assert.equal(bardo(9).listasExtra, undefined);
    assert.deepEqual(bardo(10).listasExtra, ['clerigo', 'druida', 'mago']);
  });
  test('Glamour: Hechizar persona siempre preparado, y Orden imperiosa desde nivel 6', () => {
    assert.equal(bardo(3, 'lib:colegio-glamour').esExtra({ nombre: 'Hechizar persona' }), true);
    assert.equal(bardo(3, 'lib:colegio-glamour').esExtra({ nombre: 'Orden imperiosa' }), false);
    assert.equal(bardo(6, 'lib:colegio-glamour').esExtra({ nombre: 'Orden imperiosa' }), true);
  });
});

describe('Clérigo 2024 (Lote 8)', () => {
  const cler = (nivel: number, sub = '', stats: Record<string, number> = {}, extra: Record<string, any> = {}) => { setLib({ clases: { clerigo: CLERIGO_2024 } }); return pj('clerigo', nivel, sub, stats, extra); };
  test('Vida: conjuros del dominio siempre preparados según el nivel', () => {
    assert.equal(cler(3, 'lib:dominio-vida').esExtra({ nombre: 'Ayuda' }), true);
    assert.equal(cler(3, 'lib:dominio-vida').esExtra({ nombre: 'Revivir' }), false);
    assert.equal(cler(5, 'lib:dominio-vida').esExtra({ nombre: 'Revivir' }), true);
  });
  test('Luz: Destello Protector usa SAB y se recupera con descanso corto desde el nivel 6', () => {
    const a = recurso(cler(3, 'lib:dominio-luz', { sab: 16 }), 'Destello Protector'), b = recurso(cler(6, 'lib:dominio-luz', { sab: 16 }), 'Destello Protector');
    assert.equal(a.max, 3); assert.equal(a.reset, 'largo'); assert.equal(b.reset, 'corto');
  });
  test('Conocimiento: las dos habilidades elegidas ganan competencia y pericia', () => {
    const c = cler(3, 'lib:dominio-conocimiento', { int: 10 }, { elecciones: { 'saber-habs': ['arcanos', 'historia'] } });
    assert.equal(c.skill.arcanos, 2 * c.pb);
    assert.equal(c.skillPer.historia, true);
  });
  test('Forja: +1 a la CA con armadura pesada desde el nivel 6', () => {
    assert.equal(cler(6, 'lib:dominio-forja', {}, { armadura: 'mallas' }).ac - cler(5, 'lib:dominio-forja', {}, { armadura: 'mallas' }).ac, 1);
  });
  test('Golpes Benditos: el texto sigue a la opción elegida', () => {
    const c = cler(14, '', { sab: 16 }, { elecciones: { 'golpes-benditos': 'golpe-divino' } });
    assert.match(entrada(c, 'Golpes Benditos').texto, /2d8/);
  });
});

describe('Brujo 2024 (Lote 7)', () => {
  const conjuros = { 'circulo-muerte': { nombre: 'Círculo de muerte', nivel: 6, tiempo: 'accion', clases: ['brujo', 'mago'], desc: 'Una esfera de energía negativa. Más texto.' } };
  const bru = (nivel: number, sub = '', stats: Record<string, number> = {}, extra: Record<string, any> = {}) => { setLib({ clases: { brujo: BRUJO_2024 }, conjuros }); return pj('brujo', nivel, sub, { car: 16, ...stats }, extra); };
  const inv = (...k: string[]) => ({ elecciones: { invocaciones: k } });
  test('Invocaciones: cantidad según nivel y opciones con nivel y requisito', () => {
    const el = (c: any) => c.elecciones.find((e: any) => e.id === 'invocaciones');
    assert.equal(el(bru(1)).max, 1);
    assert.equal(el(bru(5)).max, 5);
    assert.ok(!el(bru(1)).opciones.some((o: any) => o.key === 'vision-diablo'));
    assert.ok(!el(bru(5)).opciones.some((o: any) => o.key === 'filo-sediento'));
    assert.ok(el(bru(5, '', {}, inv('pacto-filo'))).opciones.some((o: any) => o.key === 'filo-sediento'));
  });
  test('Armadura de Sombras y Visión del Diablo en el cálculo', () => {
    const c = bru(2, '', { des: 14 }, inv('armadura-sombras', 'vision-diablo'));
    assert.equal(c.ac, 15);
    assert.equal(c.vision, 120);
    assert.ok(entrada(c, 'Armadura de Sombras'));
  });
  test('Pacto del Filo: armas cuerpo a cuerpo con CAR y competencia', () => {
    const c = bru(1, '', { fue: 10 }, { armas: [['espada_larga', 1]], ...inv('pacto-filo') });
    assert.equal(c.armas[0].atk, c.pb + 3);
    assert.equal(c.armas[0].notas.includes('Sin competencia'), false);
  });
  test('Pacto de la Cadena como invocación activa el familiar', () => {
    assert.ok(bru(1, '', {}, inv('pacto-cadena')).chain);
  });
  test('Arcano Místico: selector desde el nivel 11 y uso por descanso largo', () => {
    assert.ok(!bru(10).elecciones.some((e: any) => e.id === 'arcano-6'));
    assert.equal(bru(11).elecciones.find((e: any) => e.id === 'arcano-6').opciones[0].nombre, 'Círculo de muerte');
    const c = bru(11, '', {}, { elecciones: { 'arcano-6': 'circulo de muerte' } });
    assert.equal(recurso(c, 'Círculo de muerte')?.max, 1);
    assert.ok(c.conjuros.some((s: any) => s.nombre === 'Círculo de muerte' && s.rasgo === 'Arcano Místico'));
  });
  test('Gran Antiguo: conjuros del patrón hasta nivel 9', () => {
    assert.equal(bru(9, 'primigenio').esExtra({ nombre: 'Telequinesis' }), true);
    assert.equal(bru(7, 'primigenio').esExtra({ nombre: 'Telequinesis' }), false);
  });
  test('No Muerto: usos de Forma del Terror según CAR', () => {
    assert.equal(recurso(bru(3, 'lib:no-muerto'), 'Forma del Terror')?.max, 3);
  });
  test('Vestigio: el dominio elegido da sus conjuros siempre preparados', () => {
    assert.equal(bru(3, 'lib:vestigio', {}, { elecciones: { 'vestigio-dominio': 'guerra' } }).esExtra({ nombre: 'Arma espiritual' }), true);
  });
  test('Filo Maldito: arma con CAR y armas marciales', () => {
    const c = bru(3, 'lib:filo-maldito', { fue: 10 }, { armas: [['espada_larga', 1]] });
    assert.equal(c.armas[0].atk, c.pb + 3);
    assert.equal(c.armas[0].notas.includes('Sin competencia'), false);
  });
});

describe('Conjuros que dan los rasgos', () => {
  const nombres = (c: any) => c.conjuros.map((s: any) => s.nombre);
  test('especie: el legado del tiefling da sus conjuros según el nivel, con usos y la característica más alta', () => {
    setLib({});
    const t1 = pj('guerrero', 1, '', {}, { especie: { key: 'tiefling', sub: 'abisal' } });
    assert.deepEqual(nombres(t1), ['Rociada venenosa', 'Taumaturgia']);
    const t5 = pj('guerrero', 5, '', {}, { especie: { key: 'tiefling', sub: 'abisal' } });
    assert.ok(nombres(t5).includes('Rayo nauseabundo') && nombres(t5).includes('Inmovilizar persona'));
    assert.equal(recurso(t5, 'Rayo nauseabundo')?.max, 1);
    assert.equal(t5.conjuros.find((s: any) => s.nombre === 'Rociada venenosa').cd, 8 + t5.pb + 3); // INT 16
  });
  test('dote: Marca de Escritura da Mensaje, Comprender idiomas y desde el nivel 3 Boca mágica', () => {
    setLib({ dotes: { 'lib:marca-escritura': { n: 'Marca de Escritura', t: 'pasiva', texto: 'Conoces Mensaje.', cat: 'Marca de Dragón' } } });
    const c = pj('mago', 1, '', {}, { dotesExtra: [{ key: 'lib:marca-escritura' }] });
    assert.deepEqual(nombres(c), ['Mensaje', 'Comprender idiomas']);
    assert.ok(nombres(pj('mago', 3, '', {}, { dotesExtra: [{ key: 'lib:marca-escritura' }] })).includes('Boca mágica'));
    assert.equal(c.esExtra({ nombre: 'Mensaje' }), true);
  });
  test('subclase e invocación: salen en la hoja sin contar en el límite, y no se repiten si también se eligieron', () => {
    setLib({});
    const c = pj('brujo', 3, 'infernal', {}, { elecciones: { invocaciones: ['armadura-sombras'] }, conjuros: [{ nombre: 'Manos ardientes', nivel: 1 }] });
    assert.ok(nombres(c).includes('Armadura de mago'));
    assert.equal(c.conjuros.filter((s: any) => s.nombre === 'Manos ardientes').length, 1);
    assert.equal(c.conjuros.find((s: any) => s.nombre === 'Manos ardientes').rasgo, 'Patrón Infernal');
    assert.equal(c.prepUsados, 0);
  });
});

describe('Druida 2024 (Lote 9)', () => {
  const dru = (nivel: number, sub = '', stats: Record<string, number> = {}, extra: Record<string, any> = {}) => { setLib({ clases: { druida: DRUIDA_2024 } }); return pj('druida', nivel, sub, stats, extra); };
  test('Tierra: los conjuros siempre preparados dependen del tipo de tierra elegido', () => {
    const c = dru(5, 'lib:circulo-tierra', {}, { elecciones: { 'tipo-tierra': 'polar' } });
    assert.equal(c.esExtra({ nombre: 'Inmovilizar persona' }), true);
    assert.equal(c.esExtra({ nombre: 'Tormenta de aguanieve' }), true);
    assert.equal(c.esExtra({ nombre: 'Tormenta de hielo' }), false);
    assert.equal(c.esExtra({ nombre: 'Bola de fuego' }), false);
    assert.match(entrada(dru(10, 'lib:circulo-tierra', {}, { elecciones: { 'tipo-tierra': 'polar' } }), 'Protección de la Naturaleza').texto, /al frío/);
  });
  test('Luna: Formas del Círculo con CA 13 + SAB y PG temporales 3 × nivel; Paso de Luz Lunar usa SAB', () => {
    const c = dru(6, 'lib:circulo-luna', { sab: 16 });
    assert.match(entrada(c, 'Formas del Círculo').texto, /VD 2 .*CA es 16.*18 PG temporales/);
    assert.equal(dru(10, 'lib:circulo-luna', { sab: 16 }).recursos.find((x: any) => x.nombre === 'Paso de Luz Lunar').max, 3);
  });
  test('Estrellas: Mapa Estelar da Guía y Rayo guía; el Arquero hace 1d8 + SAB y 2d8 desde nivel 10', () => {
    const c = dru(3, 'lib:circulo-estrellas', { sab: 16 });
    assert.equal(c.esExtra({ nombre: 'Rayo guía' }), true);
    assert.equal(c.naturales.find((a: any) => /Arquero/.test(a.nombre)).dmg, '1d8 + 3 radiante');
    assert.equal(dru(10, 'lib:circulo-estrellas', { sab: 16 }).naturales.find((a: any) => /Arquero/.test(a.nombre)).dmg, '2d8 + 3 radiante');
  });
  test('Esporas: el Halo sube con el nivel y Entidad Simbiótica da 4 PG temporales por nivel', () => {
    assert.match(entrada(dru(6, 'lib:circulo-esporas'), 'Halo de Esporas').texto, /1d6 de daño/);
    assert.match(entrada(dru(10, 'lib:circulo-esporas'), 'Entidad Simbiótica').texto, /40 PG temporales.*2d8/);
  });
});

describe('Conjuros de rasgos: lanzarlos con espacios', () => {
  const nota = (c: any, n: string) => c.conjuros.find((s: any) => s.nombre === n)?.nota || '';
  test('solo se ofrece si el personaje tiene espacios de ese nivel', () => {
    setLib({ dotes: { 'lib:marca-escritura': { n: 'Marca de Escritura', t: 'pasiva', texto: '', cat: 'Marca de Dragón' } } });
    assert.match(nota(pj('mago', 1, '', {}, { dotesExtra: [{ key: 'lib:marca-escritura' }] }), 'Comprender idiomas'), /con tus espacios/);
    assert.doesNotMatch(nota(pj('guerrero', 1, '', {}, { dotesExtra: [{ key: 'lib:marca-escritura' }] }), 'Comprender idiomas'), /espacios/);
    setLib({ clases: { brujo: BRUJO_2024 }, conjuros: { x: { nombre: 'Círculo de muerte', nivel: 6, clases: ['brujo'], desc: '' } } });
    assert.doesNotMatch(nota(pj('brujo', 11, '', {}, { elecciones: { 'arcano-6': 'circulo de muerte' } }), 'Círculo de muerte'), /con tus espacios/);
  });
});
