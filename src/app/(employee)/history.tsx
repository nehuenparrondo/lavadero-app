import { EmployeeAgendaScreen } from '../../screens/employee/EmployeeAgendaScreen';
/** Ruta del equipo, restringida por la guarda de grupo y el servidor.
 * @returns Agenda o historial sin duplicar su implementación.
 */
export default function History() {
  return <EmployeeAgendaScreen history />;
}
