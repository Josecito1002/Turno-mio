# Encargo: Lote 9 (Druida) de la app "Mi turno"

Eres un asistente de investigación de reglas de D&D 5.ª edición revisada (2024). "Mi turno" es una app de hojas de
personaje en español. Tu trabajo: revisar todo lo que la app tiene de la clase **Druida** contra la versión oficial más
reciente y devolver los datos corregidos en el formato de abajo. No escribes código de la app: otra persona revisa y
aplica tu respuesta, así que la precisión importa más que la extensión.

## Reglas del encargo

1. **Versión más reciente siempre.** Usa el Manual del Jugador 2024 y, para lo que no esté ahí, la publicación oficial
   más nueva (libros de 2025 y 2026 como Forgotten Realms: Heroes of Faerûn, Eberron: Forge of the Artificer, Ravenloft:
   The Horrors Within, o Unearthed Arcana/Arcana Unleashed si es lo único que existe; dilo en ese caso). Las revisiones
   de la comunidad no cuentan.
2. **Subclases antiguas sin versión 2024** (Xanathar, Tasha, Sword Coast...): se conservan, pero sus rasgos se mueven a
   los niveles de subclase de la clase 2024 (por ejemplo, lo de nivel 1 o 2 pasa al 3). Di en las notas qué moviste.
3. **Textos propios en español**, cortos (1 a 3 frases), escritos por ti. Nunca copies ni traduzcas literal el texto
   del libro. Nombres de rasgos y conjuros: la traducción oficial al español si existe, con el inglés entre paréntesis
   la primera vez que aparezca un conjuro, por ejemplo "Paso brumoso (Misty Step)".
4. **No inventes.** Si no puedes confirmar un dato (un número, un nivel, un nombre), escríbelo igual con la marca
   **[NO CONFIRMADO]** y di por qué.
5. **Antes de agregar algo nuevo**, comprueba que no esté ya en la app con otro nombre (lista de abajo).
6. Tipos de acción válidos para `t`: accion, adicional (acción adicional), reaccion, gratis (sin acción, por ejemplo
   al acertar), pasiva, fuera (fuera de combate o ritual).

## Qué devolver (en este orden, cada parte en su bloque de código)

