import { View } from 'react-native';
import type { useTimeWheel } from '../../hooks/useTimeWheel';
import { Button } from '../atoms/Button';

/** Alternativa al gesto para lectores de pantalla y navegación con teclado.
 * @param props Control de la rueda y límites vigentes.
 * @returns Dos acciones sin horas manuales ni saltos fuera de la lista.
 */
export function TimeWheelActions({ w }: { w: ReturnType<typeof useTimeWheel> }) {
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <View style={{ flex: 1 }}>
        <Button
          label="Anterior"
          variant="quiet"
          disabled={w.index === 0}
          onPress={() => w.choose(w.index - 1)}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          label="Siguiente"
          variant="quiet"
          disabled={w.index === w.rows.length - 1}
          onPress={() => w.choose(w.index + 1)}
        />
      </View>
    </View>
  );
}
