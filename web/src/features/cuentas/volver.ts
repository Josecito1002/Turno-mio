/** Adónde volver después de entrar: solo al enlace de un personaje compartido; cualquier otra cosa, al inicio. */
export const volverSeguro = (v: unknown) => (typeof v === 'string' && /^\/p\/[A-Za-z0-9_-]{1,64}$/.test(v) ? v : '/');
