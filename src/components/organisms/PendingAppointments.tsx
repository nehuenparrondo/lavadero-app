import { useRouter } from 'expo-router';
import type { Appointment } from '../../types/entities';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { AppointmentCard } from './AppointmentCard';
/** Solicitudes pendientes del tablero y acceso a la gestión completa.
 * @param props - Propiedades tipadas: items, loading. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
      {!loading && !items.length && <Text>No hay reservas esperando confirmación.</Text>}
      <Button
        label="Ver todos los turnos"
        variant="secondary"
        onPress={() => router.push('/(admin)/appointments')}
      />
    </>
  );
}
