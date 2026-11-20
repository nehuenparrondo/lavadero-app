import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { endpoint } from '../../utils/http.js';
import * as c from './vehicleTypes.controller.js';
import { vehicleTypeSchema } from './vehicleTypes.schema.js';
/** Tipos visibles para todos, administrables solo por admin.
 * @returns `import("express-serve-static-core").Router`.
 */
export function createVehicleTypesRoutes() {
  const r = Router();
  r.use(authenticate);
  r.get('/', endpoint(c.list));
  r.use(requireRole('admin'));
  r.post('/', validate(vehicleTypeSchema), endpoint(c.create, 201));
  r.put('/:id', validate(vehicleTypeSchema), endpoint(c.edit));
  r.delete('/:id', endpoint(c.remove));
  return r;
}
