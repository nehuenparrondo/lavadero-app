# app/(employee)

Composición de rutas de Expo Router. Cada archivo delega su contenido y el layout raíz aplica guardas; no guardar aquí lógica de negocio.

## Archivos y responsabilidades

| Archivo | Responsabilidad |
| --- | --- |
| [_layout.tsx](_layout.tsx) | Agenda, historial y perfil del empleado. |
| [agenda.tsx](agenda.tsx) | Ruta del equipo, restringida por la guarda de grupo y el servidor. |
| [history.tsx](history.tsx) | Ruta del equipo, restringida por la guarda de grupo y el servidor. |
| [profile.tsx](profile.tsx) | Composición interna del módulo; consultar sus contratos de tipos. |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
