import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Button } from '../atoms/Button';
/** Inicia el lavado; la finalización se compone por separado con el parte y el saldo.
 * @param props m contiene el comando y estado ocupado; AppointmentActions comprueba la visibilidad por rol/asignación.
 * @returns Botón Comenzar lavado; la API vuelve a validar responsable, vehículo y transición.
 */
export function EmployeeWorkAction({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  const appointment = m.detail.data;
  if (!appointment) return null;
  return (
    <Button
      label="Comenzar lavado"
      loading={m.action.busy}
      onPress={() => {
        void m.advance();
      }}
    />
  );
}
