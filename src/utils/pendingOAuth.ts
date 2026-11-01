import { z } from 'zod';

/** Solo almacena PKCE temporal de la pestaña; nunca secretos de proveedores. */
export const pendingOAuthKey = 'lavadero.pending-oauth';
const pendingSchema = z
  .object({
    state: z.string().min(16).max(256),
    verifier: z.string().min(43).max(128),
    createdAt: z.number().int(),
  })
  .strict();
const lifetimeMs = 10 * 60 * 1000;

/** Verifica state, forma y vencimiento antes de permitir canjear un retorno web.
 * @param raw Solicitud temporal serializada por esta pestaña.
 * @param state State recibido en el callback.
 * @param now Reloj en milisegundos; permite verificar límites de vencimiento.
 * @returns Solicitud validada con state, verifier y createdAt. @throws Error si el retorno no corresponde a la solicitud.
 */
export function readPendingOAuth(raw: string | null, state: unknown, now = Date.now()) {
  let value: unknown;
  try {
    value = JSON.parse(raw ?? 'null');
  } catch {
    value = null;
  }
  const parsed = pendingSchema.safeParse(value);
  if (
    !parsed.success ||
    parsed.data.state !== state ||
    now < parsed.data.createdAt ||
    now - parsed.data.createdAt >= lifetimeMs
  ) {
    throw new Error(
      'El acceso social venció o no corresponde a esta pestaña. Volvé a iniciar sesión.',
    );
  }
  return parsed.data;
}
