import type { Request, RequestHandler } from 'express';
import { z } from 'zod';
import { AppError } from '../errors/AppError.js';
import type { Actor } from '../types/domain.js';

/** Adapta un controller async al sobre REST estándar.
 * @param handler - Controlador que devuelve datos o rechaza con un error del caso de uso.
 * @param status - Estado solicitado; el servicio comprueba si la transición está permitida.
 * @returns `RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>`.
 */
export function endpoint(
  handler: (request: Request) => Promise<unknown>,
  status = 200,
): RequestHandler {
  return async (request, response) => {
    response.status(status).json({ data: await handler(request) });
  };
}
/** Extrae actor autenticado. @throws AppError 401 si falta sesión.
 * @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
 * @returns `Actor`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function actor(request: Request): Actor {
  if (!request.actor) throw new AppError(401, 'UNAUTHORIZED', 'Iniciá sesión para continuar.');
  return request.actor;
}
/** Valida un identificador decimal positivo sin perder precisión BIGINT.
 * @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
 * @param name - Nombre del campo o etiqueta según el contrato declarado.
 * @returns `string`.
 */
export function paramId(request: Request, name = 'id'): string {
  return z
    .string()
    .regex(/^[1-9]\d{0,18}$/u)
    .parse(request.params[name]);
}
