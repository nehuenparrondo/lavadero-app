# database

Migraciones SQL inmutables, semillas idempotentes y esquema agregado de referencia. Los comandos se ejecutan con el directorio actual en `backend`; leen la conexión privada del entorno, nunca una contraseña incluida en el código.

| Pieza                                      | Responsabilidad                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `migrate.ts`, `migration.repository.ts`    | Orden, verificación y aplicación de archivos, con registro en `migraciones_esquema`.              |
| `migrationChecksum.ts`                     | Hash normalizado de saltos de línea y compatibilidad de checksums históricos.                     |
| `splitSqlStatements.ts`, `sqlDialect.ts`   | Separación explícita de sentencias y adaptación de sintaxis histórica a MariaDB.                  |
| `withMigrationLock.ts`                     | Lock de sesión por base; se libera incluso ante fallos.                                           |
| `requireDatabase.ts`, `runWithDatabase.ts` | Conexión validada y liberación/cierre del pool del comando.                                       |
| `seed.ts`, `seeds`                         | Catálogos/configuración ausentes y administrador inicial, sin sobrescribir ediciones existentes.  |
| `inTransaction.ts`                         | Commit/rollback para DML; no promete rollback general de DDL.                                     |
| `retireLegacyViews.ts`                     | Retira únicamente alias de compatibilidad después de completar el cambio de nombres.              |
| `schema.sql`                               | Referencia agregada hasta la migración 018; alternativa de instalación sin registro de versiones. |

Consultar [parámetros y firmas](../docs/source-map.md), [modelo](../docs/database.md) y [configuración](../../docs/configuration.md). No mezclar la ejecución de `schema.sql` con el migrador sobre una misma instalación. Una migración aplicada es inmutable: para cambiar el esquema crear otra y probarla en QA, nunca reemplazar su checksum para ocultar diferencias.
