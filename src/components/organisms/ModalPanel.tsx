import type { PropsWithChildren } from 'react';
import { Modal, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useScrollControls } from '../../hooks/useScrollControls';
import { FloatingControls } from '../molecules/FloatingControls';
import { ModalContent } from './ModalContent';
/** Diálogo nativo con tema y volver arriba disponibles sin salir del formulario.
 * @param props Visibilidad, título, contenido y cierre accesible.
 * @returns Modal con acciones en el borde inferior seguro de la pantalla.
 */
export function ModalPanel({
  visible,
  title,
  onClose,
  children,
}: PropsWithChildren<{
  visible: boolean;
  title: string;
  onClose: () => void;
}>) {
  const controls = useScrollControls();
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000088',
          justifyContent: 'center',
          padding: 16,
          paddingBottom: 88 + insets.bottom,
        }}
      >
        <ModalContent controls={controls} title={title} onClose={onClose}>
          {children}
        </ModalContent>
        <FloatingControls
          showTop={controls.showTop}
          toTop={controls.toTop}
          bottom={16 + insets.bottom}
        />
      </View>
    </Modal>
  );
}
