import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { endpoint } from '../../utils/http.js';
import * as c from './settings.controller.js';
import { settingsSchema } from './settings.schema.js';
/** Todos pueden conocer horarios; solo admin puede editarlos.
 * @returns `import("express-serve-static-core").Router`.
 */
export function createSettingsRoutes() {
  const r = Router();
  r.use(authenticate, requireRole('admin'));
  r.get('/', endpoint(c.get));
  r.put('/', validate(settingsSchema), endpoint(c.save));
  return r;
}
/** Horarios y política de cancelación legibles por todos, fuera de las rutas administrativas.
 * @returns `import("express-serve-static-core").Router`.
 */
export function createBusinessRoutes() {
  const r = Router();
  r.use(authenticate);
  r.get('/', endpoint(c.get));
  return r;
}
