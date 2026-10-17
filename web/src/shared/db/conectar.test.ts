import { test } from 'node:test';
import assert from 'node:assert/strict';
import { urlServidor } from './conectar';

test('el pooler de Supabase en modo sesión pasa al modo transacción', () => {
  const sesion = 'postgresql://postgres.abc:cl%40ve@aws-0-us-east-2.pooler.supabase.com:5432/postgres';
  assert.equal(urlServidor(sesion), 'postgresql://postgres.abc:cl%40ve@aws-0-us-east-2.pooler.supabase.com:6543/postgres');
  assert.equal(urlServidor(sesion.replace(':5432', ':6543')), sesion.replace(':5432', ':6543'));
});

test('las demás URL quedan igual', () => {
  for (const u of ['postgres://u:p@ep-algo.neon.tech:5432/db', 'pglite:./.data/pg', undefined]) assert.equal(urlServidor(u), u);
});
