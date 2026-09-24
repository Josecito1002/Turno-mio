import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // PGlite carga archivos .wasm/.data en tiempo de ejecución; no se empaqueta.
  serverExternalPackages: ['@electric-sql/pglite'],
  // Hay un package-lock.json suelto en la carpeta del usuario; la raíz del proyecto es esta.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
