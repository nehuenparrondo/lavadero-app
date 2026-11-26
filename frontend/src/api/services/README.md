# src/api/services

<!-- Generado por npm run docs. -->

Frontera HTTP: serialización de entradas y extracción del contrato REST. No contiene componentes ni decide permisos por su cuenta.

## Archivos y responsabilidades

| Archivo                                              | Responsabilidad                                                                                 |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [authService.ts](authService.ts)                     | Registro siempre Cliente; rol no forma parte de este contrato.                                  |
| [healthService.ts](healthService.ts)                 | Comprueba conectividad. @throws Error ante configuración ausente, red o respuesta inválida.     |
| [oauthStartService.ts](oauthStartService.ts)         | Prepara una autorización PKCE por JSON y verifica el destino antes de salir de la app.          |
| [recoveryService.ts](recoveryService.ts)             | Estado público del canal, sin credenciales ni identidad de destinatarios.                       |
| [resourceService.ts](resourceService.ts)             | Parámetros de filtros de listas, nunca URLs arbitrarias de terceros.                            |
| [restoreSession.ts](restoreSession.ts)               | Restaura la sesión segura sin publicar resultados de un proveedor desmontado.                   |
| [sessionActions.ts](sessionActions.ts)               | Persiste el refresh antes de publicar la sesión para sus consumidores.                          |
| [sessionRenewalService.ts](sessionRenewalService.ts) | Única vía de rotación usada por restauración e interceptor; evita reuso accidental del refresh. |
| [userService.ts](userService.ts)                     | Alta de cliente/empleado o edición administrativa que conserva el rol actual.                   |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
