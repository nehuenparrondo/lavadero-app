import { useRouter } from 'expo-router';
import type { useHome } from '../../hooks/useHome';
import { Button } from '../atoms/Button';
import { EmptyState } from '../molecules/EmptyState';
import { Notice } from '../molecules/Notice';
import { SectionHeader } from '../molecules/SectionHeader';
import { AppointmentCard } from './AppointmentCard';
/** Visitas autorizadas, con carga/error separados del estado vacío.
 * @param props Recurso del inicio y selección cronológica de hasta tres turnos.
 * @returns Lista navegable; un error de red nunca se presenta como ausencia de reservas.
 */
export function ClientVisitList({ home: h }: { home: ReturnType<typeof useHome> }) {
  const router = useRouter();
  return (
    <>
      <SectionHeader
        title="Tus próximas visitas"
        subtitle="Todo lo que necesitás saber antes de llegar."
      />
      <Notice error={h.list.error} onRetry={h.list.refresh} />
      {h.upcoming.map((a) => (
        <AppointmentCard
          key={a.id}
          appointment={a}
          onPress={() => router.push('/appointment/' + a.id)}
        />
      ))}
      {!h.list.loading && !h.list.error && !h.upcoming.length && (
        <EmptyState
          title="Tu próxima visita te espera"
          detail="Reservá un horario y encontrá todos los detalles acá."
        />
      )}
      <Button
        label="Ver mis turnos"
        variant="quiet"
        onPress={() => router.push('/(client)/appointments')}
      />
    </>
  );
}
