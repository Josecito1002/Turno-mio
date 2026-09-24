/* eslint-disable */
// @ts-nocheck -- datos portados tal cual de index.html


export const COMUNES: Record<string, any> = {
  accion:[
    ['Atacar', c => `Un ataque con arma o golpe sin armas${c.extraAttack ? ' (dos con Ataque Extra)' : ''}. Un golpe sin armas también puede Agarrar o Empujar: salvación de FUE o DES contra CD ${c.grappleDC}.`],
    ['Correr', c => `Ganas ${c.speed} pies más de movimiento.`],
    ['Destrabarse', () => 'Tu movimiento no provoca ataques de oportunidad este turno.'],
    ['Esquivar', () => 'Hasta tu próximo turno, los ataques contra ti tienen desventaja y tus salvaciones de DES ventaja.'],
    ['Ayudar', () => 'Das ventaja a un aliado en su siguiente prueba, o en su siguiente ataque contra un enemigo a 5 pies de ti.'],
    ['Esconderse', () => 'Prueba de Sigilo CD 15 fuera de la vista de los enemigos.'],
    ['Influir', () => 'Prueba de CAR (o Trato con Animales) para convencer a alguien.'],
    ['Magia', () => 'Lanzas un conjuro, usas un objeto mágico o un rasgo mágico.'],
    ['Preparar', () => 'Eliges un disparador y una acción; la haces con tu reacción cuando ocurra.'],
    ['Buscar', () => 'Prueba de SAB: Percepción, Perspicacia, Medicina o Supervivencia.'],
    ['Estudiar', () => 'Prueba de INT: Arcanos, Historia, Investigación, Naturaleza o Religión.'],
    ['Usar un objeto', () => 'Usas un objeto no mágico: cuerda, botiquín, palanca.'],
  ],
  adicional:[['Beber o dar una poción', () => 'En 2024 tomar una poción, o dársela a alguien a 5 pies, es acción adicional.']],
  reaccion:[['Ataque de oportunidad', () => 'Cuando un enemigo que ves sale de tu alcance, le haces un ataque cuerpo a cuerpo.']],
  gratis:[
    ['Moverte', c => `Hasta ${c.speed} pies, repartidos antes, entre y después de tus acciones.`],
    ['Interactuar con un objeto', () => 'Uno gratis por turno: desenvainar, abrir una puerta, recoger algo.'],
  ],
};
export const FULL_SLOTS: any[] = [[2],[3],[4,2],[4,3],[4,3,2],[4,3,3],[4,3,3,1],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2,1],[4,3,3,3,2,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]];
