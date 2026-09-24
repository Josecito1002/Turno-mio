# Mi turno

Creador y hoja de personaje para D&D 2024, con mesa del DM.

- `index.html`: versión original (una sola página, guardaba en localStorage).
- `biblioteca-mi-turno.json`: biblioteca exportada; se usa para sembrar la base.
- `web/`: la app en Next.js 16 + React + Tailwind, con GraphQL (Yoga), Drizzle/Postgres y login (Auth.js).

## Arrancar

```bash
cd web
npm install
cp .env.example .env.local   # DATABASE_URL (Supabase/Neon o pglite:./.data/pg) y AUTH_SECRET
npm run db:migrar            # crea las tablas
npm run db:sembrar           # carga ../biblioteca-mi-turno.json
npm run dev
```

La primera cuenta que se registra (o las de `ADMIN_EMAILS`) administra la biblioteca.
GraphiQL queda en `/api/graphql` en desarrollo.
