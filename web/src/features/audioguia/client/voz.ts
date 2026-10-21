'use client';
/* Las voces del lector de guías: Piper (la buena, corre en el navegador) y la del celular, de reserva. */

export type VozId = 'es_MX-ald-medium' | 'es_MX-claude-high' | 'celular';

export const VOCES: { id: VozId; nombre: string; detalle: string }[] = [
  { id: 'es_MX-ald-medium', nombre: 'Ald', detalle: 'Voz Piper latina. Baja unos 63 MB la primera vez; rápida.' },
  { id: 'es_MX-claude-high', nombre: 'Claude', detalle: 'Voz Piper latina de más calidad. Baja unos 115 MB la primera vez; tarda más en preparar cada frase.' },
  { id: 'celular', nombre: 'La del celular', detalle: 'Sin bajar nada. Suena más robótica y en Android se para al bloquear la pantalla.' },
];

type Pendiente = { ok: (b: Blob) => void; mal: (e: Error) => void; reloj: ReturnType<typeof setTimeout> };

/** Piper en un worker: `preparar` baja la voz si hace falta y `decir` devuelve el audio (WAV) de un texto. */
export class VozPiper {
  private worker: Worker | null = null;
  private pendientes = new Map<number, Pendiente>();
  private siguiente = 1;
  private preparando: { ok: () => void; mal: (e: Error) => void } | null = null;
  onProgreso?: (bajado: number, total: number) => void;

  private hilo(): Worker {
    if (this.worker) return this.worker;
    const w = new Worker(new URL('./piper.worker.ts', import.meta.url), { type: 'module' });
    w.onmessage = (e: MessageEvent) => {
      const m = e.data as { tipo: string; id?: number; audio?: Blob; mensaje?: string; bajado?: number; total?: number };
      if (m.tipo === 'progreso') this.onProgreso?.(m.bajado || 0, m.total || 0);
      else if (m.tipo === 'lista') { this.preparando?.ok(); this.preparando = null; }
      else if (m.tipo === 'audio' && m.id) this.resolver(m.id, m.audio!);
      else if (m.tipo === 'error') {
        const err = new Error(m.mensaje || 'La voz falló.');
        if (m.id) this.resolver(m.id, err);
        else { this.preparando?.mal(err); this.preparando = null; }
      }
    };
    w.onerror = (e) => {
      const err = new Error(e.message || 'No se pudo cargar la voz.');
      this.preparando?.mal(err);
      this.preparando = null;
      for (const id of [...this.pendientes.keys()]) this.resolver(id, err);
    };
    this.worker = w;
    return w;
  }

  private resolver(id: number, r: Blob | Error) {
    const p = this.pendientes.get(id);
    if (!p) return;
    this.pendientes.delete(id);
    clearTimeout(p.reloj);
    if (r instanceof Error) p.mal(r); else p.ok(r);
  }

  preparar(voz: string): Promise<void> {
    const w = this.hilo();
    return new Promise((ok, mal) => {
      this.preparando = { ok, mal };
      w.postMessage({ tipo: 'preparar', voz });
    });
  }

  decir(texto: string): Promise<Blob> {
    const w = this.hilo();
    const id = this.siguiente++;
    return new Promise((ok, mal) => {
      // si el motor se queda colgado con una frase, que no se quede esperando para siempre
      const reloj = setTimeout(() => this.resolver(id, new Error('La voz tardó demasiado con una frase.')), 120_000);
      this.pendientes.set(id, { ok, mal, reloj });
      w.postMessage({ tipo: 'decir', id, texto });
    });
  }

  cerrar() {
    this.worker?.terminate();
    this.worker = null;
    for (const id of [...this.pendientes.keys()]) this.resolver(id, new Error('Cerrado.'));
  }
}

/** La mejor voz en español del navegador: primero las latinas. */
export function vozDelCelular(): SpeechSynthesisVoice | null {
  const vs = typeof speechSynthesis === 'undefined' ? [] : speechSynthesis.getVoices().filter((v) => /^es\b|^es[-_]/i.test(v.lang));
  const orden = ['es-GT', 'es-MX', 'es-US', 'es-419', 'es-CO', 'es-AR'];
  for (const l of orden) {
    const v = vs.find((x) => x.lang.replace('_', '-').toLowerCase() === l.toLowerCase());
    if (v) return v;
  }
  return vs.find((v) => !/es[-_]ES/i.test(v.lang)) || vs[0] || null;
}
