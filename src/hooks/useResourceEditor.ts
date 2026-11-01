import { createDeleteCommand, createSaveCommand } from '../utils/editorCommands';
import { useAction } from './useAction';
import { useEditorState } from './useEditorState';
/** Compone selección, confirmaciones y persistencia para editores sin duplicar el ABML.
 * @param path - Ruta relativa del recurso dentro de la API versionada.
 * @param transform - Valor tipado de transform utilizado por esta operación.
 * @param refresh - Vuelve a consultar recursos después de una operación confirmada.
 * @param saveOperation - Valor tipado de saveOperation utilizado por esta operación.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useResourceEditor<T extends { id: string }>(
  path: string,
  transform: (v: Record<string, string>) => unknown,
  refresh: () => Promise<void>,
  saveOperation?: (current: T | null, body: unknown) => Promise<unknown>,
) {
  const editor = useEditorState<T>();
  const action = useAction();
  const options = { path, transform, refresh, saveOperation, editor, action };
  const create = () => {
    action.clear();
    editor.create();
  };
  const edit = (value: T) => {
    action.clear();
    editor.edit(value);
  };
  return {
    ...editor,
    ...action,
    action,
    create,
    edit,
    save: createSaveCommand(options),
    remove: createDeleteCommand(options),
  };
}
