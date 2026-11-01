import { useEffect, useState } from 'react';
import type { Appointment, AppointmentStatus } from '../types/entities';
/** Selecciones de administración y apertura de diálogos; se sincronizan con la versión remota.
 * @param appointment - Turno autorizado que conserva datos históricos del contrato.
 * @returns Capacidades de vista derivadas de usuario y turno; no reemplazan permisos del backend.
 */
export function useAppointmentFlags(appointment: Appointment | null) {
  const [employeeId, setEmployeeId] = useState('');
  const [status, setStatus] = useState<AppointmentStatus>('pending');
  const [cancelOpen, setCancelOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  useEffect(() => {
    if (appointment) {
      setEmployeeId(appointment.employeeId ?? '');
      setStatus(appointment.status);
    }
  }, [appointment?.employeeId, appointment?.status]);
  return {
    employeeId,
    setEmployeeId,
    status,
    setStatus,
    cancelOpen,
    setCancelOpen,
    paymentOpen,
    setPaymentOpen,
  };
}
