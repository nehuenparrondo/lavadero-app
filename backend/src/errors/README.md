# src/errors

<!-- Generado por npm run docs. -->

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

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
