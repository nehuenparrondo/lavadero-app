import { View } from 'react-native';
import { useSocialLogin } from '../../hooks/useSocialLogin';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';
import { ModalPanel } from './ModalPanel';
import { OAuthLinkForm } from './OAuthLinkForm';
import { socialProviderLabels as labels } from '../../constants/socialProviders';
/** Botón OAuth de un proveedor configurado, con su propia solicitud PKCE.
 * @param props - Propiedades tipadas: provider.
 * @returns Vista de SocialLoginButton con el contrato de propiedades declarado.
 */
export function SocialLoginButton({ provider }: { provider: keyof typeof labels }) {
  const login = useSocialLogin(provider);
  return (
    <View style={{ gap: 8 }}>
      <Button
        label={`Continuar con ${labels[provider]}`}
        variant="secondary"
        disabled={!login.ready}
        loading={login.busy}
        onPress={login.start}
      />
      {provider === 'discord' && (
        <Text style={{ fontSize: 12 }}>
          Para cambiar de cuenta, tocá «¿No eres tú?» en Discord antes de autorizar.
        </Text>
      )}
      <Notice error={login.error} />
      <ModalPanel
        visible={login.linkRequired}
        title="Vincular tu cuenta"
        onClose={login.cancelLink}
      >
        <OAuthLinkForm onSubmit={login.confirm} busy={login.busy} error={login.error} />
      </ModalPanel>
    </View>
  );
}
