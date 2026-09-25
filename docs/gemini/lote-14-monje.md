# Encargo: Lote 14 (Monje) de la app "Mi turno"

Eres un asistente de investigación de reglas de D&D 5.ª edición revisada (2024). "Mi turno" es una app de hojas de
personaje en español. Tu trabajo: revisar todo lo que la app tiene de la clase **Monje** contra la versión oficial más
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
   la primera vez que aparezca un conjuro, por ejemplo "Paso brumoso (Misty Step)". **Los conjuros escríbelos con el
   nombre exacto de la lista "Conjuros de la app" del final** (por ejemplo "Ayuda", no "Auxilio"); si uno no está en
   la lista, usa la traducción oficial y márcalo con (NO ESTÁ EN LA APP).
4. **No inventes.** Si no puedes confirmar un dato (un número, un nivel, un nombre), escríbelo igual con la marca
   **[NO CONFIRMADO]** y di por qué.
5. **Antes de agregar algo nuevo**, comprueba que no esté ya en la app con otro nombre (lista de abajo).
6. Tipos de acción válidos para `t`: accion, adicional (acción adicional), reaccion, gratis (sin acción, por ejemplo
   al acertar), pasiva, fuera (fuera de combate o ritual).

## Qué devolver (en este orden, cada parte en su bloque de código)

