/** Convierte un importe validado en pesos a centavos, sin multiplicación decimal inexacta. */
export function pesosToCents(value: string) {
  const [whole, decimal = ''] = value.replace(',', '.').split('.');
  return Number(whole) * 100 + Number(decimal.padEnd(2, '0'));
}
