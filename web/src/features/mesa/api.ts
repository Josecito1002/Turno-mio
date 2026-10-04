import { gql } from '@/shared/graphql/cliente';

export const QUERY_CAMPANAS = /* GraphQL */ `campanas { id nombre datos codigo unidos }`;
export type CampanaServidor = { id: string; nombre: string; datos: Record<string, unknown>; codigo: string | null; unidos: number | null };

export const guardarCampana = (c: { id: string; nombre: string; datos: unknown }, keepalive = false) =>
  gql(`mutation ($id: ID!, $nombre: String!, $datos: JSON!) { guardarCampana(id: $id, nombre: $nombre, datos: $datos) { id } }`, c, { keepalive });

export const borrarCampana = (id: string) => gql(`mutation ($id: ID!) { borrarCampana(id: $id) }`, { id });

/* ---- Código de mesa: el DM lo comparte y los jugadores unen sus personajes ---- */
export type PersonajeEnMesa = { jugadorId: string; jugador: string; personajeId: string; nombre: string; resumen: string | null; datos: Record<string, unknown>; actualizadoEn: string };
export type MesaUnida = { dmId: string; campanaId: string; mesa: string; dm: string; personajeId: string; personaje: string };
const CAMPOS_MESA = 'dmId campanaId mesa dm personajeId personaje';

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

export const salirMesa = (m: { dmId: string; campanaId: string; personajeId: string }) =>
  gql(`mutation ($dmId: ID!, $campanaId: ID!, $personajeId: ID!) { salirMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId) }`, m);

/* ---- Combate en vivo: el DM publica ronda, turno y orden; cada jugador gasta su acción, adicional y reacción ---- */
export type TipoAccionRonda = 'accion' | 'adicional' | 'reaccion';
export type EconomiaRonda = Partial<Record<TipoAccionRonda, boolean>>;
export type Golpe = { id: string; de: string; objetivo: string; dano: number; condicion: string | null; nota: string | null; ts: string };
export type CombateVivo = {
  activo?: boolean; ronda?: number; turno?: number;
  /** Quién actúa y en qué orden; `pid` es el id del personaje cuando es de un jugador unido. */
  orden?: { k: string; nombre: string; tipo: string; pid?: string; cond?: string[] }[];
  economia?: Record<string, EconomiaRonda>;
  /** Golpes que mandaron los jugadores y el DM todavía no aplica. */
  golpes?: Golpe[];
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

export const enviarGolpeMesa = (m: { dmId: string; campanaId: string; personajeId: string }, g: { objetivo: string; dano: number; condicion?: string; nota?: string }) =>
  gql(`mutation ($dmId: ID!, $campanaId: ID!, $personajeId: ID!, $objetivo: String!, $dano: Int!, $condicion: String, $nota: String) { enviarGolpeMesa(dmId: $dmId, campanaId: $campanaId, personajeId: $personajeId, objetivo: $objetivo, dano: $dano, condicion: $condicion, nota: $nota) }`, { ...m, ...g });

export const confirmarGolpes = (campanaId: string, ids: string[]) =>
  gql(`mutation ($campanaId: ID!, $ids: [String!]!) { confirmarGolpes(campanaId: $campanaId, ids: $ids) }`, { campanaId, ids });

export const fijarAccionDm = (campanaId: string, clave: string, tipo: TipoAccionRonda, gastado: boolean) =>
  gql(`mutation ($campanaId: ID!, $clave: String!, $tipo: String!, $gastado: Boolean!) { fijarAccionDm(campanaId: $campanaId, clave: $clave, tipo: $tipo, gastado: $gastado) }`, { campanaId, clave, tipo, gastado });
