# src/app/(admin)

<!-- Generado por npm run docs. -->

Composición de rutas de Expo Router. Cada archivo delega su contenido y el layout raíz aplica guardas; no guardar aquí lógica de negocio.

## Archivos y responsabilidades

| Archivo                                        | Responsabilidad                                                                    |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| [_layout.tsx](_layout.tsx)                     | Mantiene rutas administrativas separadas; Screen aporta el marco visual adaptable. |
| [appointments.tsx](appointments.tsx)           | Vista administrativa de todos los turnos.                                          |
| [attendance.tsx](attendance.tsx)               | Composición interna; los tipos y el flujo se consultan en la fuente.               |
| [customer-messages.tsx](customer-messages.tsx) | Bandeja de atención dentro del stack protegido de Administración.                  |
| [dashboard.tsx](dashboard.tsx)                 | Composición interna; los tipos y el flujo se consultan en la fuente.               |
| [profile.tsx](profile.tsx)                     | Composición interna; los tipos y el flujo se consultan en la fuente.               |
| [reports.tsx](reports.tsx)                     | Composición interna; los tipos y el flujo se consultan en la fuente.               |
| [services.tsx](services.tsx)                   | Administración del catálogo y precios.                                             |
| [settings.tsx](settings.tsx)                   | Composición interna; los tipos y el flujo se consultan en la fuente.               |
| [users.tsx](users.tsx)                         | Composición interna; los tipos y el flujo se consultan en la fuente.               |
| [vehicles.tsx](vehicles.tsx)                   | Composición interna; los tipos y el flujo se consultan en la fuente.               |
| [walk-in.tsx](walk-in.tsx)                     | Ingreso presencial reservado a Administración por la navegación y la API.          |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
