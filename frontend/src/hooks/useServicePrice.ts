import { useState } from 'react';
import { writeResource } from '../api/services/resourceService';
import type { Service } from '../types/entities';
import { pesosToCents } from '../utils/pesosToCents';
import { useAction } from './useAction';
/** Administra la tarifa por tipo de vehículo, independientemente del formulario de servicio.
 * @param refresh - Vuelve a consultar recursos después de una operación confirmada.
 * @returns Servicio seleccionado, diálogo, error y guardado que recarga el catálogo después de confirmar.
 */
export function useServicePrice(refresh: () => Promise<void>) {
  const [pricing, setPricing] = useState<Service | null>(null);
  const action = useAction();
  const savePrice = async (v: Record<string, string>) => {
    if (!pricing) return;
    const result = await action.run(() =>
      writeResource('put', `/services/${pricing.id}/prices/${v.vehicleTypeId}`, {
        priceCents: pesosToCents(v.price ?? ''),
      }),
    );
    if (result !== undefined) {
      setPricing(null);
      await refresh();
    }
  };
  return { pricing, setPricing, savePrice, priceAction: action };
}
