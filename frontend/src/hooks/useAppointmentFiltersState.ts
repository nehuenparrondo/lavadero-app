import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { agendaPreset, initialAgendaFilters } from '../utils/agendaPresets';
/** Filtros locales; no sustituyen las restricciones de propiedad aplicadas por la API.
 * @param mode - Experiencia o preferencia seleccionada dentro de su unión de tipos.
 * @param history - Selecciona trabajos anteriores en lugar de próximas visitas.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useAppointmentFiltersState(
  mode: 'client' | 'employee' | 'admin',
  history: boolean,
) {
  const { view } = useLocalSearchParams<{ view?: string }>();
  const [filters, setFilters] = useState(() => ({
    ...initialAgendaFilters(mode, history),
    ...(mode === 'admin' && (view === 'new' || view === 'review') ? agendaPreset(view) : {}),
  }));
  function set<K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }
  return {
    ...filters,
    setHistory: (v: boolean) =>
      setFilters((current) => ({ ...current, history: v, date: '' })),
    setDate: (v: string) => set('date', v),
    setStatus: (v: string) => setFilters((current) => ({ ...current, status: v, queue: '' })),
    setClientId: (v: string) => set('clientId', v),
    setEmployeeId: (v: string) => set('employeeId', v),
    setPlate: (v: string) => set('plate', v),
    choosePreset: (v: string) => setFilters((current) => ({ ...current, ...agendaPreset(v) })),
    clearAdvanced: () =>
      setFilters((current) => ({
        ...current,
        status: '',
        clientId: '',
        employeeId: '',
      })),
  };
}
