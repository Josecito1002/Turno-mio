import { jsonb, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';
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
