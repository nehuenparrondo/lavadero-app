import { useAuth } from './useAuth';
import { useAction } from './useAction';
import { writeResource } from '../api/services/resourceService';
import type { FormFieldDefinition } from '../types/form';
/** Edición de perfil propio y cambio de contraseña con revocación posterior. */
export function useProfile() {
  const auth = useAuth();
  const action = useAction();
  const user = auth.user;
  const fields: FormFieldDefinition[] = [
    { name: 'firstName', label: 'Nombre', maxLength: 80 },
    { name: 'lastName', label: 'Apellido', maxLength: 80 },
    { name: 'phone', label: 'Teléfono', required: false, maxLength: 30 },
    {
      name: 'avatarUrl',
      label: 'Foto (enlace HTTPS, opcional)',
      required: false,
      maxLength: 2048,
    },
  ];
  const initialValues = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    phone: user?.phone ?? '',
    avatarUrl: user?.avatarUrl ?? '',
  };
  const save = async (v: Record<string, string>) => {
    await action.run(async () => {
      await writeResource('patch', '/users/me', {
        firstName: v.firstName,
        lastName: v.lastName,
        phone: v.phone || null,
        avatarUrl: v.avatarUrl || null,
      });
      await auth.reloadUser();
    });
  };
  const changePassword = async (v: Record<string, string>) => {
    await action.run(async () => {
      await writeResource('put', '/users/me/password', {
        currentPassword: v.currentPassword,
        newPassword: v.newPassword,
      });
      await auth.signOut();
    }, 'Volvé a ingresar con tu nueva contraseña.');
  };
  return {
    ...action,
    user,
    fields,
    initialValues,
    save,
    changePassword,
    signOut: auth.signOut,
  };
}
