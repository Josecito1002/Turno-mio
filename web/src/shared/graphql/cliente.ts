export class ErrorGraphQL extends Error {
  constructor(message: string, public code?: string) { super(message); }
}

/** Llama a /api/graphql. `keepalive` permite terminar el envío aunque se cierre la pestaña. Las lecturas que fallan
    porque la base estaba ocupada se repiten una vez (no cambian nada); las mutaciones no, para no aplicarlas dos veces. */
export async function gql<T = unknown>(query: string, variables?: Record<string, unknown>, opts: { keepalive?: boolean } = {}): Promise<T> {
  try { return await gqlUnaVez<T>(query, variables, opts); }
  catch (e) {
    if (!(e instanceof ErrorGraphQL) || e.code !== 'BASE_OCUPADA' || /^\s*mutation\b/.test(query)) throw e;
    await new Promise(r => setTimeout(r, 700 + Math.random() * 600));
    return gqlUnaVez<T>(query, variables, opts);
  }
}

async function gqlUnaVez<T>(query: string, variables: Record<string, unknown> | undefined, opts: { keepalive?: boolean }): Promise<T> {
  const body = JSON.stringify({ query, variables });
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    // Los navegadores rechazan keepalive con cuerpos de más de 64 KB.
    keepalive: !!opts.keepalive && body.length < 60_000,
  });
  const json = await res.json().catch(() => null);
  if (!json) throw new ErrorGraphQL(`El servidor respondió ${res.status}.`);
  if (json.errors?.length) throw new ErrorGraphQL(json.errors[0].message, json.errors[0].extensions?.code);
  return json.data as T;
}
