# src/modules/reports

<!-- Generado por npm run docs. -->

Períodos de calendario del negocio y agregación de lavados/cobros. No mezclar fecha del lavado con fecha del cobro.

## Archivos y responsabilidades

| Archivo                                        | Responsabilidad                                                                  |
| ---------------------------------------------- | -------------------------------------------------------------------------------- |
| [reportAggregation.ts](reportAggregation.ts)   | Completa días vacíos y acumula trabajo e ingresos según sus fechas respectivas.  |
| [reportWeeks.ts](reportWeeks.ts)               | Agrupa los días locales en semanas ISO, incluyendo ceros y semanas parciales.    |
| [reports.controller.ts](reports.controller.ts) | Reporte administrativo.                                                          |
| [reports.repository.ts](reports.repository.ts) | Trabajos finalizados según fin agendado, no según la hora real del cierre.       |
| [reports.routes.ts](reports.routes.ts)         | Reportes de ingresos solo admin; resumen de jornada solo empleado.               |
| [reports.schema.ts](reports.schema.ts)         | Período calendario local del negocio.                                            |
| [reports.service.ts](reports.service.ts)       | Reporte administrativo: lavados, ingresos, populares y rendimiento por empleado. |
| [reports.window.ts](reports.window.ts)         | Resuelve límites de un día/semana/mes con calendario y zona IANA del negocio.    |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
