import { gql } from '@/shared/graphql/cliente';
import type { Entrega, ObjetoEntregado } from './domain/entregas';

export const QUERY_CAMPANAS = /* GraphQL */ `campanas { id nombre datos codigo unidos }`;
export type CampanaServidor = { id: string; nombre: string; datos: Record<string, unknown>; codigo: string | null; unidos: number | null };

export const guardarCampana = (c: { id: string; nombre: string; datos: unknown }, keepalive = false) =>
  gql(`mutation ($id: ID!, $nombre: String!, $datos: JSON!) { guardarCampana(id: $id, nombre: $nombre, datos: $datos) { id } }`, c, { keepalive });

export const borrarCampana = (id: string) => gql(`mutation ($id: ID!) { borrarCampana(id: $id) }`, { id });

/* ---- Código de mesa: el DM lo comparte y los jugadores unen sus personajes ---- */
export type PersonajeEnMesa = { jugadorId: string; jugador: string; personajeId: string; nombre: string; resumen: string | null; datos: Record<string, unknown>; actualizadoEn: string };
export type MesaUnida = { dmId: string; campanaId: string; mesa: string; dm: string; personajeId: string; personaje: string; descripcion?: string | null; imagen?: string | null; activo?: boolean | null };
const CAMPOS_MESA = 'dmId campanaId mesa dm personajeId personaje descripcion imagen activo';
export type CompaneroMesa = { jugador: string; personajeId: string; nombre: string; resumen: string | null };

export const codigoMesa = (campanaId: string, nuevo = false) =>
  gql<{ codigoMesa: string }>(`mutation ($campanaId: ID!, $nuevo: Boolean) { codigoMesa(campanaId: $campanaId, nuevo: $nuevo) }`, { campanaId, nuevo })
    .then(d => d.codigoMesa);

export const jugadoresMesa = (campanaId: string) =>
  gql<{ jugadoresMesa: PersonajeEnMesa[] }>(`query ($campanaId: ID!) { jugadoresMesa(campanaId: $campanaId) { jugadorId jugador personajeId nombre resumen datos actualizadoEn } }`, { campanaId })
    .then(d => d.jugadoresMesa);

export const quitarDeMesa = (campanaId: string, jugadorId: string, personajeId: string) =>
  gql(`mutation ($campanaId: ID!, $jugadorId: ID!, $personajeId: ID!) { quitarDeMesa(campanaId: $campanaId, jugadorId: $jugadorId, personajeId: $personajeId) }`, { campanaId, jugadorId, personajeId });

export const unirseMesa = (codigo: string, personajeId: string) =>
  gql<{ unirseMesa: MesaUnida }>(`mutation ($codigo: String!, $personajeId: ID!) { unirseMesa(codigo: $codigo, personajeId: $personajeId) { ${CAMPOS_MESA} } }`, { codigo, personajeId })
    .then(d => d.unirseMesa);

export const misMesas = () => gql<{ misMesas: MesaUnida[] }>(`{ misMesas { ${CAMPOS_MESA} } }`).then(d => d.misMesas);

export const companerosMesa = (dmId: string, campanaId: string) =>
  gql<{ companerosMesa: CompaneroMesa[] }>(`query ($dmId: ID!, $campanaId: ID!) { companerosMesa(dmId: $dmId, campanaId: $campanaId) { jugador personajeId nombre resumen } }`, { dmId, campanaId })
    .then(d => d.companerosMesa);

export const hojaCompaneroMesa = (dmId: string, campanaId: string, personajeId: string) =>
  gql<{ hojaCompaneroMesa: unknown }>(`query ($dmId: ID!, $campanaId: ID!, $personajeId: ID!) { hojaCompaneroMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId) }`, { dmId, campanaId, personajeId })
    .then(d => d.hojaCompaneroMesa);

export const salirMesa = (m: { dmId: string; campanaId: string; personajeId: string }) =>
  gql(`mutation ($dmId: ID!, $campanaId: ID!, $personajeId: ID!) { salirMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId) }`, m);

/* ---- Combate en vivo: el DM publica ronda, turno y orden; cada jugador gasta su acción, adicional y reacción ---- */
export type TipoAccionRonda = 'accion' | 'adicional' | 'reaccion';
export type EconomiaRonda = Partial<Record<TipoAccionRonda, boolean>>;
/** Tipo de daño y duración en rondas de lo que deja un golpe (hasta: termina al empezar el turno de `k` en la ronda `ronda`). */
/** El tipo de daño, cuántas rondas dura lo que deja (y hasta qué ronda y turno) y la concentración de la que depende */
export type ExtrasGolpe = { tipoDano?: string; rondas?: number; hasta?: { ronda: number; k: string }; conc?: string;
  /** Quien queda afectado repite la salvación al final de cada uno de sus turnos */
  repite?: boolean };
