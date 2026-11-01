import { AppointmentsScreen } from '../../screens/client/AppointmentsScreen';
/** Vista administrativa de todos los turnos.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export default function AdminAppointments() {
  return <AppointmentsScreen mode="admin" />;
}
