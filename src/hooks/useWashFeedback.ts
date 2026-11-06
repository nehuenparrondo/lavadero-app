import { writeResource } from '../api/services/resourceService';
import { useAction } from './useAction';

/** Envía una devolución ligada al turno; el servidor recupera el parte y su autor.
 * @param appointmentId - Turno aprobado; refresh recarga su detalle tras el envío.
 * @returns Estado del envío y función para enviar el texto.
 */
export function useWashFeedback(appointmentId: string, refresh: () => Promise<void>) {
  const action = useAction();
  const send = async (body: string) => {
    const result = await action.run(
      () =>
        writeResource('post', '/customer-messages', { kind: 'feedback', appointmentId, body }),
      'Devolución enviada a Administración.',
    );
    if (result) await refresh();
  };
  return { ...action, send };
}
