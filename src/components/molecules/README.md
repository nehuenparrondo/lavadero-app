# components/molecules

Composiciones reutilizables: tarjetas, campos, indicadores y distribución adaptable. Reciben datos y callbacks.

## Archivos y responsabilidades

| Archivo                                                        | Responsabilidad                                                                                |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [AppointmentCancellation.tsx](AppointmentCancellation.tsx)     | Conserva el motivo visible en el detalle, incluso después de leer el aviso de Inicio.          |
| [AppointmentCardFooter.tsx](AppointmentCardFooter.tsx)         | La ausencia de importe significa falta de permiso, nunca un total cero.                        |
| [AppointmentNote.tsx](AppointmentNote.tsx)                     | Observación guardada con autor y fecha, diferenciada del campo para escribir otra.             |
| [AppointmentVehicle.tsx](AppointmentVehicle.tsx)               | Datos operativos presentes en la proyección de todos los roles.                                |
| [AvailableSlots.tsx](AvailableSlots.tsx)                       | Horarios ya validados por el servidor y estado vacío cuando la fecha está completa.            |
| [BookingSection.tsx](BookingSection.tsx)                       | Agrupa un paso de la reserva con una jerarquía visual consistente.                             |
| [BrandLockup.tsx](BrandLockup.tsx)                             | Firma de marca compacta para acceso, menú y cabecera.                                          |
| [CalendarDay.tsx](CalendarDay.tsx)                             | Celda táctil del calendario o espacio vacío de la semana.                                      |
| [CalendarGrid.tsx](CalendarGrid.tsx)                           | Seis semanas de calendario, compartidas por web y dispositivos nativos.                        |
| [CalendarNavigation.tsx](CalendarNavigation.tsx)               | Cambia el mes visible sin modificar la fecha del formulario.                                   |
| [CancellationNoticeMessage.tsx](CancellationNoticeMessage.tsx) | Explica qué reserva cambió y conserva el motivo completo, sin abreviarlo.                      |
| [Card.tsx](Card.tsx)                                           | Superficie neutra para agrupar información; el estilo permite componer grids sin duplicarla.   |
| [CareGuide.tsx](CareGuide.tsx)                                 | Ayuda basada en funciones existentes, sin prometer servicios ni tiempos fijos.                 |
| [ChoiceButton.tsx](ChoiceButton.tsx)                           | Opción táctil con estado seleccionado accesible y contraste del tema.                          |
| [ChoiceGroup.tsx](ChoiceGroup.tsx)                             | Selector simple o múltiple; delega apariencia y transformación en piezas independientes.       |
| [ConnectionNotice.tsx](ConnectionNotice.tsx)                   | Aviso global durante el arranque, sin sacar al usuario de su pantalla.                         |
| [ConnectionStatus.tsx](ConnectionStatus.tsx)                   | Estado real de red.                                                                            |
| [ContractServiceLines.tsx](ContractServiceLines.tsx)           | Servicios históricos; solo muestra importes que el servidor incluyó en la proyección del rol.  |
| [ControlledField.tsx](ControlledField.tsx)                     | Adapta un campo RHF a la molécula de entrada, incluyendo errores y blur.                       |
| [ControlledScrollView.tsx](ControlledScrollView.tsx)           | Asocia medidas y referencia con un controlador sin introducir otra región desplazable.         |
| [DateInput.tsx](DateInput.tsx)                                 | Selección de fecha mediante calendario, con valor ISO separado de su presentación.             |
| [EmptyState.tsx](EmptyState.tsx)                               | Explica una colección vacía sin confundirla con carga o error de red.                          |
| [FieldInput.tsx](FieldInput.tsx)                               | Ajusta teclado y privacidad según el tipo semántico del campo.                                 |
| [FloatingControls.tsx](FloatingControls.tsx)                   | Controles persistentes abajo a la derecha; volver arriba aparece solo cuando es útil.          |
| [FormField.tsx](FormField.tsx)                                 | Label, entrada y error, con selectors legibles para campos enumerados.                         |
| [FormFieldFeedback.tsx](FormFieldFeedback.tsx)                 | Ayuda de escritura y validación sin anunciar cada carácter a lectores de pantalla.             |
| [LoadingState.tsx](LoadingState.tsx)                           | Estado visible mientras se verifica sesión o se carga una lista.                               |
| [MetricTile.tsx](MetricTile.tsx)                               | Indicador de solo lectura; recibe valores reales o un guion mientras no hay respuesta.         |
| [Notice.tsx](Notice.tsx)                                       | Mensaje de error/éxito anunciado a lectores de pantalla.                                       |
| [OpeningHoursCard.tsx](OpeningHoursCard.tsx)                   | Muestra el horario confirmado y el estado real de conexión.                                    |
| [OverviewColumns.tsx](OverviewColumns.tsx)                     | Composición 2:1 apilada cuando no hay espacio suficiente para dos columnas.                    |
| [PageHeading.tsx](PageHeading.tsx)                             | Portada con contexto y una acción principal, adaptable al ancho y a la escala de texto.        |
| [Pagination.tsx](Pagination.tsx)                               | Navegación de listas grandes sin perder búsqueda y filtros.                                    |
| [ProgressBar.tsx](ProgressBar.tsx)                             | Barra accesible para comparar importes o cantidades reales de una serie.                       |
| [QuickAction.tsx](QuickAction.tsx)                             | Acceso a un recorrido existente; toda la tarjeta mantiene un único objetivo táctil.            |
| [QuotedTotal.tsx](QuotedTotal.tsx)                             | Total y duración estimados exactamente como los devuelve la cotización del servidor.           |
| [ResponsiveGrid.tsx](ResponsiveGrid.tsx)                       | Cuadrícula de dos columnas que conserva las claves y el orden de los elementos.                |
| [SearchBar.tsx](SearchBar.tsx)                                 | Búsqueda controlada, con etiqueta accesible y teclado de búsqueda.                             |
| [SearchSelect.tsx](SearchSelect.tsx)                           | Selecciona una opción en un diálogo buscable sin ocupar toda la agenda.                        |
| [SearchSelectResults.tsx](SearchSelectResults.tsx)             | Busca en todas las opciones, limitando las filas dibujadas para mantener fluidez.              |
| [SectionHeader.tsx](SectionHeader.tsx)                         | Jerarquía de sección, separada de la portada principal de cada experiencia.                    |
| [ServiceCard.tsx](ServiceCard.tsx)                             | Servicio con descripción, duración y tarifa del tipo seleccionado.                             |
| [SidebarLink.tsx](SidebarLink.tsx)                             | Destino lateral con selección persistente y respuesta de hover/teclado del Pressable.          |
| [StatusBadge.tsx](StatusBadge.tsx)                             | Traducciones estables del flujo de trabajo.                                                    |
| [TimeWheel.tsx](TimeWheel.tsx)                                 | Rueda de cinco filas con una hora central, operable por tacto, mouse y teclado.                |
| [TimeWheelActions.tsx](TimeWheelActions.tsx)                   | Alternativa al gesto para lectores de pantalla y navegación con teclado.                       |
| [VehicleTypeItem.tsx](VehicleTypeItem.tsx)                     | Categoría y acciones del catálogo; una baja lógica conserva el nombre visible en el historial. |
| [WashIllustration.tsx](WashIllustration.tsx)                   | Ilustración vectorial decorativa del servicio; no representa un vehículo del cliente.          |
| [WheelRow.tsx](WheelRow.tsx)                                   | Una fila mantiene el tamaño táctil aunque la letra periférica se atenúe.                       |
| [WorkdayGuide.tsx](WorkdayGuide.tsx)                           | Ayuda operacional; las acciones reales siguen en el detalle del turno.                         |
| [WorkspaceIdentity.tsx](WorkspaceIdentity.tsx)                 | Nombre y rol de la sesión propia sobre fondos claros u oscuros.                                |
| [WorkspaceUser.tsx](WorkspaceUser.tsx)                         | Acceso al perfil desde toda la identidad, tanto en cabecera como en barra lateral.             |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
