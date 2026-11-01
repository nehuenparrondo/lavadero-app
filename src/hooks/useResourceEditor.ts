import { createDeleteCommand, createSaveCommand } from '../utils/editorCommands';
import { useAction } from './useAction';
import { useEditorState } from './useEditorState';
/** Compone selección, confirmaciones y persistencia para editores sin duplicar el ABML.
 * @param path - Ruta relativa del recurso dentro de la API versionada.
 * @param transform - Convierte valores del formulario al body de la API.
 * @param refresh - Vuelve a consultar recursos después de una operación confirmada.
 * @param saveOperation - Guardado especializado que sustituye al estándar cuando el contrato lo requiere.
 * @returns Selección del editor, diálogos y comandos de guardado/baja.
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
