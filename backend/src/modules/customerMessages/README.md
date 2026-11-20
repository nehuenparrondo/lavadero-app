# modules/customerMessages

Casos de uso separados por dominio; routes → controller → service → repository.

## Archivos y responsabilidades

| Archivo                                          | Responsabilidad                                                                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------- |
| [messages.repository.ts](messages.repository.ts) | Bandeja paginada. clientId nulo corresponde únicamente a Administración.        |
| [messages.routes.ts](messages.routes.ts)         | La bandeja está disponible únicamente para clientes y Administración.           |
| [messages.schema.ts](messages.schema.ts)         | Reclamo general o devolución del titular sobre un lavado finalizado.            |
| [messages.service.ts](messages.service.ts)       | Administración ve la bandeja completa; el cliente solo ve sus propios mensajes. |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
