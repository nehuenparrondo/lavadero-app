import { useEffect, useState } from 'react';
import type { Appointment } from '../types/entities';
/** Selecciones de administración y apertura de diálogos; se sincronizan con la versión remota.
 * @param appointment - Turno autorizado que conserva datos históricos del contrato.
 * @returns Selección de empleado/estado, apertura de diálogos y sus setters, sincronizados con el turno.
 */
export function useAppointmentFlags(appointment: Appointment | null) {
  const [employeeId, setEmployeeId] = useState('');
  const [cancelOpen, setCancelOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  useEffect(() => {
    if (appointment) {
      setEmployeeId(appointment.employeeId ?? '');
    }
  }, [appointment?.employeeId]);
  return {
    employeeId,
    setEmployeeId,
    cancelOpen,
    setCancelOpen,
    paymentOpen,
    setPaymentOpen,
  };
}
