import { useEffect, useRef, useState } from 'react';
import { randomUUID } from 'expo-crypto';
import { useRemoteData } from './useRemoteData';
import { useOptions } from './useOptions';
import { useAction } from './useAction';
import { useAuth } from './useAuth';
import type {
  Appointment,
  Payment,
  User,
  Settings,
  AppointmentStatus,
} from '../types/entities';
import { writeResource } from '../api/services/resourceService';
import { pesosToCents } from '../utils/pesosToCents';
/** Operaciones de detalle: asignación, estados, observaciones, cobro idempotente y comprobante. */
export function useAppointmentDetail(id: string) {
  const { user } = useAuth();
  const detail = useRemoteData<Appointment>(`/appointments/${id}`, {}, Boolean(id));
  const action = useAction();
  const settings = useRemoteData<Settings>('/business');
  const employees = useOptions<User>('/users', { role: 'employee' }, user?.role === 'admin');
  const payments = useRemoteData<Payment[]>(
    `/appointments/${id}/payments`,
    {},
    Boolean(id) && user?.role !== 'employee',
  );
  const [employeeId, setEmployeeId] = useState('');
  const [status, setStatus] = useState<AppointmentStatus>('pending');
  const [cancelOpen, setCancelOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const key = useRef(randomUUID());
  const receipt = useRemoteData<Appointment & { receiptNumber: string }>(
    `/appointments/${id}/receipt`,
    {},
    receiptOpen && user?.role !== 'employee',
  );
  useEffect(() => {
    if (detail.data) {
      setEmployeeId(detail.data.employeeId ?? '');
      setStatus(detail.data.status);
    }
  }, [detail.data?.employeeId, detail.data?.status]);
  const mutate = async (method: 'post' | 'patch', path: string, body: unknown) => {
    const result = await action.run(() =>
      writeResource(method, `/appointments/${id}${path}`, body),
    );
    if (result !== undefined) {
      await Promise.all([detail.refresh(), payments.refresh()]);
    }
    return result;
  };
  const assign = async () => {
    const result = await mutate('patch', '/assignment', { employeeId });
    if (result !== undefined && detail.data?.status === 'pending')
      await mutate('patch', '/status', { status: 'confirmed' });
  };
  const setAdminStatus = async () => {
    await mutate('patch', '/status', { status });
  };
  const advance = async () => {
    await mutate('patch', '/status', {
      status: detail.data?.status === 'confirmed' ? 'in_progress' : 'completed',
    });
  };
  const cancel = async (v: Record<string, string>) => {
    if ((await mutate('post', '/cancel', { reason: v.reason ?? '' })) !== undefined)
      setCancelOpen(false);
  };
  const addNote = async (v: Record<string, string>) => {
    await mutate('post', '/notes', { body: v.body });
  };
  const pay = async (v: Record<string, string>) => {
    if (
      (await mutate('post', '/payments', {
        amountCents: pesosToCents(v.amount ?? ''),
        method: v.method,
        reference: v.reference || null,
        idempotencyKey: key.current,
      })) !== undefined
    ) {
      key.current = randomUUID();
      setPaymentOpen(false);
    }
  };
  const canCancel =
    user?.role === 'admin' ||
    (user?.role === 'client' &&
      Boolean(detail.data) &&
      ['pending', 'confirmed'].includes(detail.data!.status) &&
      new Date(detail.data!.startsAt).getTime() - Date.now() >
        (settings.data?.cancellationNoticeMinutes ?? 120) * 60000);
  return {
    detail,
    action,
    user,
    employees: employees.items.filter((e) => e.isActive),
    payments,
    employeeId,
    setEmployeeId,
    status,
    setStatus,
    setAdminStatus,
    assign,
    advance,
    cancelOpen,
    setCancelOpen,
    cancel,
    addNote,
    paymentOpen,
    setPaymentOpen,
    pay,
    canPay: user?.role === 'admin' || Boolean(user?.canRecordPayments),
    canCancel,
    receiptOpen,
    setReceiptOpen,
    receipt,
  };
}
