import { useState } from 'react';
import type { Report } from '../types/entities';
import { today } from '../utils/format';
import { useRemoteData } from './useRemoteData';
/** Reporte por período calendario local y fecha elegida.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useReports() {
  const [period, setPeriod] = useState('week');
  const [date, setDate] = useState(today());
  const state = useRemoteData<Report>('/reports', {
    period,
    date: /^\d{4}-\d{2}-\d{2}$/u.test(date) ? date : undefined,
  });
  return { ...state, period, setPeriod, date, setDate };
}
