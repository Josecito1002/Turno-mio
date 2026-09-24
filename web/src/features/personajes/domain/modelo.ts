/* eslint-disable */
// @ts-nocheck -- lógica portada de index.html
import { AB } from '@/features/reglas/data/caracteristicas';
import { getC, getE } from '@/features/biblioteca/domain/biblioteca';

export function nuevoPj(){
  return {v:2, id:'pj-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), nombre:'', jugador:'', alineamiento:'', historia:'',
    especie:{key:'', sub:'', nombre:'', vel:30, vision:0},
    clase:'', nivel:1, subclase:'', subclaseNombre:'', pactoCadena:false, estilo:'', maestrias:[],
    trasfondo:{key:'', modo:'21', a:'', b:'', nombre:'', abs:['','',''], habs:['',''], dote:'', herr:''},
    doteHumano:'', dotesExtra:[],
    gen:{metodo:'tirar', valores:[], dados:[], asig:{}, compra:{fue:8,des:8,con:8,int:8,sab:8,car:8}, manual:{fue:10,des:10,con:10,int:10,sab:10,car:10}},
    mejoras:{}, habClase:[], habExtra:[], pericia:[],
    armas:[], armadura:'ninguna', escudo:false, oro:0, inventario:'', inicial:false,
    conjuros:[], rasgosExtra:[], pgModo:'promedio', pgTiradas:[], fix:{}, used:{}};
}
export function reparar(pj){
  const base = nuevoPj();
  for (const k in base) if (pj[k] === undefined) pj[k] = base[k];
  for (const k of ['especie','trasfondo','gen']) for (const kk in base[k]) if (pj[k][kk] === undefined) pj[k][kk] = base[k][kk];
  return pj;
}
export function baseScores(pj){
  const g = pj.gen || {}, out = {};
  AB.forEach(([k]) => {
    if (g.metodo === 'compra') out[k] = +(g.compra?.[k] ?? 8);
    else if (g.metodo === 'manual') out[k] = +(g.manual?.[k] ?? 10);
    else { const i = g.asig?.[k]; out[k] = i != null && g.valores?.[i] != null ? +g.valores[i] : 8; }
  });
  return out;
}

export function resumen(pj){ const C = getC(pj, pj.clase), E = getE(pj, pj.especie?.key); return `${C ? `${C.n} ${pj.nivel}` : 'Sin clase'}${E ? `, ${pj.especie.key === 'custom' ? (pj.especie.nombre || E.n) : E.n}` : ''}`; }

export function asegurarTiradas(pj){
  if (pj.pgModo === 'tiradas') return;
  const die = getC(pj, pj.clase)?.dado || 8;
  pj.pgTiradas = pj.pgTiradas || [];
  if (pj.pgModo === 'maximo') for (let j = 0; j < pj.nivel - 2; j++) if (pj.pgTiradas[j] == null) pj.pgTiradas[j] = die;
  pj.pgModo = 'tiradas';
}
