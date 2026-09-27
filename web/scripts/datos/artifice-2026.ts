/* Artífice de la biblioteca (lib:arcanista): subclases publicadas después del lote 2.
   Reanimador de Ravenloft: The Horrors Within (2026). Textos propios en español; números y selectores en reglas-revisadas.ts.
   Lo aplica scripts/actualizar-clase.ts (opción "artifice"), sin tocar las demás subclases. */

const r = (n: number, nombre: string, t: string, texto: string, extra: Record<string, unknown> = {}) => ({ nombre, t, texto, n, manual: true, usos: 0, reset: 'largo', ...extra });

export const ARTIFICE_2026 = {
  subclases: {
    reanimador: { n: 'Reanimador', rasgos: [
      r(3, 'Conjuros de Reanimador', 'pasiva', 'Siempre tienes preparados: Falsa vida, Piedad con los moribundos, Saeta de bruja (nivel 3); Sordera/Ceguera, Potenciar característica (5); Animar a los muertos, Relámpago (9); Marchitar, Guarda contra la Muerte (13); Caparazón antivida, Alzar a los muertos (17).'),
      r(3, 'Oficio de Reanimador', 'pasiva', 'Competencia con suministros de alquimista (u otras herramientas de artesano si ya la tenías). Al lanzar Piedad con los moribundos puedes dar una descarga que devuelve al objetivo tantos PG como tu nivel de artífice y daña con relámpago a quienes elijas a su alrededor; tantas veces como tu INT por descanso largo.'),
      r(3, 'Compañero Reanimado', 'accion', 'Con una acción mágica y tus herramientas creas un compañero muerto viviente a 5 pies que te obedece hasta tu siguiente descanso largo o hasta que lo despidas. Actúa en tu turno y solo Esquiva salvo que le des una orden con tu acción adicional. Si mueres, estalla. Una vez por descanso largo, o gastando un espacio de conjuro; solo uno a la vez.', { usos: 1, reset: 'largo' }),
      r(5, 'Modificaciones Extrañas', 'pasiva', 'Al crear a tu compañero eliges una modificación: Conducto Arcano (lanzas conjuros desde su espacio y, una vez por turno, sumas tu INT al daño de un conjuro de evocación o nigromancia) o Ferocidad (su Zarpazo hace 1d6).'),
      r(9, 'Reanimación Mejorada', 'pasiva', 'El Estallido mortal de tu compañero hace 4d4, y su daño necrótico ignora la resistencia.'),
      r(9, 'Modificaciones Macabras', 'pasiva', 'Tu compañero gana dos modificaciones en lugar de una, y puedes elegir también Hinchado (Grande, empuja 10 pies al acertar y suma tu INT al estallido), Enjuto (45 pies de velocidad, trepa por techos y asusta a quien empiece su turno a 10 pies) o Viscoso (nada, se cuela por huecos de una pulgada y quien le acierte a 10 pies recibe ácido igual a tu INT).'),
      r(15, 'Reanimación Perfeccionada', 'pasiva', 'Una vez por descanso largo lanzas Alzar a los muertos sin espacio ni componentes materiales. Cuando tú o tu compañero recibís daño, con tu reacción ganas tantos PG como los que le queden y él muere (y estalla). Tu compañero gana tres modificaciones.', { usos: 1, reset: 'largo' }),
    ] },
  },
};
