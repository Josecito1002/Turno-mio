/* eslint-disable */
// @ts-nocheck -- datos portados tal cual de index.html
import { norm } from '@/shared/utils/texto';

export const MAESTRIAS: Record<string, any> = {
  hendir:['Hendir','Al golpear cuerpo a cuerpo puedes atacar a otra criatura a 5 pies de la primera; si aciertas hace el daño del arma sin tu modificador. Una vez por turno.'],
  rozar:['Rozar','Si fallas, haces daño igual a tu modificador de característica.'],
  mellar:['Mellar','El ataque extra de la propiedad Ligera va dentro de la acción Atacar en vez de gastar la acción adicional. Una vez por turno.'],
  empujar:['Empujar','Al golpear, empujas al objetivo (Grande o menor) hasta 10 pies.'],
  debilitar:['Debilitar','Al golpear, el objetivo tiene desventaja en su siguiente ataque antes de tu próximo turno.'],
  ralentizar:['Ralentizar','Al golpear y hacer daño, su velocidad baja 10 pies hasta tu próximo turno.'],
  derribar:['Derribar','Al golpear, el objetivo hace salvación de CON o queda Derribado.'],
  hostigar:['Hostigar','Al golpear y hacer daño, tienes ventaja en tu siguiente ataque contra esa criatura antes del final de tu próximo turno.'],
};
export const ARMAS: Record<string, any> = {
  garrote:{n:'Garrote',al:['garrote','clava'],d:'1d4',tipo:'contundente',cat:'sencilla',p:['ligera'],ma:'ralentizar'},
  daga:{n:'Daga',al:['daga','dagas'],d:'1d4',tipo:'perforante',cat:'sencilla',p:['sutil','ligera','arrojadiza'],r:'20/60',ma:'mellar'},
  gran_clava:{n:'Gran clava',al:['gran clava','garrote grande'],d:'1d8',tipo:'contundente',cat:'sencilla',p:['dos manos'],ma:'empujar'},
  hacha_mano:{n:'Hacha de mano',al:['hacha de mano','hachuela'],d:'1d6',tipo:'cortante',cat:'sencilla',p:['ligera','arrojadiza'],r:'20/60',ma:'hostigar'},
  jabalina:{n:'Jabalina',al:['jabalina','jabalinas'],d:'1d6',tipo:'perforante',cat:'sencilla',p:['arrojadiza'],r:'30/120',ma:'ralentizar'},
  martillo_ligero:{n:'Martillo ligero',al:['martillo ligero'],d:'1d4',tipo:'contundente',cat:'sencilla',p:['ligera','arrojadiza'],r:'20/60',ma:'mellar'},
  maza:{n:'Maza',al:['maza'],d:'1d6',tipo:'contundente',cat:'sencilla',p:[],ma:'debilitar'},
  baston:{n:'Bastón',al:['baston'],d:'1d6',tipo:'contundente',cat:'sencilla',p:['versátil'],v:'1d8',ma:'derribar'},
  hoz:{n:'Hoz',al:['hoz'],d:'1d4',tipo:'cortante',cat:'sencilla',p:['ligera'],ma:'mellar'},
  lanza:{n:'Lanza',al:['lanza'],d:'1d6',tipo:'perforante',cat:'sencilla',p:['arrojadiza','versátil'],r:'20/60',v:'1d8',ma:'debilitar'},
  ballesta_ligera:{n:'Ballesta ligera',al:['ballesta ligera'],d:'1d8',tipo:'perforante',cat:'sencilla',dist:true,p:['munición','recarga','dos manos'],r:'80/320',ma:'ralentizar'},
  arco_corto:{n:'Arco corto',al:['arco corto'],d:'1d6',tipo:'perforante',cat:'sencilla',dist:true,p:['munición','dos manos'],r:'80/320',ma:'hostigar'},
  dardo:{n:'Dardo',al:['dardo','dardos'],d:'1d4',tipo:'perforante',cat:'sencilla',dist:true,p:['sutil','arrojadiza'],r:'20/60',ma:'hostigar'},
  honda:{n:'Honda',al:['honda'],d:'1d4',tipo:'contundente',cat:'sencilla',dist:true,p:['munición'],r:'30/120',ma:'ralentizar'},
  hacha_guerra:{n:'Hacha de guerra',al:['hacha de guerra','hacha de batalla'],d:'1d8',tipo:'cortante',cat:'marcial',p:['versátil'],v:'1d10',ma:'derribar'},
  mangual:{n:'Mangual',al:['mangual'],d:'1d8',tipo:'contundente',cat:'marcial',p:[],ma:'debilitar'},
  guja:{n:'Guja',al:['guja'],d:'1d10',tipo:'cortante',cat:'marcial',p:['pesada','alcance','dos manos'],ma:'rozar'},
  gran_hacha:{n:'Gran hacha',al:['gran hacha','hacha a dos manos'],d:'1d12',tipo:'cortante',cat:'marcial',p:['pesada','dos manos'],ma:'hendir'},
  espadon:{n:'Espadón',al:['espadon','mandoble','gran espada'],d:'2d6',tipo:'cortante',cat:'marcial',p:['pesada','dos manos'],ma:'rozar'},
  alabarda:{n:'Alabarda',al:['alabarda'],d:'1d10',tipo:'cortante',cat:'marcial',p:['pesada','alcance','dos manos'],ma:'hendir'},
  lanza_caballeria:{n:'Lanza de caballería',al:['lanza de caballeria','lanza de justa'],d:'1d10',tipo:'perforante',cat:'marcial',p:['pesada','alcance'],ma:'derribar'},
  espada_larga:{n:'Espada larga',al:['espada larga'],d:'1d8',tipo:'cortante',cat:'marcial',p:['versátil'],v:'1d10',ma:'debilitar'},
  mazo:{n:'Mazo',al:['mazo','gran mazo'],d:'2d6',tipo:'contundente',cat:'marcial',p:['pesada','dos manos'],ma:'derribar'},
  lucero:{n:'Lucero del alba',al:['lucero del alba','lucero'],d:'1d8',tipo:'perforante',cat:'marcial',p:[],ma:'debilitar'},
  pica:{n:'Pica',al:['pica'],d:'1d10',tipo:'perforante',cat:'marcial',p:['pesada','alcance','dos manos'],ma:'empujar'},
  estoque:{n:'Estoque',al:['estoque','florete'],d:'1d8',tipo:'perforante',cat:'marcial',p:['sutil'],ma:'hostigar'},
  cimitarra:{n:'Cimitarra',al:['cimitarra'],d:'1d6',tipo:'cortante',cat:'marcial',p:['sutil','ligera'],ma:'mellar'},
  espada_corta:{n:'Espada corta',al:['espada corta'],d:'1d6',tipo:'perforante',cat:'marcial',p:['sutil','ligera'],ma:'hostigar'},
  tridente:{n:'Tridente',al:['tridente'],d:'1d8',tipo:'perforante',cat:'marcial',p:['arrojadiza','versátil'],r:'20/60',v:'1d10',ma:'derribar'},
  martillo_guerra:{n:'Martillo de guerra',al:['martillo de guerra'],d:'1d8',tipo:'contundente',cat:'marcial',p:['versátil'],v:'1d10',ma:'empujar'},
  pico_guerra:{n:'Pico de guerra',al:['pico de guerra'],d:'1d8',tipo:'perforante',cat:'marcial',p:['versátil'],v:'1d10',ma:'debilitar'},
  latigo:{n:'Látigo',al:['latigo'],d:'1d4',tipo:'cortante',cat:'marcial',p:['sutil','alcance'],ma:'ralentizar'},
  ballesta_mano:{n:'Ballesta de mano',al:['ballesta de mano'],d:'1d6',tipo:'perforante',cat:'marcial',dist:true,p:['munición','ligera','recarga'],r:'30/120',ma:'hostigar'},
  ballesta_pesada:{n:'Ballesta pesada',al:['ballesta pesada'],d:'1d10',tipo:'perforante',cat:'marcial',dist:true,p:['munición','pesada','recarga','dos manos'],r:'100/400',ma:'empujar'},
  arco_largo:{n:'Arco largo',al:['arco largo'],d:'1d8',tipo:'perforante',cat:'marcial',dist:true,p:['munición','pesada','dos manos'],r:'150/600',ma:'ralentizar'},
};
export const ARMADURAS: Record<string, any> = {
  acolchada:{n:'Acolchada',al:['acolchada'],base:11,cat:'ligera',sigilo:true},
  cuero:{n:'Cuero',al:['armadura de cuero','cuero'],base:11,cat:'ligera'},
  tachonado:{n:'Cuero tachonado',al:['cuero tachonado','cuero claveteado'],base:12,cat:'ligera'},
  pieles:{n:'Pieles',al:['pieles','armadura de pieles'],base:12,max:2,cat:'media'},
  camisote:{n:'Camisote de mallas',al:['camisote de mallas','camisa de mallas'],base:13,max:2,cat:'media'},
  escamas:{n:'Cota de escamas',al:['cota de escamas'],base:14,max:2,cat:'media',sigilo:true},
  coraza:{n:'Coraza',al:['coraza'],base:14,max:2,cat:'media'},
  media:{n:'Media armadura',al:['media armadura','semiplacas'],base:15,max:2,cat:'media',sigilo:true},
  anillas:{n:'Cota de anillas',al:['cota de anillas'],base:14,max:0,cat:'pesada',sigilo:true},
  mallas:{n:'Cota de mallas',al:['cota de mallas'],base:16,max:0,cat:'pesada',fue:13,sigilo:true},
  bandas:{n:'Bandas',al:['bandas','armadura de bandas'],base:17,max:0,cat:'pesada',fue:15,sigilo:true},
  placas:{n:'Placas',al:['placas','armadura de placas'],base:18,max:0,cat:'pesada',fue:15,sigilo:true},
};
export function findByAlias(table, name){
  const n = ' ' + norm(name).replace(/[^a-z0-9 ]/g, ' ') + ' ';
  let best = null, bestLen = 0;
  for (const [k, w] of Object.entries(table)) for (const a of w.al) {
    if (n.includes(' ' + a + ' ') && a.length > bestLen) { best = k; bestLen = a.length; }
  }
  return best;
}
