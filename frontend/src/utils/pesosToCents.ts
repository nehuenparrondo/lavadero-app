/** Convierte un importe validado en pesos a centavos, sin multiplicación decimal inexacta.
 * @param value - Importe decimal en pesos, validado antes de invocar esta conversión.
 * @returns Centavos enteros ARS; conserva dos decimales sin usar multiplicación monetaria de punto flotante.
 */
export function pesosToCents(value: string) {
  const [whole, decimal = ''] = value.replace(',', '.').split('.');
  return Number(whole) * 100 + Number(decimal.padEnd(2, '0'));
}
