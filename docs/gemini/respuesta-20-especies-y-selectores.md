=== A ===

```ts
const r = (nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, manual: true, usos: 0, reset: 'largo', ...extra });

export const ESPECIES_NUEVAS = {
  'lib:aarakocra': { n: 'Aarakocra', vel: 30, vision: 0, src: 'Mordenkainen Presents: Monsters of the Multiverse (2022)', rasgos: [
    r('Vuelo', 'pasiva', 'Tienes una velocidad de vuelo igual a tu velocidad terrestre. No puedes usarla si llevas armadura media o pesada.'),
    r('Garras', 'pasiva', 'Tus golpes sin armas infligen 1d6 + Fuerza de daño Cortante en lugar de Contundente.'),
    r('Invocador de Viento', 'pasiva', 'A partir del nivel 3, puedes lanzar Ráfaga de viento gratis una vez al día (o usando tus propios espacios de magia).', { usos: 1, reset: 'largo' })
  ] },
  'lib:gnomo-profundidades': { n: 'Gnomo de las Profundidades (Svirfneblin)', vel: 30, vision: 120, src: 'Mordenkainen Presents: Monsters of the Multiverse (2022)', rasgos: [
    r('Tipo de criatura', 'pasiva', 'Eres un Humanoide. También cuentas como gnomo para cualquier requisito o efecto.'),
    r('Don de los Svirfneblin', 'pasiva', 'A partir del nivel 3 lanzas Disfrazarse gratis 1/día. A partir del nivel 5 lanzas Antidetección (NO ESTÁ EN LA APP) gratis 1/día sin usar componentes materiales. También puedes lanzarlos con tus propios espacios.'),
    r('Resistencia Mágica Gnoma', 'pasiva', 'Tienes Ventaja en todas las tiradas de salvación de Inteligencia, Sabiduría y Carisma contra conjuros.'),
    r('Camuflaje Svirfneblin', 'pasiva', 'Cuando haces una prueba de Sigilo, puedes hacerla con Ventaja. Recuperas usos tras descansar.', { usos: 'pb', reset: 'largo' })
  ] },
  'lib:duergar': { n: 'Duergar', vel: 30, vision: 120, src: 'Mordenkainen Presents: Monsters of the Multiverse (2022)', rasgos: [
    r('Tipo de criatura', 'pasiva', 'Eres un Humanoide. También cuentas como enano para cualquier requisito o efecto.'),
    r('Magia Duergar', 'pasiva', 'A partir del nivel 3 lanzas Agrandar/Reducir en ti mismo gratis 1/día sin componentes materiales. A nivel 5 lanzas Invisibilidad en ti mismo gratis 1/día sin componentes. También puedes lanzarlos con tus propios espacios.'),
    r('Resiliencia Enana', 'pasiva', 'Tienes Ventaja en las salvaciones para evitar o terminar la condición de Envenenado. Tienes Resistencia al daño de veneno.'),
    r('Fortaleza Psiónica', 'pasiva', 'Tienes Ventaja en las salvaciones para evitar o terminar las condiciones de Hechizado o Aturdido.')
  ] }
};

export const LINAJES_GEMA = [
  { key: 'amatista', n: 'Amatista', dano: 'Fuerza', texto: 'Tu Arma de Aliento y tu Resistencia Dracónica están vinculadas al daño de Fuerza.' },
  { key: 'cristal', n: 'Cristal', dano: 'Radiante', texto: 'Tu Arma de Aliento y tu Resistencia Dracónica están vinculadas al daño Radiante.' },
  { key: 'esmeralda', n: 'Esmeralda', dano: 'Psíquico', texto: 'Tu Arma de Aliento y tu Resistencia Dracónica están vinculadas al daño Psíquico.' },
  { key: 'zafiro', n: 'Zafiro', dano: 'Trueno', texto: 'Tu Arma de Aliento y tu Resistencia Dracónica están vinculadas al daño de Trueno.' },
  { key: 'topacio', n: 'Topacio', dano: 'Necrótico', texto: 'Tu Arma de Aliento y tu Resistencia Dracónica están vinculadas al daño Necrótico.' }
];

```

