import type { RequestHandler } from 'express';

/** Devuelve salud del proceso sin depender de MySQL.
 * @param _request - Petición del middleware; el error público no depende de su contenido.
 * @param response - Respuesta HTTP donde se escribe el contrato uniforme de error.
 * @returns `void`.
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
