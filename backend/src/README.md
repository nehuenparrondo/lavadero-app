# src

Composición y contratos del módulo.

## Archivos y responsabilidades

| Archivo                | Responsabilidad                                                   |
| ---------------------- | ----------------------------------------------------------------- |
| [app.ts](app.ts)       | Compone Express. No abre puertos ni conecta MySQL al importarse.  |
| [routes.ts](routes.ts) | Compone módulos autónomos bajo /api/v1 sin lógica de negocio.     |
| [server.ts](server.ts) | Cierra conexiones para permitir un despliegue o apagado ordenado. |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
