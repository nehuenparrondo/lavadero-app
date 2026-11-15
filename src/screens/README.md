# screens

Composición de cada recorrido. Coordina organismos con su hook y deja a las rutas la navegación protegida.

## Archivos y responsabilidades

| Archivo                                    | Responsabilidad                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| [BootstrapScreen.tsx](BootstrapScreen.tsx) | Pantalla de arranque: compone el estado de conectividad mientras se prepara la navegación. |
| [bootstrap.styles.ts](bootstrap.styles.ts) | Layout centrado, desplazable y con ancho legible en teléfono o tablet.                     |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
