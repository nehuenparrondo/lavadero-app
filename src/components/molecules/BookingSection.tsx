import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../atoms/Text';
import { Card } from './Card';

/** Agrupa un paso de la reserva con una jerarquía visual consistente.
 * @param props Número, título y controles del paso.
 * @returns Panel numerado que conserva su orden de lectura en móvil.
 */
export function BookingSection({
  number,
  title,
  children,
}: PropsWithChildren<{ number: string; title: string }>) {
  const { colors } = useTheme();
  return (
    <Card>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 4 }}>
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            backgroundColor: colors.soft,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: '800', color: colors.primary }}>{number}</Text>
        </View>
        <Text accessibilityRole="header" style={{ fontSize: 19, fontWeight: '700' }}>
          {title}
        </Text>
      </View>
      {children}
    </Card>
  );
}
