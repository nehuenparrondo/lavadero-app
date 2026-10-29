import { useRemoteData } from './useRemoteData';
import { useAction } from './useAction';
import { writeResource } from '../api/services/resourceService';
import type { Settings } from '../types/entities';
import type { FormFieldDefinition } from '../types/form';
const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
/** Configuración operativa con horario local y capacidad simultánea. */
export function useSettings() {
  const state = useRemoteData<Settings>('/settings');
  const action = useAction();
  const data = state.data;
  const fields: FormFieldDefinition[] = [
    {
      name: 'days',
      label: 'Días de atención',
      kind: 'multiple',
      options: days.map((label, i) => ({ label, value: String(i + 1) })),
    },
    { name: 'opensAt', label: 'Apertura', kind: 'time', placeholder: '09:30' },
    { name: 'closesAt', label: 'Cierre', kind: 'time', placeholder: '16:30' },
    { name: 'capacity', label: 'Vehículos que se pueden atender a la vez', kind: 'number' },
    {
      name: 'cancellation',
      label: 'Anticipación mínima para cancelar (minutos)',
      kind: 'number',
    },
    { name: 'step', label: 'Ofrecer horarios cada (minutos)', kind: 'number' },
  ];
  const initialValues = data
    ? {
        days: data.hours.map((h) => h.weekday).join(','),
        opensAt: data.hours[0]?.opensAt.slice(0, 5) ?? '09:30',
        closesAt: data.hours[0]?.closesAt.slice(0, 5) ?? '16:30',
        capacity: String(data.simultaneousCapacity),
        cancellation: String(data.cancellationNoticeMinutes),
        step: String(data.slotStepMinutes),
      }
    : {};
  const save = async (v: Record<string, string>) => {
    await action.run(async () => {
      await writeResource('put', '/settings', {
        timeZone: data?.timeZone ?? 'America/Argentina/Buenos_Aires',
        cancellationNoticeMinutes: Number(v.cancellation),
        simultaneousCapacity: Number(v.capacity),
        slotStepMinutes: Number(v.step),
        hours: (v.days ?? '')
          .split(',')
          .filter(Boolean)
          .map((day) => ({ weekday: Number(day), opensAt: v.opensAt, closesAt: v.closesAt })),
      });
      await state.refresh();
    });
  };
  return { state, action, fields, initialValues, save };
}
