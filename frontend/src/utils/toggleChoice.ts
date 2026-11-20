/** Agrega/quita una selección; la representación CSV coincide con filtros del contrato REST.
 * @param value - Selección actual serializada como valores separados por coma.
 * @param next - Valor de la opción que se acaba de tocar; no es un callback.
 * @param multiple - Permite alternar varias opciones; false reemplaza toda la selección.
 * @returns Nueva selección CSV, sin opciones duplicadas; puede quedar vacía al desmarcar.
 */
export function toggleChoice(value: string, next: string, multiple: boolean) {
  if (!multiple) return next;
  const selected = new Set(value.split(',').filter(Boolean));
  if (selected.has(next)) selected.delete(next);
  else selected.add(next);
  return [...selected].join(',');
}
