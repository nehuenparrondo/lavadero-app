import { useState } from 'react';
import { writeResource } from '../api/services/resourceService';
import type { Attendance } from '../types/operations';
import { validDate } from '../utils/calendar';
import { useAction } from './useAction';
import { useRemoteData } from './useRemoteData';

/** Usa la fecha oficial del servidor y recarga el fichaje tras cada llegada.
 * @returns Fecha seleccionada, plantel y acción de fichaje.
 */
export function useAttendance() {
  const [date, setDate] = useState('');
  const data = useRemoteData<Attendance>(
    '/attendance',
    { date: date || undefined },
    !date || validDate(date),
  );
  const action = useAction();
  const record = async (employeeId: string) => {
    if (!data.data) return;
    const result = await action.run(
      () =>
        writeResource('post', `/attendance/${employeeId}/arrival`, { date: data.data?.date }),
      'Llegada registrada.',
    );
    if (result) await data.refresh();
  };
  return { ...data, date, setDate, action, record };
}
