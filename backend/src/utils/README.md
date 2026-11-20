# utils

Transformaciones puras o infraestructura puntual. Mantener unidades explícitas: centavos, minutos y UTC.

## Archivos y responsabilidades

| Archivo                          | Responsabilidad                                                           |
| -------------------------------- | ------------------------------------------------------------------------- |
| [db.ts](db.ts)                   | Ejecutor SQL utilizado exclusivamente por repositories e infraestructura. |
| [http.ts](http.ts)               | Adapta un controller async al sobre REST estándar.                        |
| [pagination.ts](pagination.ts)   | Paginación limitada y búsqueda opcional para listas administrativas.      |
| [password.ts](password.ts)       | Límite por bytes: bcrypt admite como máximo 72 bytes sin truncar.         |
| [transaction.ts](transaction.ts) | Ejecuta el caso de uso en una conexión y siempre libera el recurso.       |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
