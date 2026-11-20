import type { Router } from 'express';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { actor, endpoint, paramId } from '../../utils/http.js';
import { clearClientHome } from './homeClear.service.js';
import { finishPaidWash } from './paidFinish.service.js';
import { washSchema } from './work.schema.js';

/** Monta limpieza visual privada y cierre cobrado con permisos distintos.
 * @param router Router de turnos con autenticación instalada.
 * @returns void.
 */
export function mountClientEmployeeRoutes(router: Router) {
  router.post(
    '/home-clear',
    requireRole('client'),
    endpoint((r) => clearClientHome(actor(r))),
  );
  router.post(
    '/:id/finish',
    requireRole('employee'),
    validate(washSchema),
    endpoint((r) =>
      finishPaidWash(actor(r), paramId(r), washSchema.parse(r.body).description),
    ),
  );
}
