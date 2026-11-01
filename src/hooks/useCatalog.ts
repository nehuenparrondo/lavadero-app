import { useState } from 'react';
import { writeResource } from '../api/services/resourceService';
import { serviceFields } from '../constants/serviceFields';
import type { Service, VehicleType } from '../types/entities';
import { serviceInitialValues, servicePayload } from '../utils/serviceForm';
import { useRemoteData } from './useRemoteData';
import { useResourceEditor } from './useResourceEditor';
import { useServicePrice } from './useServicePrice';
/** Compone consulta, edición de servicio y edición de tarifa como responsabilidades separadas.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
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
  const priceActive = Boolean(prices.pricing);
  return {
    ...editor,
    ...prices,
    list,
    types,
    typeId,
    setTypeId,
    fields: serviceFields,
    action: priceActive ? prices.priceAction : editor.action,
    initialValues: serviceInitialValues(editor.editing),
  };
}
