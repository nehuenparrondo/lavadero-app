import type { useAppointmentFlags } from './useAppointmentFlags';
import type { useAppointmentMutation } from './useAppointmentMutation';
/** Traduce acciones del detalle a comandos; la API vuelve a comprobar cada permiso.
 * @param flags Selección de responsable y controles locales de diálogos/formularios, no permisos de seguridad.
 * @param mutate Envía el comando, conserva mensajes y consulta el estado confirmado.
 * @returns Comandos de asignación, cancelación con motivo, inicio, confirmación y nota; cerrar un diálogo requiere éxito.
 */
export function appointmentCommands(
  flags: ReturnType<typeof useAppointmentFlags>,
  mutate: ReturnType<typeof useAppointmentMutation>['mutate'],
) {
  const assign = async () => {
    await mutate(
      'patch',
      '/assignment',
      { employeeId: flags.employeeId },
      'Responsable guardado.',
    );
  };
  const cancel = async (v: Record<string, string>) => {
    if ((await mutate('post', '/cancel', { reason: v.reason ?? '' })) !== undefined)
      flags.setCancelOpen(false);
  };
  const advance = async () => {
    await mutate('patch', '/status', {
      status: 'in_progress',
    });
  };
  const setAdminStatus = async () => {
    await mutate('patch', '/status', { status: 'confirmed' });
  };
  const addNote = async (v: Record<string, string>) => {
    if ((await mutate('post', '/notes', { body: v.body })) !== undefined)
      flags.setNoteRevision((revision) => revision + 1);
  };
  return { assign, cancel, advance, setAdminStatus, addNote };
}
