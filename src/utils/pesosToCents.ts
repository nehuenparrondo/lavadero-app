/** Convierte un importe validado en pesos a centavos, sin multiplicación decimal inexacta.
 * @param value - Valor tipado de value utilizado por esta operación.
 * @returns `number`, según el contrato de la operación.
 */
export function pesosToCents(value: string) {
  const [whole, decimal = ''] = value.replace(',', '.').split('.');
  return Number(whole) * 100 + Number(decimal.padEnd(2, '0'));
}
