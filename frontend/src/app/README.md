# src/app

<!-- Generado por npm run docs. -->

Composición de rutas de Expo Router. Cada archivo delega su contenido y el layout raíz aplica guardas; no guardar aquí lógica de negocio.

## Archivos y responsabilidades

| Archivo                                    | Responsabilidad                                                               |
| ------------------------------------------ | ----------------------------------------------------------------------------- |
| [_layout.tsx](_layout.tsx)                 | Raíz Expo Router: proveedores separados de rutas y pantallas.                 |
| [booking.tsx](booking.tsx)                 | Composición interna; los tipos y el flujo se consultan en la fuente.          |
| [forgot-password.tsx](forgot-password.tsx) | Composición interna; los tipos y el flujo se consultan en la fuente.          |
| [index.tsx](index.tsx)                     | Entrada dirige al árbol del rol autorizado.                                   |
| [loading.tsx](loading.tsx)                 | Mantiene el navegador montado mientras se restaura y verifica la sesión.      |
| [oauth.tsx](oauth.tsx)                     | Destino nativo de AuthSession; el popup devuelve el código al hook iniciador. |
| [oauth.web.tsx](oauth.web.tsx)             | Retorno web en la misma pestaña; el APK usa oauth.tsx y AuthSession nativo.   |
| [reset-password.tsx](reset-password.tsx)   | Composición interna; los tipos y el flujo se consultan en la fuente.          |
| [sign-in.tsx](sign-in.tsx)                 | Composición interna; los tipos y el flujo se consultan en la fuente.          |
| [sign-up.tsx](sign-up.tsx)                 | Composición interna; los tipos y el flujo se consultan en la fuente.          |
| [support.tsx](support.tsx)                 | Composición interna; los tipos y el flujo se consultan en la fuente.          |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
