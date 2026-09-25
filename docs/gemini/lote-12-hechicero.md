# Encargo: Lote 12 (Hechicero) de la app "Mi turno"

Eres un asistente de investigación de reglas de D&D 5.ª edición revisada (2024). "Mi turno" es una app de hojas de
personaje en español. Tu trabajo: revisar todo lo que la app tiene de la clase **Hechicero** contra la versión oficial más
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

**A. Datos** (TypeScript, archivo `scripts/datos/hechicero-2024.ts`). Este formato exacto:

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const HECHICERO_2024 = {
  // Rasgos de la clase de nivel 7 a 20 (los de nivel 1 a 6 ya los tiene la app)
  rasgosAltos: [
    r(9, 'Nombre del rasgo', 'accion', 'Texto propio.', { usos: 1, reset: 'largo' }),  // usos/reset solo si tiene usos fijos
  ],
  // Rasgos de nivel 6 en adelante de las subclases que la app trae integradas (clave: draconico, salvaje)
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
Si algo de lo integrado en la app (rasgos de clase de nivel 1 a 6, o los primeros niveles de las subclases
integradas) está mal, no lo metas en A: escribe aquí el rasgo, qué está mal y el texto corregido.

## Lo que tiene hoy la app

### Clase Hechicero, niveles 1 a 6 (integrados en la app)
- Nivel 1 · Hechicería Innata [adicional]: Durante 1 minuto tu CD de conjuros sube a 16 y tienes ventaja en tus ataques de conjuro de hechicero.
- Nivel 2 · Crear espacio de conjuro [adicional]: Nivel 1 cuesta 2 puntos, nivel 2 cuesta 3, nivel 3 cuesta 5. Gastar un espacio para ganar puntos iguales a su nivel no ocupa acción.
- Nivel 2 · Metamagia [gratis]: Conoces 2 opciones, una por conjuro. Cuidadoso 1, Distante 1, Potenciado 1, Extendido 1, Buscador 1, Sutil 1, Transmutado 1, Duplicado 1, Intensificado 2, Acelerado 2.
- Nivel 5 · Restauración Hechicera [fuera]: Al terminar un descanso corto recuperas hasta 10 puntos de hechicería.


### Rasgos de nivel alto de la clase (biblioteca)
- Nivel 7 · Hechicería Encarnada [pasiva]: Mientras usas Hechicería Innata, puedes usar hasta 2 opciones de Metamagia en un mismo conjuro. Además recuperas usos de Hechicería Innata gastando 2 puntos.
- Nivel 20 · Apoteosis Arcana [pasiva]: Mientras usas Hechicería Innata, puedes usar una opción de Metamagia en cada turno sin gastar Puntos de Hechicería.

### Hechicería Dracónica (integrada, clave `draconico`)
- Nivel 3 · Resiliencia Dracónica [pasiva]: +20 PG máximos y, sin armadura, CA 10 + DES + CAR = 16 (ya sumado).
- Nivel 3 · Conjuros dracónicos [pasiva]: Siempre preparados: Alterar el propio aspecto, Orbe cromático, Orden imperiosa, Aliento de dragón, Miedo, Volar.
- Nivel 6 · Afinidad Elemental [pasiva]: Eliges ácido, frío, fuego, relámpago o veneno: resistencia a ese daño y +3 al daño de ese tipo en tus conjuros.
- Nivel 14 · Alas de Dragón [adicional]: Vuelo permanente como acción adicional.
- Nivel 18 · Presencia Dracónica [pasiva]: Aura de miedo o encanto por 1 min.

### Magia Salvaje (integrada, clave `salvaje`)
- Nivel 3 · Oleada de Magia Salvaje [gratis]: Una vez por turno, al lanzar un conjuro de hechicero con espacio, tira 1d20; con 20 tira en la tabla de Oleada.
- Nivel 3 · Mareas del Caos [gratis]: Te das ventaja en una prueba d20.
- Nivel 6 · Doblegar la Suerte [reaccion]: Cuando alguien que ves hace una prueba d20, tiras 1d4 y lo sumas o restas.
- Nivel 14 · Caos Controlado [pasiva]: Tiras dos veces en la tabla salvaje y eliges el resultado.

### Hechicería Aberrante (biblioteca, clave `aberrante`)
- Nivel 3 · Habla Telepática [pasiva]: Telepatía con una criatura a 30 pies.
- Nivel 6 · Hechicería Psiónica [pasiva]: Lanzas conjuros específicos usando puntos de hechicería sin componentes.
- Nivel 14 · Defensa Psíquica [pasiva]: Resistencia a daño psíquico y ventaja contra ser hechizado/asustado.
- Nivel 18 · Transformación Reveladora [pasiva]: Te vuelves una entidad viscosa que vuela y atraviesa espacios pequeños.

### Alma del Reloj (biblioteca, clave `reloj`)
- Nivel 3 · Restaurar Equilibrio [pasiva]: Anulas ventaja o desventaja de una criatura cercana.
- Nivel 6 · Baluarte de la Ley [pasiva]: Escudo de puntos de hechicería que reduce daño.
- Nivel 14 · Trance de Orden [pasiva]: Tus tiradas de ataque/salvación no pueden ser menores a 10.
- Nivel 18 · Cavatina del Reloj [pasiva]: Invocas espíritus que curan aliados y reparan objetos en área.

### Hechicería de Fuego de Conjuro (biblioteca, clave `fuego-conjuro`)
- Nivel 3 · Estallido de Fuego de Conjuro [adicional]: Cuando gastas al menos 1 Punto de Hechicería como parte de una acción Mágica o una Acción Adicional en tu turno, puedes desatar uno de los siguientes efectos mágicos a tu elección. Solo puedes hacerlo una vez por turno. Llamas Fortalecedoras: tú o una criatura que puedas ver a 30 pies o menos de ti obtiene Puntos de Golpe temporales iguales a 1d4 + tu modificador de Carisma. Fuego Radiante: una criatura que puedas ver a 30 pies o menos de ti recibe 1d4 de daño de Fuego o Radiante (a tu elección).
- Nivel 3 · Conjuros de Fuego de Conjuro [pasiva]: Cuando alcanzas un nivel de Hechicero indicado en la tabla Conjuros de Fuego de Conjuro, a partir de ese momento siempre tienes preparados los conjuros indicados. Nivel 3: Curar Heridas, Rayo Guiado, Restauración Menor, Rayo Abrasador. Nivel 5: Aura de Vitalidad, Disipar Magia. Nivel 7: Escudo de Fuego, Muro de Fuego. Nivel 9: Restauración Mayor, Golpe Flamígero.
- Nivel 6 · Absorber Conjuros [pasiva]: Siempre tienes preparado el conjuro Contrarechizo. Además, cada vez que un objetivo falla la tirada de salvación contra un Contrarechizo que lanzas, recuperas 1d4 Puntos de Hechicería.
- Nivel 14 · Fuego de Conjuro Refinado [pasiva]: Tu Estallido de Fuego de Conjuro mejora. Añades tu nivel de Hechicero a los Puntos de Golpe temporales obtenidos con Llamas Fortalecedoras, y el daño de tu Fuego Radiante aumenta a 1d8.
- Nivel 18 · Corona de Fuego de Conjuro [pasiva]: Cuando usas Hechicería Innata, puedes alterarla para infundirte con la esencia del Fuego de Conjuro, obteniendo los siguientes beneficios mientras este uso de Hechicería Innata esté activo. Una vez que uses este rasgo para alterar Hechicería Innata, no puedes volver a usarlo hasta que termines un Descanso Largo, a menos que gastes 5 Puntos de Hechicería (sin requerir acción) para restaurar su uso. Fuerza Vital Ardiente: una vez por turno, cuando recibes el impacto de una tirada de ataque, puedes gastar un número de Dados de Puntos de Golpe, hasta un máximo igual a tu modificador de Carisma (mínimo uno). Tira los dados gastados y reduce la cantidad de daño de ese ataque en el total obtenido.

### Hechicería de las Sombras (biblioteca, clave `hechiceria-sombras`)
- Nivel 3 · Ojos de la Oscuridad [pasiva]: Tienes visión en la oscuridad con un alcance de 120 pies. Cuando alcanzas el nivel 3 en esta clase, aprendes el conjuro Oscuridad, que no cuenta para tu número de conjuros de Hechicero conocidos. Además, puedes lanzarlo gastando 2 Puntos de Hechicería o consumiendo un espacio de conjuro. Si lo lanzas con Puntos de Hechicería, puedes ver a través de la oscuridad creada por el conjuro.
- Nivel 3 · Vitalidad de Sombra [pasiva]: Tu existencia en un estado crepuscular entre la vida y la muerte te hace difícil de derrotar. Cuando el daño te reduce a 0 Puntos de Golpe, puedes hacer una tirada de salvación de Carisma (CD 5 + el daño recibido). Si la superas, en su lugar te quedas con 1 Punto de Golpe. No puedes usar este rasgo si te reducen a 0 Puntos de Golpe por daño radiante o por un golpe crítico. Después de que la tirada de salvación tenga éxito, no puedes volver a usar este rasgo hasta que termines un Descanso Largo.
- Nivel 6 · Sabueso del Presagio Maligno [adicional]: Obtienes la capacidad de invocar a una criatura aullante de oscuridad para acosar a tus enemigos. Como Acción Adicional, puedes gastar 3 Puntos de Hechicería para invocar un sabueso del presagio maligno que señala a una criatura que puedas ver a 120 pies o menos de ti. El sabueso usa las estadísticas del lobo terrible, con los siguientes cambios: es de tamaño Mediano, no Grande, y cuenta como monstruosidad, no como bestia; aparece con un número de Puntos de Golpe temporales igual a la mitad de tu nivel de Hechicero; puede moverse a través de criaturas y objetos como si fueran terreno difícil; y recibe 5 de daño de Fuerza si termina su turno dentro de un objeto. Al inicio de su turno, el sabueso conoce automáticamente la ubicación de su objetivo. Si el objetivo estaba escondido, deja de estarlo para el sabueso. El sabueso aparece en un espacio desocupado de tu elección a 30 pies o menos del objetivo. Tira iniciativa para el sabueso. En su turno, solo puede moverse hacia su objetivo por la ruta más directa, y solo puede usar su acción para atacar a su objetivo. El sabueso puede hacer ataques de oportunidad, pero solo contra su objetivo. Además, mientras el sabueso esté a 5 pies o menos del objetivo, este tiene desventaja en tiradas de salvación contra cualquier conjuro que lances. El sabueso desaparece si sus Puntos de Golpe se reducen a 0, si su objetivo se reduce a 0 Puntos de Golpe, o después de 5 minutos.
- Nivel 14 · Caminar por las Sombras [adicional]: Obtienes la capacidad de pasar de una sombra a otra. Cuando estás en luz tenue u oscuridad, como Acción Adicional, puedes teletransportarte hasta 120 pies a un espacio desocupado que puedas ver que también esté en luz tenue u oscuridad.
- Nivel 18 · Forma Umbría [adicional]: Puedes gastar 6 Puntos de Hechicería como Acción Adicional para transformarte en una forma sombría. En esta forma, tienes resistencia a todo el daño excepto el de Fuerza y el Radiante, y puedes moverte a través de criaturas y objetos como si fueran terreno difícil. Recibes 5 de daño de Fuerza si terminas tu turno dentro de un objeto. Permaneces en esta forma durante 1 minuto. Termina antes si quedas Incapacitado, si mueres o si la descartas como Acción Adicional.

## Pendientes de este lote en la revisión (selectores por hacer, subclases que faltan respecto a D&D Beyond, rasgos dudosos)

(Por agregar (faltan respecto a D&D Beyond))
#### Lote 12: Hechicero

- [ ] **Alma Divina** (Xanathar's Guide to Everything)
- [ ] **Hechicería de la Tormenta** (Xanathar's Guide to Everything)
- [ ] **Hechicería Lunar** (Dragonlance: Shadow of the Dragon Queen)

#### Lote 12: Hechicero (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 18. Con tipo claro: 5. Ya revisados: 0.

#### Hechicero

- [ ] **Hechicería Encarnada** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Apoteosis Arcana** (nivel 20): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Hechicería Aberrante

- [ ] **Habla Telepática** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Hechicería Psiónica** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Defensa Psíquica** (nivel 14): hoy `pasiva`, no menciona tipo de acción
- [ ] **Transformación Reveladora** (nivel 18): hoy `pasiva`, no menciona tipo de acción

#### Alma del Reloj

- [ ] **Restaurar Equilibrio** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Baluarte de la Ley** (nivel 6): hoy `pasiva`, no menciona tipo de acción
- [ ] **Trance de Orden** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Cavatina del Reloj** (nivel 18): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Hechicería de Fuego de Conjuro

- [ ] **Conjuros de Fuego de Conjuro** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Absorber Conjuros** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Fuego de Conjuro Refinado** (nivel 14): hoy `pasiva`, no menciona tipo de acción
- [ ] **Corona de Fuego de Conjuro** (nivel 18): hoy `pasiva`, queda pasiva pero parece activarse

#### Hechicería de las Sombras

- [ ] **Ojos de la Oscuridad** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Vitalidad de Sombra** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Hechicería Dracónica

- [ ] **Presencia Dracónica** (nivel 18): hoy `pasiva`, no menciona tipo de acción

#### Magia Salvaje

- [ ] **Caos Controlado** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
