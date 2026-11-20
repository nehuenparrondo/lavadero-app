import { ZodError } from 'zod';
import { AppError } from './AppError.js';
const sqlErrors: Record<string, { code: string; message: string }> = {
  ER_DUP_ENTRY: {
    code: 'DUPLICATE_RESOURCE',
    message: 'Ya existe un registro con esos datos.',
  },
  ER_NO_REFERENCED_ROW_2: {
    code: 'RELATED_RESOURCE',
    message: 'Revisá los registros asociados a esta operación.',
  },
  ER_ROW_IS_REFERENCED_2: {
    code: 'RELATED_RESOURCE',
    message: 'Revisá los registros asociados a esta operación.',
  },
  ER_LOCK_DEADLOCK: {
    code: 'CONCURRENT_UPDATE',
    message: 'Otra operación modificó estos datos. Volvé a intentar.',
  },
  ER_LOCK_WAIT_TIMEOUT: {
    code: 'CONCURRENT_UPDATE',
    message: 'Otra operación modificó estos datos. Volvé a intentar.',
  },
};
/** Proyección pública de errores; nunca incluye SQL, tokens ni stack traces.
 * @param error - Fallo recibido que se proyecta sin exponer datos internos.
 * @returns `{ status: number; error: { code: string; message: string; fields: { path: string; message: string; }[]; }; } | { status: number; error: { code: string; message: string; }; }`.
 */
export function publicError(error: unknown) {
  if (
    error &&
    typeof error === 'object' &&
    'type' in error &&
    error.type === 'entity.too.large'
  )
    return {
      status: 413,
      error: { code: 'BODY_TOO_LARGE', message: 'La solicitud supera el tamaño permitido.' },
    };
  if (error instanceof ZodError) return validationError(error);
  if (error instanceof AppError)
    return { status: error.status, error: { code: error.code, message: error.message } };
  if (error instanceof SyntaxError && 'status' in error && error.status === 400)
    return { status: 400, error: { code: 'INVALID_JSON', message: 'El JSON es inválido.' } };
  const code =
    error && typeof error === 'object' && 'code' in error ? String(error.code) : undefined;
  if (code && sqlErrors[code]) return { status: 409, error: sqlErrors[code] };
  console.error('Error interno', code ?? (error instanceof Error ? error.name : 'UNKNOWN'));
  return {
    status: 500,
    error: { code: 'INTERNAL_ERROR', message: 'Error del servidor. Intentá nuevamente.' },
  };
}
/** Explica validaciones por campo sin devolver el body original. */
function validationError(error: ZodError) {
  return {
    status: 400,
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Revisá los campos indicados.',
      fields: error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
    },
  };
}
