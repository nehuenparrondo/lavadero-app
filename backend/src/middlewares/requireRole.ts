import type { RequestHandler } from 'express';
import { ForbiddenError } from '../errors/ForbiddenError.js';
import type { Role } from '../types/domain.js';

/** Restringe una ruta a roles vigentes, después de authenticate.
 * @param roles - Roles que la ruta admite después de autenticar al actor.
 * @returns `RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function requireRole(...roles: Role[]): RequestHandler {
  return (request, _response, next) => {
    if (!request.actor || !roles.includes(request.actor.role)) throw new ForbiddenError();
    next();
  };
}
