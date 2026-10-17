import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { conservarVinculos, enemigosDe, leerSesion, marcarRegresados, regresanA, sobrevivientesDe } from './sesion';
import { BESTIARIO_GENERADO as CAT } from '@/features/reglas/data/generadas/bestiario';

describe('Info sesión (Mesa del DM)', () => {
  test('JSON: busca en el bestiario por nombre en inglés y crea los que no están', () => {
    const s = leerSesion(JSON.stringify({
      tipo: 'miturno-sesion', sesion: 'Sesión 3', notas: 'Llegan al puerto',
      combates: [
        { nombre: 'Emboscada', enemigos: [{ monstruo: 'Goblin Warrior', cantidad: 3 }, { monstruo: 'Capitán Rhaz', cantidad: 1 }] },
        { nombre: 'Jefe', enemigos: [{ monstruo: 'Bruja del pantano', ca: 14, pg: 60, iniciativa: 3 }] },
      ],
      monstruos: { 'Capitán Rhaz': { n: 'Capitán Rhaz', ca: 16, pg: 45, ini: 2, cr: '3', acciones: [{ n: 'Cimitarra', atk: 5, dano: [{ d: '1d6+3', tipo: 'cortante' }] }] } },
    }), 'sesion-3.json', CAT);
    assert.equal(s.nombre, 'Sesión 3');
    assert.deepEqual(s.encuentros.map(e => e.nombre), ['Emboscada', 'Jefe']);
    assert.equal(s.encuentros[0].enemigos[0].ref, 'goblin-warrior');
    assert.equal(s.encuentros[0].enemigos[1].ref, 'capitan-rhaz');
    assert.equal(s.monstruos['bruja-del-pantano'].ca, 14);
    assert.deepEqual(s.sinDatos, []);
    const enemigos = enemigosDe(s.encuentros[0], r => s.monstruos[r] || CAT[r] || null);
    assert.equal(enemigos.length, 4);
    assert.equal(enemigos[0].nombre, `${CAT['goblin-warrior'].n} 1`);
    assert.equal(enemigos[0].pgMax, 10);
    assert.equal(enemigos[3].ca, 16);
  });

  test('CSV con punto y coma: agrupa por combate y avisa de los enemigos sin datos', () => {
    const csv = 'combate;enemigo;cantidad;ca;pg;iniciativa\nCombate 1;zombie;2;;;\nCombate 1;Sombra rara;1;;;\nCombate 2;Ogro jefe;1;13;80;0\n';
    const s = leerSesion(csv, 'info-sesion-4.csv', CAT);
    assert.equal(s.nombre, 'info-sesion-4');
    assert.deepEqual(s.encuentros.map(e => [e.nombre, e.enemigos.length]), [['Combate 1', 2], ['Combate 2', 1]]);
    assert.equal(s.encuentros[0].enemigos[0].ref, 'zombie');
    assert.equal(s.encuentros[0].enemigos[0].cantidad, 2);
    assert.deepEqual(s.sinDatos, ['Sombra rara']);
    assert.equal(s.monstruos['ogro-jefe'].pg, 80);
  });
});

describe('Info sesión: los datos del archivo mandan', () => {
  const leer = (d: object) => leerSesion(JSON.stringify({ tipo: 'miturno-sesion', ...d }), 's.json', CAT);
  const ficha = (s: ReturnType<typeof leer>, i = 0, j = 0) => s.monstruos[s.encuentros[i].enemigos[j].ref] || CAT[s.encuentros[i].enemigos[j].ref];

  test('PG y CA del enemigo cambian los del bestiario sin perder sus ataques ni tocar el original', () => {
    const s = leer({ combates: [{ nombre: 'C', enemigos: [{ monstruo: 'Goblin Boss', pg: 30, ca: 15 }, { monstruo: 'Goblin Boss' }] }] });
    const [jefe, normal] = s.encuentros[0].enemigos;
    assert.notEqual(jefe.ref, 'goblin-boss');
    assert.equal(normal.ref, 'goblin-boss');
    assert.equal(s.monstruos[jefe.ref].pg, 30);
    assert.equal(s.monstruos[jefe.ref].ca, 15);
    assert.deepEqual(s.monstruos[jefe.ref].acciones, CAT['goblin-boss'].acciones);
    assert.deepEqual(s.sinDatos, []);
  });

  test('un bloque parcial con el nombre de un monstruo del bestiario completa lo que falta', () => {
    const s = leer({ combates: [{ nombre: 'C', enemigos: [{ monstruo: 'Goblin Boss' }] }], monstruos: { 'Goblin Boss': { pg: 40 } } });
    const m = ficha(s);
    assert.equal(m.pg, 40);
    assert.equal(m.ca, CAT['goblin-boss'].ca);
    assert.equal(m.acciones.length, CAT['goblin-boss'].acciones.length);
  });

  test('números como texto, daños como texto y ataques que solo vienen en el texto', () => {
    const s = leer({
      combates: [{ nombre: 'C', enemigos: [{ monstruo: 'Sacerdote rojo' }] }],
      monstruos: { 'Sacerdote rojo': { ca: '16 (cota de malla)', pg: '45 (7d8 + 14)', acciones: [
        { nombre: 'Maza', ataque: '+5', daño: '1d6+3 contundente' },
        { n: 'Llama', t: 'Ataque de conjuro a distancia: +6 al ataque, alcance 60 pies. Impacto: 10 (3d6) de daño de fuego.' },
      ] } },
    });
    const m = ficha(s);
    assert.equal(m.ca, 16);
    assert.equal(m.pg, 45);
    assert.equal(m.pgF, '7d8 + 14');
    assert.deepEqual(m.acciones.map(a => [a.atk, a.dano]), [[5, [{ d: '1d6+3', tipo: 'contundente' }]], [6, [{ d: '3d6', tipo: 'fuego' }]]]);
  });

  test('el alias solo cambia el nombre: Sabela en la mansión es un meenlock normal aunque haya un bloque Sabela', () => {
    const s = leer({ combates: [{ nombre: 'C', enemigos: [{ monstruo: 'Meenlock', alias: 'Sabela' }] }],
      monstruos: { Meenlock: { n: 'Meenlock', ca: 15, pg: 31 }, Sabela: { n: 'Sabela', ca: 15, pg: 45 } } });
    assert.equal(ficha(s).pg, 31);
  });

  test('nombre con el inglés entre paréntesis', () => {
    const s = leer({ combates: [{ nombre: 'C', enemigos: [{ monstruo: 'Jefe goblin (Goblin Boss)' }] }] });
    assert.equal(s.encuentros[0].enemigos[0].ref, 'goblin-boss');
  });
});

