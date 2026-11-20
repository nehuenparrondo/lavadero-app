# src/types

<!-- Generado por npm run docs. -->

DTOs del contrato y vocabulario visual. Son propios del frontend y no importan código backend.

## Archivos y responsabilidades

| Archivo                      | Responsabilidad                                                               |
| ---------------------------- | ----------------------------------------------------------------------------- |
| [domain.ts](domain.ts)       | Roles persistidos y emitidos en JWT; el backend verifica siempre su vigencia. |
| [express.d.ts](express.d.ts) | Composición interna; los tipos y el flujo se consultan en la fuente.          |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
