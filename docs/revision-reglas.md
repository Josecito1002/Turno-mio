# Revisión de reglas de la biblioteca

Rasgos de la biblioteca sin regla revisada en `web/src/features/reglas/data/reglas-revisadas.ts` cuyo tipo es dudoso:
el clasificador los deja como pasiva aunque su texto sugiere que se activan, o su texto no menciona ningún tipo de acción.

Generado con `npx tsx scripts/auditar-reglas.ts` (desde `web/`). Pendientes al generar: 227.
Al marcar una casilla, agrega al final una nota corta con la fuente si hubo que investigar.

## Selectores

Elecciones que se hacen al crear el personaje o al subir de nivel y cambian la hoja; se eligen en el paso Clase o en el diálogo de subida.
Las que se deciden al usar el rasgo (a quién, qué efecto) no llevan selector: salen como opciones en tu turno.

### Hechos

- [x] **Cazador de Sangre: maldiciones conocidas**: 1 a 5 según nivel; solo salen las conocidas. <!-- selector|maldiciones -->
- [x] **Cazador de Sangre: ritos carmesí**: 1 a 3 según nivel; los esotéricos desde nivel 14. <!-- selector|ritos -->
- [x] **Orden del Alma Profana: patrón**: decide su Enfoque del Rito y sus conjuros de Arcano. <!-- selector|patron-alma-profana -->
- [x] **Orden del Mutante: fórmulas**: 4 a 8 según nivel; cada mutágeno conocido sale como acción adicional. <!-- selector|formulas-mutante -->
- [x] **Armero: modelo de armadura**: deja solo su arma y sus opciones; el Infiltrador suma velocidad. <!-- selector|modelo-armero -->
- [x] **Corazón Salvaje: Aspecto de lo Salvaje**: Búho (visión en la oscuridad en el cálculo), Pantera o Salmón. La Furia y el Poder de lo Salvaje, que se eligen al entrar en furia, van como opciones. <!-- selector|aspecto-salvaje -->
- [x] **Kobold: Legado Kobold**: Astucia, Desafío o Hechicería Dracónica (paso Especie). <!-- selector|legado-kobold -->
- [x] **Híbrido Simic: mejoras animales**: una en nivel 1 y otra en nivel 5 (paso Especie); Caparazón y Apéndices en el cálculo, Escupir Ácido como acción. <!-- selector|simic -->
- [x] **Bardo: Secretos Mágicos y Descubrimientos Mágicos**: el paso Conjuros ofrece también las listas de clérigo, druida y mago. <!-- selector|descubrimientos-magicos -->

### Clases de las reglas (no están en ningún lote)

- [ ] **Brujo: invocaciones sobrenaturales**: 1 a 10 según nivel; en 2024 los pactos (Cadena, Filo, Tomo) son invocaciones, así que reemplaza la casilla "Pacto de la Cadena". <!-- selector|invocaciones -->
- [ ] **Brujo: Arcano místico**: un conjuro de nivel 6, 7, 8 y 9 en los niveles 11, 13, 15 y 17. <!-- selector|arcano-mistico -->
- [ ] **Clérigo: Orden Divina**: Protector (armadura pesada y armas marciales) o Taumaturgo (un truco más y SAB a Arcanos o Religión); cambia competencias y trucos. <!-- selector|orden-divina -->
- [ ] **Druida: Orden Primordial**: Mago (un truco más y SAB a Arcanos o Naturaleza) o Guardián (armadura media y armas marciales). <!-- selector|orden-primordial -->
- [ ] **Druida: formas de Forma Salvaje**: 4, 6 y 8 bestias conocidas en los niveles 2, 4 y 8. <!-- selector|formas-salvajes -->
- [ ] **Hechicero: Metamagia**: 2, 4 y 6 opciones en los niveles 2, 10 y 17; cada una saldría con su coste en puntos. <!-- selector|metamagia -->
- [ ] **Hechicería Dracónica: Afinidad Elemental**: tipo de daño (ácido, frío, fuego, relámpago o veneno): resistencia y CAR al daño de ese tipo. <!-- selector|afinidad-draconica -->
- [ ] **Mago: Dominio de Conjuros y Conjuros Distintivos**: conjuros de nivel 1 y 2 a voluntad (nivel 18) y dos de nivel 3 (nivel 20). <!-- selector|dominio-conjuros -->
- [ ] **Artífice y Arcanista: planos de Replicar Objeto Mágico**: 4 a 8 planos según nivel, de las tablas de 2025. <!-- selector|planos-artifice -->

### Lote 6: Bardo

- [ ] **Colegio de la Luna: truco de druida**: un truco de druida que no cuenta en el límite. <!-- selector|truco-luna -->

### Hechos

- [x] **Clérigo: Golpes Benditos (nivel 7)**: Golpe Divino o Lanzamiento Potente; el texto sube a 2d8 o da PG temporales en el nivel 14. <!-- selector|golpes-benditos -->
- [x] **Dominio del Conocimiento: Bendiciones del Saber**: unas herramientas de artesano y dos habilidades con pericia (Arcanos, Historia, Naturaleza o Religión), sumadas en el cálculo. <!-- selector|bendiciones-saber -->

### Lote 9: Druida

- [ ] **Furia Elemental (nivel 7)**: Golpe Primigenio o Lanzamiento Potente. <!-- selector|furia-elemental -->
- [ ] **Círculo de la Tierra: tipo de tierra**: Árida, Polar, Templada o Tropical; decide los conjuros siempre preparados. <!-- selector|tipo-tierra -->

### Lote 10: Explorador

- [ ] **Cazador: Presa del Cazador y Tácticas Defensivas**: Asesino de Colosos o Rompehordas (nivel 3) y su defensa (nivel 7); se cambian en un descanso. <!-- selector|presa-cazador -->
- [ ] **Maestro de Bestias: bestia primigenia**: de tierra, de mar o del cielo; cambia sus estadísticas y su ataque. <!-- selector|bestia-primigenia -->

### Lote 11: Guerrero

- [ ] **Campeón: Estilo de Combate Adicional**: un segundo estilo; en 2024 es en el nivel 7 (la biblioteca dice 10). <!-- selector|estilo-campeon -->
- [ ] **Maestro de Batalla: maniobras y Estudiante de la Guerra**: maniobras conocidas según nivel, cada una como opción con su dado de superioridad; más una herramienta y una habilidad. <!-- selector|maniobras -->

### Lote 16: Pícaro

- [ ] **Vástago de los Tres: Lealtad Temible**: Bane, Bhaal o Myrkul: su resistencia y su truco. <!-- selector|lealtad-tres -->

## Por agregar (faltan respecto a D&D Beyond)

Se agregan en el lote de su clase, con su versión oficial más reciente. Las marcadas con «no se agrega» ya las reemplazó el contenido de 2024.

### Lote 5: Bárbaro

