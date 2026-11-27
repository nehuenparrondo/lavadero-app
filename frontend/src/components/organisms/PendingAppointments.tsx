import { useRouter } from 'expo-router';
import type { Appointment } from '../../types/entities';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { AppointmentCard } from './AppointmentCard';
/** Solicitudes pendientes del tablero y acceso a la gestión completa.
 * @param props - Propiedades tipadas: items, loading.
 * @returns Vista de PendingAppointments con el contrato de propiedades declarado.
 */
export function PendingAppointments({
  items,
  loading,
}: {
  items: Appointment[];
  loading: boolean;
}) {
  const router = useRouter();
  return (
    <>
      {items.map((a) => (
        <AppointmentCard
          key={a.id}
          appointment={a}
          onPress={() => router.push(`/appointment/${a.id}`)}
        />
      ))}
      {!loading && !items.length && (
        <Text>No hay lavados pendientes para hoy ni próximos días.</Text>
      )}
      <Button
        label="Ver solicitudes pendientes"
        variant="secondary"
        onPress={() =>
          router.push({ pathname: '/(admin)/appointments', params: { view: 'new' } })
        }
      />
    </>
  );
}
