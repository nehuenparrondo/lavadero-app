# src/app/(employee)

<!-- Generado por npm run docs. -->

Composición de rutas de Expo Router. Cada archivo delega su contenido y el layout raíz aplica guardas; no guardar aquí lógica de negocio.

## Archivos y responsabilidades

| Archivo                    | Responsabilidad                                                      |
| -------------------------- | -------------------------------------------------------------------- |
| [_layout.tsx](_layout.tsx) | Agenda, historial y perfil del empleado.                             |
| [agenda.tsx](agenda.tsx)   | Ruta del equipo, restringida por la guarda de grupo y el servidor.   |
| [history.tsx](history.tsx) | Ruta del equipo, restringida por la guarda de grupo y el servidor.   |
| [profile.tsx](profile.tsx) | Composición interna; los tipos y el flujo se consultan en la fuente. |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
