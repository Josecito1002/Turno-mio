# Revisión de reglas de la biblioteca

Rasgos de la biblioteca sin regla revisada en `web/src/features/reglas/data/reglas-revisadas.ts` cuyo tipo es dudoso:
el clasificador los deja como pasiva aunque su texto sugiere que se activan, o su texto no menciona ningún tipo de acción.

Generado con `npx tsx scripts/auditar-reglas.ts` (desde `web/`). Pendientes al generar: 159.
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
- [x] **Brujo: Invocaciones Sobrenaturales**: 1 a 10 según nivel, las 28 del Manual 2024 con su nivel y su requisito; los pactos son invocaciones y reemplazan la casilla "Pacto de la Cadena". Armadura de Sombras, Visión del Diablo, Pacto del Filo y Filo Sediento en el cálculo. <!-- selector|invocaciones -->
- [x] **Brujo: Arcano Místico**: un conjuro de brujo de nivel 6, 7, 8 y 9 en los niveles 11, 13, 15 y 17; cada uno sale con 1 uso por descanso largo. <!-- selector|arcano-mistico -->
- [x] **Conjuros que dan los rasgos**: los de subclase, Arcano Místico, las invocaciones que lanzan un conjuro, las especies (elfo, gnomo, tiefling, aasimar, genasí, githyanki, githzerai, fata, firbolg, tritón, yuan-ti, sangre bruja, elfo astral con su truco a elegir) y las dotes (Marcas de Dragón, Toque Feérico, Toque de las Sombras) salen solos en la hoja, con sus usos y sin contar en el límite. Detectar veneno y enfermedad, Amistad con los animales, Custodia de la hoja y el truco de la Marca de la Tormenta no están en el catálogo: salen sin descripción. <!-- selector|conjuros-rasgos -->
- [x] **El Genio: tipo de genio**: Dao, Djinn, Efreet o Marid: su tipo de daño y sus conjuros ampliados. <!-- selector|genio-tipo -->
- [x] **El Vestigio: tipo y dominio**: celestial, infernal o no muerto (resistencia, daño y Poder Divino) y dominio de clérigo (Vida, Luz, Engaño o Guerra) para sus conjuros siempre preparados. <!-- selector|vestigio -->

### Clases de las reglas (no están en ningún lote)

- [ ] **Clérigo: Orden Divina**: Protector (armadura pesada y armas marciales) o Taumaturgo (un truco más y SAB a Arcanos o Religión); cambia competencias y trucos. <!-- selector|orden-divina -->
- [ ] **Druida: Orden Primordial**: Mago (un truco más y SAB a Arcanos o Naturaleza) o Guardián (armadura media y armas marciales). <!-- selector|orden-primordial -->
- [ ] **Druida: formas de Forma Salvaje**: 4, 6 y 8 bestias conocidas en los niveles 2, 4 y 8. <!-- selector|formas-salvajes -->
- [x] **Hechicero: Metamagia**: 2, 4 y 6 opciones en los niveles 2, 10 y 17; cada una saldría con su coste en puntos. <!-- selector|metamagia --> Lote 12: se eligen en el paso Clase.
- [ ] **Hechicería Dracónica: Afinidad Elemental**: tipo de daño (ácido, frío, fuego, relámpago o veneno): resistencia y CAR al daño de ese tipo. <!-- selector|afinidad-draconica -->
- [ ] **Mago: Dominio de Conjuros y Conjuros Distintivos**: conjuros de nivel 1 y 2 a voluntad (nivel 18) y dos de nivel 3 (nivel 20). <!-- selector|dominio-conjuros -->
- [ ] **Artífice y Arcanista: planos de Replicar Objeto Mágico**: 4 a 8 planos según nivel, de las tablas de 2025. <!-- selector|planos-artifice -->

### Lote 6: Bardo

- [ ] **Colegio de la Luna: truco de druida**: un truco de druida que no cuenta en el límite. <!-- selector|truco-luna -->

### Hechos

- [x] **Clérigo: Golpes Benditos (nivel 7)**: Golpe Divino o Lanzamiento Potente; el texto sube a 2d8 o da PG temporales en el nivel 14. <!-- selector|golpes-benditos -->
- [x] **Dominio del Conocimiento: Bendiciones del Saber**: unas herramientas de artesano y dos habilidades con pericia (Arcanos, Historia, Naturaleza o Religión), sumadas en el cálculo. <!-- selector|bendiciones-saber -->

### Lote 9: Druida

- [x] **Furia Elemental (nivel 7)**: Golpe Primigenio o Lanzamiento Potente; en el cálculo. <!-- selector|furia-elemental -->
- [x] **Círculo de la Tierra: tipo de tierra**: Árida, Polar, Templada o Tropical; decide los conjuros siempre preparados, en el cálculo. <!-- selector|tipo-tierra -->

### Lote 10: Explorador

- [x] **Cazador: Presa del Cazador y Tácticas Defensivas**: Asesino de Colosos o Rompehordas (nivel 3) y su defensa (nivel 7); se cambian en un descanso; en el paso Clase. <!-- selector|presa-cazador -->
- [ ] **Maestro de Bestias: bestia primigenia**: de tierra, de mar o del cielo; cambia sus estadísticas y su ataque. <!-- selector|bestia-primigenia -->

### Lote 11: Guerrero

- [x] **Campeón: Estilo de Combate Adicional**: un segundo estilo; en 2024 es en el nivel 7 (la biblioteca dice 10). Lote 11: se elige en el paso Clase (sin repetir el de la clase) y su efecto se suma igual que el primero. <!-- selector|estilo-campeon -->
- [x] **Arquero Arcano: Disparos Arcanos**: los 8 de Arcana Unleashed (2026), 2 conocidos y uno más en los niveles 7, 10, 15 y 18; se eligen en el paso Clase y salen con su dado y su CD (INT). <!-- selector|disparo-arcano -->
- [x] **Caballero Rúnico: runas**: las 6 de Tasha (Colina y Tormenta desde el nivel 7), 2/3/4/5 conocidas en los niveles 3/7/10/15; cada runa elegida sale con su uso (dos desde el nivel 15) y la CD con CON. Poder de Gigante con usos = bonificador de competencia y dado 1d6/1d8/1d10. <!-- selector|runas -->
- [x] **Samurái: Espíritu de Lucha**: 3 usos por descanso largo, 5/10/15 PG temporales en los niveles 3/10/15. <!-- samurai|espiritu de lucha -->
- ⚠ **Abanderado (Banneret)**: no se encontró el nombre oficial en español de Heroes of Faerûn; se deja "Abanderado" hasta confirmarlo.
- [x] **Maestro de Batalla: maniobras y Estudiante de la Guerra**: maniobras conocidas según nivel, cada una como opción con su dado de superioridad; más una herramienta y una habilidad. Lote 11: las 20 maniobras de 2024 se eligen en el paso Clase y salen en tu turno con su tipo, su dado y su CD. <!-- selector|maniobras -->

### Lote 16: Pícaro

- [x] **Vástago de los Tres: Lealtad Temible**: Bane, Bhaal o Myrkul: su resistencia y su truco. Lote 16: se elige en el paso Clase; la resistencia sale en el texto del rasgo y el truco en Conjuros. <!-- selector|lealtad-tres -->

## Por agregar (faltan respecto a D&D Beyond)

Se agregan en el lote de su clase, con su versión oficial más reciente. Las marcadas con «no se agrega» ya las reemplazó el contenido de 2024.

### Lote 5: Bárbaro

