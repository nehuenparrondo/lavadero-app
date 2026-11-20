# config

Lectura y validación de entorno, pool TLS y configuración OAuth. No imprimir ni versionar valores secretos.

## Archivos y responsabilidades

| Archivo                        | Responsabilidad                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------- |
| [authEnv.ts](authEnv.ts)       | Configuración privada de autenticación, validada sin imprimir valores sensibles. |
| [database.ts](database.ts)     | Pool privado de infraestructura; los módulos acceden mediante repositories.      |
| [env.ts](env.ts)               | Configuración de proceso validada una sola vez al iniciar.                       |
| [envSchema.ts](envSchema.ts)   | Valida configuración antes de aceptar solicitudes; los secretos no se imprimen.  |
| [oauth.ts](oauth.ts)           | Indica qué botones pueden iniciar OAuth sin revelar secretos.                    |
| [readEnv.ts](readEnv.ts)       | Lee variables sin efectos secundarios.                                           |
| [recovery.ts](recovery.ts)     | Sandbox únicamente: las credenciales nunca se exponen al cliente.                |
| [validation.ts](validation.ts) | Composición interna del módulo; consultar sus contratos de tipos.                |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
