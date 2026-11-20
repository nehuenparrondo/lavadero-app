import type { RequestHandler } from 'express';

/** Devuelve salud del proceso sin depender de MySQL.
 * @param _request - Petición ignorada; esta comprobación no consulta datos de usuario.
 * @param response - Respuesta donde se publica el estado del proceso, servicio y versión.
 * @returns No devuelve un recurso: envía la respuesta JSON de liveness.
 */
export const getHealth: RequestHandler = (_request, response) => {
  response.json({ status: 'ok', service: 'lavadero-api', version: '1.0.0' });
};

/** Construye readiness con dependencia inyectada para verificar fallos reales en tests.
 * @param check - Operación que comprueba la disponibilidad de infraestructura.
 * @returns `RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>`.
 */
export function createReadiness(check: () => Promise<void>): RequestHandler {
  return async (_request, response) => {
    try {
      await check();
      response.json({ status: 'ready', database: 'up' });
    } catch {
      response.status(503).json({ status: 'not_ready', database: 'down' });
    }
  };
}
