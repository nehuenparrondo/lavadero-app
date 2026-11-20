import { useState } from 'react';
import type { Appointment, Role } from '../types/entities';
import { appointmentCommands } from './appointmentCommands';
import { useAppointmentFlags } from './useAppointmentFlags';
import { useAppointmentMutation } from './useAppointmentMutation';
import { useAppointmentPayment } from './useAppointmentPayment';
import { useAppointmentResources } from './useAppointmentResources';
import { useAuth } from './useAuth';
/** Compone datos, selección y acciones del detalle de turno con ownership en la API.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @returns Detalle, permisos de controles, diálogos y comandos de estado/cobro; los errores de escritura no borran el turno.
 */
export function useAppointmentDetail(id: string) {
  const { user } = useAuth();
  const [receiptOpen, setReceiptOpen] = useState(false);
  const resources = useAppointmentResources(id, user, receiptOpen);
  const flags = useAppointmentFlags(resources.detail.data);
  const { action, mutate } = useAppointmentMutation(id, resources.refresh);
  const pay = useAppointmentPayment(mutate, () => flags.setPaymentOpen(false));
  return {
    ...resources,
    ...flags,
    ...appointmentCommands(flags, mutate),
    action,
    user,
    pay,
    receiptOpen,
    setReceiptOpen,
    canCancel: canCancel(
      resources.detail.data,
      user?.role,
      resources.settings.data?.cancellationNoticeMinutes,
    ),
    mutate,
    canPay: user?.role === 'admin' || Boolean(user?.canRecordPayments),
  };
}

/** La interfaz respeta el estado y la ventana de cancelación que el backend vuelve a verificar. */
function canCancel(a: Appointment | null, role: Role | undefined, notice = 120) {
  if (!a) return false;
  if (role === 'admin') return ['pending', 'confirmed', 'in_progress'].includes(a.status);
  return (
    role === 'client' &&
    ['pending', 'confirmed'].includes(a.status) &&
    Date.parse(a.startsAt) - Date.now() > notice * 60000
  );
}
