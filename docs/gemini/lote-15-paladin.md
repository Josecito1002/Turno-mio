# Encargo: Lote 15 (Paladín) de la app "Mi turno"

Eres un asistente de investigación de reglas de D&D 5.ª edición revisada (2024). "Mi turno" es una app de hojas de
personaje en español. Tu trabajo: revisar todo lo que la app tiene de la clase **Paladín** contra la versión oficial más
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

**A. Datos** (TypeScript, archivo `scripts/datos/paladin-2024.ts`). Este formato exacto:

```ts
const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const PALADIN_2024 = {
  // Rasgos de la clase de nivel 7 a 20 (los de nivel 1 a 6 ya los tiene la app)
  rasgosAltos: [
    r(9, 'Nombre del rasgo', 'accion', 'Texto propio.', { usos: 1, reset: 'largo' }),  // usos/reset solo si tiene usos fijos
  ],
  // Rasgos de nivel 6 en adelante de las subclases que la app trae integradas (clave: devocion, gloria, antiguos, venganza)
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

### Clase Paladín, niveles 1 a 6 (integrados en la app)
- Nivel 1 · Imposición de Manos [adicional]: Tocas a una criatura y le devuelves PG de tu reserva (100 por descanso largo), o gastas 5 para quitarle Envenenado.
- Nivel 1 · Maestría con Armas [pasiva]: Usas la maestría de 2 tipos de armas (elígelas en Equipo). Puedes cambiarlas en cada descanso largo.
- Nivel 2 · Castigo Divino [adicional]: Justo después de golpear con un arma cuerpo a cuerpo o sin armas: +2d8 radiante, +1d8 por nivel de espacio por encima de 1, +1d8 contra infernales y muertos vivientes.
- Nivel 2 · Estilo de Combate [pasiva]: Eliges un estilo en Clase.
- Nivel 3 · Sentido Divino [adicional]: 10 minutos: sabes dónde hay celestiales, infernales y muertos vivientes a 60 pies.
- Nivel 3 · Canalizar Divinidad [pasiva]: 3 usos; recuperas uno con descanso corto y todos con uno largo.
- Nivel 5 · Ataque Extra [pasiva]: Cuando usas la acción Atacar, atacas dos veces.
- Nivel 5 · Montura Fiel [accion]: Siempre tienes preparado Encontrar corcel.
- Nivel 6 · Aura de Protección [pasiva]: Tú y aliados a 10 pies sumáis +3 a las salvaciones mientras no estés Incapacitado.


### Rasgos de nivel alto de la clase (biblioteca)
- Nivel 11 · Castigo Radiante [pasiva]: Todos tus ataques con arma infligen 1d8 radiante extra permanentemente.
- Nivel 9 · Ahuyentar Enemigos [accion]: Acción Mágica. Gasta Canalizar Divinidad para asustar enemigos a 60 pies (Salvación SAB).
- Nivel 14 · Toque Restaurador [pasiva]: Cuando usas Imposición de Manos, puedes eliminar condiciones: Cegado, Encantado, Ensordecido, Asustado, Paralizado o Aturdido (Coste 5 PG).

### Juramento de Devoción (integrada, clave `devocion`)
- Nivel 3 · Arma Sagrada [gratis]: Al usar la acción Atacar, imbuyes un arma cuerpo a cuerpo 10 minutos: +3 al ataque con ella, puede hacer daño radiante y da luz a 20 pies.
- Nivel 3 · Conjuros del juramento [pasiva]: Siempre preparados: Protección contra el bien y el mal, Escudo de fe, Ayuda, Zona de verdad.
- Nivel 7 · Aura de Devoción [pasiva]: Aliados en tu aura no pueden ser hechizados.
- Nivel 15 · Pureza de Espíritu [pasiva]: Protección contra el Bien y el Mal constante.
- Nivel 20 · Halo Sagrado [pasiva]: Emanas luz solar que daña enemigos y te da ventaja contra conjuros de infernales/no-muertos.

### Juramento de la Gloria (integrada, clave `gloria`)
- Nivel 3 · Atleta Inigualable [adicional]: 1 hora: ventaja en Atletismo y Acrobacias, y tus saltos aumentan 10 pies.
- Nivel 3 · Castigo Inspirador [gratis]: Justo después de lanzar Castigo Divino, repartes 2d8 + 20 PG temporales entre criaturas a 30 pies.
- Nivel 3 · Conjuros del juramento [pasiva]: Siempre preparados: Rayo guía, Heroísmo, Mejorar característica, Arma mágica.
- Nivel 7 · Aura de Alacridad [pasiva]: Aumenta la velocidad de movimiento de aliados cercanos.
- Nivel 15 · Defensa Gloriosa [reaccion]: Reacción para sumar CA a un aliado y contraatacar.
- Nivel 20 · Leyenda Viva [pasiva]: Ventaja en CAR, un fallo se vuelve éxito y ataques siempre impactan.

### Juramento de los Antiguos (integrada, clave `antiguos`)
- Nivel 3 · Ira de la Naturaleza [accion]: Criaturas que elijas a 15 pies: salvación de FUE CD 15 o Apresadas 1 minuto (repiten al final de sus turnos).
- Nivel 3 · Conjuros del juramento [pasiva]: Siempre preparados: Hablar con los animales, Golpe atrapador, Rayo de luna, Paso brumoso.
- Nivel 7 · Aura de Resistencia [pasiva]: Tú y aliados tenéis resistencia al daño de conjuros.
- Nivel 15 · Centinela Inmortal [pasiva]: Cuando caes a 0 PG, quedas a 1 PG en su lugar (1/día).
- Nivel 20 · Campeón Antiguo [adicional]: Transformación: curación constante y lanzas conjuros como acción adicional.

### Juramento de Venganza (integrada, clave `venganza`)
- Nivel 3 · Voto de Enemistad [gratis]: Al usar la acción Atacar, eliges una criatura a 30 pies: ventaja en tus ataques contra ella durante 1 minuto.
- Nivel 3 · Conjuros del juramento [pasiva]: Siempre preparados: Perdición, Marca del cazador, Inmovilizar persona, Paso brumoso.
- Nivel 7 · Vengador Implacable [gratis]: Cuando golpeas con ataque de oportunidad, puedes moverte tras el enemigo.
- Nivel 15 · Alma de Venganza [reaccion]: Cuando tu objetivo de Voto te ataca, puedes contraatacar como reacción.
- Nivel 20 · Ángel Vengador [pasiva]: Vuelo y aura de miedo que inmoviliza a los enemigos.

### Juramento de los Genios Nobles (biblioteca, clave `genios-nobles`)
- Nivel 3 · Castigo Elemental [pasiva]: Inmediatamente después de lanzar Castigo Divino, puedes gastar un uso de tu Canalizar Divinidad e invocar uno de los siguientes efectos. Aplastamiento del Dao: la tierra se alza alrededor del objetivo de tu Castigo Divino. El objetivo queda Agarrado (CD para escapar igual a tu CD de salvación de conjuros). Mientras está Agarrado, el objetivo queda Apresado. Escape del Djinn: te teletransportas a un espacio desocupado que puedas ver a 30 pies o menos de ti y adoptas una forma semi-incorpórea, que dura hasta el final de tu siguiente turno. Mientras estás en esta forma, tienes Resistencia al daño contundente, perforante y cortante, y tienes Inmunidad a los estados Agarrado, Derribado y Apresado. Furia del Efreeti: el objetivo de tu Castigo Divino recibe 2d4 de daño de Fuego adicional, y el fuego salta del objetivo a otra criatura que puedas ver a 30 pies o menos de ti. La segunda criatura también recibe 2d4 de daño de Fuego. Oleada de la Marid: el objetivo de tu Castigo Divino y cada criatura de tu elección en una emanación de 10 pies originada en ti hacen una tirada de salvación de Fuerza contra tu CD de salvación de conjuros. Si falla, la criatura es empujada 15 pies en línea recta alejándose de ti y queda Derribada.
- Nivel 3 · Conjuros del Genio [pasiva]: Cuando alcanzas un nivel de Paladín indicado en la tabla Conjuros del Genio, a partir de ese momento siempre tienes preparados los conjuros indicados. Nivel 3: Orbe Cromático, Elementalismo, Castigo Atronador. Nivel 5: Imagen Espejo, Fuerza Fantasmal. Nivel 9: Volar, Forma Gaseosa. Nivel 13: Conjurar Elementales Menores, Invocar Elemental. Nivel 17: Castigo Desterrador, Contactar con Otro Plano. Al inicio de cada uno de tus turnos, puedes cambiar el tipo de daño afectado por este rasgo a una de las otras opciones indicadas (sin requerir acción).
- Nivel 15 · Reprimenda Elemental [reaccion]: Cuando recibes el impacto de una tirada de ataque, puedes usar una Reacción para reducir a la mitad (redondeando hacia abajo) el daño del ataque contra ti y forzar al atacante a hacer una tirada de salvación de Destreza contra tu CD de salvación de conjuros. Si falla, el atacante recibe daño igual a 2d10 + tu modificador de Carisma de uno de los siguientes tipos (a tu elección): Ácido, Frío, Fuego, Relámpago o Trueno. Si la supera, el atacante recibe la mitad de ese daño. Puedes usar este rasgo una cantidad de veces igual a tu modificador de Carisma (mínimo una), y recuperas todos los usos gastados cuando terminas un Descanso Largo.
- Nivel 20 · Vástago Noble [adicional]: Como Acción Adicional, obtienes los beneficios indicados a continuación durante 10 minutos o hasta que los termines (sin requerir acción). Una vez que uses este rasgo, no puedes volver a usarlo hasta que termines un Descanso Largo. También puedes restaurar su uso gastando un espacio de conjuro de nivel 5 (sin requerir acción). Vuelo: tienes velocidad de vuelo de 60 pies y puedes flotar. Deseo Menor: cuando tú o un aliado en tu Aura de Protección falla una prueba de d20, puedes usar una Reacción para que tú o ese aliado tengáis éxito en su lugar.

## Pendientes de este lote en la revisión (selectores por hacer, subclases que faltan respecto a D&D Beyond, rasgos dudosos)

(Por agregar (faltan respecto a D&D Beyond))
#### Lote 15: Paladín

- [ ] **Juramento de Conquista** (Xanathar's Guide to Everything)
- [ ] **Juramento de Redención** (Xanathar's Guide to Everything)
- [ ] **Juramento de los Vigilantes** (Tasha's Cauldron of Everything)
- [ ] **Juramento de la Corona** (Sword Coast Adventurer's Guide)
- [ ] **Rompejuramentos** (Guía del Dungeon Master 2014)

#### Lote 15: Paladín (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 13. Con tipo claro: 6. Ya revisados: 0.

#### Paladín

- [ ] **Castigo Radiante** (nivel 11): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción
- [ ] **Toque Restaurador** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Juramento de los Genios Nobles

- [ ] **Castigo Elemental** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse
- [ ] **Conjuros del Genio** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse

#### Juramento de Devoción

- [ ] **Aura de Devoción** (nivel 7): hoy `pasiva`, no menciona tipo de acción
- [ ] **Pureza de Espíritu** (nivel 15): hoy `pasiva`, no menciona tipo de acción
- [ ] **Halo Sagrado** (nivel 20): hoy `pasiva`, no menciona tipo de acción

#### Juramento de la Gloria

- [ ] **Aura de Alacridad** (nivel 7): hoy `pasiva`, no menciona tipo de acción
- [ ] **Leyenda Viva** (nivel 20): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción

#### Juramento de los Antiguos

- [ ] **Aura de Resistencia** (nivel 7): hoy `pasiva`, no menciona tipo de acción
- [ ] **Centinela Inmortal** (nivel 15): hoy `pasiva`, no menciona tipo de acción

#### Juramento de Venganza

- [ ] **Vengador Implacable** (nivel 7): hoy `gratis`, no menciona tipo de acción
- [ ] **Ángel Vengador** (nivel 20): hoy `pasiva`, no menciona tipo de acción

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
