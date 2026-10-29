import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getProviders } from '../../api/services/authService';
import { SocialLoginButton } from '../molecules/SocialLoginButton';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
/** Muestra proveedores y deshabilita los que el negocio todavía no configuró. */
export function SocialLogins() {
  const [providers, setProviders] = useState<{ provider: string; enabled: boolean }[]>([]);
  useEffect(() => {
    void getProviders()
      .then(setProviders)
      .catch(() => {});
  }, []);
  return (
    <View style={{ gap: 10 }}>
      <Text style={{ textAlign: 'center', fontSize: 13 }}>O continuá con tu cuenta</Text>
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
