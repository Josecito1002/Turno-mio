'use client';
import type { EventoMesa } from './server/realtime';

export type ListenerEventoMesa = (evento: EventoMesa) => void;

/** Conecta en tiempo real a una campaña vía WebSocket nativo, con fallback automático a SSE (Server-Sent Events).
    Retorna una función de desconexión. */
export function conectarMesaRealtime(
  campanaId: string,
  onEvento: ListenerEventoMesa,
  onEstado?: (conectado: boolean, transporte: 'ws' | 'sse' | '') => void,
): () => void {
  let cancelado = false;
  let ws: WebSocket | null = null;
  let es: EventSource | null = null;
  let timerWs: ReturnType<typeof setTimeout> | null = null;

  const urlWs = process.env.NEXT_PUBLIC_WS_URL || (typeof window !== 'undefined'
    ? `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.hostname}:3001`
    : '');

  const conectarSSE = () => {
    if (cancelado || es) return;
    try {
      es = new EventSource(`/api/mesa/stream?campanaId=${encodeURIComponent(campanaId)}`);
      es.onopen = () => {
        if (!cancelado) onEstado?.(true, 'sse');
      };
      es.onmessage = ev => {
        if (cancelado) return;
        try {
          const dato = JSON.parse(ev.data);
          if (dato.tipo !== 'conectado') onEvento(dato);
        } catch {}
      };
      es.onerror = () => {
        if (!cancelado) onEstado?.(false, '');
      };
    } catch {
      if (!cancelado) onEstado?.(false, '');
    }
  };

  // Intentar WebSocket primero si hay URL válida
  if (urlWs && typeof WebSocket !== 'undefined') {
    try {
      ws = new WebSocket(urlWs);
      timerWs = setTimeout(() => {
        // Si el WS no abrió en 1500 ms, usar SSE de respaldo
        if (ws && ws.readyState !== WebSocket.OPEN) {
          try { ws.close(); } catch {}
          ws = null;
          conectarSSE();
        }
      }, 1500);

      ws.onopen = () => {
        if (timerWs) clearTimeout(timerWs);
        if (cancelado) { ws?.close(); return; }
        onEstado?.(true, 'ws');
        ws?.send(JSON.stringify({ tipo: 'unirse', campanaId }));
      };

      ws.onmessage = ev => {
        if (cancelado) return;
        try {
          const dato = JSON.parse(ev.data);
          if (dato.tipo !== 'unido') onEvento(dato);
        } catch {}
      };

      ws.onerror = () => {
        if (timerWs) clearTimeout(timerWs);
        if (!cancelado && !es) conectarSSE();
      };

      ws.onclose = () => {
        if (timerWs) clearTimeout(timerWs);
        if (!cancelado && !es) conectarSSE();
      };
    } catch {
      conectarSSE();
    }
  } else {
    conectarSSE();
  }

  return () => {
    cancelado = true;
    if (timerWs) clearTimeout(timerWs);
    if (ws) {
      try {
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ tipo: 'salir', campanaId }));
        ws.close();
      } catch {}
      ws = null;
    }
    if (es) {
      try { es.close(); } catch {}
      es = null;
    }
    onEstado?.(false, '');
  };
}

/** Notifica en tiempo real a las mesas del DM que los PG o salvaciones de muerte han cambiado. */
export function emitirCambioPg(payload: {
  personajeId: string;
  pgUsados: number;
  pgTemp: number;
  muerteExitos: number;
  muerteFallos: number;
  campanaId?: string;
}) {
  if (typeof window === 'undefined') return;
  fetch('/api/mesa/evento', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo: 'cambio_pg', ...payload }),
  }).catch(() => {
    // Si falla el envío rápido, la mutación habitual guardará y transmitirá desde el servidor
  });
}
