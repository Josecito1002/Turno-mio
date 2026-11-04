CREATE TABLE "salas_sorteo" (
	"codigo" text PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"secreto" text NOT NULL,
	"config" jsonb NOT NULL,
	"tiradas" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"presencia" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "salas_sorteo_actualizado_idx" ON "salas_sorteo" USING btree ("actualizado_en");--> statement-breakpoint
-- Como las demás tablas: cerrada a la API REST de Supabase; la app entra con el dueño de las tablas.
ALTER TABLE "salas_sorteo" ENABLE ROW LEVEL SECURITY;
