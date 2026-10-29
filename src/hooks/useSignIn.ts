import { useRouter } from 'expo-router';
import { login, register } from '../api/services/authService';
import { useAuth } from './useAuth';
import { useAction } from './useAction';
/** Conecta formulario con registro/login y guarda refresh de forma segura. */
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
