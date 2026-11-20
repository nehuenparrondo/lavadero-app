# modules/services

Descripción/duración de servicios y precios por categoría. Los contratos ya reservados no se recalculan al editar catálogo.

## Archivos y responsabilidades

| Archivo                                          | Responsabilidad                                                       |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| [catalogRules.ts](catalogRules.ts)               | El lavado de moto y el catálogo de los demás vehículos no se mezclan. |
| [services.controller.ts](services.controller.ts) | Catálogo según rol.                                                   |
| [services.repository.ts](services.repository.ts) | Servicio de catálogo.                                                 |
| [services.routes.ts](services.routes.ts)         | Catálogo autenticado y escritura administrativa.                      |
| [services.schema.ts](services.schema.ts)         | Servicio administrable con duración explícita en minutos.             |
| [services.service.ts](services.service.ts)       | Retorna catálogo con tarifas por tipo y duración estimada.            |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
