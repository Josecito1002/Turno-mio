# Encargo: Lote 13 (Mago) de la app "Mi turno"

Eres un asistente de investigación de reglas de D&D 5.ª edición revisada (2024). "Mi turno" es una app de hojas de
personaje en español. Tu trabajo: revisar todo lo que la app tiene de la clase **Mago** contra la versión oficial más
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

**A. Datos** (TypeScript, archivo `scripts/datos/mago-2024.ts`). Este formato exacto:

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const MAGO_2024 = {
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

### Clase Mago, niveles 1 a 5 (integrados en la app)
- Nivel 1 · Recuperación Arcana [fuera]: Tras un descanso corto recuperas espacios cuyos niveles sumen hasta 10.
- Nivel 1 · Ritualista [fuera]: Lanzas como ritual cualquier conjuro ritual de tu libro, aunque no esté preparado.
- Nivel 2 · Erudito [pasiva]: Pericia en Arcanos, Historia, Investigación, Medicina, Naturaleza o Religión (elígela en Habilidades).
- Nivel 5 · Memorizar Conjuro [fuera]: Tras un descanso corto cambias un conjuro preparado por otro de tu libro.


### Rasgos de nivel alto de la clase (biblioteca)
- Nivel 18 · Dominio de Conjuros [pasiva]: Eliges un conjuro de nivel 1 y otro de nivel 2 para lanzarlos a voluntad.
- Nivel 20 · Conjuros de Firma [pasiva]: Dos conjuros de nivel 3 que siempre tienes preparados y puedes lanzar una vez sin gastar espacio.

### Escuela de Abjuración (biblioteca, clave `abjuracion`)
- Nivel 3 · Capa Arcana [pasiva]: Escudo de energía que absorbe daño cuando lanzas conjuros de abjuración.
- Nivel 6 · Capa Proyectada [pasiva]: Usa tu escudo para proteger a aliados.
- Nivel 10 · Rompeconjuros [adicional]: Siempre tienes preparados Disipar Magia y Contrarechizo. Puedes lanzar Disipar Magia como Acción Adicional.
- Nivel 14 · Resistencia a Conjuros [pasiva]: Ventaja contra salvaciones de conjuros y resistencia a su daño.

### Escuela de Adivinación (biblioteca, clave `adivinacion`)
- Nivel 3 · Portento [pasiva]: Tira 2 dados tras descanso largo; puedes sustituir cualquier tirada por estos resultados.
- Nivel 6 · Adivino Experto [pasiva]: Recuperas espacios de nivel inferior al lanzar conjuros de adivinación.
- Nivel 10 · El Tercer Ojo [pasiva]: Ganas visión en oscuridad, ver lo invisible o leer cualquier idioma.
- Nivel 14 · Portento Mayor [pasiva]: Tiras 3 dados de portento en lugar de 2.

### Escuela de Evocación (biblioteca, clave `evocacion`)
- Nivel 3 · Esculpir Conjuros [pasiva]: Aliados pasan salvaciones automáticamente y no reciben daño de tus áreas.
- Nivel 6 · Truco Potente [pasiva]: Enemigos que pasan la salvación de tus trucos reciben medio daño.
- Nivel 10 · Evocación Potenciada [pasiva]: Suma mod. INT al daño de tus conjuros.
- Nivel 14 · Sobrecarga [pasiva]: Maximiza el daño de un conjuro de nivel 1-5 (recibes daño necrótico si repites).

### Escuela de Ilusión (biblioteca, clave `ilusion`)
- Nivel 3 · Ilusión Menor Mejorada [pasiva]: Truco gratis; crea sonido e imagen a la vez.
- Nivel 6 · Ilusiones Maleables [pasiva]: Cambias la naturaleza de una ilusión activa sin lanzarla de nuevo.
- Nivel 10 · Yo Ilusorio [reaccion]: Reacción para crear copia que hace que un ataque falle automáticamente.
- Nivel 14 · Realidad Ilusoria [pasiva]: Conviertes parte de una ilusión en un objeto real físico por 1 min.

### Cantor de la Hoja (biblioteca, clave `cantor-hoja`)
- Nivel 3 · Canto de la Hoja [adicional]: Como Acción Adicional, puedes invocar el Canto de la Hoja, una magia élfica que te otorga velocidad, agilidad y concentración sobrenaturales, siempre que no vistas armadura media o pesada ni uses un escudo. Dura 1 minuto y termina antes si quedas Incapacitado, si te pones armadura o escudo, o si usas dos manos para hacer un ataque con un arma. Puedes descartarlo en cualquier momento (sin requerir acción). Mientras el Canto de la Hoja esté activo, obtienes los siguientes beneficios. Agilidad: obtienes un bonificador a tu CA igual a tu modificador de Inteligencia (mínimo +1), y tu velocidad aumenta en 10 pies. Además, tienes Ventaja en pruebas de Destreza (Acrobacias). Manejo de la Hoja: siempre que ataques con un arma con la que tengas competencia, puedes usar tu modificador de Inteligencia para las tiradas de ataque y de daño en lugar de usar Fuerza o Destreza. Concentración: cuando haces una tirada de salvación de Constitución para mantener la Concentración, puedes sumar tu modificador de Inteligencia al total. Puedes invocar el Canto de la Hoja una cantidad de veces igual a tu modificador de Inteligencia (mínimo una) y recuperas todos los usos gastados cuando terminas un Descanso Largo. Recuperas un uso gastado cuando usas Recuperación Arcana.
- Nivel 3 · Formación en Guerra y Canto [pasiva]: Obtienes competencia con todas las armas marciales cuerpo a cuerpo que no tengan las propiedades A dos Manos o Pesada. Puedes usar un arma cuerpo a cuerpo con la que tengas competencia como foco para lanzar conjuros de Mago. También obtienes competencia en una de las siguientes habilidades a tu elección: Acrobacias, Atletismo, Interpretación o Persuasión.
- Nivel 6 · Ataque Extra [accion]: Puedes atacar dos veces, en lugar de una, cada vez que usas la acción de Atacar en tu turno. Además, puedes lanzar uno de tus trucos de Mago que tenga un tiempo de lanzamiento de una acción en lugar de uno de esos ataques.
- Nivel 10 · Canción de Defensa [reaccion]: Cuando recibes daño mientras tu Canto de la Hoja está activo, puedes usar una Reacción para gastar un espacio de conjuro y reducir el daño recibido en una cantidad igual a cinco veces el nivel del espacio de conjuro.
- Nivel 14 · Canción de Victoria [adicional]: Después de lanzar un conjuro que tenga un tiempo de lanzamiento de una acción, puedes hacer un ataque con un arma como Acción Adicional.

### Escuela de Conjuración (biblioteca, clave `conjuracion`)
- Nivel 3 · Erudito de la Conjuración [pasiva]: El oro y el tiempo que debes gastar para copiar un conjuro de Conjuración en tu libro de conjuros se reducen a la mitad.
- Nivel 3 · Conjuración Menor [pasiva]: Puedes usar tu acción para conjurar un objeto inanimado en tu mano o en el suelo, en un espacio desocupado que puedas ver a 10 pies o menos de ti. El objeto no puede ser mayor de 3 pies por lado ni pesar más de 10 libras, y su forma debe ser la de un objeto no mágico que hayas visto. El objeto es visiblemente mágico y irradia luz tenue en un radio de 5 pies. Desaparece después de 1 hora, cuando usas esta característica de nuevo, o si recibe o inflige cualquier daño.
- Nivel 6 · Transporte Benigno [pasiva]: Puedes usar tu acción para teletransportarte hasta 30 pies a un espacio desocupado que puedas ver. Alternativamente, puedes elegir un espacio dentro del alcance que esté ocupado por una criatura Mediana o Pequeña. Si esa criatura es voluntaria, ambos os teletransportáis intercambiando posiciones. Una vez que uses esta característica, no puedes volver a usarla hasta que termines un Descanso Largo o lances un conjuro de Conjuración de nivel 1 o superior.
- Nivel 10 · Conjuración Concentrada [pasiva]: Mientras te concentras en un conjuro de Conjuración, tu concentración no puede romperse como resultado de recibir daño.
- Nivel 14 · Invocaciones Duraderas [pasiva]: Cualquier criatura que invoques o crees con un conjuro de Conjuración obtiene 30 Puntos de Golpe temporales.

### Escuela de Encantamiento (biblioteca, clave `encantamiento`)
- Nivel 3 · Erudito del Encantamiento [pasiva]: El oro y el tiempo que debes gastar para copiar un conjuro de Encantamiento en tu libro de conjuros se reducen a la mitad.
- Nivel 3 · Mirada Hipnótica [accion]: Tus suaves palabras y tu mirada encantadora pueden embelesar mágicamente a otra criatura. Como acción, elige una criatura que puedas ver a 5 pies o menos de ti. Si el objetivo puede verte u oírte, debe superar una tirada de salvación de Sabiduría contra tu CD de salvación de conjuros o queda Hechizado por ti hasta el final de tu siguiente turno. La velocidad de la criatura hechizada se reduce a 0, y la criatura queda Incapacitada y visiblemente aturdida. En turnos posteriores, puedes usar tu acción para mantener este efecto, extendiendo su duración hasta el final de tu siguiente turno. Sin embargo, el efecto termina si te alejas más de 5 pies de la criatura, si esta no puede verte ni oírte, o si recibe daño. Una vez que el efecto termine, o si la criatura supera la salvación inicial, no puedes volver a usar esta característica contra esa criatura hasta que termines un Descanso Largo.
- Nivel 6 · Encanto Instintivo [reaccion]: Cuando una criatura que puedas ver a 30 pies o menos de ti hace una tirada de ataque contra ti, puedes usar tu reacción para desviar el ataque, siempre que haya otra criatura dentro del alcance del ataque. El atacante debe superar una tirada de salvación de Sabiduría contra tu CD de salvación de conjuros. Si falla, debe atacar a la criatura más cercana a él, excluyéndote a ti y a sí mismo. Si varias criaturas están igual de cerca, el atacante elige a cuál atacar. Si supera la salvación, no puedes volver a usar esta característica contra ese atacante hasta que termines un Descanso Largo. Debes decidir usar esta característica antes de saber si el ataque impacta o falla. Las criaturas que no pueden ser Hechizadas son inmunes a este efecto.
- Nivel 10 · Encantamiento Dividido [pasiva]: Cuando lanzas un conjuro de Encantamiento de nivel 1 o superior que afecta solo a una criatura, puedes hacer que afecte a una segunda criatura.
- Nivel 14 · Alterar Recuerdos [pasiva]: Ganas la capacidad de hacer que una criatura no sea consciente de tu influencia mágica sobre ella. Cuando lanzas un conjuro de Encantamiento para hechizar a una o más criaturas, puedes alterar el entendimiento de una de ellas para que no sea consciente de estar Hechizada. Además, una vez antes de que el conjuro expire, puedes usar tu acción para intentar hacer que la criatura elegida olvide parte del tiempo que pasó Hechizada. La criatura debe superar una tirada de salvación de Inteligencia contra tu CD de salvación de conjuros o pierde un número de horas de sus recuerdos igual a 1 + tu modificador de Carisma (mínimo 1). Puedes hacer que la criatura olvide menos tiempo, y la cantidad de tiempo no puede exceder la duración de tu conjuro de Encantamiento.

### Escuela de Necromancia (biblioteca, clave `necromancia`)
- Nivel 3 · Erudito de la Necromancia [pasiva]: El oro y el tiempo que debes gastar para copiar un conjuro de Necromancia en tu libro de conjuros se reducen a la mitad.
- Nivel 3 · Cosecha Mortal [pasiva]: Obtienes la capacidad de arrebatar energía vital a las criaturas que matas con tus conjuros. Una vez por turno, cuando matas a una o más criaturas con un conjuro de nivel 1 o superior, recuperas Puntos de Golpe iguales al doble del nivel del conjuro, o al triple si el conjuro pertenece a la escuela de Necromancia. No obtienes este beneficio por matar constructos o muertos vivientes.
- Nivel 6 · Séquito de Muertos [pasiva]: Añades el conjuro Animar Muertos a tu libro de conjuros si no está ya. Cuando lanzas Animar Muertos, puedes elegir un cadáver o pila de huesos adicional, creando otro zombi o esqueleto, según corresponda. Además, siempre que crees un muerto viviente usando un conjuro de Necromancia, este obtiene los siguientes beneficios: el máximo de Puntos de Golpe de la criatura aumenta en una cantidad igual a tu nivel de Mago, y la criatura añade tu bonificador de competencia a sus tiradas de daño de arma.
- Nivel 10 · Acostumbrado a la Muerte [pasiva]: Tienes resistencia al daño necrótico y tu máximo de Puntos de Golpe no puede reducirse. Has pasado tanto tiempo tratando con muertos vivientes y las fuerzas que los animan que te has vuelto inmune a algunos de sus peores efectos.
- Nivel 14 · Dominar Muertos [accion]: Puedes usar magia para someter a los muertos vivientes a tu control, incluso los creados por otros magos. Como acción, puedes elegir un muerto viviente que puedas ver a 60 pies o menos de ti. Esa criatura debe superar una tirada de salvación de Carisma contra tu CD de salvación de conjuros. Si la supera, no puedes volver a usar esta característica sobre ella. Si falla, se vuelve amistosa contigo y obedece tus órdenes hasta que uses esta característica de nuevo. Los muertos vivientes inteligentes son más difíciles de controlar de esta manera: si el objetivo tiene una Inteligencia de 8 o superior, tiene ventaja en la tirada de salvación. Si falla la salvación y tiene una Inteligencia de 12 o superior, puede repetir la salvación al final de cada hora hasta que la supere y quede libre.

### Escuela de Transmutación (biblioteca, clave `transmutacion`)
- Nivel 3 · Erudito de la Transmutación [pasiva]: El oro y el tiempo que debes gastar para copiar un conjuro de Transmutación en tu libro de conjuros se reducen a la mitad.
- Nivel 3 · Alquimia Menor [pasiva]: Puedes alterar temporalmente las propiedades físicas de un objeto no mágico, transformándolo de una sustancia en otra. Realizas un procedimiento alquímico especial sobre un objeto compuesto enteramente de madera, piedra (pero no una gema), hierro, cobre o plata, transformándolo en un material diferente de esos mismos. Por cada 10 minutos que pases realizando el procedimiento, puedes transformar hasta 1 pie cúbico de material. Después de 1 hora, o hasta que pierdas la concentración (como si te concentraras en un conjuro), el material vuelve a su sustancia original.
- Nivel 6 · Piedra del Transmutador [pasiva]: Puedes pasar 8 horas creando una piedra del transmutador que almacena magia de transmutación. Puedes beneficiarte tú mismo de la piedra o dársela a otra criatura. Una criatura obtiene un beneficio de tu elección mientras la piedra esté en su posesión. Cuando creas la piedra, elige el beneficio entre: visión en la oscuridad con un alcance de 60 pies; un aumento de velocidad de 10 pies mientras la criatura no esté cargada; competencia en tiradas de salvación de Constitución; o resistencia al daño de ácido, frío, fuego, relámpago o trueno (a tu elección cada vez que elijas este beneficio). Cada vez que lanzas un conjuro de Transmutación de nivel 1 o superior, puedes cambiar el efecto de tu piedra si la llevas encima. Si creas una nueva piedra del transmutador, la anterior deja de funcionar.
- Nivel 10 · Cambiaformas [pasiva]: Añades el conjuro Polimorfia a tu libro de conjuros, si no está ya. Puedes lanzar Polimorfia sin gastar un espacio de conjuro. Cuando lo haces así, solo puedes elegirte como objetivo y transformarte en una bestia cuyo nivel de desafío sea 1 o inferior. Una vez que lances Polimorfia de esta manera, no puedes volver a hacerlo hasta que termines un Descanso Corto o Largo, aunque puedes lanzarlo normalmente usando un espacio de conjuro disponible.
- Nivel 14 · Maestro Transmutador [pasiva]: Puedes usar tu acción para consumir la reserva de magia de transmutación almacenada en tu piedra del transmutador en un solo estallido. Cuando lo haces, elige uno de los siguientes efectos. Tu piedra del transmutador queda destruida y no puede recrearse hasta que termines un Descanso Largo. Transformación Mayor: transmutas un objeto no mágico, de tamaño no mayor a un cubo de 5 pies, en otro objeto no mágico de tamaño y masa similares y de valor igual o inferior (10 minutos manipulando el objeto). Panacea: eliminas todas las maldiciones, enfermedades y venenos que afecten a una criatura que toques con la piedra; la criatura también recupera todos sus Puntos de Golpe. Restaurar Vida: lanzas el conjuro Revivir sobre una criatura que toques con la piedra, sin gastar espacio de conjuro ni necesitar tenerlo en tu libro. Restaurar Juventud: tocas a una criatura voluntaria con la piedra y la edad aparente de la criatura se reduce en 3d10 años, hasta un mínimo de 13 años. Este efecto no extiende la vida de la criatura.

## Pendientes de este lote en la revisión (selectores por hacer, subclases que faltan respecto a D&D Beyond, rasgos dudosos)

(Por agregar (faltan respecto a D&D Beyond))
#### Lote 13: Mago

- [ ] **Magia de Guerra** (Xanathar's Guide to Everything)
- [ ] **Orden de los Escribas** (Tasha's Cauldron of Everything)
- [ ] **Cronurgia** (Explorer's Guide to Wildemount)
- [ ] **Graviturgia** (Explorer's Guide to Wildemount)

#### Lote 13: Mago (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 30. Con tipo claro: 13. Ya revisados: 0.

#### Mago

- [ ] **Dominio de Conjuros** (nivel 18): hoy `pasiva`, no menciona tipo de acción
- [ ] **Conjuros de Firma** (nivel 20): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Escuela de Abjuración

- [ ] **Capa Arcana** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Capa Proyectada** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Resistencia a Conjuros** (nivel 14): hoy `pasiva`, no menciona tipo de acción

#### Escuela de Adivinación

- [ ] **Portento** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Adivino Experto** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **El Tercer Ojo** (nivel 10): hoy `pasiva`, no menciona tipo de acción
- [ ] **Portento Mayor** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Escuela de Evocación

- [ ] **Esculpir Conjuros** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Truco Potente** (nivel 6): hoy `pasiva`, no menciona tipo de acción
- [ ] **Evocación Potenciada** (nivel 10): hoy `pasiva`, no menciona tipo de acción
- [ ] **Sobrecarga** (nivel 14): hoy `pasiva`, no menciona tipo de acción

#### Escuela de Ilusión

- [ ] **Ilusión Menor Mejorada** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Ilusiones Maleables** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Realidad Ilusoria** (nivel 14): hoy `pasiva`, no menciona tipo de acción

#### Cantor de la Hoja

- [ ] **Formación en Guerra y Canto** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Escuela de Conjuración

- [ ] **Erudito de la Conjuración** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Conjuración Concentrada** (nivel 10): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Invocaciones Duraderas** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Escuela de Encantamiento

- [ ] **Erudito del Encantamiento** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Encantamiento Dividido** (nivel 10): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Escuela de Necromancia

- [ ] **Erudito de la Necromancia** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Cosecha Mortal** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Séquito de Muertos** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse
- [ ] **Acostumbrado a la Muerte** (nivel 10): hoy `pasiva`, no menciona tipo de acción

#### Escuela de Transmutación

- [ ] **Erudito de la Transmutación** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Alquimia Menor** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Piedra del Transmutador** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Cambiaformas** (nivel 10): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
