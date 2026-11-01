# api

Transporte, memoria de sesión e interceptores. Solo los servicios conocen cómo enviar solicitudes; la UI consume hooks.

## Archivos y responsabilidades

| Archivo | Responsabilidad |
| --- | --- |
| [client.ts](client.ts) | Cliente autenticado; solo api/services envía solicitudes. |
| [sessionStorage.ts](sessionStorage.ts) | Lee refresh del dispositivo. Web de demostración usa solo sessionStorage de la pestaña. |
| [sessionStore.ts](sessionStore.ts) | Lee sesión solo en memoria; componentes consumen AuthContext. |
| [transport.ts](transport.ts) | El origen siempre viene de entorno y exige HTTPS público. |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
