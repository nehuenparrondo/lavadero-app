# src/components/atoms

<!-- Generado por npm run docs. -->

Primitivas visuales con tema y accesibilidad. No hacen consultas ni conocen las reglas del lavadero.

## Archivos y responsabilidades

| Archivo                                        | Responsabilidad                                                                         |
| ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| [AppIcon.tsx](AppIcon.tsx)                     | Ícono vectorial decorativo; la acción contenedora debe aportar su nombre accesible.     |
| [Avatar.tsx](Avatar.tsx)                       | Identidad con iniciales; no carga fotos ni recursos de terceros.                        |
| [Badge.tsx](Badge.tsx)                         | Etiqueta compacta con tono semántico.                                                   |
| [Button.tsx](Button.tsx)                       | Contrato de una acción. El callback no se ejecuta mientras carga o está deshabilitada.  |
| [ButtonContent.tsx](ButtonContent.tsx)         | Contenido visual del botón, independiente de Pressable y de su política de interacción. |
| [CompactIconButton.tsx](CompactIconButton.tsx) | Acción visual pequeña con objetivo táctil amplio y etiqueta para lectores de pantalla.  |
| [FloatingAction.tsx](FloatingAction.tsx)       | Acción circular con nombre accesible y contraste adaptado al tema.                      |
| [Icon.tsx](Icon.tsx)                           | Símbolo decorativo; el control que lo contiene aporta la etiqueta accesible.            |
| [Input.tsx](Input.tsx)                         | Entrada controlada accesible, con tema y altura táctil suficiente.                      |
| [Spinner.tsx](Spinner.tsx)                     | Indicador de espera con color semántico y descripción accesible.                        |
| [Text.tsx](Text.tsx)                           | Texto con color semántico y tamaño consistente.                                         |

## Mantenimiento

Las precondiciones, parámetros y resultados se documentan junto a cada función. Desde `main`, ejecutar `npm run docs` después de cambiar contratos y `npm run check` antes de publicar. No editar este índice a mano.
