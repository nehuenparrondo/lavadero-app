import { Router } from 'express';
import { recoveryLimiter } from './recovery.limiter.js';
import { recoveryConfigured } from '../../config/recovery.js';
import { validate } from '../../middlewares/validate.js';
import { endpoint } from '../../utils/http.js';
import { forgotPasswordSchema, resetPasswordSchema } from './recovery.schema.js';
import { requestRecovery, resetPassword } from './recovery.service.js';
/** Recuperación pública con límites por IP y correo y respuestas no almacenables.
 * @returns Router sin credenciales ni datos de la cola expuestos.
 */
export function createRecoveryRoutes() {
  const router = Router();
  router.use((_request, response, next) => {
    response.set('Cache-Control', 'no-store');
    next();
  });
  router.get(
    '/password-recovery',
    endpoint(async () => ({ enabled: recoveryConfigured(), delivery: 'sandbox' })),
  );
  router.post(
    '/forgot-password',
    recoveryLimiter,
    validate(forgotPasswordSchema),
    endpoint((request) => requestRecovery(request.body.email), 202),
  );
  router.post(
    '/reset-password',
    recoveryLimiter,
    validate(resetPasswordSchema),
    endpoint((request) => resetPassword(request.body)),
  );
  return router;
}