- [ ] **Senda de la Bestia** (Tasha's Cauldron of Everything) <!-- agregar|senda de la bestia -->
- [ ] **Senda de la Magia Salvaje** (Tasha's Cauldron of Everything) <!-- agregar|senda de la magia salvaje -->
- [ ] **Senda del Guardián Ancestral** (Xanathar's Guide to Everything) <!-- agregar|senda del guardian ancestral -->
- [ ] **Senda del Heraldo de la Tormenta** (Xanathar's Guide to Everything) <!-- agregar|senda del heraldo de la tormenta -->
- [ ] **Senda del Gigante** (Bigby Presents: Glory of the Giants) <!-- agregar|senda del gigante -->
- [ ] **Senda del Rabioso de Batalla** (Sword Coast Adventurer's Guide) <!-- agregar|senda del rabioso de batalla -->
- [x] **Senda del Guerrero Totémico** (Manual del Jugador 2014): no se agrega, la reemplaza la Senda del Corazón Salvaje (2024), que ya está. <!-- agregar|senda del guerrero totemico -->

### Lote 6: Bardo

- [ ] **Colegio de la Creación** (Tasha's Cauldron of Everything) <!-- agregar|colegio de la creacion -->
- [ ] **Colegio de la Elocuencia** (Tasha's Cauldron of Everything) <!-- agregar|colegio de la elocuencia -->
- [ ] **Colegio de las Espadas** (Xanathar's Guide to Everything) <!-- agregar|colegio de las espadas -->
- [ ] **Colegio de los Susurros** (Xanathar's Guide to Everything) <!-- agregar|colegio de los susurros -->

### Lote 7: Brujo

- [ ] **El Filo Maldito (Hexblade)** (Xanathar's Guide to Everything) <!-- agregar|el filo maldito (hexblade) -->
- [ ] **El Genio** (Tasha's Cauldron of Everything) <!-- agregar|el genio -->
- [ ] **El Insondable** (Tasha's Cauldron of Everything) <!-- agregar|el insondable -->
- [ ] **El Inmortal** (Sword Coast Adventurer's Guide) <!-- agregar|el inmortal -->

### Lote 8: Clérigo

- [x] **Dominio de la Tempestad** (Manual del Jugador 2014): agregado. <!-- agregar|dominio de la tempestad -->
- [x] **Dominio de la Naturaleza** (Manual del Jugador 2014): agregado. <!-- agregar|dominio de la naturaleza -->
- [x] **Dominio de la Forja** (Xanathar's Guide to Everything): agregado. <!-- agregar|dominio de la forja -->
- [x] **Dominio del Orden** (Tasha's Cauldron of Everything): agregado. <!-- agregar|dominio del orden -->
- [x] **Dominio de la Paz** (Tasha's Cauldron of Everything): agregado. <!-- agregar|dominio de la paz -->
- [x] **Dominio del Crepúsculo** (Tasha's Cauldron of Everything): agregado. <!-- agregar|dominio del crepusculo -->
- [x] **Dominio Arcano** (Sword Coast Adventurer's Guide): agregado en su versión de Arcana Unleashed (2026). <!-- agregar|dominio arcano -->
- [x] **Dominio de la Muerte** (Guía del Dungeon Master 2014): agregado. <!-- agregar|dominio de la muerte -->

### Lote 9: Druida

- [ ] **Círculo de los Sueños** (Xanathar's Guide to Everything) <!-- agregar|circulo de los suenos -->
- [ ] **Círculo del Pastor** (Xanathar's Guide to Everything) <!-- agregar|circulo del pastor -->
- [ ] **Círculo de las Esporas** (Tasha's Cauldron of Everything) <!-- agregar|circulo de las esporas -->
- [ ] **Círculo del Fuego Salvaje** (Tasha's Cauldron of Everything) <!-- agregar|circulo del fuego salvaje -->

### Lote 10: Explorador

- [ ] **Trotamundos del Horizonte** (Xanathar's Guide to Everything) <!-- agregar|trotamundos del horizonte -->
- [ ] **Cazador de Monstruos** (Xanathar's Guide to Everything) <!-- agregar|cazador de monstruos -->
- [ ] **Guardián del Enjambre** (Tasha's Cauldron of Everything) <!-- agregar|guardian del enjambre -->
- [ ] **Guardián Dracónico** (Fizban's Treasury of Dragons) <!-- agregar|guardian draconico -->

### Lote 11: Guerrero

- [ ] **Arquero Arcano** (Xanathar's Guide to Everything) <!-- agregar|arquero arcano -->
- [ ] **Caballero (Cavalier)** (Xanathar's Guide to Everything) <!-- agregar|caballero (cavalier) -->
- [ ] **Samurái** (Xanathar's Guide to Everything) <!-- agregar|samurai -->
- [ ] **Caballero Rúnico** (Tasha's Cauldron of Everything) <!-- agregar|caballero runico -->
- [ ] **Caballero del Eco** (Explorer's Guide to Wildemount) <!-- agregar|caballero del eco -->

### Lote 12: Hechicero

- [ ] **Alma Divina** (Xanathar's Guide to Everything) <!-- agregar|alma divina -->
- [ ] **Hechicería de la Tormenta** (Xanathar's Guide to Everything) <!-- agregar|hechiceria de la tormenta -->
- [ ] **Hechicería Lunar** (Dragonlance: Shadow of the Dragon Queen) <!-- agregar|hechiceria lunar -->

### Lote 13: Mago

- [ ] **Magia de Guerra** (Xanathar's Guide to Everything) <!-- agregar|magia de guerra -->
- [ ] **Orden de los Escribas** (Tasha's Cauldron of Everything) <!-- agregar|orden de los escribas -->
- [ ] **Cronurgia** (Explorer's Guide to Wildemount) <!-- agregar|cronurgia -->
- [ ] **Graviturgia** (Explorer's Guide to Wildemount) <!-- agregar|graviturgia -->

### Lote 14: Monje

- [ ] **Camino del Maestro Borracho** (Xanathar's Guide to Everything) <!-- agregar|camino del maestro borracho -->
- [ ] **Camino del Kensei** (Xanathar's Guide to Everything) <!-- agregar|camino del kensei -->
- [ ] **Camino del Alma Solar** (Xanathar's Guide to Everything) <!-- agregar|camino del alma solar -->
- [ ] **Camino del Yo Astral** (Tasha's Cauldron of Everything) <!-- agregar|camino del yo astral -->
- [ ] **Camino del Dragón Ascendente** (Fizban's Treasury of Dragons) <!-- agregar|camino del dragon ascendente -->
- [ ] **Camino de la Larga Muerte** (Sword Coast Adventurer's Guide) <!-- agregar|camino de la larga muerte -->

### Lote 15: Paladín

- [ ] **Juramento de Conquista** (Xanathar's Guide to Everything) <!-- agregar|juramento de conquista -->
- [ ] **Juramento de Redención** (Xanathar's Guide to Everything) <!-- agregar|juramento de redencion -->
- [ ] **Juramento de los Vigilantes** (Tasha's Cauldron of Everything) <!-- agregar|juramento de los vigilantes -->
- [ ] **Juramento de la Corona** (Sword Coast Adventurer's Guide) <!-- agregar|juramento de la corona -->
- [ ] **Rompejuramentos** (Guía del Dungeon Master 2014) <!-- agregar|rompejuramentos -->

### Lote 16: Pícaro

- [ ] **Mente Maestra** (Xanathar's Guide to Everything) <!-- agregar|mente maestra -->
- [ ] **Espadachín** (Xanathar's Guide to Everything) <!-- agregar|espadachin -->
- [ ] **Explorador (Scout)** (Xanathar's Guide to Everything) <!-- agregar|explorador (scout) -->

### Especies

- [ ] **Aarakocra** (Monsters of the Multiverse) <!-- agregar|aarakocra -->
- [ ] **Gnomo de las Profundidades** (Monsters of the Multiverse) <!-- agregar|gnomo de las profundidades -->
- [ ] **Duergar** (Monsters of the Multiverse) <!-- agregar|duergar -->
- [ ] **Dracónido de gema (amatista, cristal, esmeralda, zafiro, topacio): agregar a los linajes del Dracónido** (Fizban's Treasury of Dragons) <!-- agregar|draconido de gema (amatista, cristal, esmeralda, zafiro, topacio): agregar a los linajes del draconido -->
- [x] **Semielfo y Semiorco** (Manual del Jugador 2014): no se agrega, el Manual 2024 los quitó (se juega con los padres de cada especie); solo quedan como contenido antiguo. <!-- agregar|semielfo y semiorco -->
- [x] **Aasimar: variantes Protector, Azote y Caído** (Volo's Guide to Monsters): no se agrega, el Aasimar 2024 ya no tiene variantes: sus poderes se eligen al usar Revelación Celestial. <!-- agregar|aasimar: variantes protector, azote y caido -->
- [x] **Tiefling: variantes de Mordenkainen** (Mordenkainen's Tome of Foes): no se agrega, el Tiefling 2024 usa los legados Abisal, Ctónico e Infernal, que ya están. <!-- agregar|tiefling: variantes de mordenkainen -->

### Trasfondos

- [x] **Héroe del Pueblo** (Manual del Jugador 2014): no se agrega, el Manual 2024 los reemplazó por sus 16 trasfondos (Artesano, Guía, Vagabundo...). <!-- agregar|heroe del pueblo -->
- [x] **Huérfano** (Manual del Jugador 2014): no se agrega, el Manual 2024 los reemplazó por sus 16 trasfondos (Artesano, Guía, Vagabundo...). <!-- agregar|huerfano -->
- [x] **Forastero** (Manual del Jugador 2014): no se agrega, el Manual 2024 los reemplazó por sus 16 trasfondos (Artesano, Guía, Vagabundo...). <!-- agregar|forastero -->
- [x] **Artesano Gremial** (Manual del Jugador 2014): no se agrega, el Manual 2024 los reemplazó por sus 16 trasfondos (Artesano, Guía, Vagabundo...). <!-- agregar|artesano gremial -->
- [x] **Viajero Lejano** (Sword Coast Adventurer's Guide): no se agrega, ya está como «Forastero Errante». <!-- agregar|viajero lejano -->

## Lote 1: Cazador de Sangre (clase y sus 4 órdenes)

Fuente: Blood Hunter de Matt Mercer, versión 2022 (v1.1.4, la actual de D&D Beyond: dndbeyond.com/classes/blood-hunter). Donde la biblioteca trae otro rasgo en ese nivel, la regla lo renombra con el oficial (se indica con →).

Dudosos: 0. Con tipo claro: 0. Ya revisados: 35.


### Revisados

- [x] **Perdición del Cazador**: `pasiva`. igual que 2022. <!-- cazador de sangre|perdicion del cazador -->
- [x] **Maldición de Sangre**: `pasiva + las 8 maldiciones de reacción o adicional`. usos 1/2/3/4 por descanso corto; conocidas 1/2/3/4/5 en niveles 1/6/10/14/18 (la biblioteca traía 13 y 17). la biblioteca traía 3 maldiciones inventadas; ahora son las 8 oficiales, con Sin Ojos, Exposición y Títere Caído como reacción.. Las maldiciones que conoces se eligen en el paso Clase y solo salen esas <!-- cazador de sangre|maldicion de sangre -->
- [x] **Estilo de Combate** (nivel 2): `pasiva`. 2022 solo permite Arquería, Duelo, Arma a Dos Manos y Dos Armas; el paso Clase todavía ofrece la lista de la biblioteca. <!-- cazador de sangre|estilo de combate -->
- [x] **Rito Carmesí** (nivel 2): `adicional`. dura hasta el descanso (la biblioteca traía 1 hora); cuesta daño necrótico; ritos conocidos 1/2/3 en niveles 2/7/14.. Los ritos que conoces se eligen en el paso Clase <!-- cazador de sangre|rito carmesi -->
- [x] **Ataque Extra** (nivel 5): `pasiva`. <!-- cazador de sangre|ataque extra -->
- [x] **Marca de Castigo** (nivel 6): `gratis`. se activa al dañar con un arma con rito (la biblioteca traía "al golpear con un arma"); 1 por descanso corto. <!-- cazador de sangre|marca de castigo -->
- [x] **Psicometría Sombría** (nivel 9): `fuera`. igual que 2022. <!-- cazador de sangre|psicometria sombria -->
- [x] **Aumento Oscuro** (nivel 10): `pasiva`. velocidad y salvaciones en el cálculo. <!-- cazador de sangre|aumento oscuro -->
- [x] **Marca de Atadura** (nivel 13): `pasiva`. igual que 2022. <!-- cazador de sangre|marca de atadura -->
- [x] **Alma Endurecida** (nivel 14): `pasiva`. igual que 2022. <!-- cazador de sangre|alma endurecida -->
- [x] **Maestría Sanguínea** (nivel 20): `gratis`. igual que 2022. <!-- cazador de sangre|maestria sanguinea -->
- [x] **Rito del Alba** (nivel 3): `pasiva`. 2022: luz brillante a 20 pies, resistencia necrótica y un dado más contra muertos vivientes. <!-- orden del cazafantasmas|rito del alba -->
- [x] **Maldición del Espectro** (nivel 3): `pasiva → Especialista en Maldiciones`. +1 uso de Maldición de Sangre para todo (la biblioteca traía "solo contra espíritus"), sumado al recurso. <!-- orden del cazafantasmas|maldicion del espectro -->
- [x] **Paso Etéreo** (nivel 7): `gratis`. Aether Walk de 2022: 1 uso, 2 desde nivel 15. <!-- orden del cazafantasmas|paso etereo -->
- [x] **Venganza de Sangre** (nivel 11): `pasiva → Marca de Ruptura`. la biblioteca traía otro rasgo; 2022: un dado de rito más en cada golpe, ya contado en Rito Carmesí. <!-- orden del cazafantasmas|venganza de sangre -->
- [x] **Alma Sangrienta** (nivel 15): `adicional → Maldición del Exorcista`. la biblioteca traía un rasgo que no existe en 2022. <!-- orden del cazafantasmas|alma sangrienta -->
- [x] **Rito Crítico** (nivel 18): `gratis → Renacer del Rito`. la biblioteca traía otro rasgo. <!-- orden del cazafantasmas|rito critico -->
- [x] **Biología Alterada** (nivel 3): `pasiva → Sentidos Agudizados`. igual que 2022. <!-- orden del licantropo|biologia alterada -->
- [x] **Transformación Híbrida** (nivel 3): `adicional + Zarpazo extra`. 2022: 1 uso por descanso corto, 2 desde nivel 11, sin límite desde 18, hasta 1 hora (la biblioteca traía competencia y 1 minuto). Garras con FUE o DES, 1d6 y 1d8 desde nivel 11, más Poder Feral y el bono de ataque. <!-- orden del licantropo|transformacion hibrida -->
- [x] **Zancada Acechante** (nivel 7): `pasiva → Destreza del Acechador`. +10 de velocidad en el cálculo; bono a las garras. <!-- orden del licantropo|zancada acechante -->
- [x] **Regeneración Licantrópica** (nivel 11): `pasiva → Transformación Avanzada`. 2022: la regeneración funciona también fuera de la forma híbrida, y da el segundo uso. <!-- orden del licantropo|regeneracion licantropica -->
- [x] **Marca del Depredador** (nivel 15): `pasiva → Marca del Voraz`. igual que 2022, más ventaja contra la sed de sangre. <!-- orden del licantropo|marca del depredador -->
- [x] **Licantropía Maestra** (nivel 18): `pasiva + Maldición del Aullido (acción)`. la biblioteca traía "reduce a la mitad el daño de plata", que no está en 2022. <!-- orden del licantropo|licantropia maestra -->
- [x] **Fórmulas Alquímicas** (nivel 3): `pasiva → Fórmulas`. fórmulas conocidas 4/5/6/7/8 y la lista de mutágenos.. Las fórmulas se eligen en el paso Clase; cada mutágeno conocido sale como acción adicional <!-- orden del mutante|formulas alquimicas -->
- [x] **Fabricación de Mutágenos** (nivel 3): `fuera → Alquimia de Mutágenos + Tomar (adicional) y Purgar (acción)`. 2022: 1/2/3 mutágenos por descanso (la biblioteca traía competencia por descanso largo). <!-- orden del mutante|fabricacion de mutagenos -->
- [x] **Metabolismo Acelerado** (nivel 7): `adicional → Metabolismo Extraño`. 2022: inmunidad al veneno e ignorar una merma, 1 por descanso largo. <!-- orden del mutante|metabolismo acelerado -->
- [x] **Mutación Profunda** (nivel 11): `pasiva → Marca del Axioma`. igual que 2022, más completa. <!-- orden del mutante|mutacion profunda -->
- [x] **Sangre Reconstituida** (nivel 15): `adicional → Maldición de la Corrosión`. la biblioteca traía la inmunidad al veneno, que en 2022 está en nivel 7. <!-- orden del mutante|sangre reconstituida -->
- [x] **Mutación Química Total** (nivel 18): `adicional → Mutación Exaltada`. usos = modificador de hemomancia por descanso largo. <!-- orden del mutante|mutacion quimica total -->
- [x] **Pacto del Ocultismo** (nivel 3): `pasiva → Patrón de Otro Mundo`. 9 patrones de 2022, con los beneficios de Enfoque del Rito. <!-- orden del alma profana|pacto del ocultismo -->
- [x] **Magia del Pacto** (nivel 3): `pasiva`. espacios de pacto en el cálculo; conjuros conocidos según la tabla de 2022. <!-- orden del alma profana|magia del pacto -->
- [x] **Magia del Rito Imbuido** (nivel 7): `adicional → Frenesí Místico + Arcano Revelado (acción, 1 por descanso largo)`. la biblioteca traía Arcano Revelado, que en 2022 va en nivel 7; ahora es su opción. <!-- orden del alma profana|magia del rito imbuido -->
- [x] **Marca Arcánica** (nivel 11): `pasiva → Marca de la Cicatriz Debilitante`. la biblioteca traía otro rasgo. <!-- orden del alma profana|marca arcanica -->
- [x] **Revelación del Patrón** (nivel 15): `accion → Arcano Liberado`. 1 por descanso largo; conjuros de cada patrón. <!-- orden del alma profana|revelacion del patron -->
- [x] **Vínculo de Sangre Mágico** (nivel 18): `reaccion → Maldición del Devoraalmas`. la biblioteca traía otro rasgo. <!-- orden del alma profana|vinculo de sangre magico -->

## Lote 2: Arcanista (clase y sus 5 subclases)

Fuente: Artífice de Eberron: Forge of the Artificer (2025), vía los datos de 5etools (fuente EFA). Las subclases valen también para el Artífice de las reglas (clases.ts).

Dudosos: 0. Con tipo claro: 0. Ya revisados: 35.


### Revisados

- [x] **Lanzamiento de Conjuros**: `pasiva`. límite de trucos (2/3/4) y conjuros preparados de la tabla de 2025 en el cálculo; la app ya avisa si te pasas. <!-- arcanista (artifice)|lanzamiento de conjuros -->
- [x] **Magia de Manitas**: `accion`. usos = INT por descanso largo; igual que 2025. <!-- arcanista (artifice)|magia de manitas -->
- [x] **Replicar Objeto Mágico** (nivel 2): `fuera`. planos conocidos (4 a 8) y objetos a la vez (2 a 6) según el nivel. <!-- arcanista (artifice)|replicar objeto magico -->
- [x] **Manitas de Objetos Mágicos** (nivel 6): `pasiva + Cargar (adicional), Drenar (adicional, 1 por descanso largo) y Transmutar (acción, 1 por descanso largo)`. la biblioteca traía una línea; 2025 separa las tres opciones. <!-- arcanista (artifice)|manitas de objetos magicos -->
- [x] **Destello de Genio** (nivel 7): `reaccion`. usos = INT (mínimo 1) por descanso largo; recupera en descanso corto desde niveles 14 y 20. <!-- arcanista (artifice)|destello de genio -->
- [x] **Adepto a Objetos Mágicos** (nivel 10): `pasiva`. la biblioteca traía "Tus capacidades aumentan"; 2025: sintonizas 4 objetos. <!-- arcanista (artifice)|adepto a objetos magicos -->
- [x] **Objeto Almacenador de Conjuros** (nivel 11): `fuera + Usar el objeto (acción)`. 2025: conjuros de nivel 1 a 3 (la biblioteca traía 1 o 2) y usos = 2 × INT. <!-- arcanista (artifice)|objeto almacenador de conjuros -->
- [x] **Artificio Avanzado** (nivel 14): `pasiva`. igual que 2025. <!-- arcanista (artifice)|artificio avanzado -->
- [x] **Maestro de Objetos Mágicos** (nivel 18): `pasiva`. igual que 2025. <!-- arcanista (artifice)|maestro de objetos magicos -->
- [x] **Alma del Artificio** (nivel 20): `gratis`. igual que 2025 (Engañar a la muerte + Guía mágica). <!-- arcanista (artifice)|alma del artificio -->
- [x] **Herramientas del Oficio** (nivel 3): `pasiva + Conjuros de Alquimista (siempre preparados)`. la biblioteca traía sin los conjuros de subclase de 2025; ahora cuentan como extra. <!-- alquimista|herramientas del oficio -->
- [x] **Elixir Experimental** (nivel 3): `fuera + Beber (adicional) y Crear (acción, 1 espacio)`. elixires 2/3/4/5 como recurso; efectos que escalan en niveles 9 y 15. <!-- alquimista|elixir experimental -->
- [x] **Sabio Alquímico** (nivel 5): `pasiva`. igual que 2025. <!-- alquimista|sabio alquimico -->
- [x] **Reactivos Restauradores** (nivel 9): `accion`. usos = INT por descanso largo. <!-- alquimista|reactivos restauradores -->
- [x] **Maestría Química** (nivel 15): `pasiva + Erupción alquímica (gratis) y Caldero conjurado (acción, 1 por descanso largo)`. igual que 2025. <!-- alquimista|maestria quimica -->
- [x] **Herramientas del Oficio** (nivel 3): `pasiva + Conjuros de Armero`. <!-- armero|herramientas del oficio -->
- [x] **Armadura Arcana y Modelo** (nivel 3): `pasiva + Estatura gigante (adicional) y Campo defensivo (adicional)`. las 3 armas de modelo salen en Ataques con INT; la app no sabe qué modelo elegiste, así que muestra las tres. <!-- armero|armadura arcana y modelo -->
- [x] **Ataque Extra** (nivel 5): `pasiva`. <!-- armero|ataque extra -->
- [x] **Armero Mejorado** (nivel 9): `pasiva`. +1 a las armas del modelo en el cálculo. <!-- armero|armero mejorado -->
- [x] **Armadura Perfeccionada** (nivel 15): `pasiva + Atracción magnética (reacción) y Vuelo potenciado (adicional)`. la biblioteca traía "reaccion" para todo; en 2025 depende del modelo. <!-- armero|armadura perfeccionada -->
- [x] **Herramientas del Oficio** (nivel 3): `pasiva + Conjuros de Artillero`. competencia con armas marciales a distancia en el cálculo. <!-- artillero|herramientas del oficio -->
- [x] **Cañón Sobrenatural** (nivel 3): `accion + Disparar el cañón (adicional); Balista en Ataques`. ⚠ los disparos (Lanzallamas, Balista, Protector) salen de Tasha: 2025 no está en ninguna fuente abierta. <!-- artillero|canon sobrenatural -->
- [x] **Arma de Fuego Arcana** (nivel 5): `pasiva`. igual que 2025. <!-- artillero|arma de fuego arcana -->
- [x] **Cañón Explosivo** (nivel 9): `pasiva + Detonar (reacción)`. 2025: 3d10 de fuerza. <!-- artillero|canon explosivo -->
- [x] **Posición Fortificada** (nivel 15): `pasiva`. 2025: cobertura completa (la biblioteca traía "media cobertura"). <!-- artillero|posicion fortificada -->
- [x] **Herramientas del Oficio y Preparado para Batalla** (nivel 3): `pasiva + Conjuros de Herrero de Batalla`. competencia con armas marciales en el cálculo. <!-- herrero de batalla|herramientas del oficio y preparado para batalla -->
- [x] **Defensor de Acero** (nivel 3): `pasiva + Ordenar (adicional) y Desviar ataque (reacción)`. Desgarro en Ataques; CA y PG del defensor calculados. <!-- herrero de batalla|defensor de acero -->
- [x] **Ataque Extra** (nivel 5): `pasiva`. <!-- herrero de batalla|ataque extra -->
- [x] **Sacudida Arcana** (nivel 9): `gratis`. usos = INT; 2d6, 4d6 desde nivel 15. <!-- herrero de batalla|sacudida arcana -->
- [x] **Defensor Mejorado** (nivel 15): `pasiva`. igual que 2025. <!-- herrero de batalla|defensor mejorado -->
- [x] **Herramientas del Oficio** (nivel 3): `pasiva + Conjuros de Cartógrafo`. <!-- cartografo|herramientas del oficio -->
- [x] **Atlas de Aventurero y Magia** (nivel 3): `fuera + Cartografía iluminada (acción) y Salto de portal (gratis)`. la biblioteca traía "Fuego feérico 1 vez"; 2025: usos = INT. <!-- cartografo|atlas de aventurero y magia -->
- [x] **Precisión Guiada** (nivel 5): `gratis`. igual que 2025. <!-- cartografo|precision guiada -->
- [x] **Movimiento Ingenioso** (nivel 9): `reaccion`. igual que 2025. <!-- cartografo|movimiento ingenioso -->
- [x] **Atlas Superior** (nivel 15): `pasiva + Refugio seguro (gratis) y Camino infalible (fuera)`. igual que 2025. <!-- cartografo|atlas superior -->

## Lote 3: Pugilista (clase y sus 8 clubes)

Fuente: The Pugilist Class 2024 (Benjamin Huffman, v1.0.0), aplicada a la biblioteca con scripts/actualizar-clase.ts. Arena Royale y Matones Sabuesos solo existen en la versión de 2014 (Patreon) y se revisaron con ella. Santo Callejero es nuevo de 2024.

Dudosos: 0. Con tipo claro: 0. Ya revisados: 59.


### Revisados

- [x] **Pugilismo**: `pasiva`. dado 1d8, 1d10, 1d12 y 2d6 en el cálculo; 2024. <!-- pugilista|pugilismo -->
- [x] **Mentón de Hierro**: `pasiva`. CA 12 + CON también con armadura ligera, en el cálculo; 2024. <!-- pugilista|menton de hierro -->
- [x] **Ensangrentado pero Invicto** (nivel 2): `reaccion`. pasa del nivel 3 al 2; 2024. <!-- pugilista|ensangrentado pero invicto -->
- [x] **Determinación (Moxie)** (nivel 2): `pasiva`. Moxie de 2024: 2 a 12 puntos; Prepárate, Uno-Dos y Pegar y Moverse aparte; 2024. <!-- pugilista|determinacion (moxie) -->
- [x] **Racha de Descaro** (nivel 2): `gratis`. nuevo, agregado a la biblioteca; 2024. <!-- pugilista|racha de descaro -->
- [x] **Pegador** (nivel 3): `gratis`. nuevo, agregado a la biblioteca; 2024. <!-- pugilista|pegador -->
- [x] **Escarbar Profundo** (nivel 4): `adicional`. 2024. <!-- pugilista|escarbar profundo -->
- [x] **Ataque Extra** (nivel 5): `pasiva`. 2024. <!-- pugilista|ataque extra -->
- [x] **Gancho Devastador** (nivel 5): `gratis`. 2024. <!-- pugilista|gancho devastador -->
- [x] **Puños de Moxie** (nivel 6): `pasiva`. antes "Puños de Determinación"; 2024. <!-- pugilista|punos de moxie -->
- [x] **Derribado pero No Vencido** (nivel 7): `gratis`. pasa del nivel 9 al 7; 2024. <!-- pugilista|derribado pero no vencido -->
- [x] **Escuela de los Golpes Duros** (nivel 9): `gratis`. pasa del nivel 10 al 9; 2024. <!-- pugilista|escuela de los golpes duros -->
- [x] **Hercúleo** (nivel 10): `pasiva`. pasa del nivel 15 al 10; 2024. <!-- pugilista|herculeo -->
- [x] **Sacúdetelo** (nivel 10): `gratis`. pasa del nivel 7 al 10; 2024. <!-- pugilista|sacudetelo -->
- [x] **Escarbar Más Hondo** (nivel 13): `adicional`. nuevo, agregado a la biblioteca; 2024. <!-- pugilista|escarbar mas hondo -->
- [x] **Inquebrantable** (nivel 14): `pasiva`. 2024. <!-- pugilista|inquebrantable -->
- [x] **Pugnaz** (nivel 15): `gratis`. nuevo, agregado a la biblioteca; 2024. <!-- pugilista|pugnaz -->
- [x] **Espíritu de Lucha** (nivel 18): `gratis`. 2024. <!-- pugilista|espiritu de lucha -->
- [x] **Condición Física Óptima** (nivel 20): `pasiva`. 2024. <!-- pugilista|condicion fisica optima -->
- [x] **El Mejor Amigo del Luchador** (nivel 3): `pasiva`. Mordisco del sabueso en Ataques; 2024. <!-- el perro y el sabueso|el mejor amigo del luchador -->
- [x] **Chucho con Moxie** (nivel 3): `pasiva`. antes "Chucho con Determinación"; 2024. <!-- el perro y el sabueso|chucho con moxie -->
- [x] **Ataque Coordinado** (nivel 6): `reaccion`. antes "Mordida Arcanina"; 2024. <!-- el perro y el sabueso|ataque coordinado -->
- [x] **El Mejor Amigo del Sabueso** (nivel 11): `reaccion`. antes "El Mejor Amigo del Perro"; 2024. <!-- el perro y el sabueso|el mejor amigo del sabueso -->
- [x] **Sin Correa** (nivel 17): `reaccion`. antes "Sabueso Terrible"; 2024. <!-- el perro y el sabueso|sin correa -->
- [x] **Magia Negra** (nivel 3): `pasiva`. separado de "Magia Oscura y Mano del Pavor"; 2024. <!-- mano del pavor|magia negra -->
- [x] **Mano del Pavor** (nivel 3): `gratis`. separado de "Magia Oscura y Mano del Pavor"; 2024. <!-- mano del pavor|mano del pavor -->
- [x] **Trato con el Diablo** (nivel 6): `pasiva`. selector de opción; 2024. <!-- mano del pavor|trato con el diablo -->
- [x] **Crecimiento Grotesco** (nivel 11): `gratis`. 2024. <!-- mano del pavor|crecimiento grotesco -->
- [x] **Fuente de Vísceras** (nivel 17): `accion`. 2024. <!-- mano del pavor|fuente de visceras -->
- [x] **Mala Actitud** (nivel 3): `pasiva`. nuevo, agregado a la biblioteca; 2024. <!-- pura mala leche|mala actitud -->
- [x] **Saludo Salado** (nivel 3): `adicional`. 2024. <!-- pura mala leche|saludo salado -->
- [x] **Trucos Sucios** (nivel 6): `pasiva`. 2024. <!-- pura mala leche|trucos sucios -->
- [x] **Viejo Grosero** (nivel 11): `adicional`. 2024. <!-- pura mala leche|viejo grosero -->
- [x] **Trucos Más Sucios** (nivel 17): `pasiva`. antes "Artes Descorteses"; 2024. <!-- pura mala leche|trucos mas sucios -->
- [x] **Trabajo de Suelo** (nivel 3): `pasiva`. 2024. <!-- el circulo cuadrado|trabajo de suelo -->
- [x] **Masa Muscular** (nivel 3): `pasiva`. nuevo, agregado a la biblioteca; 2024. <!-- el circulo cuadrado|masa muscular -->
- [x] **Escudo de Carne** (nivel 6): `pasiva`. 2024. <!-- el circulo cuadrado|escudo de carne -->
- [x] **Peso Pesado** (nivel 11): `pasiva`. 2024. <!-- el circulo cuadrado|peso pesado -->
- [x] **Remate Limpio** (nivel 17): `reaccion`. 2024. <!-- el circulo cuadrado|remate limpio -->
- [x] **Boxeador a Puño Limpio** (nivel 3): `pasiva`. nuevo, agregado a la biblioteca; 2024. <!-- la dulce ciencia|boxeador a puno limpio -->
- [x] **Contragolpe Cruzado** (nivel 3): `reaccion`. antes "Cruzado"; 2024. <!-- la dulce ciencia|contragolpe cruzado -->
- [x] **Creador de Combos** (nivel 6): `gratis`. antes "Uno, Dos, Tres, al Suelo"; 2024. <!-- la dulce ciencia|creador de combos -->
- [x] **Rompecombos** (nivel 11): `pasiva`. antes "Vuela como Mariposa..."; 2024. <!-- la dulce ciencia|rompecombos -->
- [x] **Nocaut** (nivel 17): `pasiva`. 2024. <!-- la dulce ciencia|nocaut -->
- [x] **Canalizar Divinidad** (nivel 3): `pasiva`. club nuevo de 2024. <!-- santo callejero|canalizar divinidad -->
- [x] **Imposición de Manos** (nivel 3): `adicional`. reserva de 3 × nivel en el cálculo; club nuevo de 2024. <!-- santo callejero|imposicion de manos -->
- [x] **Maltrecho pero Resuelto** (nivel 6): `gratis`. club nuevo de 2024. <!-- santo callejero|maltrecho pero resuelto -->
- [x] **Aura de Resiliencia** (nivel 11): `gratis`. club nuevo de 2024. <!-- santo callejero|aura de resiliencia -->
- [x] **Manos Consagradas** (nivel 17): `gratis`. club nuevo de 2024. <!-- santo callejero|manos consagradas -->
- [x] **Competencia Adicional** (nivel 3): `pasiva`. nuevo, agregado a la biblioteca; 2014 (Patreon), sin versión 2024. <!-- arena royale|competencia adicional -->
- [x] **Persona Libre** (nivel 3): `adicional`. 2014 (Patreon), sin versión 2024. <!-- arena royale|persona libre -->
- [x] **Trabajar el Público** (nivel 6): `accion`. 2014 (Patreon), sin versión 2024. <!-- arena royale|trabajar el publico -->
- [x] **Volador Aéreo** (nivel 11): `pasiva`. 2014 (Patreon), sin versión 2024. <!-- arena royale|volador aereo -->
- [x] **Movimiento Personal** (nivel 17): `gratis`. 2014 (Patreon), sin versión 2024. <!-- arena royale|movimiento personal -->
- [x] **Siempre Alerta** (nivel 3): `pasiva`. 2014 (Patreon), sin versión 2024. <!-- matones sabuesos|siempre alerta -->
- [x] **Trabajo de Detective** (nivel 3): `pasiva`. selector de 2 habilidades, en el cálculo; 2014 (Patreon), sin versión 2024. <!-- matones sabuesos|trabajo de detective -->
- [x] **Pelea como un Sabueso** (nivel 6): `adicional`. 2014 (Patreon), sin versión 2024. <!-- matones sabuesos|pelea como un sabueso -->
- [x] **Corazón de la Ciudad** (nivel 11): `fuera`. 2014 (Patreon), sin versión 2024. <!-- matones sabuesos|corazon de la ciudad -->
- [x] **Ojos Bien Abiertos** (nivel 17): `adicional`. 2014 (Patreon), sin versión 2024. <!-- matones sabuesos|ojos bien abiertos -->

## Lote 4: especies (actualizadas a su versión más reciente)

48 especies (sin las 39 bestias que se colaron al importar), puestas al día en la biblioteca con scripts/datos/especies-2025.ts: Ravenloft 2025, Eberron 2025, Monsters of the Multiverse y los libros de origen de las demás. Cambion no tiene versión oficial jugable y se dejó con el texto de la biblioteca. Se quitaron rasgos que la versión nueva ya no trae (p. ej. Naturaleza Imperecedera del Dhampiro, Bolsillos de Kender) y se agregaron los que faltaban (resistencias, Linaje Feérico, Constitución Poderosa, habilidades...).

Dudosos: 0. Con tipo claro: 0. Ya revisados: 209.


### Revisados

- [x] **Visión en la Oscuridad**: `pasiva`. Ravenloft (2025). <!-- dhampiro|vision en la oscuridad -->
- [x] **Trepar como Araña**: `pasiva`. Ravenloft (2025). <!-- dhampiro|trepar como arana -->
- [x] **Rastro de No Muerte**: `pasiva`. Ravenloft (2025). <!-- dhampiro|rastro de no muerte -->
- [x] **Mordisco Vampírico**: `gratis`. arma natural en Ataques; Ravenloft (2025). <!-- dhampiro|mordisco vampirico -->
- [x] **Escapaste de la Muerte**: `pasiva`. Ravenloft (2025). <!-- renacido|escapaste de la muerte -->
- [x] **Eterno**: `fuera`. Ravenloft (2025). <!-- renacido|eterno -->
- [x] **Conocimiento de Vida Pasada**: `gratis`. Ravenloft (2025). <!-- renacido|conocimiento de vida pasada -->
- [x] **Resistencia Extraña**: `pasiva`. Ravenloft (2025). <!-- renacido|resistencia extrana -->
- [x] **Instinto Cambiante**: `pasiva`. Sin versión oficial (texto de tu biblioteca). <!-- cambion|instinto cambiante -->
- [x] **Cambiar de Forma**: `accion`. Sin versión oficial (texto de tu biblioteca). <!-- cambion|cambiar de forma -->
- [x] **Tipo de Criatura**: `pasiva`. Monsters of the Multiverse. <!-- fata|tipo de criatura -->
- [x] **Vuelo**: `pasiva`. Monsters of the Multiverse. <!-- fata|vuelo -->
- [x] **Magia Feérica**: `accion`. Monsters of the Multiverse. <!-- fata|magia feerica -->
- [x] **Magia Firbolg**: `accion`. Monsters of the Multiverse. <!-- firbolg|magia firbolg -->
- [x] **Paso Oculto**: `adicional`. Monsters of the Multiverse. <!-- firbolg|paso oculto -->
- [x] **Constitución Poderosa**: `pasiva`. Monsters of the Multiverse. <!-- firbolg|constitucion poderosa -->
- [x] **Habla de Bestia y Hoja**: `pasiva`. Monsters of the Multiverse. <!-- firbolg|habla de bestia y hoja -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- genasi de agua|vision en la oscuridad -->
- [x] **Resistencia al Ácido**: `pasiva`. Monsters of the Multiverse. <!-- genasi de agua|resistencia al acido -->
- [x] **Anfibio**: `pasiva`. Monsters of the Multiverse. <!-- genasi de agua|anfibio -->
- [x] **Llamada de la Ola**: `accion`. Monsters of the Multiverse. <!-- genasi de agua|llamada de la ola -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- genasi de fuego|vision en la oscuridad -->
- [x] **Resistencia al Fuego**: `pasiva`. Monsters of the Multiverse. <!-- genasi de fuego|resistencia al fuego -->
- [x] **Alcanzar la Llama**: `accion`. Monsters of the Multiverse. <!-- genasi de fuego|alcanzar la llama -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- genasi de tierra|vision en la oscuridad -->
- [x] **Caminar sobre la Tierra**: `pasiva`. Monsters of the Multiverse. <!-- genasi de tierra|caminar sobre la tierra -->
- [x] **Fundirse con la Piedra**: `adicional`. Monsters of the Multiverse. <!-- genasi de tierra|fundirse con la piedra -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- genasi de aire|vision en la oscuridad -->
- [x] **Aliento Infinito**: `pasiva`. Monsters of the Multiverse. <!-- genasi de aire|aliento infinito -->
- [x] **Resistencia al Relámpago**: `pasiva`. Monsters of the Multiverse. <!-- genasi de aire|resistencia al relampago -->
- [x] **Fundirse con el Viento**: `accion`. Monsters of the Multiverse. <!-- genasi de aire|fundirse con el viento -->
- [x] **Conocimiento Astral**: `fuera`. Monsters of the Multiverse. <!-- githyanki|conocimiento astral -->
- [x] **Psiónica Githyanki**: `accion`. Monsters of the Multiverse. <!-- githyanki|psionica githyanki -->
- [x] **Resiliencia Psíquica**: `pasiva`. Monsters of the Multiverse. <!-- githyanki|resiliencia psiquica -->
- [x] **Psiónica Githzerai**: `accion`. Monsters of the Multiverse. <!-- githzerai|psionica githzerai -->
- [x] **Disciplina Mental**: `pasiva`. Monsters of the Multiverse. <!-- githzerai|disciplina mental -->
- [x] **Resiliencia Psíquica**: `pasiva`. Monsters of the Multiverse. <!-- githzerai|resiliencia psiquica -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- goblin|vision en la oscuridad -->
- [x] **Linaje Feérico**: `pasiva`. Monsters of the Multiverse. <!-- goblin|linaje feerico -->
- [x] **Furia de los Pequeños**: `gratis`. Monsters of the Multiverse. <!-- goblin|furia de los pequenos -->
- [x] **Escape Ágil**: `adicional`. Monsters of the Multiverse. <!-- goblin|escape agil -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- hobgoblin|vision en la oscuridad -->
- [x] **Linaje Feérico**: `pasiva`. Monsters of the Multiverse. <!-- hobgoblin|linaje feerico -->
- [x] **Don Feérico**: `adicional`. Monsters of the Multiverse. <!-- hobgoblin|don feerico -->
- [x] **Fortuna de los Muchos**: `gratis`. Monsters of the Multiverse. <!-- hobgoblin|fortuna de los muchos -->
- [x] **Duplicación Experta**: `pasiva`. Monsters of the Multiverse. <!-- kenku|duplicacion experta -->
- [x] **Memoria Kenku**: `gratis`. Monsters of the Multiverse. <!-- kenku|memoria kenku -->
- [x] **Mimetismo**: `pasiva`. Monsters of the Multiverse. <!-- kenku|mimetismo -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- kobold|vision en la oscuridad -->
- [x] **Grito Dracónico**: `adicional`. Monsters of the Multiverse. <!-- kobold|grito draconico -->
- [x] **Legado Kobold**: `pasiva`. selector; Monsters of the Multiverse. <!-- kobold|legado kobold -->
- [x] **Nadador**: `pasiva`. Monsters of the Multiverse. <!-- hombre lagarto|nadador -->
- [x] **Mordisco**: `pasiva`. arma natural en Ataques; Monsters of the Multiverse. <!-- hombre lagarto|mordisco -->
- [x] **Fauces Hambrientas**: `adicional`. Monsters of the Multiverse. <!-- hombre lagarto|fauces hambrientas -->
- [x] **Armadura Natural**: `pasiva`. CA en el cálculo; Monsters of the Multiverse. <!-- hombre lagarto|armadura natural -->
- [x] **Intuición Natural**: `pasiva`. Monsters of the Multiverse. <!-- hombre lagarto|intuicion natural -->
- [x] **Cuernos**: `pasiva`. arma natural en Ataques; Monsters of the Multiverse. <!-- minotauro|cuernos -->
- [x] **Embestida**: `adicional`. Monsters of the Multiverse. <!-- minotauro|embestida -->
- [x] **Cuernos Martilleantes**: `adicional`. Monsters of the Multiverse. <!-- minotauro|cuernos martilleantes -->
- [x] **Memoria del Laberinto**: `pasiva`. Monsters of the Multiverse. <!-- minotauro|memoria del laberinto -->
- [x] **Tipo de Criatura**: `pasiva`. Monsters of the Multiverse. <!-- satiro|tipo de criatura -->
- [x] **Topetazo**: `pasiva`. arma natural en Ataques; Monsters of the Multiverse. <!-- satiro|topetazo -->
- [x] **Resistencia Mágica**: `pasiva`. Monsters of the Multiverse. <!-- satiro|resistencia magica -->
- [x] **Saltos Alegres**: `pasiva`. Monsters of the Multiverse. <!-- satiro|saltos alegres -->
- [x] **Juerguista**: `pasiva`. habilidades en el cálculo; Monsters of the Multiverse. <!-- satiro|juerguista -->
- [x] **Visión en la Oscuridad**: `pasiva`. Eberron: Forge of the Artificer (2025). <!-- cambiante (shifter)|vision en la oscuridad -->
- [x] **Instintos Bestiales**: `pasiva`. Eberron: Forge of the Artificer (2025). <!-- cambiante (shifter)|instintos bestiales -->
- [x] **Cambiar**: `adicional`. Eberron: Forge of the Artificer (2025). <!-- cambiante (shifter)|cambiar -->
- [x] **Piel de Bestia**: `pasiva`. Eberron: Forge of the Artificer (2025). <!-- piel de bestia|piel de bestia -->
- [x] **Colmillo Largo**: `adicional`. arma natural en Ataques; Eberron: Forge of the Artificer (2025). <!-- colmillo largo|colmillo largo -->
- [x] **Zancada Veloz**: `reaccion`. Eberron: Forge of the Artificer (2025). <!-- zancada veloz|zancada veloz -->
- [x] **Caza Salvaje**: `pasiva`. Eberron: Forge of the Artificer (2025). <!-- caza salvaje|caza salvaje -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- tabaxi|vision en la oscuridad -->
- [x] **Garras de Gato**: `pasiva`. arma natural en Ataques; Monsters of the Multiverse. <!-- tabaxi|garras de gato -->
- [x] **Talento Felino**: `pasiva`. habilidades en el cálculo; Monsters of the Multiverse. <!-- tabaxi|talento felino -->
- [x] **Agilidad Felina**: `gratis`. Monsters of the Multiverse. <!-- tabaxi|agilidad felina -->
- [x] **Garras**: `pasiva`. arma natural en Ataques; Monsters of the Multiverse. <!-- tortle|garras -->
- [x] **Aguantar la Respiración**: `pasiva`. Monsters of the Multiverse. <!-- tortle|aguantar la respiracion -->
- [x] **Armadura Natural**: `pasiva`. CA en el cálculo; Monsters of the Multiverse. <!-- tortle|armadura natural -->
- [x] **Intuición Natural**: `pasiva`. Monsters of the Multiverse. <!-- tortle|intuicion natural -->
- [x] **Defensa del Caparazón**: `accion`. Monsters of the Multiverse. <!-- tortle|defensa del caparazon -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- triton|vision en la oscuridad -->
- [x] **Anfibio**: `pasiva`. Monsters of the Multiverse. <!-- triton|anfibio -->
- [x] **Controlar el Aire y el Agua**: `accion`. Monsters of the Multiverse. <!-- triton|controlar el aire y el agua -->
- [x] **Emisario del Mar**: `pasiva`. Monsters of the Multiverse. <!-- triton|emisario del mar -->
- [x] **Guardián de las Profundidades**: `pasiva`. Monsters of the Multiverse. <!-- triton|guardian de las profundidades -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- yuan-ti|vision en la oscuridad -->
- [x] **Resistencia Mágica**: `pasiva`. Monsters of the Multiverse. <!-- yuan-ti|resistencia magica -->
- [x] **Resiliencia al Veneno**: `pasiva`. Monsters of the Multiverse. <!-- yuan-ti|resiliencia al veneno -->
- [x] **Magia Serpentina**: `accion`. Monsters of the Multiverse. <!-- yuan-ti|magia serpentina -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- bugbear|vision en la oscuridad -->
- [x] **Linaje Feérico**: `pasiva`. Monsters of the Multiverse. <!-- bugbear|linaje feerico -->
- [x] **Extremidades Largas**: `pasiva`. Monsters of the Multiverse. <!-- bugbear|extremidades largas -->
- [x] **Constitución Poderosa**: `pasiva`. Monsters of the Multiverse. <!-- bugbear|constitucion poderosa -->
- [x] **Sigiloso**: `pasiva`. habilidades en el cálculo; Monsters of the Multiverse. <!-- bugbear|sigiloso -->
- [x] **Ataque Sorpresa**: `gratis`. Monsters of the Multiverse. <!-- bugbear|ataque sorpresa -->
- [x] **Tipo de Criatura**: `pasiva`. Monsters of the Multiverse. <!-- centauro|tipo de criatura -->
- [x] **Cascos**: `pasiva`. arma natural en Ataques; Monsters of the Multiverse. <!-- centauro|cascos -->
- [x] **Carga**: `adicional`. Monsters of the Multiverse. <!-- centauro|carga -->
- [x] **Complexión Equina**: `pasiva`. Monsters of the Multiverse. <!-- centauro|complexion equina -->
- [x] **Afinidad Natural**: `pasiva`. Monsters of the Multiverse. <!-- centauro|afinidad natural -->
- [x] **Visión en la Oscuridad**: `pasiva`. Strixhaven. <!-- owlin|vision en la oscuridad -->
- [x] **Vuelo**: `pasiva`. Strixhaven. <!-- owlin|vuelo -->
- [x] **Plumas Silenciosas**: `pasiva`. habilidades en el cálculo; Strixhaven. <!-- owlin|plumas silenciosas -->
- [x] **Visión en la Oscuridad**: `pasiva`. Theros. <!-- leonino|vision en la oscuridad -->
- [x] **Garras**: `pasiva`. arma natural en Ataques; Theros. <!-- leonino|garras -->
- [x] **Instintos de Cazador**: `pasiva`. Theros. <!-- leonino|instintos de cazador -->
- [x] **Rugido Intimidante**: `adicional`. Theros. <!-- leonino|rugido intimidante -->
- [x] **Gatillo de Liebre**: `pasiva`. iniciativa en el cálculo; Monsters of the Multiverse. <!-- harengon|gatillo de liebre -->
- [x] **Sentidos Leporinos**: `pasiva`. habilidades en el cálculo; Monsters of the Multiverse. <!-- harengon|sentidos leporinos -->
- [x] **Pies con Suerte**: `reaccion`. Monsters of the Multiverse. <!-- harengon|pies con suerte -->
- [x] **Salto de Conejo**: `adicional`. Monsters of the Multiverse. <!-- harengon|salto de conejo -->
- [x] **Mente Dual**: `pasiva`. Eberron: Forge of the Artificer (2025). <!-- kalashtar|mente dual -->
- [x] **Disciplina Mental**: `pasiva`. Eberron: Forge of the Artificer (2025). <!-- kalashtar|disciplina mental -->
- [x] **Vínculo Mental**: `accion`. Eberron: Forge of the Artificer (2025). <!-- kalashtar|vinculo mental -->
- [x] **Separado de los Sueños**: `fuera`. Eberron: Forge of the Artificer (2025). <!-- kalashtar|separado de los suenos -->
- [x] **Crecimiento Repentino**: `pasiva`. Acquisitions Incorporated. <!-- verdan|crecimiento repentino -->
- [x] **Curación de Sangre Negra**: `fuera`. Acquisitions Incorporated. <!-- verdan|curacion de sangre negra -->
- [x] **Telepatía Limitada**: `pasiva`. Acquisitions Incorporated. <!-- verdan|telepatia limitada -->
- [x] **Persuasivo**: `pasiva`. habilidades en el cálculo; Acquisitions Incorporated. <!-- verdan|persuasivo -->
- [x] **Perspicacia Telepática**: `pasiva`. Acquisitions Incorporated. <!-- verdan|perspicacia telepatica -->
- [x] **Constitución Poderosa**: `pasiva`. Ravnica. <!-- loxodon|constitucion poderosa -->
- [x] **Serenidad Loxodon**: `pasiva`. Ravnica. <!-- loxodon|serenidad loxodon -->
- [x] **Armadura Natural**: `pasiva`. CA en el cálculo; Ravnica. <!-- loxodon|armadura natural -->
- [x] **Trompa**: `pasiva`. Ravnica. <!-- loxodon|trompa -->
- [x] **Olfato Agudo**: `pasiva`. Ravnica. <!-- loxodon|olfato agudo -->
- [x] **Visión en la Oscuridad**: `pasiva`. Ravnica. <!-- hibrido simic|vision en la oscuridad -->
- [x] **Mejora Animal**: `pasiva`. selector; Ravnica. <!-- hibrido simic|mejora animal -->
- [x] **Mejora Animal Avanzada** (nivel 5): `pasiva`. selector; Caparazón y Apéndices en el cálculo; Ravnica. <!-- hibrido simic|mejora animal avanzada -->
- [x] **Visión en la Oscuridad**: `pasiva`. Ravenloft (2025). <!-- sangre bruja|vision en la oscuridad -->
- [x] **Símbolo Inquietante**: `adicional`. Ravenloft (2025). <!-- sangre bruja|simbolo inquietante -->
- [x] **Magia de Maleficio**: `accion`. Ravenloft (2025). <!-- sangre bruja|magia de maleficio -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- eladrin|vision en la oscuridad -->
- [x] **Linaje Feérico**: `pasiva`. Monsters of the Multiverse. <!-- eladrin|linaje feerico -->
- [x] **Sentidos Agudos**: `pasiva`. habilidades en el cálculo; Monsters of the Multiverse. <!-- eladrin|sentidos agudos -->
- [x] **Paso Feérico**: `adicional`. Monsters of the Multiverse. <!-- eladrin|paso feerico -->
- [x] **Trance**: `fuera`. Monsters of the Multiverse. <!-- eladrin|trance -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- elfo marino|vision en la oscuridad -->
- [x] **Linaje Feérico**: `pasiva`. Monsters of the Multiverse. <!-- elfo marino|linaje feerico -->
- [x] **Sentidos Agudos**: `pasiva`. habilidades en el cálculo; Monsters of the Multiverse. <!-- elfo marino|sentidos agudos -->
- [x] **Hijo del Mar**: `pasiva`. Monsters of the Multiverse. <!-- elfo marino|hijo del mar -->
- [x] **Amigo del Mar**: `pasiva`. Monsters of the Multiverse. <!-- elfo marino|amigo del mar -->
- [x] **Trance**: `fuera`. Monsters of the Multiverse. <!-- elfo marino|trance -->
- [x] **Visión en la Oscuridad**: `pasiva`. Monsters of the Multiverse. <!-- shadar-kai|vision en la oscuridad -->
- [x] **Linaje Feérico**: `pasiva`. Monsters of the Multiverse. <!-- shadar-kai|linaje feerico -->
- [x] **Sentidos Agudos**: `pasiva`. habilidades en el cálculo; Monsters of the Multiverse. <!-- shadar-kai|sentidos agudos -->
- [x] **Bendición de la Reina Cuervo**: `adicional`. Monsters of the Multiverse. <!-- shadar-kai|bendicion de la reina cuervo -->
- [x] **Resistencia Necrótica**: `pasiva`. Monsters of the Multiverse. <!-- shadar-kai|resistencia necrotica -->
- [x] **Trance**: `fuera`. Monsters of the Multiverse. <!-- shadar-kai|trance -->
- [x] **Visión en la Oscuridad**: `pasiva`. Astral Adventurer's Guide. <!-- elfo astral|vision en la oscuridad -->
- [x] **Linaje Feérico**: `pasiva`. Astral Adventurer's Guide. <!-- elfo astral|linaje feerico -->
- [x] **Sentidos Agudos**: `pasiva`. habilidades en el cálculo; Astral Adventurer's Guide. <!-- elfo astral|sentidos agudos -->
- [x] **Fuego Astral**: `accion`. Astral Adventurer's Guide. <!-- elfo astral|fuego astral -->
- [x] **Paso de Luz Estelar**: `adicional`. Astral Adventurer's Guide. <!-- elfo astral|paso de luz estelar -->
- [x] **Trance Astral**: `fuera`. Astral Adventurer's Guide. <!-- elfo astral|trance astral -->
- [x] **Visión en la Oscuridad**: `pasiva`. Astral Adventurer's Guide. <!-- plasmoide|vision en la oscuridad -->
- [x] **Tipo de Criatura**: `pasiva`. Astral Adventurer's Guide. <!-- plasmoide|tipo de criatura -->
- [x] **Amorfo**: `pasiva`. Astral Adventurer's Guide. <!-- plasmoide|amorfo -->
- [x] **Aguantar la Respiración**: `pasiva`. Astral Adventurer's Guide. <!-- plasmoide|aguantar la respiracion -->
- [x] **Resiliencia Natural**: `pasiva`. Astral Adventurer's Guide. <!-- plasmoide|resiliencia natural -->
- [x] **Moldearte**: `accion`. Astral Adventurer's Guide. <!-- plasmoide|moldearte -->
- [x] **Nadador**: `pasiva`. Astral Adventurer's Guide. <!-- giff|nadador -->
- [x] **Chispa Astral**: `gratis`. Astral Adventurer's Guide. <!-- giff|chispa astral -->
- [x] **Maestría con Armas de Fuego**: `pasiva`. Astral Adventurer's Guide. <!-- giff|maestria con armas de fuego -->
- [x] **Complexión de Hipopótamo**: `pasiva`. Astral Adventurer's Guide. <!-- giff|complexion de hipopotamo -->
- [x] **Visión en la Oscuridad**: `pasiva`. Astral Adventurer's Guide. <!-- thri-kreen|vision en la oscuridad -->
- [x] **Tipo de Criatura**: `pasiva`. Astral Adventurer's Guide. <!-- thri-kreen|tipo de criatura -->
- [x] **Caparazón Camaleónico**: `pasiva`. CA en el cálculo; Astral Adventurer's Guide. <!-- thri-kreen|caparazon camaleonico -->
- [x] **Brazos Secundarios**: `pasiva`. Astral Adventurer's Guide. <!-- thri-kreen|brazos secundarios -->
- [x] **Sin Sueño**: `fuera`. Astral Adventurer's Guide. <!-- thri-kreen|sin sueno -->
- [x] **Telepatía Thri-kreen**: `pasiva`. Astral Adventurer's Guide. <!-- thri-kreen|telepatia thri-kreen -->
- [x] **Tipo de Criatura**: `pasiva`. Astral Adventurer's Guide. <!-- autognomo|tipo de criatura -->
- [x] **Carcasa Blindada**: `pasiva`. CA en el cálculo; Astral Adventurer's Guide. <!-- autognomo|carcasa blindada -->
- [x] **Hecho para Triunfar**: `gratis`. Astral Adventurer's Guide. <!-- autognomo|hecho para triunfar -->
- [x] **Máquina Sanadora**: `pasiva`. Astral Adventurer's Guide. <!-- autognomo|maquina sanadora -->
- [x] **Naturaleza Mecánica**: `pasiva`. Astral Adventurer's Guide. <!-- autognomo|naturaleza mecanica -->
- [x] **Descanso de Centinela**: `fuera`. Astral Adventurer's Guide. <!-- autognomo|descanso de centinela -->
- [x] **Diseño Especializado**: `pasiva`. Astral Adventurer's Guide. <!-- autognomo|diseno especializado -->
- [x] **Desapasionamiento Vedalken**: `pasiva`. Ravnica. <!-- vedalken|desapasionamiento vedalken -->
- [x] **Precisión Incansable**: `pasiva`. Ravnica. <!-- vedalken|precision incansable -->
- [x] **Parcialmente Anfibio**: `pasiva`. Ravnica. <!-- vedalken|parcialmente anfibio -->
- [x] **Nadador**: `pasiva`. Locathah Rising. <!-- locathah|nadador -->
- [x] **Armadura Natural**: `pasiva`. CA en el cálculo; Locathah Rising. <!-- locathah|armadura natural -->
- [x] **Observador y Atlético**: `pasiva`. habilidades en el cálculo; Locathah Rising. <!-- locathah|observador y atletico -->
- [x] **Voluntad de Leviatán**: `pasiva`. Locathah Rising. <!-- locathah|voluntad de leviatan -->
- [x] **Anfibio Limitado**: `fuera`. Locathah Rising. <!-- locathah|anfibio limitado -->
- [x] **Trepador**: `pasiva`. One Grung Above. <!-- grung|trepador -->
- [x] **Alerta Arbórea**: `pasiva`. habilidades en el cálculo; One Grung Above. <!-- grung|alerta arborea -->
- [x] **Anfibio**: `pasiva`. One Grung Above. <!-- grung|anfibio -->
- [x] **Inmunidad al Veneno**: `pasiva`. One Grung Above. <!-- grung|inmunidad al veneno -->
- [x] **Piel Venenosa**: `gratis`. One Grung Above. <!-- grung|piel venenosa -->
- [x] **Salto sin Carrerilla**: `pasiva`. One Grung Above. <!-- grung|salto sin carrerilla -->
- [x] **Dependencia del Agua**: `fuera`. One Grung Above. <!-- grung|dependencia del agua -->
- [x] **Resiliencia de Constructo**: `pasiva`. Eberron: Forge of the Artificer (2025). <!-- forjado (warforged)|resiliencia de constructo -->
- [x] **Protección Integrada**: `pasiva`. +1 a la CA en el cálculo; Eberron: Forge of the Artificer (2025). <!-- forjado (warforged)|proteccion integrada -->
- [x] **Descanso de Centinela**: `fuera`. Eberron: Forge of the Artificer (2025). <!-- forjado (warforged)|descanso de centinela -->
- [x] **Diseño Especializado**: `pasiva`. Eberron: Forge of the Artificer (2025). <!-- forjado (warforged)|diseno especializado -->
- [x] **Incansable**: `pasiva`. Eberron: Forge of the Artificer (2025). <!-- forjado (warforged)|incansable -->
- [x] **Valiente**: `pasiva`. Zendikar. <!-- kor|valiente -->
- [x] **Escalador**: `pasiva`. Zendikar. <!-- kor|escalador -->
- [x] **Escalada Kor**: `pasiva`. habilidades en el cálculo; Zendikar. <!-- kor|escalada kor -->
- [x] **Suertudo**: `gratis`. Zendikar. <!-- kor|suertudo -->
- [x] **Trepador**: `pasiva`. Astral Adventurer's Guide. <!-- hado-zee|trepador -->
- [x] **Pies Diestros**: `adicional`. Astral Adventurer's Guide. <!-- hado-zee|pies diestros -->
- [x] **Planeo**: `reaccion`. Astral Adventurer's Guide. <!-- hado-zee|planeo -->
- [x] **Esquiva Hadozee**: `reaccion`. Astral Adventurer's Guide. <!-- hado-zee|esquiva hadozee -->
- [x] **Intrépido**: `pasiva`. Dragonlance. <!-- kender|intrepido -->
- [x] **Curiosidad Kender**: `pasiva`. Dragonlance. <!-- kender|curiosidad kender -->
- [x] **Pulla**: `adicional`. Dragonlance. <!-- kender|pulla -->

## Lote 5: Bárbaro (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 0. Con tipo claro: 0. Ya revisados: 27.


### Revisados

- [x] **Instinto Salvaje** (nivel 7): `pasiva`. Manual del Jugador 2024. <!-- barbaro|instinto salvaje -->
- [x] **Salto Instintivo** (nivel 7): `gratis`. la biblioteca decía acción adicional; es parte de la de entrar en Furia; Manual del Jugador 2024. <!-- barbaro|salto instintivo -->
- [x] **Golpe Brutal** (nivel 9): `gratis`. efectos como opciones; 1d10 y 2d10 desde nivel 17; Manual del Jugador 2024. <!-- barbaro|golpe brutal -->
- [x] **Furia Implacable** (nivel 11): `gratis`. Manual del Jugador 2024. <!-- barbaro|furia implacable -->
- [x] **Golpe Brutal Mejorado** (nivel 13): `pasiva`. nuevo, agregado a la biblioteca; Manual del Jugador 2024. <!-- barbaro|golpe brutal mejorado -->
- [x] **Furia Persistente** (nivel 15): `gratis`. Manual del Jugador 2024. <!-- barbaro|furia persistente -->
- [x] **Golpe Brutal Superior** (nivel 17): `pasiva`. nuevo, agregado a la biblioteca (2024 lo llama también Golpe Brutal Mejorado); Manual del Jugador 2024. <!-- barbaro|golpe brutal superior -->
- [x] **Poder Indómito** (nivel 18): `pasiva`. Manual del Jugador 2024. <!-- barbaro|poder indomito -->
- [x] **Campeón Primordial** (nivel 20): `pasiva`. Manual del Jugador 2024. <!-- barbaro|campeon primordial -->
- [x] **Frenesí** (nivel 3): `gratis`. Manual del Jugador 2024. <!-- senda del berserker|frenesi -->
- [x] **Furia Sin Sentido** (nivel 6): `pasiva`. antes "Furia Ciega"; Manual del Jugador 2024. <!-- senda del berserker|furia sin sentido -->
- [x] **Represalia** (nivel 10): `reaccion`. pasa del nivel 14 al 10; Manual del Jugador 2024. <!-- senda del berserker|represalia -->
- [x] **Presencia Intimidante** (nivel 14): `adicional`. pasa del nivel 10 al 14; acción adicional; Manual del Jugador 2024. <!-- senda del berserker|presencia intimidante -->
- [x] **Hablante Animal** (nivel 3): `fuera`. nuevo, agregado; Manual del Jugador 2024. <!-- senda del corazon salvaje|hablante animal -->
- [x] **Furia de lo Salvaje** (nivel 3): `pasiva`. antes "Corazón de la Bestia" (tótem de 2014); Oso, Águila y Lobo como opciones; Manual del Jugador 2024. <!-- senda del corazon salvaje|furia de lo salvaje -->
- [x] **Aspecto de lo Salvaje** (nivel 6): `pasiva`. antes "Aspecto de la Bestia"; selector; Manual del Jugador 2024. <!-- senda del corazon salvaje|aspecto de lo salvaje -->
- [x] **Hablante de la Naturaleza** (nivel 10): `fuera`. antes "Caminante del Espíritu"; Manual del Jugador 2024. <!-- senda del corazon salvaje|hablante de la naturaleza -->
- [x] **Poder de lo Salvaje** (nivel 14): `pasiva`. antes "Sintonía Totémica"; Halcón, León y Carnero como opciones; Manual del Jugador 2024. <!-- senda del corazon salvaje|poder de lo salvaje -->
- [x] **Vitalidad del Árbol** (nivel 3): `pasiva`. antes "Vitalidad de las Raíces"; Manual del Jugador 2024. <!-- senda del arbol del mundo|vitalidad del arbol -->
- [x] **Ramas del Árbol** (nivel 6): `reaccion`. antes "Ramas de Yggdrasil"; Manual del Jugador 2024. <!-- senda del arbol del mundo|ramas del arbol -->
- [x] **Raíces Arietes** (nivel 10): `pasiva`. la biblioteca traía otro rasgo en este nivel; Manual del Jugador 2024. <!-- senda del arbol del mundo|raices arietes -->
- [x] **Viaje por el Árbol** (nivel 14): `adicional`. antes "Unión con el Mundo"; Manual del Jugador 2024. <!-- senda del arbol del mundo|viaje por el arbol -->
- [x] **Furia Divina** (nivel 3): `gratis`. Manual del Jugador 2024. <!-- senda del fanatico|furia divina -->
- [x] **Guerrero de los Dioses** (nivel 3): `adicional`. la biblioteca traía el de 2014; reserva de d12 en el cálculo; Manual del Jugador 2024. <!-- senda del fanatico|guerrero de los dioses -->
- [x] **Foco Fanático** (nivel 6): `gratis`. una vez por Furia, con el bonificador de daño de Furia; Manual del Jugador 2024. <!-- senda del fanatico|foco fanatico -->
- [x] **Presencia Fanática** (nivel 10): `adicional`. Manual del Jugador 2024. <!-- senda del fanatico|presencia fanatica -->
- [x] **Furia de los Dioses** (nivel 14): `gratis`. antes "Rabia más allá de la Muerte"; Manual del Jugador 2024. <!-- senda del fanatico|furia de los dioses -->

## Lote 6: Bardo (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 0. Con tipo claro: 0. Ya revisados: 29.


### Revisados

- [x] **Contraencanto** (nivel 7): `reaccion`. Manual del Jugador 2024. <!-- bardo|contraencanto -->
- [x] **Pericia Adicional** (nivel 9): `pasiva`. nuevo, agregado (la pericia ya se pedía en Habilidades); Manual del Jugador 2024. <!-- bardo|pericia adicional -->
- [x] **Secretos Mágicos** (nivel 10): `pasiva`. abre las listas de clérigo, druida y mago en Conjuros; Manual del Jugador 2024. <!-- bardo|secretos magicos -->
- [x] **Inspiración Superior** (nivel 18): `gratis`. Manual del Jugador 2024. <!-- bardo|inspiracion superior -->
- [x] **Palabras de Creación** (nivel 20): `pasiva`. conjuros siempre preparados; Manual del Jugador 2024. <!-- bardo|palabras de creacion -->
- [x] **Competencias Adicionales** (nivel 3): `pasiva`. 3 habilidades a elegir, en el cálculo; Manual del Jugador 2024. <!-- colegio del conocimiento|competencias adicionales -->
- [x] **Palabras Cortantes** (nivel 3): `reaccion`. dado de Inspiración en el texto; Manual del Jugador 2024. <!-- colegio del conocimiento|palabras cortantes -->
- [x] **Descubrimientos Mágicos** (nivel 6): `pasiva`. antes "Secretos Mágicos Adicionales"; listas extra en Conjuros; Manual del Jugador 2024. <!-- colegio del conocimiento|descubrimientos magicos -->
- [x] **Habilidad Inigualable** (nivel 14): `gratis`. Manual del Jugador 2024. <!-- colegio del conocimiento|habilidad inigualable -->
- [x] **Competencias de Combate** (nivel 3): `pasiva`. armas marciales en el cálculo; Manual del Jugador 2024. <!-- colegio del valor|competencias de combate -->
- [x] **Inspiración de Combate** (nivel 3): `pasiva`. Defensa y Ofensa como opciones; Manual del Jugador 2024. <!-- colegio del valor|inspiracion de combate -->
- [x] **Ataque Extra** (nivel 6): `pasiva`. en 2024 también cambia un ataque por un truco; Manual del Jugador 2024. <!-- colegio del valor|ataque extra -->
- [x] **Magia de Batalla** (nivel 14): `adicional`. Manual del Jugador 2024. <!-- colegio del valor|magia de batalla -->
- [x] **Manto de Inspiración** (nivel 3): `adicional`. Manual del Jugador 2024. <!-- colegio del glamour|manto de inspiracion -->
- [x] **Magia Seductora** (nivel 3): `pasiva`. nuevo de 2024 (la biblioteca traía "Actuación Enervante" de 2014); conjuros siempre preparados; Manual del Jugador 2024. <!-- colegio del glamour|magia seductora -->
- [x] **Manto de Majestad** (nivel 6): `adicional`. Orden imperiosa siempre preparada; Manual del Jugador 2024. <!-- colegio del glamour|manto de majestad -->
- [x] **Majestad Inquebrantable** (nivel 14): `adicional`. Manual del Jugador 2024. <!-- colegio del glamour|majestad inquebrantable -->
- [x] **Juego de Pies Deslumbrante** (nivel 3): `pasiva`. antes "Danza de los Pasos Ágiles"; CA y golpe sin armas en el cálculo; Manual del Jugador 2024. <!-- colegio de la danza|juego de pies deslumbrante -->
- [x] **Movimiento Inspirador** (nivel 6): `reaccion`. antes "Movimiento Compartido"; Manual del Jugador 2024. <!-- colegio de la danza|movimiento inspirador -->
- [x] **Juego de Pies en Tándem** (nivel 6): `gratis`. antes "Acción Danzante"; Manual del Jugador 2024. <!-- colegio de la danza|juego de pies en tandem -->
- [x] **Evasión Guía** (nivel 14): `pasiva`. antes "Danza de la Evasión"; Manual del Jugador 2024. <!-- colegio de la danza|evasion guia -->
- [x] **Inspiración de la Luna** (nivel 3): `pasiva`. la biblioteca decía acción adicional; Eclipse Inspirador y Vitalidad Lunar como opciones; Heroes of Faerûn (2025). <!-- colegio de la luna|inspiracion de la luna -->
- [x] **Saber Primigenio** (nivel 3): `pasiva`. 1 habilidad a elegir en el cálculo; Heroes of Faerûn (2025). <!-- colegio de la luna|saber primigenio -->
- [x] **Bendición de la Luz de Luna** (nivel 6): `pasiva`. Rayo de luna siempre preparado; Heroes of Faerûn (2025). <!-- colegio de la luna|bendicion de la luz de luna -->
- [x] **Esplendor del Crepúsculo** (nivel 14): `pasiva`. la biblioteca decía reacción; Heroes of Faerûn (2025). <!-- colegio de la luna|esplendor del crepusculo -->
- [x] **Canalizador** (nivel 3): `pasiva`. une "Susurros Guía" y "Canalizador Espiritual"; Ravenloft (2025). <!-- colegio de los espiritus|canalizador -->
- [x] **Espíritus del Más Allá** (nivel 3): `pasiva`. antes "Historias del Más Allá"; tabla en el texto; Ravenloft (2025). <!-- colegio de los espiritus|espiritus del mas alla -->
- [x] **Canalización Potenciada** (nivel 6): `pasiva`. antes "Sesión Espiritual"; Espíritus guardianes siempre preparado; Ravenloft (2025). <!-- colegio de los espiritus|canalizacion potenciada -->
- [x] **Conexión Mística** (nivel 14): `pasiva`. antes "Conexión Espiritual"; Ravenloft (2025). <!-- colegio de los espiritus|conexion mistica -->

## Lote 7: Brujo (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 13. Con tipo claro: 5. Ya revisados: 0.

### Brujo

- [ ] **Arcanum Místico** (nivel 11): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- brujo|arcanum mistico -->

### El No Muerto

- [ ] **Lista de Conjuros Ampliada**: hoy `pasiva`, no menciona tipo de acción <!-- el no muerto|lista de conjuros ampliada -->
- [ ] **Toque Sepulcral** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse <!-- el no muerto|toque sepulcral -->

### Patrón Archihada

- [ ] **Defensa Atrapante** (nivel 10): hoy `pasiva`, no menciona tipo de acción <!-- patron archihada|defensa atrapante -->
- [ ] **Delirio Feérico** (nivel 14): hoy `pasiva`, no menciona tipo de acción <!-- patron archihada|delirio feerico -->

### Patrón Infernal

- [ ] **Suerte del Propio Oscuro** (nivel 6): hoy `pasiva`, no menciona tipo de acción <!-- patron infernal|suerte del propio oscuro -->
- [ ] **Resiliencia Infernal** (nivel 10): hoy `pasiva`, no menciona tipo de acción <!-- patron infernal|resiliencia infernal -->
- [ ] **Arrojar a través del Infierno** (nivel 14): hoy `gratis`, no menciona tipo de acción <!-- patron infernal|arrojar a traves del infierno -->

### Patrón Celestial

- [ ] **Alma Radiante** (nivel 6): hoy `pasiva`, no menciona tipo de acción <!-- patron celestial|alma radiante -->
- [ ] **Vigor Celestial** (nivel 10): hoy `pasiva`, no menciona tipo de acción <!-- patron celestial|vigor celestial -->
- [ ] **Venganza Flamígera** (nivel 14): hoy `pasiva`, no menciona tipo de acción <!-- patron celestial|venganza flamigera -->

### Patrón Gran Antiguo

- [ ] **Escudo de Pensamiento** (nivel 10): hoy `pasiva`, no menciona tipo de acción <!-- patron gran antiguo|escudo de pensamiento -->
- [ ] **Crear Servidor** (nivel 14): hoy `pasiva`, no menciona tipo de acción <!-- patron gran antiguo|crear servidor -->

## Lote 8: Clérigo (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 0. Con tipo claro: 0. Ya revisados: 82.


### Revisados

- [x] **Golpes Benditos** (nivel 7): `pasiva`. selector Golpe Divino / Lanzamiento Potente; Manual del Jugador 2024. <!-- clerigo|golpes benditos -->
- [x] **Intervención Divina** (nivel 10): `accion`. la biblioteca decía pasiva; es acción mágica; Manual del Jugador 2024. <!-- clerigo|intervencion divina -->
- [x] **Golpes Benditos Mejorados** (nivel 14): `pasiva`. nuevo, agregado; el texto depende de la opción elegida; Manual del Jugador 2024. <!-- clerigo|golpes benditos mejorados -->
- [x] **Intervención Divina Mayor** (nivel 20): `pasiva`. corregido: tras Deseo no se usa en 2d4 descansos largos; Manual del Jugador 2024. <!-- clerigo|intervencion divina mayor -->
- [x] **Conjuros del Dominio de la Vida** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Manual del Jugador 2024. <!-- dominio de la vida|conjuros del dominio de la vida -->
- [x] **Discípulo de la Vida** (nivel 3): `pasiva`. Manual del Jugador 2024. <!-- dominio de la vida|discipulo de la vida -->
- [x] **Preservar Vida** (nivel 3): `accion`. la biblioteca decía pasiva; PG calculados; Manual del Jugador 2024. <!-- dominio de la vida|preservar vida -->
- [x] **Sanador Bendito** (nivel 6): `gratis`. antes "Curación Bendita"; Manual del Jugador 2024. <!-- dominio de la vida|sanador bendito -->
- [x] **Curación Suprema** (nivel 17): `pasiva`. Manual del Jugador 2024. <!-- dominio de la vida|curacion suprema -->
- [x] **Conjuros del Dominio de la Luz** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Manual del Jugador 2024. <!-- dominio de la luz|conjuros del dominio de la luz -->
- [x] **Resplandor del Alba** (nivel 3): `accion`. la biblioteca decía pasiva; CD y daño calculados; Manual del Jugador 2024. <!-- dominio de la luz|resplandor del alba -->
- [x] **Destello Protector** (nivel 3): `reaccion`. antes "Destello de Resplandor"; usos SAB, descanso corto desde nivel 6; Manual del Jugador 2024. <!-- dominio de la luz|destello protector -->
- [x] **Destello Protector Mejorado** (nivel 6): `pasiva`. antes "Destello Mejorado", que estaba mal; Manual del Jugador 2024. <!-- dominio de la luz|destello protector mejorado -->
- [x] **Corona de Luz** (nivel 17): `accion`. la biblioteca decía pasiva; usos SAB; Manual del Jugador 2024. <!-- dominio de la luz|corona de luz -->
- [x] **Conjuros del Dominio del Engaño** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Manual del Jugador 2024. <!-- dominio del engano|conjuros del dominio del engano -->
- [x] **Bendición del Embaucador** (nivel 3): `accion`. la biblioteca decía pasiva; Manual del Jugador 2024. <!-- dominio del engano|bendicion del embaucador -->
- [x] **Invocar Duplicidad** (nivel 3): `adicional`. Manual del Jugador 2024. <!-- dominio del engano|invocar duplicidad -->
- [x] **Transposición del Embaucador** (nivel 6): `adicional`. nuevo de 2024, reemplaza a "Capa de Sombras"; Manual del Jugador 2024. <!-- dominio del engano|transposicion del embaucador -->
- [x] **Duplicidad Mejorada** (nivel 17): `pasiva`. la biblioteca decía "hasta 4 duplicados", que es de 2014; Manual del Jugador 2024. <!-- dominio del engano|duplicidad mejorada -->
- [x] **Conjuros del Dominio de la Guerra** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Manual del Jugador 2024. <!-- dominio de la guerra|conjuros del dominio de la guerra -->
- [x] **Golpe Guiado** (nivel 3): `gratis`. la biblioteca decía pasiva; Manual del Jugador 2024. <!-- dominio de la guerra|golpe guiado -->
- [x] **Sacerdote de la Guerra** (nivel 3): `adicional`. usos SAB por descanso corto; Manual del Jugador 2024. <!-- dominio de la guerra|sacerdote de la guerra -->
- [x] **Bendición del Dios de la Guerra** (nivel 6): `accion`. la biblioteca decía reacción con +10 (2014); Manual del Jugador 2024. <!-- dominio de la guerra|bendicion del dios de la guerra -->
- [x] **Avatar de la Batalla** (nivel 17): `pasiva`. la biblioteca decía "no mágico" (2014); Manual del Jugador 2024. <!-- dominio de la guerra|avatar de la batalla -->
- [x] **Conjuros del Dominio del Conocimiento** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Heroes of Faerûn (2025). <!-- dominio del conocimiento|conjuros del dominio del conocimiento -->
- [x] **Bendiciones del Saber** (nivel 3): `pasiva`. selector de herramientas y 2 habilidades con pericia, en el cálculo; Heroes of Faerûn (2025). <!-- dominio del conocimiento|bendiciones del saber -->
- [x] **Magia de la Mente** (nivel 3): `accion`. Heroes of Faerûn (2025). <!-- dominio del conocimiento|magia de la mente -->
- [x] **Mente Desatada** (nivel 6): `pasiva`. Heroes of Faerûn (2025). <!-- dominio del conocimiento|mente desatada -->
- [x] **Presciencia Divina** (nivel 17): `adicional`. Heroes of Faerûn (2025). <!-- dominio del conocimiento|presciencia divina -->
- [x] **Conjuros del Dominio de la Tumba** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Ravenloft: The Horrors Within (2026). <!-- dominio de la tumba|conjuros del dominio de la tumba -->
- [x] **Círculo de la Mortalidad** (nivel 3): `pasiva`. versión 2026 con daño extra 1d4/1d6; Ravenloft: The Horrors Within (2026). <!-- dominio de la tumba|circulo de la mortalidad -->
- [x] **Sendero a la Tumba** (nivel 3): `adicional`. versión 2026: acción adicional y desventaja; Ravenloft: The Horrors Within (2026). <!-- dominio de la tumba|sendero a la tumba -->
- [x] **Centinela en la Puerta de la Muerte** (nivel 6): `reaccion`. versión 2026: reduce a la mitad; usos SAB; Ravenloft: The Horrors Within (2026). <!-- dominio de la tumba|centinela en la puerta de la muerte -->
- [x] **Segador Divino** (nivel 17): `pasiva`. nuevo de 2026, une Nigromancia Potenciada y Guardián de Almas; Ravenloft: The Horrors Within (2026). <!-- dominio de la tumba|segador divino -->
- [x] **Conjuros del Dominio Arcano** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Arcana Unleashed (2026). <!-- dominio arcano|conjuros del dominio arcano -->
- [x] **Estudiante de lo Arcano** (nivel 3): `pasiva`. Arcana Unleashed (2026). <!-- dominio arcano|estudiante de lo arcano -->
- [x] **Modificar la Magia** (nivel 3): `gratis`. dos opciones aparte; Arcana Unleashed (2026). <!-- dominio arcano|modificar la magia -->
- [x] **Recuperación Disipadora** (nivel 6): `gratis`. Arcana Unleashed (2026). <!-- dominio arcano|recuperacion disipadora -->
- [x] **Maestría Mágica** (nivel 17): `pasiva`. Arcana Unleashed (2026). <!-- dominio arcano|maestria magica -->
- [x] **Conjuros del Dominio de la Tempestad** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Manual del Jugador 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la tempestad|conjuros del dominio de la tempestad -->
- [x] **Competencias de la Tormenta** (nivel 3): `pasiva`. Manual del Jugador 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la tempestad|competencias de la tormenta -->
- [x] **Ira de la Tormenta** (nivel 3): `reaccion`. usos SAB; CD calculada; Manual del Jugador 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la tempestad|ira de la tormenta -->
- [x] **Ira Destructora** (nivel 3): `gratis`. Manual del Jugador 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la tempestad|ira destructora -->
- [x] **Golpe del Trueno** (nivel 6): `pasiva`. Manual del Jugador 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la tempestad|golpe del trueno -->
- [x] **Nacido de la Tormenta** (nivel 17): `pasiva`. Manual del Jugador 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la tempestad|nacido de la tormenta -->
- [x] **Conjuros del Dominio de la Naturaleza** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Manual del Jugador 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la naturaleza|conjuros del dominio de la naturaleza -->
- [x] **Acólito de la Naturaleza** (nivel 3): `pasiva`. Manual del Jugador 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la naturaleza|acolito de la naturaleza -->
- [x] **Competencia Adicional** (nivel 3): `pasiva`. Manual del Jugador 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la naturaleza|competencia adicional -->
- [x] **Hechizar Animales y Plantas** (nivel 3): `accion`. Manual del Jugador 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la naturaleza|hechizar animales y plantas -->
- [x] **Amortiguar los Elementos** (nivel 6): `reaccion`. Manual del Jugador 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la naturaleza|amortiguar los elementos -->
- [x] **Señor de la Naturaleza** (nivel 17): `adicional`. Manual del Jugador 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la naturaleza|senor de la naturaleza -->
- [x] **Conjuros del Dominio de la Forja** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Xanathar, rasgos de nivel 1-2 al 3. <!-- dominio de la forja|conjuros del dominio de la forja -->
- [x] **Competencias de la Forja** (nivel 3): `pasiva`. Xanathar, rasgos de nivel 1-2 al 3. <!-- dominio de la forja|competencias de la forja -->
- [x] **Bendición de la Forja** (nivel 3): `fuera`. Xanathar, rasgos de nivel 1-2 al 3. <!-- dominio de la forja|bendicion de la forja -->
- [x] **Bendición del Artesano** (nivel 3): `fuera`. Xanathar, rasgos de nivel 1-2 al 3. <!-- dominio de la forja|bendicion del artesano -->
- [x] **Alma de la Forja** (nivel 6): `pasiva`. +1 CA con armadura pesada en el cálculo; Xanathar, rasgos de nivel 1-2 al 3. <!-- dominio de la forja|alma de la forja -->
- [x] **Santo de la Forja y el Fuego** (nivel 17): `pasiva`. Xanathar, rasgos de nivel 1-2 al 3. <!-- dominio de la forja|santo de la forja y el fuego -->
- [x] **Conjuros del Dominio del Orden** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Tasha, rasgos de nivel 1-2 al 3. <!-- dominio del orden|conjuros del dominio del orden -->
- [x] **Competencias del Orden** (nivel 3): `pasiva`. Tasha, rasgos de nivel 1-2 al 3. <!-- dominio del orden|competencias del orden -->
- [x] **Voz de Autoridad** (nivel 3): `gratis`. Tasha, rasgos de nivel 1-2 al 3. <!-- dominio del orden|voz de autoridad -->
- [x] **Exigencia del Orden** (nivel 3): `accion`. Tasha, rasgos de nivel 1-2 al 3. <!-- dominio del orden|exigencia del orden -->
- [x] **Encarnación de la Ley** (nivel 6): `gratis`. Tasha, rasgos de nivel 1-2 al 3. <!-- dominio del orden|encarnacion de la ley -->
- [x] **Cólera del Orden** (nivel 17): `gratis`. Tasha, rasgos de nivel 1-2 al 3. <!-- dominio del orden|colera del orden -->
- [x] **Conjuros del Dominio de la Paz** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Tasha, rasgos de nivel 1-2 al 3. <!-- dominio de la paz|conjuros del dominio de la paz -->
- [x] **Instrumento de la Paz** (nivel 3): `pasiva`. Tasha, rasgos de nivel 1-2 al 3. <!-- dominio de la paz|instrumento de la paz -->
- [x] **Vínculo Alentador** (nivel 3): `accion`. usos = competencia; Tasha, rasgos de nivel 1-2 al 3. <!-- dominio de la paz|vinculo alentador -->
- [x] **Bálsamo de Paz** (nivel 3): `accion`. Tasha, rasgos de nivel 1-2 al 3. <!-- dominio de la paz|balsamo de paz -->
- [x] **Vínculo Protector** (nivel 6): `reaccion`. Tasha, rasgos de nivel 1-2 al 3. <!-- dominio de la paz|vinculo protector -->
- [x] **Vínculo Expansivo** (nivel 17): `pasiva`. Tasha, rasgos de nivel 1-2 al 3. <!-- dominio de la paz|vinculo expansivo -->
- [x] **Conjuros del Dominio del Crepúsculo** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Tasha, rasgos de nivel 1-2 al 3. <!-- dominio del crepusculo|conjuros del dominio del crepusculo -->
- [x] **Competencias del Crepúsculo** (nivel 3): `pasiva`. Tasha, rasgos de nivel 1-2 al 3. <!-- dominio del crepusculo|competencias del crepusculo -->
- [x] **Ojos de la Noche** (nivel 3): `accion`. visión 300 pies en el cálculo; Tasha, rasgos de nivel 1-2 al 3. <!-- dominio del crepusculo|ojos de la noche -->
- [x] **Bendición del Vigilante** (nivel 3): `accion`. Tasha, rasgos de nivel 1-2 al 3. <!-- dominio del crepusculo|bendicion del vigilante -->
- [x] **Santuario Crepuscular** (nivel 3): `accion`. Tasha, rasgos de nivel 1-2 al 3. <!-- dominio del crepusculo|santuario crepuscular -->
- [x] **Pasos de la Noche** (nivel 6): `adicional`. usos = competencia; Tasha, rasgos de nivel 1-2 al 3. <!-- dominio del crepusculo|pasos de la noche -->
- [x] **Mortaja Crepuscular** (nivel 17): `pasiva`. Tasha, rasgos de nivel 1-2 al 3. <!-- dominio del crepusculo|mortaja crepuscular -->
- [x] **Conjuros del Dominio de la Muerte** (nivel 3): `pasiva`. lista siempre preparada por nivel, con los nombres del catálogo; Guía del DM 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la muerte|conjuros del dominio de la muerte -->
- [x] **Competencia Adicional** (nivel 3): `pasiva`. Guía del DM 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la muerte|competencia adicional -->
- [x] **Segador** (nivel 3): `pasiva`. Guía del DM 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la muerte|segador -->
- [x] **Toque de la Muerte** (nivel 3): `gratis`. daño calculado; Guía del DM 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la muerte|toque de la muerte -->
- [x] **Destrucción Ineludible** (nivel 6): `pasiva`. Guía del DM 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la muerte|destruccion ineludible -->
- [x] **Segador Mejorado** (nivel 17): `pasiva`. Guía del DM 2014, rasgos de nivel 1-2 al 3. <!-- dominio de la muerte|segador mejorado -->

## Lote 9: Druida (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 14. Con tipo claro: 4. Ya revisados: 0.

### Druida

- [ ] **Furia Elemental** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- druida|furia elemental -->
- [ ] **Archidruida** (nivel 20): hoy `gratis`, no menciona tipo de acción <!-- druida|archidruida -->

### Círculo de la Tierra

- [ ] **Recuperación Natural** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- circulo de la tierra|recuperacion natural -->
- [ ] **Conjuros de Círculo** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- circulo de la tierra|conjuros de circulo -->
- [ ] **Zancada de la Tierra** (nivel 6): hoy `pasiva`, no menciona tipo de acción <!-- circulo de la tierra|zancada de la tierra -->
- [ ] **Protección de la Naturaleza** (nivel 10): hoy `pasiva`, no menciona tipo de acción <!-- circulo de la tierra|proteccion de la naturaleza -->

### Círculo de la Luna

- [ ] **Golpes Primigenios** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- circulo de la luna|golpes primigenios -->
- [ ] **Mil Formas** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- circulo de la luna|mil formas -->

### Círculo del Mar

- [ ] **Ira de la Marea** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- circulo del mar|ira de la marea -->
- [ ] **Marea Creciente** (nivel 10): hoy `pasiva`, no menciona tipo de acción <!-- circulo del mar|marea creciente -->
- [ ] **Unión con el Océano** (nivel 14): hoy `pasiva`, no menciona tipo de acción <!-- circulo del mar|union con el oceano -->

### Círculo de las Estrellas

- [ ] **Mapa Estelar** (nivel 2): hoy `pasiva`, no menciona tipo de acción <!-- circulo de las estrellas|mapa estelar -->
- [ ] **Augurio Cósmico** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- circulo de las estrellas|augurio cosmico -->
- [ ] **Luminosidad Completa** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- circulo de las estrellas|luminosidad completa -->

## Lote 10: Explorador (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 21. Con tipo claro: 5. Ya revisados: 0.

### Explorador

- [ ] **Errante** (nivel 6): hoy `pasiva`, no menciona tipo de acción <!-- explorador|errante -->
- [ ] **Ocultarse a Plena Vista** (nivel 10): hoy `pasiva`, no menciona tipo de acción <!-- explorador|ocultarse a plena vista -->
- [ ] **Cazador de Enemigos** (nivel 20): hoy `pasiva`, no menciona tipo de acción <!-- explorador|cazador de enemigos -->

### Cazador

- [ ] **Tácticas Defensivas** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- cazador|tacticas defensivas -->
- [ ] **Multiataque del Cazador** (nivel 11): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- cazador|multiataque del cazador -->
- [ ] **Defensa Superior** (nivel 15): hoy `pasiva`, no menciona tipo de acción <!-- cazador|defensa superior -->

### Maestro de Bestias

- [ ] **Compañero del Explorador** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- maestro de bestias|companero del explorador -->
- [ ] **Entrenamiento Excepcional** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse <!-- maestro de bestias|entrenamiento excepcional -->
- [ ] **Furia de Bestia** (nivel 11): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- maestro de bestias|furia de bestia -->
- [ ] **Compartir Conjuros** (nivel 15): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- maestro de bestias|compartir conjuros -->

### Caminante de las Hadas

- [ ] **Ataque Pavoroso** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- caminante de las hadas|ataque pavoroso -->
- [ ] **Magia Feérica** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- caminante de las hadas|magia feerica -->
- [ ] **Giro Etéreo** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- caminante de las hadas|giro etereo -->
- [ ] **Paso Nebuloso** (nivel 15): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- caminante de las hadas|paso nebuloso -->

### Acechador de las Sombras

- [ ] **Emboscador Temible** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- acechador de las sombras|emboscador temible -->
- [ ] **Vista Umbría** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- acechador de las sombras|vista umbria -->
- [ ] **Mente de Hierro** (nivel 7): hoy `pasiva`, no menciona tipo de acción <!-- acechador de las sombras|mente de hierro -->
- [ ] **Ráfaga del Acechador** (nivel 11): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- acechador de las sombras|rafaga del acechador -->

### Caminante del Invierno

- [ ] **Escarcha del Cazador** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse <!-- caminante del invierno|escarcha del cazador -->
- [ ] **Conjuros del Caminante del Invierno** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- caminante del invierno|conjuros del caminante del invierno -->
- [ ] **Alma Congelada** (nivel 11): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- caminante del invierno|alma congelada -->

## Lote 11: Guerrero (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 20. Con tipo claro: 3. Ya revisados: 1.

### Guerrero

- [ ] **Indomable** (nivel 9): hoy `pasiva`, no menciona tipo de acción <!-- guerrero|indomable -->
- [ ] **Ataques Estudiados** (nivel 13): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- guerrero|ataques estudiados -->

### Campeón

- [ ] **Crítico Mejorado** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- campeon|critico mejorado -->
- [ ] **Atleta Notable** (nivel 7): hoy `pasiva`, no menciona tipo de acción <!-- campeon|atleta notable -->
- [ ] **Estilo de Combate Adicional** (nivel 10): hoy `pasiva`, no menciona tipo de acción <!-- campeon|estilo de combate adicional -->
- [ ] **Superviviente** (nivel 18): hoy `pasiva`, no menciona tipo de acción <!-- campeon|superviviente -->

### Maestro de Batalla

- [ ] **Superioridad en Combate** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- maestro de batalla|superioridad en combate -->
- [ ] **Conoce a tu Enemigo** (nivel 7): hoy `pasiva`, no menciona tipo de acción <!-- maestro de batalla|conoce a tu enemigo -->
- [ ] **Implacable** (nivel 15): hoy `gratis`, no menciona tipo de acción <!-- maestro de batalla|implacable -->

### Caballero Arcano

- [ ] **Lanzamiento de Conjuros** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- caballero arcano|lanzamiento de conjuros -->
- [ ] **Vínculo con el Arma** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- caballero arcano|vinculo con el arma -->
- [ ] **Magia de Guerra** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse <!-- caballero arcano|magia de guerra -->
- [ ] **Magia de Guerra Mejorada** (nivel 18): hoy `pasiva`, queda pasiva pero parece activarse <!-- caballero arcano|magia de guerra mejorada -->

### Guerrero Psiónico

- [ ] **Poder Psiónico** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- guerrero psionico|poder psionico -->
- [ ] **Mente Protegida** (nivel 10): hoy `pasiva`, no menciona tipo de acción <!-- guerrero psionico|mente protegida -->
- [ ] **Maestro de la Telequinesis** (nivel 18): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- guerrero psionico|maestro de la telequinesis -->

### Caballero del Dragón Púrpura

- [ ] **Enviado Caballeresco** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- caballero del dragon purpura|enviado caballeresco -->
- [ ] **Recuperación Grupal** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- caballero del dragon purpura|recuperacion grupal -->
- [ ] **Tácticas de Equipo** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- caballero del dragon purpura|tacticas de equipo -->
- [ ] **Comandante Inspirador** (nivel 18): hoy `pasiva`, no menciona tipo de acción <!-- caballero del dragon purpura|comandante inspirador -->

## Lote 12: Hechicero (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 18. Con tipo claro: 5. Ya revisados: 0.

### Hechicero

- [ ] **Hechicería Encarnada** (nivel 7): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- hechicero|hechiceria encarnada -->
- [ ] **Apoteosis Arcana** (nivel 20): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- hechicero|apoteosis arcana -->

### Hechicería Aberrante

- [ ] **Habla Telepática** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- hechiceria aberrante|habla telepatica -->
- [ ] **Hechicería Psiónica** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- hechiceria aberrante|hechiceria psionica -->
- [ ] **Defensa Psíquica** (nivel 14): hoy `pasiva`, no menciona tipo de acción <!-- hechiceria aberrante|defensa psiquica -->
- [ ] **Transformación Reveladora** (nivel 18): hoy `pasiva`, no menciona tipo de acción <!-- hechiceria aberrante|transformacion reveladora -->

### Alma del Reloj

- [ ] **Restaurar Equilibrio** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- alma del reloj|restaurar equilibrio -->
- [ ] **Baluarte de la Ley** (nivel 6): hoy `pasiva`, no menciona tipo de acción <!-- alma del reloj|baluarte de la ley -->
- [ ] **Trance de Orden** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- alma del reloj|trance de orden -->
- [ ] **Cavatina del Reloj** (nivel 18): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- alma del reloj|cavatina del reloj -->

### Hechicería de Fuego de Conjuro

- [ ] **Conjuros de Fuego de Conjuro** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- hechiceria de fuego de conjuro|conjuros de fuego de conjuro -->
- [ ] **Absorber Conjuros** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- hechiceria de fuego de conjuro|absorber conjuros -->
- [ ] **Fuego de Conjuro Refinado** (nivel 14): hoy `pasiva`, no menciona tipo de acción <!-- hechiceria de fuego de conjuro|fuego de conjuro refinado -->
- [ ] **Corona de Fuego de Conjuro** (nivel 18): hoy `pasiva`, queda pasiva pero parece activarse <!-- hechiceria de fuego de conjuro|corona de fuego de conjuro -->

### Hechicería de las Sombras

- [ ] **Ojos de la Oscuridad** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- hechiceria de las sombras|ojos de la oscuridad -->
- [ ] **Vitalidad de Sombra** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- hechiceria de las sombras|vitalidad de sombra -->

### Hechicería Dracónica

- [ ] **Presencia Dracónica** (nivel 18): hoy `pasiva`, no menciona tipo de acción <!-- hechiceria draconica|presencia draconica -->

### Magia Salvaje

- [ ] **Caos Controlado** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- magia salvaje|caos controlado -->

## Lote 13: Mago (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 30. Con tipo claro: 13. Ya revisados: 0.

### Mago

- [ ] **Dominio de Conjuros** (nivel 18): hoy `pasiva`, no menciona tipo de acción <!-- mago|dominio de conjuros -->
- [ ] **Conjuros de Firma** (nivel 20): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- mago|conjuros de firma -->

### Escuela de Abjuración

- [ ] **Capa Arcana** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de abjuracion|capa arcana -->
- [ ] **Capa Proyectada** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de abjuracion|capa proyectada -->
- [ ] **Resistencia a Conjuros** (nivel 14): hoy `pasiva`, no menciona tipo de acción <!-- escuela de abjuracion|resistencia a conjuros -->

### Escuela de Adivinación

- [ ] **Portento** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de adivinacion|portento -->
- [ ] **Adivino Experto** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de adivinacion|adivino experto -->
- [ ] **El Tercer Ojo** (nivel 10): hoy `pasiva`, no menciona tipo de acción <!-- escuela de adivinacion|el tercer ojo -->
- [ ] **Portento Mayor** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de adivinacion|portento mayor -->

### Escuela de Evocación

- [ ] **Esculpir Conjuros** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- escuela de evocacion|esculpir conjuros -->
- [ ] **Truco Potente** (nivel 6): hoy `pasiva`, no menciona tipo de acción <!-- escuela de evocacion|truco potente -->
- [ ] **Evocación Potenciada** (nivel 10): hoy `pasiva`, no menciona tipo de acción <!-- escuela de evocacion|evocacion potenciada -->
- [ ] **Sobrecarga** (nivel 14): hoy `pasiva`, no menciona tipo de acción <!-- escuela de evocacion|sobrecarga -->

### Escuela de Ilusión

- [ ] **Ilusión Menor Mejorada** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- escuela de ilusion|ilusion menor mejorada -->
- [ ] **Ilusiones Maleables** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de ilusion|ilusiones maleables -->
- [ ] **Realidad Ilusoria** (nivel 14): hoy `pasiva`, no menciona tipo de acción <!-- escuela de ilusion|realidad ilusoria -->

### Cantor de la Hoja

- [ ] **Formación en Guerra y Canto** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- cantor de la hoja|formacion en guerra y canto -->

### Escuela de Conjuración

- [ ] **Erudito de la Conjuración** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de conjuracion|erudito de la conjuracion -->
- [ ] **Conjuración Concentrada** (nivel 10): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de conjuracion|conjuracion concentrada -->
- [ ] **Invocaciones Duraderas** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de conjuracion|invocaciones duraderas -->

### Escuela de Encantamiento

- [ ] **Erudito del Encantamiento** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de encantamiento|erudito del encantamiento -->
- [ ] **Encantamiento Dividido** (nivel 10): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de encantamiento|encantamiento dividido -->

### Escuela de Necromancia

- [ ] **Erudito de la Necromancia** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de necromancia|erudito de la necromancia -->
- [ ] **Cosecha Mortal** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- escuela de necromancia|cosecha mortal -->
- [ ] **Séquito de Muertos** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse <!-- escuela de necromancia|sequito de muertos -->
- [ ] **Acostumbrado a la Muerte** (nivel 10): hoy `pasiva`, no menciona tipo de acción <!-- escuela de necromancia|acostumbrado a la muerte -->

### Escuela de Transmutación

- [ ] **Erudito de la Transmutación** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de transmutacion|erudito de la transmutacion -->
- [ ] **Alquimia Menor** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de transmutacion|alquimia menor -->
- [ ] **Piedra del Transmutador** (nivel 6): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de transmutacion|piedra del transmutador -->
- [ ] **Cambiaformas** (nivel 10): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- escuela de transmutacion|cambiaformas -->

## Lote 14: Monje (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 15. Con tipo claro: 2. Ya revisados: 0.

### Monje

- [ ] **Disciplina Perfecta** (nivel 15): hoy `pasiva`, no menciona tipo de acción <!-- monje|disciplina perfecta -->
- [ ] **Defensa Superior** (nivel 18): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- monje|defensa superior -->
- [ ] **Desafiar a la Muerte** (nivel 20): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- monje|desafiar a la muerte -->
- [ ] **Alma Diamantina** (nivel 14): hoy `pasiva`, no menciona tipo de acción <!-- monje|alma diamantina -->

### Camino de los Elementos

- [ ] **Sintonía Elemental** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- camino de los elementos|sintonia elemental -->
- [ ] **Explosión Ambiental** (nivel 6): hoy `pasiva`, no menciona tipo de acción <!-- camino de los elementos|explosion ambiental -->
- [ ] **Zancada Ágil** (nivel 10): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- camino de los elementos|zancada agil -->
- [ ] **Avatar de los Elementos** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- camino de los elementos|avatar de los elementos -->

### Camino de la Misericordia

- [ ] **Mano de la Curación** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- camino de la misericordia|mano de la curacion -->
- [ ] **Mano del Daño** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- camino de la misericordia|mano del dano -->
- [ ] **Toque del Médico** (nivel 6): hoy `pasiva`, no menciona tipo de acción <!-- camino de la misericordia|toque del medico -->
- [ ] **Mano de la Misericordia Suprema** (nivel 17): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- camino de la misericordia|mano de la misericordia suprema -->

### Guerrero de la Mano Abierta

- [ ] **Tranquilidad** (nivel 11): hoy `pasiva`, no menciona tipo de acción <!-- guerrero de la mano abierta|tranquilidad -->
- [ ] **Palma Quiebra-almas** (nivel 17): hoy `pasiva`, no menciona tipo de acción <!-- guerrero de la mano abierta|palma quiebra-almas -->

### Guerrero de la Sombra

- [ ] **Manto de Sombras** (nivel 11): hoy `pasiva`, no menciona tipo de acción <!-- guerrero de la sombra|manto de sombras -->

## Lote 15: Paladín (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 13. Con tipo claro: 6. Ya revisados: 0.

### Paladín

- [ ] **Castigo Radiante** (nivel 11): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- paladin|castigo radiante -->
- [ ] **Toque Restaurador** (nivel 14): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- paladin|toque restaurador -->

### Juramento de los Genios Nobles

- [ ] **Castigo Elemental** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse <!-- juramento de los genios nobles|castigo elemental -->
- [ ] **Conjuros del Genio** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse <!-- juramento de los genios nobles|conjuros del genio -->

### Juramento de Devoción

- [ ] **Aura de Devoción** (nivel 7): hoy `pasiva`, no menciona tipo de acción <!-- juramento de devocion|aura de devocion -->
- [ ] **Pureza de Espíritu** (nivel 15): hoy `pasiva`, no menciona tipo de acción <!-- juramento de devocion|pureza de espiritu -->
- [ ] **Halo Sagrado** (nivel 20): hoy `pasiva`, no menciona tipo de acción <!-- juramento de devocion|halo sagrado -->

### Juramento de la Gloria

- [ ] **Aura de Alacridad** (nivel 7): hoy `pasiva`, no menciona tipo de acción <!-- juramento de la gloria|aura de alacridad -->
- [ ] **Leyenda Viva** (nivel 20): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- juramento de la gloria|leyenda viva -->

### Juramento de los Antiguos

- [ ] **Aura de Resistencia** (nivel 7): hoy `pasiva`, no menciona tipo de acción <!-- juramento de los antiguos|aura de resistencia -->
- [ ] **Centinela Inmortal** (nivel 15): hoy `pasiva`, no menciona tipo de acción <!-- juramento de los antiguos|centinela inmortal -->

### Juramento de Venganza

- [ ] **Vengador Implacable** (nivel 7): hoy `gratis`, no menciona tipo de acción <!-- juramento de venganza|vengador implacable -->
- [ ] **Ángel Vengador** (nivel 20): hoy `pasiva`, no menciona tipo de acción <!-- juramento de venganza|angel vengador -->

## Lote 16: Pícaro (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 28. Con tipo claro: 8. Ya revisados: 0.

### Pícaro

- [ ] **Evasión** (nivel 7): hoy `pasiva`, no menciona tipo de acción <!-- picaro|evasion -->
- [ ] **Talento Fiable** (nivel 7): hoy `pasiva`, no menciona tipo de acción <!-- picaro|talento fiable -->
- [ ] **Golpe Astuto Mejorado** (nivel 11): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- picaro|golpe astuto mejorado -->
- [ ] **Golpe Astuto Taimado** (nivel 14): hoy `pasiva`, no menciona tipo de acción <!-- picaro|golpe astuto taimado -->
- [ ] **Golpe de Suerte** (nivel 20): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- picaro|golpe de suerte -->

### Embaucador Arcano

- [ ] **Lanzamiento de Conjuros** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- embaucador arcano|lanzamiento de conjuros -->
- [ ] **Mano de Mago Legeramente** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- embaucador arcano|mano de mago legeramente -->
- [ ] **Emboscada Mágica** (nivel 9): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- embaucador arcano|emboscada magica -->

### Asesino

- [ ] **Asesinar** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- asesino|asesinar -->
- [ ] **Competencia en Infiltración** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- asesino|competencia en infiltracion -->
- [ ] **Maestro de la Suplantación** (nivel 9): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- asesino|maestro de la suplantacion -->
- [ ] **Golpe Mortal** (nivel 17): hoy `gratis`, no menciona tipo de acción <!-- asesino|golpe mortal -->

### Cuchillo Mental

- [ ] **Hojas Psiónicas** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- cuchillo mental|hojas psionicas -->
- [ ] **Poder Psiónico** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- cuchillo mental|poder psionico -->
- [ ] **Hojas de Rastreo** (nivel 9): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- cuchillo mental|hojas de rastreo -->
- [ ] **Velo Psíquico** (nivel 17): hoy `pasiva`, no menciona tipo de acción <!-- cuchillo mental|velo psiquico -->

### Ladrón

- [ ] **Trabajo en Segundo Piso** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- ladron|trabajo en segundo piso -->
- [ ] **Usar Objeto Mágico** (nivel 13): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- ladron|usar objeto magico -->
- [ ] **Reflejos de Ladrón** (nivel 17): hoy `pasiva`, no menciona tipo de acción <!-- ladron|reflejos de ladron -->

### Fantasma

- [ ] **Susurros de los Muertos** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- fantasma|susurros de los muertos -->
- [ ] **Lamentos de la Tumba** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- fantasma|lamentos de la tumba -->
- [ ] **Amigo de la Muerte** (nivel 17): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- fantasma|amigo de la muerte -->

### Vástago de los Tres

- [ ] **Lealtad Temible** (nivel 3): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- vastago de los tres|lealtad temible -->
- [ ] **Aura de Malevolencia** (nivel 13): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- vastago de los tres|aura de malevolencia -->
- [ ] **Encarnación del Terror** (nivel 17): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- vastago de los tres|encarnacion del terror -->

### Inquisitivo

- [ ] **Oído para el Engaño** (nivel 3): hoy `pasiva`, no menciona tipo de acción <!-- inquisitivo|oido para el engano -->
- [ ] **Mirada Firme** (nivel 9): hoy `pasiva`, no menciona tipo de acción <!-- inquisitivo|mirada firme -->
- [ ] **Ojo para las Debilidades** (nivel 17): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- inquisitivo|ojo para las debilidades -->

## Lote 17: dotes generales

Dudosos: 43. Con tipo claro: 12. Ya revisados: 2.

### Dote general

- [ ] **Actor** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|actor -->
- [ ] **Atleta** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|atleta -->
- [ ] **Cargador** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|cargador -->
- [ ] **Experto en Ballestas** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|experto en ballestas -->
- [ ] **Rompedor (Crusher)** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|rompedor (crusher) -->
- [ ] **Portador Dual** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|portador dual -->
- [ ] **Adepto Elemental** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|adepto elemental -->
- [ ] **Fuertemente Acorazado** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|fuertemente acorazado -->
- [ ] **Maestro de Armadura Pesada** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|maestro de armadura pesada -->
- [ ] **Líder Inspirador** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|lider inspirador -->
- [ ] **Ligeramente Acorazado** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|ligeramente acorazado -->
- [ ] **Adepto Marcial** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|adepto marcial -->
- [ ] **Maestro de Armadura Media** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|maestro de armadura media -->
- [ ] **Combatiente Montado** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|combatiente montado -->
- [ ] **Perforador (Piercer)** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|perforador (piercer) -->
- [ ] **Envenenador** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|envenenador -->
- [ ] **Maestro de Armas de Astil** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse <!-- dote general|maestro de armas de astil -->
- [ ] **Centinela** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|centinela -->
- [ ] **Tirador de Primera** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|tirador de primera -->
- [ ] **Experto en Habilidades** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|experto en habilidades -->
- [ ] **Furtivo (Skulker)** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|furtivo (skulker) -->
- [ ] **Cortador (Slasher)** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|cortador (slasher) -->
- [ ] **Velocista (Speedster)** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|velocista (speedster) -->
- [ ] **Francotirador de Conjuros** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|francotirador de conjuros -->
- [ ] **Toque Feérico** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|toque feerico -->
- [ ] **Toque de las Sombras** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|toque de las sombras -->
- [ ] **Telepático** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|telepatico -->
- [ ] **Mejora de Característica** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|mejora de caracteristica -->
- [ ] **Chef** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|chef -->
- [ ] **Robusto (Durable)** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|robusto (durable) -->
- [ ] **Explorador de Mazmorras** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|explorador de mazmorras -->
- [ ] **Maestro de Armas Sencillas** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|maestro de armas sencillas -->
- [ ] **Marca Aberrante Mayor** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|marca aberrante mayor -->
- [ ] **Marca de Detección Mayor** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|marca de deteccion mayor -->
- [ ] **Marca de Hallazgo Mayor** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|marca de hallazgo mayor -->
- [ ] **Marca de Manejo Mayor** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|marca de manejo mayor -->
- [ ] **Marca de Curación Mayor** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|marca de curacion mayor -->
- [ ] **Marca de Hospitalidad Mayor** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|marca de hospitalidad mayor -->
- [ ] **Marca de Creación Mayor** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|marca de creacion mayor -->
- [ ] **Marca de Escritura Mayor** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|marca de escritura mayor -->
- [ ] **Marca de las Sombras Mayor** (nivel 4): hoy `pasiva`, no menciona tipo de acción <!-- dote general|marca de las sombras mayor -->
- [ ] **Marca de la Tormenta Mayor** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|marca de la tormenta mayor -->
- [ ] **Marca de Dragón Potente** (nivel 4): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote general|marca de dragon potente -->

## Lote 18: dotes de estilo de combate

La biblioteca no trae ninguna: el importador las descarta y los estilos salen de las reglas (estilos.ts), que ya tienen su tipo fijo.

Dudosos: 0. Con tipo claro: 0. Ya revisados: 0.


## Lote 19: dotes épicas

Dudosos: 12. Con tipo claro: 1. Ya revisados: 0.

### Dote épica

- [ ] **Don de Proeza en Combate** (nivel 19): hoy `pasiva`, no menciona tipo de acción <!-- dote epica|don de proeza en combate -->
- [ ] **Don de Viaje Dimensional** (nivel 19): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote epica|don de viaje dimensional -->
- [ ] **Don de Resistencia a Energía** (nivel 19): hoy `pasiva`, no menciona tipo de acción <!-- dote epica|don de resistencia a energia -->
- [ ] **Don de Fortaleza** (nivel 19): hoy `pasiva`, no menciona tipo de acción <!-- dote epica|don de fortaleza -->
- [ ] **Don de Ofensiva Irresistible** (nivel 19): hoy `pasiva`, no menciona tipo de acción <!-- dote epica|don de ofensiva irresistible -->
- [ ] **Don de Recuperación** (nivel 19): hoy `pasiva`, no menciona tipo de acción <!-- dote epica|don de recuperacion -->
- [ ] **Don de Habilidad** (nivel 19): hoy `pasiva`, no menciona tipo de acción <!-- dote epica|don de habilidad -->
- [ ] **Don de Velocidad** (nivel 19): hoy `pasiva`, no menciona tipo de acción <!-- dote epica|don de velocidad -->
- [ ] **Don de Recuerdo de Conjuros** (nivel 19): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote epica|don de recuerdo de conjuros -->
- [ ] **Don del Espíritu Nocturno** (nivel 19): hoy `pasiva`, no menciona tipo de acción <!-- dote epica|don del espiritu nocturno -->
- [ ] **Don de Visión Verdadera** (nivel 19): hoy `pasiva`, no menciona tipo de acción <!-- dote epica|don de vision verdadera -->
- [ ] **Bendición de Siberys** (nivel 19): hoy `pasiva`, queda pasiva pero parece activarse; no menciona tipo de acción <!-- dote epica|bendicion de siberys -->
