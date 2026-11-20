import type { User } from '../types/entities';
import { useOptions } from './useOptions';
/** Recursos auxiliares de agenda, habilitados únicamente para la experiencia correspondiente.
 * @param mode Experiencia que determina qué opciones puede pedir la interfaz.
 * @returns Opciones administrativas con sus estados independientes.
 */
export function useAgendaResources(mode: 'client' | 'employee' | 'admin') {
  const clients = useOptions<User>('/users', { role: 'client' }, mode === 'admin');
  const employees = useOptions<User>('/users', { role: 'employee' }, mode === 'admin');
  return { clients, employees };
}
