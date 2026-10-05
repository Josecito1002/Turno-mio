/* Subclases de playtest 2025 y 2026 (lotes 24, 25 y 28): reglas, fuentes y descripciones. Lo que necesite más lógica va en
   reglas-revisadas.ts, que tiene prioridad sobre esto. */
/* eslint-disable */
// @ts-nocheck
/* Conjuros siempre preparados: [nivel, nombres del catálogo] */
const siempre = tabla => c => `Siempre preparados, sin contar en tu límite: ${tabla.filter(([n]) => c.lvl >= n).flatMap(([, s]) => s).join(', ')}.`;

export const reglas = [
  {de:/^circulo\ de\ la\ preservacion \(playtest\)$/, n:/^conjuros\ de\ circulo\ de\ la\ preservacion$/, texto: siempre([[3, ["Bendecir", "Restablecimiento menor", "Protección contra veneno", "Santuario"]], [5, ["Faro de esperanza", "Crecimiento vegetal"]], [7, ["Aura de vida", "Guarda contra la Muerte"]], [9, ["Restablecimiento mayor", "Consagrar"]]])},
  {de:/^circulo\ de\ la\ preservacion \(playtest\)$/, n:/^restauracion\ facilitada$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^gladiador \(playtest\)$/, n:/^brutalidad$/, usos: c => Math.max(1, c.m.car), reset: "corto"},
  {de:/^gladiador \(playtest\)$/, n:/^parada\ con\ floritura$/, usos: c => 1, reset: "largo"},
  {de:/^hechiceria\ profanada \(playtest\)$/, n:/^conjuros\ de\ hechiceria\ profanada$/, texto: siempre([[3, ["Sordera/Ceguera", "Infligir heridas", "Rayo debilitador", "Rayo nauseabundo"]], [5, ["Imponer maldición", "Toque vampírico"]], [7, ["Marchitar", "Terreno alucinatorio"]], [9, ["Caparazón antivida", "Contagio"]]])},
  {de:/^hechiceria\ profanada \(playtest\)$/, n:/^profanar\ y\ potenciar$/, usos: c => 1, reset: "largo"},
  {de:/^patron\ rey\ hechicero \(playtest\)$/, n:/^conjuros\ de\ patron\ rey\ hechicero$/, texto: siempre([[3, ["Orden imperiosa", "Duelo forzado", "Inmovilizar persona", "Clavo mental", "Castigo furioso"]], [5, ["Miedo", "Recado"]], [7, ["Compulsión", "Castigo abrumador"]], [9, ["Dominar persona", "Estática sináptica"]]])},
  {de:/^patron\ rey\ hechicero \(playtest\)$/, n:/^heraldo\ del\ tirano$/, usos: c => Math.max(1, c.m.car), reset: "largo"},
  {de:/^patron\ rey\ hechicero \(playtest\)$/, n:/^edicto\ decisivo$/, usos: c => 1, reset: "corto"},
  {de:/^patron\ rey\ hechicero \(playtest\)$/, n:/^reprension\ vengativa$/, usos: c => Math.max(1, c.m.car), reset: "largo"},
  {de:/^juramento\ del\ guardian\ de\ conjuros \(playtest\)$/, n:/^conjuros\ de\ juramento\ del\ guardian\ de\ conjuros$/, texto: siempre([[3, ["Detectar magia", "Escudo"]], [5, ["Ver lo invisible", "Silencio"]], [9, ["Contrahechizo", "Disipar magia"]], [13, ["Libertad de movimiento", "Esfera elástica de Otiluke"]], [17, ["Círculo de poder", "Hallow"]]])},
  {de:/^ladron\ de\ magia \(playtest\)$/, n:/^drenar\ magia$/, usos: c => 1, reset: "corto"},
  {de:/^ladron\ de\ magia \(playtest\)$/, n:/^potenciar\ ataque\ furtivo$/, usos: c => Math.max(1, c.m.int), reset: "largo"},
  {de:/^circulo\ del\ titan \(playtest\)$/, n:/^conjuros\ de\ circulo\ del\ titan$/, texto: siempre([[3, ["Agrandar/Reducir", "Taumaturgia", "Onda atronadora"]], [5, ["Miedo"]], [7, ["Escudo de fuego"]], [9, ["Ola destructora"]]])},
  {de:/^caballero\ infernal \(playtest\)$/, n:/^herida\ infernal$/, usos: c => Math.max(1, c.m.con), reset: "corto"},
  {de:/^hechiceria\ demoniaca \(playtest\)$/, n:/^conjuros\ de\ hechiceria\ demoniaca$/, texto: siempre([[3, ["Perdición", "Susurros discordantes", "Crecimiento espinoso", "Telaraña"]], [5, ["Imponer maldición", "Disipar magia"]], [7, ["Insecto gigante", "Terreno alucinatorio"]], [9, ["Contactar con otro plano", "Alterar los recuerdos"]]])},
  {de:/^hechiceria\ demoniaca \(playtest\)$/, n:/^explosion\ abisal$/, usos: c => 1, reset: "largo"},
  {de:/^senda\ del\ lamento \(playtest\)$/, n:/^lamento\ de\ la\ banshee$/, usos: c => Math.max(1, c.m.con), reset: "largo"},
  {de:/^senda\ del\ lamento \(playtest\)$/, n:/^forma\ de\ pesar$/, usos: c => 1, reset: "largo"},
  {de:/^patron\ primordial \(playtest\)$/, n:/^nodo\ elemental$/, usos: c => 1, reset: "corto"},
  {de:/^patron\ primordial \(playtest\)$/, n:/^refugio\ elemental$/, usos: c => Math.max(1, c.m.car), reset: "largo"},
  {de:/^agente\ de\ casa \(playtest\)$/, n:/^conjuros\ de\ agente\ de\ casa$/, texto: siempre([[3, ["Hechizar persona"]], [5, ["Sugestión"]], [9, ["Patrón hipnótico"]]])},
  {de:/^dominio\ de\ la\ libertad \(playtest\)$/, n:/^conjuros\ de\ dominio$/, texto: siempre([[3, ["Retirada expeditiva", "Salto", "Abrir", "Paso brumoso"]], [5, ["Volar", "Forma gaseosa"]], [7, ["Puerta dimensional", "Libertad de movimiento"]], [9, ["Pasamuros", "Paso arbóreo"]]])},
  {de:/^circulo\ de\ las\ esporas\ \(playtest\ 2026\) \(playtest\)$/, n:/^conjuros\ del\ circulo$/, texto: siempre([[3, ["Sordera/Ceguera", "Hechizar persona", "Toque helado"]], [5, ["Animar a los muertos"]], [7, ["Confusión"]], [9, ["Contagio"]]])},
  {de:/^hechiceria\ de\ faerzress \(playtest\)$/, n:/^conjuros\ de\ faerzress$/, texto: siempre([[3, ["Fuego feérico", "Arma mágica", "Paso brumoso", "Saeta de bruja"]], [5, ["Indetectable", "Recado"]], [7, ["Ojo arcano", "Moldear la piedra"]], [9, ["Pasamuros", "Escudriñar"]]])},
  {de:/^circulo\ de\ las\ esporas\ \(playtest\ 2026\) \(playtest\)$/, n:/^infestacion\ fungica$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^dominio\ de\ la\ pestilencia \(playtest\)$/, n:/^estallido\ virulento$/, usos: c => Math.max(1, c.m.sab), reset: "largo"},
  {de:/^dominio\ de\ la\ pestilencia \(playtest\)$/, n:/^forma\ de\ alimana$/, usos: c => 1, reset: "largo"},
  {de:/^dominio\ de\ la\ pestilencia \(playtest\)$/, n:/^conjuros\ de\ dominio\ de\ la\ pestilencia$/, texto: siempre([[3, ["Detectar venenos y enfermedades", "Protección contra veneno", "Rayo debilitador", "Rayo nauseabundo"]], [5, ["Nube apestosa", "Toque vampírico"]], [7, ["Marchitar", "Insecto gigante"]], [9, ["Contagio", "Plaga de insectos"]]])},
  {de:/^hechiceria\ ancestral \(playtest\)$/, n:/^disrupcion\ de\ conjuros\ superior$/, usos: c => 1, reset: "largo"},
  {de:/^hechiceria\ ancestral \(playtest\)$/, n:/^conjuros\ de\ hechiceria\ ancestral$/, texto: siempre([[3, ["Orden imperiosa", "Guía", "Localizar objeto", "Protección contra el bien y el mal", "Resistencia", "Arma espiritual"]], [5, ["Círculo mágico", "Espíritus guardianes"]], [7, ["Adivinación", "Localizar criatura"]], [9, ["Conocer las leyendas", "Presencia regia de Yolande"]]])},
  {de:/^deformador\ psi \(playtest\)$/, n:/^teletransportacion$/, usos: c => 1, reset: "largo"},
  {de:/^deformador\ psi \(playtest\)$/, n:/^conjuros\ de\ deformador\ psi$/, texto: siempre([[3, ["Retirada expeditiva", "Caída de pluma", "Paso brumoso", "Hacer añicos"]], [5, ["Blink", "Acelerar"]], [7, ["Destierro", "Puerta dimensional"]], [9, ["Golpe de Viento Acerado", "Círculo de teletransportación"]]])},
  {de:/^patron\ primordial \(playtest\)$/, n:/^conjuros\ de\ patron\ primordial$/, t:'pasiva',
    eleccion: {id:'elemento-primordial', titulo:'Elemento primordial', opciones: [{key:'aire', nombre:'Aire', desc:'Daño de trueno.'}, {key:'tierra', nombre:'Tierra', desc:'Daño de ácido.'}, {key:'fuego', nombre:'Fuego', desc:'Daño de fuego.'}, {key:'agua', nombre:'Agua', desc:'Daño de frío.'}]},
    texto: c => { const e = c.pj?.elecciones?.['elemento-primordial'] || ''; const lista = [[3, ['Orbe cromático', 'Visión en la oscuridad']], [5, ['Arma elemental']], [7, ['Invocar elemental']], [9, ['Comunión con la naturaleza']]]; const por = {aire: [[3, ['Caída de pluma', 'Hacer añicos']], [5, ['Volar']], [7, ['Libertad de movimiento']], [9, ['Golpe de Viento Acerado']]], tierra: [[3, ['Enmarañar', 'Abrir']], [5, ['Crecimiento vegetal']], [7, ['Esfera Vitriólica']], [9, ['Muro de piedra']]], fuego: [[3, ['Manos ardientes', 'Calentar metal']], [5, ['Bola de fuego']], [7, ['Muro de fuego']], [9, ['Golpe flamígero']]], agua: [[3, ['Alterar el propio aspecto', 'Cuchillo de hielo']], [5, ['Caminar sobre el agua']], [7, ['Controlar agua']], [9, ['Cono de frío']]]}[e] || []; const nombres = [...lista, ...por].filter(([n]) => c.lvl >= n).flatMap(([, s]) => s); return `Elige tu elemento en el paso Clase (Aire, Tierra, Fuego o Agua; puedes cambiarlo al subir de nivel). Siempre preparados, sin contar en tu límite: ${nombres.join(', ')}.`; }},
  {de:/^agente\ de\ casa \(playtest\)$/, n:/^conjuros\ de\ agente\ de\ casa$/, texto: c => `Conoces el truco Amistad y puedes lanzar Encontrar familiar solo como ritual (tu familiar es una Araña; tu patrocinador aporta el material del primer lanzamiento). Conjuros de la insignia, una vez cada uno por descanso largo: ${[[3,'Hechizar persona'],[5,'Sugestión'],[9,'Patrón hipnótico']].filter(([n]) => c.lvl >= n).map(([, s]) => s).join(', ')}.`},
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
 "psi-warper": "Unearthed Arcana The Psion (2025)",
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
