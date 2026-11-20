# modules/vehicleTypes

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

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
