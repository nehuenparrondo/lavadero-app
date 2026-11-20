import type { Router } from 'express';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { actor, endpoint } from '../../utils/http.js';
import { walkInSchema } from './walkIn.schema.js';
import { createWalkIn } from './walkIn.service.js';

/** Monta el alta presencial antes de las rutas con parámetro id.
 * @param router Router de turnos ya autenticado.
 * @returns void.
 */
export function mountWalkInRoutes(router: Router) {
  router.post(
    '/walk-in',
    requireRole('admin'),
    validate(walkInSchema),
    endpoint((request) => createWalkIn(actor(request), walkInSchema.parse(request.body)), 201),
  );
}
