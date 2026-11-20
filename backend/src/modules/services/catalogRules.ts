import { AppError } from '../../errors/AppError.js';

const extras = new Set(['wax', 'upholstery']);

/** El lavado de moto y el catálogo de los demás vehículos no se mezclan.
 * @param typeCode Código de la categoría que se quiere cotizar.
 * @param serviceCode Código estable del servicio.
 * @returns Si el servicio pertenece al catálogo de esa categoría.
 */
export function supportsService(typeCode: string, serviceCode: string) {
  return (typeCode === 'motorcycle') === (serviceCode === 'motorcycle_wash');
}

/** Protege la cotización y la reserva de combinaciones que no ofrece el catálogo.
 * @param codes Códigos de los renglones que seleccionó el cliente.
 * @returns Cuando hay como máximo un lavado base y los extras son compatibles.
 * @throws AppError Si se combinan dos bases o se pide cera sin exterior.
 */
export function assertWashSelection(codes: string[]) {
  if (codes.filter((code) => !extras.has(code)).length > 1)
    throw new AppError(400, 'MULTIPLE_WASHES', 'Elegí un solo tipo de lavado.');
  if (
    codes.includes('wax') &&
    !codes.some((code) => code === 'exterior' || code === 'complete')
  )
    throw new AppError(
      400,
      'WAX_REQUIRES_WASH',
      'Para agregar encerado, elegí lavado exterior o completo.',
    );
}