/** Lo mismo al enviarlo: la duración va en tres campos */
export type Extras = { tipoDano?: string; rondas?: number; hastaRonda?: number; hastaK?: string; conc?: string; repite?: boolean };
const EXTRAS_VARS = ', $tipoDano: String, $rondas: Int, $hastaRonda: Int, $hastaK: String, $conc: String, $repite: Boolean';
const EXTRAS_ARGS = ', tipoDano: $tipoDano, rondas: $rondas, hastaRonda: $hastaRonda, hastaK: $hastaK, conc: $conc, repite: $repite';
export type Golpe = { id: string; de: string; objetivo: string; dano: number; cura?: boolean; condicion: string | null; bono?: string | null; nota: string | null; ts: string } & ExtrasGolpe;
/** Lo que los jugadores saben de un enemigo: lo básico, o también sus resistencias y debilidades. */
export type InfoEnemigo = { nivel: 'b' | 'd'; ca: number; tam?: string; tipo?: string; resist?: string; vuln?: string; inmune?: string; condInmune?: string };
export type Peticion = { id: string; de: string; pid: string; objetivo: string; ts: string };
export type Salvacion = { id: string; de: string; pid?: string; objetivos: string[]; salv: string; cd: number; dano: number; mitad: boolean; condicion: string | null; nota: string | null; ts: string } & ExtrasGolpe;
/** Un descanso o inspiración del DM, o un efecto que otro jugador deja en este personaje (daño, curación, condición o bono). */
export type OrdenDm = { id: string; tipo: 'corto' | 'largo' | 'inspiracion' | 'efecto' | 'salvacion' | 'aviso' | 'finConc'; personajeId: string | null; ts: string;
  de?: string; dano?: number; cura?: boolean; condicion?: string | null; bono?: string | null; nota?: string | null;
  /** Una salvación que pide el DM: característica (fue, des…), CD y si el daño se reduce a la mitad al superarla */
  salv?: string; cd?: number; mitad?: boolean;
  /** Repite la salvación al final de su turno: si la supera, se libra de la condición */
  librarse?: boolean } & ExtrasGolpe;
/** Lo que respondió un jugador a la salvación que le pidió el DM (ya aplicado en su hoja). */
export type RespuestaSalvacion = { id: string; pedido: string; pid: string; de: string; total: number; supero: boolean; dano: number; condicion: string | null; ts: string; salv?: string; cd?: number } & ExtrasGolpe;
export type CombateVivo = {
  activo?: boolean; ronda?: number; turno?: number;
  /** Quién actúa y en qué orden; `pid` es el id del personaje cuando es de un jugador unido. */
  orden?: { k: string; nombre: string; tipo: string; pid?: string; cond?: string[]; dur?: Record<string, string>; ven?: '' | 'v' | 'd'; info?: InfoEnemigo }[];
  /** Peticiones de los jugadores para saber de un enemigo; las resuelve el DM. */
  peticiones?: Peticion[];
  economia?: Record<string, EconomiaRonda>;
  /** Golpes que mandaron los jugadores y el DM todavía no aplica. */
  golpes?: Golpe[];
  /** Tiradas de salvación que los enemigos deben hacer, pedidas por los jugadores. */
  salvaciones?: Salvacion[];
  /** Descansos e inspiración que mandó el DM. */
  ordenes?: OrdenDm[];
  /** Salvaciones que el DM pidió a los jugadores, ya resueltas por ellos. */
  respuestas?: RespuestaSalvacion[];
  /** Lo último que hizo cada jugador (por id de personaje). */
  ultimas?: Record<string, { tipo: TipoAccionRonda; nombre: string; resumen: string; ts: string }>;
  actualizadoEn?: string;
} | null;

export const fijarCombateVivo = (campanaId: string, datos: unknown, reiniciarEconomia = false) =>
  gql(`mutation ($campanaId: ID!, $datos: JSON!, $r: Boolean) { fijarCombateVivo(campanaId: $campanaId, datos: $datos, reiniciarEconomia: $r) }`, { campanaId, datos, r: reiniciarEconomia });

export const combateVivoDm = (campanaId: string) =>
  gql<{ combateVivo: CombateVivo }>(`query ($campanaId: ID!) { combateVivo(campanaId: $campanaId) }`, { campanaId }).then(d => d.combateVivo);

export const combateMesa = (m: { dmId: string; campanaId: string; personajeId: string }) =>
  gql<{ combateMesa: CombateVivo }>(`query ($dmId: ID!, $campanaId: ID!, $personajeId: ID!) { combateMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId) }`, m).then(d => d.combateMesa);

