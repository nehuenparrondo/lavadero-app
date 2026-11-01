import { useRouter } from 'expo-router';
import { EmptyState } from '../../components/molecules/EmptyState';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { AppointmentCard } from '../../components/organisms/AppointmentCard';
import { BookingInvitation } from '../../components/organisms/BookingInvitation';
import { Screen } from '../../components/organisms/Screen';
import { useHome } from '../../hooks/useHome';
/** Inicio del cliente con sus próximas visitas reales y una acción principal.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function HomeScreen() {
  const { user, list, upcoming } = useHome();
  const router = useRouter();
  return (
    <Screen refreshing={list.loading} onRefresh={list.refresh}>
      <SectionHeader
        title={`Hola, ${user?.firstName ?? ''}`}
        subtitle="Un auto limpio. Un día más simple."
      />
      <BookingInvitation />
      <SectionHeader title="Tus próximas visitas" />
      <Notice error={list.error} onRetry={list.refresh} />
      {upcoming.map((a) => (
        <AppointmentCard
          key={a.id}
          appointment={a}
          onPress={() => router.push(`/appointment/${a.id}`)}
        />
      ))}
      {!list.loading && !list.error && !upcoming.length && (
        <EmptyState
          title="Tu próxima visita te espera"
          detail="Cuando reserves, vas a encontrar el turno acá."
        />
      )}
    </Screen>
  );
}
