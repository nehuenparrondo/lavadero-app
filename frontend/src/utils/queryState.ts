/** Una respuesta siempre conserva la identidad de los filtros que la produjeron. */
export interface QueryState<T> {
  key: string;
  data: T | null;
  loading: boolean;
  error: string;
}
/** Oculta datos obsoletos inmediatamente, incluso antes de ejecutarse el efecto de React.
 * @param state Último resultado publicado por la consulta.
 * @param key Identidad del recurso y sus filtros actuales.
 * @param enabled false invalida datos y errores previos.
 * @returns Solo el resultado que corresponde a la selección vigente.
 */
export function currentQuery<T>(state: QueryState<T>, key: string, enabled: boolean) {
  if (!enabled) return { data: null, loading: false, error: '' };
  if (state.key !== key) return { data: null, loading: true, error: '' };
  return { data: state.data, loading: state.loading, error: state.error };
}
/** Publica únicamente la última petición de un consumidor todavía activo.
 * @param load Consulta remota que no muta estado local.
 * @param active Comprueba la generación actual, también después de errores.
 * @param publish Receptor del resultado tipado.
 * @returns Promesa que rechaza solo hacia el coordinador de carga.
 */
export async function readLatest<T>(
  load: () => Promise<T>,
  active: () => boolean,
  publish: (data: T) => void,
) {
  const result = await load();
  if (active()) publish(result);
}
