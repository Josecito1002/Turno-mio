import { foreignKey, index, jsonb, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';
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

/** Personajes que su dueño compartió con otro jugador. Quien lo recibe ve la hoja (sin tocarla) y puede copiarla a su cuenta. */
export const personajesCompartidos = pgTable('personajes_compartidos', {
  duenoId: uuid('dueno_id').notNull(),
  personajeId: text('personaje_id').notNull(),
  conId: uuid('con_id').notNull().references(() => usuarios.id, { onDelete: 'cascade' }),
  compartidoEn: timestamp('compartido_en', { withTimezone: true }).notNull().defaultNow(),
}, t => [
  primaryKey({ columns: [t.duenoId, t.personajeId, t.conId] }),
  // Si el dueño borra el personaje, deja de estar compartido
  foreignKey({ columns: [t.duenoId, t.personajeId], foreignColumns: [personajes.usuarioId, personajes.id] }).onDelete('cascade'),
  index('personajes_compartidos_con_idx').on(t.conId),
]);
