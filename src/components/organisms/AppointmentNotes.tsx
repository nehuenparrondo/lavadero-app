import { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { EntityForm } from './EntityForm';
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
