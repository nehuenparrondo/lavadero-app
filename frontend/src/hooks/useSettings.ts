import { writeResource } from '../api/services/resourceService';
import { settingsFields } from '../constants/settingsFields';
import type { Settings } from '../types/entities';
import { settingsInitialValues } from '../utils/settingsForm';
import { useAction } from './useAction';
import { useRemoteData } from './useRemoteData';
/** Configuración operativa con horario local y capacidad simultánea.
 * @returns Configuración vigente, formulario y guardado; la pantalla no calcula capacidad ni valida reservas por su cuenta.
 */
export function useSettings() {
  const state = useRemoteData<Settings>('/settings');
  const action = useAction();
  const data = state.data;
  const initialValues = settingsInitialValues(data);
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
  return { state, action, fields: settingsFields, initialValues, save };
}
