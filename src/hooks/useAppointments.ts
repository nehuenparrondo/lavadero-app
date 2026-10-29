import { useState } from 'react';
import { usePagedList } from './usePagedList';
import { useRemoteData } from './useRemoteData';
import { useOptions } from './useOptions';
import type { Appointment, User } from '../types/entities';
import { today } from '../utils/format';
/** Agenda filtrada según experiencia, sin ampliar los permisos aplicados por backend. */
export function useAppointments(
  mode: 'client' | 'employee' | 'admin',
  initialHistory = false,
) {
  const [history, setHistory] = useState(initialHistory);
  const [date, setDate] = useState(mode === 'client' || initialHistory ? '' : today());
  const [status, setStatus] = useState('');
  const [clientId, setClientId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const list = usePagedList<Appointment>('/appointments', {
    history: mode === 'admin' ? undefined : String(history),
    date: /^\d{4}-\d{2}-\d{2}$/u.test(date) ? date : undefined,
    status: status || undefined,
    clientId: clientId || undefined,
    employeeId: employeeId || undefined,
  });
  const summary = useRemoteData<{ completed: number; pending: number }>(
    '/reports/me',
    { date: date || today() },
    mode === 'employee' && !history,
  );
  const clients = useOptions<User>('/users', { role: 'client' }, mode === 'admin');
  const employees = useOptions<User>('/users', { role: 'employee' }, mode === 'admin');
  return {
    ...list,
    mode,
    history,
    setHistory,
    date,
    setDate,
    status,
    setStatus,
    clientId,
    setClientId,
    employeeId,
    setEmployeeId,
    clients: clients.items,
    employees: employees.items,
    summary: summary.data,
  };
}
