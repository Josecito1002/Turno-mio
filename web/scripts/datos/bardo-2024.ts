/* Bardo de la biblioteca (rasgos de nivel alto y subclases) puesto al día: Manual del Jugador 2024,
   Colegio de la Luna de Heroes of Faerûn (2025) y Colegio de los Espíritus de Ravenloft (2025).
   Textos propios en español; `manual: true` = tipo revisado. Números, opciones y selectores en reglas-revisadas.ts.
   Cuando el rasgo es el mismo, se conserva el nombre que ya tenía la biblioteca. */

const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const BARDO_2024 = {
  rasgosAltos: [
    r(7, 'Contraencanto', 'reaccion', 'Cuando tú o una criatura a 30 pies falla una salvación contra quedar Hechizado o Asustado, hacéis que se repita con ventaja.'),
    r(9, 'Pericia Adicional', 'pasiva', 'Pericia en dos habilidades más en las que seas competente (elígelas en Habilidades).'),
    r(10, 'Secretos Mágicos', 'pasiva', 'Cuando tu número de conjuros preparados sube, puedes elegir los nuevos de las listas de bardo, clérigo, druida y mago; cuentan como conjuros de bardo. Al cambiar un conjuro preparado también puedes elegirlo de esas listas.'),
    r(18, 'Inspiración Superior', 'gratis', 'Al tirar iniciativa, si te quedan menos de dos usos de Inspiración Bárdica, recuperas hasta tener dos.'),
    r(20, 'Palabras de Creación', 'pasiva', 'Siempre tienes preparados Palabra de poder: sanar y Palabra de poder: matar, y al lanzarlos puedes afectar a una segunda criatura a 10 pies de la primera.'),
  ],
  subclases: {
    'colegio-conocimiento': { n: 'Colegio del Conocimiento', rasgos: [
      r(3, 'Competencias Adicionales', 'pasiva', 'Competencia en tres habilidades a tu elección (márcalas en Habilidades).', { habsElegir: 3 }),
      r(3, 'Palabras Cortantes', 'reaccion', 'Cuando una criatura que ves a 60 pies hace una tirada de daño o acierta una prueba o un ataque, gastas una Inspiración Bárdica y restas el dado a su tirada.'),
      r(6, 'Descubrimientos Mágicos', 'pasiva', 'Aprendes dos conjuros de las listas de clérigo, druida o mago (trucos o de un nivel que puedas lanzar); siempre los tienes preparados. Al subir de nivel puedes cambiar uno.'),
      r(14, 'Habilidad Inigualable', 'gratis', 'Cuando fallas una prueba de característica o un ataque, gastas una Inspiración Bárdica y sumas el dado al d20; si aun así fallas, no se gasta.'),
    ] },
    'colegio-valor': { n: 'Colegio del Valor', rasgos: [
      r(3, 'Competencias de Combate', 'pasiva', 'Competencia con armas marciales y entrenamiento con armaduras medias y escudos. Puedes usar un arma sencilla o marcial como foco de tus conjuros de bardo.'),
      r(3, 'Inspiración de Combate', 'pasiva', 'Quien tiene un dado de tu Inspiración Bárdica puede usarlo para defenderse o para hacer más daño.'),
      r(6, 'Ataque Extra', 'pasiva', 'Cuando usas la acción Atacar, atacas dos veces, y puedes cambiar uno de esos ataques por un truco que se lance con una acción.'),
      r(14, 'Magia de Batalla', 'adicional', 'Después de lanzar un conjuro que se lanza con una acción, haces un ataque con arma.'),
    ] },
    'colegio-glamour': { n: 'Colegio del Glamour', rasgos: [
      r(3, 'Manto de Inspiración', 'adicional', 'Gastas una Inspiración Bárdica: criaturas que elijas a 60 pies ganan PG temporales y se mueven con su reacción sin provocar ataques de oportunidad.'),
      r(3, 'Magia Seductora', 'pasiva', 'Siempre tienes preparados Hechizar persona e Imagen múltiple. Tras lanzar un conjuro de encantamiento o ilusión con un espacio, puedes hechizar o asustar a una criatura a 60 pies.'),
      r(6, 'Manto de Majestad', 'adicional', 'Lanzas Orden imperiosa sin gastar espacio y, durante 1 minuto (concentración), puedes volver a lanzarla con acción adicional sin espacio; quien tengas Hechizado falla la salvación. Una vez por descanso largo, o gastando un espacio de nivel 3 o más.', { usos: 1, reset: 'largo' }),
      r(14, 'Majestad Inquebrantable', 'adicional', 'Durante 1 minuto, la primera vez en cada turno que un ataque te acierta, el atacante hace una salvación de CAR o falla. Una vez por descanso corto o largo.', { usos: 1, reset: 'corto' }),
    ] },
    'colegio-danza': { n: 'Colegio de la Danza', rasgos: [
      r(3, 'Juego de Pies Deslumbrante', 'pasiva', 'Sin armadura ni escudo: tu CA base es 10 + DES + CAR, tus golpes sin armas usan DES y hacen tu dado de Inspiración Bárdica + DES, y cuando gastas una Inspiración Bárdica en una acción, acción adicional o reacción, haces además un golpe sin armas. Ventaja en Interpretación al bailar.'),
      r(6, 'Movimiento Inspirador', 'reaccion', 'Cuando un enemigo que ves termina su turno a 5 pies, gastas una Inspiración Bárdica, te mueves hasta la mitad de tu velocidad y un aliado a 30 pies también puede moverse con su reacción; nada de esto provoca ataques de oportunidad.'),
      r(6, 'Juego de Pies en Tándem', 'gratis', 'Al tirar iniciativa, si no estás Incapacitado, gastas una Inspiración Bárdica: tú y los aliados a 30 pies que te vean u oigan sumáis el dado a la iniciativa.'),
      r(14, 'Evasión Guía', 'pasiva', 'Si una salvación de DES te deja recibir la mitad del daño, no recibes nada si la pasas y la mitad si la fallas; puedes compartirlo con quienes hagan la misma salvación a 5 pies.'),
    ] },
    'colegio-luna': { n: 'Colegio de la Luna', rasgos: [
      r(3, 'Inspiración de la Luna', 'pasiva', 'El poder de la luna mejora tu Inspiración Bárdica: Eclipse Inspirador y Vitalidad Lunar.'),
      r(3, 'Saber Primigenio', 'pasiva', 'Aprendes druídico y un truco de druida que no cuenta en tu límite (puedes cambiarlo al subir de nivel), y competencia en Trato con Animales, Perspicacia, Medicina, Naturaleza, Percepción o Supervivencia (márcala en Habilidades).', { habsElegir: 1 }),
      r(6, 'Bendición de la Luz de Luna', 'pasiva', 'Siempre tienes preparado Rayo de luna. Una vez por descanso largo, al lanzarlo brillas con luz tenue y, cada vez que alguien falla la salvación contra él, otra criatura que elijas a 60 pies recupera 2d4 PG.', { usos: 1, reset: 'largo' }),
      r(14, 'Esplendor del Crepúsculo', 'pasiva', 'Con Eclipse Inspirador, quien recibe el dado también se vuelve invisible y se teletransporta 30 pies con su reacción. Con Vitalidad Lunar puedes tirar 1d6 en vez de gastar una Inspiración Bárdica.'),
    ] },
    'colegio-espiritus': { n: 'Colegio de los Espíritus', rasgos: [
      r(3, 'Canalizador', 'pasiva', 'Conoces el truco Guía, con alcance de 60 pies. Ganas una baraja (juego) con competencia y puedes usarla como foco de tus conjuros de bardo, igual que un orbe, un cristal, una vela o una pluma.'),
      r(3, 'Espíritus del Más Allá', 'pasiva', 'Al dar un dado de Inspiración Bárdica con acción adicional, canalizas un espíritu al azar (tira el dado en la tabla); queda canalizado hasta que lo liberes o hasta un descanso.'),
      r(6, 'Canalización Potenciada', 'pasiva', 'Una vez por turno, al lanzar con un espacio un conjuro de bardo que daña o cura, sumas 1d6. Siempre tienes preparado Espíritus guardianes y lo lanzas una vez por descanso largo sin espacio; una vez por descanso corto o largo, al lanzarlo tú y tus aliados en su área tenéis cobertura.', { usos: 1, reset: 'largo' }),
      r(14, 'Conexión Mística', 'pasiva', 'Al tirar en la tabla de Espíritus del Más Allá tiras dos veces y eliges; si sacas el mismo número, eliges cualquier espíritu.'),
    ] },
  },
};
