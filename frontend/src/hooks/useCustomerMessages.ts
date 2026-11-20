import { useState } from 'react';
import { writeResource } from '../api/services/resourceService';
import type { CustomerMessage } from '../types/operations';
import { useAction } from './useAction';
import { usePagedList } from './usePagedList';

/** Lista y mutaciones de atención; la API decide la bandeja permitida por rol.
 * @param admin - Selecciona el filtro administrativo de la bandeja.
 * @returns Lista paginada, filtros y acciones de atención.
 */
export function useCustomerMessages(admin: boolean) {
  const [state, setState] = useState(admin ? 'open' : '');
  const [created, setCreated] = useState(0);
  const list = usePagedList<CustomerMessage>('/customer-messages', {
    state: state || undefined,
  });
  const action = useAction();
  const createComplaint = async (body: string) => {
    const result = await action.run(
      () => writeResource('post', '/customer-messages', { kind: 'complaint', body }),
      'Reclamo enviado a Administración.',
    );
    if (!result) return;
    setCreated((current) => current + 1);
    list.setPage(1);
    await list.refresh();
  };
  const reply = async (id: string, text: string) => {
    const result = await action.run(
      () => writeResource('patch', `/customer-messages/${id}/reply`, { reply: text }),
      'Respuesta enviada al cliente.',
    );
    if (result) {
      list.setPage(1);
      await list.refresh();
    }
  };
  return { ...list, action, state, setState, created, createComplaint, reply };
}