=== B ===

```json
[
  { "donde": "lib:aarakocra", "rasgo": "Invocador de Viento", "tipo": "usos", "usos": "1", "reset": "largo" },
  { "donde": "lib:aarakocra", "rasgo": "Garras", "tipo": "daño", "daño": "1d6 + FUE Cortante" },
  { "donde": "lib:gnomo-profundidades", "rasgo": "Camuflaje Svirfneblin", "tipo": "usos", "usos": "pb", "reset": "largo" },
  { "donde": "clase:clerigo", "rasgo": "Orden Divina", "tipo": "eleccion", "id": "orden-divina", "cuantas": "1",
    "opciones": [
      { "key": "orden-protector", "nombre": "Protector", "desc": "Ganas competencia en Armas Marciales y Armaduras Pesadas.", "nivel": 1, "requiere": null },
      { "key": "orden-taumaturgo", "nombre": "Taumaturgo", "desc": "Aprendes un truco extra de Clérigo y sumas tu Sabiduría a pruebas de Arcanos o Religión.", "nivel": 1, "requiere": null }
    ]
  },
  { "donde": "clase:druida", "rasgo": "Orden Primordial", "tipo": "eleccion", "id": "orden-primordial", "cuantas": "1",
    "opciones": [
      { "key": "orden-mago", "nombre": "Mago", "desc": "Aprendes un truco extra de Druida y sumas tu Sabiduría a pruebas de Arcanos o Naturaleza.", "nivel": 1, "requiere": null },
      { "key": "orden-guardian", "nombre": "Guardián", "desc": "Ganas competencia en Armas Marciales y Armaduras Medias.", "nivel": 1, "requiere": null }
    ]
  },
  { "donde": "clase:druida", "rasgo": "Forma Salvaje", "tipo": "eleccion", "id": "formas-conocidas", "cuantas": "4",
    "opciones": [
      { "key": "rata", "nombre": "Rata", "desc": "Tamaño Menudo. VD 0. Velocidad 20. Mordisco (+0, 1 p.).", "nivel": 2, "requiere": null },
      { "key": "caballo-monta", "nombre": "Caballo de Monta", "desc": "Tamaño Grande. VD 1/4. Velocidad 60. Pezuñas (+5, 2d4+3 cont.).", "nivel": 2, "requiere": null },
      { "key": "arana", "nombre": "Araña", "desc": "Tamaño Menudo. VD 0. Velocidad 20, Trepar 20. Mordisco (+4, 1 perf. + veneno).", "nivel": 2, "requiere": null },
      { "key": "lobo", "nombre": "Lobo", "desc": "Tamaño Mediano. VD 1/4. Velocidad 40. Mordisco (+4, 2d4+2 perf., derriba).", "nivel": 2, "requiere": null },
      { "key": "oso-pardo", "nombre": "Oso Pardo", "desc": "Tamaño Grande. VD 1. Velocidad 40. Mordisco (+6) y Garras (+6).", "nivel": 8, "requiere": null },
      { "key": "aguila", "nombre": "Águila", "desc": "Tamaño Pequeño. VD 0. Velocidad 10, Volar 60. Garras (+4, 1d4+2 cort.).", "nivel": 8, "requiere": null },
      { "key": "lobo-terrible", "nombre": "Lobo Terrible", "desc": "Tamaño Grande. VD 1. Velocidad 50. Mordisco (+5, 2d6+3 perf., derriba).", "nivel": 8, "requiere": null },
      { "key": "arana-gigante", "nombre": "Araña Gigante", "desc": "Tamaño Grande. VD 1. Velocidad 30, Trepar 30. Telaraña y Mordisco.", "nivel": 8, "requiere": null }
    ]
  },
  { "donde": "draconico", "rasgo": "Afinidad Elemental", "tipo": "eleccion", "id": "draconico-elemento", "cuantas": "1",
    "opciones": [
      { "key": "d-acido", "nombre": "Ácido", "desc": "Resistencia a Ácido; sumas CAR al daño de hechizos de Ácido.", "nivel": 6, "requiere": null },
      { "key": "d-frio", "nombre": "Frío", "desc": "Resistencia a Frío; sumas CAR al daño de hechizos de Frío.", "nivel": 6, "requiere": null },
      { "key": "d-fuego", "nombre": "Fuego", "desc": "Resistencia a Fuego; sumas CAR al daño de hechizos de Fuego.", "nivel": 6, "requiere": null },
      { "key": "d-rayo", "nombre": "Relámpago", "desc": "Resistencia a Relámpago; sumas CAR al daño de hechizos de Relámpago.", "nivel": 6, "requiere": null },
      { "key": "d-veneno", "nombre": "Veneno", "desc": "Resistencia a Veneno; sumas CAR al daño de hechizos de Veneno.", "nivel": 6, "requiere": null }
    ]
  },
  { "donde": "clase:mago", "rasgo": "Dominio de Conjuros", "tipo": "eleccion", "id": "mago-dominio", "cuantas": "2",
    "opciones": [
      { "key": "dom-niv1", "nombre": "Conjuro Nivel 1", "desc": "Elige un conjuro de Nv 1 de tu libro (1 Acción). Siempre preparado, lo lanzas gratis al nivel 1.", "nivel": 18, "requiere": null },
      { "key": "dom-niv2", "nombre": "Conjuro Nivel 2", "desc": "Elige un conjuro de Nv 2 de tu libro (1 Acción). Siempre preparado, lo lanzas gratis al nivel 2.", "nivel": 18, "requiere": null }
    ]
  },
  { "donde": "clase:mago", "rasgo": "Conjuros Distintivos", "tipo": "eleccion", "id": "mago-firma", "cuantas": "2",
    "opciones": [
      { "key": "firma-1", "nombre": "Conjuro Firma 1", "desc": "Elige un conjuro de Nv 3 de tu libro. Siempre preparado, gratis 1 vez por descanso.", "nivel": 20, "requiere": null },
      { "key": "firma-2", "nombre": "Conjuro Firma 2", "desc": "Elige un conjuro de Nv 3 de tu libro. Siempre preparado, gratis 1 vez por descanso.", "nivel": 20, "requiere": null }
    ]
  },
  { "donde": "clase:artifice", "rasgo": "Replicar Objeto Mágico", "tipo": "eleccion", "id": "artifice-infusiones", "cuantas": "4",
    "opciones": [
      { "key": "jarra-alquimia", "nombre": "Jarra de Alquimia", "desc": "Sin Sintonización.", "nivel": 2, "requiere": null },
      { "key": "bolsa-contencion", "nombre": "Bolsa de Contención", "desc": "Sin Sintonización.", "nivel": 2, "requiere": null },
      { "key": "gorro-respiracion", "nombre": "Gorro de Respiración Acuática", "desc": "Sin Sintonización.", "nivel": 2, "requiere": null },
      { "key": "gafas-noche", "nombre": "Gafas de Noche", "desc": "Sin Sintonización.", "nivel": 2, "requiere": null },
      { "key": "herramienta-multiple", "nombre": "Herramienta Múltiple", "desc": "Requiere Sintonización.", "nivel": 2, "requiere": null },
      { "key": "disparo-repeticion", "nombre": "Disparo de Repetición", "desc": "Requiere Sintonización.", "nivel": 2, "requiere": null },
      { "key": "arma-retorno", "nombre": "Arma de Retorno", "desc": "Sin Sintonización.", "nivel": 2, "requiere": null },
      { "key": "cuerda-escalar", "nombre": "Cuerda de Escalar", "desc": "Sin Sintonización.", "nivel": 2, "requiere": null },
      { "key": "piedras-envio", "nombre": "Piedras de Envío", "desc": "Sin Sintonización.", "nivel": 2, "requiere": null },
      { "key": "escudo-1", "nombre": "Escudo +1", "desc": "Sin Sintonización.", "nivel": 2, "requiere": null },
      { "key": "varita-deteccion", "nombre": "Varita de Detección Mágica", "desc": "Sin Sintonización.", "nivel": 2, "requiere": null },
      { "key": "varita-secretos", "nombre": "Varita de Secretos", "desc": "Sin Sintonización.", "nivel": 2, "requiere": null },
      { "key": "varita-mago-guerra", "nombre": "Varita del Mago de Guerra +1", "desc": "Requiere Sintonización.", "nivel": 2, "requiere": null },
      { "key": "arma-1", "nombre": "Arma +1", "desc": "Sin Sintonización.", "nivel": 2, "requiere": null },
      { "key": "vendas-poder-1", "nombre": "Vendas de Poder Desarmado +1", "desc": "Sin Sintonización.", "nivel": 2, "requiere": null },
      { "key": "armadura-1", "nombre": "Armadura +1", "desc": "Sin Sintonización.", "nivel": 6, "requiere": null },
      { "key": "botas-elficas", "nombre": "Botas Élficas", "desc": "Sin Sintonización.", "nivel": 6, "requiere": null },
      { "key": "botas-sendero", "nombre": "Botas del Sendero Sinuoso", "desc": "Requiere Sintonización.", "nivel": 6, "requiere": null },
      { "key": "capa-elfica", "nombre": "Capa Élfica", "desc": "Requiere Sintonización.", "nivel": 6, "requiere": null },
      { "key": "capa-manta", "nombre": "Capa de la Manta Raya", "desc": "Requiere Sintonización.", "nivel": 6, "requiere": null },
      { "key": "arma-deslumbrante", "nombre": "Arma Deslumbrante", "desc": "Requiere Sintonización.", "nivel": 6, "requiere": null },
      { "key": "ojos-encanto", "nombre": "Ojos de Encanto", "desc": "Requiere Sintonización.", "nivel": 6, "requiere": null },
      { "key": "ojos-vision", "nombre": "Ojos de Visión Minuciosa", "desc": "Sin Sintonización.", "nivel": 6, "requiere": null },
      { "key": "guantes-robo", "nombre": "Guantes de Robo", "desc": "Sin Sintonización.", "nivel": 6, "requiere": null },
      { "key": "yelmo-conciencia", "nombre": "Yelmo de Conciencia", "desc": "Sin Sintonización.", "nivel": 6, "requiere": null },
      { "key": "linterna-revelacion", "nombre": "Linterna de Revelación", "desc": "Sin Sintonización.", "nivel": 6, "requiere": null },
      { "key": "mente-afilada", "nombre": "Mente Afilada", "desc": "Requiere Sintonización.", "nivel": 6, "requiere": null },
      { "key": "collar-adaptacion", "nombre": "Collar de Adaptación", "desc": "Requiere Sintonización.", "nivel": 6, "requiere": null },
      { "key": "gaitas-embrujo", "nombre": "Gaitas del Embrujo", "desc": "Sin Sintonización.", "nivel": 6, "requiere": null },
      { "key": "escudo-repulsion", "nombre": "Escudo de Repulsión", "desc": "Sin Sintonización.", "nivel": 6, "requiere": null },
      { "key": "anillo-nado", "nombre": "Anillo de Nado", "desc": "Sin Sintonización.", "nivel": 6, "requiere": null },
      { "key": "anillo-caminar-agua", "nombre": "Anillo de Caminar por el Agua", "desc": "Sin Sintonización.", "nivel": 6, "requiere": null },
      { "key": "escudo-centinela", "nombre": "Escudo Centinela", "desc": "Sin Sintonización.", "nivel": 6, "requiere": null },
      { "key": "anillo-recarga", "nombre": "Anillo de Recarga de Conjuros", "desc": "Requiere Sintonización.", "nivel": 6, "requiere": null },
      { "key": "varita-proyectiles", "nombre": "Varita de Proyectiles Mágicos", "desc": "Sin Sintonización.", "nivel": 6, "requiere": null },
      { "key": "varita-telaranas", "nombre": "Varita de Telarañas", "desc": "Requiere Sintonización.", "nivel": 6, "requiere": null },
      { "key": "arma-advertencia", "nombre": "Arma de Advertencia", "desc": "Requiere Sintonización.", "nivel": 6, "requiere": null },
      { "key": "armadura-resistencia", "nombre": "Armadura de Resistencia", "desc": "Requiere Sintonización.", "nivel": 10, "requiere": null },
      { "key": "daga-veneno", "nombre": "Daga de Veneno", "desc": "Sin Sintonización.", "nivel": 10, "requiere": null },
      { "key": "cota-elfica", "nombre": "Cota Élfica", "desc": "Sin Sintonización.", "nivel": 10, "requiere": null },
      { "key": "anillo-caida", "nombre": "Anillo de Caída de Pluma", "desc": "Requiere Sintonización.", "nivel": 10, "requiere": null },
      { "key": "anillo-salto", "nombre": "Anillo de Salto", "desc": "Requiere Sintonización.", "nivel": 10, "requiere": null },
      { "key": "anillo-escudo-mental", "nombre": "Anillo de Escudo Mental", "desc": "Requiere Sintonización.", "nivel": 10, "requiere": null },
      { "key": "escudo-2", "nombre": "Escudo +2", "desc": "Sin Sintonización.", "nivel": 10, "requiere": null },
      { "key": "varita-guerra-2", "nombre": "Varita del Mago de Guerra +2", "desc": "Requiere Sintonización.", "nivel": 10, "requiere": null },
      { "key": "arma-2", "nombre": "Arma +2", "desc": "Sin Sintonización.", "nivel": 10, "requiere": null },
      { "key": "vendas-poder-2", "nombre": "Vendas de Poder Desarmado +2", "desc": "Sin Sintonización.", "nivel": 10, "requiere": null },
      { "key": "armadura-2", "nombre": "Armadura +2", "desc": "Sin Sintonización.", "nivel": 14, "requiere": null },
      { "key": "escudo-atrapaflechas", "nombre": "Escudo Atrapaflechas", "desc": "Requiere Sintonización.", "nivel": 14, "requiere": null },
      { "key": "lengua-fuego", "nombre": "Lengua de Fuego", "desc": "Requiere Sintonización.", "nivel": 14, "requiere": null },
      { "key": "anillo-accion", "nombre": "Anillo de Acción Libre", "desc": "Requiere Sintonización.", "nivel": 14, "requiere": null },
      { "key": "anillo-proteccion", "nombre": "Anillo de Protección", "desc": "Requiere Sintonización.", "nivel": 14, "requiere": null },
      { "key": "anillo-carnero", "nombre": "Anillo del Carnero", "desc": "Requiere Sintonización.", "nivel": 14, "requiere": null }
    ]
  },
  { "donde": "campeon", "rasgo": "Estilo de Combate Adicional", "tipo": "eleccion", "id": "campeon-estilo", "cuantas": "1",
    "opciones": [
      { "key": "est-arqueria", "nombre": "Tiro con Arco", "desc": "+2 ataques a distancia.", "nivel": 7, "requiere": null },
      { "key": "est-defensa", "nombre": "Defensa", "desc": "+1 CA con armadura.", "nivel": 7, "requiere": null },
      { "key": "est-duelo", "nombre": "Duelo", "desc": "+2 daño con arma a una mano.", "nivel": 7, "requiere": null },
      { "key": "est-armas-grandes", "nombre": "Armas Grandes", "desc": "Repite 1 y 2 en daño de armas a dos manos.", "nivel": 7, "requiere": null },
      { "key": "est-dos-armas", "nombre": "Dos Armas", "desc": "Suma mod daño al ataque con mano torpe.", "nivel": 7, "requiere": null },
      { "key": "est-ciegas", "nombre": "Lucha a Ciegas", "desc": "Visión ciega 10 pies.", "nivel": 7, "requiere": null },
      { "key": "est-intercepcion", "nombre": "Intercepción", "desc": "Reduce daño de un aliado a 5 pies.", "nivel": 7, "requiere": null },
      { "key": "est-proteccion", "nombre": "Protección", "desc": "Impón desventaja a ataque contra aliado.", "nivel": 7, "requiere": null },
      { "key": "est-arrojadizas", "nombre": "Armas Arrojadizas", "desc": "+2 daño armas arrojadizas.", "nivel": 7, "requiere": null },
      { "key": "est-desarmado", "nombre": "Combate Desarmado", "desc": "Daño desarmado a 1d6 o 1d8.", "nivel": 7, "requiere": null }
    ]
  },
  { "donde": "colegio-luna", "rasgo": "Saber Primigenio", "tipo": "eleccion", "id": "luna-habilidades", "cuantas": "1",
    "opciones": [
      { "key": "luna-animales", "nombre": "Trato con Animales", "desc": "Competencia.", "nivel": 3, "requiere": null },
      { "key": "luna-perspicacia", "nombre": "Perspicacia", "desc": "Competencia.", "nivel": 3, "requiere": null },
      { "key": "luna-medicina", "nombre": "Medicina", "desc": "Competencia.", "nivel": 3, "requiere": null },
      { "key": "luna-naturaleza", "nombre": "Naturaleza", "desc": "Competencia.", "nivel": 3, "requiere": null },
      { "key": "luna-percepcion", "nombre": "Percepción", "desc": "Competencia.", "nivel": 3, "requiere": null },
      { "key": "luna-supervivencia", "nombre": "Supervivencia", "desc": "Competencia.", "nivel": 3, "requiere": null }
    ]
  }
]

```

