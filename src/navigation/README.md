# navigation

Composición de stacks/tabs y guardas. El catálogo de destinos por rol vive en constants/roleNavigation.

## Archivos y responsabilidades

| Archivo                                  | Responsabilidad                                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------- |
| [RoleTabs.tsx](RoleTabs.tsx)             | Destino de la barra móvil. El nombre coincide con un archivo de ruta del grupo. |
| [RootNavigation.tsx](RootNavigation.tsx) | Mantiene el stack montado mientras restaura sesión y aplica guardas por ruta.   |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
