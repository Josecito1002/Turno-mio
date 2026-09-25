# Encargo: Lote 11 (Guerrero) de la app "Mi turno"

Eres un asistente de investigación de reglas de D&D 5.ª edición revisada (2024). "Mi turno" es una app de hojas de
personaje en español. Tu trabajo: revisar todo lo que la app tiene de la clase **Guerrero** contra la versión oficial más
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

**A. Datos** (TypeScript, archivo `scripts/datos/guerrero-2024.ts`). Este formato exacto:

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const GUERRERO_2024 = {
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

### Clase Guerrero, niveles 1 a 5 (integrados en la app)
- Nivel 1 · Segundo Aliento [adicional]: Recuperas 1d10 + 20 PG. Y te mueves hasta la mitad de tu velocidad sin provocar ataques de oportunidad.
- Nivel 1 · Maestría con Armas [pasiva]: Usas la maestría de 3 tipos de armas (elígelas en Equipo). Puedes cambiarlas en cada descanso largo.
- Nivel 2 · Oleada de Acción [gratis]: En tu turno haces una acción más, que no sea Magia.
- Nivel 2 · Mente Táctica [gratis]: Si fallas una prueba de característica, sumas 1d10; si aun así fallas, no gastas el uso.
- Nivel 5 · Ataque Extra [pasiva]: Cuando usas la acción Atacar, atacas dos veces.


### Rasgos de nivel alto de la clase (biblioteca)
- Nivel 9 · Indomable [pasiva]: Repite una salvación fallida sumando tu nivel de Guerrero. Si aciertas, recuperas el uso.
- Nivel 13 · Ataques Estudiados [pasiva]: Si fallas un ataque contra una criatura, tienes Ventaja en el siguiente ataque contra ella.

### Campeón (biblioteca, clave `campeon`)
- Nivel 3 · Crítico Mejorado [pasiva]: Críticos con 19 o 20.
- Nivel 7 · Atleta Notable [pasiva]: Suma bono a pruebas de FUE/DES/CON. Salto aumenta.
- Nivel 10 · Estilo de Combate Adicional [pasiva]: Eliges un segundo estilo.
- Nivel 18 · Superviviente [pasiva]: Recuperas PG cada turno si estás herido (bajo mitad).

### Maestro de Batalla (biblioteca, clave `maestro-batalla`)
- Nivel 3 · Superioridad en Combate [pasiva]: Dados de Superioridad (d8) para ejecutar maniobras (Parar, Empujar, etc.).
- Nivel 3 · Estudiante de la Guerra [pasiva]: Competencia con herramientas de artesano.
- Nivel 7 · Conoce a tu Enemigo [pasiva]: Analiza a un enemigo para saber sus estadísticas relativas.
- Nivel 15 · Implacable [gratis]: Recuperas un dado de superioridad si no tienes ninguno al tirar iniciativa.

### Caballero Arcano (biblioteca, clave `caballero-arcano`)
- Nivel 3 · Lanzamiento de Conjuros [pasiva]: Usa Inteligencia. Conjuros de Mago (Abjuración/Evocación).
- Nivel 3 · Vínculo con el Arma [pasiva]: No te pueden desarmar y puedes invocar tu arma a tu mano.
- Nivel 7 · Magia de Guerra [pasiva]: Cuando tomas la Acción de Atacar, puedes sustituir uno de tus ataques por el lanzamiento de un truco de Mago.
- Nivel 18 · Magia de Guerra Mejorada [pasiva]: Cuando tomas la Acción de Atacar, puedes sustituir dos de tus ataques por el lanzamiento de un conjuro de Mago de nivel 1 o 2.

### Guerrero Psiónico (biblioteca, clave `guerrero-psionico`)
- Nivel 3 · Poder Psiónico [pasiva]: Dados de Energía Psiónica para reducir daño o aumentar el tuyo.
- Nivel 7 · Salto Telequinético [adicional]: Vuelas por un turno como acción adicional.
- Nivel 10 · Mente Protegida [pasiva]: Resistencia a daño psíquico.
- Nivel 18 · Maestro de la Telequinesis [pasiva]: Puedes lanzar el conjuro Telequinesis sin componentes.

### Caballero del Dragón Púrpura (biblioteca, clave `caballero-dragon-purpura`)
- Nivel 3 · Enviado Caballeresco [pasiva]: Sabes cómo comportarte con elegancia como embajador noble. Obtienes los siguientes beneficios. Comprensión: puedes lanzar el conjuro Comprender Idiomas, pero solo como Ritual. Carisma es tu característica de lanzamiento para él. Políglota: aprendes un idioma de las tablas de idiomas del Manual del Jugador o del capítulo 2 de este libro. Cuando terminas un Descanso Largo, puedes reemplazar un idioma aprendido con este beneficio por otro idioma que hayas escuchado, visto en señas o leído en las últimas 24 horas. Elocuencia: obtienes competencia en una de las siguientes habilidades a tu elección: Perspicacia, Intimidación, Persuasión o Interpretación.
- Nivel 3 · Recuperación Grupal [pasiva]: Cuando usas tu Segundo Aliento para recuperar Puntos de Golpe, puedes elegir a un número de aliados dentro de una emanación de 30 pies originada en ti, hasta un número de aliados igual a tu modificador de Carisma (mínimo uno). Cada uno de esos aliados recupera Puntos de Golpe iguales a 1d4 + tu nivel de Guerrero. Una vez que usas esta habilidad, no puedes volver a usarla hasta que termines un Descanso Corto o Largo.
- Nivel 7 · Tácticas de Equipo [pasiva]: Cuando usas Recuperación Grupal, cada aliado elegido tiene Ventaja en pruebas de d20 hasta el inicio de tu siguiente turno.
- Nivel 10 · Oleada Inspiradora [reaccion]: Cuando usas tu Acción Súbita, puedes elegir a aliados dentro de una emanación de 30 pies originada en ti, hasta un número de aliados igual a tu modificador de Carisma (mínimo uno). Cada uno de esos aliados puede usar inmediatamente una Reacción para escoger una de las siguientes opciones. Atacar: el aliado hace un ataque con un arma o un Golpe Desarmado. Moverse: el aliado se mueve hasta la mitad de su velocidad sin provocar ataques de oportunidad.
- Nivel 15 · Resistencia Compartida [reaccion]: Cuando un aliado que puedas ver a 60 pies o menos de ti falla una tirada de salvación, puedes usar una Reacción para gastar un uso de tu rasgo Indomable. El aliado puede repetir inmediatamente la tirada de salvación con un bonificador igual a tu nivel de Guerrero; debe usar la nueva tirada.
- Nivel 18 · Comandante Inspirador [pasiva]: Obtienes los siguientes beneficios. Arenga Reforzada: el área de efecto tanto de Recuperación Grupal como de Oleada Inspiradora ahora es una emanación de 60 pies. Valentía Inquebrantable: tienes Inmunidad a los estados Hechizado y Asustado.

## Pendientes de este lote en la revisión (selectores por hacer, subclases que faltan respecto a D&D Beyond, rasgos dudosos)

(Selectores)
#### Lote 11: Guerrero

- [ ] **Campeón: Estilo de Combate Adicional**: un segundo estilo; en 2024 es en el nivel 7 (la biblioteca dice 10).
- [ ] **Maestro de Batalla: maniobras y Estudiante de la Guerra**: maniobras conocidas según nivel, cada una como opción con su dado de superioridad; más una herramienta y una habilidad.

(Por agregar (faltan respecto a D&D Beyond))
#### Lote 11: Guerrero

- [ ] **Arquero Arcano** (Xanathar's Guide to Everything)
- [ ] **Caballero (Cavalier)** (Xanathar's Guide to Everything)
- [ ] **Samurái** (Xanathar's Guide to Everything)
- [ ] **Caballero Rúnico** (Tasha's Cauldron of Everything)
- [ ] **Caballero del Eco** (Explorer's Guide to Wildemount)

#### Lote 11: Guerrero (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 20. Con tipo claro: 3. Ya revisados: 1.

#### Guerrero

- [ ] **Indomable** (nivel 9): hoy `pasiva`, no menciona tipo de acción
- [ ] **Ataques Estudiados** (nivel 13): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Campeón

- [ ] **Crítico Mejorado** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Atleta Notable** (nivel 7): hoy `pasiva`, no menciona tipo de acción
- [ ] **Estilo de Combate Adicional** (nivel 10): hoy `pasiva`, no menciona tipo de acción
- [ ] **Superviviente** (nivel 18): hoy `pasiva`, no menciona tipo de acción

#### Maestro de Batalla

- [ ] **Superioridad en Combate** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Conoce a tu Enemigo** (nivel 7): hoy `pasiva`, no menciona tipo de acción
- [ ] **Implacable** (nivel 15): hoy `gratis`, no menciona tipo de acción

#### Caballero Arcano

- [ ] **Lanzamiento de Conjuros** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Vínculo con el Arma** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Magia de Guerra** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse
- [ ] **Magia de Guerra Mejorada** (nivel 18): hoy `pasiva`, queda pasiva pero parece activarse

#### Guerrero Psiónico

- [ ] **Poder Psiónico** (nivel 3): hoy `pasiva`, no menciona tipo de acción
- [ ] **Mente Protegida** (nivel 10): hoy `pasiva`, no menciona tipo de acción
- [ ] **Maestro de la Telequinesis** (nivel 18): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Caballero del Dragón Púrpura

- [ ] **Enviado Caballeresco** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Recuperación Grupal** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Tácticas de Equipo** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Comandante Inspirador** (nivel 18): hoy `pasiva`, no menciona tipo de acción