=== C ===

```json
{
  "lib:aarakocra": "Mordenkainen Presents: Monsters of the Multiverse (2022)",
  "lib:gnomo-profundidades": "Mordenkainen Presents: Monsters of the Multiverse (2022)",
  "lib:duergar": "Mordenkainen Presents: Monsters of the Multiverse (2022)"
}

```

=== D ===

```json
{
  "lib:aarakocra": "Pueblo aviario originario del Plano Elemental del Aire, rápidos exploradores que surcan los cielos y atacan con afiladas garras.",
  "lib:gnomo-profundidades": "Habitantes estoicos y resistentes de la Infraoscuridad, expertos en camuflarse entre las rocas y proteger su mente de encantamientos.",
  "lib:duergar": "Enanos severos que sobrevivieron a horrores subterráneos adaptándose mediante magia innata de crecimiento y sigilo."
}

```

=== E ===

* **Falta un selector explícito para los trucos:** El rasgo del Colegio de la Luna (Saber Primigenio) pide seleccionar un truco de Druida. La app actual no tiene una estructura de selector "eleccion" que filtre todos los trucos de druida, por lo que asumo que eso se resuelve a nivel de interfaz de inventario de conjuros (al igual que con Orden Divina/Primordial). Creé el selector de "eleccion" para la *Habilidad* que ese rasgo también permite escoger.
* **Forma Salvaje:** Creé el selector estricto con las 8 bestias de ejemplo (todas existen en SRD/Manual Base). La progresión marca VD 1 a nivel 8, coincidiendo con la capacidad de Volar.
* **Selectores Mago:** Como la instrucción es literal a los selectores faltantes y se referenció Dominio de Conjuros/Firma, armé opciones abstractas para la interfaz.
* **Dracónidos de Gema:** Su mecánica de telepatía (Mente Psiónica) no consume acción, es un efecto pasivo.
* **Pluralidad Artífice:** Añadidos todos los Planos (Infusiones de Replicar) extraídos tal cual de la tabla proporcionada, dividiéndolos con la restricción de Nivel (2, 6, 10, 14) correspondiente en el JSON. Se utilizó la traducción oficial general (Ej: *Cofre oculto de Leomund*, *Bolsa de contención*).
* **Traducciones:** El rasgo de gnomo de lanzar Nondetection se marcó como *(NO ESTÁ EN LA APP)* porque Nondetection no tiene un equivalente entre el listado exacto proporcionado (probablemente fue excluido del compendio acotado).
* **Campeón:** Añadido un selector completo con todos los Estilos de Combate base del PHB 2024 para el rasgo del nivel 7.