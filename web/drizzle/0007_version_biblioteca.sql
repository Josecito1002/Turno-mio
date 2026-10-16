-- La web guarda la biblioteca en el navegador y solo la vuelve a pedir cuando esta versión cambia. La sube un trigger
-- en cada cambio de las tablas de la biblioteca, así ningún script ni mutación tiene que acordarse de hacerlo.
CREATE TABLE "biblioteca_version" (
	"id" smallint PRIMARY KEY NOT NULL,
	"version" bigint DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "biblioteca_version" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
INSERT INTO "biblioteca_version" ("id", "version") VALUES (1, 1) ON CONFLICT DO NOTHING;
--> statement-breakpoint
CREATE OR REPLACE FUNCTION subir_version_biblioteca() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  UPDATE "biblioteca_version" SET "version" = "version" + 1 WHERE "id" = 1;
  RETURN NULL;
END;
$$;
--> statement-breakpoint
CREATE TRIGGER "clases_version" AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE ON "clases" FOR EACH STATEMENT EXECUTE FUNCTION subir_version_biblioteca();
--> statement-breakpoint
CREATE TRIGGER "subclases_version" AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE ON "subclases" FOR EACH STATEMENT EXECUTE FUNCTION subir_version_biblioteca();
--> statement-breakpoint
CREATE TRIGGER "especies_version" AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE ON "especies" FOR EACH STATEMENT EXECUTE FUNCTION subir_version_biblioteca();
--> statement-breakpoint
CREATE TRIGGER "subespecies_version" AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE ON "subespecies" FOR EACH STATEMENT EXECUTE FUNCTION subir_version_biblioteca();
--> statement-breakpoint
CREATE TRIGGER "rasgos_version" AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE ON "rasgos" FOR EACH STATEMENT EXECUTE FUNCTION subir_version_biblioteca();
--> statement-breakpoint
CREATE TRIGGER "dotes_version" AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE ON "dotes" FOR EACH STATEMENT EXECUTE FUNCTION subir_version_biblioteca();
--> statement-breakpoint
CREATE TRIGGER "trasfondos_version" AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE ON "trasfondos" FOR EACH STATEMENT EXECUTE FUNCTION subir_version_biblioteca();
--> statement-breakpoint
CREATE TRIGGER "conjuros_version" AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE ON "conjuros" FOR EACH STATEMENT EXECUTE FUNCTION subir_version_biblioteca();
--> statement-breakpoint
CREATE TRIGGER "conjuro_clases_version" AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE ON "conjuro_clases" FOR EACH STATEMENT EXECUTE FUNCTION subir_version_biblioteca();
--> statement-breakpoint
CREATE TRIGGER "lib_extra_version" AFTER INSERT OR UPDATE OR DELETE OR TRUNCATE ON "lib_extra" FOR EACH STATEMENT EXECUTE FUNCTION subir_version_biblioteca();
