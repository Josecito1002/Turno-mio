import { bigserial, boolean, index, jsonb, pgTable, primaryKey, smallint, text } from 'drizzle-orm/pg-core';

/* Catálogo compartido (antes miturno2:biblioteca). Las columnas `extra` guardan cualquier
   campo que no tenga columna propia, para que importar y exportar no pierda nada. */

export const clases = pgTable('clases', {
  id: text('id').primaryKey(),
  nombre: text('nombre'),
  esLib: boolean('es_lib').notNull().default(false),
  fuente: text('fuente'),
  dadoGolpe: smallint('dado_golpe'),
  salvaciones: text('salvaciones').array(),
  numHabilidades: smallint('num_habilidades'),
  habilidades: jsonb('habilidades'), // lista o 'todas'
  armaduras: text('armaduras'),
  armas: text('armas'),
  competenciaArmas: jsonb('competencia_armas'),
  atributoConjuros: text('atributo_conjuros'),
  tipoLanzador: text('tipo_lanzador'),
  tablaEspacios: jsonb('tabla_espacios'),
  tablaRecursos: jsonb('tabla_recursos'),
  nivelesAsi: smallint('niveles_asi').array(),
  nivelEstilo: smallint('nivel_estilo'),
  estilos: text('estilos').array(),
  maestrias: smallint('maestrias'),
  hastaNivel: smallint('hasta_nivel'),
  extra: jsonb('extra'),
});

export const subclases = pgTable('subclases', {
  claseId: text('clase_id').notNull().references(() => clases.id, { onDelete: 'cascade' }),
  clave: text('clave').notNull(),
  nombre: text('nombre').notNull(),
  extra: jsonb('extra'),
}, t => [primaryKey({ columns: [t.claseId, t.clave] })]);

export const especies = pgTable('especies', {
  id: text('id').primaryKey(),
  nombre: text('nombre').notNull(),
  esLib: boolean('es_lib').notNull().default(false),
  fuente: text('fuente'),
  resumen: text('resumen'),
  velocidad: smallint('velocidad').notNull().default(30),
  vision: smallint('vision').notNull().default(0),
  etiquetaSub: text('etiqueta_sub'),
  extra: jsonb('extra'),
});

export const subespecies = pgTable('subespecies', {
  especieId: text('especie_id').notNull().references(() => especies.id, { onDelete: 'cascade' }),
  clave: text('clave').notNull(),
  nombre: text('nombre').notNull(),
  extra: jsonb('extra'),
}, t => [primaryKey({ columns: [t.especieId, t.clave] })]);

/** origen: clase | clase_alto | subclase | subclase_alto | especie */
export const rasgos = pgTable('rasgos', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  origen: text('origen').notNull(),
  claseId: text('clase_id').references(() => clases.id, { onDelete: 'cascade' }),
  subclase: text('subclase'),
  especieId: text('especie_id').references(() => especies.id, { onDelete: 'cascade' }),
  subespecie: text('subespecie'),
  orden: smallint('orden').notNull(),
  nombre: text('nombre').notNull(),
  tipo: text('tipo').notNull().default('pasiva'), // accion | adicional | reaccion | gratis | pasiva | fuera
  texto: text('texto').notNull().default(''),
  nivel: smallint('nivel'),
  usos: jsonb('usos'), // número o 'pb'
  descanso: text('descanso'), // corto | largo
  extra: jsonb('extra'),
}, t => [
  index('rasgos_clase_idx').on(t.claseId, t.origen, t.subclase, t.orden),
  index('rasgos_especie_idx').on(t.especieId, t.orden),
]);

export const dotes = pgTable('dotes', {
  id: text('id').primaryKey(),
  nombre: text('nombre').notNull(),
  tipo: text('tipo').notNull().default('pasiva'),
  texto: text('texto').notNull().default(''),
  categoria: text('categoria').notNull().default(''),
  nivelMin: smallint('nivel_min').notNull().default(1),
  extra: jsonb('extra'),
});

export const trasfondos = pgTable('trasfondos', {
  id: text('id').primaryKey(),
  nombre: text('nombre').notNull(),
  esLib: boolean('es_lib').notNull().default(false),
  atributos: text('atributos').array().notNull(),
  habilidades: text('habilidades').array().notNull(),
  herramientas: text('herramientas').notNull().default(''),
  doteId: text('dote_id'), // sin FK: puede ser una dote de las reglas base
  extra: jsonb('extra'),
});

export const conjuros = pgTable('conjuros', {
  id: text('id').primaryKey(),
  nombre: text('nombre').notNull(),
  nivel: smallint('nivel').notNull(),
  tiempo: text('tiempo').notNull().default('accion'),
  alcance: text('alcance').notNull().default(''),
  duracion: text('duracion').notNull().default(''),
  concentracion: boolean('concentracion').notNull().default(false),
  ritual: boolean('ritual').notNull().default(false),
  salvacion: text('salvacion').notNull().default(''),
  ataque: boolean('ataque').notNull().default(false),
  dados: text('dados').notNull().default(''),
  descripcion: text('descripcion').notNull().default(''),
  extra: jsonb('extra'),
});

/** Sin FK a clases: un conjuro puede listar clases base que no están en la tabla (p. ej. 'artifice'). */
export const conjuroClases = pgTable('conjuro_clases', {
  conjuroId: text('conjuro_id').notNull().references(() => conjuros.id, { onDelete: 'cascade' }),
  claseId: text('clase_id').notNull(),
}, t => [primaryKey({ columns: [t.conjuroId, t.claseId] }), index('conjuro_clases_clase_idx').on(t.claseId)]);

/** LIB.desc / LIB.img / LIB.imgOrig / LIB.imgCrop / LIB.tipos */
export const libExtra = pgTable('lib_extra', {
  tipo: text('tipo').notNull(),
  clave: text('clave').notNull(),
  valor: jsonb('valor').notNull(),
}, t => [primaryKey({ columns: [t.tipo, t.clave] })]);
