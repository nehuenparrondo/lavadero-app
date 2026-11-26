# src/api

<!-- Generado por npm run docs. -->

Transporte, memoria de sesión e interceptores. Solo los servicios conocen cómo enviar solicitudes; la UI consume hooks.

## Archivos y responsabilidades

| Archivo                                        | Responsabilidad                                                                         |
| ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| [backendConnection.ts](backendConnection.ts)   | Espera al servidor antes de enviar credenciales o una operación de escritura.           |
| [client.ts](client.ts)                         | Transporte autenticado; espera disponibilidad antes de enviar una escritura.            |
| [config.ts](config.ts)                         | Origen público validado; no contiene credenciales.                                      |
| [connectionState.ts](connectionState.ts)       | Estado externo de la conexión inicial compartida.                                       |
| [readinessGate.ts](readinessGate.ts)           | Agrupa el despertar del servidor para evitar una solicitud por cada selector.           |
| [renewRequest.ts](renewRequest.ts)             | Marca la identidad de origen para no repetir peticiones de otra cuenta.                 |
| [sessionLock.ts](sessionLock.ts)               | Serializa aceptación, cierre y rotación dentro de la instancia nativa.                  |
| [sessionLock.web.ts](sessionLock.web.ts)       | Serializa rotaciones entre pestañas mediante Web Locks, liberados también ante fallos.  |
| [sessionRevision.ts](sessionRevision.ts)       | Lee la generación de identidad, distinta de la rotación del token de la misma cuenta.   |
| [sessionStorage.ts](sessionStorage.ts)         | Lee la credencial cifrada nativa; reconoce tokens legados hasta su primera renovación.  |
| [sessionStorage.web.ts](sessionStorage.web.ts) | Lee la credencial local; la API valida cuenta, sesión y permisos al reabrir.            |
| [sessionStore.ts](sessionStore.ts)             | Lee sesión solo en memoria; componentes consumen AuthContext.                           |
| [transport.ts](transport.ts)                   | Transporte público; la preparación de conexión nunca reenvía una mutación.              |
| [validateResponse.ts](validateResponse.ts)     | Impide interpretar HTML de arranque o proxy como datos de negocio.                      |
| [webCredentialStore.ts](webCredentialStore.ts) | Almacenamiento del origen, separado de la clave de pestaña de las versiones anteriores. |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
