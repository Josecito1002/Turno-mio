/* Voz Piper en un hilo aparte, para que la app no se trabe mientras habla. La primera vez baja la voz (de Hugging
   Face) y la guarda en el almacenamiento del navegador: después funciona sin internet. */
import { TtsSession } from '@mintplex-labs/piper-tts-web';

type Mensaje =
  | { tipo: 'preparar'; voz: string }
  | { tipo: 'decir'; id: number; texto: string };

/** Los archivos del motor, de la misma versión que la app (la librería trae por defecto una más vieja). */
const WASM = {
  onnxWasm: 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/',
  piperData: 'https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize.data',
  piperWasm: 'https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize.wasm',
};

let sesion: TtsSession | null = null;
let vozActual = '';
let cola: Promise<void> = Promise.resolve();
const enviar = (m: unknown) => (self as unknown as Worker).postMessage(m);

self.onmessage = async (e: MessageEvent<Mensaje>) => {
  const m = e.data;
  if (m.tipo === 'preparar') {
    try {
      if (!sesion || vozActual !== m.voz) {
        // la librería guarda una sola sesión: sin esto, al cambiar de voz seguiría con la anterior
        TtsSession._instance = null;
        sesion = await TtsSession.create({
          voiceId: m.voz,
          wasmPaths: WASM,
          progress: (p) => { if (p.total && p.url.endsWith('.onnx')) enviar({ tipo: 'progreso', bajado: p.loaded, total: p.total }); },
        });
        vozActual = m.voz;
      }
      enviar({ tipo: 'lista' });
    } catch (err) {
      sesion = null;
      enviar({ tipo: 'error', mensaje: err instanceof Error ? err.message : String(err) });
    }
    return;
  }
  if (m.tipo === 'decir') {
    // de uno en uno: el motor no admite dos a la vez
    cola = cola.then(async () => {
      try {
        if (!sesion) throw new Error('La voz no está lista.');
        const audio = await sesion.predict(m.texto);
        enviar({ tipo: 'audio', id: m.id, audio });
      } catch (err) {
        enviar({ tipo: 'error', id: m.id, mensaje: err instanceof Error ? err.message : String(err) });
      }
    });
  }
};
