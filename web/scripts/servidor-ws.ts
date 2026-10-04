import { createServer } from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';

const PUERTO = parseInt(process.env.PORT_WS || process.env.WS_PORT || '3001', 10);

type EventoMesa = {
  tipo: string;
  campanaId?: string;
  [key: string]: unknown;
};

// Mapa de salas: campanaId -> Set de WebSockets
const salas = new Map<string, Set<WebSocket>>();
// Mapa inverso: WebSocket -> Set de campanaId
const suscripciones = new WeakMap<WebSocket, Set<string>>();

function unir(ws: WebSocket, campanaId: string) {
  let s = salas.get(campanaId);
  if (!s) {
    s = new Set();
    salas.set(campanaId, s);
  }
  s.add(ws);
  let cs = suscripciones.get(ws);
  if (!cs) {
    cs = new Set();
    suscripciones.set(ws, cs);
  }
  cs.add(campanaId);
}

function salir(ws: WebSocket, campanaId: string) {
  const s = salas.get(campanaId);
  if (s) {
    s.delete(ws);
    if (s.size === 0) salas.delete(campanaId);
  }
  const cs = suscripciones.get(ws);
  if (cs) cs.delete(campanaId);
}

function limpiar(ws: WebSocket) {
  const cs = suscripciones.get(ws);
  if (cs) {
    for (const campId of cs) {
      const s = salas.get(campId);
      if (s) {
        s.delete(ws);
        if (s.size === 0) salas.delete(campId);
      }
    }
  }
}

function broadcast(campanaId: string, dato: string, remitente?: WebSocket) {
  const s = salas.get(campanaId);
  if (!s) return;
  for (const client of s) {
    if (client !== remitente && client.readyState === WebSocket.OPEN) {
      client.send(dato);
    }
  }
}

const server = createServer((req, res) => {
  // Manejo de eventos HTTP provenientes de Next.js (POST /evento)
  if (req.method === 'POST' && req.url === '/evento') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const ev = JSON.parse(body) as EventoMesa;
        if (ev.campanaId) {
          broadcast(ev.campanaId, body);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch {
        res.writeHead(400);
        res.end('JSON inválido');
      }
    });
    return;
  }

  if (req.url === '/salud') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, clientes: wss.clients.size, salas: salas.size }));
    return;
  }

  res.writeHead(404);
  res.end();
});

const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  ws.on('message', data => {
    try {
      const str = data.toString();
      const ev = JSON.parse(str) as EventoMesa;
      if (ev.tipo === 'unirse' && ev.campanaId) {
        unir(ws, ev.campanaId);
        ws.send(JSON.stringify({ tipo: 'unido', campanaId: ev.campanaId }));
      } else if (ev.tipo === 'salir' && ev.campanaId) {
        salir(ws, ev.campanaId);
      } else if (ev.campanaId) {
        // Broadcast a los demás en la misma campaña
        broadcast(ev.campanaId, str, ws);
      }
    } catch (e) {
      console.error('Error procesando mensaje WS:', e);
    }
  });

  ws.on('close', () => limpiar(ws));
  ws.on('error', () => limpiar(ws));
});

server.listen(PUERTO, () => {
  console.log(`[ws] Servidor WebSocket de Mi Turno activo en ws://localhost:${PUERTO}`);
});
