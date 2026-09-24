// @ts-nocheck -- datos portados tal cual de index.html
/* eslint-disable */
import { norm, sign } from '@/shared/utils/texto';

export const DOTES: Record<string, any> = {
  alerta:{n:'Alerta',m:/alert/,t:'pasiva',texto:c=>`Sumas ${sign(c.pb)} a la iniciativa (ya sumado) y, al tirarla, puedes intercambiarla con un aliado voluntario.`},
  afortunado:{n:'Afortunado',m:/afortunad|suertud|lucky/,t:'gratis',usos:'pb',texto:c=>`Gastas un punto de suerte (${c.pb} por descanso largo) para darte ventaja en una prueba d20 o dar desventaja a un ataque contra ti.`},
  artesano:{n:'Artesano',m:/artesan|crafter/,t:'pasiva',texto:()=>'Competencia con tres herramientas de artesano, 20% de descuento en objetos no mágicos y fabricas un objeto sencillo al terminar un descanso largo.'},
  salvaje:{n:'Atacante Salvaje',m:/salvaje|savage/,t:'gratis',texto:()=>'Una vez por turno, al golpear con un arma, tiras los dados de daño dos veces y usas el mejor resultado.'},
  duro:{n:'Duro',m:/^dur|tough/,t:'pasiva',texto:c=>`+${2*c.tl} PG máximos (2 por nivel, ya sumado).`},
  habil:{n:'Hábil',m:/^habil|skilled/,t:'pasiva',texto:()=>'Competencia en tres habilidades a tu elección (elígelas en Habilidades).'},
  iniciado:{n:'Iniciado en la Magia',m:/iniciado|initiate/,t:'pasiva',texto:()=>'Dos trucos y un conjuro de nivel 1 de la lista que elijas; el de nivel 1 lo lanzas una vez al día sin espacio. Agrégalos en Conjuros.'},
  taberna:{n:'Luchador de Taberna',m:/taberna|tavern/,t:'pasiva',texto:()=>'Tus golpes sin armas hacen 1d4 + FUE (ya sumado), repites los 1 en el daño y, una vez por turno al golpear, empujas 5 pies. Competente con armas improvisadas.'},
  musico:{n:'Músico',m:/music/,t:'fuera',texto:c=>`Al terminar un descanso tocas y das Inspiración heroica a hasta ${c.pb} aliados que te oigan.`},
  sanador:{n:'Sanador',m:/sanador|curador|healer/,t:'accion',coste:'1 uso de botiquín',texto:c=>`Con un botiquín, usas la acción Usar un objeto sobre una criatura a 5 pies: gasta uno de sus Dados de Golpe, lo tiras y recupera el resultado + ${c.pb} PG. Al curar con conjuros o con esta dote repites los 1.`},
};
export const doteKey = name => { const n = norm(name); if (!n) return ''; return Object.keys(DOTES).find(k => DOTES[k].m.test(n) || norm(DOTES[k].n) === n) || ''; };
