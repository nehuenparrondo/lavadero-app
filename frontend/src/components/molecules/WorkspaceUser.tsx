import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { profileDestination } from '../../utils/profileDestination';
import { useAuth } from '../../hooks/useAuth';
import { workspaceStyles as s } from '../../theme/workspace.styles';
import { Avatar } from '../atoms/Avatar';
import { WorkspaceIdentity } from './WorkspaceIdentity';
/** Acceso al perfil desde toda la identidad, tanto en cabecera como en barra lateral.
 * @param props Variante inversa de la barra lateral o compacta para teléfonos.
 * @returns Botón de perfil del rol actual; no consulta datos ajenos.
 */
export function WorkspaceUser({
  inverse = false,
  compact = false,
}: {
  inverse?: boolean;
  compact?: boolean;
}) {
  const { user } = useAuth();
  const router = useRouter();
  if (!user) return null;
  const label = inverse
    ? 'Abrir mi perfil desde la barra lateral'
    : 'Abrir mi perfil desde el encabezado';
  return (
    <Pressable
      style={s.user}
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => router.navigate(profileDestination(user.role))}
    >
      <Avatar name={user.firstName} url={user.avatarUrl} />
      {!compact && <WorkspaceIdentity user={user} inverse={inverse} />}
    </Pressable>
  );
}
