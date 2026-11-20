# modules/health

Liveness, readiness e información pública del sistema; no mostrar credenciales ni mensajes del driver.

## Archivos y responsabilidades

| Archivo                                        | Responsabilidad                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------------------ |
| [health.controller.ts](health.controller.ts)   | Devuelve salud del proceso sin depender de MySQL.                              |
| [health.repository.ts](health.repository.ts)   | Verifica MySQL sin escribir.                                                   |
| [health.routes.ts](health.routes.ts)           | Expone sondas públicas sin incluir datos sensibles.                            |
| [information.routes.ts](information.routes.ts) | Publica el aviso de uso de datos necesario para la configuración de identidad. |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
