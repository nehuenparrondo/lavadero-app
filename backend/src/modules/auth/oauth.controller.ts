import type { Request, Response } from 'express';
import { z } from 'zod';
import { presentSession } from './auth.types.js';
import { authorizeSchema, oauthExchangeSchema, providerSchema } from './oauth.schema.js';
import * as service from './oauth.service.js';
/** Disponibilidad de botones sociales.
 * @returns `Promise<{ provider: string; enabled: boolean; }[]>`.
 */
export async function providers() {
  return service.listProviders();
}
/** Inicio OAuth con state/PKCE validado.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @param s - Respuesta HTTP usada para emitir la redirección del flujo.
 * @returns `Promise<void>`.
 */
export async function authorize(r: Request, s: Response) {
  s.redirect(
    await service.authorize(
      providerSchema.parse(r.params.provider),
      authorizeSchema.parse(r.query),
    ),
  );
}
/** Prepara la URL social sin redirigir el navegador hacia un servidor dormido.
 * @param r Petición con state, retorno y desafío PKCE validados.
 * @returns URL HTTPS de un proveedor configurado en el servidor.
 */
export async function start(r: Request) {
  return {
    url: await service.authorize(
      providerSchema.parse(r.params.provider),
      authorizeSchema.parse(r.body),
    ),
  };
}
/** Callback HTTPS validado, después redirección allowlisted al cliente.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @param s - Respuesta HTTP usada para emitir la redirección del flujo.
 * @returns `Promise<void>`.
 */
export async function callback(r: Request, s: Response) {
  const input = z
    .object({
      state: z.string().min(16).max(256),
      code: z.string().max(2048).optional(),
      error: z.string().max(256).optional(),
    })
    .parse(r.query);
  s.redirect(await service.callback(providerSchema.parse(r.params.provider), input));
}
/** Canje final de grant y verifier por sesión propia.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ user: import("../../types/domain.js").User; accessToken: string; refreshToken: string; expiresIn: number; }>`.
 */
export function exchange(r: Request) {
  return service.exchange(r.body as z.infer<typeof oauthExchangeSchema>).then(presentSession);
}
