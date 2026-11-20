import { useState } from 'react';
import { writeResource } from '../api/services/resourceService';
import { serviceFields } from '../constants/serviceFields';
import type { Service, VehicleType } from '../types/entities';
import { serviceInitialValues, servicePayload } from '../utils/serviceForm';
import { refreshResources, revalidateResources } from '../utils/refreshResources';
import { useRemoteData } from './useRemoteData';
import { useResourceEditor } from './useResourceEditor';
import { useServicePrice } from './useServicePrice';
/** Compone consulta, edición de servicio y edición de tarifa como responsabilidades separadas.
 * @returns Catálogo, edición/baja de servicios y diálogo de tarifa por categoría, con errores de lectura y escritura separados.
 */
export function useCatalog() {
  const list = useRemoteData<Service[]>('/services');
  const types = useRemoteData<VehicleType[]>('/vehicle-types');
  const [typeId, setTypeId] = useState('');
  const editor = useResourceEditor<Service>(
    '/services',
    (v) => v,
    list.refresh,
    (current, body) =>
      writeResource(
        current ? 'patch' : 'post',
        current ? `/services/${current.id}` : '/services',
        servicePayload(body as Record<string, string>, current),
      ),
  );
  const prices = useServicePrice(list.refresh);
  return {
    ...editor,
    ...prices,
    refresh: () => refreshResources(list, types),
    revalidate: () => revalidateResources(list, types),
    list,
    types,
    typeId,
    setTypeId,
    fields: serviceFields,
    action: prices.pricing ? prices.priceAction : editor.action,
    initialValues: serviceInitialValues(editor.editing),
  };
}
