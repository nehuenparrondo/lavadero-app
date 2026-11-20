import { Router } from 'express';
import { createReadiness, getHealth } from './health.controller.js';

/** Expone sondas públicas sin incluir datos sensibles.
 * @param check - Operación que comprueba la disponibilidad de infraestructura.
 * @returns `import("express-serve-static-core").Router`.
 */
export function createHealthRoutes(check: () => Promise<void>) {
  const router = Router();
  router.get('/health', getHealth);
  router.get('/ready', createReadiness(check));
  return router;
}
