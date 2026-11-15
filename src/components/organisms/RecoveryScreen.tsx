import { View } from 'react-native';
import type { PropsWithChildren } from 'react';
import { Screen } from './Screen';
/** Mantiene legibles los formularios de acceso en teléfono y escritorio.
 * @param props - Contenido de recuperación o restablecimiento.
 * @returns Pantalla con controles flotantes y columna centrada.
 */
export function RecoveryScreen({ children }: PropsWithChildren) {
  return (
    <Screen>
      <View style={{ width: '100%', maxWidth: 560, alignSelf: 'center', paddingTop: 16 }}>
        {children}
      </View>
    </Screen>
  );
}
