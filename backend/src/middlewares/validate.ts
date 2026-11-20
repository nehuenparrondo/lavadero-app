import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

/** Valida y elimina campos no admitidos antes de llegar al controller.
 * @param schema - Esquema Zod que valida y transforma la entrada.
 * @returns `RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>`.
 */
export function validate(schema: ZodType): RequestHandler {
  return (request, _response, next) => {
    request.body = schema.parse(request.body);
    next();
  };
}
