import { View } from 'react-native';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
import { Input } from '../atoms/Input';
import { FormField } from '../molecules/FormField';
import { statusLabels } from '../molecules/StatusBadge';
import type { useAppointments } from '../../hooks/useAppointments';
/** Filtros por experiencia; cliente no puede seleccionar titulares ajenos. */
export function AppointmentFilters({
  manager: m,
}: {
  manager: ReturnType<typeof useAppointments>;
}) {
  return (
    <View style={{ gap: 12 }}>
      {m.mode === 'client' && (
        <ChoiceGroup
          value={String(m.history)}
          onChange={(v) => m.setHistory(v === 'true')}
          options={[
            { value: 'false', label: 'Próximos' },
            { value: 'true', label: 'Pasados' },
          ]}
        />
      )}
      <Input
        accessibilityLabel="Filtrar fecha"
        placeholder="Fecha (AAAA-MM-DD), vacía para ver todas"
        value={m.date}
        onChangeText={m.setDate}
      />
      {m.mode === 'admin' && (
        <>
          <ChoiceGroup
            value={m.status}
            onChange={m.setStatus}
            options={[
              { value: '', label: 'Todos' },
              ...Object.entries(statusLabels).map(([value, label]) => ({ value, label })),
            ]}
          />
          <FormField
            field={{
              name: 'client',
              label: 'Cliente',
              kind: 'choice',
              options: [
                { value: '', label: 'Todos' },
                ...m.clients.map((u) => ({
                  value: u.id,
                  label: `${u.firstName} ${u.lastName}`,
                })),
              ],
            }}
            value={m.clientId}
            onChange={m.setClientId}
          />
          <FormField
            field={{
              name: 'employee',
              label: 'Empleado',
              kind: 'choice',
              options: [
                { value: '', label: 'Todos' },
                ...m.employees.map((u) => ({
                  value: u.id,
                  label: `${u.firstName} ${u.lastName}`,
                })),
              ],
            }}
            value={m.employeeId}
            onChange={m.setEmployeeId}
          />
        </>
      )}
    </View>
  );
}
