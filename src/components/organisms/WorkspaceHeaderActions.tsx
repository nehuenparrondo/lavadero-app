import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { AppIcon } from '../atoms/AppIcon';
import { WorkspaceUser } from '../molecules/WorkspaceUser';
import { AdminMenu } from './AdminMenu';
/** Área de interacción de cabecera, separada del posicionamiento visual.
 * @param props Indica si el escritorio ya dispone de una barra lateral.
 * @returns Identidad en escritorio o acceso al menú administrativo en móvil.
 */
export function WorkspaceHeaderActions({ wide }: { wide: boolean }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  if (wide)
    return (
      <View style={{ width: 230 }}>
        <WorkspaceUser />
      </View>
    );
  if (user?.role !== 'admin') return null;
  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Abrir menú de administración"
        onPress={() => setOpen(true)}
        style={{ padding: 12 }}
      >
        <AppIcon name="menu" />
      </Pressable>
      <AdminMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
