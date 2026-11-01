import { View } from 'react-native';
import { useSocialProviders } from '../../hooks/useSocialProviders';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';
import { SocialLoginButton } from './SocialLoginButton';
/** Muestra proveedores y deshabilita los que el negocio todavía no configuró.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function SocialLogins() {
  const p = useSocialProviders();
  const providers = p.providers;
  return (
    <View style={{ gap: 10 }}>
      <Text style={{ textAlign: 'center', fontSize: 13 }}>O continuá con tu cuenta</Text>
      <Notice error={p.error} onRetry={p.refresh} />
      {(['google', 'discord', 'github'] as const).map((provider) =>
        providers.find((p) => p.provider === provider)?.enabled ? (
          <SocialLoginButton key={provider} provider={provider} />
        ) : (
          <Button
            key={provider}
            label={`${provider === 'google' ? 'Google' : provider === 'discord' ? 'Discord' : 'GitHub'} · no disponible`}
            onPress={() => {}}
            disabled
            variant="secondary"
          />
        ),
      )}
    </View>
  );
}
