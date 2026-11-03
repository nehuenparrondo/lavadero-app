import type { Appointment } from '../types/entities';
import type { useAppointmentFlags } from './useAppointmentFlags';
import type { useAppointmentMutation } from './useAppointmentMutation';
/** Acciones operativas; el permiso y la transición se vuelven a validar en el backend.
 * @param a - Turno autorizado que se consulta o transforma.
 * @param flags - Capacidades derivadas del rol, asignación y estado del turno.
 * @param mutate - Comando que conserva mensajes y recarga datos tras confirmar.
 * @returns `{ assign: () => Promise<void>; cancel: (v: Record<string, string>) => Promise<void>; advance: () => Promise<void>; setAdminStatus: () => Promise<void>; addNote: (v: Record<string, string>) => Promise<void>; }`.
 */
export function appointmentCommands(
  a: Appointment | null,
  flags: ReturnType<typeof useAppointmentFlags>,
  mutate: ReturnType<typeof useAppointmentMutation>['mutate'],
) {
  const assign = async () => {
    await mutate('patch', '/assignment', { employeeId: flags.employeeId });
  };
  const cancel = async (v: Record<string, string>) => {
    if ((await mutate('post', '/cancel', { reason: v.reason ?? '' })) !== undefined)
      flags.setCancelOpen(false);
  };
  const advance = async () => {
    await mutate('patch', '/status', {
      status: a?.status === 'in_progress' ? 'completed' : 'in_progress',
    });
  };
  const setAdminStatus = async () => {
    await mutate('patch', '/status', { status: flags.status });
  };
  const addNote = async (v: Record<string, string>) => {
    await mutate('post', '/notes', { body: v.body });
  };
  return { assign, cancel, advance, setAdminStatus, addNote };
}
