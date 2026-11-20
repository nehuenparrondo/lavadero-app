import { useState } from 'react';
import type { Report } from '../types/entities';
import { today } from '../utils/format';
import { useRemoteData } from './useRemoteData';
/** Reporte por período calendario local y fecha elegida.
 * @returns Período/fecha seleccionados, respuesta agregada del servidor y carga/error del reporte.
 */
export function useReports() {
  const [period, setPeriod] = useState('month');
  const [date, setDate] = useState(today());
  const state = useRemoteData<Report>('/reports', {
    period,
    date: /^\d{4}-\d{2}-\d{2}$/u.test(date) ? date : undefined,
  });
  return { ...state, period, setPeriod, date, setDate };
}
