# src/modules/health

<!-- Generado por npm run docs. -->

Liveness, readiness e información pública del sistema; no mostrar credenciales ni mensajes del driver.

## Archivos y responsabilidades

| Archivo                                        | Responsabilidad                                                                        |
| ---------------------------------------------- | -------------------------------------------------------------------------------------- |
| [health.controller.ts](health.controller.ts)   | Devuelve salud del proceso sin depender de MySQL.                                      |
| [health.repository.ts](health.repository.ts)   | Verifica MySQL sin escribir. @throws Error si MySQL no responde o no está configurado. |
| [health.routes.ts](health.routes.ts)           | Expone sondas públicas sin incluir datos sensibles.                                    |
| [information.routes.ts](information.routes.ts) | Publica el aviso de uso de datos necesario para la configuración de identidad.         |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
