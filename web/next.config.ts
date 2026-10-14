import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // PGlite carga archivos .wasm/.data en tiempo de ejecución; no se empaqueta.
  serverExternalPackages: ['@electric-sql/pglite'],
  // Hay un package-lock.json suelto en la carpeta del usuario; la raíz del proyecto es esta.
  turbopack: { root: process.cwd() },
  // Imágenes de la biblioteca copiadas al compilar: el nombre es la huella del contenido, así que no cambian nunca.
  async headers() {
    return [{ source: '/img/biblioteca/:archivo', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }];
  },
};

export default nextConfig;
