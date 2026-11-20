# modules/attendance

Casos de uso separados por dominio; routes → controller → service → repository.

## Archivos y responsabilidades

| Archivo                                              | Responsabilidad                                                                                      |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [attendance.repository.ts](attendance.repository.ts) | Muestra el plantel activo para el día actual e incluye fichajes históricos aunque cambie el plantel. |
| [attendance.routes.ts](attendance.routes.ts)         | Solamente Administración puede leer y registrar la asistencia del equipo.                            |
| [attendance.service.ts](attendance.service.ts)       | Consulta fichajes por fecha argentina, con un registro como máximo por persona y día.                |
| [attendance.window.ts](attendance.window.ts)         | Determina si el reloj oficial permite fichar hoy, sin aceptar horas del navegador.                   |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
