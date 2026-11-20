# src/modules/attendance

<!-- Generado por npm run docs. -->

Asistencia con el reloj y horario del negocio. El administrador registra la llegada observada; no se permite fichar otra fecha ni duplicar el primer fichaje.

## Archivos y responsabilidades

| Archivo                                              | Responsabilidad                                                                                      |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [attendance.repository.ts](attendance.repository.ts) | Muestra el plantel activo para el día actual e incluye fichajes históricos aunque cambie el plantel. |
| [attendance.routes.ts](attendance.routes.ts)         | Solamente Administración puede leer y registrar la asistencia del equipo.                            |
| [attendance.service.ts](attendance.service.ts)       | Consulta fichajes por fecha argentina, con un registro como máximo por persona y día.                |
| [attendance.window.ts](attendance.window.ts)         | Determina si el reloj oficial permite fichar hoy, sin aceptar horas del navegador.                   |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
