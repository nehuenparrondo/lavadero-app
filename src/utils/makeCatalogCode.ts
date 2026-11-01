/** Código técnico estable para el catálogo; solo se genera durante el alta.
 * @param name - Valor tipado de name utilizado por esta operación.
 * @param maxLength - Valor tipado de maxLength utilizado por esta operación.
 * @returns `string`, según el contrato de la operación.
 */
export function makeCatalogCode(name: string, maxLength = 24) {
  const slug = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, '-')
    .slice(0, maxLength);
  return `${slug}-${Date.now().toString(36)}`;
}
