import { useRouter } from 'expo-router';
import { login, register } from '../api/services/authService';
import { useAction } from './useAction';
import { useAuth } from './useAuth';
/** Conecta formulario con registro/login y guarda refresh de forma segura.
 * @param signUp - Distingue el contrato de registro del de acceso.
 * @returns Estado ocupado/error y envío de acceso o registro que guarda la sesión y abre la portada del rol.
 */
export function useSignIn(signUp = false) {
  const auth = useAuth();
  const action = useAction();
  const router = useRouter();
  const submit = async (values: Record<string, string>) => {
    await action.run(async () => {
      const session = signUp
        ? await register(values)
        : await login({ email: values.email ?? '', password: values.password ?? '' });
      await auth.accept(session);
      router.replace('/');
    }, '');
  };
  return { ...action, submit };
}
