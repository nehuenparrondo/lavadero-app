import { z } from 'zod';
import { paginationSchema } from '../../utils/pagination.js';

const body = z.string().trim().min(1).max(2000);
/** Reclamo general o devolución del titular sobre un lavado finalizado. */
export const messageSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('complaint'), body }).strict(),
  z
    .object({
      kind: z.literal('feedback'),
      body,
      appointmentId: z.string().regex(/^[1-9]\d{0,18}$/u),
    })
    .strict(),
]);
/** Filtra por estado y pagina la bandeja sin descargar datos innecesarios. */
export const messageQuery = paginationSchema.extend({
  state: z.enum(['open', 'resolved']).optional(),
});
/** El cliente recibe la respuesta al cerrar el caso. */
export const replySchema = z.object({ reply: body }).strict();
