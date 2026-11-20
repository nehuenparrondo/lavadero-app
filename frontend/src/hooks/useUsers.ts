import { useState } from 'react';
import { saveUser } from '../api/services/userService';
import type { User } from '../types/entities';
import { userFields, userInitialValues } from '../utils/userForm';
import { useDebouncedValue } from './useDebouncedValue';
import { useEntityManager } from './useEntityManager';
/** Gestión de usuarios; delega selección, persistencia y definición de formularios.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useUsers() {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const query = useDebouncedValue(search);
  const manager = useEntityManager<User>(
    '/users',
    (v) => v,
    { search: query, role: role || undefined },
    (current, body) => saveUser(current, body as Record<string, string>),
  );
  return {
    ...manager,
    search,
    setSearch,
    role,
    setRole,
    fields: userFields(manager.editing),
    initialValues: userInitialValues(manager.editing),
  };
}
