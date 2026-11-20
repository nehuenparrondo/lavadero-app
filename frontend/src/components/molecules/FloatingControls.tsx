import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { FloatingAction } from '../atoms/FloatingAction';
/** Controles persistentes abajo a la derecha; volver arriba aparece solo cuando es útil.
 * @param props Estado del scroll propio y espacio inferior adicional para diálogos.
 * @returns Tema siempre visible y acción de volver arriba condicionada por las medidas.
 */
export function FloatingControls({
  showTop,
  toTop,
  bottom = 16,
}: {
  showTop: boolean;
  toTop: () => void;
  bottom?: number;
}) {
  const { dark, setMode } = useTheme();
  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        right: 16,
        bottom,
        flexDirection: 'row',
        gap: 10,
        zIndex: 10,
      }}
    >
      {showTop && <FloatingAction icon="arrowUp" label="Volver arriba" onPress={toTop} />}
      <FloatingAction
        icon={dark ? 'sun' : 'moon'}
        label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}
        onPress={() => setMode(dark ? 'light' : 'dark')}
      />
    </View>
  );
}
