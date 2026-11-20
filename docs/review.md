# Revisión de documentación y modularidad — 20/11/2026

## Alcance y resultado

Se completaron contratos de reservas, asistencia, mensajes, sesiones, filtros y migraciones. Se corrigieron comentarios genéricos/incorrectos y guías que describían la base anterior, el vehículo obligatorio antes de reservar o la revisión obligatoria del cierre. La referencia agregada SQL incorpora las dos tablas de recuperación de la migración 018; los archivos de migración históricos permanecen intactos.

Las auditorías revisan **545 archivos** de aplicación/soporte SQL, **1.345 funciones/callbacks** y **674 contratos de funciones públicas**, incluidos exports de funciones arrow. Cada parámetro público y su resultado tienen documentación. No se detectaron ciclos ni cruces de capa prohibidos. Los mapas abarcan además scripts, pruebas y puntos de entrada/configuración de ambas aplicaciones: 202 archivos backend y 387 frontend. El catálogo describe 163 componentes con props y ejemplos.

Los README de producción, mapas y catálogo se regeneran desde AST y se comparan en CI. Las reglas del negocio y las decisiones se explican en las guías manuales, enlazadas desde [la entrada principal](README.md). No se copian secretos ni dependencias de terceros a los documentos.

## Separaciones realizadas

- La consulta de vehículos pasa por servicio antes del repositorio. Solo Administración puede ampliar el filtro de titular; el cliente sigue viendo únicamente los propios.
- La vinculación/descripción del vehículo, limpieza visual del Inicio y marca de cierre del empleado delegan SQL en repositorios. Se conservaron sentencias, parámetros, conexión y orden de bloqueos.
- Auditoría y generador de mapas comparten módulos entre backend y frontend; se retiraron sus copias duplicadas. Las herramientas comunes tienen lint, formato y pruebas propios.

## Verificación de esta revisión

| Comprobación                                 | Resultado                                                                      |
| -------------------------------------------- | ------------------------------------------------------------------------------ |
| Tipos, lint, compilación backend y auditoría | Aprobados.                                                                     |
| Tipos, lint y auditoría frontend             | Aprobados.                                                                     |
| Unitarias backend/frontend                   | 23 + 25 aprobadas.                                                             |
| Herramientas comunes                         | 9 pruebas aprobadas, lint y formato correctos.                                 |
| Aceptación MariaDB QA                        | 13 pruebas aprobadas: management, client-employee, vehicle-later y operations. |
| Documentación generada                       | Mapas/README y catálogo coinciden con la fuente.                               |
| Formato y enlaces principales                | Aprobados en raíz y aplicaciones.                                              |
| Migraciones históricas                       | Sin cambios.                                                                   |

Total: **70 pruebas aprobadas, cero fallos**. La aceptación utilizó una base QA separada; no ejecutó escenarios destructivos en producción. No se repitió la aceptación de todas las suites ni se instaló un APK/iPhone en esta revisión. Los cambios del frontend son documentación y herramientas; la compilación web/Android se comprueba también en el flujo de CI.

Los conteos son una instantánea de esta revisión. La documentación de parámetros y los límites de tamaño ayudan a mantener el código, pero no sustituyen las pruebas de permisos, concurrencia y recorrido cuando cambien reglas del negocio.
