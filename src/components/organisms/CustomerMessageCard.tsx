import { useState } from 'react';
import { useRouter } from 'expo-router';
import type { CustomerMessage } from '../../types/operations';
import { appointmentDate } from '../../utils/format';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Badge } from '../atoms/Badge';
import { Card } from '../molecules/Card';
import { EntityForm } from './EntityForm';

/** Muestra la conversación y, en devoluciones, el responsable y su descripción histórica.
 * @param props - Mensaje, rol y acción de respuesta.
 * @returns Tarjeta con contexto del reclamo o devolución.
 */
export function CustomerMessageCard({
  item,
  admin,
  busy,
  reply,
}: {
  item: CustomerMessage;
  admin: boolean;
  busy: boolean;
  reply: (id: string, text: string) => Promise<void>;
}) {
  return (
    <Card>
      <Badge
        label={item.resolvedAt ? 'Respondido' : 'Pendiente'}
        tone={item.resolvedAt ? 'success' : 'warning'}
      />
      <Text style={{ fontWeight: '700' }}>
        {item.kind === 'complaint' ? 'Reclamo' : 'Devolución'} ·{' '}
        {appointmentDate(item.createdAt)}
      </Text>
      {admin && <Text>{item.clientName}</Text>}
      <Text>{item.body}</Text>
      {item.appointmentId && <MessageWork item={item} />}
      {item.reply && <Text>Respuesta de Administración: {item.reply}</Text>}
      {admin && !item.resolvedAt && (
        <ReplyForm busy={busy} submit={(text) => reply(item.id, text)} />
      )}
    </Card>
  );
}

/** Conserva el vínculo al trabajo incluso si el responsable cambia su nombre después. */
function MessageWork({ item }: { item: CustomerMessage }) {
  const router = useRouter();
  return (
    <>
      <Text>
        {item.plate} · Trabajo de {item.employeeName}
      </Text>
      <Text>{item.workDescription}</Text>
      <Button
        label="Abrir turno"
        variant="quiet"
        onPress={() => router.push(`/appointment/${item.appointmentId}`)}
      />
    </>
  );
}

/** Abre el formulario solo en el caso que Administración está atendiendo. */
function ReplyForm({
  busy,
  submit,
}: {
  busy: boolean;
  submit: (text: string) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  if (!open)
    return <Button label="Responder" variant="secondary" onPress={() => setOpen(true)} />;
  return (
    <EntityForm
      fields={[
        {
          name: 'reply',
          label: 'Respuesta para el cliente',
          kind: 'textarea',
          maxLength: 2000,
        },
      ]}
      busy={busy}
      submitLabel="Enviar respuesta y cerrar"
      onSubmit={({ reply }) => submit(reply!)}
    />
  );
}
