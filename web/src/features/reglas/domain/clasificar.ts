/* eslint-disable */
// @ts-nocheck -- lógica portada de index.html
import { norm, stripTags } from '@/shared/utils/texto';

export function clasificar(txt){
  const t = norm(txt);
  if (/acc(?:ion|\.)?\s*adicional|bonif\.?\s*accion|accion\s*(?:bonus|bonificada)|bonus action/.test(t)) return 'adicional';
  if (/\breaccion\b|\breaction\b/.test(t)) return 'reaccion';
  if (/cuando golpeas|al golpear|si golpeas|when you hit|al tirar iniciativa|cuando reduces|si impactas|cuando impactas/.test(t)) return 'gratis';
  if (/^accion\b|accion magica|como accion|una accion\b|\baccion[.:,]|\baccion para\b|\busa(?:r|s)? (?:tu |una )?accion|magic action|as an action/.test(t)) return 'accion';
  return 'pasiva';
}
export function minNivel(txt){ const m = norm(txt).match(/(?:a partir del? |^a |desde el )nivel (\d+)/); return m ? +m[1] : 0; }
export function rasgoDe(r, n){
  const texto = stripTags(r.descripcion || r.description || '');
  const t = norm(texto);
  const usos = /usos:\s*(pb|bc)/.test(t) ? 'pb' : (/1\s*\/\s*descanso|una vez por descanso/.test(t) ? 1 : 0);
  return {nombre: r.nombre || r.name || 'Rasgo', t: clasificar(texto), auto: true, texto, n: n || 1, usos, reset: /descanso corto/.test(t) && !/descanso largo/.test(t) ? 'corto' : 'largo'};
}
