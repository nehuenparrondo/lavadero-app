import { View } from 'react-native';
import { BrandLockup } from '../../components/molecules/BrandLockup';
import { Screen } from '../../components/organisms/Screen';
import { SignInForm } from '../../components/organisms/SignInForm';
import { SignInPresentation } from '../../components/organisms/SignInPresentation';
import { SocialLogins } from '../../components/organisms/SocialLogins';
import { useSignIn } from '../../hooks/useSignIn';
import { useWorkspaceLayout } from '../../hooks/useWorkspaceLayout';
/** Acceso común a los tres roles; el servidor determina la experiencia después de autenticar.
 * @returns Presentación y formularios adaptados a móvil/escritorio, con errores visibles.
 */
export function SignInScreen() {
  const login = useSignIn();
  const { columns } = useWorkspaceLayout();
  return (
    <Screen>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          gap: 32,
          flexDirection: columns ? 'row' : 'column',
          paddingVertical: columns ? 36 : 8,
        }}
      >
        {columns ? <SignInPresentation /> : <BrandLockup />}
        <View
          style={{
            flex: 1,
            maxWidth: columns ? 420 : undefined,
            gap: 22,
            justifyContent: 'center',
          }}
        >
          <SignInForm login={login} />
          <SocialLogins />
        </View>
      </View>
    </Screen>
  );
}
