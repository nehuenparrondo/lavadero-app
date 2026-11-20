import { Router } from 'express';
import { z } from 'zod';
import { authenticate } from '../../middlewares/authenticate.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { actor, endpoint, paramId } from '../../utils/http.js';
import { getAttendance, recordArrival } from './attendance.service.js';

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/u);
const arrivalSchema = z.object({ date }).strict();

/** Solamente Administración puede leer y registrar la asistencia del equipo.
 * @returns Router protegido de fichajes.
 */
export function createAttendanceRoutes() {
  const router = Router();
  router.use(authenticate, requireRole('admin'));
  router.get(
    '/',
    endpoint((r) => getAttendance(date.optional().parse(r.query.date))),
  );
  router.post(
    '/:id/arrival',
    validate(arrivalSchema),
    endpoint((r) => recordArrival(actor(r), paramId(r), r.body.date)),
  );
  return router;
}
