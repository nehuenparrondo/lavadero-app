import type { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRefreshOnReturn } from '../../hooks/useRefreshOnReturn';
import { useTheme } from '../../hooks/useTheme';
import type { RefreshTrigger } from '../../utils/refreshGate';
import type { ScrollRequest } from '../../hooks/useScrollRequest';
import { WorkspaceFrame } from './WorkspaceFrame';
import { ScreenContent } from './ScreenContent';
/** Marco de todos los roles con controles flotantes y actualización al regresar.
 * @param props Contenido, recarga manual y sondeo visible opcional de agendas.
 * @returns Pantalla segura con ancho legible y una sola región desplazable.
 */
export function Screen({
  children,
  refreshing = false,
  onRefresh,
  refreshInterval = 15_000,
  onRevalidate,
  scrollRequest,
}: {
  children: PropsWithChildren['children'];
  refreshing?: boolean;
  onRefresh?: () => void | Promise<void>;
  refreshInterval?: number;
  onRevalidate?: (trigger: RefreshTrigger) => void | Promise<void>;
  scrollRequest?: ScrollRequest | undefined;
}) {
  useRefreshOnReturn(onRefresh, refreshing, refreshInterval, onRevalidate);
  const { colors } = useTheme();
  return (
    <SafeAreaView
      edges={['top', 'left', 'right', 'bottom']}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <WorkspaceFrame>
        <ScreenContent
          refreshing={refreshing}
          onRefresh={onRefresh}
          scrollRequest={scrollRequest}
        >
          {children}
        </ScreenContent>
      </WorkspaceFrame>
    </SafeAreaView>
  );
}
