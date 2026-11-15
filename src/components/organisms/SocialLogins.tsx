import { View } from 'react-native';
import { useSocialProviders } from '../../hooks/useSocialProviders';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';
import { LoadingState } from '../molecules/LoadingState';
import { SocialLoginButton } from './SocialLoginButton';
/** Muestra proveedores y deshabilita los que el negocio todavía no configuró.
 * @returns Vista de SocialLogins con el contrato de propiedades declarado.
 */
export function SocialLogins() {
  const p = useSocialProviders();
  const providers = p.providers;
  if (p.busy && !providers.length) return <LoadingState />;
  return (
    <View style={{ gap: 10 }}>
      <Text style={{ textAlign: 'center', fontSize: 13 }}>O continuá con tu cuenta</Text>
      <Notice error={p.error} onRetry={p.refresh} />
      {(['google'] as const).map((provider) =>
        providers.find((p) => p.provider === provider)?.enabled ? (
          <SocialLoginButton key={provider} provider={provider} />
        ) : (
          <Button
            key={provider}
            label={'Google · no disponible'}
            onPress={() => {}}
            disabled
            variant="secondary"
          />
        ),
      )}
    </View>
  );
}
