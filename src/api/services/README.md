# api/services

Frontera HTTP: serialización de entradas y extracción del contrato REST. No contiene componentes ni decide permisos por su cuenta.

## Archivos y responsabilidades

| Archivo | Responsabilidad |
| --- | --- |
| [authService.ts](authService.ts) | Registro siempre Cliente; rol no forma parte de este contrato. |
| [healthService.ts](healthService.ts) | Comprueba conectividad. |
| [oauthStartService.ts](oauthStartService.ts) | Prepara una autorización PKCE por JSON y verifica el destino antes de salir de la app. |
| [resourceService.ts](resourceService.ts) | Parámetros de filtros de listas, nunca URLs arbitrarias de terceros. |
| [restoreSession.ts](restoreSession.ts) | Restaura la sesión segura sin publicar resultados de un proveedor desmontado. |
| [sessionActions.ts](sessionActions.ts) | Persiste el refresh antes de publicar la sesión para sus consumidores. |
| [userService.ts](userService.ts) | Alta o edición administrativa; los cambios de rol tienen endpoint independiente. |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
