# components/organisms

Bloques de una tarea completa. Componen moléculas y conectan acciones recibidas de hooks; no usan HTTP directamente.

## Archivos y responsabilidades

| Archivo                                                                | Responsabilidad                                                                                   |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [AdminComplaintShortcut.tsx](AdminComplaintShortcut.tsx)               | Hace visibles los reclamos nuevos desde el resumen sin esperar una recarga manual.                |
| [AdminMenu.tsx](AdminMenu.tsx)                                         | Menú administrativo móvil basado en el mismo catálogo que la barra lateral.                       |
| [AdminQueueLinks.tsx](AdminQueueLinks.tsx)                             | Lleva directamente a las dos bandejas que requieren atención administrativa.                      |
| [AdminQuickActions.tsx](AdminQuickActions.tsx)                         | Accesos operativos que complementan la navegación administrativa.                                 |
| [AppointmentActions.tsx](AppointmentActions.tsx)                       | Acciones del rol visible; el servidor vuelve a validarlas con propiedad/asignación.               |
| [AppointmentAdvancedFilters.tsx](AppointmentAdvancedFilters.tsx)       | Mantiene los filtros de administración disponibles sin ocultar los resultados.                    |
| [AppointmentAgendaPresets.tsx](AppointmentAgendaPresets.tsx)           | Accesos de una pulsación que aplican un conjunto coherente de filtros.                            |
| [AppointmentAssignment.tsx](AppointmentAssignment.tsx)                 | Asigna un empleado activo sin mezclar esa acción con confirmar el turno.                          |
| [AppointmentCancellationDialog.tsx](AppointmentCancellationDialog.tsx) | Solicita motivo y confirma la cancelación mediante el comando del turno.                          |
| [AppointmentCard.tsx](AppointmentCard.tsx)                             | Resumen compartido por los tres roles; no amplía los datos recibidos de la API.                   |
| [AppointmentClientFilter.tsx](AppointmentClientFilter.tsx)             | Selector administrativo de titular; no se ofrece a otros roles.                                   |
| [AppointmentDialogs.tsx](AppointmentDialogs.tsx)                       | Confirmaciones, cobro y comprobante histórico sin exponer datos de otros turnos.                  |
| [AppointmentEmployeeFilter.tsx](AppointmentEmployeeFilter.tsx)         | Selector administrativo de empleado para restringir la consulta de turnos.                        |
| [AppointmentFilters.tsx](AppointmentFilters.tsx)                       | Filtros por experiencia; cliente no puede seleccionar titulares ajenos.                           |
| [AppointmentInformation.tsx](AppointmentInformation.tsx)               | Presenta el contrato del lavado sin modificar la reserva.                                         |
| [AppointmentList.tsx](AppointmentList.tsx)                             | Compone la página actual y distingue carga, error y ausencia de turnos.                           |
| [AppointmentNotes.tsx](AppointmentNotes.tsx)                           | Lista observaciones de trabajo y conecta la carga de una nueva nota.                              |
| [AppointmentPagination.tsx](AppointmentPagination.tsx)                 | Adapta la paginación del recurso sin repetirla entre experiencias.                                |
| [AppointmentPaymentAction.tsx](AppointmentPaymentAction.tsx)           | Ofrece registrar cobro solo con las capacidades vigentes.                                         |
| [AppointmentPaymentDialog.tsx](AppointmentPaymentDialog.tsx)           | Recoge importe, medio y referencia para registrar un cobro idempotente.                           |
| [AppointmentPayments.tsx](AppointmentPayments.tsx)                     | Muestra cobros registrados y saldo de la proyección autorizada.                                   |
| [AppointmentReceiptDialog.tsx](AppointmentReceiptDialog.tsx)           | Presenta el comprobante histórico; no constituye factura fiscal.                                  |
| [AppointmentResults.tsx](AppointmentResults.tsx)                       | Contenido de listado separado del ciclo de actualización de la pantalla.                          |
| [AppointmentStatusEditor.tsx](AppointmentStatusEditor.tsx)             | Confirma reservas antiguas que quedaron pendientes antes de la confirmación automática.           |
| [AppointmentStatusFilter.tsx](AppointmentStatusFilter.tsx)             | Filtra la consulta por estado sin cambiar ningún turno.                                           |
| [AppointmentVehicleAttachment.tsx](AppointmentVehicleAttachment.tsx)   | Completa el vehículo de un turno ya confirmado.                                                   |
| [AppointmentVehicleDetail.tsx](AppointmentVehicleDetail.tsx)           | Conserva la descripción del cliente junto al turno, separada de los servicios cotizados.          |
| [AppointmentWashReport.tsx](AppointmentWashReport.tsx)                 | Detalle del parte con acciones para el responsable, la administración o el titular.               |
| [AppointmentWashReview.tsx](AppointmentWashReview.tsx)                 | La decisión siempre identifica el parte revisado para evitar aprobar un envío posterior.          |
| [AppointmentWashSubmit.tsx](AppointmentWashSubmit.tsx)                 | El responsable explica qué hizo y deja el turno listo para una inspección.                        |
| [BookingClientField.tsx](BookingClientField.tsx)                       | Selecciona titular para una reserva asistida por administración.                                  |
| [BookingInvitation.tsx](BookingInvitation.tsx)                         | Composición de la acción principal del cliente, sin información comercial fija.                   |
| [BookingInvitationCopy.tsx](BookingInvitationCopy.tsx)                 | Contenido editorial de la portada de reserva, independiente de navegación e ilustración.          |
| [BookingSchedule.tsx](BookingSchedule.tsx)                             | Ofrece calendario y rueda sobre una sola cotización vigente.                                      |
| [BookingServicesField.tsx](BookingServicesField.tsx)                   | Ofrece un lavado base y adicionales separados para el tipo cotizado.                              |
| [BookingSummary.tsx](BookingSummary.tsx)                               | Confirma únicamente una cotización y un horario que siguen vigentes.                              |
| [BookingTypeField.tsx](BookingTypeField.tsx)                           | Solicita solo la categoría que determina la cotización.                                           |
| [CancellationNoticeCard.tsx](CancellationNoticeCard.tsx)               | Cancelación del equipo con contexto, motivo completo y dos acciones inequívocas.                  |
| [ClientCancellationNotices.tsx](ClientCancellationNotices.tsx)         | Avisos visibles en Inicio hasta que el cliente confirme haberlos leído.                           |
| [ClientQuickActions.tsx](ClientQuickActions.tsx)                       | Tareas de preparación antes de reservar; no duplica consultas del catálogo.                       |
| [ClientVisitHeader.tsx](ClientVisitHeader.tsx)                         | Limpieza confirmada del inicio propio sin cancelar las visitas del cliente.                       |
| [ClientVisitList.tsx](ClientVisitList.tsx)                             | Visitas autorizadas, con carga/error separados del estado vacío.                                  |
| [CollectionState.tsx](CollectionState.tsx)                             | Estados consistentes de lista: carga inicial, error recuperable y vacío.                          |
| [CustomerMessageCard.tsx](CustomerMessageCard.tsx)                     | Muestra la conversación y, en devoluciones, el responsable y su descripción histórica.            |
| [DashboardHeading.tsx](DashboardHeading.tsx)                           | Presentación del tablero y su acción prioritaria de ingreso presencial.                           |
| [DashboardIndicators.tsx](DashboardIndicators.tsx)                     | Métricas diarias y pendientes globales; un recurso no disponible muestra un guion.                |
| [DashboardPending.tsx](DashboardPending.tsx)                           | Turnos por atender del negocio; un fallo de consulta no se anuncia como lista vacía.              |
| [EmployeeAppointmentResults.tsx](EmployeeAppointmentResults.tsx)       | Filtros y resultados compartidos por agenda e historial del equipo.                               |
| [EmployeePaidFinish.tsx](EmployeePaidFinish.tsx)                       | El cobro completo habilita el cierre directo, conservando descripción y responsable.              |
| [EmployeeWorkAction.tsx](EmployeeWorkAction.tsx)                       | Ofrece iniciar o finalizar el lavado según el estado del turno.                                   |
| [EntityForm.tsx](EntityForm.tsx)                                       | Formulario RHF + Zod con errores por campo y callback sin HTTP propio.                            |
| [ModalContent.tsx](ModalContent.tsx)                                   | Panel desplazable; los controles flotantes quedan fuera para no tapar el formulario.              |
| [ModalPanel.tsx](ModalPanel.tsx)                                       | Diálogo nativo con tema y volver arriba disponibles sin salir del formulario.                     |
| [OAuthLinkForm.tsx](OAuthLinkForm.tsx)                                 | Confirma la contraseña local una sola vez antes de unir ambas formas de ingreso.                  |
| [PendingAppointments.tsx](PendingAppointments.tsx)                     | Solicitudes pendientes del tablero y acceso a la gestión completa.                                |
| [PopularServices.tsx](PopularServices.tsx)                             | Presenta frecuencias reales de servicios en el período consultado.                                |
| [ProfileIdentity.tsx](ProfileIdentity.tsx)                             | Identifica la sesión propia con nombre, email y avatar opcional.                                  |
| [ProfilePasswordForm.tsx](ProfilePasswordForm.tsx)                     | Confirma la contraseña actual y solicita la nueva al servidor.                                    |
| [ReportSummary.tsx](ReportSummary.tsx)                                 | Compone indicadores, ingresos semanales y servicios desde un único reporte.                       |
| [RevenueByWeek.tsx](RevenueByWeek.tsx)                                 | Compara semanas con cifras recalculadas por el servidor, sin metas ficticias.                     |
| [ScheduleSelector.tsx](ScheduleSelector.tsx)                           | Horarios y total provienen del backend; no calcula precios en el cliente.                         |
| [Screen.tsx](Screen.tsx)                                               | Marco de todos los roles con controles flotantes y actualización al regresar.                     |
| [ScreenContent.tsx](ScreenContent.tsx)                                 | Contenido común con espacio reservado para los controles flotantes.                               |
| [ScrollSurface.tsx](ScrollSurface.tsx)                                 | Superficie acotada que mantiene los controles fuera del contenido desplazable.                    |
| [ServiceCollection.tsx](ServiceCollection.tsx)                         | Cuadrícula de catálogo con acciones administrativas cuando están habilitadas.                     |
| [ServiceDeleteDialog.tsx](ServiceDeleteDialog.tsx)                     | Confirma la baja lógica del servicio preservando contratos anteriores.                            |
| [ServiceEditDialog.tsx](ServiceEditDialog.tsx)                         | Edita descripción y duración del servicio, separadas de sus precios.                              |
| [ServiceEditors.tsx](ServiceEditors.tsx)                               | Edición de servicio, tarifa por tipo y confirmación de baja lógica.                               |
| [ServicePriceDialog.tsx](ServicePriceDialog.tsx)                       | Edita una tarifa para la pareja servicio/tipo de vehículo.                                        |
| [SidebarNavigation.tsx](SidebarNavigation.tsx)                         | Selección de destinos basada en rol y ruta, sin estado de navegación duplicado.                   |
| [SignInForm.tsx](SignInForm.tsx)                                       | Valida email y contraseña y delega el acceso en useSignIn.                                        |
| [SignInPresentation.tsx](SignInPresentation.tsx)                       | Presentación de acceso que comparte la identidad del resto de la aplicación.                      |
| [SocialLoginButton.tsx](SocialLoginButton.tsx)                         | Botón OAuth de un proveedor configurado, con su propia solicitud PKCE.                            |
| [SocialLogins.tsx](SocialLogins.tsx)                                   | Muestra proveedores y deshabilita los que el negocio todavía no configuró.                        |
| [ThemeSelector.tsx](ThemeSelector.tsx)                                 | Conserva la preferencia automática; los cambios claro/oscuro usan el botón flotante.              |
| [UserCollection.tsx](UserCollection.tsx)                               | Presenta la página autorizada de usuarios y los estados de consulta.                              |
| [UserDeleteDialog.tsx](UserDeleteDialog.tsx)                           | Confirma la baja lógica de una cuenta conservando su historial.                                   |
| [UserEditDialog.tsx](UserEditDialog.tsx)                               | Comparte campos de creación y edición de cuentas administradas.                                   |
| [UserRoleFilter.tsx](UserRoleFilter.tsx)                               | Filtra cuentas por rol sin modificar sus permisos.                                                |
| [UserTable.tsx](UserTable.tsx)                                         | Usuarios como filas adaptables a tarjetas en teléfono.                                            |
| [VehicleCollection.tsx](VehicleCollection.tsx)                         | Cuadrícula de vehículos autorizados con edición y baja confirmada.                                |
| [VehicleDeleteDialog.tsx](VehicleDeleteDialog.tsx)                     | Confirma la baja lógica; el servidor rechaza trabajos pendientes.                                 |
| [VehicleEditDialog.tsx](VehicleEditDialog.tsx)                         | Formulario del vehículo con titular controlado por rol y servidor.                                |
| [VehicleEditor.tsx](VehicleEditor.tsx)                                 | Formularios y confirmación de baja con datos del vehículo seleccionado.                           |
| [VehicleTypeDialog.tsx](VehicleTypeDialog.tsx)                         | Formulario administrativo de categorías utilizadas por las tarifas.                               |
| [VehicleTypeManager.tsx](VehicleTypeManager.tsx)                       | Categorías registradas y formularios administrativos sin exponer SQL ni identificadores técnicos. |
| [WalkInConfirmation.tsx](WalkInConfirmation.tsx)                       | Distingue la estimación de disponibilidad del turno ya guardado.                                  |
| [WalkInServices.tsx](WalkInServices.tsx)                               | Reutiliza reglas de lavado único y adicionales por categoría, con precios visibles.               |
| [WalkInVehicle.tsx](WalkInVehicle.tsx)                                 | Solicita solo patente y categoría; los datos de contacto son opcionales.                          |
| [WashFeedbackForm.tsx](WashFeedbackForm.tsx)                           | Captura una devolución del titular después de que se confirma el trabajo.                         |
| [WeeklyActivity.tsx](WeeklyActivity.tsx)                               | Muestra semanas del mes y demanda de servicios con actualización automática.                      |
| [WelcomePanel.tsx](WelcomePanel.tsx)                                   | Presentación inicial del producto.                                                                |
| [WorkspaceFrame.tsx](WorkspaceFrame.tsx)                               | Estructura común independiente del contenido y de las consultas de cada pantalla.                 |
| [WorkspaceHeader.tsx](WorkspaceHeader.tsx)                             | Cabecera visual común; su área interactiva conserva su propio estado de menú.                     |
| [WorkspaceHeaderActions.tsx](WorkspaceHeaderActions.tsx)               | Área de interacción de cabecera, separada del posicionamiento visual.                             |
| [WorkspaceSidebar.tsx](WorkspaceSidebar.tsx)                           | Estructura lateral independiente del catálogo de destinos y de su selección.                      |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
