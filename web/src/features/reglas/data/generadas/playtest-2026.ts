/* Subclases de playtest 2025 y 2026 (lotes 24, 25 y 28): reglas, fuentes y descripciones. Lo que necesite más lógica va en
   reglas-revisadas.ts, que tiene prioridad sobre esto. */
/* eslint-disable */
// @ts-nocheck
/* Conjuros siempre preparados: [nivel, nombres del catálogo] */
const siempre = tabla => c => `Siempre preparados, sin contar en tu límite: ${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.`;

export const reglas = [
  {de:/^circle\ of\ preservation \(playtest\)$/, n:/^conjuros\ de\ circle\ of\ preservation$/, texto: siempre([[3, ["Bendecir", "Restablecimiento menor", "Protección contra veneno", "Santuario"]], [5, ["Faro de esperanza", "Crecimiento vegetal"]], [7, ["Aura de vida", "Guarda contra la Muerte"]], [9, ["Restablecimiento mayor", "Consagrar"]]])},
  {de:/^circle\ of\ preservation \(playtest\)$/, n:/^facilitated\ restoration$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^gladiator \(playtest\)$/, n:/^brutality$/, usos: c => Math.max(1, c.m.car), reset: "corto"},
  {de:/^gladiator \(playtest\)$/, n:/^flourish\ parry$/, usos: c => 1, reset: "largo"},
  {de:/^defiled\ sorcery \(playtest\)$/, n:/^conjuros\ de\ defiled\ sorcery$/, texto: siempre([[3, ["Sordera/Ceguera", "Infligir heridas", "Rayo debilitador", "Rayo nauseabundo"]], [5, ["Imponer maldición", "Toque vampírico"]], [7, ["Marchitar", "Terreno alucinatorio"]], [9, ["Caparazón antivida", "Contagio"]]])},
  {de:/^defiled\ sorcery \(playtest\)$/, n:/^defile\ and\ empower$/, usos: c => 1, reset: "largo"},
  {de:/^sorcerer\-king\ patron \(playtest\)$/, n:/^conjuros\ de\ sorcerer\-king\ patron$/, texto: siempre([[3, ["Orden imperiosa", "Duelo forzado", "Inmovilizar persona", "Clavo mental", "Castigo furioso"]], [5, ["Miedo", "Recado"]], [7, ["Compulsión", "Castigo abrumador"]], [9, ["Dominar persona", "Estática sináptica"]]])},
  {de:/^sorcerer\-king\ patron \(playtest\)$/, n:/^tyrant's\ herald$/, usos: c => Math.max(1, c.m.car), reset: "largo"},
  {de:/^sorcerer\-king\ patron \(playtest\)$/, n:/^decisive\ edict$/, usos: c => 1, reset: "corto"},
  {de:/^sorcerer\-king\ patron \(playtest\)$/, n:/^vindictive\ rebuke$/, usos: c => Math.max(1, c.m.car), reset: "largo"},
  {de:/^oath\ of\ the\ spellguard \(playtest\)$/, n:/^oath\ of\ the\ spellguard\ spells$/, texto: siempre([[3, ["Detectar magia", "Escudo"]], [5, ["Ver lo invisible", "Silencio"]], [9, ["Contrahechizo", "Disipar magia"]], [13, ["Libertad de movimiento", "Esfera elástica de Otiluke"]], [17, ["Círculo de poder", "Santificar"]]])},
  {de:/^magic\ stealer \(playtest\)$/, n:/^drain\ magic$/, usos: c => 1, reset: "corto"},
  {de:/^magic\ stealer \(playtest\)$/, n:/^empower\ sneak\ attack$/, usos: c => Math.max(1, c.m.int), reset: "largo"},
  {de:/^circle\ of\ the\ titan \(playtest\)$/, n:/^circle\ of\ the\ titan\ spells$/, texto: siempre([[3, ["Agrandar/Reducir", "Taumaturgia", "Onda atronadora"]], [5, ["Miedo"]], [7, ["Escudo de fuego"]], [9, ["Ola destructora"]]])},
  {de:/^hell\ knight \(playtest\)$/, n:/^infernal\ wound$/, usos: c => Math.max(1, c.m.con), reset: "corto"},
  {de:/^demonic\ sorcery \(playtest\)$/, n:/^demonic\ spells$/, texto: siempre([[3, ["Perdición", "Susurros discordantes", "Crecimiento espinoso", "Telaraña"]], [5, ["Imponer maldición", "Disipar magia"]], [7, ["Insecto gigante", "Terreno alucinatorio"]], [9, ["Contactar con otro plano", "Alterar los recuerdos"]]])},
  {de:/^demonic\ sorcery \(playtest\)$/, n:/^abyssal\ explosion$/, usos: c => 1, reset: "largo"},
  {de:/^path\ of\ lament \(playtest\)$/, n:/^banshee's\ wail$/, usos: c => Math.max(1, c.m.con), reset: "largo"},
  {de:/^path\ of\ lament \(playtest\)$/, n:/^sorrow\ form$/, usos: c => 1, reset: "largo"},
  {de:/^primordial\ patron \(playtest\)$/, n:/^elemental\ node$/, usos: c => 1, reset: "corto"},
  {de:/^primordial\ patron \(playtest\)$/, n:/^elemental\ haven$/, usos: c => Math.max(1, c.m.car), reset: "largo"},
  {de:/^house\ agent \(playtest\)$/, n:/^conjuros\ de\ house\ agent$/, texto: siempre([[3, ["Hechizar persona"]], [5, ["Sugestión"]], [9, ["Patrón hipnótico"]]])},
  {de:/^freedom\ domain \(playtest\)$/, n:/^conjuros\ de\ dominio$/, texto: siempre([[3, ["Retirada expeditiva", "Salto", "Abrir", "Paso brumoso"]], [5, ["Volar", "Forma gaseosa"]], [7, ["Puerta dimensional", "Libertad de movimiento"]], [9, ["Pasamuros", "Paso arbóreo"]]])},
  {de:/^circle\ of\ spores\ \(playtest\ 2026\) \(playtest\)$/, n:/^conjuros\ del\ circulo$/, texto: siempre([[3, ["Sordera/Ceguera", "Hechizar persona", "Toque helado"]], [5, ["Animar a los muertos"]], [7, ["Confusión"]], [9, ["Contagio"]]])},
  {de:/^faerzress\ sorcery \(playtest\)$/, n:/^conjuros\ de\ faerzress$/, texto: siempre([[3, ["Fuego feérico", "Arma mágica", "Paso brumoso", "Saeta de bruja"]], [5, ["Indetectable", "Recado"]], [7, ["Ojo arcano", "Moldear la piedra"]], [9, ["Pasamuros", "Escudriñar"]]])},
  {de:/^circle\ of\ spores\ \(playtest\ 2026\) \(playtest\)$/, n:/^fungal\ infestation$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^pestilence\ domain \(playtest\)$/, n:/^virulent\ burst$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^pestilence\ domain \(playtest\)$/, n:/^vermin\ form$/, usos: c => 1, reset: "largo"},
  {de:/^pestilence\ domain \(playtest\)$/, n:/^conjuros\ de\ pestilence\ domain$/, texto: siempre([[3, ["Detectar venenos y enfermedades", "Protección contra veneno", "Rayo debilitador", "Rayo nauseabundo"]], [5, ["Nube apestosa", "Toque vampírico"]], [7, ["Marchitar", "Insecto gigante"]], [9, ["Contagio", "Plaga de insectos"]]])},
  {de:/^ancestral\ sorcery \(playtest\)$/, n:/^superior\ spell\ disruption$/, usos: c => 1, reset: "largo"},
  {de:/^ancestral\ sorcery \(playtest\)$/, n:/^conjuros\ de\ ancestral\ sorcery$/, texto: siempre([[3, ["Orden imperiosa", "Guía", "Localizar objeto", "Protección contra el bien y el mal", "Resistencia", "Arma espiritual"]], [5, ["Círculo mágico", "Espíritus guardianes"]], [7, ["Adivinación", "Localizar criatura"]], [9, ["Conocer las leyendas", "Presencia regia de Yolande"]]])},
  {de:/^psi\ warper \(playtest\)$/, n:/^teleportation$/, usos: c => 1, reset: "largo"},
  {de:/^psi\ warper \(playtest\)$/, n:/^conjuros\ de\ psi\ warper$/, texto: siempre([[3, ["Retirada expeditiva", "Caída de pluma", "Paso brumoso", "Hacer añicos"]], [5, ["Intermitencia", "Acelerar"]], [7, ["Destierro", "Puerta dimensional"]], [9, ["Golpe de Viento Acerado", "Círculo de teletransportación"]]])},
  {de:/^house\ agent \(playtest\)$/, n:/^conjuros\ de\ house\ agent$/, texto: c => `Conoces el truco Amistad y puedes lanzar Encontrar familiar solo como ritual (tu familiar es una Araña; tu patrocinador aporta el material del primer lanzamiento). Conjuros de la insignia, una vez cada uno por descanso largo: ${[[3,'Hechizar persona'],[5,'Sugestión'],[9,'Patrón hipnótico']].filter(([n]) => c.lvl >= n).map(([, s]) => s).join(', ')}.`},
];

/* Libro de cada subclase de playtest, por su clave */
export const clavesPlaytest: Record<string, string> = {
 "tattooed-warrior": "Unearthed Arcana Arcane Subclasses (2025)",
 "circle-of-preservation": "Unearthed Arcana Apocalyptic Subclasses (2025)",
 "gladiator": "Unearthed Arcana Apocalyptic Subclasses (2025)",
 "defiled-sorcery": "Unearthed Arcana Apocalyptic Subclasses (2025)",
 "sorcerer-king-patron": "Unearthed Arcana Apocalyptic Subclasses (2025)",
 "oath-of-the-spellguard": "Unearthed Arcana Mystic Subclasses (2026)",
 "magic-stealer": "Unearthed Arcana Mystic Subclasses (2026)",
 "circle-of-the-titan": "Unearthed Arcana Villainous Options Update (2026)",
 "hell-knight": "Unearthed Arcana Villainous Options Update (2026)",
 "demonic-sorcery": "Unearthed Arcana Villainous Options Update (2026)",
 "path-of-lament": "Unearthed Arcana Villainous Options 2 (2026)",
 "warrior-of-venom": "Unearthed Arcana Villainous Options 2 (2026)",
 "primordial-patron": "Unearthed Arcana Villainous Options 2 (2026)",
 "esporas-playtest": "Unearthed Arcana Underdark Options 2 (2026)",
 "path-of-unlight": "Unearthed Arcana Underdark Options (2026)",
 "house-agent": "Unearthed Arcana Underdark Options (2026)",
 "imaskarcanist": "Unearthed Arcana Underdark Options (2026)",
 "freedom-domain": "Unearthed Arcana Underdark Options 2 (2026)",
 "faerzress-sorcery": "Unearthed Arcana Underdark Options 2 (2026)",
 "pestilence-domain": "Unearthed Arcana Villainous Options (2026)",
 "ancestral-sorcery": "Unearthed Arcana Arcane Subclasses (2025)"
};

export const fuentes: Record<string, string> = {};

export const descripciones: Record<string, string> = {
 "tattooed-warrior": "Monjes que emplean tatuajes mágicos como conductos de poder esotérico, adaptando marcas místicas en su cuerpo para potenciar sus artes marciales y desencadenar efectos sobrenaturales.",
 "circle-of-preservation": "Druidas enfocados en la conservación y la restauración, capaces de infundir vitalidad curativa en los terrenos baldíos para proteger a sus aliados y purificar la corrupción.",
 "gladiator": "Guerreros del espectáculo y la sangre que encadenan brutales maniobras marciales con maestría teatral, debilitando, mutilando y humillando a sus oponentes para el deleite del público.",
 "defiled-sorcery": "Hechiceros que canalizan una magia profanadora, absorbiendo agresivamente la fuerza vital de los demás para potenciar sus conjuros y tejer auras destructivas a su alrededor.",
 "sorcerer-king-patron": "Brujos que fungen como heraldos de tiranos monstruosos, obteniendo poderes psiónicos absolutos para subyugar mentes, imponer edictos y aplastar cualquier oposición mediante magia opresiva.",
 "oath-of-the-spellguard": "Los paladines que hacen este juramento sirven como guardaespaldas contra magia letal. Protegen a sus aliados e interceptan conjuros lanzados por los villanos.",
 "magic-stealer": "Pícaros especializados en asaltar hechiceros y robar su poder mágico. Drenan conjuros activos y canalizan esa energía para potenciar sus letales ataques furtivos.",
 "circle-of-the-titan": "Druidas que asumen la forma de monstruos colosales y cataclísmicos para destruir la civilización que amenaza la naturaleza. Castigan la invasión con una devastación destructiva.",
 "hell-knight": "Campeones de los archidiablos que portan letales armas imbuidas de fuego del Averno. Castigan a sus enemigos dejando heridas supurantes que consumen lentamente su fuerza.",
 "demonic-sorcery": "Hechiceros que canalizan de forma innata el caos mutante del Abismo. Desgarran la realidad para invocar manifestaciones retorcidas y explosiones de poder demoníaco.",
 "path-of-lament": "Bárbaros impulsados por una profunda pena y un arrepentimiento sobrenatural. Su furia ciega se manifiesta en lamentos desgarradores y energía de ultratumba que debilita a sus enemigos.",
 "warrior-of-venom": "Monjes letales que han convertido su propio cuerpo y sangre en un caldero inagotable de toxinas. Envenenan gravemente a sus rivales con su aliento, con un golpe o incluso cuando sangran.",
 "primordial-patron": "Brujos vinculados a pactos con entidades del caos elemental de los Planos Interiores. Sirven como heraldos creando nodos de energía destructiva para preparar la llegada de sus antiguos patrones.",
 "path-of-unlight": "Bárbaros que encauzan el inestable y letal poder del Unlight, desatando una destructiva luz radiante que ciega y quema a todo el que se les acerca.",
 "house-agent": "Infiltradores letales al servicio de casas drow, combinando astucia, sabotaje y engaño para dar golpes mortales a quienes confían en ellos.",
 "imaskarcanist": "Magos devotos de los secretos del antiguo imperio de Imaskar, capaces de mutar su magia elemental para desatar la destructiva curación y maldición del Unlight.",
 "freedom-domain": "Clérigos devotos del libre albedrío, maestros en romper ataduras e inspirar velocidad e independencia en el corazón de sus aliados.",
 "esporas-playtest": "Druidas que ven una lúgubre belleza en la decadencia, extendiendo halos de esporas venenosas y reanimando cadáveres del entorno en su red fúngica (Versión Playtest 2026).",
 "faerzress-sorcery": "Hechiceros transformados por la inestable radiación mágica de la Infraoscuridad, la cual manipulan para teletransportarse y corromper divinaciones enemigas.",
 "pestilence-domain": "Clérigos que canalizan plagas y podredumbre para erosionar la vitalidad de sus enemigos. Utilizan la pestilencia con precisión quirúrgica como una herramienta para motivar o castigar según las doctrinas de su dominio.",
 "ancestral-sorcery": "Hechiceros guiados por el fragmento de la personalidad de un ancestro que poseía un poder mágico asombroso. Esta presencia espectral asiste al hechicero interfiriendo con magia enemiga y manipulando voluntades.",
 "psi-warper": "Psiónicos que sintonizan sus poderes para deformar el espacio vacío entre los objetos. Son capaces de teletransportarse frenéticamente por el campo de batalla y manipular las distancias usando su mente."
};
