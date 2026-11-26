import { View } from 'react-native';
import { useSignOutConfirmation } from '../../hooks/useSignOutConfirmation';
import { CompactIconButton } from '../atoms/CompactIconButton';
import { SectionHeader } from '../molecules/SectionHeader';
import { SignOutDialog } from './SignOutDialog';

/** Cabecera común de Cliente, Empleado y Administrador con salida en la esquina superior derecha.
 * @returns Título, botón accesible de puerta con flecha y diálogo de confirmación sin modificar formularios.
 */
export function ProfileHeader() {
  const exit = useSignOutConfirmation();
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <View style={{ flex: 1, minWidth: 0 }}>
          <SectionHeader title="Mi perfil" />
        </View>
        <CompactIconButton
          icon="logout"
          label="Cerrar sesión"
          onPress={exit.show}
          disabled={exit.busy}
        />
      </View>
      <SignOutDialog exit={exit} />
    </>
  );
}
