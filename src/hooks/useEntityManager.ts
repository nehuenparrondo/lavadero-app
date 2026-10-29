import { useState } from 'react';
import { usePagedList } from './usePagedList';
import { useAction } from './useAction';
import { writeResource } from '../api/services/resourceService';
import type { Query } from '../api/services/resourceService';
/** Estado de un editor ABML; HTTP y reglas de serialización quedan fuera de pantallas. */
export function useEntityManager<T extends { id: string }>(
  path: string,
  transform: (v: Record<string, string>) => unknown,
  query: Query = {},
  saveOperation?: (current: T | null, body: unknown) => Promise<unknown>,
) {
  const list = usePagedList<T>(path, query);
  const action = useAction();
  const [editing, setEditing] = useState<T | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<T | null>(null);
  const create = () => {
    action.clear();
    setEditing(null);
    setOpen(true);
  };
  const edit = (item: T) => {
    action.clear();
    setEditing(item);
    setOpen(true);
  };
  const save = async (values: Record<string, string>) => {
    const result = await action.run(() =>
      saveOperation
        ? saveOperation(editing, transform(values))
        : writeResource(
            editing ? 'patch' : 'post',
            editing ? `${path}/${editing.id}` : path,
            transform(values),
          ),
    );
    if (result !== undefined) {
      setOpen(false);
      await list.refresh();
    }
  };
  const remove = async () => {
    if (!deleting) return;
    const result = await action.run(
      () => writeResource('delete', `${path}/${deleting.id}`),
      'Registro eliminado.',
    );
    if (result !== undefined) {
      setDeleting(null);
      await list.refresh();
    }
  };
  return {
    ...list,
    ...action,
    fetchError: list.error,
    editing,
    open,
    deleting,
    create,
    edit,
    save,
    requestDelete: setDeleting,
    remove,
    close: () => setOpen(false),
    cancelDelete: () => setDeleting(null),
  };
}
