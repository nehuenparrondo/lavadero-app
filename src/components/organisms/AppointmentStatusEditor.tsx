import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import type { AppointmentStatus } from '../../types/entities';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
import { statusLabels } from '../molecules/StatusBadge';
/** Expone las transiciones administrativas que el servidor vuelve a validar.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentStatusEditor con el contrato de propiedades declarado.
 */
export function AppointmentStatusEditor({
  m,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
}) {
  const appointment = m.detail.data;
  if (!appointment) return null;
  return (
    <Card>
      <Text style={{ fontWeight: '700' }}>Estado del turno</Text>
      <ChoiceGroup
        options={Object.entries(statusLabels).map(([value, label]) => ({ value, label }))}
        value={m.status}
        onChange={(v) => m.setStatus(v as AppointmentStatus)}
      />
      <Button
        label="Actualizar estado"
        disabled={m.status === appointment.status}
        loading={m.action.busy}
        onPress={() => {
          void m.setAdminStatus();
        }}
      />
    </Card>
  );
}
