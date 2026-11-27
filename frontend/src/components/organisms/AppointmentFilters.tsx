import { View } from 'react-native';
import type { useAppointments } from '../../hooks/useAppointments';
import { Button } from '../atoms/Button';
import { DateInput } from '../molecules/DateInput';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
import { SearchBar } from '../molecules/SearchBar';
import { Card } from '../molecules/Card';
import { AppointmentAdvancedFilters } from './AppointmentAdvancedFilters';
import { AppointmentAgendaPresets } from './AppointmentAgendaPresets';
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
    <Card>
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
      {m.mode !== 'client' && <AppointmentAgendaPresets m={m} />}
      <AgendaSearch m={m} />
      {m.mode === 'admin' && <AppointmentAdvancedFilters m={m} />}
    </Card>
  );
}

/** Al buscar una patente la agenda ignora la fecha seleccionada. */
function AgendaSearch({ m }: { m: ReturnType<typeof useAppointments> }) {
  return (
    <View style={{ gap: 12 }}>
      {m.mode !== 'client' && (
        <SearchBar label="Buscar por patente" value={m.plate} onChange={m.setPlate} />
      )}
      {!m.plate && <DateInput label="Elegir día" value={m.date} onChange={m.setDate} />}
      {m.mode === 'client' && Boolean(m.date) && (
        <Button label="Todas las fechas" variant="quiet" onPress={() => m.setDate('')} />
      )}
      {Boolean(m.plate) && (
        <Button label="Limpiar búsqueda" variant="quiet" onPress={() => m.setPlate('')} />
      )}
    </View>
  );
}
