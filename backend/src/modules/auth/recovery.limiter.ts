import { rateLimit } from 'express-rate-limit';
/** Límite compartido entre solicitudes y consumo de tokens por dirección de red. */
export const recoveryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    error: { code: 'RATE_LIMITED', message: 'Demasiados intentos. Esperá unos minutos.' },
  },
});
