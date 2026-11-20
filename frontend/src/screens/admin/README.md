# src/screens/admin

<!-- Generado por npm run docs. -->

Tablero, usuarios, reportes y configuración. Solo se montan dentro del grupo administrativo protegido.

## Archivos y responsabilidades

| Archivo                                      | Responsabilidad                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------------------- |
| [AttendanceScreen.tsx](AttendanceScreen.tsx) | Ficha la llegada observada hoy y consulta el registro de días anteriores.          |
| [DashboardScreen.tsx](DashboardScreen.tsx)   | Compone el tablero sin consultas, navegación ni cálculos contables dentro del JSX. |
| [ReportsScreen.tsx](ReportsScreen.tsx)       | Reportes administrativos por día, semana o mes.                                    |
| [SettingsScreen.tsx](SettingsScreen.tsx)     | Horarios, capacidad, ventana de cancelación y categorías del negocio.              |
| [UsersScreen.tsx](UsersScreen.tsx)           | ABML de clientes y empleados; los roles se eligen únicamente al crear.             |
| [WalkInScreen.tsx](WalkInScreen.tsx)         | Registro rápido para autos presentes, sin alta previa en cuentas ni garaje.        |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
