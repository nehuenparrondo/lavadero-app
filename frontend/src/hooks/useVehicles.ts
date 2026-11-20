import { useState } from 'react';
import type { User, Vehicle, VehicleType } from '../types/entities';
import { vehicleFields, vehicleInitialValues, vehiclePayload } from '../utils/vehicleForm';
import { useAuth } from './useAuth';
import { useDebouncedValue } from './useDebouncedValue';
import { useEntityManager } from './useEntityManager';
import { useOptions } from './useOptions';
import { useRemoteData } from './useRemoteData';
/** ABML de vehículos con definición de formulario separada de las consultas y acciones.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useVehicles() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const query = useDebouncedValue(search);
  const manager = useEntityManager<Vehicle>('/vehicles', vehiclePayload, { search: query });
  const types = useRemoteData<VehicleType[]>('/vehicle-types');
  const clients = useOptions<User>('/users', { role: 'client' }, user?.role === 'admin');
  return {
    ...manager,
    fields: vehicleFields(types.data ?? [], clients.items, user?.role === 'admin'),
    initialValues: vehicleInitialValues(manager.editing),
    search,
    setSearch,
    admin: user?.role === 'admin',
    refresh: async () => {
      await Promise.all([manager.refresh(), types.refresh(), clients.refresh()]);
    },
    revalidate: async () => {
      await Promise.all([manager.revalidate(), types.revalidate(), clients.revalidate()]);
    },
    optionsError: types.error || clients.error,
  };
}
