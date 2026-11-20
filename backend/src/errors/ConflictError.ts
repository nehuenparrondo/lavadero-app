import { AppError } from './AppError.js';

/** Representa un error 409 controlado por el dominio. */
export class ConflictError extends AppError {
  /** Permite aportar contexto público sin exponer datos internos. */
  /** Crea el error tipado que el manejador central convierte en una respuesta pública. */
  constructor(message = 'La operación entra en conflicto con el estado actual.') {
    super(409, 'CONFLICT', message);
  }
}
