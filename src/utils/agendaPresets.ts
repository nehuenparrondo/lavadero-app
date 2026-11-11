import { today } from './format';

/** Genera filtros consistentes al abrir una agenda.
 * @param mode Rol de la pantalla.
 * @param history Si se muestran trabajos anteriores.
 * @returns Filtros iniciales; no modifican los permisos del servidor.
 */
export function initialAgendaFilters(mode: string, history: boolean) {
  return {
    history,
    date: mode === 'client' || history ? '' : today(),
    status: '',
    clientId: '',
    employeeId: '',
    plate: '',
    queue: '',
  };
}

/** Cada bandeja descarta filtros incompatibles de una consulta anterior.
 * @param preset Identificador del acceso rápido.
 * @returns Fecha, estado y cola combinables con el historial del rol.
 */
export function agendaPreset(preset: string) {
  return {
    date: preset === 'today' ? today() : '',
    status: preset === 'review' ? 'awaiting_review' : '',
    queue: preset === 'new' ? 'requested' : '',
    clientId: '',
    employeeId: '',
    plate: '',
  };
}