export const gastarAccionMesa = (m: { dmId: string; campanaId: string; personajeId: string }, tipo: TipoAccionRonda, gastado: boolean) =>
  gql(`mutation ($dmId: ID!, $campanaId: ID!, $personajeId: ID!, $tipo: String!, $gastado: Boolean!) { gastarAccionMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId, tipo: $tipo, gastado: $gastado) }`, { ...m, tipo, gastado });

export const enviarGolpeMesa = (m: { dmId: string; campanaId: string; personajeId: string }, g: { objetivo: string; dano: number; cura?: boolean; condicion?: string; bono?: string; nota?: string } & Extras) =>
  gql(`mutation ($dmId: ID!, $campanaId: ID!, $personajeId: ID!, $objetivo: String!, $dano: Int!, $cura: Boolean, $condicion: String, $bono: String, $nota: String${EXTRAS_VARS}) { enviarGolpeMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId, objetivo: $objetivo, dano: $dano, cura: $cura, condicion: $condicion, bono: $bono, nota: $nota${EXTRAS_ARGS}) }`, { ...m, ...g });

export const pedirInfoMesa = (m: { dmId: string; campanaId: string; personajeId: string }, objetivo: string) =>
  gql(`mutation ($dmId: ID!, $campanaId: ID!, $personajeId: ID!, $objetivo: String!) { pedirInfoMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId, objetivo: $objetivo) }`, { ...m, objetivo });

export const quitarPeticiones = (campanaId: string, ids: string[]) =>
  gql(`mutation ($campanaId: ID!, $ids: [String!]!) { quitarPeticiones(campanaId: $campanaId, ids: $ids) }`, { campanaId, ids });

export const confirmarGolpes = (campanaId: string, ids: string[]) =>
  gql(`mutation ($campanaId: ID!, $ids: [String!]!) { confirmarGolpes(campanaId: $campanaId, ids: $ids) }`, { campanaId, ids });

export const fijarAccionDm = (campanaId: string, clave: string, tipo: TipoAccionRonda, gastado: boolean) =>
  gql(`mutation ($campanaId: ID!, $clave: String!, $tipo: String!, $gastado: Boolean!) { fijarAccionDm(campanaId: $campanaId, clave: $clave, tipo: $tipo, gastado: $gastado) }`, { campanaId, clave, tipo, gastado });

export const usarAccionMesa = (m: { dmId: string; campanaId: string; personajeId: string }, tipo: TipoAccionRonda, nombre: string, resumen?: string) =>
  gql(`mutation ($dmId: ID!, $campanaId: ID!, $personajeId: ID!, $tipo: String!, $nombre: String!, $resumen: String) { usarAccionMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId, tipo: $tipo, nombre: $nombre, resumen: $resumen) }`, { ...m, tipo, nombre, resumen });

export const enviarSalvacionMesa = (m: { dmId: string; campanaId: string; personajeId: string }, s: { objetivos: string[]; salv: string; cd: number; dano: number; mitad: boolean; condicion?: string; nota?: string } & Extras) =>
  gql(`mutation ($dmId: ID!, $campanaId: ID!, $personajeId: ID!, $objetivos: [String!]!, $salv: String!, $cd: Int!, $dano: Int!, $mitad: Boolean!, $condicion: String, $nota: String${EXTRAS_VARS}) { enviarSalvacionMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId, objetivos: $objetivos, salv: $salv, cd: $cd, dano: $dano, mitad: $mitad, condicion: $condicion, nota: $nota${EXTRAS_ARGS}) }`, { ...m, ...s });

export const resolverSalvacion = (campanaId: string, id: string, clave: string) =>
  gql(`mutation ($campanaId: ID!, $id: String!, $clave: String!) { resolverSalvacion(campanaId: $campanaId, id: $id, clave: $clave) }`, { campanaId, id, clave });

export const enviarEfectoDm = (campanaId: string, personajeId: string, e: { de: string; dano: number; cura?: boolean; condicion?: string; nota?: string } & Extras) =>
  gql(`mutation ($campanaId: ID!, $personajeId: ID!, $de: String!, $dano: Int!, $cura: Boolean, $condicion: String, $nota: String${EXTRAS_VARS}) { enviarEfectoDm(campanaId: $campanaId, personajeId: $personajeId, de: $de, dano: $dano, cura: $cura, condicion: $condicion, nota: $nota${EXTRAS_ARGS}) }`, { campanaId, personajeId, ...e });
