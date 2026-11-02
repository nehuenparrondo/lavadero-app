import { useState } from 'react';
import { appointmentCommands } from './appointmentCommands';
import { useAppointmentFlags } from './useAppointmentFlags';
import { useAppointmentMutation } from './useAppointmentMutation';
import { useAppointmentPayment } from './useAppointmentPayment';
import { useAppointmentResources } from './useAppointmentResources';
import { useAuth } from './useAuth';
/** Compone datos, selección y acciones del detalle de turno con ownership en la API.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useAppointmentDetail(id: string) {
  const { user } = useAuth();
  const [receiptOpen, setReceiptOpen] = useState(false);
  const resources = useAppointmentResources(id, user, receiptOpen);
  const flags = useAppointmentFlags(resources.detail.data);
  const { action, mutate } = useAppointmentMutation(id, resources.refresh);
  const pay = useAppointmentPayment(mutate, () => flags.setPaymentOpen(false));
  const a = resources.detail.data;
  const canCancel =
    user?.role === 'admin' ||
    (user?.role === 'client' &&
      Boolean(a) &&
      ['pending', 'confirmed'].includes(a!.status) &&
      new Date(a!.startsAt).getTime() - Date.now() >
        (resources.settings.data?.cancellationNoticeMinutes ?? 120) * 60000);
  return {
    ...resources,
    ...flags,
    ...appointmentCommands(a, flags, mutate),
    action,
    user,
    pay,
    receiptOpen,
    setReceiptOpen,
    canCancel,
    canPay: user?.role === 'admin' || Boolean(user?.canRecordPayments),
  };
}
