import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { endpoint } from '../../utils/http.js';
import * as c from './payments.controller.js';
import { paymentSchema } from './payments.schema.js';
/** Rutas anidadas que conservan appointment id por mergeParams.
 * @returns `import("express-serve-static-core").Router`.
 */
export function createPaymentsRoutes() {
  const r = Router({ mergeParams: true });
  r.use(authenticate);
  r.get('/', requireRole('client', 'admin'), endpoint(c.list));
  r.post(
    '/',
    requireRole('employee', 'admin'),
    validate(paymentSchema),
    endpoint(c.create, 201),
  );
  return r;
}