**A. Datos** (TypeScript, archivo `scripts/datos/monje-2024.ts`). Este formato exacto:

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const MONJE_2024 = {
  // Rasgos de la clase de nivel 7 a 20 (los de nivel 1 a 6 ya los tiene la app)
  rasgosAltos: [
    r(9, 'Nombre del rasgo', 'accion', 'Texto propio.', { usos: 1, reset: 'largo' }),  // usos/reset solo si tiene usos fijos
  ],
  // Rasgos de nivel 6 en adelante de las subclases que la app trae integradas (clave: sombra, manoabierta)
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

### Clase Monje, niveles 1 a 6 (integrados en la app)
- Nivel 1 · Artes Marciales [pasiva]: Tus golpes sin armas y armas de monje pueden usar DES en vez de FUE, también para la CD de Agarrar y Empujar. Tu dado de Artes Marciales es d12.
- Nivel 1 · Defensa sin Armadura [pasiva]: Sin armadura ni escudo, tu CA es 10 + DES + SAB = 16.
- Nivel 1 · Golpe sin armas extra [adicional]: Si usaste la acción Atacar con golpe sin armas o arma de monje: otro golpe sin armas, −NaN al ataque, undefined.
- Nivel 2 · Ráfaga de Golpes [adicional]: Dos golpes sin armas: −NaN al ataque, undefined cada uno.
- Nivel 2 · Defensa Paciente [adicional]: Gratis: Destrabarse. Con 1 Focus: Destrabarse y Esquivar.
- Nivel 2 · Paso del Viento [adicional]: Gratis: Correr. Con 1 Focus: Destrabarse y Correr, y tu salto se duplica este turno.
- Nivel 2 · Metabolismo Asombroso [gratis]: Al tirar iniciativa recuperas todo tu Focus y 1d12 + 20 PG.
- Nivel 2 · Movimiento sin Armadura [pasiva]: Sin armadura ni escudo tu velocidad aumenta (ya sumado).
- Nivel 3 · Desviar Ataques [reaccion]: Cuando te golpea un ataque contundente, cortante o perforante, reduces el daño en 1d10 + 23. Si queda en 0, con 1 Focus lo devuelves: salvación de DES CD 15 o recibe 2d12 + 3.
- Nivel 4 · Caída Lenta [reaccion]: Al caer, reduces el daño en 100.
- Nivel 5 · Ataque Extra [pasiva]: Cuando usas la acción Atacar, atacas dos veces.
- Nivel 5 · Golpe Aturdidor [gratis]: Una vez por turno, al golpear con arma de monje o sin armas: salvación de CON CD 15. Si falla, queda Aturdido hasta tu próximo turno; si la pasa, su velocidad se reduce a la mitad y el siguiente ataque contra él tiene ventaja.
- Nivel 6 · Golpes Potenciados [pasiva]: Tus golpes sin armas pueden hacer daño de fuerza.


### Rasgos de nivel alto de la clase (biblioteca)
- Nivel 10 · Autorestauración [accion]: Al final de tu turno, puedes eliminar condiciones de encantado, asustado o envenenado sin gastar acción. Inmune a veneno.
- Nivel 15 · Disciplina Perfecta [pasiva]: Si al iniciar turno tienes menos de 4 Focus, recuperas hasta tener 4.
- Nivel 18 · Defensa Superior [pasiva]: Gasta 3 Focus para ganar Resistencia a todo el daño excepto Fuerza por 1 minuto.
- Nivel 20 · Desafiar a la Muerte [pasiva]: Si caes a 0 PG, puedes gastar 4 Focus para evitarlo y quedarte con 4 dados de artes marciales de vida.
- Nivel 14 · Alma Diamantina [pasiva]: Competencia en todas las tiradas de salvación.

### Guerrero de la Sombra (integrada, clave `sombra`)
- Nivel 3 · Oscuridad (Artes de la Sombra) [accion]: Lanzas Oscuridad sin componentes (concentración). Tú ves dentro y cada turno puedes moverla hasta 60 pies.
- Nivel 3 · Figuras Sombrías [accion]: Conoces Ilusión menor y la lanzas con SAB (CD 15).
- Nivel 3 · Visión en la oscuridad [pasiva]: Ves en la oscuridad a 60 pies, o 60 más si ya tenías.
- Nivel 6 · Paso de Sombra [adicional]: En luz tenue u oscuridad, te teletransportas hasta 60 pies a otra zona oscura y tienes ventaja en tu siguiente ataque cuerpo a cuerpo este turno.
- Nivel 11 · Manto de Sombras [pasiva]: Invisibilidad en luz tenue u oscuridad.
- Nivel 17 · Oportunista [reaccion]: Ataque de reacción cuando alguien golpea a una criatura cerca de ti.

### Guerrero de la Mano Abierta (integrada, clave `manoabierta`)
- Nivel 3 · Técnica de la Mano Abierta [gratis]: Cada golpe de Ráfaga de Golpes elige: no puede hacer ataques de oportunidad; salvación de FUE CD 15 o lo empujas 15 pies; o salvación de DES CD 15 o queda Derribado.
- Nivel 6 · Integridad del Cuerpo [adicional]: Recuperas 1d12 + 3 PG.
- Nivel 11 · Tranquilidad [pasiva]: Efecto de Santuario constante tras descanso largo.
- Nivel 17 · Palma Quiebra-almas [pasiva]: Vibraciones letales que pueden reducir a 0 PG (Salvación CON).

### Camino de los Elementos (biblioteca, clave `elementos`)
- Nivel 3 · Sintonía Elemental [pasiva]: Tus ataques alcanzan 10 pies más e infligen daño de Fuego, Frío, Rayo o Ácido.
- Nivel 6 · Explosión Ambiental [pasiva]: Creas efectos de área (empujes de aire, explosiones de fuego) usando Ki.
- Nivel 10 · Zancada Ágil [pasiva]: Velocidad de vuelo y nado temporal mientras usas tus poderes.
- Nivel 14 · Avatar de los Elementos [pasiva]: Ganas resistencia a daños elementales y tus ataques son devastadores.

### Camino de la Misericordia (biblioteca, clave `misericordia`)
- Nivel 3 · Mano de la Curación [pasiva]: Gasta Ki para curar a alguien con un toque.
- Nivel 3 · Mano del Daño [pasiva]: Gasta Ki para infligir daño necrótico extra en un ataque.
- Nivel 6 · Toque del Médico [pasiva]: Tus curaciones eliminan condiciones (ciego, sordo, paralizado, etc.).
- Nivel 17 · Mano de la Misericordia Suprema [pasiva]: Puedes resucitar a los muertos con un toque y gasto de Ki.

## Pendientes de este lote en la revisión (selectores por hacer, subclases que faltan respecto a D&D Beyond, rasgos dudosos)

(Por agregar (faltan respecto a D&D Beyond))
#### Lote 14: Monje

- [ ] **Camino del Maestro Borracho** (Xanathar's Guide to Everything)
- [ ] **Camino del Kensei** (Xanathar's Guide to Everything)
- [ ] **Camino del Alma Solar** (Xanathar's Guide to Everything)
- [ ] **Camino del Yo Astral** (Tasha's Cauldron of Everything)
- [ ] **Camino del Dragón Ascendente** (Fizban's Treasury of Dragons)
- [ ] **Camino de la Larga Muerte** (Sword Coast Adventurer's Guide)

#### Lote 14: Monje (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 15. Con tipo claro: 2. Ya revisados: 0.

#### Monje

- [ ] **Disciplina Perfecta** (nivel 15): hoy `pasiva`, no menciona tipo de acción
- [ ] **Defensa Superior** (nivel 18): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Desafiar a la Muerte** (nivel 20): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Alma Diamantina** (nivel 14): hoy `pasiva`, no menciona tipo de acción

#### Camino de los Elementos

- [ ] **Sintonía Elemental** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Explosión Ambiental** (nivel 6): hoy `pasiva`, no menciona tipo de acción
- [ ] **Zancada Ágil** (nivel 10): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Avatar de los Elementos** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Camino de la Misericordia

- [ ] **Mano de la Curación** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Mano del Daño** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Toque del Médico** (nivel 6): hoy `pasiva`, no menciona tipo de acción
- [ ] **Mano de la Misericordia Suprema** (nivel 17): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Guerrero de la Mano Abierta

- [ ] **Tranquilidad** (nivel 11): hoy `pasiva`, no menciona tipo de acción
- [ ] **Palma Quiebra-almas** (nivel 17): hoy `pasiva`, no menciona tipo de acción

#### Guerrero de la Sombra

- [ ] **Manto de Sombras** (nivel 11): hoy `pasiva`, no menciona tipo de acción

## Conjuros de la app (usa estos nombres exactos)

- Trucos: Agarre electrizante, Amistad, Burla cruel, Burla dañina, Crear llama, Descarga de fuego, Descarga sobrenatural, Druidismo, Elementalismo, Estallido Mágico, Explosión sobrenatural, Fragmento Mental, Golpe certero, Guardia de cuchillas, Guía, Ilusión menor, Impacto certero, Látigo de espinas, Llama sagrada, Luces danzantes, Luz, Mano de mago, Mensaje, Palabra de resplandor, Perdonar a los moribundos, Piedad con los moribundos, Prestidigitación, Producir llama, Rayo de escarcha, Rayo de fuego, Remendar, Reparar, Resistencia, Rociada venenosa, Saber druídico, Salpicadura ácida, Shillelagh, Tañido por los muertos, Taumaturgia, Toque helado, Tronar, Voluta estelar
- Nivel 1: Alarma, Armadura de Agathys, Armadura de mago, Bendecir, Bendición, Brazos de Hadar, Buenas bayas, Caída de pluma, Castigo abrasador, Castigo atronador, Castigo divino, Castigo furioso, Comprender idiomas, Crear o destruir agua, Cuchillo de hielo, Curar heridas, Detectar el bien y el mal, Detectar magia, Detectar venenos y enfermedades, Disco flotante de Tenser, Disfrazarse, Dormir, Duelo forzado, Encantar animal, Encontrar familiar, Enmarañar, Entender idiomas, Escudo, Escudo de fe, Falsa vida, Favor Divino, Fuego feérico, Golpe Apresador, Grasa, Hablar con los Animales, Hechizar persona, Heroísmo, Identificar, Imagen silenciosa, Infligir heridas, Maleficio, Manos ardientes, Marca del cazador, Niebla, Nube de oscurecimiento, Ola atronadora, Onda atronadora, Orbe cromático, Orden imperiosa, Palabra curativa, Palabra de curación, Perdición, Protección contra el bien y el mal, Proyectil mágico, Purificar comida y bebida, Rayo de hechicería, Rayo guía, Rayo nauseabundo, Reprensión infernal, Represión infernal, Retirada expeditiva, Risa horrible de Tasha, Rociada de color, Saeta guía, Salto, Santuario, Sirviente invisible, Susurros discordantes, Texto ilusorio, Tormenta de espinas, Zancada prodigiosa
- Nivel 2: Abrir, Agrandar/Reducir, Aliento de Dragón, Alterar el propio aspecto, Arma espiritual, Arma mágica, Augurio, Aura mágica de Nystul, Auxilio, Ayuda, Boca mágica, Calentar metal, Calmar emociones, Castigo brillante, Cerradura arcana, Clavo mental, Contorno borroso, Cordón de flechas, Corona de la locura, Crecimiento de espinas, Crecimiento espinoso, Detectar pensamientos, Detectar trampas, Dulce descanso, Embelesar, Esfera de llamas, Esfera flamígera, Flecha Ácida de Melf, Fuerza fantasmal, Hacer añicos, Hallar corcel, Hoja de fuego, Imagen múltiple, Inmovilizar persona, Invisibilidad, Invocar bestia, Levitar, Llama permanente, Localizar animales o plantas, Localizar objeto, Mejorar característica, Mensajero animal, Nube de dagas, Oscuridad, Pasar sin rastro, Paso brumoso, Piel robliza, Plegaria de curación, Potenciar característica, Protección contra veneno, Ráfaga de viento, Rayo abrasador, Rayo de luna, Rayo debilitador, Restablecimiento menor, Sentidos de la bestia, Silencio, Sordera/Ceguera, Sugestión, Telaraña, Trepar cual arácnido, Truco de la cuerda, Ver invisibilidad, Ver lo invisible, Vigor arcano, Vínculo protector, Visión en la oscuridad, Zona de la verdad
- Nivel 3: Acelerar, Animar a los muertos, Arma elemental, Aura de vitalidad, Bola de fuego, Caminar sobre el agua, Castigo cegador, Círculo mágico, Clarividencia, Conjurar animales, Conjurar descarga de proyectiles, Contrahechizo, Corcel fantasma, Crear comida y agua, Crecimiento vegetal, Desplazamiento, Disipar magia, Don de lenguas, Espíritus guardianes, Fingir muerte, Flecha de relámpago, Forma Gaseosa, Fundirse con la Piedra, Glifo Custodio, Hablar con las Plantas, Hablar con los Muertos, Hambre de Hadar, Imagen mayor, Imponer maldición, Indetectable, Invocar feérico, Invocar muerto viviente, Levantar maldición, Llamar al relámpago, Luz del día, Manto del cruzado, Miedo, Muro de viento, Nube apestosa, Palabra curativa en masa, Palabra de curación en masa, Patrón hipnótico, Pequeña choza de Leomund, Protección contra energía, Ralentizar, Recado, Relámpago, Respirar bajo el agua, Revivir, Señal de esperanza, Terror, Toque vampírico, Tormenta de aguanieve, Volar
- Nivel 4: Adivinación, Asesino fantasmal, Aura de pureza, Aura de vida, Castigo abrumador, Cofre oculto de Leomund, Compulsión, Confusión, Conjurar elementales menores, Conjurar seres del bosque, Controlar agua, Destierro, Dominar bestia, Enredadera, Escudo de fuego, Esfera elástica de Otiluke, Esfera Vitriólica, Fabricar, Fuente de Luz Lunar, Guarda contra la Muerte, Guardián de la Fe, Hechizar monstruo, Insecto gigante, Invisibilidad mejorada, Invocar aberración, Invocar autómata, Invocar elemental, Libertad de movimiento, Localizar criatura, Marchitar, Mastín fiel de Mordenkainen, Moldear la piedra, Muro de fuego, Ojo arcano, Piel pétrea, Polimorfar, Puerta dimensional, Sanctasanctórum privado de Mordenkainen, Tentáculos negros de Evard, Terreno alucinatorio, Tormenta de hielo
- Nivel 5: Alterar los recuerdos, Alzar a los muertos, Animar objetos, Apariencia, Atadura planar, Caparazón antivida, Carcaj veloz, Castigo desterrador, Círculo de poder, Círculo de teletransportación, Comunión, Comunión con la naturaleza, Conjurar elemental, Conjurar lluvia de flechas, Cono de frío, Conocer las leyendas, Consagrar, Contactar con otro plano, Contagio, Creación, Curar heridas en masa, Despertar, Disipar el bien y el mal, Dominar persona, Engañar, Enlace telepático de Rary, Ensueño, Escudriñar, Estática Sináptica, Geas, Golpe de Viento Acerado, Golpe Flamígero, Inmovilizar monstruo, Invocar celestial, Invocar dragón, Mano de Bigby, Muro de fuerza, Muro de piedra, Nube aniquiladora, Ola destructora, Pasamuros, Paso arbóreo, Plaga de insectos, Presencia regia de Yolande, Reencarnar, Restablecimiento mayor, Telequinesis, Tormenta resplandeciente de Jallarzi
- Nivel 6: Aliado planar, Baile irresistible de Otto, Barrera de cuchillas, Caldero burbujeante de Tasha, Círculo de muerte, Conjurar feérico, Contingencia, Crear muerto viviente, Curar, Dañar, De la carne a la piedra, Desintegrar, Encontrar el camino, Esfera congelante de Otiluke, Festín de Héroes, Globo de Invulnerabilidad, Guardas y guardias, Ilusión programada, Invocación instantánea de Drawmij, Invocar infernal, Mal de ojo, Mover la tierra, Muro de espinas, Muro de hielo, Palabra de regreso, Prohibición, Puerta arcana, Rayo solar, Relámpago en cadena, Sugestión en masa, Urna mágica, Viajar con el viento, Viajar mediante plantas, Visión veraz
- Nivel 7: Bola de fuego de explosión retardada, Conjurar celestial, Dedo de la muerte, Desplazamiento entre planos, Espada de mordenkainen, Espejismo arcano, Excursión etérea, Invertir la gravedad, Jaula de fuerza, Mansión magnífica de mordenkainen, Palabra de poder: fortalecer, Palabra divina, Proyectar imagen, Recluir, Regenerar, Resurrección, Rociada prismática, Símbolo, Simulacro, Teletransporte, Tormenta de fuego
- Nivel 8: Antipatía/Simpatía, Aspectos animales, Aura sagrada, Campo antimagia, Clon, Controlar el clima, Dominar monstruo, Dragón ilusorio, Explosión Solar, Laberinto, Labia, Marchitamiento horrendo de Abi-Dalzim, Mente en blanco, Nube incendiaria, Ofuscación, Oscuridad enloquecedora, Palabra de poder: aturdir, Semiplano, Telepatía, Terremoto, Tsunami
- Nivel 9: Cambiar de forma, Cautiverio, Curar en masa, Deseo, Muro prismático, Palabra de poder: matar, Palabra de poder: sanar, Parar el tiempo, Polimorfar verdadero, Portal, Presciencia, Proyección astral, Resurrección verdadera, Terror abyecto, Tormenta de la venganza, Tormenta de meteoritos
