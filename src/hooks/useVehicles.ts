import { useState } from 'react';
import type { Vehicle, VehicleType, User } from '../types/entities';
import { useEntityManager } from './useEntityManager';
import { useRemoteData } from './useRemoteData';
import { useOptions } from './useOptions';
import { useAuth } from './useAuth';
import type { FormFieldDefinition } from '../types/form';
import { useDebouncedValue } from './useDebouncedValue';
/** Serializa el formulario a DTO de vehículo; ningún rol viene del formulario público. */
function vehiclePayload(v: Record<string, string>) {
  return {
    plate: v.plate,
    brand: v.brand,
    model: v.model,
    color: v.color,
    vehicleTypeId: v.vehicleTypeId,
    ...(v.ownerId ? { ownerId: v.ownerId } : {}),
  };
}
/** ABML de vehículos y opciones de tipo/titular según rol. */
export function useVehicles() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const searchValue = useDebouncedValue(search);
  const manager = useEntityManager<Vehicle>('/vehicles', vehiclePayload, {
    search: searchValue,
  });
  const types = useRemoteData<VehicleType[]>('/vehicle-types');
  const clients = useOptions<User>('/users', { role: 'client' }, user?.role === 'admin');
  const fields: FormFieldDefinition[] = [
    { name: 'plate', label: 'Patente', placeholder: 'AB123CD', maxLength: 16 },
    { name: 'brand', label: 'Marca', maxLength: 80 },
    { name: 'model', label: 'Modelo', maxLength: 80 },
    { name: 'color', label: 'Color', maxLength: 50 },
    {
      name: 'vehicleTypeId',
      label: 'Tipo de vehículo',
      kind: 'choice',
      options: (types.data ?? [])
        .filter((t) => t.isActive)
        .map((t) => ({ value: t.id, label: t.name })),
    },
  ];
  if (user?.role === 'admin')
    fields.push({
      name: 'ownerId',
      label: 'Titular',
      kind: 'choice',
      options: clients.items.map((c) => ({
        value: c.id,
        label: `${c.firstName} ${c.lastName}`,
      })),
    });
  const current = manager.editing;
  const initialValues = current
    ? {
        plate: current.plate,
        brand: current.brand,
        model: current.model,
        color: current.color,
        vehicleTypeId: current.vehicleTypeId,
        ownerId: current.ownerId,
      }
    : {};
  return {
    ...manager,
    fields,
    initialValues,
    search,
    setSearch,
    optionsError: types.error || clients.error,
  };
}