describe('Combates vinculados de la sesión', () => {
  const base = (nombre: string, extra = {}) => ({ id: nombre, nombre, enemigos: [], ...extra });
  test('vuelven los vivos del combate elegido, con sus PG; no los aliados ni los muertos', () => {
    const sob = sobrevivientesDe([
      { nombre: 'Meenlock 1', ca: 15, pgMax: 31, pg: 5, bono: 2, ref: 'meenlock' },
      { nombre: 'Meenlock 2', ca: 15, pgMax: 31, pg: 0, bono: 2, ref: 'meenlock' },
      { nombre: 'Lobo (de Elho)', ca: 13, pgMax: 11, pg: 11, bono: 0, aliado: true },
    ]);
    assert.deepEqual(sob.map(m => [m.nombre, m.pg]), [['Meenlock 1', 5]]);
    const enc = [base('Bosque', { sobrevivientes: sob }), base('Final', { vuelvenDe: 'bosque' })];
    assert.deepEqual(regresanA(enc[1], enc).map(m => [m.nombre, m.pg, m.pgMax]), [['Meenlock 1', 5, 31]]);
    assert.deepEqual(regresanA(enc[0], enc), []);
  });
  test('al reimportar, el combate conserva su vínculo y sus sobrevivientes', () => {
    const viejos = [base('Final', { vuelvenDe: 'Bosque', sobrevivientes: [] })];
    assert.equal(conservarVinculos([base('final')], viejos)[0].vuelvenDe, 'Bosque');
  });
  test('un combate recibe de varios combates, y quien ya volvió no entra dos veces', () => {
    const s1 = (nombre: string) => ({ nombre, ca: 12, pgMax: 20, pg: 8, bono: 0 });
    const enc = [
      base('Laberinto', { sobrevivientes: [s1('Tiris')] }),
      base('Pueblo', { sobrevivientes: [s1('Oren'), s1('Maddock')] }),
      base('Cueva', { vuelvenDe: 'Pueblo' }),
      base('Final', { vuelvenDe: ['laberinto', 'Pueblo'] }),
    ];
    assert.deepEqual(regresanA(enc[3], enc).map(m => [m.nombre, m.vieneDe]), [['Tiris', 'Laberinto'], ['Oren', 'Pueblo'], ['Maddock', 'Pueblo']]);
    marcarRegresados(enc[2], enc);
    assert.deepEqual(regresanA(enc[3], enc).map(m => m.nombre), ['Tiris']);
    assert.deepEqual(regresanA(enc[2], enc).map(m => m.nombre), ['Oren', 'Maddock']);
  });
});

describe('Combates vinculados desde el archivo', () => {
  test('JSON y CSV: "vuelvenDe" vincula el combate con otro de la sesión', () => {
    const j = leerSesion(JSON.stringify({ combates: [
      { nombre: 'Bosque', enemigos: [{ monstruo: 'Goblin Warrior' }] },
      { nombre: 'Final', vuelvenDe: 'Bosque', enemigos: [{ monstruo: 'Goblin Boss' }] },
    ] }), 's.json', CAT);
    assert.deepEqual(j.encuentros.map(e => e.vuelvenDe), [undefined, ['Bosque']]);
    const c = leerSesion('combate;enemigo;cantidad;vuelvenDe\nBosque;Goblin Warrior;2;\nFinal;Goblin Boss;1;Bosque\n', 's.csv', CAT);
    assert.deepEqual(c.encuentros.find(e => e.nombre === 'Final')?.vuelvenDe, ['Bosque']);
  });
  test('JSON y CSV: "vuelvenDe" admite varios combates', () => {
    const j = leerSesion(JSON.stringify({ combates: [
      { nombre: 'Final', vuelvenDe: ['Bosque', 'Pueblo', 'bosque'], enemigos: [{ monstruo: 'Goblin Boss' }] },
    ] }), 's.json', CAT);
    assert.deepEqual(j.encuentros[0].vuelvenDe, ['Bosque', 'Pueblo']);
    const c = leerSesion('combate;enemigo;cantidad;vuelvenDe\nFinal;Goblin Boss;1;Bosque | Pueblo\nFinal;Goblin Warrior;2;Cueva\n', 's.csv', CAT);
    assert.deepEqual(c.encuentros[0].vuelvenDe, ['Bosque', 'Pueblo', 'Cueva']);
  });
  test('al reimportar, el vínculo del archivo manda sobre el elegido en la app', () => {
    const viejo = [{ id: 'x', nombre: 'Final', enemigos: [], vuelvenDe: 'Otro' }];
    assert.equal(conservarVinculos([{ id: 'y', nombre: 'Final', enemigos: [], vuelvenDe: 'Bosque' }], viejo)[0].vuelvenDe, 'Bosque');
  });
});
