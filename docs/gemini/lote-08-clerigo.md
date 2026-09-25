# Encargo: Lote 8 (Clérigo) de la app "Mi turno"

Eres un asistente de investigación de reglas de D&D 5.ª edición revisada (2024). "Mi turno" es una app de hojas de
personaje en español. Tu trabajo: revisar todo lo que la app tiene de la clase **Clérigo** contra la versión oficial más
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

**A. Datos** (TypeScript, archivo `scripts/datos/clerigo-2024.ts`). Este formato exacto:

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const CLERIGO_2024 = {
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

### Clase Clérigo, niveles 1 a 5 (integrados en la app)
- Nivel 1 · Orden Divina [pasiva]: Protector (armaduras pesadas y armas marciales) o Taumaturgo (un truco más y +SAB a Arcanos o Religión).
- Nivel 2 · Chispa Divina [accion]: A una criatura a 30 pies: la curas 4d8 + 3 PG, o hace salvación de CON CD 15 y recibe ese daño radiante o necrótico (mitad si la pasa).
- Nivel 2 · Expulsar Muertos Vivientes [accion]: Muertos vivientes a 30 pies: salvación de SAB CD 15 o quedan Asustados e Incapacitados 1 minuto.
- Nivel 5 · Abrasar Muertos Vivientes [pasiva]: Al expulsar muertos vivientes, los que fallan reciben 3d8 radiante.


### Rasgos de nivel alto de la clase (biblioteca)
- Nivel 7 · Golpes Benditos [pasiva]: Elige: Golpe Divino (+1d8 radiante/necrótico en ataques 1/turno) o Lanzamiento Potente (Suma SAB a daño de trucos).
- Nivel 10 · Intervención Divina [pasiva]: Puedes lanzar cualquier conjuro de Clérigo de nivel 5 o inferior sin gastar espacio ni componentes (1/descanso largo).
- Nivel 20 · Intervención Divina Mayor [pasiva]: Ahora puedes usar Intervención Divina para lanzar Deseo (si replica un conjuro de nivel 8 o menor de cualquier lista).

### Dominio de la Vida (biblioteca, clave `dominio-vida`)
- Nivel 3 · Discípulo de la Vida [pasiva]: Tus curaciones de nivel 1+ sanan 2 + nivel del conjuro adicionales.
- Nivel 3 · Canalizar: Preservar Vida [pasiva]: Curas 5x nivel clérigo puntos de golpe repartidos en aliados a 30 pies (hasta mitad de sus PG).
- Nivel 6 · Curación Bendita [pasiva]: Cuando curas a otros, tú también recuperas 2 + nivel del conjuro PG.
- Nivel 17 · Curación Suprema [pasiva]: Usas el valor máximo de los dados de curación.

### Dominio de la Luz (biblioteca, clave `dominio-luz`)
- Nivel 3 · Destello de Resplandor [reaccion]: Como reacción, impones desventaja a quien te ataque a 30 pies.
- Nivel 3 · Canalizar: Resplandor del Alba [pasiva]: Acción para infligir 2d10 + nivel clérigo de daño Radiante en área de 30 pies y disipar oscuridad.
- Nivel 6 · Destello Mejorado [pasiva]: Puedes usar tu destello para proteger a aliados cercanos.
- Nivel 17 · Corona de Luz [pasiva]: Emanas un aura de luz solar que debilita enemigos (desventaja contra daño fuego/radiante).

### Dominio del Engaño (biblioteca, clave `dominio-engano`)
- Nivel 3 · Bendición del Tramposo [pasiva]: Das ventaja en Sigilo a otra criatura voluntaria.
- Nivel 3 · Canalizar: Invocar Duplicado [adicional]: Como Acción Adicional, creas una ilusión perfecta de ti mismo (1 min, sin concentración). Puedes lanzar conjuros desde su espacio.
- Nivel 6 · Capa de Sombras [accion]: Como acción, te vuelves invisible hasta el final de tu siguiente turno.
- Nivel 17 · Duplicidad Mejorada [pasiva]: Puedes crear hasta 4 duplicados a la vez.

### Dominio de la Guerra (biblioteca, clave `dominio-guerra`)
- Nivel 3 · Sacerdote de la Guerra [adicional]: Al atacar, puedes hacer otro ataque como acción adicional (usos = mod SAB).
- Nivel 3 · Canalizar: Golpe Guiado [pasiva]: Suma +10 a una tirada de ataque propia.
- Nivel 6 · Bendición del Dios de la Guerra [reaccion]: Usa reacción para dar +10 al ataque de un aliado.
- Nivel 17 · Resistencia de Avatar [pasiva]: Resistencia a daño físico no mágico.

### Dominio del Conocimiento (biblioteca, clave `dominio-conocimiento`)
- Nivel 3 · Bendiciones del Saber [pasiva]: Obtienes competencia con un tipo de herramientas de artesano a tu elección y en dos de las siguientes habilidades a tu elección: Arcanos, Historia, Naturaleza o Religión. Tienes Experticia en esas dos habilidades.
- Nivel 3 · Conjuros del Dominio del Conocimiento [pasiva]: Cuando alcanzas un nivel de Clérigo indicado en la tabla Conjuros del Dominio del Conocimiento, a partir de ese momento siempre tienes preparados los conjuros indicados. Nivel 3: Orden, Comprender Idiomas, Detectar Magia, Detectar Pensamientos, Identificar, Astilla Mental. Nivel 5: Disipar Magia, Antidetección, Lenguas. Nivel 7: Ojo Arcano, Desterrar, Confusión. Nivel 9: Saber Legendario, Escudriñar, Descarga Sináptica. Los conjuros marcados con asterisco en la tabla son de la escuela de Adivinación.
- Nivel 3 · Magia de la Mente [accion]: Como acción Mágica, puedes gastar un uso de tu Canalizar Divinidad para manifestar tu conocimiento mágico. Elige un conjuro de la escuela de Adivinación de la tabla de Conjuros del Dominio del Conocimiento que tengas preparado. Como parte de esa acción, lanzas ese conjuro sin gastar un espacio de conjuro ni necesitar componentes materiales.
- Nivel 6 · Mente Desatada [pasiva]: Obtienes telepatía con un alcance de 60 pies. Cuando usas esta telepatía, puedes contactar simultáneamente con un número de criaturas igual a tu modificador de Sabiduría (mínimo una). Además, obtienes competencia en tiradas de salvación de Inteligencia. Si ya tienes esta competencia, en su lugar obtienes competencia en tiradas de salvación con una característica en la que carezcas de ella.
- Nivel 17 · Presciencia Divina [adicional]: Como Acción Adicional, expandes mágicamente tu mente hacia el futuro. Durante 1 hora, tienes Ventaja en pruebas de d20. Una vez que uses este rasgo, no puedes volver a usarlo hasta que termines un Descanso Largo. También puedes restaurar su uso gastando un espacio de conjuro de nivel 6 o superior (sin requerir acción).

### Dominio de la Tumba (biblioteca, clave `dominio-tumba`)
- Nivel 3 · Círculo de la Mortalidad [adicional]: Obtienes la capacidad de manipular la línea entre la vida y la muerte. Cuando normalmente tirarías uno o más dados para restaurar Puntos de Golpe con un conjuro a una criatura que tiene 0 Puntos de Golpe, en su lugar usas el número más alto posible en cada dado. Además, aprendes el truco Estabilizar, que no cuenta para el número de trucos de clérigo que conoces. Para ti, tiene un alcance de 30 pies, y puedes lanzarlo como Acción Adicional.
- Nivel 3 · Ojos de la Tumba [accion]: Obtienes la capacidad de percibir ocasionalmente la presencia de muertos vivientes, cuya existencia es un insulto al ciclo natural de la vida. Como acción, puedes abrir tu consciencia para detectar mágicamente a los muertos vivientes. Hasta el final de tu siguiente turno, conoces la ubicación de cualquier muerto viviente que esté a 60 pies o menos de ti, que no esté detrás de cobertura total y que no esté protegido contra magia de adivinación. Este sentido no te dice nada sobre las capacidades o la identidad de la criatura. Puedes usar este rasgo una cantidad de veces igual a tu modificador de Sabiduría (mínimo una). Recuperas todos los usos gastados cuando terminas un Descanso Largo.
- Nivel 3 · Canalizar Divinidad: Sendero hacia la Tumba [accion]: Puedes usar tu Canalizar Divinidad para marcar la fuerza vital de otra criatura para su aniquilación. Como acción, eliges una criatura que puedas ver a 30 pies o menos de ti, maldiciéndola hasta el final de tu siguiente turno. La próxima vez que tú o un aliado tuyo golpee a la criatura maldita con un ataque, la criatura tiene vulnerabilidad a todo el daño de ese ataque, y luego la maldición termina.
- Nivel 6 · Centinela en la Puerta de la Muerte [reaccion]: Obtienes la capacidad de impedir el avance de la muerte. Como reacción, cuando tú o un aliado que puedas ver a 30 pies o menos de ti sufre un golpe crítico, puedes convertir ese ataque en un golpe normal. Cualquier efecto provocado por un golpe crítico queda cancelado. Puedes usar este rasgo una cantidad de veces igual a tu modificador de Sabiduría (mínimo una). Recuperas todos los usos gastados cuando terminas un Descanso Largo.
- Nivel 6 · Potenciar Conjuros [pasiva]: Sumas tu modificador de Sabiduría al daño que infliges con cualquier truco de clérigo.
- Nivel 17 · Custodio de Almas [pasiva]: Puedes arrebatar un rastro de vitalidad a un alma que parte y usarlo para curar a los vivos. Cuando un enemigo que puedas ver muere a 30 pies o menos de ti, tú o un aliado a tu elección que esté a 30 pies o menos de ti recupera Puntos de Golpe iguales al número de Dados de Golpe del enemigo. Puedes usar este rasgo solo si no estás Incapacitado. Una vez que lo usas, no puedes volver a hacerlo hasta el inicio de tu siguiente turno.

## Pendientes de este lote en la revisión (selectores por hacer, subclases que faltan respecto a D&D Beyond, rasgos dudosos)

(Selectores)
#### Lote 8: Clérigo

- [ ] **Golpes Benditos (nivel 7)**: Golpe Divino o Lanzamiento Potente.
- [ ] **Dominio del Conocimiento: Bendiciones del Saber**: dos habilidades con pericia (Arcanos, Historia, Naturaleza o Religión) y una herramienta.

(Por agregar (faltan respecto a D&D Beyond))
#### Lote 8: Clérigo

- [ ] **Dominio de la Tempestad** (Manual del Jugador 2014)
- [ ] **Dominio de la Naturaleza** (Manual del Jugador 2014)
- [ ] **Dominio de la Forja** (Xanathar's Guide to Everything)
- [ ] **Dominio del Orden** (Tasha's Cauldron of Everything)
- [ ] **Dominio de la Paz** (Tasha's Cauldron of Everything)
- [ ] **Dominio del Crepúsculo** (Tasha's Cauldron of Everything)
- [ ] **Dominio Arcano** (Sword Coast Adventurer's Guide)
- [ ] **Dominio de la Muerte** (Guía del Dungeon Master 2014)

#### Lote 8: Clérigo (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 18. Con tipo claro: 12. Ya revisados: 0.

#### Clérigo

- [ ] **Golpes Benditos** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Intervención Divina** (nivel 10): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Intervención Divina Mayor** (nivel 20): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Dominio de la Vida

- [ ] **Discípulo de la Vida** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Canalizar: Preservar Vida** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Curación Bendita** (nivel 6): hoy `pasiva`, no menciona tipo de acción
- [ ] **Curación Suprema** (nivel 17): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Dominio de la Luz

- [ ] **Destello Mejorado** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Corona de Luz** (nivel 17): hoy `pasiva`, no menciona tipo de acción

#### Dominio del Engaño

- [ ] **Bendición del Tramposo** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Duplicidad Mejorada** (nivel 17): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Dominio de la Guerra

- [ ] **Canalizar: Golpe Guiado** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Resistencia de Avatar** (nivel 17): hoy `pasiva`, no menciona tipo de acción

#### Dominio del Conocimiento

- [ ] **Bendiciones del Saber** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Conjuros del Dominio del Conocimiento** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Mente Desatada** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Dominio de la Tumba

- [ ] **Potenciar Conjuros** (nivel 6): hoy `pasiva`, no menciona tipo de acción
- [ ] **Custodio de Almas** (nivel 17): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
