import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const usuarios = pgTable('usuarios', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  nombre: text('nombre').notNull(),
  hash: text('hash').notNull(),
  /** 'admin' edita la biblioteca; 'jugador' solo la usa y le aporta lo que importa. */
  rol: text('rol').notNull().default('jugador'),
  /** Último personaje abierto (antes miturno2:ultimo). */
  ultimoPj: text('ultimo_pj'),
  creadoEn: timestamp('creado_en', { withTimezone: true }).notNull().defaultNow(),
});
