import { Text } from '../../components/atoms/Text';
import { Card } from '../../components/molecules/Card';
import { ChoiceGroup } from '../../components/molecules/ChoiceGroup';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Pagination } from '../../components/molecules/Pagination';
import { CustomerMessageCard } from '../../components/organisms/CustomerMessageCard';
import { EntityForm } from '../../components/organisms/EntityForm';
import { Screen } from '../../components/organisms/Screen';
import { useCustomerMessages } from '../../hooks/useCustomerMessages';

/** Los clientes envían reclamos y Administración revisa y responde desde su bandeja.
 * @param props - admin habilita los controles del panel administrativo.
 * @returns Pantalla de atención para el rol actual.
 */
export function SupportScreen({ admin = false }: { admin?: boolean }) {
  const m = useCustomerMessages(admin);
  return (
    <Screen
      refreshing={m.loading}
      onRefresh={m.refresh}
      refreshInterval={30000}
      onRevalidate={m.revalidate}
    >
      <SectionHeader
        title={admin ? 'Reclamos y devoluciones' : 'Atención al cliente'}
        subtitle={
          admin
            ? 'Revisá el historial y respondé a tus clientes.'
            : 'Contanos qué pasó y consultá las respuestas del lavadero.'
        }
      />
      <Notice
        error={m.error || m.action.error}
        message={m.action.message}
        onRetry={m.refresh}
      />
      {admin ? <InboxFilter m={m} /> : <ComplaintForm m={m} />}
      <Messages m={m} admin={admin} />
    </Screen>
  );
}

type Inbox = ReturnType<typeof useCustomerMessages>;

/** Mantiene el borrador del reclamo hasta que se confirma el envío. */
function ComplaintForm({ m }: { m: Inbox }) {
  return (
    <Card>
      <EntityForm
        key={m.created}
        fields={[{ name: 'body', label: 'Nuevo reclamo', kind: 'textarea', maxLength: 2000 }]}
        busy={m.action.busy}
        submitLabel="Enviar reclamo"
        onSubmit={({ body }) => m.createComplaint(body!)}
      />
    </Card>
  );
}

/** La bandeja del administrador se abre en pendientes. */
function InboxFilter({ m }: { m: Inbox }) {
  return (
    <ChoiceGroup
      value={m.state}
      onChange={m.setState}
      options={[
        { value: 'open', label: 'Pendientes' },
        { value: 'resolved', label: 'Respondidos' },
        { value: '', label: 'Todos' },
      ]}
    />
  );
}

/** Presenta la página actual y conserva acceso a conversaciones anteriores. */
function Messages({ m, admin }: { m: Inbox; admin: boolean }) {
  if (!m.data) return null;
  if (!m.data.items.length) return <Text>Sin mensajes en esta bandeja.</Text>;
  return (
    <>
      {m.data.items.map((item) => (
        <CustomerMessageCard
          key={item.id}
          item={item}
          admin={admin}
          busy={m.action.busy}
          reply={m.reply}
        />
      ))}
      <Pagination
        page={m.page}
        total={m.data.total}
        limit={m.data.limit}
        onChange={m.setPage}
      />
    </>
  );
}
