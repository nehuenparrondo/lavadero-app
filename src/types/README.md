# types

DTOs del contrato y vocabulario visual. Son propios del frontend y no importan código backend.

## Archivos y responsabilidades

| Archivo                        | Responsabilidad                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| [entities.ts](entities.ts)     | Roles enviados y verificados por la API, sin código importado desde el backend.    |
| [form.ts](form.ts)             | Opción de catálogo o filtro sin dependencia del sistema visual.                    |
| [health.ts](health.ts)         | Contrato propio del frontend, documentado en OpenAPI v0.1.0 del backend.           |
| [icon.ts](icon.ts)             | Vocabulario visual local. No depende de fuentes, red ni glifos del sistema.        |
| [navigation.ts](navigation.ts) | Destino visible de un rol; las guardas raíz y la API siguen controlando el acceso. |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
