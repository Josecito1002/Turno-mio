import { test } from 'node:test';
import assert from 'node:assert/strict';
import { frases, paraOir, trozos } from './oir';
import { guiaAGuion } from './guion';
import { lineasAMarkdown } from './pdf-texto';

test('paraOir dice enteras las abreviaturas del manual', () => {
  assert.equal(paraOir('Fuerza (Atletismo) CD 15.'), 'Fuerza, Atletismo, dificultad 15.');
  assert.equal(paraOir('CA 16 y 37 PG'), 'clase de armadura 16 y 37 puntos de golpe');
  assert.equal(paraOir('*Impacto:* 11 (2d6 + 4) de daño'), 'Impacto: 11, 2 de 6 más 4, de daño');
  assert.equal(paraOir('una tabla d6'), 'una tabla de 6');
  assert.equal(paraOir('un anillo (25 po)'), 'un anillo, 25 piezas de oro');
  assert.equal(paraOir('Valor de desafío 5 (1.800 PX)'), 'Valor de desafío 5, 1800 puntos de experiencia');
  assert.equal(paraOir('La puerta da a A3; la escalera a T15 y A3a.'), 'La puerta da a a 3; la escalera a te 15 y a 3 a.');
  assert.equal(paraOir('+2 a FUE, −4 a la CA'), 'más 2 a fuerza, menos 4 a la clase de armadura');
  assert.equal(paraOir('Des +5, Con +6'), 'destreza más 5, constitución más 6');
  assert.equal(paraOir('**Ilmar** dice: «Ya se lo dije.» *(Es mentira.)*'), 'Ilmar dice: Ya se lo dije. Es mentira.');
  assert.equal(paraOir('35–40 % · 2.5 cm'), '35 a 40 por ciento, 2.5 centímetros');
  assert.equal(paraOir('Desafío 1/4'), 'Desafío un cuarto');
});

test('frases y trozos', () => {
  assert.deepEqual(frases('Hola. ¿Qué tal? Bien, 15 veces.'), ['Hola.', '¿Qué tal?', 'Bien, 15 veces.']);
  assert.deepEqual(trozos(['aaaa.', 'bbbb.', 'cccc.'], 11), ['aaaa. bbbb.', 'cccc.']);
});

const GUIA = `# La campaña · Sesión 5: El valle

## Antes de jugar

*Lo que pasa en esta sesión.*

| Hora | Escena | Zona |
|---|---|---|
| 0:00 | 1. La llegada | A1 |

## La mansión

### Explorando el lugar

#### A3. Comedor

**Puerta:** abierta. **Botín:** nada.

> **RELOJ DE PARED · De 0:15 a 0:45**
> **Deberías ir:** sentados a la mesa.

> **LEER EN VOZ ALTA · El comedor**
> Una mesa larga, puesta para doce.
> **Si lo cuentas con tus palabras:** la comida caliente.

![El comedor](https://x/y.png)

\`\`\`
prompt de imagen
\`\`\`

- **Salidas.** Al norte, A4.

## Apéndice A: Estadísticas

#### Lobo terrible

*Bestia Grande, sin alineamiento*

**Clase de Armadura** 14 (armadura natural) · **Puntos de golpe** 37 (5d10 + 10) · **Velocidad** 50 pies

| FUE | DES | CON | INT | SAB | CAR |
|---|---|---|---|---|---|
| 17 (+3) | 15 (+2) | 15 (+2) | 3 (−4) | 12 (+1) | 7 (−2) |

**Sentidos** Percepción pasiva 13 · **Valor de desafío** 1 (200 PX)

***Olfato agudo.*** Ventaja en las pruebas.

***Mordisco.*** *Ataque cuerpo a cuerpo:* +5 al ataque, alcance 5 pies. *Impacto:* 10 (2d6 + 3) de daño perforante.

## Apéndice C: Mapas

### La mansión

Texto que no se lee.

## Apéndice E: Fichas de objeto

### Una espada

Tampoco se lee.
`;

test('guiaAGuion: índice por capítulos y zonas, recuadros anunciados, lo que no se oye fuera', () => {
  const g = guiaAGuion(GUIA);
  assert.equal(g.titulo, 'La campaña · Sesión 5: El valle');
  assert.deepEqual(g.secciones.map((s) => [s.nivel, s.titulo]), [
    [1, 'Antes de jugar'], [1, 'La mansión'], [2, 'Explorando el lugar'], [3, 'A3. Comedor'],
    [1, 'Apéndice A: Estadísticas'], [3, 'Lobo terrible'],
  ]);
  const texto = (n: number) => g.secciones[n].trozos.join(' ');
  assert.match(texto(0), /^Capítulo: Antes de jugar\. Lo que pasa en esta sesión\. 0:00\. Escena: 1\. La llegada\. Zona: a 1\.$/);
  const comedor = texto(3);
  assert.match(comedor, /^a 3\. Comedor\. Puerta: abierta\. Botín: nada\. Para leer en voz alta: El comedor\. Una mesa larga, puesta para doce\. Si lo cuentas con tus palabras: la comida caliente\. Salidas\. Al norte, a 4\.$/);
  assert.doesNotMatch(comedor, /Deberías|prompt/);
  assert.equal(texto(5), 'Lobo terrible. Bestia Grande, sin alineamiento. Clase de armadura 14, 37 puntos de golpe, velocidad 50 pies. Valor de desafío 1. Rasgos: Olfato agudo. Mordisco: más 5 al ataque, 10 de daño perforante.');
});

test('lineasAMarkdown: títulos por tamaño de letra, zonas, capitulares y pies de página fuera', () => {
  const L = (texto: string, alto: number, y: number, pagina: number) => ({ texto, alto, y, pagina });
  const lineas = [
    L('MI GUÍA', 30, 700, 1),
    ...[2, 3, 4, 5].flatMap((p) => [
      L(`CAPÍTULO ${p}`, 20, 700, p),
      L('A', 40, 660, p),
      L('ntes de entrar, el olor a', 10, 660, p),
      L('humo lo cubre todo.', 10, 648, p),
      L(`A${p}. Comedor`, 10, 600, p),
      L('Una mesa larga.', 10, 588, p),
      L('El Precio de los Deseos', 8, 20, p),
      L(String(p), 8, 10, p),
    ]),
  ];
  const md = lineasAMarkdown(lineas);
  assert.match(md, /^# Mi guía\n/);
  assert.match(md, /## Capítulo 2\n\nAntes de entrar, el olor a humo lo cubre todo\.\n\n#### A2\. Comedor\n\nUna mesa larga\./);
  assert.doesNotMatch(md, /Precio de los Deseos|^\d+$/m);
});
