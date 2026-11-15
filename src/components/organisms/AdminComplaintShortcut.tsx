import { useRouter } from 'expo-router';
import type { useDashboard } from '../../hooks/useDashboard';
import { Button } from '../atoms/Button';
import { Notice } from '../molecules/Notice';

/** Hace visibles los reclamos nuevos desde el resumen sin esperar una recarga manual.
 * @param props Recurso de pendientes actualizado con el tablero.
 * @returns Acceso a la bandeja y error explícito si no se pudo consultar su cantidad.
 */
export function AdminComplaintShortcut({
  resource,
}: {
  resource: ReturnType<typeof useDashboard>['complaints'];
}) {
  const router = useRouter();
  const count = resource.data?.total;
  return (
    <>
      <Notice error={resource.error} />
      <Button
        label={`Reclamos y devoluciones${count === undefined ? '' : ` · ${count} pendientes`}`}
        variant="secondary"
        onPress={() => router.push('/(admin)/customer-messages')}
      />
    </>
  );
}
