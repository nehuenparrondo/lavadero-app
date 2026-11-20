# constants

Catálogos de solo lectura y definiciones declarativas. No contienen secretos ni estado mutable de sesión.

## Archivos y responsabilidades

| Archivo                    | Responsabilidad                                           |
| -------------------------- | --------------------------------------------------------- |
| [business.ts](business.ts) | Roles que puede emitir y validar el contrato del sistema. |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