**A. Datos** (TypeScript, archivo `scripts/datos/druida-2024.ts`). Este formato exacto:

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const DRUIDA_2024 = {
  // Rasgos de la clase de nivel 6 a 20 (los de nivel 1 a 5 ya los tiene la app)
  rasgosAltos: [
    r(9, 'Nombre del rasgo', 'accion', 'Texto propio.', { usos: 1, reset: 'largo' }),  // usos/reset solo si tiene usos fijos
  ],
  // Rasgos de nivel 6 en adelante de las subclases que la app trae integradas (clave: ninguna)
  subAltos: {
    clave: [ r(6, '...', 'pasiva', '...') ],
  },
  // Todas las demás subclases, completas (nivel 3 a 20). Clave en minúsculas-con-guiones.
  subclases: {
    'clave-nueva': { n: 'Nombre en español', rasgos: [ r(3, '...', 'pasiva', '...') ] },
  },
};
```

Los conjuros siempre preparados de una subclase van en un rasgo llamado "Conjuros del/de la <subclase>" cuyo texto diga
solo que se amplían en tales niveles; la lista completa va en la parte B.

**B. Mecánicas** (JSON). Una entrada por cada cosa que la app debe calcular o dejar elegir. Fórmulas con estas
variables: `nivel` (de la clase), `pb` (bonificador por competencia), `FUE DES CON INT SAB CAR` (modificadores),
`CD` y `ataqueConjuro`.

```json
[
  { "donde": "clase | clave de subclase", "rasgo": "Nombre del rasgo", "tipo": "usos", "usos": "max(1, SAB)", "reset": "largo | corto | corto desde nivel X" },
  { "donde": "...", "rasgo": "...", "tipo": "dado", "dado": "1d8; 2d8 desde nivel 10" },
  { "donde": "...", "rasgo": "...", "tipo": "ataque", "ataque": "ataqueConjuro", "alcance": "30 pies", "daño": "1d8 + SAB frío" },
  { "donde": "...", "rasgo": "...", "tipo": "ca | velocidad | vision | resistencia | competencia | pg", "detalle": "fórmula o valor" },
  { "donde": "...", "rasgo": "...", "tipo": "eleccion", "id": "id-corto", "cuantas": "2; 3 desde nivel 10",
    "opciones": [ { "key": "id-corto", "nombre": "...", "desc": "qué hace, 1 frase propia", "nivel": 1, "requiere": "key de otra opción o null" } ] },
  { "donde": "...", "rasgo": "Conjuros del ...", "tipo": "conjuros", "por_nivel": { "3": ["Bendecir (Bless)"], "5": [], "7": [], "9": [] } }
]
```

**C. Fuentes** (JSON): `{ "Nombre de subclase": "Libro (año)" }` para cada subclase, incluidas las integradas.

**D. Descripciones** (JSON): `{ "clave": "1 o 2 frases propias que presenten la subclase a quien no la conoce" }`.

**E. Notas** (lista): por cada rasgo o subclase que cambiaste, qué versión usaste y en qué difería lo que tenía la app.
Incluye lo que no se agrega y por qué (reemplazado en 2024, duplicado con otro nombre, sin versión vigente).
Si algo de lo integrado en la app (rasgos de clase de nivel 1 a 5, o los primeros niveles de las subclases
integradas) está mal, no lo metas en A: escribe aquí el rasgo, qué está mal y el texto corregido.

## Lo que tiene hoy la app

### Clase Druida, niveles 1 a 5 (integrados en la app)
- Nivel 1 · Orden Primordial [pasiva]: Mago (un truco más y +SAB a Arcanos o Naturaleza) o Guardián (armaduras medias y armas marciales).
- Nivel 1 · Druídico [pasiva]: Hablas druídico y siempre tienes preparado Hablar con los animales.
- Nivel 2 · Forma Salvaje [adicional]: Te transformas en una bestia que conozcas (VD 1) durante 10 hora(s) y ganas 20 PG temporales. Volver es acción adicional.
- Nivel 2 · Compañero Salvaje [accion]: Lanzas Encontrar familiar sin componentes materiales; dura hasta tu próximo descanso largo.
- Nivel 5 · Resurgir Salvaje [gratis]: Una vez por turno, sin usos de Forma Salvaje, gastas un espacio para recuperar uno. Una vez por descanso largo, gastas un uso de Forma Salvaje para recuperar un espacio de nivel 1.


### Rasgos de nivel alto de la clase (biblioteca)
- Nivel 7 · Furia Elemental [pasiva]: Elige: Golpe Potente (+1d8 daño en ataques con arma/bestia) o Lanzamiento Potente (Suma SAB a trucos).
- Nivel 20 · Archidruida [gratis]: Recuperas uso de Forma Salvaje al tirar iniciativa. Envejeces más lento. Puedes convertir usos de Forma Salvaje en espacios de conjuro.

### Círculo de la Tierra (biblioteca, clave `circulo-tierra`)
- Nivel 3 · Recuperación Natural [pasiva]: En descanso corto, recuperas espacios de conjuro (niveles sumados = mitad nivel druida).
- Nivel 3 · Conjuros de Círculo [pasiva]: Aprendes conjuros temáticos según tu terreno (Desierto, Ártico, etc.).
- Nivel 6 · Zancada de la Tierra [pasiva]: Terreno difícil no te cuesta movimiento extra.
- Nivel 10 · Protección de la Naturaleza [pasiva]: Inmune a veneno, enfermedad y ser hechizado/asustado por elementales/hadas.

### Círculo de la Luna (biblioteca, clave `circulo-luna`)
- Nivel 3 · Forma de Combate [adicional]: Transformación como acción adicional. VR superior para tus formas.
- Nivel 6 · Golpes Primigenios [pasiva]: Tus ataques en forma salvaje cuentan como mágicos.
- Nivel 10 · Paso de Luz Lunar [adicional]: Como Acción Adicional, te teletransportas hasta 30 pies y obtienes Ventaja en tu próximo ataque.
- Nivel 14 · Mil Formas [pasiva]: Puedes lanzar Alterar el Propio Cuerpo a voluntad.

### Círculo del Mar (biblioteca, clave `circulo-mar`)
- Nivel 3 · Ira de la Marea [pasiva]: Tu forma salvaje emite un aura de 10 pies que inflige daño de Frío o Rayo y puede empujar enemigos.
- Nivel 6 · Capa de Niebla [reaccion]: Reacción para ganar resistencia al daño de un ataque y teletransportarte en una nube de vapor.
- Nivel 10 · Marea Creciente [pasiva]: Tu aura aumenta en radio y potencia de daño.
- Nivel 14 · Unión con el Océano [pasiva]: Ganas velocidad de nado, respiración acuática y mejoras críticas en tu aura.

### Círculo de las Estrellas (biblioteca, clave `circulo-estrellas`)
- Nivel 2 · Mapa Estelar [pasiva]: Foco que te da Guía y Proyectil Mágico gratis.
- Nivel 2 · Forma Estelar [adicional]: Gasta uso de forma para brillar. Elige: Arquero (ataque luz acción adicional), Cáliz (curación extra), Dragón (mantiene concentración).
- Nivel 6 · Augurio Cósmico [pasiva]: Tira un dado para sumar (Bienaventuranza) o restar (Aflicción) a tiradas de otros.
- Nivel 14 · Luminosidad Completa [pasiva]: Ganas resistencia a daño físico en forma estelar y puedes cambiar de constelación cada turno.

## Pendientes de este lote en la revisión (selectores por hacer, subclases que faltan respecto a D&D Beyond, rasgos dudosos)

(Selectores)
#### Lote 9: Druida

- [ ] **Furia Elemental (nivel 7)**: Golpe Primigenio o Lanzamiento Potente.
- [ ] **Círculo de la Tierra: tipo de tierra**: Árida, Polar, Templada o Tropical; decide los conjuros siempre preparados.

(Por agregar (faltan respecto a D&D Beyond))
#### Lote 9: Druida

- [ ] **Círculo de los Sueños** (Xanathar's Guide to Everything)
- [ ] **Círculo del Pastor** (Xanathar's Guide to Everything)
- [ ] **Círculo de las Esporas** (Tasha's Cauldron of Everything)
- [ ] **Círculo del Fuego Salvaje** (Tasha's Cauldron of Everything)

#### Lote 9: Druida (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 14. Con tipo claro: 4. Ya revisados: 0.

#### Druida

- [ ] **Furia Elemental** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Archidruida** (nivel 20): hoy `gratis`, no menciona tipo de acción

#### Círculo de la Tierra

- [ ] **Recuperación Natural** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Conjuros de Círculo** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Zancada de la Tierra** (nivel 6): hoy `pasiva`, no menciona tipo de acción
- [ ] **Protección de la Naturaleza** (nivel 10): hoy `pasiva`, no menciona tipo de acción

#### Círculo de la Luna

- [ ] **Golpes Primigenios** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Mil Formas** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Círculo del Mar

- [ ] **Ira de la Marea** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Marea Creciente** (nivel 10): hoy `pasiva`, no menciona tipo de acción
- [ ] **Unión con el Océano** (nivel 14): hoy `pasiva`, no menciona tipo de acción

#### Círculo de las Estrellas

- [ ] **Mapa Estelar** (nivel 2): hoy `pasiva`, no menciona tipo de acción
- [ ] **Augurio Cósmico** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Luminosidad Completa** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
