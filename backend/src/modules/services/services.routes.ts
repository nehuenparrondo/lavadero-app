import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { endpoint } from '../../utils/http.js';
import * as c from './services.controller.js';
import * as s from './services.schema.js';
/** Catálogo autenticado y escritura administrativa.
 * @returns `import("express-serve-static-core").Router`.
 */
export function createServicesRoutes() {
  const r = Router();
  r.use(authenticate);
  r.get('/', endpoint(c.list));
  r.get('/:id', endpoint(c.get));
  r.use(requireRole('admin'));
  r.post('/', validate(s.serviceSchema), endpoint(c.create, 201));
  r.patch('/:id', validate(s.servicePatchSchema), endpoint(c.edit));
  r.delete('/:id', endpoint(c.remove));
  r.put('/:id/prices/:typeId', validate(s.priceSchema), endpoint(c.price));
  return r;
}
