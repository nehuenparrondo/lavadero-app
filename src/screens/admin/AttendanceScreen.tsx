import { Button } from '../../components/atoms/Button';
import { Text } from '../../components/atoms/Text';
import { Card } from '../../components/molecules/Card';
import { DateInput } from '../../components/molecules/DateInput';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Screen } from '../../components/organisms/Screen';
import { useAttendance } from '../../hooks/useAttendance';
import type { Arrival } from '../../types/operations';
import { slotTime } from '../../utils/format';

/** Ficha la llegada observada hoy y consulta el registro de días anteriores.
 * @returns Pantalla de asistencia del equipo.
 */
export function AttendanceScreen() {
  const m = useAttendance();
  return (
    <Screen refreshing={m.loading} onRefresh={m.refresh}>
      <SectionHeader
        title="Asistencia del equipo"
        subtitle="Registrá la llegada cuando el empleado esté presente."
      />
      <DateInput
        label="Fecha de asistencia"
        value={m.date || m.data?.date || ''}
        onChange={m.setDate}
      />
      <Button label="Volver a hoy" variant="quiet" onPress={() => m.setDate('')} />
      <Notice
        error={m.error || m.action.error}
        message={m.action.message}
        onRetry={m.refresh}
      />
      <AttendanceList m={m} />
    </Screen>
  );
}

/** La lista histórica incluye solo las llegadas registradas en esa fecha. */
function AttendanceList({ m }: { m: ReturnType<typeof useAttendance> }) {
  if (!m.data) return null;
  if (!m.data.items.length) return <Text>Sin fichajes para esta fecha.</Text>;
  return m.data.items.map((item) => (
    <ArrivalCard key={item.employeeId} item={item} busy={m.action.busy} record={m.record} />
  ));
}

/** Identifica quién registró la primera llegada de cada empleado. */
function ArrivalCard({
  item,
  busy,
  record,
}: {
  item: Arrival;
  busy: boolean;
  record: (id: string) => Promise<void>;
}) {
  return (
    <Card>
      <Text style={{ fontWeight: '700' }}>{item.employeeName}</Text>
      {item.arrivedAt ? (
        <Text>
          Llegada {slotTime(item.arrivedAt)} · Registró {item.recordedByName}
        </Text>
      ) : (
        <Button
          label={`Fichar llegada de ${item.employeeName}`}
          loading={busy}
          onPress={() => {
            void record(item.employeeId);
          }}
        />
      )}
    </Card>
  );
}
