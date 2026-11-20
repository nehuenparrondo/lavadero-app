# src/api

<!-- Generado por npm run docs. -->

Transporte, memoria de sesión e interceptores. Solo los servicios conocen cómo enviar solicitudes; la UI consume hooks.

## Archivos y responsabilidades

| Archivo                                      | Responsabilidad                                                                         |
| -------------------------------------------- | --------------------------------------------------------------------------------------- |
| [backendConnection.ts](backendConnection.ts) | Espera al servidor antes de enviar credenciales o una operación de escritura.           |
| [client.ts](client.ts)                       | Transporte autenticado; espera disponibilidad antes de enviar una escritura.            |
| [config.ts](config.ts)                       | Origen público validado; no contiene credenciales.                                      |
| [connectionState.ts](connectionState.ts)     | Estado externo de la conexión inicial compartida.                                       |
| [readinessGate.ts](readinessGate.ts)         | Agrupa el despertar del servidor para evitar una solicitud por cada selector.           |
| [renewRequest.ts](renewRequest.ts)           | Marca la identidad de origen para no repetir peticiones de otra cuenta.                 |
| [sessionStorage.ts](sessionStorage.ts)       | Lee refresh del dispositivo. Web de demostración usa solo sessionStorage de la pestaña. |
| [sessionStore.ts](sessionStore.ts)           | Lee sesión solo en memoria; componentes consumen AuthContext.                           |
| [transport.ts](transport.ts)                 | Transporte público; la preparación de conexión nunca reenvía una mutación.              |
| [validateResponse.ts](validateResponse.ts)   | Impide interpretar HTML de arranque o proxy como datos de negocio.                      |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
