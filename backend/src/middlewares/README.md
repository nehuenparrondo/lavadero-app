# middlewares

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

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
