import { useRouter } from 'expo-router';
import { useAppointments } from '../../hooks/useAppointments';
import { AppointmentCard } from './AppointmentCard';
import { CollectionState } from './CollectionState';
/** Presenta appointment list con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function AppointmentList({ m }: { m: ReturnType<typeof useAppointments> }) {
  const router = useRouter();
  return (
    <CollectionState
      loading={m.loading}
      error={m.error}
      empty={!m.data?.items.length}
      emptyTitle="No hay turnos con estos filtros"
      onRetry={m.refresh}
    >
      {m.data?.items.map((a) => (
        <AppointmentCard
          key={a.id}
          appointment={a}
          onPress={() => router.push(`/appointment/${a.id}`)}
        />
      ))}
    </CollectionState>
  );
}
