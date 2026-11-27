import { useEffect, useState } from 'react';
import type { Appointment } from '../types/entities';
/** Separa la selección de responsable y los diálogos del estado remoto del turno.
 * @param appointment Detalle autorizado; solo cambiar employeeId remoto resincroniza la selección.
 * @returns Selección, apertura de diálogos y revisión del formulario de notas; una recarga idéntica no borra el borrador.
 */
export function useAppointmentFlags(appointment: Appointment | null) {
  const [employeeId, setEmployeeId] = useState('');
  const [cancelOpen, setCancelOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [noteRevision, setNoteRevision] = useState(0);
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
    noteRevision,
    setNoteRevision,
  };
}
