/** Convierte un importe validado en pesos a centavos, sin multiplicación decimal inexacta.
 * @param value - Entrada del formato declarado que se valida o transforma.
 * @returns `number`.
 */
export function pesosToCents(value: string) {
  const [whole, decimal = ''] = value.replace(',', '.').split('.');
  return Number(whole) * 100 + Number(decimal.padEnd(2, '0'));
}
