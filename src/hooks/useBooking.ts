import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from './useAuth';
import { useAction } from './useAction';
import { useOptions } from './useOptions';
import { useRemoteData } from './useRemoteData';
import type { Vehicle, Service, User, Availability, Appointment } from '../types/entities';
import { writeResource } from '../api/services/resourceService';
import { today } from '../utils/format';
/** Flujo de reserva con cotización y validación de disponibilidad en el servidor. */
export function useBooking() {
  const { user } = useAuth();
  const action = useAction();
  const router = useRouter();
  const admin = user?.role === 'admin';
  const [clientId, setClientId] = useState(admin ? '' : (user?.id ?? ''));
  const [vehicleId, setVehicleId] = useState('');
  const [serviceIds, setServiceIds] = useState('');
  const [date, setDate] = useState(today());
  const [slot, setSlot] = useState('');
  const vehicles = useOptions<Vehicle>('/vehicles');
  const clients = useOptions<User>('/users', { role: 'client' }, admin);
  const services = useRemoteData<Service[]>('/services');
  const vehicle = vehicles.items.find((v) => v.id === vehicleId);
  const offered = (services.data ?? []).filter(
    (s) => s.isActive && s.prices.some((p) => p.vehicleTypeId === vehicle?.vehicleTypeId),
  );
  const ready = Boolean(vehicleId && serviceIds && /^\d{4}-\d{2}-\d{2}$/u.test(date));
  const availability = useRemoteData<Availability>(
    '/availability',
    { date, vehicleId, serviceIds },
    ready,
  );
  useEffect(() => {
    setSlot('');
  }, [vehicleId, serviceIds, date]);
  const chooseClient = (id: string) => {
    setClientId(id);
    setVehicleId('');
    setServiceIds('');
  };
  const chooseVehicle = (id: string) => {
    setVehicleId(id);
    setServiceIds('');
  };
  const submit = async () => {
    const result = await action.run(
      () =>
        writeResource<Appointment>('post', '/appointments', {
          vehicleId,
          serviceIds: serviceIds.split(','),
          startsAt: slot,
          ...(admin ? { clientId } : {}),
        }),
      'Turno reservado.',
    );
    if (result) router.replace(`/appointment/${result.id}`);
    else {
      setSlot('');
      void availability.refresh();
    }
  };
  return {
    ...action,
    admin,
    clientId,
    chooseClient,
    vehicleId,
    chooseVehicle,
    serviceIds,
    setServiceIds,
    date,
    setDate,
    slot,
    setSlot,
    submit,
    availability,
    vehicles: vehicles.items.filter((v) => v.ownerId === clientId),
    clients: clients.items.filter((c) => c.isActive),
    offered,
    loadError: vehicles.error || clients.error || services.error,
  };
}
