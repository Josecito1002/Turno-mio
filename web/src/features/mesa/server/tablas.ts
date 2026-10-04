import { foreignKey, index, jsonb, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usuarios } from '../../cuentas/server/tablas';
import { personajes } from '../../personajes/server/tablas';

/* Campaña del DM: {id, nombre, pjs, monstruos, estado, combate} */
export const campanas = pgTable('campanas', {
  usuarioId: uuid('usuario_id').notNull().references(() => usuarios.id, { onDelete: 'cascade' }),
  id: text('id').notNull(),
  nombre: text('nombre').notNull(),
  datos: jsonb('datos').notNull(),
  /** Código que el DM comparte para que los jugadores se unan a la mesa (único; null hasta que se pide). */
  codigo: text('codigo').unique(),
  /** El combate que ven los jugadores unidos: {activo, ronda, turno, orden, economia}. Aparte de `datos` para que lo que gastan
      los jugadores (economia) y lo que publica el DM (el resto) no se pisen al guardar la campaña. */
  combateVivo: jsonb('combate_vivo'),
  creadoEn: timestamp('creado_en', { withTimezone: true }).notNull().defaultNow(),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true }).notNull().defaultNow(),
}, t => [primaryKey({ columns: [t.usuarioId, t.id] })]);

/** Personajes de jugadores unidos a una mesa con su código. El DM los ve en vivo; la hoja sigue siendo del jugador. */
export const mesaJugadores = pgTable('mesa_jugadores', {
  dmId: uuid('dm_id').notNull(),
  campanaId: text('campana_id').notNull(),
  jugadorId: uuid('jugador_id').notNull(),
  personajeId: text('personaje_id').notNull(),
  unidoEn: timestamp('unido_en', { withTimezone: true }).notNull().defaultNow(),
}, t => [
  primaryKey({ columns: [t.dmId, t.campanaId, t.jugadorId, t.personajeId] }),
  // Si se borra la campaña o el personaje, el vínculo desaparece solo
  foreignKey({ columns: [t.dmId, t.campanaId], foreignColumns: [campanas.usuarioId, campanas.id] }).onDelete('cascade'),
  foreignKey({ columns: [t.jugadorId, t.personajeId], foreignColumns: [personajes.usuarioId, personajes.id] }).onDelete('cascade'),
  index('mesa_jugadores_jugador_idx').on(t.jugadorId),
]);
