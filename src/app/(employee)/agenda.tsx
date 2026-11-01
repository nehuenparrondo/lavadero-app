import { AppointmentsScreen } from '../../screens/client/AppointmentsScreen';
/** Agenda del empleado, limitada en servidor a sus asignaciones.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export default function Agenda() {
  return <AppointmentsScreen mode="employee" />;
}
