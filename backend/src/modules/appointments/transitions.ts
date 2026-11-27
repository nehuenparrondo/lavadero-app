import { ConflictError } from '../../errors/ConflictError.js';
import type { Role } from '../../types/domain.js';
import type { AppointmentStatus } from './appointments.types.js';
const employeeNext: Partial<Record<AppointmentStatus, AppointmentStatus>> = {
  pending: 'in_progress', // Compatibilidad con reservas anteriores al flujo compartido.
  confirmed: 'in_progress',
};
/** Autoriza el cambio genérico; finalizar y revisar tienen sus propios servicios y controles.
 * @param from Estado persistido del turno que ya debe estar bloqueado por el servicio.
 * @param to Estado solicitado; repetir el estado actual también se rechaza.
 * @param role Rol vigente: el empleado solo inicia; el cliente cancela; Administración confirma pendientes o cancela.
 * @returns No devuelve valor; continuar significa que esta transición está permitida para el rol.
 * @throws ConflictError Si la combinación de estado de origen, destino y rol no está habilitada.
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
