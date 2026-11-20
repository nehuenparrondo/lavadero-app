import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { endpoint } from '../../utils/http.js';
import * as c from './reports.controller.js';
/** Reportes de ingresos solo admin; resumen de jornada solo empleado.
 * @returns `import("express-serve-static-core").Router`.
 */
export function createReportsRoutes() {
  const r = Router();
  r.use(authenticate);
  r.get('/me', requireRole('employee'), endpoint(c.personal));
  r.get('/', requireRole('admin'), endpoint(c.business));
  return r;
}
