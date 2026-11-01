import type { Appointment } from '../types/entities';
import type { useAppointmentFlags } from './useAppointmentFlags';
import type { useAppointmentMutation } from './useAppointmentMutation';
/** Acciones operativas; el permiso y la transición se vuelven a validar en el backend.
 * @param a - Valor tipado de a utilizado por esta operación.
 * @param flags - Valor tipado de flags utilizado por esta operación.
 * @param mutate - Valor tipado de mutate utilizado por esta operación.
 * @returns `{ assign: () => Promise<void>; cancel: (v: Record<string, string>) => Promise<void>; advance: () => Promise<void>; setAdminStatus: () => Promise<void>; addNote: (v: Record<string, string>) => Promise<void>; }`, según el contrato de la operación.
 */
export function appointmentCommands(
  a: Appointment | null,
  flags: ReturnType<typeof useAppointmentFlags>,
  mutate: ReturnType<typeof useAppointmentMutation>['mutate'],
) {
  const assign = async () => {
    const result = await mutate('patch', '/assignment', { employeeId: flags.employeeId });
    if (result !== undefined && a?.status === 'pending')
      await mutate('patch', '/status', { status: 'confirmed' });
  };
  const cancel = async (v: Record<string, string>) => {
    if ((await mutate('post', '/cancel', { reason: v.reason ?? '' })) !== undefined)
      flags.setCancelOpen(false);
  };
  const advance = async () => {
    await mutate('patch', '/status', {
      status: a?.status === 'confirmed' ? 'in_progress' : 'completed',
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
