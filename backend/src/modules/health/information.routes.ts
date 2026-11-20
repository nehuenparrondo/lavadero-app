import { Router } from 'express';
import { readFileSync } from 'node:fs';

/** Publica el aviso de uso de datos necesario para la configuración de identidad.
 * @returns `import("express-serve-static-core").Router`.
 */
export function createInformationRoutes() {
  const router = Router();
  const privacy = readFileSync('docs/privacy.html', 'utf8');
  router.get('/privacy', (_request, response) => response.type('html').send(privacy));
  return router;
}
