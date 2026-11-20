# modules/users

Perfiles, roles y administración de cuentas. Conservar al último admin y revocar sesiones al cambiar permisos.

## Archivos y responsabilidades

| Archivo                                    | Responsabilidad                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------- |
| [admin.repository.ts](admin.repository.ts) | Serializa todos los cambios que podrían eliminar el último administrador. |
| [admin.service.ts](admin.service.ts)       | Impide autoexclusión y pérdida del último admin bajo lock común.          |
| [users.controller.ts](users.controller.ts) | Devuelve perfil de sesión.                                                |
| [users.repository.ts](users.repository.ts) | Obtiene identidad interna por ID, incluyendo estado lógico.               |
| [users.routes.ts](users.routes.ts)         | Perfil para todos; gestión de cuentas exclusivamente administrativa.      |
| [users.schema.ts](users.schema.ts)         | Perfil propio sin campos de privilegios.                                  |
| [users.service.ts](users.service.ts)       | Lee perfil por ID y exige que la cuenta exista.                           |
| [users.types.ts](users.types.ts)           | Registro interno de identidad. passwordHash nunca se serializa.           |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
