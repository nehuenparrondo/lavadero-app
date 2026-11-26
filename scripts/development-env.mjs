import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { root } from './process.mjs';

/** Desarrollo se ejecuta sobre una base escolar; no hereda producción por accidente.
 * @param {number} apiPort Puerto local libre elegido para Express.
 * @param {number} webPort Puerto local libre elegido para Expo web y CORS.
 * @returns {object} Overrides del backend; exige nombre de base terminado en _dev y deshabilita Google local.
 */
export function developmentEnvironment(apiPort, webPort) {
  const require = createRequire(resolve(root, 'backend/package.json'));
  const parsed = require('dotenv').parse(readFileSync(resolve(root, 'backend/.env')));
  const databaseUrl = process.env.DATABASE_URL || parsed.DATABASE_URL;
  const database = new URL(databaseUrl ?? '');
  if (!database.pathname.endsWith('_dev'))
    throw new Error(
      'npm run dev requiere una base de desarrollo terminada en _dev. La base publicada se configura solo en Render.',
    );
  return {
    NODE_ENV: 'development',
    DATABASE_URL: databaseUrl,
    PORT: String(apiPort),
    CORS_ORIGINS: `http://127.0.0.1:${webPort},http://localhost:${webPort}`,
    PUBLIC_API_URL: `http://127.0.0.1:${apiPort}`,
    GOOGLE_CLIENT_ID: '',
    GOOGLE_CLIENT_SECRET: '',
    GITHUB_CLIENT_ID: '',
    GITHUB_CLIENT_SECRET: '',
    DISCORD_CLIENT_ID: '',
    DISCORD_CLIENT_SECRET: '',
  };
}
