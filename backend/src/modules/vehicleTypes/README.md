# src/modules/vehicleTypes

<!-- Generado por npm run docs. -->

Categorías activas de vehículo que determinan las tarifas; conservar referencias históricas al desactivar.

## Archivos y responsabilidades

| Archivo                                                  | Responsabilidad                                           |
| -------------------------------------------------------- | --------------------------------------------------------- |
| [vehicleTypes.controller.ts](vehicleTypes.controller.ts) | Catálogo de tipos.                                        |
| [vehicleTypes.repository.ts](vehicleTypes.repository.ts) | Consulta la categoría de una cotización o una tarifa.     |
| [vehicleTypes.routes.ts](vehicleTypes.routes.ts)         | Tipos visibles para todos, administrables solo por admin. |
| [vehicleTypes.schema.ts](vehicleTypes.schema.ts)         | Tipo de vehículo administrable con código estable.        |
| [vehicleTypes.service.ts](vehicleTypes.service.ts)       | Catálogo con booleanos serializables.                     |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
