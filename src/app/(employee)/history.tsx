import { AppointmentsScreen } from '../../screens/client/AppointmentsScreen';
/** Trabajos anteriores del empleado.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export default function History() {
  return <AppointmentsScreen mode="employee" history />;
}
