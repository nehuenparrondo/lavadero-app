import type { RequestHandler } from 'express';
import { AppError } from '../errors/AppError.js';

/** Pausa la API durante la copia final; las sondas de salud quedan disponibles.
 * @param enabled Activado exclusivamente durante una migración de datos.
 * @returns Middleware que evita escrituras y nuevas sesiones en las dos bases a la vez.
 */
export function createMaintenanceGuard(enabled: boolean): RequestHandler {
  return (_request, _response, next) => {
    if (!enabled) return next();
    next(
      new AppError(
        503,
        'MAINTENANCE',
        'Estamos trasladando la base de datos. Volvé a intentar en unos minutos.',
      ),
    );
  };
}
