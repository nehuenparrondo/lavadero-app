import { PageHeading } from '../../components/molecules/PageHeading';
import { OverviewColumns } from '../../components/molecules/OverviewColumns';
import { CareGuide } from '../../components/molecules/CareGuide';
import { BookingInvitation } from '../../components/organisms/BookingInvitation';
import { ClientQuickActions } from '../../components/organisms/ClientQuickActions';
import { ClientVisitList } from '../../components/organisms/ClientVisitList';
import { Screen } from '../../components/organisms/Screen';
import { useHome } from '../../hooks/useHome';
import { ClientCancellationNotices } from '../../components/organisms/ClientCancellationNotices';
/** Composición del cliente. useHome conserva la obtención y selección de visitas.
 * @returns Inicio personalizado, reserva principal y seguimiento de visitas reales.
 */
export function HomeScreen() {
  const home = useHome();
  return (
    <Screen
      refreshing={home.list.loading}
      onRefresh={home.refresh}
      onRevalidate={home.revalidate}
    >
      <PageHeading
        eyebrow="Tu espacio"
        title={'Hola, ' + (home.user?.firstName ?? '') + '.'}
        detail="Reservá una visita y seguí el estado de tu lavado desde acá."
      />
      <ClientCancellationNotices notices={home.notices} />
      <BookingInvitation />
      <ClientQuickActions />
      <OverviewColumns primary={<ClientVisitList home={home} />} secondary={<CareGuide />} />
    </Screen>
  );
}
