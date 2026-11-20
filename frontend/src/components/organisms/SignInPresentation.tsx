import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { signInStyles as s } from '../../theme/signIn.styles';
import { BrandLockup } from '../molecules/BrandLockup';
import { WashIllustration } from '../molecules/WashIllustration';
import { Text } from '../atoms/Text';
/** Presentación de acceso que comparte la identidad del resto de la aplicación.
 * @returns Marca, promesa concreta y una ilustración vectorial sin recursos de terceros.
 */
export function SignInPresentation() {
  const { colors } = useTheme();
  return (
    <View style={[s.presentation, { backgroundColor: colors.navy }]}>
      <BrandLockup inverse />
      <Text accessibilityRole="header" style={[s.title, { color: colors.onNavy }]}>
        Tu auto, en buenas manos.
      </Text>
      <Text style={[s.detail, { color: colors.navMuted }]}>
        Reservá tu próximo lavado. Organizá tu tiempo. Seguí cada detalle, estés donde estés.
      </Text>
      <View style={s.illustration}>
        <WashIllustration />
      </View>
      <Text style={{ fontSize: 12, color: colors.accent }}>UN CUIDADO QUE SE NOTA.</Text>
    </View>
  );
}
