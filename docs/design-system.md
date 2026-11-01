# Sistema visual de Lavadero

El objetivo es dar prioridad a la tarea de cada rol: reservar y consultar para el
cliente, atender asignaciones para el equipo y organizar el negocio para administración.
La identidad usa azul de acción, navegación azul oscuro, acento oliva claro y
superficies neutras. El tema oscuro conserva las mismas relaciones semánticas.

| Pieza       | Fuente de verdad            | Uso                                                    |
| ----------- | --------------------------- | ------------------------------------------------------ |
| Colores     | src/theme/palettes.ts       | Contraste, superficies y estados                       |
| Escala      | src/theme/tokens.ts         | Espaciado, radios, texto y breakpoints                 |
| Marco       | WorkspaceFrame + Screen     | Áreas seguras, barra lateral y contenido               |
| Destinos    | constants/roleNavigation.ts | Menú administrativo y navegación lateral               |
| Portada     | PageHeading                 | Contexto, título y acción principal                    |
| Métricas    | MetricTile                  | Valor del servidor y descripción de su alcance         |
| Accesos     | QuickAction                 | Una tarjeta, un destino real                           |
| Turnos      | AppointmentCard             | Estado/fecha, vehículo y pie condicionado por permisos |
| Series      | RevenueBar                  | Magnitud visual y monto textual siempre juntos         |
| Iconografía | AppIcon + iconPaths         | Vectores locales, decorativos                          |

Dos columnas desde 720 puntos efectivos; barra lateral desde 1100. El ancho se
ajusta por escala de fuente, por lo que texto grande recupera una sola columna.
Mantener 48 puntos en acciones principales, nombres accesibles y etiquetas junto
a los íconos. Los colores de estado no sustituyen el texto.

No usar tasas de crecimiento, capacidad libre o promesas de horarios que no entregue
el backend. Carga y error son estados distintos de cero. Las cifras del empleado
corresponden a la fecha elegida y a sus asignaciones, no a todo el lavadero.

Fuentes técnicas: [React Native Style](https://reactnative.dev/docs/style),
[useWindowDimensions](https://reactnative.dev/docs/usewindowdimensions),
[SVG en Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/svg/).
