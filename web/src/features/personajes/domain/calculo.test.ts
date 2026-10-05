/* eslint-disable @typescript-eslint/no-explicit-any */
import { pagar, armadurasDe, juntar } from './inventario';
import { armaMagica, armaduraMagica } from './magicos';
import { OBJETOS_MAGICOS } from '@/features/reglas/data/objetos-magicos';
import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { setLib, getSubs, clasesParaElegir } from '@/features/biblioteca/domain/biblioteca';
import { compute } from './calculo';
import { resolver } from '@/features/dados/domain/dados';
import { ataquesPorAccion, bonosPara, dadosAlLanzar, espaciosPara, extrasAtaque, golpesDeRasgo } from './lanzar';
import { sinDuplicado } from '@/features/biblioteca/domain/mapeo';
import { nuevoPj } from './modelo';
import { pendientes, pendientesAlSubir } from './pendientes';
import { usosDeRecurso } from './usos-recurso';
import { ARMADURAS } from '@/features/reglas/data/equipo';
import { CLASES } from '@/features/reglas/data/clases';
import { EQUIPO_CLASES, kitClase } from '@/features/reglas/data/equipo-clases';
import { ESPECIES_2025 } from '../../../../scripts/datos/especies-2025';
import { BARBARO_2024 } from '../../../../scripts/datos/barbaro-2024';
import { BARDO_2024 } from '../../../../scripts/datos/bardo-2024';
import { CLERIGO_2024 } from '../../../../scripts/datos/clerigo-2024';
import { BRUJO_2024 } from '../../../../scripts/datos/brujo-2024';
import { DRUIDA_2024 } from '../../../../scripts/datos/druida-2024';
import { EXPLORADOR_2024 } from '../../../../scripts/datos/explorador-2024';
import { GUERRERO_2024 } from '../../../../scripts/datos/guerrero-2024';
import { HECHICERO_2024 } from '../../../../scripts/datos/hechicero-2024';
import { MAGO_2024 } from '../../../../scripts/datos/mago-2024';
import { MONJE_2024 } from '../../../../scripts/datos/monje-2024';
import { PALADIN_2024 } from '../../../../scripts/datos/paladin-2024';
import { PICARO_2024 } from '../../../../scripts/datos/picaro-2024';
import { PLAYTEST_2025 } from '../../../../scripts/datos/playtest-2025';
import { ARTIFICE_2026 } from '../../../../scripts/datos/artifice-2026';
import { PSION_2025 } from '../../../../scripts/datos/psion-2025';
import { PLAYTEST_2026 } from '../../../../scripts/datos/playtest-2026';
import { fuenteSubclase } from '@/features/reglas/data/fuentes';
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
  n: 'Artífice', lib: true, dado: 8, sv: ['con', 'int'], habN: 2, habs: 'todas', w: { simple: 1, martial: 0, light: 0, finesseLight: 0 },
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
  test('El Perro y el Sabueso: el sabueso tiene su hoja con PG y Mordisco con CON', () => {
    const c = pj('lib:pugilista', 3, 'lib:perro-sabueso', { con: 16 }, { used: { 'cmp-sabueso': 4 } });
    const s = c.criaturas.find((x: any) => x.id === 'cmp-sabueso'), m = s?.acciones.find((a: any) => a.n === 'Mordisco');
    assert.deepEqual([m?.atk, m?.expr], [5, '2d4+5']); // competencia 2 + CON 3; 2 + CON 3
    assert.deepEqual([s.pgMax, s.pg, s.ca], [20, 16, 15]);
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
    assert.equal(c.criaturas.find((x: any) => x.id === 'cmp-defensor').acciones[0].expr, '1d8+5');
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

describe('Explorador 2024 (Lote 10)', () => {
  const exp = (nivel: number, sub = '', stats: Record<string, number> = {}) => { setLib({ clases: { explorador: EXPLORADOR_2024 } }); return pj('explorador', nivel, sub, stats); };
  test('Incansable y Velo de la Naturaleza tienen SAB usos por descanso largo', () => {
    const c = exp(14, '', { sab: 16 });
    assert.equal(c.recursos.find((x: any) => x.nombre === 'Incansable').max, 3);
    assert.equal(c.recursos.find((x: any) => x.nombre === 'Velo de la Naturaleza').max, 3);
    assert.match(entrada(c, 'Incansable').texto, /1d8 \+ 3 PG temporales/);
  });
  test('Cazador de Enemigos: la Marca del cazador pasa de 1d6 a 1d10 en nivel 20', () => {
    assert.match(entrada(exp(19), 'Marca del Cazador').texto, /\+1d6 de fuerza/);
    assert.match(entrada(exp(20), 'Marca del Cazador').texto, /\+1d10 de fuerza/);
  });
  test('Marca del Cazador gasta los usos de Enemigo Predilecto, y solo ella', () => {
    const c = exp(20);
    assert.equal(c.recursos.find((x: any) => x.id === 'enemigo').nombre, 'Enemigo Predilecto');
    assert.equal(entrada(c, 'Marca del Cazador').recurso, 'enemigo');
    assert.notEqual(entrada(c, 'Cazador de Enemigos').recurso, 'enemigo');
    assert.notEqual(entrada(c, 'Cazador Preciso').recurso, 'enemigo');
  });
  test('Acechador de las Sombras: Golpe Temible 2d6 (2d8 desde 11), usos de SAB y 60 pies de visión en la oscuridad', () => {
    const c = exp(3, 'lib:sombras', { sab: 14 });
    assert.match(entrada(c, 'Emboscador Temible').texto, /2d6 de daño psíquico/);
    assert.equal(c.recursos.find((x: any) => x.nombre === 'Emboscador Temible').max, 2);
    assert.equal(c.vision, 60);
    assert.match(entrada(exp(11, 'lib:sombras'), 'Emboscador Temible').texto, /2d8/);
  });
  test('Caminante del Invierno y de las Hadas: daño extra 1d4, 1d6 desde nivel 11', () => {
    assert.match(entrada(exp(3, 'lib:caminante-invierno'), 'Explorador Gélido').texto, /1d4 de daño de frío/);
    assert.match(entrada(exp(11, 'lib:caminante-invierno'), 'Explorador Gélido').texto, /1d6 de daño de frío/);
    assert.match(entrada(exp(3, 'lib:caminante-invierno'), 'Escarcha del Cazador').texto, /1d10 \+ 3 PG temporales/);
    assert.match(entrada(exp(11, 'lib:hadas'), 'Golpes Pavorosos').texto, /1d6 de daño psíquico/);
  });
});

describe('Guerrero 2024 (Lote 11)', () => {
  const gue = (nivel: number, sub = '', stats: Record<string, number> = {}, extra: Record<string, any> = {}) => { setLib({ clases: { guerrero: GUERRERO_2024 } }); return pj('guerrero', nivel, sub, stats, extra); };
  const usos = (c: any, nombre: string) => c.recursos.find((x: any) => x.nombre === nombre)?.max;
  test('Indomable: 1 uso, 2 desde nivel 13 y 3 desde 17, sumando el nivel', () => {
    assert.equal(usos(gue(9), 'Indomable'), 1);
    assert.equal(usos(gue(13), 'Indomable'), 2);
    assert.equal(usos(gue(17), 'Indomable'), 3);
    assert.match(entrada(gue(17), 'Indomable').texto, /\+17/);
  });
  test('Caballero Arcano: espacios de un tercio, INT y lista de mago', () => {
    const c = gue(13, 'lib:caballero-arcano', { int: 16 });
    assert.deepEqual(c.slots.map((s: any) => s.n), [4, 3, 2]);
    assert.equal(c.casterAb, 'int');
    assert.equal(c.prepMax, 9);
    assert.equal(c.trucosMax, 3);
    assert.equal(gue(3, 'lib:caballero-arcano').slots[0].n, 2);
  });
  test('Disparos Arcanos: se ofrecen al acertar con un arco, gastando un uso', () => {
    const c = gue(7, 'lib:arquero-arcano', { des: 16, int: 14 }, { elecciones: { 'disparo-arcano': ['sombra', 'perforante'] }, armas: [['arco_largo', 1]] });
    const arco = c.armas.find((x: any) => x.w?.n === 'Arco largo');
    const ex = extrasAtaque(c, arco);
    assert.ok(ex.some((x: any) => x.nombre === 'Disparo de Sombra' && x.gasta && /1d(6|8)/.test(x.expr)));
    assert.ok(!ex.some((x: any) => x.nombre === 'Disparo Perforante' || x.nombre === 'Disparo Arcano'));
    // Perforante sale en Ataques: salvación de DES contra la CD, daño del arco + 2d6, y gasta un uso
    const perf = c.naturales.find((x: any) => x.nombre === 'Disparo Perforante (Arco largo)');
    assert.equal(perf.cd, 8 + c.pb + c.m.int);
    assert.equal(perf.salv, 'DES');
    assert.match(perf.expr, /^1d8\+3\+2d6$/);
    assert.ok(perf.gasta);
  });
  test('Desglose de bonos: arma a distancia con Arquería, y sin armas', () => {
    const c = gue(5, '', { des: 16, fue: 10 }, { estilo: 'arqueria', armas: [['arco_largo', 1]] });
    const arco = c.armas.find((x: any) => x.w?.n === 'Arco largo');
    assert.equal(arco.atkDesg, '3 DES + 3 competencia + 2 Arquería');
    assert.equal(arco.dmgDesg, '3 DES');
    assert.equal(c.unarmed.atkDesg, '3 competencia');
  });
  test('Maestro de Batalla: dados 4/5/6, d8 a d12, y las maniobras elegidas salen con su tipo', () => {
    const c = gue(7, 'lib:maestro-batalla', { fue: 16 }, { elecciones: { maniobra: ['parada', 'finta'] } });
    assert.equal(usos(c, 'Superioridad en Combate'), 5);
    assert.equal(usos(gue(15, 'lib:maestro-batalla'), 'Superioridad en Combate'), 6);
    assert.match(entrada(c, 'Superioridad en Combate').texto, /d8.*maniobras es 14/);
    assert.match(entrada(gue(18, 'lib:maestro-batalla'), 'Superioridad en Combate').texto, /d12/);
    assert.equal(entrada(c, 'Parada').t, 'reaccion');
    assert.equal(entrada(c, 'Ataque de Finta').t, 'adicional');
    assert.equal(c.entries.some((e: any) => e.nombre === 'Emboscada'), false);
  });
  test('Guerrero Psiónico: dados según nivel y daño con INT', () => {
    const c = gue(11, 'lib:guerrero-psionico', { int: 14 });
    assert.equal(usos(c, 'Poder Psiónico'), 8);
    assert.match(entrada(c, 'Golpe Psiónico').texto, /1d10 \+ 2 de daño de fuerza/);
    assert.equal(usos(gue(3, 'lib:guerrero-psionico'), 'Poder Psiónico'), 4);
  });
  test('Abanderado y Arquero Arcano: curación de grupo y dado de Disparo Arcano', () => {
    assert.match(entrada(gue(5, 'lib:caballero-dragon-purpura', { car: 14 }), 'Recuperación Grupal').texto, /2 aliado\(s\) a 30 pies recuperan 1d4 \+ 5/);
    assert.match(entrada(gue(15, 'lib:arquero-arcano'), 'Disparo Arcano').texto, /1d10/);
  });
  test('Arquero Arcano: disparos conocidos 2 a 6 y solo salen los elegidos, con su CD', () => {
    const c = gue(7, 'lib:arquero-arcano', { int: 16 }, { elecciones: { 'disparo-arcano': ['sombra', 'explosivo'] } });
    assert.equal(c.elecciones.find((e: any) => e.id === 'disparo-arcano').max, 3);
    assert.equal(gue(18, 'lib:arquero-arcano').elecciones.find((e: any) => e.id === 'disparo-arcano').max, 6);
    assert.match(entrada(c, 'Disparo de Sombra').texto, /1d6 .*CD 14/);
    assert.equal(c.entries.some((e: any) => e.nombre === 'Disparo Buscador'), false);
  });
  test('Campeón: el estilo adicional del nivel 7 suma su efecto', () => {
    const sin = gue(7, 'lib:campeon', { des: 10 }, { estilo: 'duelo', armadura: 'cuero' });
    const con = gue(7, 'lib:campeon', { des: 10 }, { estilo: 'duelo', armadura: 'cuero', elecciones: { 'estilo-campeon': 'defensa' } });
    assert.equal(con.ac, sin.ac + 1);
    assert.equal(con.elecciones.find((e: any) => e.id === 'estilo-campeon').opciones.some((o: any) => o.key === 'duelo'), false);
    assert.equal(gue(6, 'lib:campeon', { des: 10 }, { estilo: 'duelo', armadura: 'cuero', elecciones: { 'estilo-campeon': 'defensa' } }).ac, sin.ac);
  });
  test('Samurái y Caballero Rúnico: usos, PG temporales, runas por nivel y dado de gigante', () => {
    assert.equal(usos(gue(3, 'lib:samurai'), 'Espíritu de Lucha'), 3);
    assert.match(entrada(gue(10, 'lib:samurai'), 'Espíritu de Lucha').texto, /10 PG temporales/);
    const r = gue(3, 'lib:caballero-runico', { con: 14 }, { elecciones: { runas: ['fuego'] } });
    assert.equal(usos(r, 'Poder de Gigante'), 2);
    assert.match(entrada(r, 'Poder de Gigante').texto, /1d6/);
    assert.match(entrada(r, 'Runa de Fuego').texto, /CD 12/);
    assert.equal(usos(r, 'Runa de Fuego'), 1);
    assert.equal(r.elecciones.find((e: any) => e.id === 'runas').opciones.some((o: any) => o.key === 'tormenta'), false);
    const r15 = gue(15, 'lib:caballero-runico', {}, { elecciones: { runas: ['nube'] } });
    assert.equal(usos(r15, 'Runa de Nube'), 2);
    assert.equal(r15.elecciones.find((e: any) => e.id === 'runas').max, 5);
  });
});

describe('Selector de clase', () => {
  test('el Artífice sale una sola vez: la clase completa de la biblioteca, con su nombre', () => {
    const lista = clasesParaElegir('');
    const artifices = lista.filter(([, x]) => /art[ií]fice/i.test(x.n));
    assert.deepEqual(artifices.map(([k, x]) => [k, x.n]), [['lib:arcanista', 'Artífice']]);
    assert.ok(lista.some(([k]) => k === 'lib:pugilista') && lista.some(([k]) => k === 'mago'));
  });
  test('un personaje que ya tenía el Artífice de las reglas lo sigue viendo', () => {
    assert.ok(clasesParaElegir('artifice').some(([k]) => k === 'artifice'));
  });
});

describe('Manos: qué arma se empuña', () => {
  const gue = (extra: Record<string, any>) => pj('guerrero', 5, '', { fue: 16, des: 14 }, extra);
  test('sin elegir, empuña la primera cuerpo a cuerpo y las demás quedan guardadas', () => {
    const c = gue({ armas: [['arco_corto', 1], ['espada_larga', 1], ['daga', 2]] });
    assert.deepEqual(c.armas.map((a: any) => a.mano), [null, 'principal', null]);
  });
  test('un arma a dos manos no deja usar el escudo ni otra arma', () => {
    const c = gue({ armas: [['espadon', 1], ['daga', 1]], escudo: true, manos: { a: 'espadon', b: 'daga' } });
    assert.equal(c.shield, false);
    assert.equal(c.manos.b, '');
  });
  test('la versátil solo hace su daño a dos manos con la otra mano libre', () => {
    const libre = gue({ armas: [['espada_larga', 1]], manos: { a: 'espada_larga', b: '' } });
    const conEscudo = gue({ armas: [['espada_larga', 1]], escudo: true, manos: { a: 'espada_larga', b: '' } });
    assert.ok(libre.armas[0].v);
    assert.equal(conEscudo.armas[0].v, null);
    assert.equal(conEscudo.ac, libre.ac + 2);
  });
  test('en la otra mano solo va un arma ligera, y con dos ligeras sale el ataque adicional', () => {
    const noLigera = gue({ armas: [['espada_corta', 1], ['maza', 1]], manos: { a: 'espada_corta', b: 'maza' } });
    assert.equal(noLigera.manos.b, '');
    const dos = gue({ armas: [['espada_corta', 1], ['daga', 1]], manos: { a: 'espada_corta', b: 'daga' } });
    assert.equal(dos.manos.b, 'daga');
    assert.ok(dos.entries.some((e: any) => e.nombre === 'Ataque con la otra arma ligera'));
    assert.equal(gue({ armas: [['daga', 1]], manos: { a: 'daga', b: 'daga' } }).manos.b, '');
  });
});

describe('Inventario y monedas', () => {
  test('pagar con la misma moneda, o cambiando una mayor y recibiendo el cambio', () => {
    const b = { pt: 0, po: 35, pp: 3, pc: 1 };
    assert.deepEqual(pagar(b, 'pp', 2), { pt: 0, po: 35, pp: 1, pc: 1 });
    // 5 de plata con solo 3: se cambia 1 de oro (10 de plata), quedan 8
    assert.deepEqual(pagar(b, 'pp', 5), { pt: 0, po: 34, pp: 8, pc: 1 });
    // 1 de oro sin oro: se cambia 1 de platino
    assert.deepEqual(pagar({ pt: 1, po: 0, pp: 0, pc: 0 }, 'po', 1), { pt: 0, po: 9, pp: 0, pc: 0 });
    // Sin mayores, se juntan menores
    assert.deepEqual(pagar({ pt: 0, po: 0, pp: 12, pc: 5 }, 'po', 1), { pt: 0, po: 0, pp: 2, pc: 5 });
    assert.deepEqual(pagar({ pt: 0, po: 0, pp: 1, pc: 0 }, 'pc', 3), { pt: 0, po: 0, pp: 0, pc: 7 });
    assert.equal(pagar({ pt: 0, po: 1, pp: 0, pc: 0 }, 'pt', 1), null);
  });
  test('armas y armaduras personalizadas cuentan en ataques y CA', () => {
    const c = pj('guerrero', 3, '', { fue: 16, des: 14 }, {
      armas: [['x:hacha', 1]], armasPropias: { 'x:hacha': { n: 'Hacha rúnica', d: '1d10', tipo: 'cortante', cat: 'marcial', p: [] } },
      armadura: 'x:malla', armadurasPropias: { 'x:malla': { n: 'Malla élfica', base: 14, cat: 'ligera' } },
    });
    assert.equal(c.armas[0].w.n, 'Hacha rúnica');
    assert.equal(c.armas[0].dmg, "1d10 + 3 cortante");
    assert.equal(c.ac, 16);
  });
  test('la armadura que se quita del cuerpo sigue en el inventario, y el escudo también', () => {
    assert.deepEqual(armadurasDe({ armadura: 'mallas', armaduras: ['cuero'], escudo: true }), ['mallas', 'cuero', 'escudo']);
  });
});

describe('Objetos mágicos', () => {
  const M = OBJETOS_MAGICOS;
  test('arma +1: suma al ataque y al daño; armadura +1 a la CA', () => {
    const c = pj('guerrero', 3, '', { fue: 16, des: 10 }, {
      armas: [['x:m1', 1]], armasPropias: { 'x:m1': armaMagica('estoque', M['arma-1']) },
      armadura: 'x:m2', armadurasPropias: { 'x:m2': armaduraMagica('mallas', M['armadura-1']) },
      magicos: [{ id: 'a', k: 'arma-1', arma: 'x:m1' }, { id: 'b', k: 'armadura-1', armadura: 'x:m2' }],
    });
    const a = c.armas.find((x: any) => x.k === 'x:m1');
    assert.equal(a.w.n, 'Estoque +1');
    assert.equal(a.atk, 3 + 2 + 1);
    assert.equal(a.dmg, '1d8 + 4 perforante');
    assert.equal(c.ac, 17);
  });
  test('sin sintonizar no funciona; sintonizado da CA, salvaciones y características', () => {
    const sin = pj('guerrero', 3, '', { fue: 10, con: 10 }, { magicos: [{ id: 'a', k: 'anillo-proteccion' }, { id: 'b', k: 'guanteletes-ogro' }] });
    const con = pj('guerrero', 3, '', { fue: 10, con: 10 }, { magicos: [{ id: 'a', k: 'anillo-proteccion', sint: true }, { id: 'b', k: 'guanteletes-ogro', sint: true }] });
    assert.equal(con.ac, sin.ac + 1);
    assert.equal(con.saves.con, sin.saves.con + 1);
    assert.equal(sin.sc.fue, 10);
    assert.equal(con.sc.fue, 19);
    assert.ok(con.entries.some((e: any) => e.nombre === 'Anillo de Protección' && e.src === 'Objeto mágico'));
    assert.ok(!sin.entries.some((e: any) => e.nombre === 'Anillo de Protección'));
  });
  test('cargas como recurso y conjuros en la lista con su coste y CD fija', () => {
    const c = pj('guerrero', 3, '', {}, { magicos: [{ id: 'v', k: 'varita-bolas-fuego', sint: true }] });
    const r = c.recursos.find((x: any) => x.id === 'mg-v');
    assert.equal(r?.max, 7);
    const s = c.conjuros.find((x: any) => x.nombre === 'Bola de fuego');
    assert.equal(s?.cd, 15);
    assert.equal(s?.recurso, 'mg-v');
    assert.match(s?.coste, /carga/);
  });
  test('más de 3 sintonizados avisa', () => {
    const magicos = ['anillo-proteccion', 'capa-proteccion', 'piedra-suerte', 'amuleto-salud'].map((k, i) => ({ id: 'm' + i, k, sint: true }));
    const c = pj('guerrero', 3, '', {}, { magicos });
    assert.ok(c.avisos.some((a: any) => /sintonizados/.test(a.t)));
  });
});

describe('Juntar monedas', () => {
  test('10 de cobre son 1 de plata y 10 de plata, 1 de oro; el oro no pasa a platino', () => {
    assert.deepEqual(juntar({ pt: 1, po: 25, pp: 14, pc: 27 }), { pt: 1, po: 26, pp: 6, pc: 7 });
    assert.deepEqual(juntar({ pt: 0, po: 0, pp: 9, pc: 10 }), { pt: 0, po: 1, pp: 0, pc: 0 });
  });
});

describe('Hechicero 2024 (Lote 12)', () => {
  const hec = (nivel: number, sub = '', extra: Record<string, any> = {}) => { setLib({ clases: { hechicero: HECHICERO_2024 } }); return pj('hechicero', nivel, sub, { car: 16 }, extra); };
  const nombres = (c: any) => c.conjuros.map((s: any) => s.nombre);
  test('Metamagia: 2, 4 y 6 opciones, y solo salen las elegidas', () => {
    const c = hec(10, '', { elecciones: { 'metamagia-opciones': ['met-sutil', 'met-acelerado'] } });
    assert.equal(c.elecciones.find((e: any) => e.id === 'metamagia-opciones').max, 4);
    assert.equal(hec(2).elecciones.find((e: any) => e.id === 'metamagia-opciones').max, 2);
    assert.equal(hec(17).elecciones.find((e: any) => e.id === 'metamagia-opciones').max, 6);
    assert.ok(entrada(c, 'Conjuro Sutil'));
    assert.equal(c.entries.some((e: any) => e.nombre === 'Conjuro Cuidadoso'), false);
  });
  // El catálogo de estas pruebas no trae los conjuros de la biblioteca, así que se mira el texto del rasgo
  test('Conjuros siempre preparados de las subclases, según el nivel', () => {
    const lista = (c: any, rasgo: string) => entrada(c, rasgo).texto;
    assert.match(lista(hec(9, 'draconico'), 'Conjuros dracónicos'), /Invocar dragón/);
    assert.doesNotMatch(lista(hec(5, 'draconico'), 'Conjuros dracónicos'), /Ojo arcano/);
    assert.match(lista(hec(5, 'lib:aberrante'), 'Conjuros Psiónicos'), /Recado/);
    assert.match(lista(hec(5, 'lib:hechiceria-sombras'), 'Conjuros de las Sombras'), /Indetectable/);
    assert.ok(nombres(hec(6, 'lib:fuego-conjuro')).includes('Contrahechizo'));
    assert.ok(nombres(hec(3, 'lib:lunar')).includes('Llama sagrada'));
  });
  test('Usos: Restaurar el Equilibrio = CAR y Favorecido por los Dioses se recupera en descanso corto', () => {
    assert.equal(recurso(hec(3, 'lib:reloj'), 'Restaurar el Equilibrio')?.max, 3);
    assert.equal(recurso(hec(3, 'lib:alma-divina'), 'Favorecido por los Dioses')?.reset, 'corto');
  });
});

describe('Mago 2024 (Lote 13)', () => {
  const mag = (nivel: number, sub = '', extra: Record<string, any> = {}) => { setLib({ clases: { mago: MAGO_2024 } }); return pj('mago', nivel, sub, { int: 16, des: 14 }, extra); };
  test('Capa Arcana: reserva de 2 × nivel + INT', () => {
    const r = recurso(mag(6, 'lib:abjuracion'), 'Capa Arcana');
    assert.equal(r?.max, 15);
    assert.equal(r?.tipo, 'pool');
  });
  test('Iniciativa: Ingenio Táctico y Conciencia Temporal suman INT', () => {
    assert.equal(mag(3, 'lib:magia-guerra').init, mag(3).init + 3);
    assert.equal(mag(3, 'lib:magia-cronurgia').init, mag(3).init + 3);
  });
  test('Conversador Encantador: competencia y INT en la habilidad elegida', () => {
    const base = mag(3, 'lib:encantamiento'), c = mag(3, 'lib:encantamiento', { elecciones: { 'encantamiento-habilidades': 'persuasion' } });
    assert.ok(base.elecciones.some((e: any) => e.id === 'encantamiento-habilidades'));
    assert.equal(c.skill.persuasion, base.skill.persuasion + c.pb + 3);
  });
  test('Usos: Canto de la Hoja = INT y Cambio Crónico 2 por descanso largo', () => {
    assert.equal(recurso(mag(3, 'lib:cantor-hoja'), 'Canto de la Hoja')?.max, 3);
    assert.equal(recurso(mag(3, 'lib:magia-cronurgia'), 'Cambio Crónico')?.max, 2);
  });
});

describe('Lanzar conjuros y seguir un ataque', () => {
  test('Subir de nivel un conjuro suma sus dados por nivel', () => {
    assert.equal(dadosAlLanzar('8d6', 3, 5, 'Mitad de daño si pasan. +1d6 por nivel de espacio extra.'), '10d6');
    assert.equal(dadosAlLanzar('2d8+3', 1, 3, 'El daño aumenta en 1d8 por cada nivel por encima de 1 que tenga el espacio.'), '4d8+3');
    assert.equal(dadosAlLanzar('1d10', 1, 2, 'El daño de frío aumenta en 1d6 por cada nivel por encima de 1.'), '1d10+1d6');
    assert.equal(dadosAlLanzar('3d6', 2, 2, '', 3), '3d6+3');
  });
  test('Ataque con la otra mano: con dos armas iguales también tiene tirada', () => {
    const c = pj('picaro', 5, '', {}, { armas: [['daga', 2]], manos: { a: 'daga', b: 'daga' } });
    const e = entrada(c, 'Ataque con la otra arma ligera');
    assert.ok(e?.roll, 'la tarjeta tiene su tirada');
    assert.doesNotMatch(e.roll[1], /\+/); // sin el modificador al daño
    assert.ok(extrasAtaque(c, c.armas.find((a: any) => a.mano === 'principal')).some((x: any) => x.atk));
  });
  test('Evocación Potenciada solo en conjuros de Evocación', () => {
    setLib({ clases: { mago: MAGO_2024 } });
    const e = pj('mago', 10, 'lib:evocacion');
    assert.equal(bonosPara(e, { nombre: 'Bola de fuego' }).length, 1);
    assert.equal(bonosPara(e, { nombre: 'Toque helado' }).length, 0);
  });
  test('Descripción duplicada en pies y metros: queda la primera', () => {
    const a = 'Una onda surge de tu cuerpo a 5 pies.';
    assert.equal(sinDuplicado(`${a},Una onda surge de tu cuerpo a 1,5 m.`), a);
    assert.equal(sinDuplicado('Uno., dos'), 'Uno., dos');
  });
  test('Espacios para lanzar y extras del ataque', () => {
    const c = pj('mago', 5);
    assert.deepEqual(espaciosPara(c, 2).map((e: any) => e.nivel), [2, 3]);
    const p = pj('picaro', 5, '', {}, { armas: [['daga', 1], ['espada-corta', 1]] });
    const daga = p.armas.find((a: any) => a.k === 'daga') || { w: ARMAS.daga, mano: 'principal' };
    const furtivo = extrasAtaque(p, daga).find((x: any) => /Ataque Furtivo/.test(x.nombre));
    assert.equal(furtivo?.requiere, 'ventaja');
    // Con un arma que no es sutil ni a distancia no se ofrece
    assert.ok(!extrasAtaque(p, { w: ARMAS.garrote || { p: [] }, mano: 'principal' }).some((x: any) => /Ataque Furtivo/.test(x.nombre)));
  });
});

describe('Ventaja sobre una tirada ya hecha', () => {
  test('Se conserva el d20 que salió y se tira solo el segundo', () => {
    for (let i = 0; i < 20; i++) {
      const r = resolver('1d20+4', { adv: 1, previo: 7 });
      assert.equal(r.groups[0].vals[0], 7);
      assert.equal(r.nat, Math.max(7, r.groups[0].vals[1]));
      const d = resolver('1d20+4', { adv: -1, previo: 7 });
      assert.equal(d.nat, Math.min(7, d.groups[0].vals[1]));
    }
  });
});

describe('Monje 2024 (Lote 14)', () => {
  const mon = (nivel: number, stats: Record<string, number> = {}, sub = '') => { setLib({ clases: { monje: MONJE_2024 } }); return pj('monje', nivel, sub, stats); };
  test('Cuerpo y Mente: +4 a DES y SAB en el nivel 20, hasta 25', () => {
    const c19 = mon(19, { des: 20, sab: 16 }), c20 = mon(20, { des: 20, sab: 16 });
    assert.equal(c19.sc.des, 20);
    assert.equal(c20.sc.des, 24);
    assert.equal(c20.sc.sab, 20);
    assert.equal(c20.ac, c19.ac + 4);
  });
  test('Artes Místicas: lanza conjuros de hechicero con SAB y espacios de un tercio', () => {
    const c = mon(7, { sab: 16 }, 'lib:artes-misticas');
    assert.deepEqual(c.slots.map((s: any) => [s.nivel, s.n]), [[1, 4], [2, 2]]);
    assert.equal(c.casterAb, 'sab');
    assert.equal(c.dcSpell, 8 + c.pb + 3);
    assert.equal(c.prepMax, 5);
    assert.equal(c.trucosMax, 2);
    assert.equal(c.listaSub, 'hechicero');
    assert.ok(c.recursos.some((r: any) => r.id === 'slot2'));
  });
  test('subclases viejas: Aliento del Dragón con usos = competencia', () => {
    assert.equal(recurso(mon(5, {}, 'lib:dragon-ascendente'), 'Aliento del Dragón')?.max, 3);
    assert.ok(entrada(mon(17, {}, 'lib:alma-solar'), 'Escudo Solar'));
  });
  test('Sintonía Elemental: golpe sin armas elemental en Ataques', () => {
    const c = mon(17, { des: 16 }, 'lib:elementos');
    const a = c.naturales.find((x: any) => /Sintonía/.test(x.nombre));
    assert.equal(a?.atk, c.unarmed.atk);
    assert.match(a.dmg, /ácido, frío, fuego, rayo o trueno/);
    assert.match(a.notas.join(' '), /Epítome/);
  });
  test('los rasgos altos son los de 2024', () => {
    const c = mon(20);
    assert.ok(entrada(c, 'Superviviente Disciplinado'));
    assert.equal(entrada(c, 'Alma Diamantina'), undefined);
    assert.equal(entrada(c, 'Desafiar a la Muerte'), undefined);
  });
});

describe('Playtest: Unearthed Arcana 2025', () => {
  const ua = (clase: string, nivel: number, sub: string, stats: Record<string, number> = {}) => {
    setLib({ clases: Object.fromEntries(Object.entries(PLAYTEST_2025).map(([k, subclases]) => [k, { subclases }])) });
    return pj(clase, nivel, 'lib:' + sub, stats);
  };
  test('las cinco subclases llevan la etiqueta Playtest', () => {
    for (const [clase, subs] of Object.entries(PLAYTEST_2025)) for (const [key, s] of Object.entries(subs))
      assert.equal(fuenteSubclase({ n: s.n, lib: true, key: 'lib:' + key }, clase).tipo, 'playtest', s.n);
    assert.notEqual(fuenteSubclase({ n: 'Caballero', lib: true }, 'guerrero').tipo, 'playtest');
  });
  test('Heraldo de la Tormenta: dados según el daño de Furia y CD con CON', () => {
    const c = ua('barbaro', 9, 'heraldo-tormenta', { con: 16 });
    assert.match(entrada(c, 'Aura de Tormenta').texto, new RegExp(`CD ${8 + c.pb + 3}\\).*3d4 de fuego`));
  });
  test('Caballero de playtest: Maniobra de Protección con usos = CON', () => {
    assert.equal(recurso(ua('guerrero', 7, 'caballero-playtest', { con: 16 }), 'Maniobra de Protección')?.max, 3);
  });
  test('Rompejuramentos: conjuros siempre preparados y Golpe Sombrío en el nivel 20', () => {
    const c9 = ua('paladin', 9, 'rompejuramentos', { car: 16 });
    assert.ok(c9.conjurosRasgo.some((s: any) => s.nombre === 'Miedo'));
    assert.ok(!c9.conjurosRasgo.some((s: any) => s.nombre === 'Contagio'));
    const c20 = ua('paladin', 20, 'rompejuramentos', { car: 16 });
    assert.ok(c20.naturales.some((a: any) => a.nombre.startsWith('Golpe Sombrío')));
  });
});

describe('Conjuros que dan los rasgos', () => {
  test('Rompeconjuros: Contrahechizo como reacción y Disipar magia como acción adicional', () => {
    setLib({ clases: { mago: MAGO_2024 } });
    const c = pj('mago', 10, 'lib:abjuracion', { int: 16 });
    const s = (n: string) => c.conjurosRasgo.find((x: any) => x.nombre === n);
    assert.equal(s('Contrahechizo')?.tiempo, 'reaccion');
    assert.equal(s('Disipar magia')?.tiempo, 'adicional');
  });
  test('Druídico deja Hablar con los animales siempre preparado', () => {
    assert.ok(pj('druida', 1).conjurosRasgo.some((x: any) => /^hablar con los animales$/i.test(x.nombre)));
  });
});

describe('Golpe certero', () => {
  test('ataca con el arma empuñada usando la característica de conjuros y suma radiante desde el nivel 5', () => {
    const c = pj('mago', 5, '', { int: 18, fue: 10, des: 10 }, { armas: [['daga', 1]], conjuros: [{ nombre: 'Golpe certero', nivel: 0 }] });
    const g = c.conjuros.find((s: any) => s.nombre === 'Golpe certero')?.golpes?.[0];
    assert.ok(g, 'sin fila de ataque');
    assert.equal(g.atk, 4 + c.pb);
    assert.match(g.expr, /^1d4\+4\+1d6$/);
  });
});

describe('Familiares y criaturas', () => {
  test('Encontrar familiar deja agregar un familiar con su hoja', () => {
    const c = pj('mago', 1, '', {}, { conjuros: [{ nombre: 'Encontrar familiar', nivel: 1 }], criaturas: [{ id: 'a', key: 'gato', danio: 1 }] });
    assert.ok(c.criaturasPuede.some((x: any) => x.key === 'gato'));
    assert.equal(c.criaturasPuede.some((x: any) => x.key === 'zombi'), false);
    const g = c.criaturas[0];
    assert.equal(g.pgMax, 2); assert.equal(g.pg, 1);
    assert.equal(g.acciones[0].atk, 4);
  });
  test('Siervos Muertos Vivientes suma PG y daño necrótico a los zombis', () => {
    setLib({ clases: { mago: MAGO_2024 } });
    const c = pj('mago', 6, 'lib:necromancia', { int: 16 }, { criaturas: [{ id: 'z', key: 'zombi' }] });
    const z = c.criaturas[0];
    assert.equal(z.pgMax, 15 + 3 + 3);
    assert.equal(z.acciones[0].expr, '1d8+1+3');
  });
});

describe('Compañeros', () => {
  test('las formas especiales del familiar solo salen con el Pacto de la Cadena', () => {
    const fam = [{ nombre: 'Encontrar familiar', nivel: 1 }];
    const con = pj('brujo', 3, '', {}, { conjuros: fam, pactoCadena: true }), sin = pj('mago', 3, '', {}, { conjuros: fam });
    assert.ok(con.criaturasPuede.some((x: any) => x.key === 'diablillo'));
    assert.equal(sin.criaturasPuede.some((x: any) => x.key === 'diablillo'), false);
  });
});

describe('Paladín 2024 (Lote 15)', () => {
  const pal = (nivel: number, sub = '', extra: Record<string, any> = {}) => { setLib({ clases: { paladin: PALADIN_2024 } }); return pj('paladin', nivel, sub, { fue: 16, des: 14, car: 16 }, extra); };
  test('Golpes Radiantes: 1d8 radiante extra con armas cuerpo a cuerpo desde el nivel 11', () => {
    const armas = { armas: [['espada_larga', 1], ['arco_largo', 1]] };
    const fila = (c: any, k: string) => c.armas.find((a: any) => a.k === k);
    assert.match(fila(pal(11, '', armas), 'espada_larga').expr, /\+1d8$/);
    assert.match(fila(pal(11, '', armas), 'espada_larga').dmg, /1d8 radiante/);
    assert.doesNotMatch(fila(pal(11, '', armas), 'arco_largo').expr, /1d8$/);
    assert.doesNotMatch(fila(pal(10, '', armas), 'espada_larga').expr, /\+1d8$/);
  });
  test('Esplendor del Genio: CA 10 + DES + CAR sin armadura y la habilidad elegida', () => {
    const c = pal(3, 'lib:genios-nobles', { elecciones: { 'esplendor-genio': 'persuasion' } });
    assert.equal(c.ac, 15);
    assert.equal(c.skillProf.persuasion, true);
    assert.equal(pal(3, 'lib:genios-nobles', { armadura: 'mallas' }).ac, 16);
  });
  test('Usos y costes: Defensa Gloriosa = CAR, Abjurar Enemigos gasta Canalizar Divinidad', () => {
    assert.equal(recurso(pal(15, 'gloria'), 'Defensa Gloriosa')?.max, 3);
    assert.equal(entrada(pal(9), 'Abjurar Enemigos').coste, '1 Canalizar');
    assert.equal(entrada(pal(3, 'lib:conquista'), 'Golpe Guiado').coste, '1 Canalizar');
  });
  test('Conjuros del juramento hasta el nivel 17', () => {
    assert.match(entrada(pal(17, 'venganza'), 'Conjuros del juramento').texto, /Escudriñar/);
    assert.doesNotMatch(entrada(pal(5, 'venganza'), 'Conjuros del juramento').texto, /Acelerar/);
    assert.match(entrada(pal(9, 'lib:corona'), 'Conjuros de la Corona').texto, /Espíritus guardianes/);
    assert.ok(pal(9, 'devocion').conjuros.some((x: any) => x.nombre === 'Faro de esperanza'));
  });
});

describe('Pícaro 2024 (Lote 16)', () => {
  const pic = (nivel: number, sub = '', extra: Record<string, any> = {}) => { setLib({ clases: { picaro: PICARO_2024 } }); return pj('picaro', nivel, sub, { des: 16, int: 14, sab: 12, car: 14 }, extra); };
  test('Cuchillo Mental: dados por nivel y filas de las hojas psíquicas', () => {
    assert.equal(recurso(pic(3, 'lib:cuchillo-mental'), 'Poder Psiónico')?.max, 4);
    assert.equal(recurso(pic(13, 'lib:cuchillo-mental'), 'Poder Psiónico')?.max, 10);
    const filas = pic(3, 'lib:cuchillo-mental').ataquesReglas;
    assert.deepEqual(filas.map((a: any) => a.expr), ['1d6+3', '1d4+3']);
    assert.equal(filas[0].atk, 5);
  });
  test('Vástago de los Tres: el truco de Lealtad Temible sale según el dios elegido', () => {
    const c = pic(3, 'lib:vastago-tres', { elecciones: { 'lealtad-tres': 'myrkul' } });
    assert.ok(c.conjurosRasgo.some((s: any) => s.nombre === 'Toque helado'));
    assert.match(entrada(c, 'Lealtad Temible').texto, /necrótico/);
  });
  test('Batidor, Espadachín e Inquisitivo: pericias, velocidad, iniciativa y usos', () => {
    const b = pic(9, 'lib:batidor');
    assert.equal(b.skillPer.naturaleza, true);
    assert.equal(b.skill.supervivencia, 1 + 2 * b.pb);
    assert.equal(b.speed, pic(9).speed + 10);
    assert.equal(pic(3, 'lib:espadachin').init, pic(3).init + 2);
    assert.equal(recurso(pic(13, 'lib:inquisitivo'), 'Ojo Infalible')?.max, 1);
    assert.equal(recurso(pic(20), 'Golpe de Suerte')?.reset, 'corto');
  });
  test('Ladrón: Usar Objeto Mágico sube la sintonía a 4', () => {
    assert.equal(pic(13, 'lib:ladron').maxSintonia, 4);
    assert.equal(pic(12, 'lib:ladron').maxSintonia, undefined);
  });
});

describe('Subclases oficiales que faltaban', () => {
  const con = (clase: string, datos: any, nivel: number, sub: string, stats: Record<string, number> = {}, extra: Record<string, any> = {}) => {
    setLib({ clases: { [clase]: datos, ...(clase === 'paladin' ? {} : { paladin: PALADIN_2024 }) } });
    return pj(clase, nivel, sub, stats, extra);
  };
  test('Bárbaro: Guardián Ancestral, Bestia y Heraldo oficial', () => {
    assert.match(entrada(con('barbaro', BARBARO_2024, 10, 'lib:senda-guardian-ancestral'), 'Escudo Espiritual').texto, /3d6/);
    const b = con('barbaro', BARBARO_2024, 14, 'lib:senda-bestia', { fue: 16, con: 16 });
    assert.equal(recurso(b, 'Llamar a la Cacería')?.max, b.pb);
    assert.ok(b.naturales.some((a: any) => a.nombre.startsWith('Mordisco (Forma') && a.expr === '1d8+3'));
    const h = con('barbaro', BARBARO_2024, 10, 'lib:senda-heraldo-tormenta', { con: 16 });
    assert.match(entrada(h, 'Aura de Tormenta').texto, /reciben 3 de fuego.*2d6 de relámpago/);
  });
  test('Bardo: Susurros, Elocuencia y el estilo del Colegio de las Espadas', () => {
    assert.match(entrada(con('bardo', BARDO_2024, 10, 'lib:colegio-susurros'), 'Hojas Psíquicas').texto, /5d6/);
    assert.equal(recurso(con('bardo', BARDO_2024, 14, 'lib:colegio-elocuencia', { car: 18 }), 'Inspiración Contagiosa')?.max, 4);
    const armas = { armas: [['estoque', 1]] };
    const fila = (c: any) => c.armas.find((a: any) => a.k === 'estoque');
    const sin = con('bardo', BARDO_2024, 3, 'lib:colegio-espadas', {}, armas);
    const duelo = con('bardo', BARDO_2024, 3, 'lib:colegio-espadas', {}, { ...armas, elecciones: { 'estilo-espadas': 'duelo' } });
    assert.notEqual(fila(duelo).expr, fila(sin).expr);
  });
  test('Compañeros: objeto danzante, draco y compañero reanimado', () => {
    const d = con('bardo', BARDO_2024, 6, 'lib:colegio-creacion').criaturas.find((x: any) => x.id === 'cmp-danzante');
    assert.equal(d.pgMax, 40);
    const dr = con('explorador', EXPLORADOR_2024, 3, 'lib:guardian-draconico').criaturas.find((x: any) => x.id === 'cmp-draco');
    assert.equal(dr.acciones[0].atk, 5);
    setLib({ clases: { 'lib:arcanista': { ...arcanista, subclases: { ...arcanista.subclases, ...ARTIFICE_2026.subclases } } } });
    const a = pj('lib:arcanista', 9, 'lib:reanimador', { int: 16 });
    const re = a.criaturas.find((x: any) => x.id === 'cmp-reanimado');
    assert.equal(re.ca, 13);
    assert.match(re.rasgos.find((x: any) => x[0] === 'Estallido mortal')[1], /4d4/);
    assert.ok(a.siempre.has('animar a los muertos'));
    assert.equal(recurso(a, 'Descarga vital')?.max, 3);
  });
  test('Paladín: el Rompejuramentos oficial y el de prueba no se mezclan', () => {
    setLib({ clases: { paladin: { ...PALADIN_2024, subclases: { ...PALADIN_2024.subclases, ...PLAYTEST_2025.paladin } } } });
    const of = pj('paladin', 20, 'lib:rompejuramentos-dmg', { car: 16 });
    assert.match(entrada(of, 'Aura de Odio').texto, /30 pies.*\+3/);
    assert.ok(of.naturales.some((a: any) => a.nombre.startsWith('Sombras (Señor del Pavor)')));
    assert.ok(of.siempre.has('contagio') && !of.siempre.has('saeta de bruja'));
    const ua = pj('paladin', 20, 'lib:rompejuramentos', { car: 16 });
    assert.ok(ua.naturales.some((a: any) => a.nombre.startsWith('Golpe Sombrío')));
    assert.equal(fuenteSubclase({ n: 'Rompejuramentos', lib: true, key: 'lib:rompejuramentos' }, 'paladin').tipo, 'playtest');
    assert.notEqual(fuenteSubclase({ n: 'Rompejuramentos', lib: true, key: 'lib:rompejuramentos-dmg' }, 'paladin').tipo, 'playtest');
  });
});

describe('Para qué sirve cada recurso', () => {
  test('Ataques por acción de Atacar: 1 sin Ataque Extra, 2 con él y hasta 4 en el Guerrero', () => {
    assert.equal(ataquesPorAccion(pj('guerrero', 3, '', { fue: 16 })), 1);
    assert.equal(ataquesPorAccion(pj('guerrero', 5, '', { fue: 16 })), 2);
    assert.equal(ataquesPorAccion(pj('guerrero', 11, '', { fue: 16 })), 3);
    assert.equal(ataquesPorAccion(pj('guerrero', 20, '', { fue: 16 })), 4);
    assert.equal(ataquesPorAccion(pj('paladin', 5, '', { fue: 16 })), 2);
  });
  test('Golpes de un rasgo: Ráfaga de Golpes (2, 3 con Enfoque Elevado, más con Frenesí Ebrio) y los que dicen cuántos hacen', () => {
    const rafaga = { nombre: 'Ráfaga de Golpes', texto: 'Dos golpes sin armas: +5 al ataque.' };
    const con = (...n: string[]) => ({ entries: n.map(nombre => ({ nombre })) });
    assert.equal(golpesDeRasgo(con(), rafaga), 2);
    assert.equal(golpesDeRasgo(con('Enfoque Elevado'), rafaga), 3);
    assert.equal(golpesDeRasgo(con('Enfoque Elevado', 'Frenesí Ebrio'), rafaga), 6);
    assert.equal(golpesDeRasgo(con(), { nombre: 'Uno-Dos', texto: 'Haces dos golpes sin armas (1d8 + 5 cada uno).' }), 2);
    assert.equal(golpesDeRasgo(con(), { nombre: 'Golpe', texto: 'Haces un golpe sin armas.' }), 1);
  });
  test('Los espacios de pacto del brujo valen para lanzar conjuros', () => {
    const c = pj('brujo', 5, '', { car: 16 }, { conjuros: [{ nombre: 'Manos ardientes', nivel: 1 }] });
    const e = espaciosPara(c, 1);
    assert.deepEqual(e.map((x: any) => [x.nivel, x.quedan]), [[3, 2]]);
    assert.deepEqual(espaciosPara(c, 4), []);
  });
  test('Espacios de pacto: los conjuros que se lanzan con ellos y Astucia Mágica, que los recupera', () => {
    const c = pj('brujo', 5, '', { car: 16 }, { conjuros: [{ nombre: 'Manos ardientes', nivel: 1 }, { nombre: 'Rayo de escarcha', nivel: 0 }] });
    const r = c.recursos.find((x: any) => x.id === 'pacto');
    const { para, usos } = usosDeRecurso(c, r);
    assert.match(para, /nivel 3/);
    const nombres = usos.map(u => u.nombre);
    assert.ok(nombres.includes('Manos ardientes'));
    assert.ok(!nombres.includes('Rayo de escarcha'), 'los trucos no gastan espacios');
    assert.ok(nombres.includes('Astucia Mágica'));
  });
  test('Lo que usa un recurso sale por tipo de acción y, dentro de cada tipo, por nombre', () => {
    const c = pj('brujo', 5, '', { car: 16 }, { conjuros: [{ nombre: 'Sugestión', nivel: 2, tiempo: 'accion' }, { nombre: 'Escudo', nivel: 1, tiempo: 'reaccion' }, { nombre: 'Armadura de Agathys', nivel: 1, tiempo: 'accion' }] });
    const { usos } = usosDeRecurso(c, c.recursos.find((x: any) => x.id === 'pacto'));
    const orden = ['accion', 'adicional', 'reaccion', 'gratis', 'fuera', 'pasiva'];
    const tipos = usos.map(u => orden.indexOf(u.t || 'pasiva'));
    assert.deepEqual(tipos, [...tipos].sort((a, b) => a - b));
    const acciones = usos.filter(u => u.t === 'accion').map(u => u.nombre);
    assert.deepEqual(acciones, [...acciones].sort((a, b) => a.localeCompare(b, 'es')));
  });
  test('Un recurso de rasgo dice para qué sirve con el texto del rasgo', () => {
    const c = pj('paladin', 5);
    const { para, usos } = usosDeRecurso(c, c.recursos.find((x: any) => x.id === 'manos'));
    assert.match(para, /PG/);
    assert.equal(usos[0].nombre, 'Imposición de Manos');
  });
  test('Lo que pide Canalizar en su coste se liga a Canalizar Divinidad, no a otro recurso con una palabra en común', () => {
    const c = pj('paladin', 5);
    const canal = usosDeRecurso(c, c.recursos.find((x: any) => x.id === 'canal')).usos.map(u => u.nombre);
    assert.ok(canal.includes('Sentido Divino'));
  });
});

describe('Psion (Unearthed Arcana 2025)', () => {
  const P = 'lib:psion';
  beforeEach(() => setLib({ clases: { [P]: PSION_2025 } }));
  test('espacios de conjuro, trucos y preparados según la tabla del Psion', () => {
    const c1 = pj(P, 1), c5 = pj(P, 5), c20 = pj(P, 20);
    assert.deepEqual(c1.slots.map((s: any) => s.n), [2]);
    assert.deepEqual(c5.slots.map((s: any) => s.n), [4, 3, 2]);
    assert.deepEqual(c20.slots.map((s: any) => s.n), [4, 3, 3, 3, 3, 2, 2, 1, 1]);
    for (const [nivel, t, p] of [[1, 2, 4], [4, 3, 7], [10, 4, 15], [20, 4, 22]]) {
      const c = pj(P, nivel);
      assert.deepEqual([c.trucosMax, c.prepMax], [t, p], `nivel ${nivel}`);
    }
  });
  test('Dados de Energía Psiónica: cantidad y tamaño según el nivel', () => {
    for (const [nivel, dados, caras] of [[1, 4, 6], [5, 6, 8], [9, 8, 8], [11, 8, 10], [17, 12, 12]]) {
      const c = pj(P, nivel);
      assert.equal(recurso(c, 'Dados de Energía Psiónica')?.max, dados, `nivel ${nivel}`);
      assert.match(entrada(c, 'Dados de Energía Psiónica').texto, new RegExp(`${dados}d${caras}\\b`));
    }
  });
  test('Spellcasting usa INT para la CD', () => {
    assert.match(entrada(pj(P, 1), 'Lanzamiento de Conjuros').texto, /CD 13/); // 8 + 2 + INT 3
  });
  test('conjuros siempre preparados de Telepath y Psi Warper según el nivel', () => {
    assert.match(entrada(pj(P, 5, 'lib:telepath'), 'Conjuros de Telépata').texto, /Perdición.*Contrahechizo, Ralentizar/);
    assert.doesNotMatch(entrada(pj(P, 5, 'lib:telepath'), 'Conjuros de Telépata').texto, /Compulsión/);
    assert.match(entrada(pj(P, 3, 'lib:psi-warper'), 'Conjuros de Deformador Psi').texto, /Paso brumoso/);
  });
});

describe('Subclases de playtest 2026: conjuros siempre preparados', () => {
  beforeEach(() => setLib({ clases: { brujo: { subclases: { 'primordial-patron': PLAYTEST_2026.brujo['primordial-patron'] } }, paladin: { subclases: { 'oath-of-the-spellguard': PLAYTEST_2026.paladin['oath-of-the-spellguard'] } } } }));
  test('Primordial Patron suma los conjuros del elemento elegido', () => {
    const c = pj('brujo', 5, 'lib:primordial-patron', {}, { elecciones: { 'elemento-primordial': 'fuego' } });
    const t = entrada(c, 'Conjuros de Patrón Primordial').texto;
    assert.match(t, /Orbe cromático.*Manos ardientes.*Bola de fuego/);
    assert.doesNotMatch(t, /Cuchillo de hielo/);
  });
  test('Oath of the Spellguard: los conjuros salen en la hoja sin contar en el límite', () => {
    const c = pj('paladin', 9, 'lib:oath-of-the-spellguard');
    assert.match(entrada(c, 'Conjuros de Juramento del Guardián de Conjuros').texto, /Contrahechizo, Disipar magia/);
    assert.ok(c.siempre.has('contrahechizo'));
  });
});
