import { Text } from '../../components/atoms/Text';
import { Card } from '../../components/molecules/Card';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { EntityForm } from '../../components/organisms/EntityForm';
import { Screen } from '../../components/organisms/Screen';
import { VehicleTypeManager } from '../../components/organisms/VehicleTypeManager';
import { useSettings } from '../../hooks/useSettings';
/** Horarios, capacidad, ventana de cancelación y categorías del negocio.
 * @returns Vista de SettingsScreen con el contrato de propiedades declarado.
 */
export function SettingsScreen() {
  const m = useSettings();
  return (
    <Screen
      refreshing={m.state.loading}
      onRefresh={m.state.refresh}
      onRevalidate={m.state.revalidate}
    >
      <SectionHeader title="Configuración" subtitle="Ajustá la atención del lavadero." />
      <Notice error={m.state.error || m.action.error} message={m.action.message} />
      {m.state.data && (
        <Card>
          <Text>Moneda: pesos argentinos (ARS) · Horario de Argentina</Text>
          <Text>
            Los cambios se aplican a nuevas reservas; los turnos guardados conservan su fecha y
            precios.
          </Text>
          <EntityForm
            key={m.state.data.hours.map((h) => h.weekday).join(',')}
            fields={m.fields}
            initialValues={m.initialValues}
            onSubmit={m.save}
            busy={m.action.busy}
          />
        </Card>
      )}
      <VehicleTypeManager />
    </Screen>
  );
}
