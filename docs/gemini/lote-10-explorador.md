# Encargo: Lote 10 (Explorador) de la app "Mi turno"

Eres un asistente de investigación de reglas de D&D 5.ª edición revisada (2024). "Mi turno" es una app de hojas de
personaje en español. Tu trabajo: revisar todo lo que la app tiene de la clase **Explorador** contra la versión oficial más
reciente y devolver los datos corregidos en el formato de abajo. No escribes código de la app: otra persona revisa y
aplica tu respuesta, así que la precisión importa más que la extensión.

## Reglas del encargo

1. **Versión más reciente siempre.** Usa el Manual del Jugador 2024 y, para lo que no esté ahí, la publicación oficial
   más nueva (libros de 2025 y 2026 como Forgotten Realms: Heroes of Faerûn, Eberron: Forge of the Artificer, Ravenloft:
   The Horrors Within, o Unearthed Arcana/Arcana Unleashed si es lo único que existe; dilo en ese caso). Las revisiones
   de la comunidad no cuentan. **Nunca cambies algo por una versión más vieja**: lo que tiene la app puede venir ya de
   un libro de 2025 o 2026. Antes de dar por buena una versión de 2014 a 2020, busca si Heroes of Faerûn (2025),
   Ravenloft: The Horrors Within (2026) o Arcana Unleashed (2026) sacaron una versión nueva de esa subclase.
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

