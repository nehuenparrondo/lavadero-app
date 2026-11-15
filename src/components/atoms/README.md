# components/atoms

Primitivas visuales con tema y accesibilidad. No hacen consultas ni conocen las reglas del lavadero.

## Archivos y responsabilidades

| Archivo                                  | Responsabilidad                                                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------- |
| [AppIcon.tsx](AppIcon.tsx)               | Ícono vectorial decorativo; la acción contenedora debe aportar su nombre accesible.     |
| [Avatar.tsx](Avatar.tsx)                 | Foto opcional o iniciales del perfil, sin datos de otros clientes.                      |
| [Badge.tsx](Badge.tsx)                   | Etiqueta compacta con tono semántico.                                                   |
| [Button.tsx](Button.tsx)                 | Contrato de una acción. El callback no se ejecuta mientras carga o está deshabilitada.  |
| [ButtonContent.tsx](ButtonContent.tsx)   | Contenido visual del botón, independiente de Pressable y de su política de interacción. |
| [FloatingAction.tsx](FloatingAction.tsx) | Acción circular con nombre accesible y contraste adaptado al tema.                      |
| [Icon.tsx](Icon.tsx)                     | Símbolo decorativo; el control que lo contiene aporta la etiqueta accesible.            |
| [Input.tsx](Input.tsx)                   | Entrada controlada accesible, con tema y altura táctil suficiente.                      |
| [Spinner.tsx](Spinner.tsx)               | Indicador de espera con color semántico y descripción accesible.                        |
| [Text.tsx](Text.tsx)                     | Texto con color semántico y tamaño consistente.                                         |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
