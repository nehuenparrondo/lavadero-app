# src/theme

<!-- Generado por npm run docs. -->

Tokens, paletas semánticas y estilos compartidos. Mantener contraste en ambos temas; no copiar colores de marca en cada pantalla.

## Archivos y responsabilidades

| Archivo                                        | Responsabilidad                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| [overview.styles.ts](overview.styles.ts)       | Geometría de portadas, métricas y accesos; los colores se resuelven en el tema.      |
| [pageHeading.styles.ts](pageHeading.styles.ts) | Jerarquía tipográfica del encabezado principal, sin acoplarlo a colores o rutas.     |
| [palettes.ts](palettes.ts)                     | Colores semánticos: ninguna pantalla necesita conocer los valores de marca.          |
| [signIn.styles.ts](signIn.styles.ts)           | Composición de la presentación de acceso; su contraste se resuelve con la paleta.    |
| [timeWheel.styles.ts](timeWheel.styles.ts)     | El navegador usa snap CSS; iOS/Android usan snapToInterval en el mismo control.      |
| [tokens.ts](tokens.ts)                         | Escala visual compartida. El contenido se adapta al viewport y a la escala de texto. |
| [workspace.styles.ts](workspace.styles.ts)     | Distribución de la aplicación: navegación persistente y una sola región desplazable. |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