export const enviarOrdenDm = (campanaId: string, tipo: OrdenDm['tipo'], personajeId?: string) =>
  gql(`mutation ($campanaId: ID!, $tipo: String!, $personajeId: ID) { enviarOrdenDm(campanaId: $campanaId, tipo: $tipo, personajeId: $personajeId) }`, { campanaId, tipo, personajeId });

/* ---- Objetos que el DM da a los personajes de su mesa ---- */
export const darObjetoDm = (campanaId: string, personajeId: string, objeto: ObjetoEntregado) =>
  gql(`mutation ($campanaId: ID!, $personajeId: ID!, $objeto: JSON!) { darObjetoDm(campanaId: $campanaId, personajeId: $personajeId, objeto: $objeto) }`, { campanaId, personajeId, objeto });

export const entregasMesa = (m: { dmId: string; campanaId: string; personajeId: string }) =>
  gql<{ entregasMesa: Entrega[] }>(`query ($dmId: ID!, $campanaId: ID!, $personajeId: ID!) { entregasMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId) }`, m)
    .then(d => d.entregasMesa || []);

export const recibirEntregas = (m: { dmId: string; campanaId: string; personajeId: string }, ids: string[]) =>
  gql(`mutation ($dmId: ID!, $campanaId: ID!, $personajeId: ID!, $ids: [String!]!) { recibirEntregas(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId, ids: $ids) }`, { ...m, ids });

/* ---- Salvaciones que el DM pide a un jugador: le salen en grande y él responde ---- */
export const pedirSalvacionDm = (campanaId: string, personajeId: string, p: { de: string; salv: string; cd: number; dano: number; mitad: boolean; condicion?: string; nota?: string; librarse?: boolean } & Extras) =>
  gql(`mutation ($campanaId: ID!, $personajeId: ID!, $de: String!, $salv: String!, $cd: Int!, $dano: Int!, $mitad: Boolean!, $condicion: String, $nota: String, $librarse: Boolean${EXTRAS_VARS}) { pedirSalvacionDm(campanaId: $campanaId, personajeId: $personajeId, de: $de, salv: $salv, cd: $cd, dano: $dano, mitad: $mitad, condicion: $condicion, nota: $nota, librarse: $librarse${EXTRAS_ARGS}) }`, { campanaId, personajeId, ...p });
export const avisarJugadorDm = (campanaId: string, personajeId: string, texto: string) =>
  gql(`mutation ($campanaId: ID!, $personajeId: ID!, $texto: String!) { avisarJugadorDm(campanaId: $campanaId, personajeId: $personajeId, texto: $texto) }`, { campanaId, personajeId, texto });
export const responderSalvacionMesa = (m: { dmId: string; campanaId: string; personajeId: string }, r: { pedido: string; total: number; supero: boolean; dano: number; condicion?: string; salv?: string; cd?: number } & Omit<Extras, 'tipoDano'>) =>
  gql(`mutation ($dmId: ID!, $campanaId: ID!, $personajeId: ID!, $pedido: String!, $total: Int!, $supero: Boolean!, $dano: Int!, $condicion: String, $rondas: Int, $hastaRonda: Int, $hastaK: String, $conc: String, $repite: Boolean, $salv: String, $cd: Int) { responderSalvacionMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId, pedido: $pedido, total: $total, supero: $supero, dano: $dano, condicion: $condicion, rondas: $rondas, hastaRonda: $hastaRonda, hastaK: $hastaK, conc: $conc, repite: $repite, salv: $salv, cd: $cd) }`, { ...m, ...r });
/** El jugador deja de concentrarse: a todos se les acaba lo que dependía de eso. */
export const terminarConcentracionMesa = (m: { dmId: string; campanaId: string; personajeId: string }, conc: string, nombre: string) =>
  gql(`mutation ($dmId: ID!, $campanaId: ID!, $personajeId: ID!, $conc: String!, $nombre: String!) { terminarConcentracionMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId, conc: $conc, nombre: $nombre) }`, { ...m, conc, nombre });
/** Un enemigo deja de concentrarse: a los jugadores se les acaba lo que dependía de eso. */
export const terminarConcentracionDm = (campanaId: string, conc: string, de: string, nombre: string) =>
  gql(`mutation ($campanaId: ID!, $conc: String!, $de: String!, $nombre: String!) { terminarConcentracionDm(campanaId: $campanaId, conc: $conc, de: $de, nombre: $nombre) }`, { campanaId, conc, de, nombre });
export const quitarRespuestas = (campanaId: string, ids: string[]) =>
  gql(`mutation ($campanaId: ID!, $ids: [String!]!) { quitarRespuestas(campanaId: $campanaId, ids: $ids) }`, { campanaId, ids });