- [x] **Senda de la Bestia** (Tasha's Cauldron of Everything): agregado, versión de Tasha's Cauldron of Everything (2020). <!-- agregar|senda de la bestia -->
- [x] **Senda de la Magia Salvaje** (Tasha's Cauldron of Everything): agregado, versión de Tasha's Cauldron of Everything (2020). <!-- agregar|senda de la magia salvaje -->
- [x] **Senda del Guardián Ancestral** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|senda del guardian ancestral -->
- [x] **Senda del Heraldo de la Tormenta** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). La versión de prueba (UA 2025) se conserva aparte. <!-- agregar|senda del heraldo de la tormenta -->
- [x] **Senda del Gigante** (Bigby Presents: Glory of the Giants): agregado, versión de Bigby Presents: Glory of the Giants (2023). <!-- agregar|senda del gigante -->
- [x] **Senda del Rabioso de Batalla** (Sword Coast Adventurer's Guide): agregado, versión de Sword Coast Adventurer's Guide (2015). <!-- agregar|senda del rabioso de batalla -->
- [x] **Senda del Guerrero Totémico** (Manual del Jugador 2014): no se agrega, la reemplaza la Senda del Corazón Salvaje (2024), que ya está. <!-- agregar|senda del guerrero totemico -->

### Lote 6: Bardo

- [x] **Colegio de la Creación** (Tasha's Cauldron of Everything): agregado, versión de Tasha's Cauldron of Everything (2020). <!-- agregar|colegio de la creacion -->
- [x] **Colegio de la Elocuencia** (Tasha's Cauldron of Everything): agregado, versión de Tasha's Cauldron of Everything (2020). <!-- agregar|colegio de la elocuencia -->
- [x] **Colegio de las Espadas** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|colegio de las espadas -->
- [x] **Colegio de los Susurros** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|colegio de los susurros -->

### Lote 7: Brujo

- [x] **El Filo Maldito (Hexblade)** (Xanathar's Guide to Everything): agregado; sus rasgos de nivel 1 pasan al 3, como indica el Manual 2024 para las subclases antiguas. <!-- agregar|el filo maldito (hexblade) -->
- [x] **El Genio** (Tasha's Cauldron of Everything): agregado; sus rasgos de nivel 1 pasan al 3, como indica el Manual 2024 para las subclases antiguas. <!-- agregar|el genio -->
- [x] **El Insondable** (Tasha's Cauldron of Everything): agregado; sus rasgos de nivel 1 pasan al 3, como indica el Manual 2024 para las subclases antiguas. <!-- agregar|el insondable -->
- [x] **El Inmortal** (Sword Coast Adventurer's Guide): agregado; sus rasgos de nivel 1 pasan al 3, como indica el Manual 2024 para las subclases antiguas. <!-- agregar|el inmortal -->

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

- [x] **Círculo de los Sueños** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|circulo de los suenos -->
- [x] **Círculo del Pastor** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|circulo del pastor -->
- [x] **Círculo de las Esporas** (Tasha's Cauldron of Everything): agregado, versión de Tasha's Cauldron of Everything (2020). <!-- agregar|circulo de las esporas -->
- [x] **Círculo del Fuego Salvaje** (Tasha's Cauldron of Everything): agregado, versión de Tasha's Cauldron of Everything (2020). <!-- agregar|circulo del fuego salvaje -->

### Lote 10: Explorador

- [ ] **Trotamundos del Horizonte** (Xanathar's Guide to Everything) <!-- agregar|trotamundos del horizonte -->
- [x] **Cazador de Monstruos** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|cazador de monstruos -->
- [x] **Guardián del Enjambre** (Tasha's Cauldron of Everything): agregado, versión de Tasha's Cauldron of Everything (2020). <!-- agregar|guardian del enjambre -->
- [x] **Guardián Dracónico** (Fizban's Treasury of Dragons): agregado, versión de Fizban's Treasury of Dragons (2021). <!-- agregar|guardian draconico -->

### Lote 11: Guerrero

- [x] **Arquero Arcano** (Xanathar's Guide to Everything): agregado, versión de Arcana Unleashed (2026). <!-- agregar|arquero arcano -->
- [x] **Caballero (Cavalier)** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|caballero (cavalier) -->
- [x] **Samurái** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|samurai -->
- [x] **Caballero Rúnico** (Tasha's Cauldron of Everything): agregado, versión de Tasha's Cauldron of Everything (2020). <!-- agregar|caballero runico -->
- [x] **Caballero del Eco** (Explorer's Guide to Wildemount): agregado, versión de Explorer's Guide to Wildemount (2020). <!-- agregar|caballero del eco -->

### Lote 12: Hechicero

- [x] **Alma Divina** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|alma divina -->
- [x] **Hechicería de la Tormenta** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|hechiceria de la tormenta -->
- [x] **Hechicería Lunar** (Dragonlance: Shadow of the Dragon Queen): agregado, versión de Dragonlance: Shadow of the Dragon Queen (2022). <!-- agregar|hechiceria lunar -->

### Lote 13: Mago

- [x] **Magia de Guerra** (Xanathar's Guide to Everything): agregado (lote 13), versión de Xanathar's Guide to Everything (2017); sus rasgos de nivel 2 pasan al 3. <!-- agregar|magia de guerra -->
- [x] **Orden de los Escribas** (Tasha's Cauldron of Everything): agregado (lote 13), versión de Tasha's Cauldron of Everything (2020); sus rasgos de nivel 2 pasan al 3. <!-- agregar|orden de los escribas -->
- [x] **Cronurgia** (Explorer's Guide to Wildemount): agregado (lote 13), versión de Explorer's Guide to Wildemount (2020); sus rasgos de nivel 2 pasan al 3. <!-- agregar|cronurgia -->
- [x] **Graviturgia** (Explorer's Guide to Wildemount): agregado (lote 13), versión de Explorer's Guide to Wildemount (2020); sus rasgos de nivel 2 pasan al 3. <!-- agregar|graviturgia -->

### Lote 14: Monje

- [ ] **Camino del Maestro Borracho** (Xanathar's Guide to Everything) <!-- agregar|camino del maestro borracho -->
- [ ] **Camino del Kensei** (Xanathar's Guide to Everything) <!-- agregar|camino del kensei -->
- [ ] **Camino del Alma Solar** (Xanathar's Guide to Everything) <!-- agregar|camino del alma solar -->
- [ ] **Camino del Yo Astral** (Tasha's Cauldron of Everything) <!-- agregar|camino del yo astral -->
- [ ] **Camino del Dragón Ascendente** (Fizban's Treasury of Dragons) <!-- agregar|camino del dragon ascendente -->
- [ ] **Camino de la Larga Muerte** (Sword Coast Adventurer's Guide) <!-- agregar|camino de la larga muerte -->

### Lote 15: Paladín

- [x] **Juramento de Conquista** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|juramento de conquista -->
- [x] **Juramento de Redención** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|juramento de redencion -->
- [x] **Juramento de los Vigilantes** (Tasha's Cauldron of Everything): agregado, versión de Tasha's Cauldron of Everything (2020). <!-- agregar|juramento de los vigilantes -->
- [x] **Juramento de la Corona** (Sword Coast Adventurer's Guide): agregado, versión de Sword Coast Adventurer's Guide (2015). <!-- agregar|juramento de la corona -->
- [x] **Rompejuramentos** (Guía del Dungeon Master 2014): agregado, versión de Guía del Dungeon Master (2014). <!-- agregar|rompejuramentos -->

### Lote 16: Pícaro

- [x] **Mente Maestra** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|mente maestra -->
- [x] **Espadachín** (Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). <!-- agregar|espadachin -->
- [x] **Batidor** (Scout, Xanathar's Guide to Everything): agregado, versión de Xanathar's Guide to Everything (2017). Se llama Batidor para no confundirlo con la clase Explorador. <!-- agregar|batidor -->
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

Después se agregó el **Reanimador** (Ravenloft: The Horrors Within, 2026), que faltaba: `scripts/datos/artifice-2026.ts`, opción `artifice` de `actualizar-clase`, con su compañero reanimado en Familiares y criaturas.

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

Fuente: Manual del Jugador 2024; El No Muerto de Ravenloft: The Horrors Within (2026) y El Vestigio de Arcana Unleashed (2026). El Filo Maldito, El Genio, El Insondable y El Inmortal no tienen versión 2024: se agregaron con su libro, con los rasgos de nivel 1 en el 3. Números del No Muerto y del Vestigio tomados de las fichas públicas de esas subclases (dnd2024.wikidot.com); el tipo de acción del Poder Divino del Vestigio no aparece ahí y quedó como acción adicional.

Dudosos: 0. Con tipo claro: 0. Ya revisados: 51.


### Revisados

- [x] **Contactar al Patrón** (nivel 9): `fuera`. nuevo de 2024; Manual del Jugador 2024. <!-- brujo|contactar al patron -->
- [x] **Arcano Místico** (nivel 11): `pasiva`. antes "Arcanum Místico"; selector de un conjuro por nivel, cada uno con 1 uso por descanso largo; Manual del Jugador 2024. <!-- brujo|arcano mistico -->
- [x] **Maestro Sobrenatural** (nivel 20): `pasiva`. Manual del Jugador 2024. <!-- brujo|maestro sobrenatural -->
- [x] **Conjuros del No Muerto** (nivel 3): `pasiva`. reemplaza a la Lista de Conjuros Ampliada de Van Richten; siempre preparados; Ravenloft: The Horrors Within (2026). <!-- el no muerto|conjuros del no muerto -->
- [x] **Forma del Terror** (nivel 3): `adicional`. usos iguales a CAR (antes competencia); PG temporales y CD calculados; Ravenloft: The Horrors Within (2026). <!-- el no muerto|forma del terror -->
- [x] **Toque Sepulcral** (nivel 6): `pasiva`. Ravenloft: The Horrors Within (2026). <!-- el no muerto|toque sepulcral -->
- [x] **Cáscara Necrótica** (nivel 10): `pasiva`. el estallido sale aparte, 1 uso por descanso corto; Ravenloft: The Horrors Within (2026). <!-- el no muerto|cascara necrotica -->
- [x] **Terror Superior** (nivel 14): `pasiva`. reemplaza a Proyección Espiritual; Ravenloft: The Horrors Within (2026). <!-- el no muerto|terror superior -->
- [x] **Compañero Vestigio** (nivel 3): `pasiva`. selector de tipo; CA, PG y ataque calculados; Poder Divino aparte; Arcana Unleashed (2026). <!-- el vestigio|companero vestigio -->
- [x] **Conjuros del Vestigio** (nivel 3): `pasiva`. selector de dominio; siempre preparados; Arcana Unleashed (2026). <!-- el vestigio|conjuros del vestigio -->
- [x] **Poder del Vestigio** (nivel 6): `pasiva`. Arcana Unleashed (2026). <!-- el vestigio|poder del vestigio -->
- [x] **Recuperación del Vestigio** (nivel 10): `reaccion`. Arcana Unleashed (2026). <!-- el vestigio|recuperacion del vestigio -->
- [x] **Apariencia de Vida** (nivel 14): `accion`. Arcana Unleashed (2026). <!-- el vestigio|apariencia de vida -->
- [x] **Lista Ampliada del Filo Maldito** (nivel 3): `pasiva`. Xanathar's Guide to Everything, nivel 1 → 3. <!-- el filo maldito|lista ampliada del filo maldito -->
- [x] **Guerrero Maleficio** (nivel 3): `pasiva`. competencias y CAR en las armas en el cálculo; Xanathar's Guide to Everything, nivel 1 → 3. <!-- el filo maldito|guerrero maleficio -->
- [x] **Maldición del Filo Maldito** (nivel 3): `adicional`. daño y curación calculados; Xanathar's Guide to Everything, nivel 1 → 3. <!-- el filo maldito|maldicion del filo maldito -->
- [x] **Espectro Maldito** (nivel 6): `gratis`. Xanathar's Guide to Everything, nivel 1 → 3. <!-- el filo maldito|espectro maldito -->
- [x] **Armadura de Maleficios** (nivel 10): `reaccion`. Xanathar's Guide to Everything, nivel 1 → 3. <!-- el filo maldito|armadura de maleficios -->
- [x] **Maestro de Maleficios** (nivel 14): `gratis`. Xanathar's Guide to Everything, nivel 1 → 3. <!-- el filo maldito|maestro de maleficios -->
- [x] **Lista Ampliada del Genio** (nivel 3): `pasiva`. selector de tipo de genio; Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el genio|lista ampliada del genio -->
- [x] **Recipiente del Genio** (nivel 3): `pasiva`. Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el genio|recipiente del genio -->
- [x] **Respiro Embotellado** (nivel 3): `accion`. Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el genio|respiro embotellado -->
- [x] **Ira del Genio** (nivel 3): `gratis`. daño según el tipo de genio; Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el genio|ira del genio -->
- [x] **Don Elemental** (nivel 6): `pasiva`. Vuelo Elemental aparte, usos por competencia; Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el genio|don elemental -->
- [x] **Recipiente Santuario** (nivel 10): `pasiva`. Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el genio|recipiente santuario -->
- [x] **Deseo Limitado** (nivel 14): `accion`. Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el genio|deseo limitado -->
- [x] **Lista Ampliada del Insondable** (nivel 3): `pasiva`. Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el insondable|lista ampliada del insondable -->
- [x] **Don del Mar** (nivel 3): `pasiva`. Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el insondable|don del mar -->
- [x] **Tentáculo de las Profundidades** (nivel 3): `adicional`. usos por competencia; ataque en Ataques; Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el insondable|tentaculo de las profundidades -->
- [x] **Espiral Guardiana** (nivel 6): `reaccion`. Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el insondable|espiral guardiana -->
- [x] **Alma Oceánica** (nivel 6): `pasiva`. Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el insondable|alma oceanica -->
- [x] **Tentáculos Aferradores** (nivel 10): `accion`. Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el insondable|tentaculos aferradores -->
- [x] **Zambullida Insondable** (nivel 14): `accion`. Tasha's Cauldron of Everything, nivel 1 → 3. <!-- el insondable|zambullida insondable -->
- [x] **Lista Ampliada del Inmortal** (nivel 3): `pasiva`. Sword Coast Adventurer's Guide, nivel 1 → 3. <!-- el inmortal|lista ampliada del inmortal -->
- [x] **Entre los Muertos** (nivel 3): `pasiva`. Sword Coast Adventurer's Guide, nivel 1 → 3. <!-- el inmortal|entre los muertos -->
- [x] **Desafiar a la Muerte** (nivel 6): `gratis`. curación calculada; Sword Coast Adventurer's Guide, nivel 1 → 3. <!-- el inmortal|desafiar a la muerte -->
- [x] **Naturaleza Imperecedera** (nivel 10): `pasiva`. Sword Coast Adventurer's Guide, nivel 1 → 3. <!-- el inmortal|naturaleza imperecedera -->
- [x] **Vida Indestructible** (nivel 14): `adicional`. curación calculada; Sword Coast Adventurer's Guide, nivel 1 → 3. <!-- el inmortal|vida indestructible -->
- [x] **Huida Brumosa** (nivel 6): `reaccion`. Manual del Jugador 2024. <!-- patron archihada|huida brumosa -->
- [x] **Defensas Cautivadoras** (nivel 10): `reaccion`. antes "Defensa Atrapante"; Manual del Jugador 2024. <!-- patron archihada|defensas cautivadoras -->
- [x] **Magia Hechicera** (nivel 14): `gratis`. antes "Delirio Feérico"; Manual del Jugador 2024. <!-- patron archihada|magia hechicera -->
- [x] **Suerte del Oscuro** (nivel 6): `gratis`. antes "Suerte del Propio Oscuro"; Manual del Jugador 2024. <!-- patron infernal|suerte del oscuro -->
- [x] **Resistencia Infernal** (nivel 10): `fuera`. Manual del Jugador 2024. <!-- patron infernal|resistencia infernal -->
- [x] **Arrojar al Infierno** (nivel 14): `gratis`. antes "Arrojar a través del Infierno"; Manual del Jugador 2024. <!-- patron infernal|arrojar al infierno -->
- [x] **Alma Radiante** (nivel 6): `pasiva`. Manual del Jugador 2024. <!-- patron celestial|alma radiante -->
- [x] **Resiliencia Celestial** (nivel 10): `fuera`. antes "Vigor Celestial"; PG temporales calculados; Manual del Jugador 2024. <!-- patron celestial|resiliencia celestial -->
- [x] **Venganza Abrasadora** (nivel 14): `gratis`. antes "Venganza Flamígera"; daño calculado; Manual del Jugador 2024. <!-- patron celestial|venganza abrasadora -->
- [x] **Combatiente Clarividente** (nivel 6): `gratis`. Manual del Jugador 2024. <!-- patron gran antiguo|combatiente clarividente -->
- [x] **Maleficio Sobrenatural** (nivel 10): `pasiva`. Manual del Jugador 2024. <!-- patron gran antiguo|maleficio sobrenatural -->
- [x] **Escudo Mental** (nivel 10): `pasiva`. antes "Escudo de Pensamiento"; Manual del Jugador 2024. <!-- patron gran antiguo|escudo mental -->
- [x] **Crear Siervo** (nivel 14): `pasiva`. antes "Crear Servidor"; PG temporales calculados; Manual del Jugador 2024. <!-- patron gran antiguo|crear siervo -->

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

Dudosos: 0. Con tipo claro: 0. Ya revisados: 44.


### Revisados

- [x] **Furia Elemental** (nivel 7): `pasiva`. Manual del Jugador (2024). <!-- druida|furia elemental -->
- [x] **Furia Elemental Mejorada** (nivel 15): `pasiva`. Manual del Jugador (2024). <!-- druida|furia elemental mejorada -->
- [x] **Conjuros de Bestia** (nivel 18): `pasiva`. Manual del Jugador (2024). <!-- druida|conjuros de bestia -->
- [x] **Archidruida** (nivel 20): `gratis`. Manual del Jugador (2024). <!-- druida|archidruida -->
- [x] **Conjuros del Círculo de la Tierra** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- circulo de la tierra|conjuros del circulo de la tierra -->
- [x] **Ayuda de la Tierra** (nivel 3): `accion`. Manual del Jugador (2024). <!-- circulo de la tierra|ayuda de la tierra -->
- [x] **Recuperación Natural** (nivel 6): `fuera`. Manual del Jugador (2024). <!-- circulo de la tierra|recuperacion natural -->
- [x] **Protección de la Naturaleza** (nivel 10): `pasiva`. Manual del Jugador (2024). <!-- circulo de la tierra|proteccion de la naturaleza -->
- [x] **Santuario de la Naturaleza** (nivel 14): `accion`. Manual del Jugador (2024). <!-- circulo de la tierra|santuario de la naturaleza -->
- [x] **Conjuros del Círculo de la Luna** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- circulo de la luna|conjuros del circulo de la luna -->
- [x] **Formas del Círculo** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- circulo de la luna|formas del circulo -->
- [x] **Formas del Círculo Mejoradas** (nivel 6): `pasiva`. Manual del Jugador (2024). <!-- circulo de la luna|formas del circulo mejoradas -->
- [x] **Paso de Luz Lunar** (nivel 10): `adicional`. Manual del Jugador (2024). <!-- circulo de la luna|paso de luz lunar -->
- [x] **Forma Lunar** (nivel 14): `pasiva`. Manual del Jugador (2024). <!-- circulo de la luna|forma lunar -->
- [x] **Conjuros del Círculo del Mar** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- circulo del mar|conjuros del circulo del mar -->
- [x] **Ira del Mar** (nivel 3): `adicional`. Manual del Jugador (2024). <!-- circulo del mar|ira del mar -->
- [x] **Afinidad Acuática** (nivel 6): `pasiva`. Manual del Jugador (2024). <!-- circulo del mar|afinidad acuatica -->
- [x] **Hijo de la Tormenta** (nivel 10): `pasiva`. Manual del Jugador (2024). <!-- circulo del mar|hijo de la tormenta -->
- [x] **Don Oceánico** (nivel 14): `pasiva`. Manual del Jugador (2024). <!-- circulo del mar|don oceanico -->
- [x] **Mapa Estelar** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- circulo de las estrellas|mapa estelar -->
- [x] **Forma Estelar** (nivel 3): `adicional`. Manual del Jugador (2024). <!-- circulo de las estrellas|forma estelar -->
- [x] **Augurio Cósmico** (nivel 6): `reaccion`. Manual del Jugador (2024). <!-- circulo de las estrellas|augurio cosmico -->
- [x] **Constelaciones Titilantes** (nivel 10): `pasiva`. Manual del Jugador (2024). <!-- circulo de las estrellas|constelaciones titilantes -->
- [x] **Lleno de Estrellas** (nivel 14): `pasiva`. Manual del Jugador (2024). <!-- circulo de las estrellas|lleno de estrellas -->
- [x] **Bálsamo de la Corte Estival** (nivel 3): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- circulo de los suenos|balsamo de la corte estival -->
- [x] **Hogar de Luz Lunar y Sombra** (nivel 6): `fuera`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- circulo de los suenos|hogar de luz lunar y sombra -->
- [x] **Senderos Ocultos** (nivel 10): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- circulo de los suenos|senderos ocultos -->
- [x] **Caminante de los Sueños** (nivel 14): `fuera`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- circulo de los suenos|caminante de los suenos -->
- [x] **Habla del Bosque** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- circulo del pastor|habla del bosque -->
- [x] **Tótem Espiritual** (nivel 3): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- circulo del pastor|totem espiritual -->
- [x] **Invocador Poderoso** (nivel 6): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- circulo del pastor|invocador poderoso -->
- [x] **Espíritu Guardián** (nivel 10): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- circulo del pastor|espiritu guardian -->
- [x] **Invocación Fiel** (nivel 14): `gratis`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- circulo del pastor|invocacion fiel -->
- [x] **Conjuros del Círculo de las Esporas** (nivel 3): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- circulo de las esporas|conjuros del circulo de las esporas -->
- [x] **Halo de Esporas** (nivel 3): `reaccion`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- circulo de las esporas|halo de esporas -->
- [x] **Entidad Simbiótica** (nivel 3): `accion`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- circulo de las esporas|entidad simbiotica -->
- [x] **Infestación Fúngica** (nivel 6): `reaccion`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- circulo de las esporas|infestacion fungica -->
- [x] **Esporas Esparcidas** (nivel 10): `adicional`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- circulo de las esporas|esporas esparcidas -->
- [x] **Cuerpo Fúngico** (nivel 14): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- circulo de las esporas|cuerpo fungico -->
- [x] **Conjuros del Círculo del Fuego Salvaje** (nivel 3): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- circulo del fuego salvaje|conjuros del circulo del fuego salvaje -->
- [x] **Invocar Espíritu de Fuego Salvaje** (nivel 3): `accion`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- circulo del fuego salvaje|invocar espiritu de fuego salvaje -->
- [x] **Vínculo Potenciado** (nivel 6): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- circulo del fuego salvaje|vinculo potenciado -->
- [x] **Llamas Cauterizantes** (nivel 10): `reaccion`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- circulo del fuego salvaje|llamas cauterizantes -->
- [x] **Resurgir Llameante** (nivel 14): `gratis`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- circulo del fuego salvaje|resurgir llameante -->

## Lote 10: Explorador (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 0. Con tipo claro: 0. Ya revisados: 62.


### Revisados

- [x] **Errante** (nivel 6): `pasiva`. Manual del Jugador (2024). <!-- explorador|errante -->
- [x] **Pericia** (nivel 9): `pasiva`. Manual del Jugador (2024). <!-- explorador|pericia -->
- [x] **Incansable** (nivel 10): `accion`. Manual del Jugador (2024). <!-- explorador|incansable -->
- [x] **Cazador Implacable** (nivel 13): `pasiva`. Manual del Jugador (2024). <!-- explorador|cazador implacable -->
- [x] **Velo de la Naturaleza** (nivel 14): `adicional`. Manual del Jugador (2024). <!-- explorador|velo de la naturaleza -->
- [x] **Cazador Preciso** (nivel 17): `pasiva`. Manual del Jugador (2024). <!-- explorador|cazador preciso -->
- [x] **Sentidos Salvajes** (nivel 18): `pasiva`. Manual del Jugador (2024). <!-- explorador|sentidos salvajes -->
- [x] **Cazador de Enemigos** (nivel 20): `pasiva`. Manual del Jugador (2024). <!-- explorador|cazador de enemigos -->
- [x] **Compañero Primigenio** (nivel 3): `adicional`. Manual del Jugador (2024). <!-- maestro de bestias|companero primigenio -->
- [x] **Entrenamiento Excepcional** (nivel 7): `pasiva`. Manual del Jugador (2024). <!-- maestro de bestias|entrenamiento excepcional -->
- [x] **Furia de Bestia** (nivel 11): `pasiva`. Manual del Jugador (2024). <!-- maestro de bestias|furia de bestia -->
- [x] **Compartir Conjuros** (nivel 15): `pasiva`. Manual del Jugador (2024). <!-- maestro de bestias|compartir conjuros -->
- [x] **Conjuros del Caminante de las Hadas** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- caminante de las hadas|conjuros del caminante de las hadas -->
- [x] **Golpes Pavorosos** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- caminante de las hadas|golpes pavorosos -->
- [x] **Glamour de Otro Mundo** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- caminante de las hadas|glamour de otro mundo -->
- [x] **Giro Engañoso** (nivel 7): `reaccion`. Manual del Jugador (2024). <!-- caminante de las hadas|giro enganoso -->
- [x] **Refuerzos Feéricos** (nivel 11): `pasiva`. Manual del Jugador (2024). <!-- caminante de las hadas|refuerzos feericos -->
- [x] **Caminante Nebuloso** (nivel 15): `adicional`. Manual del Jugador (2024). <!-- caminante de las hadas|caminante nebuloso -->
- [x] **Conjuros del Acechador de las Sombras** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- acechador de las sombras|conjuros del acechador de las sombras -->
- [x] **Emboscador Temible** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- acechador de las sombras|emboscador temible -->
- [x] **Vista Umbría** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- acechador de las sombras|vista umbria -->
- [x] **Mente de Hierro** (nivel 7): `pasiva`. Manual del Jugador (2024). <!-- acechador de las sombras|mente de hierro -->
- [x] **Ráfaga del Acechador** (nivel 11): `pasiva`. Manual del Jugador (2024). <!-- acechador de las sombras|rafaga del acechador -->
- [x] **Evasión Sombría** (nivel 15): `reaccion`. Manual del Jugador (2024). <!-- acechador de las sombras|evasion sombria -->
- [x] **Conjuros del Guardián Hueco** (nivel 3): `pasiva`. subclase nueva; Ravenloft: The Horrors Within (2026). <!-- guardian hueco|conjuros del guardian hueco -->
- [x] **Ira de lo Salvaje** (nivel 3): `adicional`. subclase nueva; Ravenloft: The Horrors Within (2026). <!-- guardian hueco|ira de lo salvaje -->
- [x] **Poder Hambriento** (nivel 7): `pasiva`. subclase nueva; Ravenloft: The Horrors Within (2026). <!-- guardian hueco|poder hambriento -->
- [x] **Putrefacción y Violencia** (nivel 11): `pasiva`. subclase nueva; Ravenloft: The Horrors Within (2026). <!-- guardian hueco|putrefaccion y violencia -->
- [x] **Poder Antiguo** (nivel 15): `pasiva`. subclase nueva; Ravenloft: The Horrors Within (2026). <!-- guardian hueco|poder antiguo -->
- [x] **Presa del Cazador** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- cazador|presa del cazador -->
- [x] **Saber del Cazador** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- cazador|saber del cazador -->
- [x] **Tácticas Defensivas** (nivel 7): `pasiva`. Manual del Jugador (2024). <!-- cazador|tacticas defensivas -->
- [x] **Presa del Cazador Superior** (nivel 11): `pasiva`. Manual del Jugador (2024). <!-- cazador|presa del cazador superior -->
- [x] **Defensa Superior del Cazador** (nivel 15): `reaccion`. Manual del Jugador (2024). <!-- cazador|defensa superior del cazador -->
- [x] **Conjuros del Caminante del Invierno** (nivel 3): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- caminante del invierno|conjuros del caminante del invierno -->
- [x] **Explorador Gélido** (nivel 3): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- caminante del invierno|explorador gelido -->
- [x] **Escarcha del Cazador** (nivel 3): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- caminante del invierno|escarcha del cazador -->
- [x] **Alma Fortalecedora** (nivel 7): `accion`. Forgotten Realms: Heroes of Faerûn (2025). <!-- caminante del invierno|alma fortalecedora -->
- [x] **Retribución Helada** (nivel 11): `reaccion`. Forgotten Realms: Heroes of Faerûn (2025). <!-- caminante del invierno|retribucion helada -->
- [x] **Aparición Congelada** (nivel 15): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- caminante del invierno|aparicion congelada -->
- [x] **Don Dracónico** (nivel 3): `pasiva`. subclase nueva; Fizban's Treasury of Dragons (2021). <!-- guardian draconico|don draconico -->
- [x] **Compañero Dracónico** (nivel 3): `accion`. subclase nueva; Fizban's Treasury of Dragons (2021). <!-- guardian draconico|companero draconico -->
- [x] **Vínculo de Colmillo y Escama** (nivel 7): `pasiva`. subclase nueva; Fizban's Treasury of Dragons (2021). <!-- guardian draconico|vinculo de colmillo y escama -->
- [x] **Aliento del Draco** (nivel 11): `accion`. subclase nueva; Fizban's Treasury of Dragons (2021). <!-- guardian draconico|aliento del draco -->
- [x] **Vínculo Perfecto** (nivel 15): `reaccion`. subclase nueva; Fizban's Treasury of Dragons (2021). <!-- guardian draconico|vinculo perfecto -->
- [x] **Conjuros del Caminante del Horizonte** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- caminante del horizonte|conjuros del caminante del horizonte -->
- [x] **Detectar Portal** (nivel 3): `accion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- caminante del horizonte|detectar portal -->
- [x] **Guerrero Planar** (nivel 3): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- caminante del horizonte|guerrero planar -->
- [x] **Paso Etéreo** (nivel 7): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- caminante del horizonte|paso etereo -->
- [x] **Golpe Distante** (nivel 11): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- caminante del horizonte|golpe distante -->
- [x] **Defensa Espectral** (nivel 15): `reaccion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- caminante del horizonte|defensa espectral -->
- [x] **Conjuros del Cazador de Monstruos** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- cazador de monstruos|conjuros del cazador de monstruos -->
- [x] **Sentido del Cazador** (nivel 3): `accion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- cazador de monstruos|sentido del cazador -->
- [x] **Presa del Cazador** (nivel 3): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- cazador de monstruos|presa del cazador -->
- [x] **Defensa Sobrenatural** (nivel 7): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- cazador de monstruos|defensa sobrenatural -->
- [x] **Némesis de los Lanzadores** (nivel 11): `reaccion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- cazador de monstruos|nemesis de los lanzadores -->
- [x] **Contraataque del Cazador** (nivel 15): `reaccion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- cazador de monstruos|contraataque del cazador -->
- [x] **Conjuros del Guardián del Enjambre** (nivel 3): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- guardian del enjambre|conjuros del guardian del enjambre -->
- [x] **Enjambre Reunido** (nivel 3): `gratis`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- guardian del enjambre|enjambre reunido -->
- [x] **Marea Retorcida** (nivel 7): `adicional`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- guardian del enjambre|marea retorcida -->
- [x] **Enjambre Poderoso** (nivel 11): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- guardian del enjambre|enjambre poderoso -->
- [x] **Dispersión del Enjambre** (nivel 15): `reaccion`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- guardian del enjambre|dispersion del enjambre -->

## Lote 11: Guerrero (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 0. Con tipo claro: 0. Ya revisados: 46.


### Revisados

- [x] **Indomable** (nivel 9): `gratis`. Manual del Jugador (2024). <!-- guerrero|indomable -->
- [x] **Maestro Táctico** (nivel 9): `pasiva`. Manual del Jugador (2024). <!-- guerrero|maestro tactico -->
- [x] **Dos Ataques Extras** (nivel 11): `pasiva`. Manual del Jugador (2024). <!-- guerrero|dos ataques extras -->
- [x] **Ataques Estudiados** (nivel 13): `pasiva`. Manual del Jugador (2024). <!-- guerrero|ataques estudiados -->
- [x] **Oleada de Acción (Dos Usos)** (nivel 17): `gratis`. Manual del Jugador (2024). <!-- guerrero|oleada de accion (dos usos) -->
- [x] **Tres Ataques Extras** (nivel 20): `pasiva`. Manual del Jugador (2024). <!-- guerrero|tres ataques extras -->
- [x] **Saber del Arquero Arcano** (nivel 3): `pasiva`. subclase nueva; Arcana Unleashed (2026). <!-- arquero arcano|saber del arquero arcano -->
- [x] **Disparo Arcano** (nivel 3): `gratis`. subclase nueva; Arcana Unleashed (2026). <!-- arquero arcano|disparo arcano -->
- [x] **Disparo Curvo** (nivel 7): `adicional`. subclase nueva; Arcana Unleashed (2026). <!-- arquero arcano|disparo curvo -->
- [x] **Munición Mágica** (nivel 7): `accion`. subclase nueva; Arcana Unleashed (2026). <!-- arquero arcano|municion magica -->
- [x] **Disparo Siempre Listo** (nivel 10): `pasiva`. subclase nueva; Arcana Unleashed (2026). <!-- arquero arcano|disparo siempre listo -->
- [x] **Teletransporte Indomable** (nivel 15): `pasiva`. subclase nueva; Arcana Unleashed (2026). <!-- arquero arcano|teletransporte indomable -->
- [x] **Tirador Magistral** (nivel 18): `reaccion`. subclase nueva; Arcana Unleashed (2026). <!-- arquero arcano|tirador magistral -->
- [x] **Enviado Caballeresco** (nivel 3): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- abanderado|enviado caballeresco -->
- [x] **Recuperación Grupal** (nivel 3): `gratis`. Forgotten Realms: Heroes of Faerûn (2025). <!-- abanderado|recuperacion grupal -->
- [x] **Tácticas de Equipo** (nivel 7): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- abanderado|tacticas de equipo -->
- [x] **Oleada Inspiradora** (nivel 10): `gratis`. Forgotten Realms: Heroes of Faerûn (2025). <!-- abanderado|oleada inspiradora -->
- [x] **Resistencia Compartida** (nivel 15): `reaccion`. Forgotten Realms: Heroes of Faerûn (2025). <!-- abanderado|resistencia compartida -->
- [x] **Comandante Inspirador** (nivel 18): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- abanderado|comandante inspirador -->
- [x] **Superioridad en Combate** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- maestro de batalla|superioridad en combate -->
- [x] **Estudiante de la Guerra** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- maestro de batalla|estudiante de la guerra -->
- [x] **Conoce a tu Enemigo** (nivel 7): `adicional`. Manual del Jugador (2024). <!-- maestro de batalla|conoce a tu enemigo -->
- [x] **Superioridad en Combate Mejorada** (nivel 10): `pasiva`. Manual del Jugador (2024). <!-- maestro de batalla|superioridad en combate mejorada -->
- [x] **Implacable** (nivel 15): `pasiva`. Manual del Jugador (2024). <!-- maestro de batalla|implacable -->
- [x] **Superioridad en Combate Definitiva** (nivel 18): `pasiva`. Manual del Jugador (2024). <!-- maestro de batalla|superioridad en combate definitiva -->
- [x] **Crítico Mejorado** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- campeon|critico mejorado -->
- [x] **Atleta Notable** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- campeon|atleta notable -->
- [x] **Estilo de Combate Adicional** (nivel 7): `pasiva`. Manual del Jugador (2024). <!-- campeon|estilo de combate adicional -->
- [x] **Guerrero Heroico** (nivel 10): `pasiva`. Manual del Jugador (2024). <!-- campeon|guerrero heroico -->
- [x] **Crítico Superior** (nivel 15): `pasiva`. Manual del Jugador (2024). <!-- campeon|critico superior -->
- [x] **Superviviente** (nivel 18): `pasiva`. Manual del Jugador (2024). <!-- campeon|superviviente -->
- [x] **Lanzamiento de Conjuros** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- caballero arcano|lanzamiento de conjuros -->
- [x] **Vínculo de Guerra** (nivel 3): `fuera`. Manual del Jugador (2024). <!-- caballero arcano|vinculo de guerra -->
- [x] **Magia de Guerra** (nivel 7): `pasiva`. Manual del Jugador (2024). <!-- caballero arcano|magia de guerra -->
- [x] **Golpe Sobrenatural** (nivel 10): `pasiva`. Manual del Jugador (2024). <!-- caballero arcano|golpe sobrenatural -->
- [x] **Carga Arcana** (nivel 15): `pasiva`. Manual del Jugador (2024). <!-- caballero arcano|carga arcana -->
- [x] **Magia de Guerra Mejorada** (nivel 18): `pasiva`. Manual del Jugador (2024). <!-- caballero arcano|magia de guerra mejorada -->
- [x] **Poder Psiónico** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- guerrero psionico|poder psionico -->
- [x] **Campo Protector** (nivel 3): `reaccion`. Manual del Jugador (2024). <!-- guerrero psionico|campo protector -->
- [x] **Golpe Psiónico** (nivel 3): `gratis`. Manual del Jugador (2024). <!-- guerrero psionico|golpe psionico -->
- [x] **Movimiento Telequinético** (nivel 3): `accion`. Manual del Jugador (2024). <!-- guerrero psionico|movimiento telequinetico -->
- [x] **Salto Potenciado por Psi** (nivel 7): `adicional`. Manual del Jugador (2024). <!-- guerrero psionico|salto potenciado por psi -->
- [x] **Empujón Telequinético** (nivel 7): `gratis`. Manual del Jugador (2024). <!-- guerrero psionico|empujon telequinetico -->
- [x] **Mente Protegida** (nivel 10): `pasiva`. Manual del Jugador (2024). <!-- guerrero psionico|mente protegida -->
- [x] **Baluarte de Fuerza** (nivel 15): `adicional`. Manual del Jugador (2024). <!-- guerrero psionico|baluarte de fuerza -->
- [x] **Maestro de la Telequinesis** (nivel 18): `pasiva`. Manual del Jugador (2024). <!-- guerrero psionico|maestro de la telequinesis -->

## Lote 12: Hechicero (subclases y rasgos de nivel alto de la biblioteca)

Respuesta de Gemini revisada el 2026-09-25. Versiones: Manual del Jugador 2024 (clase, Dracónica, Magia Salvaje, Aberrante y Reloj), Ravenloft: The Horrors Within 2026 (Sombras), Heroes of Faerûn 2025 (Fuego de Conjuro); Alma Divina y Tormenta (Xanathar 2017) y Lunar (Dragonlance 2022) no tienen versión 2024 y se agregan con sus rasgos de nivel 1 pasados al 3.

- [x] **Corregido de la respuesta**: la clave de las Sombras (`hechiceria-sombras`); el libro de cada subclase; Recado e Indetectable (Gemini no los encontró en la app); Invocar bestia sí está. El texto oficial no traía los rasgos de nivel 1 de Alma Divina, Tormenta y Lunar: se escribieron a mano (Magia Divina y Favorecido por los Dioses; Hablante del Viento y Magia Tempestuosa; Encarnación Lunar, Conjuros Lunares y Fuego Lunar).
- [x] **Aberrante y Reloj**: la biblioteca tenía la versión de Tasha (Defensa Psíquica en el 14, Transformación Reveladora en el 18); quedan con la de 2024 (Defensas Psíquicas en el 6, Revelación Carnal en el 14, Implosión Deformadora en el 18) y sus conjuros siempre preparados.
- [x] **Sombras**: la biblioteca tenía la de Van Richten (Ojos de la Oscuridad, Vitalidad de Sombra, Sabueso); queda la de 2026 (Poder de las Sombras, Bestias de Mal Agüero con Invocar bestia, Paso Sombrío, Forma Umbría).
- [x] **Dracónica (integrada)**: sus conjuros llegan hasta el nivel 9 (Ojo arcano y Hechizar monstruo en el 7; Conocer las leyendas e Invocar dragón en el 9). Alas de Dragón dura 1 hora (1 uso o 3 puntos) y Compañero Dragón reemplaza a Presencia Dracónica.
- [x] **Metamagia**: selector con las 10 opciones de 2024; 2, 4 y 6 opciones en los niveles 2, 10 y 17.
- [x] **Hechicería Lunar**: la tabla de conjuros por fase y los rasgos de nivel 1 de Alma Divina, Tormenta y Lunar se confirmaron con el texto oficial (Dragonlance 2022 y Xanathar 2017). El encargo no los traía porque las copias adaptadas a la clase 2024 no tienen texto propio; `scripts/gemini/oficial.ts` ya toma el del original.

### Hechicero

- [x] **Hechicería Encarnada** (nivel 7): `gratis`. Manual del Jugador (2024). <!-- hechicero|hechiceria encarnada -->
- [x] **Apoteosis Arcana** (nivel 20): `pasiva`. Manual del Jugador (2024). <!-- hechicero|apoteosis arcana -->
- [x] **Metamagia adicional** (nivel 17): `pasiva`. Manual del Jugador (2024). <!-- hechicero|metamagia adicional -->

### Hechicería Dracónica

- [x] **Afinidad Elemental** (nivel 6): `pasiva`. Manual del Jugador (2024). <!-- hechiceria draconica|afinidad elemental -->
- [x] **Alas de Dragón** (nivel 14): `adicional`. Manual del Jugador (2024). <!-- hechiceria draconica|alas de dragon -->
- [x] **Compañero Dragón** (nivel 18): `pasiva`. Manual del Jugador (2024). <!-- hechiceria draconica|companero dragon -->

### Magia Salvaje

- [x] **Caos Controlado** (nivel 14): `pasiva`. Manual del Jugador (2024). <!-- magia salvaje|caos controlado -->
- [x] **Doblegar la Suerte** (nivel 6): `reaccion`. Manual del Jugador (2024). <!-- magia salvaje|doblegar la suerte -->
- [x] **Oleada Domada** (nivel 18): `pasiva`. Manual del Jugador (2024). <!-- magia salvaje|oleada domada -->

### Hechicería Aberrante

- [x] **Habla Telepática** (nivel 3): `adicional`. Manual del Jugador (2024). <!-- hechiceria aberrante|habla telepatica -->
- [x] **Hechicería Psiónica** (nivel 6): `pasiva`. Manual del Jugador (2024). <!-- hechiceria aberrante|hechiceria psionica -->
- [x] **Conjuros Psiónicos** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- hechiceria aberrante|conjuros psionicos -->
- [x] **Defensas Psíquicas** (nivel 6): `pasiva`. Manual del Jugador (2024). <!-- hechiceria aberrante|defensas psiquicas -->
- [x] **Revelación Carnal** (nivel 14): `adicional`. Manual del Jugador (2024). <!-- hechiceria aberrante|revelacion carnal -->
- [x] **Implosión Deformadora** (nivel 18): `accion`. Manual del Jugador (2024). <!-- hechiceria aberrante|implosion deformadora -->

### Hechicería del Reloj (antes Alma del Reloj)

- [x] **Conjuros del Reloj** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- hechiceria del reloj|conjuros del reloj -->
- [x] **Restaurar el Equilibrio** (nivel 3): `reaccion`. Manual del Jugador (2024). <!-- hechiceria del reloj|restaurar el equilibrio -->
- [x] **Baluarte de la Ley** (nivel 6): `accion`. Manual del Jugador (2024). <!-- hechiceria del reloj|baluarte de la ley -->
- [x] **Trance de Orden** (nivel 14): `adicional`. Manual del Jugador (2024). <!-- hechiceria del reloj|trance de orden -->
- [x] **Cavatina del Reloj** (nivel 18): `accion`. Manual del Jugador (2024). <!-- hechiceria del reloj|cavatina del reloj -->

### Alma Divina

- [x] **Magia Divina** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- alma divina|magia divina -->
- [x] **Favorecido por los Dioses** (nivel 3): `gratis`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- alma divina|favorecido por los dioses -->
- [x] **Curación Potenciada** (nivel 6): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- alma divina|curacion potenciada -->
- [x] **Alas de Otro Mundo** (nivel 14): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- alma divina|alas de otro mundo -->
- [x] **Recuperación Sobrenatural** (nivel 18): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- alma divina|recuperacion sobrenatural -->

### Hechicería Lunar

- [x] **Encarnación Lunar** (nivel 3): `fuera`. subclase nueva; Dragonlance: Shadow of the Dragon Queen (2022). <!-- hechiceria lunar|encarnacion lunar -->
- [x] **Conjuros Lunares** (nivel 3): `pasiva`. subclase nueva; Dragonlance: Shadow of the Dragon Queen (2022). <!-- hechiceria lunar|conjuros lunares -->
- [x] **Fuego Lunar** (nivel 3): `pasiva`. subclase nueva; Dragonlance: Shadow of the Dragon Queen (2022). <!-- hechiceria lunar|fuego lunar -->
- [x] **Favores Lunares** (nivel 6): `pasiva`. subclase nueva; Dragonlance: Shadow of the Dragon Queen (2022). <!-- hechiceria lunar|favores lunares -->
- [x] **Fases Menguantes** (nivel 6): `adicional`. subclase nueva; Dragonlance: Shadow of the Dragon Queen (2022). <!-- hechiceria lunar|fases menguantes -->
- [x] **Empoderamiento Lunar** (nivel 14): `pasiva`. subclase nueva; Dragonlance: Shadow of the Dragon Queen (2022). <!-- hechiceria lunar|empoderamiento lunar -->
- [x] **Fenómeno Lunar** (nivel 18): `adicional`. subclase nueva; Dragonlance: Shadow of the Dragon Queen (2022). <!-- hechiceria lunar|fenomeno lunar -->

### Hechicería de las Sombras

- [x] **Conjuros de las Sombras** (nivel 3): `pasiva`. Ravenloft: The Horrors Within (2026). <!-- hechiceria de las sombras|conjuros de las sombras -->
- [x] **Poder de las Sombras** (nivel 3): `pasiva`. Ravenloft: The Horrors Within (2026). <!-- hechiceria de las sombras|poder de las sombras -->
- [x] **Bestias de Mal Agüero** (nivel 6): `adicional`. Ravenloft: The Horrors Within (2026). <!-- hechiceria de las sombras|bestias de mal aguero -->
- [x] **Paso Sombrío** (nivel 14): `adicional`. Ravenloft: The Horrors Within (2026). <!-- hechiceria de las sombras|paso sombrio -->
- [x] **Forma Umbría** (nivel 18): `pasiva`. Ravenloft: The Horrors Within (2026). <!-- hechiceria de las sombras|forma umbria -->

### Fuego de Conjuro

- [x] **Conjuros de Fuego de Conjuro** (nivel 3): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- fuego de conjuro|conjuros de fuego de conjuro -->
- [x] **Estallido de Fuego de Conjuro** (nivel 3): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- fuego de conjuro|estallido de fuego de conjuro -->
- [x] **Absorber Conjuros** (nivel 6): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- fuego de conjuro|absorber conjuros -->
- [x] **Fuego de Conjuro Perfeccionado** (nivel 14): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- fuego de conjuro|fuego de conjuro perfeccionado -->
- [x] **Corona de Fuego de Conjuro** (nivel 18): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- fuego de conjuro|corona de fuego de conjuro -->

### Hechicería de la Tormenta

- [x] **Hablante del Viento** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- hechiceria de la tormenta|hablante del viento -->
- [x] **Magia Tempestuosa** (nivel 3): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- hechiceria de la tormenta|magia tempestuosa -->
- [x] **Corazón de la Tormenta** (nivel 6): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- hechiceria de la tormenta|corazon de la tormenta -->
- [x] **Guía de la Tormenta** (nivel 6): `accion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- hechiceria de la tormenta|guia de la tormenta -->
- [x] **Furia de la Tormenta** (nivel 14): `reaccion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- hechiceria de la tormenta|furia de la tormenta -->
- [x] **Alma del Viento** (nivel 18): `accion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- hechiceria de la tormenta|alma del viento -->

## Lote 13: Mago (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 0. Con tipo claro: 0. Ya revisados: 71.

Respuesta de Gemini revisada el 2026-09-25. Versiones: Manual del Jugador 2024 (clase, Abjurador, Adivino, Evocador, Ilusionista), Arcana Unleashed 2026 (Conjurador, Encantador, Nigromante, Transmutador), Heroes of Faerûn 2025 (Cantor de la Hoja); Cronurgia y Graviturgia (Explorer's Guide to Wildemount 2020), Orden de Escribas (Tasha 2020) y Magia de Guerra (Xanathar 2017) no tienen versión 2024 y se agregan con sus rasgos de nivel 2 pasados al 3.

- [x] **Corregido de la respuesta**: Gemini no puso los rasgos de nivel 2 de las cuatro subclases antiguas (Cambio Crónico y Conciencia Temporal; Ajustar Densidad; Pluma de Mago y Libro de Conjuros Despierto; Desvío Arcano e Ingenio Táctico): se escribieron a mano con el texto oficial. El libro de cada subclase iba por nombre y no por clave. Invocar bestia e Invocar feérico sí están en la app.
- [x] **Nombres**: las escuelas pasan a llamarse como en 2024 (Abjurador, Adivino, Evocador, Ilusionista, Conjurador, Encantador, Nigromante, Transmutador); la clave de cada una no cambia, así que los personajes que ya las tenían las conservan.
- [x] **Escuelas de 2014 que tenía la biblioteca**: Conjuración, Encantamiento, Necromancia y Transmutación eran la versión de 2014 (Conjuración Menor, Mirada Hipnótica, Cosecha Mortal, Alquimia Menor); quedan con la de Arcana Unleashed. Evocación e Ilusión quedan con el orden de 2024 (Truco Potente en el 3 y Esculpir Conjuros en el 6; Criaturas Fantasmales reemplaza a Ilusiones Maleables).
- [x] **A mano (reglas-revisadas.ts)**: PG de la Capa Arcana, CA del Canto de la Hoja, iniciativa de Conciencia Temporal e Ingenio Táctico, daño de Evocación Potenciada, Siervos Muertos Vivientes, Amo de la Muerte y Manto Desviador con el número ya calculado.

### Revisados

- [x] **Dominio de Conjuros** (nivel 18): `pasiva`. Manual del Jugador (2024). <!-- mago|dominio de conjuros -->
- [x] **Conjuros de Firma** (nivel 20): `pasiva`. Manual del Jugador (2024). <!-- mago|conjuros de firma -->
- [x] **Erudito de la Abjuración** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- abjurador|erudito de la abjuracion -->
- [x] **Capa Arcana** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- abjurador|capa arcana -->
- [x] **Capa Proyectada** (nivel 6): `reaccion`. Manual del Jugador (2024). <!-- abjurador|capa proyectada -->
- [x] **Rompeconjuros** (nivel 10): `adicional`. Manual del Jugador (2024). <!-- abjurador|rompeconjuros -->
- [x] **Resistencia a Conjuros** (nivel 14): `pasiva`. Manual del Jugador (2024). <!-- abjurador|resistencia a conjuros -->
- [x] **Canto de la Hoja** (nivel 3): `adicional`. Forgotten Realms: Heroes of Faerûn (2025). <!-- cantor de la hoja|canto de la hoja -->
- [x] **Formación en Guerra y Canto** (nivel 3): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- cantor de la hoja|formacion en guerra y canto -->
- [x] **Ataque Extra** (nivel 6): `accion`. Forgotten Realms: Heroes of Faerûn (2025). <!-- cantor de la hoja|ataque extra -->
- [x] **Canción de Defensa** (nivel 10): `reaccion`. Forgotten Realms: Heroes of Faerûn (2025). <!-- cantor de la hoja|cancion de defensa -->
- [x] **Canción de Victoria** (nivel 14): `adicional`. Forgotten Realms: Heroes of Faerûn (2025). <!-- cantor de la hoja|cancion de victoria -->
- [x] **Erudito de la Conjuración** (nivel 3): `pasiva`. Arcana Unleashed (2026). <!-- conjurador|erudito de la conjuracion -->
- [x] **Transposición Benigna** (nivel 3): `adicional`. Arcana Unleashed (2026). <!-- conjurador|transposicion benigna -->
- [x] **Transposición Distante** (nivel 6): `pasiva`. Arcana Unleashed (2026). <!-- conjurador|transposicion distante -->
- [x] **Invocaciones Duraderas** (nivel 6): `pasiva`. Arcana Unleashed (2026). <!-- conjurador|invocaciones duraderas -->
- [x] **Conjuración Concentrada** (nivel 10): `pasiva`. Arcana Unleashed (2026). <!-- conjurador|conjuracion concentrada -->
- [x] **Invocación Astillada** (nivel 14): `pasiva`. Arcana Unleashed (2026). <!-- conjurador|invocacion astillada -->
- [x] **Erudito de la Adivinación** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- adivino|erudito de la adivinacion -->
- [x] **Portento** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- adivino|portento -->
- [x] **Adivino Experto** (nivel 6): `pasiva`. Manual del Jugador (2024). <!-- adivino|adivino experto -->
- [x] **El Tercer Ojo** (nivel 10): `adicional`. Manual del Jugador (2024). <!-- adivino|el tercer ojo -->
- [x] **Portento Mayor** (nivel 14): `pasiva`. Manual del Jugador (2024). <!-- adivino|portento mayor -->
- [x] **Erudito del Encantamiento** (nivel 3): `pasiva`. Arcana Unleashed (2026). <!-- encantador|erudito del encantamiento -->
- [x] **Conversador Encantador** (nivel 3): `pasiva`. Arcana Unleashed (2026). <!-- encantador|conversador encantador -->
- [x] **Presencia Hipnótica** (nivel 3): `accion`. Arcana Unleashed (2026). <!-- encantador|presencia hipnotica -->
- [x] **Encantamiento Dividido** (nivel 6): `pasiva`. Arcana Unleashed (2026). <!-- encantador|encantamiento dividido -->
- [x] **Encanto Instintivo** (nivel 10): `reaccion`. Arcana Unleashed (2026). <!-- encantador|encanto instintivo -->
- [x] **Alterar Recuerdos** (nivel 14): `accion`. Arcana Unleashed (2026). <!-- encantador|alterar recuerdos -->
- [x] **Erudito de la Evocación** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- evocador|erudito de la evocacion -->
- [x] **Truco Potente** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- evocador|truco potente -->
- [x] **Esculpir Conjuros** (nivel 6): `pasiva`. Manual del Jugador (2024). <!-- evocador|esculpir conjuros -->
- [x] **Evocación Potenciada** (nivel 10): `pasiva`. Manual del Jugador (2024). <!-- evocador|evocacion potenciada -->
- [x] **Sobrecarga** (nivel 14): `pasiva`. Manual del Jugador (2024). <!-- evocador|sobrecarga -->
- [x] **Erudito de la Ilusión** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- ilusionista|erudito de la ilusion -->
- [x] **Ilusiones Mejoradas** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- ilusionista|ilusiones mejoradas -->
- [x] **Criaturas Fantasmales** (nivel 6): `pasiva`. Manual del Jugador (2024). <!-- ilusionista|criaturas fantasmales -->
- [x] **Yo Ilusorio** (nivel 10): `reaccion`. Manual del Jugador (2024). <!-- ilusionista|yo ilusorio -->
- [x] **Realidad Ilusoria** (nivel 14): `adicional`. Manual del Jugador (2024). <!-- ilusionista|realidad ilusoria -->
- [x] **Erudito de la Necromancia** (nivel 3): `pasiva`. Arcana Unleashed (2026). <!-- nigromante|erudito de la necromancia -->
- [x] **Libro de Necromancia** (nivel 3): `pasiva`. Arcana Unleashed (2026). <!-- nigromante|libro de necromancia -->
- [x] **Poder de la Tumba** (nivel 6): `pasiva`. Arcana Unleashed (2026). <!-- nigromante|poder de la tumba -->
- [x] **Siervos Muertos Vivientes** (nivel 6): `pasiva`. Arcana Unleashed (2026). <!-- nigromante|siervos muertos vivientes -->
- [x] **Cosechar a los Muertos** (nivel 10): `reaccion`. Arcana Unleashed (2026). <!-- nigromante|cosechar a los muertos -->
- [x] **Amo de la Muerte** (nivel 14): `adicional`. Arcana Unleashed (2026). <!-- nigromante|amo de la muerte -->
- [x] **Erudito de la Transmutación** (nivel 3): `pasiva`. Arcana Unleashed (2026). <!-- transmutador|erudito de la transmutacion -->
- [x] **Piedra del Transmutador** (nivel 3): `pasiva`. Arcana Unleashed (2026). <!-- transmutador|piedra del transmutador -->
- [x] **Alteración Maravillosa** (nivel 3): `pasiva`. Arcana Unleashed (2026). <!-- transmutador|alteracion maravillosa -->
- [x] **Transmutación Potenciada** (nivel 6): `pasiva`. Arcana Unleashed (2026). <!-- transmutador|transmutacion potenciada -->
- [x] **Piedra Potente** (nivel 10): `pasiva`. Arcana Unleashed (2026). <!-- transmutador|piedra potente -->
- [x] **Cambiaformas** (nivel 10): `pasiva`. Arcana Unleashed (2026). <!-- transmutador|cambiaformas -->
- [x] **Maestro Transmutador** (nivel 14): `accion`. Arcana Unleashed (2026). <!-- transmutador|maestro transmutador -->
- [x] **Cambio Crónico** (nivel 3): `reaccion`. Explorer's Guide to Wildemount (2020). <!-- magia de cronurgia|cambio cronico -->
- [x] **Conciencia Temporal** (nivel 3): `pasiva`. Explorer's Guide to Wildemount (2020). <!-- magia de cronurgia|conciencia temporal -->
- [x] **Estasis Momentánea** (nivel 6): `accion`. Explorer's Guide to Wildemount (2020). <!-- magia de cronurgia|estasis momentanea -->
- [x] **Suspensión Arcana** (nivel 10): `pasiva`. Explorer's Guide to Wildemount (2020). <!-- magia de cronurgia|suspension arcana -->
- [x] **Futuro Convergente** (nivel 14): `reaccion`. Explorer's Guide to Wildemount (2020). <!-- magia de cronurgia|futuro convergente -->
- [x] **Ajustar Densidad** (nivel 3): `accion`. Explorer's Guide to Wildemount (2020). <!-- magia de graviturgia|ajustar densidad -->
- [x] **Pozo Gravitatorio** (nivel 6): `pasiva`. Explorer's Guide to Wildemount (2020). <!-- magia de graviturgia|pozo gravitatorio -->
- [x] **Atracción Violenta** (nivel 10): `reaccion`. Explorer's Guide to Wildemount (2020). <!-- magia de graviturgia|atraccion violenta -->
- [x] **Horizonte de Sucesos** (nivel 14): `accion`. Explorer's Guide to Wildemount (2020). <!-- magia de graviturgia|horizonte de sucesos -->
- [x] **Pluma de Mago** (nivel 3): `adicional`. Tasha's Cauldron of Everything (2020). <!-- orden de escribas|pluma de mago -->
- [x] **Libro de Conjuros Despierto** (nivel 3): `pasiva`. Tasha's Cauldron of Everything (2020). <!-- orden de escribas|libro de conjuros despierto -->
- [x] **Mente Manifiesta** (nivel 6): `adicional`. Tasha's Cauldron of Everything (2020). <!-- orden de escribas|mente manifiesta -->
- [x] **Maestro Copista** (nivel 10): `fuera`. Tasha's Cauldron of Everything (2020). <!-- orden de escribas|maestro copista -->
- [x] **Uno con la Palabra** (nivel 14): `pasiva`. Tasha's Cauldron of Everything (2020). <!-- orden de escribas|uno con la palabra -->
- [x] **Desvío Arcano** (nivel 3): `reaccion`. Xanathar's Guide to Everything (2017). <!-- magia de guerra|desvio arcano -->
- [x] **Ingenio Táctico** (nivel 3): `pasiva`. Xanathar's Guide to Everything (2017). <!-- magia de guerra|ingenio tactico -->
- [x] **Oleada de Poder** (nivel 6): `pasiva`. Xanathar's Guide to Everything (2017). <!-- magia de guerra|oleada de poder -->
- [x] **Magia Duradera** (nivel 10): `pasiva`. Xanathar's Guide to Everything (2017). <!-- magia de guerra|magia duradera -->
- [x] **Manto Desviador** (nivel 14): `pasiva`. Xanathar's Guide to Everything (2017). <!-- magia de guerra|manto desviador -->

## Lote 14: Monje (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 0. Con tipo claro: 0. Ya revisados: 56.

Respuesta de Gemini revisada el 2026-09-25. Versiones: Manual del Jugador 2024 (clase, Misericordia, Sombra, Elementos y Mano Abierta), Arcana Unleashed 2026 (Artes Místicas, nueva). Los Elementos de 2024 reemplazan al Camino de los Cuatro Elementos; Dragón Ascendente (Fizban 2021), Yo Astral (Tasha 2020), Maestro Borracho, Kensei y Alma Solar (Xanathar 2017) y Larga Muerte (Sword Coast 2015) no tienen versión 2024: se agregaron con su texto original (5etools) escrito a mano, con el ki pasado a Puntos de Enfoque; todos sus rasgos ya empezaban en el nivel 3. El Guerrero de la Embriaguez (nueva versión del Maestro Borracho) es solo Unearthed Arcana de noviembre de 2025, no un libro.

- [x] **Corregido de la respuesta**: los libros de C con clave; Elementalismo sí está en la app; Sintonía Elemental (la salvación de FUE es solo si cambias el tipo de daño), Conjuros y Enfoque Místico de las Artes Místicas (preparados, foco, tabla de coste para recuperar espacios) y la duración de Manto de Sombras. Se quitaron Paso de Sombra e Integridad del Cuerpo de nivel 6 porque ya los trae la subclase integrada.
- [x] **La biblioteca difería**: rasgos altos de 2014 (Disciplina Perfecta, Alma Diamantina, Desafiar a la Muerte, Tranquilidad, Oportunista) y Misericordia y Elementos resumidos en una línea; ahora siguen 2024.
- [x] **Cuerpo y Mente**: +4 a DES y SAB (máximo 25) en el nivel 20, calculado.
- [x] **Sintonía Elemental**: el golpe sin armas elemental sale en Ataques (tipo a elegir al acertar, CD de FUE para moverlo y +1 dado de Artes Marciales del Epítome desde el nivel 17).
- [x] **Artes Místicas**: lanza conjuros de hechicero con SAB, con los espacios de un tercio de lanzador (los mismos que Caballero Arcano y Embaucador Arcano, que ahora también los tienen), trucos 2/3 y preparados de la tabla.

### Revisados

- [x] **Evasión** (nivel 7): `pasiva`. Manual del Jugador (2024). <!-- monje|evasion -->
- [x] **Movimiento Acrobático** (nivel 9): `pasiva`. Manual del Jugador (2024). <!-- monje|movimiento acrobatico -->
- [x] **Enfoque Elevado** (nivel 10): `pasiva`. Manual del Jugador (2024). <!-- monje|enfoque elevado -->
- [x] **Autorestauración** (nivel 10): `gratis`. Manual del Jugador (2024). <!-- monje|autorestauracion -->
- [x] **Desviar Energía** (nivel 13): `pasiva`. Manual del Jugador (2024). <!-- monje|desviar energia -->
- [x] **Superviviente Disciplinado** (nivel 14): `pasiva`. Manual del Jugador (2024). <!-- monje|superviviente disciplinado -->
- [x] **Enfoque Perfecto** (nivel 15): `pasiva`. Manual del Jugador (2024). <!-- monje|enfoque perfecto -->
- [x] **Defensa Superior** (nivel 18): `gratis`. Manual del Jugador (2024). <!-- monje|defensa superior -->
- [x] **Cuerpo y Mente** (nivel 20): `pasiva`. Manual del Jugador (2024). <!-- monje|cuerpo y mente -->
- [x] **Implementos de Misericordia** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- guerrero de la misericordia|implementos de misericordia -->
- [x] **Mano de Daño** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- guerrero de la misericordia|mano de dano -->
- [x] **Mano de Curación** (nivel 3): `accion`. Manual del Jugador (2024). <!-- guerrero de la misericordia|mano de curacion -->
- [x] **Toque del Médico** (nivel 6): `pasiva`. Manual del Jugador (2024). <!-- guerrero de la misericordia|toque del medico -->
- [x] **Ráfaga de Curación y Daño** (nivel 11): `pasiva`. Manual del Jugador (2024). <!-- guerrero de la misericordia|rafaga de curacion y dano -->
- [x] **Mano de Misericordia Suprema** (nivel 17): `accion`. Manual del Jugador (2024). <!-- guerrero de la misericordia|mano de misericordia suprema -->
- [x] **Sintonía Elemental** (nivel 3): `gratis`. Manual del Jugador (2024). <!-- guerrero de los elementos|sintonia elemental -->
- [x] **Explosión Elemental** (nivel 6): `accion`. Manual del Jugador (2024). <!-- guerrero de los elementos|explosion elemental -->
- [x] **Zancada de los Elementos** (nivel 11): `pasiva`. Manual del Jugador (2024). <!-- guerrero de los elementos|zancada de los elementos -->
- [x] **Epítome Elemental** (nivel 17): `pasiva`. Manual del Jugador (2024). <!-- guerrero de los elementos|epitome elemental -->
- [x] **Conjuros de las Artes Místicas** (nivel 3): `pasiva`. subclase nueva; Arcana Unleashed (2026). <!-- guerrero de las artes misticas|conjuros de las artes misticas -->
- [x] **Estilo de Lucha Místico** (nivel 6): `pasiva`. subclase nueva; Arcana Unleashed (2026). <!-- guerrero de las artes misticas|estilo de lucha mistico -->
- [x] **Enfoque Místico** (nivel 6): `pasiva`. subclase nueva; Arcana Unleashed (2026). <!-- guerrero de las artes misticas|enfoque mistico -->
- [x] **Golpe Concentrado** (nivel 11): `pasiva`. subclase nueva; Arcana Unleashed (2026). <!-- guerrero de las artes misticas|golpe concentrado -->
- [x] **Estilo de Lucha Místico Mejorado** (nivel 17): `pasiva`. subclase nueva; Arcana Unleashed (2026). <!-- guerrero de las artes misticas|estilo de lucha mistico mejorado -->
- [x] **Discípulo Dracónico** (nivel 3): `pasiva`. subclase nueva; Fizban's Treasury of Dragons (2021). <!-- camino del dragon ascendente|discipulo draconico -->
- [x] **Aliento del Dragón** (nivel 3): `gratis`. subclase nueva; Fizban's Treasury of Dragons (2021). <!-- camino del dragon ascendente|aliento del dragon -->
- [x] **Alas Desplegadas** (nivel 6): `pasiva`. subclase nueva; Fizban's Treasury of Dragons (2021). <!-- camino del dragon ascendente|alas desplegadas -->
- [x] **Aspecto del Wyrm** (nivel 11): `adicional`. subclase nueva; Fizban's Treasury of Dragons (2021). <!-- camino del dragon ascendente|aspecto del wyrm -->
- [x] **Aspecto Ascendente** (nivel 17): `pasiva`. subclase nueva; Fizban's Treasury of Dragons (2021). <!-- camino del dragon ascendente|aspecto ascendente -->
- [x] **Brazos del Yo Astral** (nivel 3): `adicional`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- camino del yo astral|brazos del yo astral -->
- [x] **Rostro del Yo Astral** (nivel 6): `adicional`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- camino del yo astral|rostro del yo astral -->
- [x] **Cuerpo del Yo Astral** (nivel 11): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- camino del yo astral|cuerpo del yo astral -->
- [x] **Yo Astral Despierto** (nivel 17): `adicional`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- camino del yo astral|yo astral despierto -->
- [x] **Competencias Adicionales** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del maestro borracho|competencias adicionales -->
- [x] **Técnica del Borracho** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del maestro borracho|tecnica del borracho -->
- [x] **Vaivén Ebrio** (nivel 6): `reaccion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del maestro borracho|vaiven ebrio -->
- [x] **Suerte del Borracho** (nivel 11): `gratis`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del maestro borracho|suerte del borracho -->
- [x] **Frenesí Ebrio** (nivel 17): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del maestro borracho|frenesi ebrio -->
- [x] **Senda del Kensei** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del kensei|senda del kensei -->
- [x] **Parada Ágil** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del kensei|parada agil -->
- [x] **Disparo del Kensei** (nivel 3): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del kensei|disparo del kensei -->
- [x] **Uno con la Hoja** (nivel 6): `gratis`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del kensei|uno con la hoja -->
- [x] **Afilar la Hoja** (nivel 11): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del kensei|afilar la hoja -->
- [x] **Precisión Infalible** (nivel 17): `gratis`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del kensei|precision infalible -->
- [x] **Toque de la Muerte** (nivel 3): `pasiva`. subclase nueva; Sword Coast Adventurer's Guide (2015). <!-- camino de la larga muerte|toque de la muerte -->
- [x] **Hora de la Cosecha** (nivel 6): `accion`. subclase nueva; Sword Coast Adventurer's Guide (2015). <!-- camino de la larga muerte|hora de la cosecha -->
- [x] **Dominio de la Muerte** (nivel 11): `gratis`. subclase nueva; Sword Coast Adventurer's Guide (2015). <!-- camino de la larga muerte|dominio de la muerte -->
- [x] **Toque de la Larga Muerte** (nivel 17): `accion`. subclase nueva; Sword Coast Adventurer's Guide (2015). <!-- camino de la larga muerte|toque de la larga muerte -->
- [x] **Rayo Solar Radiante** (nivel 3): `accion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del alma solar|rayo solar radiante -->
- [x] **Golpe de Arco Abrasador** (nivel 6): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del alma solar|golpe de arco abrasador -->
- [x] **Estallido Solar Abrasador** (nivel 11): `accion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del alma solar|estallido solar abrasador -->
- [x] **Escudo Solar** (nivel 17): `reaccion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- camino del alma solar|escudo solar -->
- [x] **Paso de Sombra Mejorado** (nivel 11): `pasiva`. Manual del Jugador (2024). <!-- guerrero de la sombra|paso de sombra mejorado -->
- [x] **Manto de Sombras** (nivel 17): `accion`. Manual del Jugador (2024). <!-- guerrero de la sombra|manto de sombras -->
- [x] **Paso Veloz** (nivel 11): `pasiva`. Manual del Jugador (2024). <!-- guerrero de la mano abierta|paso veloz -->
- [x] **Palma Quiebra-almas** (nivel 17): `pasiva`. Manual del Jugador (2024). <!-- guerrero de la mano abierta|palma quiebra-almas -->

## Playtest: Unearthed Arcana 2025 Subclasses Update

Revisado el 2026-09-25 con el PDF oficial de prueba (noviembre de 2025). No es material oficial: se agregan con la etiqueta
Playtest junto a las subclases oficiales, sin reemplazar ninguna. Datos en `web/scripts/datos/playtest-2025.ts`
(`npm run db:actualizar-clase -- playtest`).

- [x] **Senda del Guardián Espiritual** (bárbaro; antes Guardián Ancestral de Xanathar, que la app no tenía).
- [x] **Senda del Heraldo de la Tormenta** (bárbaro; la app no la tenía): dados del aura según el daño de Furia y CD con CON.
- [x] **Caballero (Playtest)** (guerrero): convive con el Caballero de Xanathar (lote 11). Marca Inquebrantable sin límite de usos y Carga Feroz nueva.
- [x] **Guerrero de la Embriaguez** (monje): nueva versión del Maestro Borracho, que se conserva. Brebaje Místico con su CD y su dado.
- [x] **Rompejuramentos** (paladín; antes de la Guía del DM 2014, que la app no tenía): conjuros siempre preparados. Saeta de bruja y Golpe de viento de acero se agregaron al catálogo en el lote 16. Golpe Sombrío en Ataques.

## Lote 15: Paladín (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 0. Con tipo claro: 0. Ya revisados: 59.


### Revisados

- [x] **Abjurar Enemigos** (nivel 9): `accion`. Manual del Jugador (2024). <!-- paladin|abjurar enemigos -->
- [x] **Aura de Valor** (nivel 10): `pasiva`. Manual del Jugador (2024). <!-- paladin|aura de valor -->
- [x] **Golpes Radiantes** (nivel 11): `pasiva`. Manual del Jugador (2024). <!-- paladin|golpes radiantes -->
- [x] **Toque Restaurador** (nivel 14): `adicional`. Manual del Jugador (2024). <!-- paladin|toque restaurador -->
- [x] **Expansión del Aura** (nivel 18): `pasiva`. Manual del Jugador (2024). <!-- paladin|expansion del aura -->
- [x] **Conjuros de Conquista** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- juramento de conquista|conjuros de conquista -->
- [x] **Presencia Conquistadora** (nivel 3): `accion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- juramento de conquista|presencia conquistadora -->
- [x] **Golpe Guiado** (nivel 3): `gratis`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- juramento de conquista|golpe guiado -->
- [x] **Aura de Conquista** (nivel 7): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- juramento de conquista|aura de conquista -->
- [x] **Réplica Desdeñosa** (nivel 15): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- juramento de conquista|replica desdenosa -->
- [x] **Conquistador Invencible** (nivel 20): `accion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- juramento de conquista|conquistador invencible -->
- [x] **Conjuros de Redención** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- juramento de redencion|conjuros de redencion -->
- [x] **Emisario de Paz** (nivel 3): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- juramento de redencion|emisario de paz -->
- [x] **Reprender a los Violentos** (nivel 3): `reaccion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- juramento de redencion|reprender a los violentos -->
- [x] **Aura del Guardián** (nivel 7): `reaccion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- juramento de redencion|aura del guardian -->
- [x] **Espíritu Protector** (nivel 15): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- juramento de redencion|espiritu protector -->
- [x] **Emisario de la Redención** (nivel 20): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- juramento de redencion|emisario de la redencion -->
- [x] **Conjuros de la Corona** (nivel 3): `pasiva`. subclase nueva; Sword Coast Adventurer's Guide (2015). <!-- juramento de la corona|conjuros de la corona -->
- [x] **Desafío del Campeón** (nivel 3): `adicional`. subclase nueva; Sword Coast Adventurer's Guide (2015). <!-- juramento de la corona|desafio del campeon -->
- [x] **Cambiar las Tornas** (nivel 3): `adicional`. subclase nueva; Sword Coast Adventurer's Guide (2015). <!-- juramento de la corona|cambiar las tornas -->
- [x] **Lealtad Divina** (nivel 7): `reaccion`. subclase nueva; Sword Coast Adventurer's Guide (2015). <!-- juramento de la corona|lealtad divina -->
- [x] **Espíritu Inquebrantable** (nivel 15): `pasiva`. subclase nueva; Sword Coast Adventurer's Guide (2015). <!-- juramento de la corona|espiritu inquebrantable -->
- [x] **Campeón Exaltado** (nivel 20): `accion`. subclase nueva; Sword Coast Adventurer's Guide (2015). <!-- juramento de la corona|campeon exaltado -->
- [x] **Conjuros del Genio** (nivel 3): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- juramento de los genios nobles|conjuros del genio -->
- [x] **Esplendor del Genio** (nivel 3): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- juramento de los genios nobles|esplendor del genio -->
- [x] **Castigo Elemental** (nivel 3): `gratis`. Forgotten Realms: Heroes of Faerûn (2025). <!-- juramento de los genios nobles|castigo elemental -->
- [x] **Aura de Escudo Elemental** (nivel 7): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- juramento de los genios nobles|aura de escudo elemental -->
- [x] **Reprimenda Elemental** (nivel 15): `reaccion`. Forgotten Realms: Heroes of Faerûn (2025). <!-- juramento de los genios nobles|reprimenda elemental -->
- [x] **Vástago Noble** (nivel 20): `adicional`. Forgotten Realms: Heroes of Faerûn (2025). <!-- juramento de los genios nobles|vastago noble -->
- [x] **Conjuros de los Vigilantes** (nivel 3): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- juramento de los vigilantes|conjuros de los vigilantes -->
- [x] **Voluntad del Vigilante** (nivel 3): `accion`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- juramento de los vigilantes|voluntad del vigilante -->
- [x] **Abjurar lo Extraplanar** (nivel 3): `accion`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- juramento de los vigilantes|abjurar lo extraplanar -->
- [x] **Aura del Centinela** (nivel 7): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- juramento de los vigilantes|aura del centinela -->
- [x] **Reprimenda Vigilante** (nivel 15): `reaccion`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- juramento de los vigilantes|reprimenda vigilante -->
- [x] **Baluarte Mortal** (nivel 20): `adicional`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- juramento de los vigilantes|baluarte mortal -->
- [x] **Conjuros del Rompejuramentos** (nivel 3): `pasiva`. subclase nueva; Guía del Dungeon Master (2014). <!-- rompejuramentos|conjuros del rompejuramentos -->
- [x] **Controlar Muertos Vivientes** (nivel 3): `accion`. subclase nueva; Guía del Dungeon Master (2014). <!-- rompejuramentos|controlar muertos vivientes -->
- [x] **Aspecto Temible** (nivel 3): `accion`. subclase nueva; Guía del Dungeon Master (2014). <!-- rompejuramentos|aspecto temible -->
- [x] **Aura de Odio** (nivel 7): `pasiva`. subclase nueva; Guía del Dungeon Master (2014). <!-- rompejuramentos|aura de odio -->
- [x] **Resistencia Sobrenatural** (nivel 15): `pasiva`. subclase nueva; Guía del Dungeon Master (2014). <!-- rompejuramentos|resistencia sobrenatural -->
- [x] **Señor del Pavor** (nivel 20): `accion`. subclase nueva; Guía del Dungeon Master (2014). <!-- rompejuramentos|senor del pavor -->
- [x] **Aura de Devoción** (nivel 7): `pasiva`. Manual del Jugador (2024). <!-- juramento de devocion|aura de devocion -->
- [x] **Castigo Protector** (nivel 15): `pasiva`. Manual del Jugador (2024). <!-- juramento de devocion|castigo protector -->
- [x] **Halo Sagrado** (nivel 20): `adicional`. Manual del Jugador (2024). <!-- juramento de devocion|halo sagrado -->
- [x] **Aura de Presteza** (nivel 7): `pasiva`. Manual del Jugador (2024). <!-- juramento de la gloria|aura de presteza -->
- [x] **Defensa Gloriosa** (nivel 15): `reaccion`. Manual del Jugador (2024). <!-- juramento de la gloria|defensa gloriosa -->
- [x] **Leyenda Viviente** (nivel 20): `adicional`. Manual del Jugador (2024). <!-- juramento de la gloria|leyenda viviente -->
- [x] **Aura de Protección Arcana** (nivel 7): `pasiva`. Manual del Jugador (2024). <!-- juramento de los antiguos|aura de proteccion arcana -->
- [x] **Centinela Imperecedero** (nivel 15): `pasiva`. Manual del Jugador (2024). <!-- juramento de los antiguos|centinela imperecedero -->
- [x] **Campeón Antiguo** (nivel 20): `adicional`. Manual del Jugador (2024). <!-- juramento de los antiguos|campeon antiguo -->
- [x] **Vengador Implacable** (nivel 7): `gratis`. Manual del Jugador (2024). <!-- juramento de venganza|vengador implacable -->
- [x] **Alma de Venganza** (nivel 15): `reaccion`. Manual del Jugador (2024). <!-- juramento de venganza|alma de venganza -->
- [x] **Ángel Vengador** (nivel 20): `adicional`. Manual del Jugador (2024). <!-- juramento de venganza|angel vengador -->

## Lote 16: Pícaro (subclases y rasgos de nivel alto de la biblioteca)

Dudosos: 0. Con tipo claro: 0. Ya revisados: 60.


### Revisados

- [x] **Pericia** (nivel 6): `pasiva`. Manual del Jugador (2024). <!-- picaro|pericia -->
- [x] **Evasión** (nivel 7): `pasiva`. Manual del Jugador (2024). <!-- picaro|evasion -->
- [x] **Talento Fiable** (nivel 7): `pasiva`. Manual del Jugador (2024). <!-- picaro|talento fiable -->
- [x] **Golpe Astuto Mejorado** (nivel 11): `pasiva`. Manual del Jugador (2024). <!-- picaro|golpe astuto mejorado -->
- [x] **Golpes Taimados** (nivel 14): `pasiva`. Manual del Jugador (2024). <!-- picaro|golpes taimados -->
- [x] **Mente Escurridiza** (nivel 15): `pasiva`. Manual del Jugador (2024). <!-- picaro|mente escurridiza -->
- [x] **Escurridizo** (nivel 18): `pasiva`. Manual del Jugador (2024). <!-- picaro|escurridizo -->
- [x] **Golpe de Suerte** (nivel 20): `gratis`. Manual del Jugador (2024). <!-- picaro|golpe de suerte -->
- [x] **Lanzamiento de Conjuros** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- embaucador arcano|lanzamiento de conjuros -->
- [x] **Mano de Mago Prestidigitadora** (nivel 3): `adicional`. Manual del Jugador (2024). <!-- embaucador arcano|mano de mago prestidigitadora -->
- [x] **Emboscada Mágica** (nivel 9): `pasiva`. Manual del Jugador (2024). <!-- embaucador arcano|emboscada magica -->
- [x] **Embaucador Versátil** (nivel 13): `pasiva`. Manual del Jugador (2024). <!-- embaucador arcano|embaucador versatil -->
- [x] **Ladrón de Conjuros** (nivel 17): `reaccion`. Manual del Jugador (2024). <!-- embaucador arcano|ladron de conjuros -->
- [x] **Asesinar** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- asesino|asesinar -->
- [x] **Herramientas de Asesino** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- asesino|herramientas de asesino -->
- [x] **Experto en Infiltración** (nivel 9): `pasiva`. Manual del Jugador (2024). <!-- asesino|experto en infiltracion -->
- [x] **Envenenar Armas** (nivel 13): `pasiva`. Manual del Jugador (2024). <!-- asesino|envenenar armas -->
- [x] **Golpe Mortal** (nivel 17): `pasiva`. Manual del Jugador (2024). <!-- asesino|golpe mortal -->
- [x] **Lamentos de la Tumba** (nivel 3): `gratis`. Ravenloft: The Horrors Within (2026). <!-- fantasma|lamentos de la tumba -->
- [x] **Susurros de los Muertos** (nivel 3): `fuera`. Ravenloft: The Horrors Within (2026). <!-- fantasma|susurros de los muertos -->
- [x] **Recuerdos de los Difuntos** (nivel 9): `reaccion`. Ravenloft: The Horrors Within (2026). <!-- fantasma|recuerdos de los difuntos -->
- [x] **Voz de la Muerte** (nivel 9): `fuera`. Ravenloft: The Horrors Within (2026). <!-- fantasma|voz de la muerte -->
- [x] **Caminar Fantasma** (nivel 13): `adicional`. Ravenloft: The Horrors Within (2026). <!-- fantasma|caminar fantasma -->
- [x] **Amigo de la Muerte** (nivel 17): `pasiva`. Ravenloft: The Horrors Within (2026). <!-- fantasma|amigo de la muerte -->
- [x] **Sed de Sangre** (nivel 3): `reaccion`. Forgotten Realms: Heroes of Faerûn (2025). <!-- vastago de los tres|sed de sangre -->
- [x] **Lealtad Temible** (nivel 3): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- vastago de los tres|lealtad temible -->
- [x] **Infundir Miedo** (nivel 9): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- vastago de los tres|infundir miedo -->
- [x] **Aura de Malevolencia** (nivel 13): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- vastago de los tres|aura de malevolencia -->
- [x] **Encarnación del Terror** (nivel 17): `pasiva`. Forgotten Realms: Heroes of Faerûn (2025). <!-- vastago de los tres|encarnacion del terror -->
- [x] **Poder Psiónico** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- cuchillo mental|poder psionico -->
- [x] **Hojas Psíquicas** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- cuchillo mental|hojas psiquicas -->
- [x] **Hojas del Alma** (nivel 9): `pasiva`. Manual del Jugador (2024). <!-- cuchillo mental|hojas del alma -->
- [x] **Velo Psíquico** (nivel 13): `accion`. Manual del Jugador (2024). <!-- cuchillo mental|velo psiquico -->
- [x] **Desgarrar la Mente** (nivel 17): `gratis`. Manual del Jugador (2024). <!-- cuchillo mental|desgarrar la mente -->
- [x] **Manos Rápidas** (nivel 3): `adicional`. Manual del Jugador (2024). <!-- ladron|manos rapidas -->
- [x] **Trabajo en Segundo Piso** (nivel 3): `pasiva`. Manual del Jugador (2024). <!-- ladron|trabajo en segundo piso -->
- [x] **Sigilo Supremo** (nivel 9): `pasiva`. Manual del Jugador (2024). <!-- ladron|sigilo supremo -->
- [x] **Usar Objeto Mágico** (nivel 13): `pasiva`. Manual del Jugador (2024). <!-- ladron|usar objeto magico -->
- [x] **Reflejos de Ladrón** (nivel 17): `pasiva`. Manual del Jugador (2024). <!-- ladron|reflejos de ladron -->
- [x] **Oído para el Engaño** (nivel 3): `pasiva`. Xanathar's Guide to Everything (2017). <!-- inquisitivo|oido para el engano -->
- [x] **Ojo para el Detalle** (nivel 3): `adicional`. Xanathar's Guide to Everything (2017). <!-- inquisitivo|ojo para el detalle -->
- [x] **Lucha Perspicaz** (nivel 3): `adicional`. Xanathar's Guide to Everything (2017). <!-- inquisitivo|lucha perspicaz -->
- [x] **Mirada Firme** (nivel 9): `pasiva`. Xanathar's Guide to Everything (2017). <!-- inquisitivo|mirada firme -->
- [x] **Ojo Infalible** (nivel 13): `accion`. Xanathar's Guide to Everything (2017). <!-- inquisitivo|ojo infalible -->
- [x] **Ojo para las Debilidades** (nivel 17): `pasiva`. Xanathar's Guide to Everything (2017). <!-- inquisitivo|ojo para las debilidades -->
- [x] **Maestro de la Intriga** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- mente maestra|maestro de la intriga -->
- [x] **Maestro de la Táctica** (nivel 3): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- mente maestra|maestro de la tactica -->
- [x] **Manipulador Perspicaz** (nivel 9): `fuera`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- mente maestra|manipulador perspicaz -->
- [x] **Desvío** (nivel 13): `reaccion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- mente maestra|desvio -->
- [x] **Alma del Engaño** (nivel 17): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- mente maestra|alma del engano -->
- [x] **Hostigador** (nivel 3): `reaccion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- batidor|hostigador -->
- [x] **Superviviente** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- batidor|superviviente -->
- [x] **Movilidad Superior** (nivel 9): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- batidor|movilidad superior -->
- [x] **Maestro de Emboscadas** (nivel 13): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- batidor|maestro de emboscadas -->
- [x] **Golpe Repentino** (nivel 17): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- batidor|golpe repentino -->
- [x] **Juego de Pies** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- espadachin|juego de pies -->
- [x] **Audacia Temeraria** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- espadachin|audacia temeraria -->
- [x] **Encanto Arrollador** (nivel 9): `accion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- espadachin|encanto arrollador -->
- [x] **Maniobra Elegante** (nivel 13): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- espadachin|maniobra elegante -->
- [x] **Maestro Duelista** (nivel 17): `gratis`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- espadachin|maestro duelista -->

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

## Lote 23 a 28: subclases de Unearthed Arcana (playtest)

Versión usada: los PDF de Unearthed Arcana (Apocalyptic Subclasses 2025, Arcane Subclasses 2025, Villainous Options y Revisited 2026, Mystic Subclasses 2026, Underdark Options 1 y 2 2026). Son material de prueba, con etiqueta Playtest; no reemplazan nada oficial.

- Se agregan 21 subclases (en `scripts/datos/playtest-2026.ts`): Tattooed Warrior, Warrior of Venom, Circle of Preservation, Circle of the Titan, Circle of Spores (UA 2026), Gladiator, Hell Knight, Defiled Sorcery, Demonic Sorcery, Faerzress Sorcery, Ancestral Sorcery, Sorcerer-King Patron, Primordial Patron, Oath of the Spellguard, Magic Stealer, House Agent, Path of Lament, Path of Unlight, Imaskarcanist, Freedom Domain y Pestilence Domain.
- Psi Warper (Psion) queda guardada en `PSION_SUBCLASES_2026` hasta que exista la clase Psion en la biblioteca.
- Nombres propios sin traducción oficial en inglés. Los conjuros se llaman como en el catálogo de la app.
- Pendiente de confirmar: Primordial Patron (los conjuros dependen del elemento elegido, el texto lo describe), Warp Space de Psi Warper (el PDF corta la frase), Santificar (Hallow) e Intermitencia (Blink) sin equivalente en el catálogo.

## Lote 26, 27 y 29: especies y dotes de Unearthed Arcana (playtest)

Versión usada: Underdark Options 2 (2026), Villainous Options (2026), Underdark Options (2026) y The Psion (2025). Material de prueba.

- Especies nuevas (`scripts/datos/especies-playtest.ts`): Deep Imaskari, Drider, Illithidkin, Kuo-toa y Myconid. El tipo de criatura y el tamaño se agregaron del PDF como primer rasgo.
- Dotes nuevas (`scripts/datos/dotes-playtest.ts`, categoría con "(Playtest)"): 4 de origen, 4 épicas, 5 de Ceremorphosis y las 10 Wild Talent. Los requisitos van al inicio del texto.
- Las dotes no calculan usos ni conjuros solos: son texto. Los nombres propios quedan en inglés.

## Lote 23: Psion (Unearthed Arcana, Psion Update 2025)

Versión usada: Psion Update (octubre de 2025), con el Psi Warper de The Psion (mayo de 2025). Material de prueba; la clase es nueva en la biblioteca (`lib:psion`).

- Tablas de energía, trucos, preparados y espacios de conjuro tomadas del PDF (no de la respuesta de Gemini, que no las traía). Las disciplinas van dentro del rasgo Psionic Discipline.
- Subclases: Metamorph, Psykinetic, Telepath y Psi Warper.
- Lista de conjuros del Psion: 142 conjuros marcados con la clase `lib:psion`; 16 conjuros nuevos de la UA se agregaron a la biblioteca (nombres en inglés). Befuddlement (Manual del Jugador 2024) no está en la biblioteca y no se pudo agregar sin su texto.
- Sin kit de equipo inicial (todavía no hay `equipo-clases` para el Psion).

## Revisados en pasadas anteriores

- [x] **Competencia Adicional** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- caballero|competencia adicional -->
- [x] **Nacido para la Silla** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- caballero|nacido para la silla -->
- [x] **Marca Inquebrantable** (nivel 3): `gratis`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- caballero|marca inquebrantable -->
- [x] **Maniobra de Protección** (nivel 7): `reaccion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- caballero|maniobra de proteccion -->
- [x] **Mantener la Línea** (nivel 10): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- caballero|mantener la linea -->
- [x] **Carga Feroz** (nivel 15): `gratis`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- caballero|carga feroz -->
- [x] **Defensor Vigilante** (nivel 18): `reaccion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- caballero|defensor vigilante -->
- [x] **Manifestar Eco** (nivel 3): `adicional`. subclase nueva; Explorer's Guide to Wildemount (2020). <!-- caballero del eco|manifestar eco -->
- [x] **Desatar Encarnación** (nivel 3): `gratis`. subclase nueva; Explorer's Guide to Wildemount (2020). <!-- caballero del eco|desatar encarnacion -->
- [x] **Avatar del Eco** (nivel 7): `accion`. subclase nueva; Explorer's Guide to Wildemount (2020). <!-- caballero del eco|avatar del eco -->
- [x] **Mártir Sombrío** (nivel 10): `reaccion`. subclase nueva; Explorer's Guide to Wildemount (2020). <!-- caballero del eco|martir sombrio -->
- [x] **Reclamar Potencial** (nivel 15): `gratis`. subclase nueva; Explorer's Guide to Wildemount (2020). <!-- caballero del eco|reclamar potencial -->
- [x] **Legión de Uno** (nivel 18): `pasiva`. subclase nueva; Explorer's Guide to Wildemount (2020). <!-- caballero del eco|legion de uno -->
- [x] **Competencia Adicional** (nivel 3): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- samurai|competencia adicional -->
- [x] **Espíritu de Lucha** (nivel 3): `adicional`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- samurai|espiritu de lucha -->
- [x] **Cortesano Elegante** (nivel 7): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- samurai|cortesano elegante -->
- [x] **Espíritu Incansable** (nivel 10): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- samurai|espiritu incansable -->
- [x] **Golpe Rápido** (nivel 15): `pasiva`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- samurai|golpe rapido -->
- [x] **Fuerza antes que la Muerte** (nivel 18): `reaccion`. subclase nueva; Xanathar's Guide to Everything (2017). <!-- samurai|fuerza antes que la muerte -->
- [x] **Competencias Adicionales** (nivel 3): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- caballero runico|competencias adicionales -->
- [x] **Tallador de Runas** (nivel 3): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- caballero runico|tallador de runas -->
- [x] **Poder de Gigante** (nivel 3): `adicional`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- caballero runico|poder de gigante -->
- [x] **Escudo Rúnico** (nivel 7): `reaccion`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- caballero runico|escudo runico -->
- [x] **Gran Estatura** (nivel 10): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- caballero runico|gran estatura -->
- [x] **Maestro de las Runas** (nivel 15): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- caballero runico|maestro de las runas -->
- [x] **Coloso Rúnico** (nivel 18): `pasiva`. subclase nueva; Tasha's Cauldron of Everything (2020). <!-- caballero runico|coloso runico -->
- [x] **Vínculo con el Arma** (nivel 3): pasa a llamarse Vínculo de Guerra (ritual, hasta dos armas); Manual del Jugador (2024). <!-- caballero arcano|vinculo con el arma -->
- [x] **Enviado Caballeresco** (nivel 3): `pasiva`; la subclase pasa a llamarse Abanderado (Banneret); Forgotten Realms: Heroes of Faerûn (2025). <!-- caballero del dragon purpura|enviado caballeresco -->
- [x] **Recuperación Grupal** (nivel 3): `gratis`, al usar Segundo Aliento; 1 uso por descanso corto, en el cálculo; Forgotten Realms: Heroes of Faerûn (2025). <!-- caballero del dragon purpura|recuperacion grupal -->
- [x] **Tácticas de Equipo** (nivel 7): `pasiva` (acompaña a Recuperación Grupal); Forgotten Realms: Heroes of Faerûn (2025). <!-- caballero del dragon purpura|tacticas de equipo -->
- [x] **Comandante Inspirador** (nivel 18): `pasiva`; Forgotten Realms: Heroes of Faerûn (2025). <!-- caballero del dragon purpura|comandante inspirador -->
- [x] **Ocultarse a Plena Vista** (nivel 10): quitado: no existe en 2024 (el nivel 10 es Incansable); Manual del Jugador (2024). <!-- explorador|ocultarse a plena vista -->
- [x] **Multiataque del Cazador** (nivel 11): sustituido por Presa del Cazador Superior (el daño de Marca del cazador salta a otra criatura a 30 pies); Manual del Jugador (2024). <!-- cazador|multiataque del cazador -->
- [x] **Defensa Superior** (nivel 15): pasa a llamarse Defensa Superior del Cazador: reacción, resistencia al tipo de daño recibido; Manual del Jugador (2024). <!-- cazador|defensa superior -->
- [x] **Compañero del Explorador** (nivel 3): pasa a llamarse Compañero Primigenio (acción adicional para darle órdenes) con selector de bestia; Manual del Jugador (2024). <!-- maestro de bestias|companero del explorador -->
- [x] **Ataque Pavoroso** (nivel 3): pasa a llamarse Golpes Pavorosos: 1d4 psíquico, 1d6 desde nivel 11, en el cálculo; Manual del Jugador (2024). <!-- caminante de las hadas|ataque pavoroso -->
- [x] **Magia Feérica** (nivel 3): sustituido por Conjuros del Caminante de las Hadas y Glamour de Otro Mundo (con selector de habilidad); Manual del Jugador (2024). <!-- caminante de las hadas|magia feerica -->
- [x] **Giro Etéreo** (nivel 7): pasa a llamarse Giro Engañoso (reacción); Manual del Jugador (2024). <!-- caminante de las hadas|giro etereo -->
- [x] **Paso Nebuloso** (nivel 15): pasa a llamarse Caminante Nebuloso (SAB usos por descanso largo); Manual del Jugador (2024). <!-- caminante de las hadas|paso nebuloso -->
- [x] **Alma Congelada** (nivel 11): quitado: el nivel 11 es Retribución Helada y la forma helada pasa al 15 (Aparición Congelada); Forgotten Realms: Heroes of Faerûn (2025). <!-- caminante del invierno|alma congelada -->
- [x] **Conjuros de Círculo** (nivel 3): pasa a llamarse Conjuros del Círculo de la Tierra, con los cuatro tipos de tierra 2024 y su selector; Manual del Jugador (2024). <!-- circulo de la tierra|conjuros de circulo -->
- [x] **Zancada de la Tierra** (nivel 6): quitado: en 2024 el nivel 6 es Recuperación Natural; Manual del Jugador (2024). <!-- circulo de la tierra|zancada de la tierra -->
- [x] **Golpes Primigenios** (nivel 6): sustituido por Formas del Círculo Mejoradas (daño radiante y SAB a las salvaciones de CON); Manual del Jugador (2024). <!-- circulo de la luna|golpes primigenios -->
- [x] **Mil Formas** (nivel 14): sustituido por Forma Lunar (2d10 radiante y Paso de Luz Lunar compartido); Manual del Jugador (2024). <!-- circulo de la luna|mil formas -->
- [x] **Ira de la Marea** (nivel 3): pasa a llamarse Ira del Mar: acción adicional, 1 Forma Salvaje, SAB d6 de frío; Manual del Jugador (2024). <!-- circulo del mar|ira de la marea -->
- [x] **Marea Creciente** (nivel 10): sustituido por Hijo de la Tormenta (vuelo y resistencias); Manual del Jugador (2024). <!-- circulo del mar|marea creciente -->
- [x] **Unión con el Océano** (nivel 14): sustituido por Don Oceánico (emanación en un aliado); Manual del Jugador (2024). <!-- circulo del mar|union con el oceano -->
- [x] **Luminosidad Completa** (nivel 14): pasa a llamarse Lleno de Estrellas (pasiva, resistencia física en forma estelar); Manual del Jugador (2024). <!-- circulo de las estrellas|luminosidad completa -->
