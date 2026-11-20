import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useWorkspaceLayout } from '../../hooks/useWorkspaceLayout';
import { workspaceStyles as s } from '../../theme/workspace.styles';
import { WorkspaceHeader } from './WorkspaceHeader';
import { WorkspaceSidebar } from './WorkspaceSidebar';
/** Estructura común independiente del contenido y de las consultas de cada pantalla.
 * @param props Contenido desplazable que la pantalla entrega al marco.
 * @returns Navegación adaptada al ancho; los invitados conservan un acceso limpio.
 */
export function WorkspaceFrame({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const { wide } = useWorkspaceLayout();
  return (
    <View style={s.frame}>
      {user && wide && <WorkspaceSidebar />}
      <View style={s.main}>
        {user && <WorkspaceHeader wide={wide} />}
        {children}
      </View>
    </View>
  );
}
