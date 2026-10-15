/** Lo que se manda a The Homebrewery para crear un documento (un «brew») a partir de un .txt de guía. */
export type Brew = {
  title: string; text: string; style: string;
  renderer: 'V3'; theme: '5ePHB'; lang: 'es';
  description: string; tags: string[]; systems: string[];
};

export const HOMEBREWERY = 'https://homebrewery.naturalcrit.com';

/** El título: el de la portada (`# …` y `## …` tras `{{frontCover}}`), o el nombre del archivo si no tiene portada. */
export function tituloDe(texto: string, archivo = ''): string {
  const portada = /\{\{frontCover\}\}\s*#\s+([^\n]+)\n+##\s+([^\n]+)/.exec(texto);
  if (portada) return `${portada[1].trim()} · ${portada[2].trim()}`;
  const h1 = /^#\s+([^\n]+)/m.exec(texto);
  if (h1) return h1[1].trim();
  return archivo.replace(/\.(txt|md)$/i, '').replace(/[_-]+/g, ' ').trim() || 'Sin título';
}

/** Prepara el brew. Un `<style>` al principio del texto pasa a la pestaña de estilo de Homebrewery. */
export function prepararBrew(texto: string, archivo = ''): Brew {
  let text = texto.replace(/\r\n/g, '\n');
  let style = '';
  const m = /^\s*<style>\n?([\s\S]*?)\n?<\/style>\s*/.exec(text);
  if (m) { style = m[1]; text = text.slice(m[0].length); }
  return { title: tituloDe(text, archivo).slice(0, 100), text, style, renderer: 'V3', theme: '5ePHB', lang: 'es', description: '', tags: [], systems: ['5e'] };
}

/** La web exige su número de versión en cada envío; si no coincide responde 412 diciendo cuál quiere. */
export function versionPedida(respuesta: string): string | null {
  return /client version ([\d.]+)\./.exec(respuesta)?.[1] ?? null;
}

export const enlaces = (editId: string, shareId: string) => ({
  editar: `${HOMEBREWERY}/edit/${editId}`,
  leer: `${HOMEBREWERY}/share/${shareId}`,
});
