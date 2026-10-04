CREATE TABLE "enlaces_personaje" (
	"token" text PRIMARY KEY NOT NULL,
	"dueno_id" uuid NOT NULL,
	"personaje_id" text NOT NULL,
	"permite_copiar" boolean DEFAULT true NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "enlaces_personaje_personaje_unq" UNIQUE("dueno_id","personaje_id")
);
--> statement-breakpoint
DROP TABLE "personajes_compartidos" CASCADE;--> statement-breakpoint
ALTER TABLE "enlaces_personaje" ADD CONSTRAINT "enlaces_personaje_dueno_id_personaje_id_personajes_usuario_id_id_fk" FOREIGN KEY ("dueno_id","personaje_id") REFERENCES "public"."personajes"("usuario_id","id") ON DELETE cascade ON UPDATE no action;