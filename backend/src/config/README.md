# src/config

<!-- Generado por npm run docs. -->

Lectura y validación de entorno, pool TLS y configuración OAuth. No imprimir ni versionar valores secretos.

## Archivos y responsabilidades

| Archivo                        | Responsabilidad                                                                     |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| [authEnv.ts](authEnv.ts)       | Configuración privada de autenticación, validada sin imprimir valores sensibles.    |
| [database.ts](database.ts)     | Pool privado de infraestructura; los módulos acceden mediante repositories.         |
| [env.ts](env.ts)               | Configuración de proceso validada una sola vez al iniciar.                          |
| [envSchema.ts](envSchema.ts)   | Valida configuración antes de aceptar solicitudes; los secretos no se imprimen.     |
| [oauth.ts](oauth.ts)           | Indica qué botones pueden iniciar OAuth sin revelar secretos.                       |
| [readEnv.ts](readEnv.ts)       | Lee variables sin efectos secundarios. @throws Error si falta configuración válida. |
| [recovery.ts](recovery.ts)     | Sandbox únicamente: las credenciales nunca se exponen al cliente.                   |
| [validation.ts](validation.ts) | Composición interna; los tipos y el flujo se consultan en la fuente.                |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
