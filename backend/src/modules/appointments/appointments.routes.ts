import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { endpoint } from '../../utils/http.js';
import * as c from './appointments.controller.js';
import * as s from './appointments.schema.js';
import { mountWorkRoutes } from './work.routes.js';
import { mountCancellationRoutes } from './cancellation.routes.js';
import { mountWalkInRoutes } from './walkIn.routes.js';
import { mountClientEmployeeRoutes } from './clientEmployee.routes.js';
/** Turnos con controles adicionales de propiedad/asignación dentro de cada servicio.
 * @returns `import("express-serve-static-core").Router`.
 */
export function createAppointmentsRoutes() {
  const r = Router();
  r.use(authenticate);
  r.get('/', endpoint(c.list));
  mountCancellationRoutes(r);
  mountWalkInRoutes(r);
  mountClientEmployeeRoutes(r);
  r.get('/:id', endpoint(c.get));
  mountAppointmentChanges(r);
  mountWorkRoutes(r);
  r.patch(
    '/:id/assignment',
    requireRole('admin'),
    validate(s.assignmentSchema),
    endpoint(c.assign),
  );
  r.post(
    '/:id/notes',
    requireRole('employee', 'admin'),
    validate(s.noteSchema),
    endpoint(c.note, 201),
  );
  r.get('/:id/receipt', requireRole('client', 'admin'), endpoint(c.receipt));
  return r;
}
/** Disponibilidad usa el mismo cálculo que la creación transaccional.
 * @returns `import("express-serve-static-core").Router`.
 */
export function createAvailabilityRoutes() {
  const r = Router();
  r.use(authenticate, requireRole('client', 'admin'));
  r.get(
    '/',
    (_request, response, next) => {
      response.set('Cache-Control', 'no-store');
      next();
    },
    endpoint(c.slots),
  );
  return r;
}

/** Monta las tres mutaciones principales sin mezclar reglas de negocio con rutas. */
function mountAppointmentChanges(r: ReturnType<typeof Router>) {
  r.post(
    '/',
    requireRole('client', 'admin'),
    validate(s.appointmentSchema),
    endpoint(c.create, 201),
  );
  r.patch(
    '/:id/status',
    requireRole('employee', 'admin'),
    validate(s.statusSchema),
    endpoint(c.status),
  );
  r.post(
    '/:id/cancel',
    requireRole('client', 'admin'),
    validate(s.cancelSchema),
    endpoint(c.cancel),
  );
}
