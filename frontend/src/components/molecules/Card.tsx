import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
/** Superficie neutra para agrupar información; el estilo permite componer grids sin duplicarla.
 * @param props Contenido y ajuste opcional de distribución, nunca lógica de negocio.
 * @returns Panel con borde y espaciado uniformes en los temas claro y oscuro.
 */
export function Card({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
        style,
      ]}
    >
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 22,
    borderRadius: 20,
    borderWidth: 1,
    gap: 18,
    boxShadow: '0 4px 20px rgba(12, 30, 53, 0.045)',
  },
});
