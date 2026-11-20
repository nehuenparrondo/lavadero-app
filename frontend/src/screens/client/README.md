# src/screens/client

<!-- Generado por npm run docs. -->

Experiencia del cliente y pantallas de recursos compartidos con administración. Cada componente sigue el alcance del hook recibido.

## Archivos y responsabilidades

| Archivo                                                    | Responsabilidad                                                                   |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [AppointmentDetailScreen.tsx](AppointmentDetailScreen.tsx) | Detalle de reserva con controles del rol, notas y comprobante histórico.          |
| [AppointmentsScreen.tsx](AppointmentsScreen.tsx)           | Lista de turnos con filtros, estados y navegación a detalles.                     |
| [BookingScreen.tsx](BookingScreen.tsx)                     | Reserva por pasos, con servicios separados y total siempre verificable.           |
| [HomeScreen.tsx](HomeScreen.tsx)                           | Composición del cliente. useHome conserva la obtención y selección de visitas.    |
| [ProfileScreen.tsx](ProfileScreen.tsx)                     | Perfil, preferencia de tema persistente, contraseña local y cierre de sesión.     |
| [ServicesScreen.tsx](ServicesScreen.tsx)                   | Catálogo del cliente y ABML administrativo reutilizando componentes.              |
| [SupportScreen.tsx](SupportScreen.tsx)                     | Los clientes envían reclamos y Administración revisa y responde desde su bandeja. |
| [VehiclesScreen.tsx](VehiclesScreen.tsx)                   | Vehículos propios o administración de titulares, con ABML y búsqueda.             |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
