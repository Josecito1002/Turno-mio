# Mi turno: instrucciones para Claude

App de hojas de personaje de D&D 2024 en español. El código está en `web/` (Next.js 16, React 19, GraphQL Yoga, Drizzle,
Postgres en Supabase). Todos los comandos `npm` se corren desde `web/`. Responde al usuario en español.
Si no existe `web/node_modules` (sesión nueva en la nube), empieza con `cd web && npm install`.

## Git y publicación

- El repositorio que publica Vercel es **Josecito1002/Turno-mio**, rama `main`. En la PC del usuario ese remoto se llama
  `nuevo`; `origin` (HoSung23/mi-turno) es de otra persona: **nunca subas nada ahí**.
- Al terminar un trabajo: commit y push a `main` de Josecito1002/Turno-mio para que Vercel lo publique.
- Antes de subir: `npm run typecheck`, `npm run lint`, `npm test` y, si cambió código de la app, `npm run build`.
- Los archivos usan mayormente CRLF; al editar, conserva los finales de línea.

## Reglas del contenido

- **Siempre la versión oficial más reciente** de cada clase, subclase, especie, dote o regla (Manual del Jugador 2024 y
  libros posteriores: Heroes of Faerûn 2025, Eberron: Forge of the Artificer 2025, Ravenloft: The Horrors Within 2026,
  Arcana Unleashed 2026). Nunca cambiar algo por una versión más vieja. Las revisiones de la comunidad no cuentan.
- Subclases antiguas sin versión 2024: se conservan, con sus rasgos de nivel 1 y 2 movidos al 3.
- Textos en español, escritos con palabras propias: nunca copiar ni traducir literal el libro.
- Al revisar, anotar en `docs/revision-reglas.md` qué versión se usó y en qué difería la biblioteca.
- Antes de agregar algo nuevo, comprobar que no exista ya con otro nombre.

## Lotes con Gemini

Gemini redacta cada lote a partir del texto oficial; Claude revisa el informe del script y aplica. No repetir la
investigación que ya trae el texto oficial.

1. `npm run gemini:encargo -- <clase>` crea `docs/gemini/lote-NN-<clase>.md` (el usuario se lo pasa a Gemini).
2. La respuesta de Gemini va en `docs/gemini/respuesta-NN-<clase>.md`. Si el usuario la pega en el chat, guárdala ahí.
3. Cuando el usuario diga **"analiza lote N"**: `npm run gemini:revisar -- <clase>`. Lee solo el informe. Corrige los
   errores en el archivo de respuesta (o dile al usuario qué pedirle a Gemini) y comprueba lo dudoso de los avisos
   contra el texto oficial del encargo.
4. `npm run gemini:revisar -- <clase> --aplicar`: escribe `scripts/datos/<clase>-2024.ts` y
   `src/features/reglas/data/generadas/<clase>.ts`, y marca el documento de revisión.
5. `npm run db:actualizar-clase -- <clase> --ver`, y luego sin `--ver` (en la nube, con `--solo-archivo`: la base se
   actualiza al publicar).
6. Lo que el informe lista "para hacer a mano" (CA, ataques, daños especiales) va en
   `src/features/reglas/data/reglas-revisadas.ts`, que tiene prioridad sobre lo generado.
7. Pruebas automáticas solo para lo que el motor calcula (usos, CA, daños, selectores, pericias), no para rasgos que
   son solo texto.
8. Commit y push, y al final un resumen corto: qué cambió, qué no se pudo confirmar y qué revisar.

Números de lote: 7 Brujo, 8 Clérigo, 9 Druida, 10 Explorador, 11 Guerrero, 12 Hechicero, 13 Mago, 14 Monje,
15 Paladín, 16 Pícaro.

### Lotes 17 a 20 (no son clases)

Sus encargos los genera `npm run gemini:encargo-extra` (`scripts/gemini/encargo-extra.ts`), con el mismo formato:

