import type { IconName } from '../../types/icon';
import { AppIcon } from './AppIcon';
import { Spinner } from './Spinner';
import { Text } from './Text';
/** Contenido visual del botón, independiente de Pressable y de su política de interacción.
 * @param props Texto, color resuelto, ícono y carga que reemplaza el contenido.
 * @returns Ícono/texto o spinner; la accesibilidad pertenece al botón contenedor.
 */
export function ButtonContent({
  label,
  color,
  icon,
  loading,
}: {
  label: string;
  color: string;
  icon?: IconName | undefined;
  loading: boolean;
}) {
  if (loading) return <Spinner color={color} />;
  return (
    <>
      {icon && <AppIcon name={icon} color={color} size={18} />}
      <Text
        style={{ color, fontSize: 14, fontWeight: '700', textAlign: 'center', flexShrink: 1 }}
      >
        {label}
      </Text>
    </>
  );
}
