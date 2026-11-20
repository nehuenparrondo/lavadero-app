import { writeResource } from '../api/services/resourceService';
import type { Service, VehicleType } from '../types/entities';
import { makeCatalogCode } from '../utils/makeCatalogCode';
import { changedTypePrices, typePriceFields } from '../utils/vehicleTypePricing';
import { useRemoteData } from './useRemoteData';
import { useResourceEditor } from './useResourceEditor';
/** Categorías con edición común y baja lógica que conserva referencias históricas.
 * @param onChanged Recarga los selectores externos que usan estas categorías.
 * @returns Categorías y editor con baja lógica; propaga la recarga a los selectores que las utilizan.
 */
export function useVehicleTypes(onChanged?: (() => Promise<void>) | undefined) {
  const state = useRemoteData<VehicleType[]>('/vehicle-types');
  const catalog = useRemoteData<Service[]>('/services');
  const refresh = async () => {
    await Promise.all([state.refresh(), catalog.refresh(), onChanged?.()]);
  };
  const editor = useResourceEditor<VehicleType>(
    '/vehicle-types',
    (v) => v,
    refresh,
    (current, body) => saveType(current, body as Record<string, string>, catalog.data ?? []),
  );
  const remove = async (type: VehicleType) => {
    await editor.action.run(async () => {
      await writeResource('delete', `/vehicle-types/${type.id}`);
      await refresh();
    }, 'Tipo desactivado.');
  };
  return {
    ...editor,
    state,
    catalog,
    prices: typePriceFields(catalog.data ?? [], editor.editing),
    remove,
  };
}

/** Guarda la categoría y solo los importes cambiados en una misma petición. */
function saveType(
  current: VehicleType | null,
  v: Record<string, string>,
  services: Service[],
) {
  return writeResource(
    current ? 'put' : 'post',
    current ? `/vehicle-types/${current.id}` : '/vehicle-types',
    {
      code: current?.code ?? makeCatalogCode(v.name ?? '', 14),
      name: v.name,
      isActive: v.isActive === 'true',
      prices: changedTypePrices(v, typePriceFields(services, current).values),
    },
  );
}
