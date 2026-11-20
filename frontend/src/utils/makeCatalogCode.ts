/** Código técnico estable para el catálogo; solo se genera durante el alta.
 * @param name - Nombre del campo o etiqueta según el contrato declarado.
 * @param maxLength - Longitud máxima permitida para el texto del campo.
 * @returns `string`.
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
