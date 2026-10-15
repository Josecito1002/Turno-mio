-- Supabase publica las tablas de "public" por su API REST (PostgREST). La app no usa esa API: se conecta directo a
-- Postgres con el usuario dueño de las tablas, que no está sujeto a RLS. Activar RLS sin políticas cierra la API REST
-- (nadie con la clave anónima puede leer ni escribir) y a la app no le cambia nada.
ALTER TABLE "campanas" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "clases" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "conjuro_clases" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "conjuros" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "dotes" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "enlaces_personaje" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "especies" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "lib_extra" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "mesa_jugadores" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "personajes" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "rasgos" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "subclases" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "subespecies" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "trasfondos" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "usuarios" ENABLE ROW LEVEL SECURITY;
