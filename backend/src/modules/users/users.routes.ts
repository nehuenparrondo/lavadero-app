import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { endpoint } from '../../utils/http.js';
import * as controller from './users.controller.js';
import * as schema from './users.schema.js';

/** Perfil para todos; gestión de cuentas exclusivamente administrativa.
 * @returns `import("express-serve-static-core").Router`.
 */
export function createUsersRoutes() {
  const r = Router();
  r.use(authenticate);
  r.get('/me', endpoint(controller.me));
  r.patch('/me', validate(schema.profileSchema), endpoint(controller.editMe));
  r.put('/me/password', validate(schema.passwordChangeSchema), endpoint(controller.password));
  r.use(requireRole('admin'));
  r.get('/', endpoint(controller.list));
  r.post('/', validate(schema.createUserSchema), endpoint(controller.create, 201));
  r.get('/:id', endpoint(controller.get));
  r.patch('/:id', validate(schema.adminPatchSchema), endpoint(controller.edit));
  r.patch('/:id/role', validate(schema.roleSchema), endpoint(controller.role));
  r.delete('/:id', endpoint(controller.remove));
  return r;
}
