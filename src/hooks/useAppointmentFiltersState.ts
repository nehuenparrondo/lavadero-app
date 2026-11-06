import { useState } from 'react';
import { today } from '../utils/format';
const reviewFilters = {
  date: '',
  status: 'awaiting_review',
  clientId: '',
  employeeId: '',
  plate: '',
};
/** Filtros locales; no sustituyen las restricciones de propiedad aplicadas por la API.
 * @param mode - Experiencia o preferencia seleccionada dentro de su unión de tipos.
 * @param history - Selecciona trabajos anteriores en lugar de próximas visitas.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useAppointmentFiltersState(
  mode: 'client' | 'employee' | 'admin',
  history: boolean,
) {
  const [filters, setFilters] = useState({
    history,
    date: mode === 'client' || history ? '' : today(),
    status: '',
    clientId: '',
    employeeId: '',
    plate: '',
  });
  function set<K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }
  return {
    ...filters,
    setHistory: (v: boolean) => set('history', v),
    setDate: (v: string) => set('date', v),
    setStatus: (v: string) => set('status', v),
    setClientId: (v: string) => set('clientId', v),
    setEmployeeId: (v: string) => set('employeeId', v),
    setPlate: (v: string) => set('plate', v),
    showReviews: () => setFilters((current) => ({ ...current, ...reviewFilters })),
  };
}
