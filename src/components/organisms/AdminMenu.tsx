import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Button } from '../atoms/Button';
import { ModalPanel } from './ModalPanel';
const items = [
  ['dashboard', 'Tablero'],
  ['appointments', 'Turnos'],
  ['users', 'Usuarios'],
  ['services', 'Servicios y precios'],
  ['reports', 'Reportes'],
  ['settings', 'Configuración'],
  ['profile', 'Perfil'],
] as const;

/** Menú de administración; cierra el diálogo antes de cambiar de sección.
 * @param props - Propiedades tipadas: open, onClose. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function AdminMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  return (
    <ModalPanel visible={open} title="Administración" onClose={onClose}>
      {items.map(([path, label]) => (
        <Button
          key={path}
          label={label}
          variant="secondary"
          onPress={() => {
            onClose();
            router.push(`/(admin)/${path}` as Href);
          }}
        />
      ))}
    </ModalPanel>
  );
}
