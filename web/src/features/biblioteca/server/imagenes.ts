import estaticas from './imagenes-estaticas.json';

/** Carpeta (dentro de public/) donde la compilación deja las imágenes de la biblioteca (scripts/imagenes-estaticas.ts). */
export const CARPETA_ESTATICAS = '/img/biblioteca';

const EXTENSIONES: Record<string, string> = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif', 'image/svg+xml': 'svg' };
export const extensionImagen = (tipo: string): string | undefined => EXTENSIONES[tipo];

/** Dirección de una imagen de la biblioteca; `v` (md5 del valor) cambia con la imagen, así el navegador la guarda
    sin volver a pedirla. Si la compilación ya la copió a public/, sale de ahí sin tocar la base. */
export function urlImagen(clave: string, v: string) {
  const ext = (estaticas as Record<string, string>)[v];
  return ext ? `${CARPETA_ESTATICAS}/${v}.${ext}` : `/api/imagen?k=${encodeURIComponent(clave)}&v=${v.slice(0, 12)}`;
}
