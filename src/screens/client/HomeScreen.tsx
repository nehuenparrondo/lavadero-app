import { useRouter } from 'expo-router';
import { Screen } from '../../components/organisms/Screen';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Card } from '../../components/molecules/Card';
import { Button } from '../../components/atoms/Button';
import { Text } from '../../components/atoms/Text';
import { AppointmentCard } from '../../components/organisms/AppointmentCard';
import { Notice } from '../../components/molecules/Notice';
import { EmptyState } from '../../components/molecules/EmptyState';
import { useAuth } from '../../hooks/useAuth';
import { useRemoteData } from '../../hooks/useRemoteData';
import type { Page, Appointment } from '../../types/entities';
/** Inicio del cliente con sus próximas visitas reales y una acción principal. */
export function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const list = useRemoteData<Page<Appointment>>('/appointments', {
    history: 'false',
    limit: 100,
  });
  const upcoming = [...(list.data?.items ?? [])]
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, 3);
  return (
    <Screen
      refreshing={list.loading}
      onRefresh={() => {
        void list.refresh();
      }}
    >
      <SectionHeader
        title={`Hola, ${user?.firstName ?? ''}`}
        subtitle="Un auto limpio. Un día más simple."
      />
      <Card>
        <Text style={{ fontSize: 26, fontWeight: '800' }}>Tu próximo lavado empieza acá.</Text>
        <Text>Elegí tu vehículo, los servicios y el horario que te quede cómodo.</Text>
        <Button label="Reservar mi lavado" onPress={() => router.push('/booking')} />
      </Card>
      <SectionHeader title="Tus próximas visitas" />
      <Notice
        error={list.error}
        onRetry={() => {
          void list.refresh();
        }}
      />
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
