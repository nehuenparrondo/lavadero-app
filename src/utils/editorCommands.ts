import { writeResource } from '../api/services/resourceService';
import type { useAction } from '../hooks/useAction';
import type { useEditorState } from '../hooks/useEditorState';
interface EditorOptions<T extends { id: string }> {
  path: string;
  transform: (v: Record<string, string>) => unknown;
  refresh: () => Promise<void>;
  saveOperation?: ((current: T | null, body: unknown) => Promise<unknown>) | undefined;
  editor: ReturnType<typeof useEditorState<T>>;
  action: ReturnType<typeof useAction>;
}
/** Construye el guardado; solo cierra el formulario cuando el servidor lo confirma.
 * @param o - Opciones de composición del recurso.
 * @returns `(values: Record<string, string>) => Promise<void>`.
 */
export function createSaveCommand<T extends { id: string }>(o: EditorOptions<T>) {
  return async (values: Record<string, string>) => {
    const current = o.editor.editing;
    const result = await o.action.run(() =>
      o.saveOperation
        ? o.saveOperation(current, o.transform(values))
        : writeResource(
            current ? 'patch' : 'post',
            current ? `${o.path}/${current.id}` : o.path,
            o.transform(values),
          ),
    );
    if (result !== undefined) {
      o.editor.close();
      await o.refresh();
    }
  };
}
/** Construye la baja confirmada y refresca la colección sin ocultar errores del servidor.
 * @param o - Opciones de composición del recurso.
 * @returns `() => Promise<void>`.
 */
export function createDeleteCommand<T extends { id: string }>(o: EditorOptions<T>) {
  return async () => {
    if (!o.editor.deleting) return;
    const result = await o.action.run(
      () => writeResource('delete', `${o.path}/${o.editor.deleting!.id}`),
      'Registro eliminado.',
    );
    if (result !== undefined) {
      o.editor.cancelDelete();
      await o.refresh();
    }
  };
}
