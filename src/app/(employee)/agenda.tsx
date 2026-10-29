import { AppointmentsScreen } from '../../screens/client/AppointmentsScreen';
/** Agenda del empleado, limitada en servidor a sus asignaciones. */
export default function Agenda() {
  return <AppointmentsScreen mode="employee" />;
}
