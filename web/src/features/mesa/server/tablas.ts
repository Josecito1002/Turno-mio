import { jsonb, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usuarios } from '../../cuentas/server/tablas';

/* Campaña del DM: {id, nombre, pjs, monstruos, estado, combate} */
export const campanas = pgTable('campanas', {
  usuarioId: uuid('usuario_id').notNull().references(() => usuarios.id, { onDelete: 'cascade' }),
  id: text('id').notNull(),
  nombre: text('nombre').notNull(),
  datos: jsonb('datos').notNull(),
  creadoEn: timestamp('creado_en', { withTimezone: true }).notNull().defaultNow(),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true }).notNull().defaultNow(),
}, t => [primaryKey({ columns: [t.usuarioId, t.id] })]);
