import { View } from 'react-native';
import { useSocialLogin } from '../../hooks/useSocialLogin';
import { Button } from '../atoms/Button';
import { Notice } from '../molecules/Notice';
import { ModalPanel } from './ModalPanel';
import { OAuthLinkForm } from './OAuthLinkForm';
const labels = { google: 'Google', discord: 'Discord', github: 'GitHub' };
/** Botón OAuth de un proveedor configurado, con su propia solicitud PKCE.
 * @param props - Propiedades tipadas: provider. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
        onPress={() => {
          void login.start();
        }}
      />
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
