import { writeResource } from '../api/services/resourceService';
import type { VehicleType } from '../types/entities';
import { makeCatalogCode } from '../utils/makeCatalogCode';
import { useRemoteData } from './useRemoteData';
import { useResourceEditor } from './useResourceEditor';
/** Categorías con edición común y baja lógica que conserva referencias históricas.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useVehicleTypes() {
  const state = useRemoteData<VehicleType[]>('/vehicle-types');
  const editor = useResourceEditor<VehicleType>(
    '/vehicle-types',
    (v) => v,
    state.refresh,
    (current, body) => {
      const v = body as Record<string, string>;
      return writeResource(
        current ? 'put' : 'post',
        current ? `/vehicle-types/${current.id}` : '/vehicle-types',
        {
          code: current?.code ?? makeCatalogCode(v.name ?? '', 14),
          name: v.name,
          isActive: v.isActive === 'true',
        },
      );
    },
  );
  const remove = async (type: VehicleType) => {
    await editor.action.run(async () => {
      await writeResource('delete', `/vehicle-types/${type.id}`);
      await state.refresh();
    }, 'Tipo desactivado.');
  };
  return { ...editor, state, action: editor.action, remove };
}
