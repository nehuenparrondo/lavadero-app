import type { useCancellationNotices } from '../../hooks/useCancellationNotices';
import { Notice } from '../molecules/Notice';
import { CancellationNoticeCard } from './CancellationNoticeCard';

/** Avisos visibles en Inicio hasta que el cliente confirme haberlos leído.
 * @param props Consulta propia y acción persistente de lectura.
 * @returns Cancelaciones con motivo o un error recuperable, sin confundir fallo con lista vacía.
 */
export function ClientCancellationNotices({
  notices,
}: {
  notices: ReturnType<typeof useCancellationNotices>;
}) {
  return (
    <>
      <Notice
        error={notices.list.error || notices.action.error}
        onRetry={notices.list.refresh}
      />
      {notices.list.data?.map((notice) => (
        <CancellationNoticeCard
          key={notice.id}
          notice={notice}
          busy={notices.action.busy}
          onRead={() => {
            void notices.acknowledge(notice.id);
          }}
        />
      ))}
    </>
  );
}
