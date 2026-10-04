'use server';
import bcrypt from 'bcryptjs';
import { count, eq } from 'drizzle-orm';
import { AuthError } from 'next-auth';
import { db } from '@/shared/db/cliente';
import { usuarios } from './tablas';
import { signIn, signOut } from './auth';
import { volverSeguro } from '../volver';

/** Se devuelven los campos escritos para que no se borren si hay error (React vacía el formulario al enviarlo). */
export type EstadoForm = { error?: string; email?: string; nombre?: string } | undefined;

const adminsPorEnv = () => (process.env.ADMIN_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

export async function iniciarSesion(_: EstadoForm, fd: FormData): Promise<EstadoForm> {
  try {
    await signIn('credentials', { email: fd.get('email'), password: fd.get('password'), redirectTo: volverSeguro(fd.get('volver')) });
  } catch (e) {
    const campos = { email: String(fd.get('email') || ''), nombre: String(fd.get('nombre') || '') };
    if (e instanceof AuthError && e.type === 'CredentialsSignin') return { error: 'Correo o contraseña incorrectos.', ...campos };
    // Otros errores de Auth.js (p. ej. la base no responde dentro de authorize)
    if (e instanceof AuthError) { console.error(e); return { error: SIN_BASE, ...campos }; }
    throw e; // la redirección de Next viaja como excepción
  }
}

const SIN_BASE = 'No se pudo conectar con la base de datos. Revisa DATABASE_URL en el servidor.';

export async function registrarse(_: EstadoForm, fd: FormData): Promise<EstadoForm> {
  const nombre = String(fd.get('nombre') || '').trim();
  const email = String(fd.get('email') || '').trim().toLowerCase();
  const password = String(fd.get('password') || '');
  const campos = { email, nombre };
  if (!nombre) return { error: 'Escribe tu nombre.', ...campos };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: 'Ese correo no parece válido.', ...campos };
  if (password.length < 8) return { error: 'La contraseña necesita al menos 8 caracteres.', ...campos };
  const [ya] = await db.select({ id: usuarios.id }).from(usuarios).where(eq(usuarios.email, email)).limit(1);
  if (ya) return { error: 'Ya hay una cuenta con ese correo.', ...campos };
  // La primera cuenta (o las de ADMIN_EMAILS) administra la biblioteca, como el PIN de antes.
  const [{ n }] = await db.select({ n: count() }).from(usuarios);
  const rol = n === 0 || adminsPorEnv().includes(email) ? 'admin' : 'jugador';
  await db.insert(usuarios).values({ nombre, email, hash: await bcrypt.hash(password, 10), rol });
  return iniciarSesion(undefined, fd);
}

export async function cerrarSesion() {
  await signOut({ redirectTo: '/login' });
}
