import type { PropsWithChildren } from 'react';
import { EmptyState } from '../molecules/EmptyState';
import { LoadingState } from '../molecules/LoadingState';
import { Notice } from '../molecules/Notice';
/** Estados consistentes de lista: carga inicial, error recuperable y vacío.
 * @param props - Propiedades tipadas: loading, error, empty, emptyTitle, onRetry, children.
 * @returns Vista de CollectionState con el contrato de propiedades declarado.
 */
export function CollectionState({
  loading,
  error,
  empty,
  emptyTitle,
  onRetry,
  children,
}: PropsWithChildren<{
  loading: boolean;
  error: string;
  empty: boolean;
  emptyTitle: string;
  onRetry: () => void;
}>) {
  if (loading && empty) return <LoadingState />;
  if (error) return <Notice error={error} onRetry={onRetry} />;
  if (empty) return <EmptyState title={emptyTitle} />;
  return <>{children}</>;
}
