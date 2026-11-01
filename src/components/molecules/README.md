# components/molecules

Composiciones reutilizables: tarjetas, campos, indicadores y distribución adaptable. Reciben datos y callbacks.

## Archivos y responsabilidades

| Archivo                                                | Responsabilidad                                                                                |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| [AppointmentCardFooter.tsx](AppointmentCardFooter.tsx) | La ausencia de importe significa falta de permiso, nunca un total cero.                        |
| [AppointmentVehicle.tsx](AppointmentVehicle.tsx)       | Datos operativos presentes en la proyección de todos los roles.                                |
| [AvailableSlots.tsx](AvailableSlots.tsx)               | Horarios ya validados por el servidor y estado vacío cuando la fecha está completa.            |
| [BrandLockup.tsx](BrandLockup.tsx)                     | Firma de marca compacta para acceso, menú y cabecera.                                          |
| [Card.tsx](Card.tsx)                                   | Superficie neutra para agrupar información; el estilo permite componer grids sin duplicarla.   |
| [CareGuide.tsx](CareGuide.tsx)                         | Ayuda basada en funciones existentes, sin prometer servicios ni tiempos fijos.                 |
| [ChoiceButton.tsx](ChoiceButton.tsx)                   | Opción táctil con estado seleccionado accesible y contraste del tema.                          |
| [ChoiceGroup.tsx](ChoiceGroup.tsx)                     | Selector simple o múltiple; delega apariencia y transformación en piezas independientes.       |
| [ConnectionStatus.tsx](ConnectionStatus.tsx)           | Estado real de red.                                                                            |
| [ContractServiceLines.tsx](ContractServiceLines.tsx)   | Servicios históricos; solo muestra importes que el servidor incluyó en la proyección del rol.  |
| [ControlledField.tsx](ControlledField.tsx)             | Adapta un campo RHF a la molécula de entrada, incluyendo errores y blur.                       |
| [EmptyState.tsx](EmptyState.tsx)                       | Explica una colección vacía sin confundirla con carga o error de red.                          |
| [FieldInput.tsx](FieldInput.tsx)                       | Ajusta teclado y privacidad según el tipo semántico del campo.                                 |
| [FormField.tsx](FormField.tsx)                         | Label, entrada y error, con selectors legibles para campos enumerados.                         |
| [LoadingState.tsx](LoadingState.tsx)                   | Estado visible mientras se verifica sesión o se carga una lista.                               |
| [MetricTile.tsx](MetricTile.tsx)                       | Indicador de solo lectura; recibe valores reales o un guion mientras no hay respuesta.         |
| [Notice.tsx](Notice.tsx)                               | Mensaje de error/éxito anunciado a lectores de pantalla.                                       |
| [OpeningHoursCard.tsx](OpeningHoursCard.tsx)           | Muestra el horario confirmado y el estado real de conexión.                                    |
| [OverviewColumns.tsx](OverviewColumns.tsx)             | Composición 2:1 apilada cuando no hay espacio suficiente para dos columnas.                    |
| [PageHeading.tsx](PageHeading.tsx)                     | Portada con contexto y una acción principal, adaptable al ancho y a la escala de texto.        |
| [Pagination.tsx](Pagination.tsx)                       | Navegación de listas grandes sin perder búsqueda y filtros.                                    |
| [QuickAction.tsx](QuickAction.tsx)                     | Acceso a un recorrido existente; toda la tarjeta mantiene un único objetivo táctil.            |
| [QuotedTotal.tsx](QuotedTotal.tsx)                     | Total y duración estimados exactamente como los devuelve la cotización del servidor.           |
| [ResponsiveGrid.tsx](ResponsiveGrid.tsx)               | Cuadrícula de dos columnas que conserva las claves y el orden de los elementos.                |
| [RevenueBar.tsx](RevenueBar.tsx)                       | Barra con cifra explícita para no depender de color o longitud.                                |
| [SearchBar.tsx](SearchBar.tsx)                         | Búsqueda controlada, con etiqueta accesible y teclado de búsqueda.                             |
| [SectionHeader.tsx](SectionHeader.tsx)                 | Jerarquía de sección, separada de la portada principal de cada experiencia.                    |
| [ServiceCard.tsx](ServiceCard.tsx)                     | Servicio con descripción, duración y tarifa del tipo seleccionado.                             |
| [SidebarLink.tsx](SidebarLink.tsx)                     | Destino lateral con selección persistente y respuesta de hover/teclado del Pressable.          |
| [StatusBadge.tsx](StatusBadge.tsx)                     | Traducciones estables del flujo de trabajo.                                                    |
| [VehicleTypeItem.tsx](VehicleTypeItem.tsx)             | Categoría y acciones del catálogo; una baja lógica conserva el nombre visible en el historial. |
| [WashIllustration.tsx](WashIllustration.tsx)           | Ilustración vectorial decorativa del servicio; no representa un vehículo del cliente.          |
| [WorkdayGuide.tsx](WorkdayGuide.tsx)                   | Ayuda operacional; las acciones reales siguen en el detalle del turno.                         |
| [WorkspaceUser.tsx](WorkspaceUser.tsx)                 | Identidad de la sesión actual; no consulta ni copia información de otros usuarios.             |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
