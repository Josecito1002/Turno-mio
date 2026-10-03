-- Idempotente: la base de producción ya recibió este SQL a mano (sin quedar registrado en drizzle),
-- así que cada paso se salta si ya existe y el despliegue solo lo registra.
CREATE TABLE IF NOT EXISTS "mesa_jugadores" (
	"dm_id" uuid NOT NULL,
	"campana_id" text NOT NULL,
	"jugador_id" uuid NOT NULL,
	"personaje_id" text NOT NULL,
	"unido_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "mesa_jugadores_dm_id_campana_id_jugador_id_personaje_id_pk" PRIMARY KEY("dm_id","campana_id","jugador_id","personaje_id")
);
--> statement-breakpoint
ALTER TABLE "campanas" ADD COLUMN IF NOT EXISTS "codigo" text;--> statement-breakpoint
DO $$ BEGIN
	ALTER TABLE "mesa_jugadores" ADD CONSTRAINT "mesa_jugadores_dm_id_campana_id_campanas_usuario_id_id_fk" FOREIGN KEY ("dm_id","campana_id") REFERENCES "public"."campanas"("usuario_id","id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object OR duplicate_table THEN NULL;
END $$;--> statement-breakpoint
DO $$ BEGIN
	ALTER TABLE "mesa_jugadores" ADD CONSTRAINT "mesa_jugadores_jugador_id_personaje_id_personajes_usuario_id_id_fk" FOREIGN KEY ("jugador_id","personaje_id") REFERENCES "public"."personajes"("usuario_id","id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object OR duplicate_table THEN NULL;
END $$;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "mesa_jugadores_jugador_idx" ON "mesa_jugadores" USING btree ("jugador_id");--> statement-breakpoint
DO $$ BEGIN
	ALTER TABLE "campanas" ADD CONSTRAINT "campanas_codigo_unique" UNIQUE("codigo");
EXCEPTION WHEN duplicate_object OR duplicate_table THEN NULL;
END $$;
