# src/middlewares

<!-- Generado por npm run docs. -->

Frontera HTTP: autenticación, autorización, validación, CORS y manejo central de errores.

## Archivos y responsabilidades

| Archivo                                    | Responsabilidad                                                                               |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| [authenticate.ts](authenticate.ts)         | Verifica JWT y permisos actuales; desactivar o cambiar rol invalida inmediatamente el access. |
| [createCors.ts](createCors.ts)             | Permite orígenes web exactos y apps nativas, que no envían cabecera Origin.                   |
| [errorHandler.ts](errorHandler.ts)         | Único punto de respuesta de errores; conserva el contrato uniforme de la API.                 |
| [maintenanceGuard.ts](maintenanceGuard.ts) | Pausa la API durante la copia final; las sondas de salud quedan disponibles.                  |
| [requireOwnership.ts](requireOwnership.ts) | Restringe acceso por propietario y oculta existencia de recursos ajenos.                      |
| [requireRole.ts](requireRole.ts)           | Restringe una ruta a roles vigentes, después de authenticate.                                 |
| [validate.ts](validate.ts)                 | Valida y elimina campos no admitidos antes de llegar al controller.                           |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
