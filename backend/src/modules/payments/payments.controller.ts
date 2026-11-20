import type { Request } from 'express';
import type { z } from 'zod';
import { actor, paramId } from '../../utils/http.js';
import type { paymentSchema } from './payments.schema.js';
import { getPayments, recordPayment } from './payments.service.js';
/** Cobros del turno autorizado.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<import("mysql2").RowDataPacket[]>`.
 */
export function list(r: Request) {
  return getPayments(actor(r), paramId(r));
}
/** Registro idempotente de cobro.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ recorded: boolean; replayed: boolean; id?: never; } | { recorded: boolean; id: string; replayed: boolean; }>`.
 */
export function create(r: Request) {
  return recordPayment(actor(r), paramId(r), r.body as z.infer<typeof paymentSchema>);
}
