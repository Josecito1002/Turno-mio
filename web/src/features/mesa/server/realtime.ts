import 'server-only';

export type EventoMesa =
  | {
      tipo: 'cambio_pg';
      campanaId: string;
      jugadorId: string;
      personajeId: string;
      pgUsados?: number;
      pgTemp?: number;
      muerteExitos?: number;
      muerteFallos?: number;
      actualizadoEn?: string;
    }
  | {
      tipo: 'recargar';
      campanaId: string;
    };

type SuscriptorSse = {
  id: string;
  enviar: (evento: EventoMesa) => void;
};

type Hub = {
  campanas: Map<string, Set<SuscriptorSse>>;
};

const g = globalThis as unknown as { __miTurnoRealtimeHub?: Hub };
const hub: Hub = g.__miTurnoRealtimeHub ?? (g.__miTurnoRealtimeHub = {
  campanas: new Map(),
});

/** Suscribe un receptor SSE a los eventos de una campaña. Devuelve la función para cancelar la suscripción. */
export function suscribirMesaSse(campanaId: string, enviar: (evento: EventoMesa) => void): () => void {
  let grupo = hub.campanas.get(campanaId);
  if (!grupo) {
    grupo = new Set();
    hub.campanas.set(campanaId, grupo);
  }
  const sub: SuscriptorSse = { id: Math.random().toString(36).slice(2), enviar };
  grupo.add(sub);
  return () => {
    grupo?.delete(sub);
    if (grupo && grupo.size === 0) hub.campanas.delete(campanaId);
  };
}

/** Transmite un evento en tiempo real a los clientes conectados (vía SSE y reenviando al servidor WebSocket si está activo). */
export function transmitirMesa(campanaId: string, evento: EventoMesa) {
  // Transmitir a los clientes SSE conectados a este proceso
  const grupo = hub.campanas.get(campanaId);
  if (grupo) {
    for (const sub of grupo) {
      try { sub.enviar(evento); } catch { grupo.delete(sub); }
    }
  }

  // Notificar también al servidor WebSocket local si está corriendo en puerto 3001
  const puertoWs = process.env.PORT_WS || process.env.WS_PORT || '3001';
  fetch(`http://127.0.0.1:${puertoWs}/evento`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evento),
  }).catch(() => {
    // Si el servidor WS independiente no está activo en este momento, no pasa nada
  });
}
