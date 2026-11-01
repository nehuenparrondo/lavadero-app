/** Agrega/quita una selección; la representación CSV coincide con filtros del contrato REST.
 * @param value - Valor tipado de value utilizado por esta operación.
 * @param next - Valor tipado de next utilizado por esta operación.
 * @param multiple - Valor tipado de multiple utilizado por esta operación.
 * @returns `string`, según el contrato de la operación.
 */
export function toggleChoice(value: string, next: string, multiple: boolean) {
  if (!multiple) return next;
  const selected = new Set(value.split(',').filter(Boolean));
  if (selected.has(next)) selected.delete(next);
  else selected.add(next);
  return [...selected].join(',');
}
