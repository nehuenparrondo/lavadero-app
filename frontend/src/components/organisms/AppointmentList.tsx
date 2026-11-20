import { useRouter } from 'expo-router';
import { useAppointments } from '../../hooks/useAppointments';
import { AppointmentCard } from './AppointmentCard';
import { CollectionState } from './CollectionState';
/** Compone la página actual y distingue carga, error y ausencia de turnos.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentList con el contrato de propiedades declarado.
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
