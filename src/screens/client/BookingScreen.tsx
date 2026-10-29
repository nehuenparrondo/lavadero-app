import { Screen } from '../../components/organisms/Screen';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { FormField } from '../../components/molecules/FormField';
import { Button } from '../../components/atoms/Button';
import { Notice } from '../../components/molecules/Notice';
import { ScheduleSelector } from '../../components/organisms/ScheduleSelector';
import { useBooking } from '../../hooks/useBooking';
/** Selección de vehículo, servicios, fecha y horario con total antes de confirmar. */
export function BookingScreen() {
  const b = useBooking();
  return (
    <Screen>
      <SectionHeader
        title="Reservá tu lavado"
        subtitle="Elegí los detalles. Nosotros nos ocupamos del resto."
      />
      <Notice error={b.error || b.loadError} />
      {b.admin && (
        <FormField
          field={{
            name: 'client',
            label: 'Cliente',
            kind: 'choice',
            options: b.clients.map((c) => ({
              value: c.id,
              label: `${c.firstName} ${c.lastName}`,
            })),
          }}
          value={b.clientId}
          onChange={b.chooseClient}
        />
      )}
      <FormField
        field={{
          name: 'vehicle',
          label: 'Vehículo',
          kind: 'choice',
          options: b.vehicles.map((v) => ({
            value: v.id,
            label: `${v.plate} · ${v.brand} ${v.model}`,
          })),
        }}
        value={b.vehicleId}
        onChange={b.chooseVehicle}
      />
      <FormField
        field={{
          name: 'services',
          label: 'Servicios',
          kind: 'multiple',
          options: b.offered.map((s) => ({
            value: s.id,
            label: `${s.name} · ${s.durationMinutes} min`,
          })),
        }}
        value={b.serviceIds}
        onChange={b.setServiceIds}
      />
      <FormField
        field={{ name: 'date', label: 'Fecha', kind: 'date', placeholder: 'AAAA-MM-DD' }}
        value={b.date}
        onChange={b.setDate}
      />
      <ScheduleSelector booking={b} />
      <Button
        label="Confirmar reserva"
        loading={b.busy}
        disabled={!b.slot || b.availability.loading}
        onPress={() => {
          void b.submit();
        }}
      />
    </Screen>
  );
}
