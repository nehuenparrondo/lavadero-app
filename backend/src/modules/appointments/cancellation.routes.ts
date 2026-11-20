import type { Router } from 'express';
import { requireRole } from '../../middlewares/requireRole.js';
import { actor, endpoint, paramId } from '../../utils/http.js';
import { acknowledgeCancellation, cancellationNotices } from './cancellation.service.js';

/** Registra antes de /:id los avisos del cliente y su confirmación de lectura.
 * @param router Router de turnos con autenticación ya aplicada.
 * @returns No retorna datos; agrega rutas limitadas al cliente autenticado.
 */
export function mountCancellationRoutes(router: Router) {
  router.get(
    '/cancellation-notices',
    requireRole('client'),
    (_r, response, next) => {
      response.set('Cache-Control', 'no-store');
      next();
    },
    endpoint((request) => cancellationNotices(actor(request))),
  );
  router.post(
    '/:id/cancellation-read',
    requireRole('client'),
    endpoint((request) => acknowledgeCancellation(actor(request), paramId(request))),
  );
}
