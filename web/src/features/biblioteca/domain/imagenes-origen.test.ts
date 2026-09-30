/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import biblioteca from '../../../../../biblioteca-mi-turno.json';
import { setLib } from './biblioteca';
import { catalogoActual, claveOrigen, imagenesOrigen, reconocerArchivo, type Catalogo } from './imagenes-origen';

let cat: Catalogo;
before(() => { setLib(biblioteca as any); cat = catalogoActual(); });
const r = (n: string) => reconocerArchivo(n, cat);

describe('reconocerArchivo con los nombres del set de Drive', () => {
  test('especie con subraza, clase, subclase y género', () => {
    assert.deepEqual(r('draconido-bronce-brujo-el-filo-maldito-femenino.jpg'), { especie: 'draconido', sub: 'bronce', clase: 'brujo', subclase: 'lib:filo-maldito', genero: 'f' });
    assert.deepEqual(r('draconido-negro-artifice-armero-femenino.jpg'), { especie: 'draconido', sub: 'negro', clase: 'lib:arcanista', subclase: 'lib:armero', genero: 'f' });
  });
  test('subrazas escritas de distintas formas', () => {
    assert.equal(r('elfo-alto-hechicero-hechiceria-aberrante-masculino.jpg')?.sub, 'alto');
    assert.equal(r('elfo-drow-clerigo-dominio-de-la-forja-femenino.jpg')?.sub, 'drow');
    assert.equal(r('elfo-silvano-monje-guerrero-de-la-sombra-masculino.jpg')?.sub, 'silvano');
    assert.equal(r('gnomo-de-las-rocas-picaro-fantasma-masculino.jpg')?.sub, 'roca');
    assert.equal(r('goliat-gigante-de-escarcha-explorador-maestro-de-bestias-masculino.jpg')?.sub, 'escarcha');
    assert.deepEqual(r('cambiante-piel-de-bestia-picaro-inquisitivo-masculino.jpg'), { especie: 'lib:cambiante-shifter', sub: 'piel-piedra', clase: 'picaro', subclase: 'lib:inquisitivo', genero: 'm' });
  });
  test('especies de biblioteca y clases de biblioteca', () => {
    assert.deepEqual(r('genasi-de-agua-guerrero-maestro-de-batalla-masculino.jpg'), { especie: 'lib:genasi-agua', sub: '', clase: 'guerrero', subclase: 'lib:maestro-batalla', genero: 'm' });
    assert.deepEqual(r('githyanki-cazador-de-sangre-orden-del-cazafantasmas-masculino.jpg'), { especie: 'lib:githyanki', sub: '', clase: 'lib:cazador-sangre', subclase: 'lib:cazafantasmas', genero: 'm' });
    assert.equal(r('gnomo-del-bosque-pugilista-matones-sabuesos-femenino.jpg')?.subclase, 'lib:matones-sabuesos');
    assert.equal(r('tiefling-ctonico-druida-circulo-de-la-tierra-masculino.jpg')?.sub, 'ctonico');
    assert.equal(r('hobgoblin-paladin-juramento-de-devocion-femenino.jpg')?.subclase, 'devocion');
  });
  test('sin subclase o sin género también vale; sin nombre, no', () => {
    assert.deepEqual(r('draconido-oro-mago.jpg'), { especie: 'draconido', sub: 'oro', clase: 'mago', subclase: '', genero: '' });
    assert.equal(r('31.jpg'), null);
    assert.equal(r('draconido-oro-carpintero-masculino.jpg'), null);
  });
});

describe('imagenesOrigen', () => {
  const k = (sub: string, subclase: string, genero: 'm' | 'f') => claveOrigen({ especie: 'draconido', sub, clase: 'mago', subclase, genero });
  const img = { [k('oro', 'lib:evocacion', 'm')]: 'a', [k('oro', 'lib:evocacion', 'f')]: 'b', [k('rojo', 'lib:ilusion', 'm')]: 'c', 'c:mago': 'd' };
  test('prefiere la misma subraza y, si no hay, cualquiera de la especie', () => {
    assert.deepEqual(imagenesOrigen(img, { especie: 'draconido', sub: 'oro', clase: 'mago' }), [k('oro', 'lib:evocacion', 'f'), k('oro', 'lib:evocacion', 'm')]);
    assert.deepEqual(imagenesOrigen(img, { especie: 'draconido', sub: 'azul', clase: 'mago' }).length, 3);
  });
  test('con subclase solo esa; sin especie o sin nada que coincida, ninguna', () => {
    assert.deepEqual(imagenesOrigen(img, { especie: 'draconido', sub: 'oro', clase: 'mago', subclase: 'lib:ilusion' }), [k('rojo', 'lib:ilusion', 'm')]);
    assert.deepEqual(imagenesOrigen(img, { especie: '', clase: 'mago' }), []);
    assert.deepEqual(imagenesOrigen(img, { especie: 'elfo', clase: 'mago' }), []);
  });
});