- 17 `lote-17-dotes-generales.md`, 18 `lote-18-dotes-origen-y-otras.md` (origen, estilos de combate, marcas de dragón,
  dones oscuros), 19 `lote-19-dotes-epicas.md`: la parte A es `DOTES_NUEVAS` (clave → `{ n, t, cat, nivelMin, texto }`,
  mismas claves que `biblioteca.dotes`); B mecánicas con "donde" = clave de la dote.
- 20 `lote-20-especies-y-selectores.md`: A trae `ESPECIES_NUEVAS` (Aarakocra, Gnomo de las Profundidades, Duergar) y
  `LINAJES_GEMA` (linajes del Dracónido de gema); B trae también los selectores sueltos (Orden Divina, Orden
  Primordial, formas de Forma Salvaje, Afinidad Elemental, Dominio de Conjuros, planos del Artífice, truco del Colegio
  de la Luna, estilo adicional del Campeón) con "donde" = "clase:<clave>" o la clave de la subclase.
- La respuesta va en `docs/gemini/respuesta-NN-<nombre>.md` (mismo nombre que el encargo, con "respuesta").
- **`gemini:revisar` todavía no sabe leer estos lotes**: la primera vez que se analice uno hay que adaptarlo (validar A
  y B igual que en las clases; aplicar las dotes con una opción nueva de `actualizar-clase` sobre la sección `dotes`,
  las especies sobre `especies`, y los selectores como reglas en `generadas/`).

### Lote 21: objetos mágicos

- `npm run gemini:encargo-objetos` (`scripts/gemini/encargo-objetos.ts`) genera cinco encargos: `lote-21a-objetos-comunes`,
  `21b-objetos-raros`, `21c-objetos-muy-raros`, `21d-objetos-legendarios` y `21e-objetos-variantes` (armas y armaduras
  mágicas que van sobre una que elige el jugador). Fuente: Guía del Dungeon Master 2024 y libros posteriores.
- La parte A de cada respuesta es `OBJETOS` con la forma de `ObjetoMagico` (`src/features/reglas/data/objetos-magicos.ts`).
  Al aplicarla, se suma a `OBJETOS_MAGICOS_GENERADOS` en `src/features/reglas/data/generadas/objetos-magicos.ts`, que
  tiene prioridad sobre el catálogo inicial. Comprobar que los conjuros existan en la app y que las claves no se repitan.

## Revisión en la app

- **No revises la app con un navegador automático**: la revisión la hace el usuario en Vercel.
- Cuando haya algo que revisar, crea personajes de prueba en su cuenta: `npm run prueba:crear -- <clase>
  [clave-subclase:nivel ...]` (sin lista, uno por subclase en nivel 20). Dile qué mirar en cada uno (paso o pestaña,
  y qué debería verse).
- Cuando el usuario diga que terminó de revisar: `npm run prueba:borrar` (solo borra los marcados como prueba).

## Base de datos

**Al publicar en Vercel (producción), `scripts/despliegue.ts` deja la base igual que el repositorio** antes de
compilar: aplica migraciones, reescribe cada clase, especie y dote de `biblioteca-mi-turno.json` que difiera de la base,
y deja en la cuenta de prueba exactamente los personajes de `web/scripts/datos/personajes-prueba.json`. El resultado
sale en el registro de la compilación, en las líneas `[despliegue]`.

- **En la nube no hay conexión a la base** (solo sale tráfico web), así que:
  - aplica los lotes con `npm run db:actualizar-clase -- <clase> --solo-archivo` (solo el JSON) y súbelo: la base se
    pone al día al publicar;
  - para personajes de prueba usa `npm run prueba:pedir -- <clase> [clave-subclase:nivel ...]` y, cuando el usuario
    termine de revisar, `npm run prueba:quitar`; en los dos casos, commit y push para que se apliquen.
- En la PC, con `DATABASE_URL` en `web/.env.local`, también sirven `db:actualizar-clase` sin `--solo-archivo`,
  `prueba:crear` y `prueba:borrar`, que actúan al momento.
- Los personajes de prueba tardan lo que tarde Vercel en publicar (un par de minutos): díselo al usuario.
