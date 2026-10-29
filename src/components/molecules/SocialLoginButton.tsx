import { View } from 'react-native';
import { Button } from '../atoms/Button';
import { Notice } from './Notice';
import { useSocialLogin } from '../../hooks/useSocialLogin';
const labels = { google: 'Google', discord: 'Discord', github: 'GitHub' };
/** Botón OAuth de un proveedor configurado, con su propia solicitud PKCE. */
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
    </View>
  );
}
