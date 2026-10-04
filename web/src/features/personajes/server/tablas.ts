import { foreignKey, jsonb, pgTable, primaryKey, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { usuarios } from '../../cuentas/server/tablas';

/* El personaje se guarda completo en jsonb: reparar() lo migra al abrirlo, igual que antes. */
export const personajes = pgTable('personajes', {
  usuarioId: uuid('usuario_id').notNull().references(() => usuarios.id, { onDelete: 'cascade' }),
  id: text('id').notNull(),
  nombre: text('nombre').notNull().default('Sin nombre'),
  resumen: text('resumen'),
  datos: jsonb('datos').notNull(),
  creadoEn: timestamp('creado_en', { withTimezone: true }).notNull().defaultNow(),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true }).notNull().defaultNow(),
}, t => [primaryKey({ columns: [t.usuarioId, t.id] })]);

/** Enlace para compartir un personaje: quien lo abre ve la hoja (siempre al día) y puede guardar una copia. */
export const enlacesPersonaje = pgTable('enlaces_personaje', {
  token: text('token').primaryKey(),
  duenoId: uuid('dueno_id').notNull(),
  personajeId: text('personaje_id').notNull(),
  creadoEn: timestamp('creado_en', { withTimezone: true }).notNull().defaultNow(),
}, t => [
  // Un enlace por personaje; si el dueño borra el personaje, el enlace deja de servir
  unique('enlaces_personaje_personaje_unq').on(t.duenoId, t.personajeId),
  foreignKey({ columns: [t.duenoId, t.personajeId], foreignColumns: [personajes.usuarioId, personajes.id] }).onDelete('cascade'),
]);
