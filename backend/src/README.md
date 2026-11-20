# src

<!-- Generado por npm run docs. -->

Composición del punto de entrada y montaje de sus capas.

## Archivos y responsabilidades

| Archivo                | Responsabilidad                                                   |
| ---------------------- | ----------------------------------------------------------------- |
| [app.ts](app.ts)       | Compone Express. No abre puertos ni conecta MySQL al importarse.  |
| [routes.ts](routes.ts) | Compone módulos autónomos bajo /api/v1 sin lógica de negocio.     |
| [server.ts](server.ts) | Cierra conexiones para permitir un despliegue o apagado ordenado. |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
