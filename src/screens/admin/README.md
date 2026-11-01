# screens/admin

Tablero, usuarios, reportes y configuración. Solo se montan dentro del grupo administrativo protegido.

## Archivos y responsabilidades

| Archivo                                    | Responsabilidad                                                                    |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| [DashboardScreen.tsx](DashboardScreen.tsx) | Compone el tablero sin consultas, navegación ni cálculos contables dentro del JSX. |
| [ReportsScreen.tsx](ReportsScreen.tsx)     | Reportes administrativos por día, semana o mes.                                    |
| [SettingsScreen.tsx](SettingsScreen.tsx)   | Horarios, capacidad, ventana de cancelación y categorías del negocio.              |
| [UsersScreen.tsx](UsersScreen.tsx)         | ABML de usuarios con filtros y cambios de rol reservados al administrador.         |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
