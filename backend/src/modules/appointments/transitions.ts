import { ConflictError } from '../../errors/ConflictError.js';
import type { Role } from '../../types/domain.js';
import type { AppointmentStatus } from './appointments.types.js';
const employeeNext: Partial<Record<AppointmentStatus, AppointmentStatus>> = {
  pending: 'in_progress', // Compatibilidad con reservas anteriores al flujo compartido.
  confirmed: 'in_progress',
};
/** Valida máquina de estados; admin puede corregir estados, preservando demás invariantes en service.
 * @param from - Límite inicial del período o estado de origen, según su tipo.
 * @param to - Límite final o estado destino, según su tipo.
 * @param role - Rol permitido del catálogo de seguridad.
 * @returns `void`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function assertTransition(from: AppointmentStatus, to: AppointmentStatus, role: Role) {
  if (
    from === to ||
    (role === 'employee' && employeeNext[from] !== to) ||
    (role === 'client' && (to !== 'cancelled' || !['pending', 'confirmed'].includes(from))) ||
    (role === 'admin' && !adminTransition(from, to))
  )
    throw new ConflictError('No se permite esa transición de estado.');
}

/** El circuito de revisión tiene endpoints propios y conserva el historial de trabajos cerrados. */
function adminTransition(from: AppointmentStatus, to: AppointmentStatus) {
  return (
    (from === 'pending' && to === 'confirmed') ||
    (['pending', 'confirmed', 'in_progress'].includes(from) && to === 'cancelled')
  );
}
