'use client';
/* El reproductor del lector de guías. Con Piper, cada trozo se convierte en audio unos trozos antes de que toque y
   suena en un solo <audio>: así sigue sonando con la pantalla apagada y se maneja desde los controles de música del
   celular. Con la voz del celular, habla el navegador directamente. */
import type { Guion } from '../domain/guion';
import { VozPiper, vozDelCelular, type VozId } from './voz';

export type Estado = {
  /** trozo que suena (o donde se quedó) */
  pos: number;
  sonando: boolean;
  /** lo que está haciendo, si tarda: «Bajando la voz…», «Preparando…» */
  ocupado: string;
  error: string;
};

type Trozo = { sec: number; texto: string };

/** Medio segundo de silencio: se toca en el mismo toque del botón para que el celular deje sonar lo demás. */
function silencio(): string {
  const n = 4000, v = new DataView(new ArrayBuffer(44 + n * 2));
  const s = (o: number, t: string) => [...t].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  s(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); s(8, 'WAVE'); s(12, 'fmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, 8000, true);
  v.setUint32(28, 16000, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); s(36, 'data'); v.setUint32(40, n * 2, true);
  return URL.createObjectURL(new Blob([v.buffer], { type: 'audio/wav' }));
}

const ADELANTE = 3;

export class Reproductor {
  readonly trozos: Trozo[];
  /** primer trozo de cada sección */
  readonly inicios: number[];
  private estado: Estado = { pos: 0, sonando: false, ocupado: '', error: '' };
  private audio: HTMLAudioElement | null = null;
  private piper: VozPiper | null = null;
  private cache = new Map<number, Promise<string>>();
  private urls = new Map<number, string>();
  private turno = 0;
  private vozLista = '';
  private velocidad = 1;
  /** hora a la que se para sola (temporizador), o 0 */
  private finEn = 0;

  constructor(readonly guion: Guion, private voz: VozId, private onCambio: (e: Estado) => void, pos = 0) {
    this.trozos = guion.secciones.flatMap((s, sec) => s.trozos.map((texto) => ({ sec, texto })));
    this.inicios = [];
    guion.secciones.forEach((s, i) => { this.inicios.push(i === 0 ? 0 : this.inicios[i - 1] + guion.secciones[i - 1].trozos.length); });
    this.estado.pos = Math.min(Math.max(0, pos), Math.max(0, this.trozos.length - 1));
  }

  get e() { return this.estado; }
  private poner(x: Partial<Estado>) { this.estado = { ...this.estado, ...x }; this.onCambio(this.estado); }

  /** Se para sola dentro de `min` minutos, al acabar el trozo que suene (0: no se para). */
  temporizador(min: number) { this.finEn = min ? Date.now() + min * 60_000 : 0; }

  seccionDe(pos = this.estado.pos) { return this.trozos[pos]?.sec ?? 0; }

  setVelocidad(v: number) {
    this.velocidad = v;
    if (this.audio) { this.audio.defaultPlaybackRate = v; this.audio.playbackRate = v; }
    // la voz del celular toma la velocidad al empezar cada trozo: se rehace el que suena
    if (this.voz === 'celular' && this.estado.sonando) this.ir(this.estado.pos);
  }

  setVoz(v: VozId) {
    if (v === this.voz) return;
    this.pausar();
    this.limpiarCache();
    this.voz = v;
  }

  /** Lo primero de cada toque de «Escuchar»: desbloquea el audio dentro del gesto del usuario. */
  private desbloquear() {
    if (this.voz === 'celular') return;
    if (!this.audio) {
      const a = new Audio();
      a.preload = 'auto';
      (a as HTMLAudioElement & { preservesPitch?: boolean }).preservesPitch = true;
      // el silencio del desbloqueo no tiene trozo: al acabar no hace nada
      a.onended = () => { if (a.dataset.trozo === String(this.estado.pos)) this.alTerminar(); };
      a.onpause = () => { if (this.estado.sonando && !a.ended && a.dataset.trozo) this.poner({ sonando: false }); };
      a.onplay = () => { if (a.dataset.trozo && !this.estado.sonando) this.poner({ sonando: true }); };
      this.audio = a;
      this.medios();
    }
    if (!this.audio.dataset.trozo) {
      this.audio.src = silencio();
      this.audio.play().catch(() => {});
    }
  }

  private medios() {
    if (!('mediaSession' in navigator)) return;
    const ms = navigator.mediaSession;
    const h = (a: MediaSessionAction, f: () => void) => { try { ms.setActionHandler(a, f); } catch { /* no lo admite */ } };
    h('play', () => this.tocar());
    h('pause', () => this.pausar());
    h('previoustrack', () => this.seccion(-1));
    h('nexttrack', () => this.seccion(1));
    h('seekbackward', () => this.trozo(-1));
    h('seekforward', () => this.trozo(1));
  }

  private metadatos() {
    if (!('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;
    const s = this.guion.secciones[this.seccionDe()];
    navigator.mediaSession.metadata = new MediaMetadata({ title: s?.titulo || this.guion.titulo, artist: this.guion.titulo, album: 'Mi Turno' });
  }

  private async prepararPiper() {
    if (this.vozLista === this.voz) return;
    if (!this.piper) {
      this.piper = new VozPiper();
      this.piper.onProgreso = (b, t) => this.poner({ ocupado: `Bajando la voz (solo la primera vez): ${Math.round(b / 1e6)} de ${Math.round(t / 1e6)} MB…` });
    }
    this.poner({ ocupado: 'Preparando la voz…' });
    await this.piper.preparar(this.voz);
    this.vozLista = this.voz;
  }

  private pedir(i: number): Promise<string> {
    let p = this.cache.get(i);
    if (!p) {
      p = this.piper!.decir(this.trozos[i].texto).then((b) => { const u = URL.createObjectURL(b); this.urls.set(i, u); return u; });
      p.catch(() => this.cache.delete(i));
      this.cache.set(i, p);
    }
    return p;
  }

  /** Suelta los audios que ya quedaron lejos, para no llenar la memoria del celular. */
  private podar() {
    const pos = this.estado.pos;
    for (const [i, u] of this.urls) {
      if (i < pos - 2 || i > pos + ADELANTE + 2) { URL.revokeObjectURL(u); this.urls.delete(i); this.cache.delete(i); }
    }
  }

  private limpiarCache() {
    for (const u of this.urls.values()) URL.revokeObjectURL(u);
    this.urls.clear();
    this.cache.clear();
  }

  /** Empieza a sonar desde el trozo `i`. */
  async ir(i: number) {
    if (!this.trozos.length) return;
    i = Math.min(Math.max(0, i), this.trozos.length - 1);
    const turno = ++this.turno;
    this.poner({ pos: i, sonando: true, error: '' });
    this.metadatos();
    if (this.voz === 'celular') return this.hablarCelular(i, turno);
    try {
      await this.prepararPiper();
      if (turno !== this.turno) return;
      if (!this.cache.has(i)) this.poner({ ocupado: 'Preparando…' });
      const url = await this.pedir(i);
      if (turno !== this.turno) return;
      for (let k = 1; k <= ADELANTE && i + k < this.trozos.length; k++) void this.pedir(i + k).catch(() => {});
      const a = this.audio!;
      a.dataset.trozo = String(i);
      a.src = url;
      a.playbackRate = this.velocidad;
      await a.play();
      this.poner({ ocupado: '' });
      this.podar();
    } catch (err) {
      if (turno !== this.turno) return;
      const msg = err instanceof Error ? err.message : String(err);
      this.poner({ sonando: false, ocupado: '', error: msg });
    }
  }

  private hablarCelular(i: number, turno: number) {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(this.trozos[i].texto);
    const v = vozDelCelular();
    if (v) u.voice = v;
    u.lang = v?.lang || 'es-MX';
    u.rate = this.velocidad;
    u.onend = () => { if (turno === this.turno) this.alTerminar(); };
    u.onerror = (e) => {
      if (turno !== this.turno || e.error === 'interrupted' || e.error === 'canceled') return;
      this.poner({ sonando: false, error: `La voz del celular falló (${e.error}).` });
    };
    speechSynthesis.speak(u);
  }

  private alTerminar() {
    if (!this.estado.sonando) return;
    if (this.finEn && Date.now() >= this.finEn) { this.finEn = 0; this.pausar(); return; }
    if (this.estado.pos + 1 >= this.trozos.length) { this.poner({ sonando: false }); return; }
    void this.ir(this.estado.pos + 1);
  }

  /** Botón de reproducir: sigue donde se quedó. Se llama en el mismo toque del usuario. */
  tocar() {
    this.desbloquear();
    const a = this.audio;
    if (this.voz !== 'celular' && a && a.dataset.trozo === String(this.estado.pos) && a.src && !a.ended) {
      this.poner({ sonando: true });
      a.play().catch((err) => this.poner({ sonando: false, error: String(err) }));
      return;
    }
    void this.ir(this.estado.pos);
  }

  pausar() {
    this.turno++;
    if (this.voz === 'celular') { if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel(); }
    else this.audio?.pause();
    this.poner({ sonando: false, ocupado: '' });
  }

  /** Salta a un trozo; si estaba sonando, sigue sonando ahí. */
  saltar(i: number) {
    i = Math.min(Math.max(0, i), Math.max(0, this.trozos.length - 1));
    if (this.estado.sonando || this.estado.ocupado) { this.desbloquear(); void this.ir(i); }
    else {
      if (this.audio) delete this.audio.dataset.trozo;
      this.poner({ pos: i });
    }
  }

  trozo(d: number) { this.saltar(this.estado.pos + d); }

  /** Sección anterior o siguiente. Hacia atrás, si ya se oyó algo de esta, vuelve a su principio. */
  seccion(d: number) {
    const s = this.seccionDe();
    if (d < 0 && this.estado.pos > this.inicios[s]) return this.saltar(this.inicios[s]);
    const n = Math.min(Math.max(0, s + d), this.inicios.length - 1);
    this.saltar(this.inicios[n]);
  }

  cerrar() {
    this.turno++;
    if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
    this.audio?.pause();
    this.audio = null;
    this.piper?.cerrar();
    this.piper = null;
    this.limpiarCache();
  }
}
