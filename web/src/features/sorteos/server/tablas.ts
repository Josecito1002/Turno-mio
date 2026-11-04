import { index, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

/** Sala de sorteo: se entra con el enlace, sin cuenta. Se borra sola a la semana sin uso. */
export const salasSorteo = pgTable('salas_sorteo', {
  codigo: text('codigo').primaryKey(),
  nombre: text('nombre').notNull(),
  /** Lo guarda el navegador de quien creó la sala: con él se cambia la configuración */
  secreto: text('secreto').notNull(),
  /** {todosTiran, opciones (ruleta), hostId} */
  config: jsonb('config').notNull(),
  /** Las últimas tiradas, la más nueva primero */
  tiradas: jsonb('tiradas').notNull().default([]),
  /** {visitanteId: {n: nombre, v: último latido en ms}} */
  presencia: jsonb('presencia').notNull().default({}),
  creadoEn: timestamp('creado_en', { withTimezone: true }).notNull().defaultNow(),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true }).notNull().defaultNow(),
}, t => [index('salas_sorteo_actualizado_idx').on(t.actualizadoEn)]);
