# errors

Errores de dominio y su proyección pública. Nunca serializar SQL, stack traces, contraseñas o tokens.

## Archivos y responsabilidades

| Archivo                                | Responsabilidad                                                           |
| -------------------------------------- | ------------------------------------------------------------------------- |
| [AppError.ts](AppError.ts)             | Error controlado con estado HTTP y código estable para la app.            |
| [ConflictError.ts](ConflictError.ts)   | Representa un error 409 controlado por el dominio.                        |
| [ForbiddenError.ts](ForbiddenError.ts) | Representa un error 403 controlado por el dominio.                        |
| [NotFoundError.ts](NotFoundError.ts)   | Representa un error 404 controlado por el dominio.                        |
| [publicError.ts](publicError.ts)       | Proyección pública de errores; nunca incluye SQL, tokens ni stack traces. |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
