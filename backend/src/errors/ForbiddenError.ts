import { AppError } from './AppError.js';

/** Representa un error 403 controlado por el dominio. */
export class ForbiddenError extends AppError {
  /** Permite aportar contexto público sin exponer datos internos. */
  /** Crea el error tipado que el manejador central convierte en una respuesta pública. */
  constructor(message = 'No tenés permiso para esta acción.') {
    super(403, 'FORBIDDEN', message);
  }
}
