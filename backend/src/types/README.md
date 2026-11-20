# types

DTOs del contrato y vocabulario visual. Son propios del frontend y no importan código backend.

## Archivos y responsabilidades

| Archivo                      | Responsabilidad                                                               |
| ---------------------------- | ----------------------------------------------------------------------------- |
| [domain.ts](domain.ts)       | Roles persistidos y emitidos en JWT; el backend verifica siempre su vigencia. |
| [express.d.ts](express.d.ts) | Composición interna del módulo; consultar sus contratos de tipos.             |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
