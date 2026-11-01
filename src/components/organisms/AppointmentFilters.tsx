import { View } from 'react-native';
import type { useAppointments } from '../../hooks/useAppointments';
import { Input } from '../atoms/Input';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
import { AppointmentClientFilter } from './AppointmentClientFilter';
import { AppointmentEmployeeFilter } from './AppointmentEmployeeFilter';
import { AppointmentStatusFilter } from './AppointmentStatusFilter';
/** Filtros por experiencia; cliente no puede seleccionar titulares ajenos.
 * @param props - Propiedades tipadas: manager. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
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
          <AppointmentStatusFilter m={m} />
          <AppointmentClientFilter m={m} />
          <AppointmentEmployeeFilter m={m} />
        </>
      )}
    </View>
  );
}
