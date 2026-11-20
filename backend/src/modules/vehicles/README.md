# modules/vehicles

Vehículos y ownership. La baja es lógica y no se permite transferir el titular de un registro histórico.

## Archivos y responsabilidades

| Archivo                                          | Responsabilidad                                                          |
| ------------------------------------------------ | ------------------------------------------------------------------------ |
| [vehicles.controller.ts](vehicles.controller.ts) | Lista visibles para el actor, con búsqueda/paginación.                   |
| [vehicles.repository.ts](vehicles.repository.ts) | Vehículo con IDs serializables y campos propios.                         |
| [vehicles.routes.ts](vehicles.routes.ts)         | Vehículos: clientes propietarios y administración; empleados excluidos.  |
| [vehicles.schema.ts](vehicles.schema.ts)         | Formulario de vehículo: el cliente no puede seleccionar un dueño ajeno.  |
| [vehicles.service.ts](vehicles.service.ts)       | Accede solo a un vehículo propio o administrado; oculta recursos ajenos. |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
