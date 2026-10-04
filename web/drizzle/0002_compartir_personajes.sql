CREATE TABLE "personajes_compartidos" (
	"dueno_id" uuid NOT NULL,
	"personaje_id" text NOT NULL,
	"con_id" uuid NOT NULL,
	"compartido_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "personajes_compartidos_dueno_id_personaje_id_con_id_pk" PRIMARY KEY("dueno_id","personaje_id","con_id")
);
--> statement-breakpoint
ALTER TABLE "personajes_compartidos" ADD CONSTRAINT "personajes_compartidos_con_id_usuarios_id_fk" FOREIGN KEY ("con_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personajes_compartidos" ADD CONSTRAINT "personajes_compartidos_dueno_id_personaje_id_personajes_usuario_id_id_fk" FOREIGN KEY ("dueno_id","personaje_id") REFERENCES "public"."personajes"("usuario_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "personajes_compartidos_con_idx" ON "personajes_compartidos" USING btree ("con_id");