# src/modules/customerMessages

<!-- Generado por npm run docs. -->

Reclamos y devoluciones persistentes. El cliente ve los propios; Administración responde una vez. La devolución queda vinculada al parte y su autor.

## Archivos y responsabilidades

| Archivo                                          | Responsabilidad                                                                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------- |
| [messages.repository.ts](messages.repository.ts) | Bandeja paginada. clientId nulo corresponde únicamente a Administración.        |
| [messages.routes.ts](messages.routes.ts)         | La bandeja está disponible únicamente para clientes y Administración.           |
| [messages.schema.ts](messages.schema.ts)         | Reclamo general o devolución del titular sobre un lavado finalizado.            |
| [messages.service.ts](messages.service.ts)       | Administración ve la bandeja completa; el cliente solo ve sus propios mensajes. |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
