import type { NextConfig } from 'next';

// marked-hbfm (el Markdown de Homebrewery que usan las guías) y sus extensiones dan al navegador una versión UMD que
// busca `marked` como variable global: empaquetada falla con «Cannot read properties of undefined (reading 'marked')».
// Se usa su código ESM, que es lo que traen en `module`.
const UMD_A_ESM = Object.fromEntries([
  'marked-hbfm', 'marked-alignment-paragraphs', 'marked-definition-lists', 'marked-extended-tables',
  'marked-nonbreaking-spaces', 'marked-subsuper-text', 'marked-variables',
].map((p) => [p, `./node_modules/${p}/src/index.js`]));

const nextConfig: NextConfig = {
  // PGlite carga archivos .wasm/.data en tiempo de ejecución; no se empaqueta.
  serverExternalPackages: ['@electric-sql/pglite'],
  // Hay un package-lock.json suelto en la carpeta del usuario; la raíz del proyecto es esta.
  turbopack: { root: process.cwd(), resolveAlias: UMD_A_ESM },
  // Imágenes de la biblioteca copiadas al compilar: el nombre es la huella del contenido, así que no cambian nunca.
  async headers() {
    return [{ source: '/img/biblioteca/:archivo', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }];
  },
};

export default nextConfig;
