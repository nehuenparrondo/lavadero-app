import { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { EntityForm } from './EntityForm';
/** Presenta appointment notes con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function AppointmentNotes({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  const a = m.detail.data;
  if (!a) return null;
  return (
    <Card>
      <Text style={{ fontWeight: '700' }}>Observaciones del trabajo</Text>
      {a.notes?.length ? (
        a.notes.map((n) => (
          <Text key={n.id}>
            {n.body} — {n.authorName}
          </Text>
        ))
      ) : (
        <Text>Sin observaciones registradas.</Text>
      )}
      {m.user?.role !== 'client' && (
        <EntityForm
          key={a.notes?.length ?? 0}
          fields={[{ name: 'body', label: 'Nueva observación', maxLength: 2000 }]}
          onSubmit={m.addNote}
          busy={m.action.busy}
          submitLabel="Agregar observación"
        />
      )}
    </Card>
  );
}
