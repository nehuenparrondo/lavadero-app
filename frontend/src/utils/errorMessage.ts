import axios from 'axios';
/** Traduce fallas de red y errores REST a mensajes presentables.
 * @param error - Fallo recibido que se proyecta sin exponer datos internos.
 * @returns `string`.
 */
export function errorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response)
      return 'No pudimos conectar. Revisá tu conexión; el servidor puede tardar un minuto en iniciar.';
    const detail = (
      error.response.data as
        { error?: { message?: string; fields?: { message: string }[] } } | undefined
    )?.error;
    const fields = detail?.fields?.map((f) => f.message).join(' ');
    return fields || detail?.message || 'No pudimos completar la operación. Volvé a intentar.';
  }
  return error instanceof Error ? error.message : 'Ocurrió un error inesperado.';
}
