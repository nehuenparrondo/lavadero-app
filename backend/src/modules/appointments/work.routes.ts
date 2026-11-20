import type { Router } from 'express';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { actor, endpoint, paramId } from '../../utils/http.js';
import { saveVehicleDetail } from './vehicleDetail.service.js';
import { attachVehicle } from './attachVehicle.service.js';
import { reviewWash, sendWashForReview } from './wash.service.js';
import {
  attachVehicleSchema,
  reviewSchema,
  vehicleDetailSchema,
  washSchema,
} from './work.schema.js';

/** Cambios del auto, envío del responsable y decisión exclusiva de Administración.
 * @param router - Router de turnos, con autenticación ya instalada.
 * @returns Registra rutas en el router recibido.
 */
export function mountWorkRoutes(router: Router) {
  router.put(
    '/:id/vehicle',
    requireRole('client', 'admin'),
    validate(attachVehicleSchema),
    endpoint((r) => attachVehicle(actor(r), paramId(r), r.body)),
  );
  router.patch(
    '/:id/vehicle-detail',
    requireRole('client'),
    validate(vehicleDetailSchema),
    endpoint((r) => saveVehicleDetail(actor(r), paramId(r), r.body.description)),
  );
  router.post(
    '/:id/wash-submission',
    requireRole('employee'),
    validate(washSchema),
    endpoint((r) => sendWashForReview(actor(r), paramId(r), r.body.description), 201),
  );
  router.patch(
    '/:id/wash-review',
    requireRole('admin'),
    validate(reviewSchema),
    endpoint((r) => reviewWash(actor(r), paramId(r), r.body)),
  );
}
