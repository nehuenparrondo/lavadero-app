import { useState } from 'react';
import { useRemoteData } from './useRemoteData';
import type { Report } from '../types/entities';
import { today } from '../utils/format';
/** Reporte por período calendario local y fecha elegida. */
export function useReports() {
  const [period, setPeriod] = useState('week');
  const [date, setDate] = useState(today());
  const state = useRemoteData<Report>('/reports', {
    period,
    date: /^\d{4}-\d{2}-\d{2}$/u.test(date) ? date : undefined,
  });
  return { ...state, period, setPeriod, date, setDate };
}
