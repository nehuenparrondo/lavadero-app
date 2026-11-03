import type { User } from '../types/entities';
import { today } from '../utils/format';
import { useOptions } from './useOptions';
import { useRemoteData } from './useRemoteData';
/** Recursos auxiliares de agenda, habilitados únicamente para la experiencia correspondiente.
 * @param mode Experiencia que determina qué opciones puede pedir la interfaz.
 * @param history Evita pedir el resumen diario al consultar el historial.
 * @param date Fecha de la jornada; vacía utiliza el día del negocio.
 * @returns Resumen personal y opciones administrativas con sus estados independientes.
 */
export function useAgendaResources(
  mode: 'client' | 'employee' | 'admin',
  history: boolean,
  date: string,
) {
  const summary = useRemoteData<{ completed: number; pending: number }>(
    '/reports/me',
    { date: date || today() },
    mode === 'employee' && !history && Boolean(date),
  );
  const clients = useOptions<User>('/users', { role: 'client' }, mode === 'admin');
  const employees = useOptions<User>('/users', { role: 'employee' }, mode === 'admin');
  return { summary, clients, employees };
}
