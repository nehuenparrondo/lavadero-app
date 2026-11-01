import { writeResource } from '../api/services/resourceService';
import { useAction } from './useAction';
/** Mutación de turno y actualización de los recursos afectados después de confirmar.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param refresh - Vuelve a consultar recursos después de una operación confirmada.
 * @returns Estado action y comando mutate que recarga el turno después de confirmar.
 */
export function useAppointmentMutation(id: string, refresh: () => Promise<void>) {
  const action = useAction();
  const mutate = async (method: 'post' | 'patch', path: string, body: unknown) => {
    const result = await action.run(() =>
      writeResource(method, `/appointments/${id}${path}`, body),
    );
    if (result !== undefined) await refresh();
    return result;
  };
  return { action, mutate };
}
