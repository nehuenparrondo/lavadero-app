import { writeResource } from '../api/services/resourceService';
import type { CancellationNotice } from '../types/cancellation';
import { useAction } from './useAction';
import { useRemoteData } from './useRemoteData';

/** Consulta avisos propios y confirma su lectura en el servidor.
 * @returns Lista persistente, estado de la acción y confirmación sin ocultar errores de red.
 */
export function useCancellationNotices() {
  const list = useRemoteData<CancellationNotice[]>('/appointments/cancellation-notices');
  const action = useAction();
  async function acknowledge(id: string) {
    await action.run(async () => {
      await writeResource('post', `/appointments/${id}/cancellation-read`);
      await list.refresh();
      return true;
    }, '');
  }
  return { list, action, acknowledge };
}
