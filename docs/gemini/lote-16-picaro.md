# Encargo: Lote 16 (Pícaro) de la app "Mi turno"

Eres un asistente de investigación de reglas de D&D 5.ª edición revisada (2024). "Mi turno" es una app de hojas de
personaje en español. Tu trabajo: revisar todo lo que la app tiene de la clase **Pícaro** contra la versión oficial más
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

**A. Datos** (TypeScript, archivo `scripts/datos/picaro-2024.ts`). Este formato exacto:

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const PICARO_2024 = {
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

### Clase Pícaro, niveles 1 a 5 (integrados en la app)
- Nivel 1 · Ataque Furtivo [gratis]: Una vez por turno, al golpear con arma Sutil o a distancia teniendo ventaja (o con un aliado a 5 pies del objetivo): +10d6 de daño.
- Nivel 1 · Pericia [pasiva]: Doble competencia en 2 habilidades (elígelas en Habilidades).
- Nivel 1 · Maestría con Armas [pasiva]: Usas la maestría de 2 tipos de armas (elígelas en Equipo). Puedes cambiarlas en cada descanso largo.
- Nivel 1 · Jerga de Ladrones [pasiva]: Conoces la jerga de ladrones y un idioma más.
- Nivel 2 · Acción Astuta [adicional]: Correr, Destrabarse o Esconderse.
- Nivel 3 · Puntería Firme [adicional]: Si no te has movido este turno, ventaja en tu siguiente ataque; tu velocidad queda en 0 este turno.
- Nivel 5 · Golpe Astuto [gratis]: Al hacer Ataque Furtivo puedes quitar dados para: Veneno (1d6, salvación de CON CD 17 o Envenenado 1 minuto), Tropiezo (1d6, salvación de DES o Derribado) o Retirada (1d6, te mueves la mitad de tu velocidad sin ataques de oportunidad).
- Nivel 5 · Esquiva Asombrosa [reaccion]: Cuando un atacante que ves te golpea, reduces a la mitad el daño de ese ataque.


### Rasgos de nivel alto de la clase (biblioteca)
- Nivel 7 · Evasión [pasiva]: En efectos de área de DES, si pasas la salvación recibes 0 daño, y si fallas, solo la mitad.
- Nivel 7 · Talento Fiable [pasiva]: Tiradas de 9 o menos en el d20 en habilidades/herramientas con competencia se vuelven un 10.
- Nivel 11 · Golpe Astuto Mejorado [pasiva]: Puedes usar hasta dos opciones de Golpe Astuto en un solo ataque.
- Nivel 14 · Golpe Astuto Taimado [pasiva]: Nuevas opciones de Golpe Astuto (coste 2d6): Atontar, Cegar, Inconsciente (6d6).
- Nivel 20 · Golpe de Suerte [pasiva]: Si fallas un ataque o prueba, puedes convertirlo en un éxito automático (1/descanso).

### Embaucador Arcano (biblioteca, clave `embaucador`)
- Nivel 3 · Lanzamiento de Conjuros [pasiva]: Usa Inteligencia. Conjuros de Mago (Ilusión/Encantamiento).
- Nivel 3 · Mano de Mago Legeramente [pasiva]: Tu mano de mago es invisible y puede robar o desactivar trampas.
- Nivel 9 · Emboscada Mágica [pasiva]: Si lanzas conjuro estando escondido, el enemigo tiene desventaja en la salvación.
- Nivel 17 · Ladrón de Conjuros [reaccion]: Reacción para anular un conjuro enemigo y aprender a lanzarlo tú mismo.

### Asesino (biblioteca, clave `asesino`)
- Nivel 3 · Asesinar [pasiva]: Ventaja en Iniciativa. Ventaja en ataques contra criaturas que no han actuado. El primer golpe contra ellas inflige daño extra igual a tu Nivel de Pícaro.
- Nivel 3 · Competencia en Infiltración [pasiva]: Competencia con kit de disfraz y venenos.
- Nivel 9 · Maestro de la Suplantación [pasiva]: Puedes crear identidades falsas perfectas.
- Nivel 17 · Golpe Mortal [gratis]: Al golpear por sorpresa, el daño puede duplicarse si fallan salvación CON.

### Cuchillo Mental (biblioteca, clave `cuchillo-mental`)
- Nivel 3 · Hojas Psiónicas [pasiva]: Creas dagas de energía mental que desaparecen tras impactar.
- Nivel 3 · Poder Psiónico [pasiva]: Dados de energía para telepatía y mejorar pruebas de habilidad.
- Nivel 9 · Hojas de Rastreo [pasiva]: Tus dagas psíquicas pueden teletransportarte o buscar objetivos.
- Nivel 17 · Velo Psíquico [pasiva]: Invisibilidad total por 1 hora.

### Ladrón (biblioteca, clave `ladron`)
- Nivel 3 · Manos Rápidas [adicional]: Usa objetos o herramientas de ladrón como acción adicional.
- Nivel 3 · Trabajo en Segundo Piso [pasiva]: Velocidad de trepar igual a tu velocidad normal.
- Nivel 13 · Usar Objeto Mágico [pasiva]: Ignoras requisitos de clase/raza para usar objetos mágicos.
- Nivel 17 · Reflejos de Ladrón [pasiva]: Tienes dos turnos en el primer asalto del combate.

### Fantasma (biblioteca, clave `fantasma`)
- Nivel 3 · Susurros de los Muertos [pasiva]: Los ecos de aquellos que han muerto se aferran a ti. Cada vez que terminas un Descanso Corto o Largo, puedes obtener una competencia en una habilidad o herramienta a tu elección, mientras una presencia fantasmal comparte su conocimiento contigo. Pierdes esta competencia cuando usas este rasgo para elegir una competencia diferente de la que carezcas.
- Nivel 3 · Lamentos de la Tumba [pasiva]: Al acercar a alguien a la tumba, puedes canalizar el poder de la muerte para dañar a otra persona también. Inmediatamente después de infligir tu daño de Ataque Furtivo a una criatura en tu turno, puedes elegir como objetivo a una segunda criatura que puedas ver a 30 pies o menos de la primera. Tira la mitad del número de dados de Ataque Furtivo correspondientes a tu nivel (redondeando hacia arriba), y la segunda criatura recibe daño necrótico igual al total de la tirada, mientras los lamentos de los muertos suenan a su alrededor por un momento. Puedes usar este rasgo una cantidad de veces igual a tu bonificador de competencia, y recuperas todos los usos gastados cuando terminas un Descanso Largo.
- Nivel 9 · Fichas de Alma [reaccion]: Cuando una vida termina en tu presencia, eres capaz de arrebatar una ficha del alma que parte, una porción de su esencia vital que toma forma física: como reacción, cuando una criatura que puedas ver muere a 30 pies o menos de ti, puedes abrir tu mano libre y hacer que aparezca allí un pequeño abalorio (una ficha de alma). El DM determina su forma. Puedes tener un máximo de fichas de alma igual a tu bonificador de competencia, y no puedes crear una mientras estés en tu máximo. Puedes usar las fichas de alma de las siguientes maneras: mientras llevas una ficha de alma contigo, tienes ventaja en tiradas de salvación contra la muerte y en tiradas de salvación de Constitución; cuando infliges daño de Ataque Furtivo en tu turno, puedes destruir una de tus fichas de alma que lleves contigo y usar inmediatamente Lamentos de la Tumba, sin gastar un uso de ese rasgo; como acción, puedes destruir una de tus fichas de alma, sin importar dónde esté, y preguntar al espíritu asociado una pregunta. El espíritu aparece y responde en un idioma que conocía en vida. No está obligado a ser veraz y responde de la forma más concisa posible.
- Nivel 13 · Caminar Fantasma [adicional]: Puedes atravesar parcialmente el reino de los muertos, volviéndote como un fantasma. Como Acción Adicional, asumes una forma espectral. Mientras estás en esta forma, tienes velocidad de vuelo de 10 pies, puedes flotar, y las tiradas de ataque contra ti tienen desventaja. También puedes moverte a través de criaturas y objetos como si fueran terreno difícil, pero recibes 1d10 de daño de Fuerza si terminas tu turno dentro de una criatura o un objeto. Permaneces en esta forma durante 10 minutos o hasta que la termines como Acción Adicional. Para volver a usar este rasgo, debes terminar un Descanso Largo o destruir una de tus fichas de alma como parte de la Acción Adicional que usas para activarlo.
- Nivel 17 · Amigo de la Muerte [pasiva]: Tu asociación con la muerte se ha vuelto tan estrecha que obtienes los siguientes beneficios. Cuando usas Lamentos de la Tumba, ahora puedes infligir el daño necrótico tanto a la primera como a la segunda criatura. Al final de un Descanso Largo, aparece una ficha de alma en tu mano si no tienes ninguna, pues los espíritus de los muertos se sienten atraídos por ti.

### Vástago de los Tres (biblioteca, clave `vastago-tres`)
- Nivel 3 · Sed de Sangre [reaccion]: Cuando un enemigo que puedas ver a 30 pies o menos de ti recibe daño y queda Malherido después de recibirlo, pero no muere de inmediato, puedes usar una Reacción y teletransportarte a un espacio desocupado que puedas ver a 5 pies o menos de ese enemigo. Luego puedes hacer un ataque cuerpo a cuerpo. Puedes usar este rasgo una cantidad de veces igual a tu modificador de Inteligencia (mínimo una), y recuperas todos los usos gastados cuando terminas un Descanso Largo.
- Nivel 3 · Lealtad Temible [pasiva]: Elige uno de los Tres Muertos: Bane, Bhaal o Myrkul. Obtienes Resistencia a un tipo de daño y la capacidad de lanzar un truco, como se detalla a continuación; Inteligencia es tu característica de lanzamiento para este truco. Cuando terminas un Descanso Largo, puedes cambiar tu elección. Bane: Resistencia a daño Psíquico y el truco Ilusión Menor. Bhaal: Resistencia a daño de Veneno y el truco Protección contra Hojas. Myrkul: Resistencia a daño Necrótico y el truco Toque Helado.
- Nivel 13 · Aura de Malevolencia [pasiva]: Irradias un poder maligno asociado con uno de los Tres Muertos. Cuando usas Sed de Sangre y te teletransportas, cada criatura de tu elección a 10 pies o menos del espacio que dejaste o del espacio de destino (a tu elección) recibe daño igual a tu modificador de Inteligencia; el tipo de daño es el mismo que la Resistencia al daño otorgada por tu elección en el rasgo Lealtad Temible. El daño infligido por este rasgo ignora la Resistencia.
- Nivel 17 · Encarnación del Terror [pasiva]: Obtienes los siguientes beneficios. Degollador: recuperas un uso gastado de Sed de Sangre cuando terminas un Descanso Corto. Intención Asesina: cuando tiras el daño de tu Ataque Furtivo, puedes tratar cualquier resultado de 1 o 2 en el dado como un 3.

### Inquisitivo (biblioteca, clave `inquisitivo`)
- Nivel 3 · Oído para el Engaño [pasiva]: Desarrollas un oído agudo para detectar mentiras. Cada vez que hagas una prueba de Sabiduría (Perspicacia) para determinar si una criatura miente, trata cualquier resultado de 7 o menos en el d20 como un 8.
- Nivel 3 · Ojo para el Detalle [adicional]: Puedes usar una Acción Adicional para hacer una prueba de Sabiduría (Percepción) para localizar una criatura u objeto escondido, o una prueba de Inteligencia (Investigación) para descubrir o descifrar pistas.
- Nivel 3 · Lucha Perspicaz [adicional]: Obtienes la capacidad de descifrar las tácticas de un oponente y desarrollar un contraataque. Como Acción Adicional, haces una prueba de Sabiduría (Perspicacia) contra una criatura que puedas ver y que no esté Incapacitada, contra una prueba de Carisma (Engaño) del objetivo. Si tienes éxito, puedes usar tu Ataque Furtivo contra ese objetivo incluso si no tienes ventaja en la tirada de ataque, pero no si tienes desventaja. Este beneficio dura 1 minuto o hasta que uses esta característica con éxito contra un objetivo diferente.
- Nivel 9 · Mirada Firme [pasiva]: Obtienes ventaja en cualquier prueba de Sabiduría (Percepción) o Inteligencia (Investigación) si no te mueves más de la mitad de tu velocidad en el mismo turno.
- Nivel 13 · Ojo Inerrante [accion]: Tus sentidos son casi imposibles de engañar. Como acción, percibes la presencia de ilusiones, cambiaformas que no están en su forma original y otra magia diseñada para engañar los sentidos a 30 pies o menos de ti, siempre que no estés Cegado ni Ensordecido. Percibes que un efecto intenta engañarte, pero no obtienes información sobre lo que está oculto ni su verdadera naturaleza. Puedes usar esta característica un número de veces igual a tu modificador de Sabiduría (mínimo una) y recuperas todos los usos gastados al terminar un Descanso Largo.
- Nivel 17 · Ojo para las Debilidades [pasiva]: Aprendes a explotar las debilidades de una criatura estudiando cuidadosamente sus tácticas y movimientos. Mientras tu rasgo Lucha Perspicaz aplique a una criatura, tu daño de Ataque Furtivo contra esa criatura aumenta en 3d6.

## Pendientes de este lote en la revisión (selectores por hacer, subclases que faltan respecto a D&D Beyond, rasgos dudosos)

(Selectores)
#### Lote 16: Pícaro

- [ ] **Vástago de los Tres: Lealtad Temible**: Bane, Bhaal o Myrkul: su resistencia y su truco.

(Por agregar (faltan respecto a D&D Beyond))
#### Lote 16: Pícaro

- [ ] **Mente Maestra** (Xanathar's Guide to Everything)
- [ ] **Espadachín** (Xanathar's Guide to Everything)
- [ ] **Explorador (Scout)** (Xanathar's Guide to Everything)

#### Lote 16: Pícaro (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 28. Con tipo claro: 8. Ya revisados: 0.

#### Pícaro

- [ ] **Evasión** (nivel 7): hoy `pasiva`, no menciona tipo de acción
- [ ] **Talento Fiable** (nivel 7): hoy `pasiva`, no menciona tipo de acción
- [ ] **Golpe Astuto Mejorado** (nivel 11): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Golpe Astuto Taimado** (nivel 14): hoy `pasiva`, no menciona tipo de acción
- [ ] **Golpe de Suerte** (nivel 20): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Embaucador Arcano

- [ ] **Lanzamiento de Conjuros** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Mano de Mago Legeramente** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Emboscada Mágica** (nivel 9): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Asesino

- [ ] **Asesinar** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Competencia en Infiltración** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Maestro de la Suplantación** (nivel 9): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Golpe Mortal** (nivel 17): hoy `gratis`, no menciona tipo de acción

#### Cuchillo Mental

- [ ] **Hojas Psiónicas** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Poder Psiónico** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Hojas de Rastreo** (nivel 9): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Velo Psíquico** (nivel 17): hoy `pasiva`, no menciona tipo de acción

#### Ladrón

- [ ] **Trabajo en Segundo Piso** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Usar Objeto Mágico** (nivel 13): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Reflejos de Ladrón** (nivel 17): hoy `pasiva`, no menciona tipo de acción

#### Fantasma

- [ ] **Susurros de los Muertos** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Lamentos de la Tumba** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Amigo de la Muerte** (nivel 17): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Vástago de los Tres

- [ ] **Lealtad Temible** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Aura de Malevolencia** (nivel 13): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Encarnación del Terror** (nivel 17): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Inquisitivo

- [ ] **Oído para el Engaño** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Mirada Firme** (nivel 9): hoy `pasiva`, no menciona tipo de acción
- [ ] **Ojo para las Debilidades** (nivel 17): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
