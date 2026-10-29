import { useLocalSearchParams } from 'expo-router';
import { Screen } from '../../components/organisms/Screen';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Card } from '../../components/molecules/Card';
import { StatusBadge } from '../../components/molecules/StatusBadge';
import { Text } from '../../components/atoms/Text';
import { Notice } from '../../components/molecules/Notice';
import { LoadingState } from '../../components/molecules/LoadingState';
import { AppointmentActions } from '../../components/organisms/AppointmentActions';
import { AppointmentDialogs } from '../../components/organisms/AppointmentDialogs';
import { EntityForm } from '../../components/organisms/EntityForm';
import { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { appointmentDate, money } from '../../utils/format';
/** Detalle de reserva con controles del rol, notas y comprobante histórico. */
export function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const m = useAppointmentDetail(typeof id === 'string' ? id : '');
  const a = m.detail.data;
  if (!a && m.detail.loading) return <LoadingState />;
  return (
    <Screen
      refreshing={m.detail.loading}
      onRefresh={() => {
        void m.detail.refresh();
      }}
    >
      <Notice error={m.detail.error || m.action.error} message={m.action.message} />
      {a && (
        <>
          <SectionHeader
            title={`${a.plate} · ${a.brand} ${a.model}`}
            subtitle={appointmentDate(a.startsAt)}
          />
          <Card>
            <StatusBadge status={a.status} />
            <Text>
              {a.color} · {a.clientName}
            </Text>
            {a.clientPhone && <Text>Contacto: {a.clientPhone}</Text>}
            <Text>Empleado: {a.employeeName ?? 'Aún no asignado'}</Text>
            {a.services?.map((s) => (
              <Text key={s.serviceId}>
                {s.name} · {s.durationMinutes} min
                {s.priceCents !== undefined ? ` · ${money(s.priceCents)}` : ''}
              </Text>
            ))}
            {a.totalCents !== undefined && (
              <>
                <Text style={{ fontWeight: '800', fontSize: 22 }}>
                  Total: {money(a.totalCents)}
                </Text>
                <Text>
                  Abonado: {money(a.paidCents)} · Saldo:{' '}
                  {money(a.totalCents - (a.paidCents ?? 0))}
                </Text>
              </>
            )}
          </Card>
          <AppointmentActions manager={m} />
          {m.user?.role !== 'employee' && Boolean(m.payments.data?.length) && (
            <Card>
              <Text style={{ fontWeight: '700' }}>Pagos registrados</Text>
              {m.payments.data?.map((p) => (
                <Text key={p.id}>
                  {money(p.amountCents)} · {p.method === 'cash' ? 'Efectivo' : 'Transferencia'}
                </Text>
              ))}
            </Card>
          )}
          <Card>
            <Text style={{ fontWeight: '700' }}>Observaciones del trabajo</Text>
            {a.notes?.length ? (
              a.notes.map((n) => (
                <Text key={n.id}>
                  {n.body} — {n.authorName}
                </Text>
              ))
            ) : (
              <Text>Sin observaciones registradas.</Text>
            )}
            {m.user?.role !== 'client' && (
              <EntityForm
                key={a.notes?.length ?? 0}
                fields={[{ name: 'body', label: 'Nueva observación', maxLength: 2000 }]}
                onSubmit={m.addNote}
                busy={m.action.busy}
                submitLabel="Agregar observación"
              />
            )}
          </Card>
          <AppointmentDialogs manager={m} />
        </>
      )}
    </Screen>
  );
}
