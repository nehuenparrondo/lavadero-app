import { AppointmentsScreen } from '../../screens/client/AppointmentsScreen';
/** Trabajos anteriores del empleado. */
export default function History() {
  return <AppointmentsScreen mode="employee" history />;
}
