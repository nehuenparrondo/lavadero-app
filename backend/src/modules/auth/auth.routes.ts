import { Router } from 'express';
import { createRecoveryRoutes } from './recovery.routes.js';
import { rateLimit } from 'express-rate-limit';
import { validate } from '../../middlewares/validate.js';
import { endpoint } from '../../utils/http.js';
import * as controller from './auth.controller.js';
import * as schema from './auth.schema.js';

/** Rutas públicas de autenticación con límite por origen; sin estado de negocio en routes.
 * @returns `import("express-serve-static-core").Router`.
 */
export function createAuthRoutes() {
  const router = Router();
  router.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      message: {
        error: { code: 'RATE_LIMITED', message: 'Demasiados intentos. Esperá unos minutos.' },
      },
    }),
  );
  router.use(createRecoveryRoutes());
  router.post(
    '/register',
    validate(schema.registerSchema),
    endpoint(controller.register, 201),
  );
  router.post('/login', validate(schema.loginSchema), endpoint(controller.login));
  router.post('/refresh', validate(schema.refreshSchema), endpoint(controller.refresh));
  router.post('/logout', validate(schema.refreshSchema), endpoint(controller.logout));
  return router;
}
