import { View } from 'react-native';
import type { useAppointments } from '../../hooks/useAppointments';
import { Button } from '../atoms/Button';
import { DateInput } from '../molecules/DateInput';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
import { SearchBar } from '../molecules/SearchBar';
import { AppointmentClientFilter } from './AppointmentClientFilter';
import { AppointmentEmployeeFilter } from './AppointmentEmployeeFilter';
import { AppointmentStatusFilter } from './AppointmentStatusFilter';
/** Filtros por experiencia; cliente no puede seleccionar titulares ajenos.
 * @param props - Propiedades tipadas: manager.
 * @returns Vista de AppointmentFilters con el contrato de propiedades declarado.
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
      <AgendaSearch m={m} />
      {m.mode === 'admin' && (
        <>
          <Button label="Lavados por verificar" variant="secondary" onPress={m.showReviews} />
          <AppointmentStatusFilter m={m} />
          <AppointmentClientFilter m={m} />
          <AppointmentEmployeeFilter m={m} />
        </>
      )}
    </View>
  );
}

/** Al buscar una patente la agenda ignora la fecha seleccionada. */
function AgendaSearch({ m }: { m: ReturnType<typeof useAppointments> }) {
  return (
    <>
      {m.mode !== 'client' && (
        <SearchBar
          label="Buscar patente en todas las fechas"
          value={m.plate}
          onChange={m.setPlate}
        />
      )}
      {!m.plate && <DateInput label="Filtrar fecha" value={m.date} onChange={m.setDate} />}
      {!m.plate && m.date && (
        <Button label="Quitar filtro de fecha" variant="quiet" onPress={() => m.setDate('')} />
      )}
    </>
  );
}
