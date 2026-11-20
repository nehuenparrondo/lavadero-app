/** Agrega/quita una selección; la representación CSV coincide con filtros del contrato REST.
 * @param value - Entrada del formato declarado que se valida o transforma.
 * @param next - Continúa la cadena de Express después de superar las comprobaciones.
 * @param multiple - Permite seleccionar varias opciones en lugar de una.
 * @returns `string`.
 */
export function toggleChoice(value: string, next: string, multiple: boolean) {
  if (!multiple) return next;
  const selected = new Set(value.split(',').filter(Boolean));
  if (selected.has(next)) selected.delete(next);
  else selected.add(next);
  return [...selected].join(',');
}
