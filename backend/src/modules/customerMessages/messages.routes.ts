import { Router, type RequestHandler } from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { actor, endpoint, paramId } from '../../utils/http.js';
import { messageQuery, messageSchema, replySchema } from './messages.schema.js';
import { createMessage, getMessages, replyToMessage } from './messages.service.js';
const noCache: RequestHandler = (_request, response, next) => {
  response.set('Cache-Control', 'no-store');
  next();
};

/** La bandeja está disponible únicamente para clientes y Administración.
 * @returns Router autenticado de mensajes y respuestas.
 */
export function createMessageRoutes() {
  const router = Router();
  router.use(authenticate);
  router.get(
    '/',
    requireRole('client', 'admin'),
    noCache,
    endpoint((r) => getMessages(actor(r), messageQuery.parse(r.query))),
  );
  router.post(
    '/',
    requireRole('client'),
    validate(messageSchema),
    endpoint((r) => createMessage(actor(r), r.body), 201),
  );
  router.patch(
    '/:id/reply',
    requireRole('admin'),
    validate(replySchema),
    endpoint((r) => replyToMessage(actor(r), paramId(r), r.body.reply)),
  );
  return router;
}
