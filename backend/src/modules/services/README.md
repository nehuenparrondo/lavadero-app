# src/modules/services

<!-- Generado por npm run docs. -->

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

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
