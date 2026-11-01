import { useRouter } from 'expo-router';
import { roleNavigation } from '../../constants/roleNavigation';
import { Button } from '../atoms/Button';
import { ModalPanel } from './ModalPanel';
/** Menú administrativo móvil basado en el mismo catálogo que la barra lateral.
 * @param props Estado de apertura y cierre; siempre cierra antes de navegar.
 * @returns Diálogo con todos los destinos administrativos, incluidos vehículos y perfil.
 */
export function AdminMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  return (
    <ModalPanel visible={open} title="Administración" onClose={onClose}>
      {roleNavigation.admin.map((item) => (
        <Button
          key={item.path}
          label={item.label}
          icon={item.icon}
          variant="secondary"
          onPress={() => {
            onClose();
            router.push(item.href);
          }}
        />
      ))}
    </ModalPanel>
  );
}
