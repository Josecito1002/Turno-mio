CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"nombre" text NOT NULL,
	"hash" text NOT NULL,
	"rol" text DEFAULT 'jugador' NOT NULL,
	"ultimo_pj" text,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "clases" (
	"id" text PRIMARY KEY NOT NULL,
	"nombre" text,
	"es_lib" boolean DEFAULT false NOT NULL,
	"fuente" text,
	"dado_golpe" smallint,
	"salvaciones" text[],
	"num_habilidades" smallint,
	"habilidades" jsonb,
	"armaduras" text,
	"armas" text,
	"competencia_armas" jsonb,
	"atributo_conjuros" text,
	"tipo_lanzador" text,
	"tabla_espacios" jsonb,
	"tabla_recursos" jsonb,
	"niveles_asi" smallint[],
	"nivel_estilo" smallint,
	"estilos" text[],
	"maestrias" smallint,
	"hasta_nivel" smallint,
	"extra" jsonb
);
--> statement-breakpoint
CREATE TABLE "conjuro_clases" (
	"conjuro_id" text NOT NULL,
	"clase_id" text NOT NULL,
	CONSTRAINT "conjuro_clases_conjuro_id_clase_id_pk" PRIMARY KEY("conjuro_id","clase_id")
);
--> statement-breakpoint
CREATE TABLE "conjuros" (
	"id" text PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"nivel" smallint NOT NULL,
	"tiempo" text DEFAULT 'accion' NOT NULL,
	"alcance" text DEFAULT '' NOT NULL,
	"duracion" text DEFAULT '' NOT NULL,
	"concentracion" boolean DEFAULT false NOT NULL,
	"ritual" boolean DEFAULT false NOT NULL,
	"salvacion" text DEFAULT '' NOT NULL,
	"ataque" boolean DEFAULT false NOT NULL,
	"dados" text DEFAULT '' NOT NULL,
	"descripcion" text DEFAULT '' NOT NULL,
	"extra" jsonb
);
--> statement-breakpoint
CREATE TABLE "dotes" (
	"id" text PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"tipo" text DEFAULT 'pasiva' NOT NULL,
	"texto" text DEFAULT '' NOT NULL,
	"categoria" text DEFAULT '' NOT NULL,
	"nivel_min" smallint DEFAULT 1 NOT NULL,
	"extra" jsonb
);
--> statement-breakpoint
CREATE TABLE "especies" (
	"id" text PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"es_lib" boolean DEFAULT false NOT NULL,
	"fuente" text,
	"resumen" text,
	"velocidad" smallint DEFAULT 30 NOT NULL,
	"vision" smallint DEFAULT 0 NOT NULL,
	"etiqueta_sub" text,
	"extra" jsonb
);
--> statement-breakpoint
CREATE TABLE "lib_extra" (
	"tipo" text NOT NULL,
	"clave" text NOT NULL,
	"valor" jsonb NOT NULL,
	CONSTRAINT "lib_extra_tipo_clave_pk" PRIMARY KEY("tipo","clave")
);
--> statement-breakpoint
CREATE TABLE "rasgos" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"origen" text NOT NULL,
	"clase_id" text,
	"subclase" text,
	"especie_id" text,
	"subespecie" text,
	"orden" smallint NOT NULL,
	"nombre" text NOT NULL,
	"tipo" text DEFAULT 'pasiva' NOT NULL,
	"texto" text DEFAULT '' NOT NULL,
	"nivel" smallint,
	"usos" jsonb,
	"descanso" text,
	"extra" jsonb
);
--> statement-breakpoint
CREATE TABLE "subclases" (
	"clase_id" text NOT NULL,
	"clave" text NOT NULL,
	"nombre" text NOT NULL,
	"extra" jsonb,
	CONSTRAINT "subclases_clase_id_clave_pk" PRIMARY KEY("clase_id","clave")
);
--> statement-breakpoint
CREATE TABLE "subespecies" (
	"especie_id" text NOT NULL,
	"clave" text NOT NULL,
	"nombre" text NOT NULL,
	"extra" jsonb,
	CONSTRAINT "subespecies_especie_id_clave_pk" PRIMARY KEY("especie_id","clave")
);
--> statement-breakpoint
CREATE TABLE "trasfondos" (
	"id" text PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"es_lib" boolean DEFAULT false NOT NULL,
	"atributos" text[] NOT NULL,
	"habilidades" text[] NOT NULL,
	"herramientas" text DEFAULT '' NOT NULL,
	"dote_id" text,
	"extra" jsonb
);
--> statement-breakpoint
CREATE TABLE "personajes" (
	"usuario_id" uuid NOT NULL,
	"id" text NOT NULL,
	"nombre" text DEFAULT 'Sin nombre' NOT NULL,
	"resumen" text,
	"datos" jsonb NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "personajes_usuario_id_id_pk" PRIMARY KEY("usuario_id","id")
);
--> statement-breakpoint
CREATE TABLE "campanas" (
	"usuario_id" uuid NOT NULL,
	"id" text NOT NULL,
	"nombre" text NOT NULL,
	"datos" jsonb NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "campanas_usuario_id_id_pk" PRIMARY KEY("usuario_id","id")
);
--> statement-breakpoint
ALTER TABLE "conjuro_clases" ADD CONSTRAINT "conjuro_clases_conjuro_id_conjuros_id_fk" FOREIGN KEY ("conjuro_id") REFERENCES "public"."conjuros"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rasgos" ADD CONSTRAINT "rasgos_clase_id_clases_id_fk" FOREIGN KEY ("clase_id") REFERENCES "public"."clases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rasgos" ADD CONSTRAINT "rasgos_especie_id_especies_id_fk" FOREIGN KEY ("especie_id") REFERENCES "public"."especies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subclases" ADD CONSTRAINT "subclases_clase_id_clases_id_fk" FOREIGN KEY ("clase_id") REFERENCES "public"."clases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subespecies" ADD CONSTRAINT "subespecies_especie_id_especies_id_fk" FOREIGN KEY ("especie_id") REFERENCES "public"."especies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personajes" ADD CONSTRAINT "personajes_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campanas" ADD CONSTRAINT "campanas_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "conjuro_clases_clase_idx" ON "conjuro_clases" USING btree ("clase_id");--> statement-breakpoint
CREATE INDEX "rasgos_clase_idx" ON "rasgos" USING btree ("clase_id","origen","subclase","orden");--> statement-breakpoint
CREATE INDEX "rasgos_especie_idx" ON "rasgos" USING btree ("especie_id","orden");