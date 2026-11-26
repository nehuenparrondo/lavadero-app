/** Serializa acciones sin dejar bloqueada la cola cuando falla una operación.
 * @returns Ejecutor que conserva el resultado/error de cada acción y continúa con la siguiente.
 */
export function createSerialQueue() {
  let tail: Promise<unknown> = Promise.resolve();
  return <T>(operation: () => Promise<T>): Promise<T> => {
    const work = tail.then(operation, operation);
    tail = work.catch(() => undefined);
    return work;
  };
}