**A. Datos** (TypeScript, archivo `scripts/datos/explorador-2024.ts`). Este formato exacto:

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const EXPLORADOR_2024 = {
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

### Clase Explorador, niveles 1 a 5 (integrados en la app)
- Nivel 1 · Marca del Cazador [adicional]: Siempre preparada (concentración, 1 hora): +1d6 de fuerza al golpear a la criatura marcada, y ventaja en Percepción o Supervivencia para encontrarla.
- Nivel 1 · Maestría con Armas [pasiva]: Usas la maestría de 2 tipos de armas (elígelas en Equipo). Puedes cambiarlas en cada descanso largo.
- Nivel 2 · Explorador Hábil [pasiva]: Pericia en una habilidad (elígela en Habilidades) y dos idiomas más.
- Nivel 5 · Ataque Extra [pasiva]: Cuando usas la acción Atacar, atacas dos veces.


### Rasgos de nivel alto de la clase (biblioteca)
- Nivel 6 · Errante [pasiva]: Tu velocidad aumenta 10 pies. Ganas velocidad de Trepar y Nadar.
- Nivel 10 · Incansable [pasiva]: Acción para ganar PG temporales (1d8 + SAB). Reduce nivel de agotamiento en Descanso Corto.
- Nivel 14 · Velo de la Naturaleza [adicional]: Acción Adicional para volverte Invisible hasta el final de tu siguiente turno.
- Nivel 10 · Ocultarse a Plena Vista [pasiva]: Camuflaje que te da +10 a Sigilo si no te mueves.
- Nivel 20 · Cazador de Enemigos [pasiva]: El daño de tu Marca del Cazador aumenta de 1d6 a 1d10.

### Cazador (biblioteca, clave `cazador`)
- Nivel 3 · Presa del Cazador [reaccion]: Elige Coloso Matador (+1d8 daño), Asesino de Gigantes (reacción para atacar) o Cazador de Hordas (ataque extra a otro objetivo).
- Nivel 7 · Tácticas Defensivas [pasiva]: Evasión contra ataques de área o defensa contra multiataques.
- Nivel 11 · Multiataque del Cazador [pasiva]: Aprendes el conjuro Conjurar Descarga y puedes lanzarlo con espacios de menor nivel.
- Nivel 15 · Defensa Superior [pasiva]: Esquiva asombrosa o mantenerse en pie tras golpes fatales.

### Maestro de Bestias (biblioteca, clave `bestias`)
- Nivel 3 · Compañero del Explorador [pasiva]: Invocas un espíritu animal (Tierra, Mar o Aire) que actúa en tu turno.
- Nivel 7 · Entrenamiento Excepcional [pasiva]: Tu bestia puede hacer acciones adicionales y sus ataques son mágicos.
- Nivel 11 · Furia de Bestia [pasiva]: Tu compañero puede hacer dos ataques.
- Nivel 15 · Compartir Conjuros [pasiva]: Cuando te lanzas un conjuro, también afecta a tu bestia.

### Caminante de las Hadas (biblioteca, clave `hadas`)
- Nivel 3 · Ataque Pavoroso [pasiva]: +1d4 daño psíquico a tus ataques.
- Nivel 3 · Magia Feérica [pasiva]: Aprendes conjuros como Sonrisa de Tasha y Paso Brumoso.
- Nivel 7 · Giro Etéreo [pasiva]: Si alguien falla una salvación contra encanto/miedo cerca de ti, puedes intentar encantar a otro.
- Nivel 15 · Paso Nebuloso [pasiva]: Puedes teletransportarte y llevar aliados contigo varias veces al día.

### Acechador de las Sombras (biblioteca, clave `sombras`)
- Nivel 3 · Emboscador Temible [pasiva]: Sumas SAB a Iniciativa. +10 velocidad en primer turno. Puedes infligir daño extra (2d6?) en ataques varias veces al día.
- Nivel 3 · Vista Umbría [pasiva]: Visión en la oscuridad 60 pies. Eres invisible para criaturas que dependen de visión oscura.
- Nivel 7 · Mente de Hierro [pasiva]: Competencia en salvaciones de Sabiduría.
- Nivel 11 · Ráfaga del Acechador [pasiva]: Si fallas un ataque, puedes hacer otro inmediatamente.

### Caminante del Invierno (biblioteca, clave `caminante-invierno`)
- Nivel 3 · Explorador Gélido [gratis]: Obtienes los siguientes beneficios. Frío Mordiente: el daño de tus ataques con arma, conjuros de Explorador y rasgos de Explorador ignora la Resistencia al daño de Frío. Resistencia a la Escarcha: tienes Resistencia al daño de Frío. Golpes Polares: cuando golpeas a una criatura con una tirada de ataque usando un arma, puedes infligir 1d4 de daño de Frío adicional al objetivo, que solo puede recibir este daño adicional una vez por turno. Cuando alcanzas el nivel 11 de Explorador, este daño adicional aumenta a 1d6.
- Nivel 3 · Escarcha del Cazador [pasiva]: El hielo te cubre a ti y a tu presa, protegiéndote y obstaculizándola. Cuando lanzas Marca del Cazador, obtienes Puntos de Golpe temporales iguales a 1d10 + tu nivel de Explorador. Además, mientras una criatura esté marcada por tu Marca del Cazador, no puede usar la acción de Destrabarse.
- Nivel 3 · Conjuros del Caminante del Invierno [pasiva]: Cuando alcanzas un nivel de Explorador indicado en la tabla Conjuros del Caminante del Invierno, a partir de ese momento siempre tienes preparados los conjuros indicados. Nivel 3: Cuchillo de Hielo. Nivel 5: Inmovilizar Persona. Nivel 9: Quitar Maldición. Nivel 13: Tormenta de Hielo. Nivel 17: Cono de Frío.
- Nivel 7 · Alma Fortalecedora [accion]: Tu experiencia sobreviviendo entornos angustiosos te permite reforzar a tus aliados además de a ti mismo. Como acción Mágica, elige un número de criaturas que puedas ver igual a tu modificador de Sabiduría (mínimo una). Cada criatura elegida recupera Puntos de Golpe iguales a 1d10 + tu nivel de Explorador y tiene Ventaja en tiradas de salvación para evitar o terminar el estado Asustado durante 1 hora.
- Nivel 11 · Alma Congelada [pasiva]: Tu esencia se vuelve gélida, otorgándote los siguientes beneficios. Alma Helada: tienes Inmunidad al daño de Frío. Cuando adoptas esta forma por primera vez y al inicio de cada uno de tus turnos siguientes, cada criatura de tu elección en una emanación de 15 pies originada en ti recibe 2d4 de daño de Frío. Parcialmente Incorpóreo: tienes Inmunidad a los estados Agarrado, Derribado y Apresado. Puedes atravesar criaturas y objetos como si fueran Terreno Difícil, pero recibes 1d10 de daño de Fuerza si terminas tu turno dentro de una criatura o un objeto. Si la forma termina mientras estás dentro de una criatura u objeto, eres expulsado al espacio desocupado más cercano.

## Pendientes de este lote en la revisión (selectores por hacer, subclases que faltan respecto a D&D Beyond, rasgos dudosos)

(Selectores)
#### Lote 10: Explorador

- [ ] **Cazador: Presa del Cazador y Tácticas Defensivas**: Asesino de Colosos o Rompehordas (nivel 3) y su defensa (nivel 7); se cambian en un descanso.
- [ ] **Maestro de Bestias: bestia primigenia**: de tierra, de mar o del cielo; cambia sus estadísticas y su ataque.

(Por agregar (faltan respecto a D&D Beyond))
#### Lote 10: Explorador

- [ ] **Trotamundos del Horizonte** (Xanathar's Guide to Everything)
- [ ] **Cazador de Monstruos** (Xanathar's Guide to Everything)
- [ ] **Guardián del Enjambre** (Tasha's Cauldron of Everything)
- [ ] **Guardián Dracónico** (Fizban's Treasury of Dragons)

#### Lote 10: Explorador (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 21. Con tipo claro: 5. Ya revisados: 0.

#### Explorador

- [ ] **Errante** (nivel 6): hoy `pasiva`, no menciona tipo de acción
- [ ] **Ocultarse a Plena Vista** (nivel 10): hoy `pasiva`, no menciona tipo de acción
- [ ] **Cazador de Enemigos** (nivel 20): hoy `pasiva`, no menciona tipo de acción

#### Cazador

- [ ] **Tácticas Defensivas** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Multiataque del Cazador** (nivel 11): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Defensa Superior** (nivel 15): hoy `pasiva`, no menciona tipo de acción

#### Maestro de Bestias

- [ ] **Compañero del Explorador** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Entrenamiento Excepcional** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse
- [ ] **Furia de Bestia** (nivel 11): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Compartir Conjuros** (nivel 15): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Caminante de las Hadas

- [ ] **Ataque Pavoroso** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Magia Feérica** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Giro Etéreo** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Paso Nebuloso** (nivel 15): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Acechador de las Sombras

- [ ] **Emboscador Temible** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Vista Umbría** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Mente de Hierro** (nivel 7): hoy `pasiva`, no menciona tipo de acción
- [ ] **Ráfaga del Acechador** (nivel 11): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Caminante del Invierno

- [ ] **Escarcha del Cazador** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse
- [ ] **Conjuros del Caminante del Invierno** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Alma Congelada** (nivel 11): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
