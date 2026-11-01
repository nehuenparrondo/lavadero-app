import { AppointmentsScreen } from '../../screens/client/AppointmentsScreen';
/** Vista administrativa de todos los turnos.
 * @returns Vista de AdminAppointments con el contrato de propiedades declarado.
 */
export default function AdminAppointments() {
  return <AppointmentsScreen mode="admin" />;
}
