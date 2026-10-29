import { Screen } from '../../components/organisms/Screen';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Card } from '../../components/molecules/Card';
import { EntityForm } from '../../components/organisms/EntityForm';
import { Notice } from '../../components/molecules/Notice';
import { Text } from '../../components/atoms/Text';
import { VehicleTypeManager } from '../../components/organisms/VehicleTypeManager';
import { useSettings } from '../../hooks/useSettings';
/** Horarios, capacidad, ventana de cancelación y categorías del negocio. */
export function SettingsScreen() {
  const m = useSettings();
  return (
    <Screen
      refreshing={m.state.loading}
      onRefresh={() => {
        void m.state.refresh();
      }}
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
