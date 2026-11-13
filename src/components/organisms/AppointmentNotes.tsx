import { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { EntityForm } from './EntityForm';
import { AppointmentNote } from '../molecules/AppointmentNote';
import { appointmentNoteFields } from '../../constants/appointmentFields';
/** Lista observaciones de trabajo y conecta la carga de una nueva nota.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentNotes con el contrato de propiedades declarado.
 */
export function AppointmentNotes({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  const a = m.detail.data;
  if (!a) return null;
  return (
    <Card>
      <Text style={{ fontWeight: '700' }}>Observaciones del trabajo</Text>
      {a.notes?.length ? (
        a.notes.map((n) => <AppointmentNote key={n.id} note={n} />)
      ) : (
        <Text>Sin observaciones registradas.</Text>
      )}
      {m.user?.role !== 'client' && (
        <EntityForm
          key={m.noteRevision}
          fields={appointmentNoteFields}
          onSubmit={m.addNote}
          busy={m.action.busy}
          submitLabel="Agregar observación"
        />
      )}
    </Card>
  );
}
