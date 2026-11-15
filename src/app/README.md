# app

Composición de rutas de Expo Router. Cada archivo delega su contenido y el layout raíz aplica guardas; no guardar aquí lógica de negocio.

## Archivos y responsabilidades

| Archivo                        | Responsabilidad                                                               |
| ------------------------------ | ----------------------------------------------------------------------------- |
| [_layout.tsx](_layout.tsx)     | Raíz Expo Router: proveedores separados de rutas y pantallas.                 |
| [booking.tsx](booking.tsx)     | Composición interna del módulo; consultar sus contratos de tipos.             |
| [index.tsx](index.tsx)         | Entrada dirige al árbol del rol autorizado.                                   |
| [loading.tsx](loading.tsx)     | Mantiene el navegador montado mientras se restaura y verifica la sesión.      |
| [oauth.tsx](oauth.tsx)         | Destino nativo de AuthSession; el popup devuelve el código al hook iniciador. |
| [oauth.web.tsx](oauth.web.tsx) | Retorno web en la misma pestaña; el APK usa oauth.tsx y AuthSession nativo.   |
| [sign-in.tsx](sign-in.tsx)     | Composición interna del módulo; consultar sus contratos de tipos.             |
| [sign-up.tsx](sign-up.tsx)     | Composición interna del módulo; consultar sus contratos de tipos.             |
| [support.tsx](support.tsx)     | Composición interna del módulo; consultar sus contratos de tipos.             |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
