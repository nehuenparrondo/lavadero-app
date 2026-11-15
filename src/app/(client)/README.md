# app/(client)

Composición de rutas de Expo Router. Cada archivo delega su contenido y el layout raíz aplica guardas; no guardar aquí lógica de negocio.

## Archivos y responsabilidades

| Archivo                              | Responsabilidad                                                   |
| ------------------------------------ | ----------------------------------------------------------------- |
| [_layout.tsx](_layout.tsx)           | Cinco destinos del cliente, protegidos por el layout raíz.        |
| [appointments.tsx](appointments.tsx) | Composición interna del módulo; consultar sus contratos de tipos. |
| [home.tsx](home.tsx)                 | Composición interna del módulo; consultar sus contratos de tipos. |
| [profile.tsx](profile.tsx)           | Composición interna del módulo; consultar sus contratos de tipos. |
| [services.tsx](services.tsx)         | Composición interna del módulo; consultar sus contratos de tipos. |
| [vehicles.tsx](vehicles.tsx)         | Composición interna del módulo; consultar sus contratos de tipos. |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
