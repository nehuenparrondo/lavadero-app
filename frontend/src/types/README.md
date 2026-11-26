# src/types

<!-- Generado por npm run docs. -->

DTOs del contrato y vocabulario visual. Son propios del frontend y no importan código backend.

## Archivos y responsabilidades

| Archivo                                    | Responsabilidad                                                                    |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| [cancellation.ts](cancellation.ts)         | Aviso de cancelación del equipo, pendiente de lectura por el titular.              |
| [entities.ts](entities.ts)                 | Roles enviados y verificados por la API, sin código importado desde el backend.    |
| [form.ts](form.ts)                         | Opción de catálogo o filtro sin dependencia del sistema visual.                    |
| [health.ts](health.ts)                     | Contrato propio del frontend, documentado en OpenAPI v0.1.0 del backend.           |
| [icon.ts](icon.ts)                         | Vocabulario visual local. No depende de fuentes, red ni glifos del sistema.        |
| [navigation.ts](navigation.ts)             | Destino visible de un rol; las guardas raíz y la API siguen controlando el acceso. |
| [operations.ts](operations.ts)             | Parte del responsable; los datos de revisión interna solo llegan al equipo.        |
| [storedCredential.ts](storedCredential.ts) | Persistencia sin perfil ni permisos: el backend valida identidad y rol al reabrir. |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
