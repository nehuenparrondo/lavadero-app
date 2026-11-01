# app/(admin)

Composición de rutas de Expo Router. Cada archivo delega su contenido y el layout raíz aplica guardas; no guardar aquí lógica de negocio.

## Archivos y responsabilidades

| Archivo                              | Responsabilidad                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------------- |
| [_layout.tsx](_layout.tsx)           | Mantiene rutas administrativas separadas; Screen aporta el marco visual adaptable. |
| [appointments.tsx](appointments.tsx) | Vista administrativa de todos los turnos.                                          |
| [dashboard.tsx](dashboard.tsx)       | Composición interna del módulo; consultar sus contratos de tipos.                  |
| [profile.tsx](profile.tsx)           | Composición interna del módulo; consultar sus contratos de tipos.                  |
| [reports.tsx](reports.tsx)           | Composición interna del módulo; consultar sus contratos de tipos.                  |
| [services.tsx](services.tsx)         | Administración del catálogo y precios.                                             |
| [settings.tsx](settings.tsx)         | Composición interna del módulo; consultar sus contratos de tipos.                  |
| [users.tsx](users.tsx)               | Composición interna del módulo; consultar sus contratos de tipos.                  |
| [vehicles.tsx](vehicles.tsx)         | Composición interna del módulo; consultar sus contratos de tipos.                  |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
