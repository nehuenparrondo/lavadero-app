import type { useAppointments } from '../../hooks/useAppointments';
import { today } from '../../utils/format';
import { ChoiceGroup } from '../molecules/ChoiceGroup';

/** Accesos de una pulsación que aplican un conjunto coherente de filtros.
 * @param props Agenda del equipo o del administrador.
 * @returns Hoy, todas las fechas y las dos bandejas de administración.
 */
export function AppointmentAgendaPresets({ m }: { m: ReturnType<typeof useAppointments> }) {
  const value = m.plate
    ? ''
    : m.queue
      ? 'new'
      : m.status === 'awaiting_review'
        ? 'review'
        : m.date === today()
          ? 'today'
          : !m.date
            ? 'all'
            : '';
  return (
    <ChoiceGroup
      value={value}
      onChange={m.choosePreset}
      options={[
        { value: 'today', label: 'Hoy' },
        { value: 'all', label: 'Todas las fechas' },
        ...(m.mode === 'admin'
          ? [
              { value: 'new', label: 'Nuevas solicitudes' },
              { value: 'review', label: 'Por verificar' },
            ]
          : []),
      ]}
    />
  );
}
