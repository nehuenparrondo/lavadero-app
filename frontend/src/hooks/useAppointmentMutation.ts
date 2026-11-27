import { writeResource } from '../api/services/resourceService';
import { useAction } from './useAction';
/** Envía un comando del turno y consulta el resultado persistido solo después del éxito.
 * @param id Turno de la ruta actual; el backend vuelve a comprobar acceso y reglas del recurso.
 * @param refresh Consulta los recursos afectados para que precio, responsable, saldo y estado coincidan con SQL.
 * @returns action y mutate(method, path, body, success?): un fallo devuelve undefined y conserva el detalle.
 */
export function useAppointmentMutation(id: string, refresh: () => Promise<void>) {
  const action = useAction();
  const mutate = async (
    method: 'post' | 'patch',
    path: string,
    body: unknown,
    success?: string,
  ) => {
    const result = await action.run(
      () => writeResource(method, `/appointments/${id}${path}`, body),
      success,
    );
    if (result !== undefined) await refresh();
    return result;
  };
  return { action, mutate };
}
