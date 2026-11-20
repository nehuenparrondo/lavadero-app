# src/modules/vehicles

<!-- Generado por npm run docs. -->

Vehículos y ownership. La baja es lógica y no se permite transferir el titular de un registro histórico.

## Archivos y responsabilidades

| Archivo                                          | Responsabilidad                                                                        |
| ------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [vehicles.controller.ts](vehicles.controller.ts) | Lista visibles para el actor, con búsqueda/paginación.                                 |
| [vehicles.repository.ts](vehicles.repository.ts) | Vehículo con IDs serializables y campos propios.                                       |
| [vehicles.routes.ts](vehicles.routes.ts)         | Vehículos: clientes propietarios y administración; empleados excluidos.                |
| [vehicles.schema.ts](vehicles.schema.ts)         | Filtros validados; el servicio ignora ownerId para actores que no son administradores. |
| [vehicles.service.ts](vehicles.service.ts)       | Delimita el listado por identidad antes de consultar SQL.                              |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
