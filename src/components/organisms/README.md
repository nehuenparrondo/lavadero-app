# components/organisms

Bloques de una tarea completa. Componen moléculas y conectan acciones recibidas de hooks; no usan HTTP directamente.

## Archivos y responsabilidades

| Archivo                                                                | Responsabilidad                                                                                   |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [AdminMenu.tsx](AdminMenu.tsx)                                         | Menú administrativo móvil basado en el mismo catálogo que la barra lateral.                       |
| [AdminQuickActions.tsx](AdminQuickActions.tsx)                         | Accesos operativos que complementan la navegación administrativa.                                 |
| [AppointmentActions.tsx](AppointmentActions.tsx)                       | Acciones del rol visible; el servidor vuelve a validarlas con propiedad/asignación.               |
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
| [AppointmentStatusEditor.tsx](AppointmentStatusEditor.tsx)             | Expone las transiciones administrativas que el servidor vuelve a validar.                         |
| [AppointmentStatusFilter.tsx](AppointmentStatusFilter.tsx)             | Filtra la consulta por estado sin cambiar ningún turno.                                           |
| [BookingClientField.tsx](BookingClientField.tsx)                       | Selecciona titular para una reserva asistida por administración.                                  |
| [BookingInvitation.tsx](BookingInvitation.tsx)                         | Composición de la acción principal del cliente, sin información comercial fija.                   |
| [BookingInvitationCopy.tsx](BookingInvitationCopy.tsx)                 | Contenido editorial de la portada de reserva, independiente de navegación e ilustración.          |
| [BookingServicesField.tsx](BookingServicesField.tsx)                   | Ofrece servicios activos con tarifa para el vehículo elegido.                                     |
| [BookingVehicleEmpty.tsx](BookingVehicleEmpty.tsx)                     | Próximo paso de una reserva sin vehículos registrados.                                            |
| [BookingVehicleField.tsx](BookingVehicleField.tsx)                     | Orienta al titular sin vehículos y ofrece registrar uno antes de reservar.                        |
| [ClientQuickActions.tsx](ClientQuickActions.tsx)                       | Tareas de preparación antes de reservar; no duplica consultas del catálogo.                       |
| [ClientVisitList.tsx](ClientVisitList.tsx)                             | Visitas autorizadas, con carga/error separados del estado vacío.                                  |
| [CollectionState.tsx](CollectionState.tsx)                             | Estados consistentes de lista: carga inicial, error recuperable y vacío.                          |
| [DashboardHeading.tsx](DashboardHeading.tsx)                           | Presentación del tablero y su acción prioritaria de reserva asistida.                             |
| [DashboardIndicators.tsx](DashboardIndicators.tsx)                     | Métricas diarias y pendientes globales; un recurso no disponible muestra un guion.                |
| [DashboardPending.tsx](DashboardPending.tsx)                           | Solicitudes pendientes del negocio; un fallo de consulta no se anuncia como lista vacía.          |
| [EmployeeAppointmentResults.tsx](EmployeeAppointmentResults.tsx)       | Filtros y resultados compartidos por agenda e historial del equipo.                               |
| [EmployeeDaySummary.tsx](EmployeeDaySummary.tsx)                       | Resumen de la fecha consultada, limitado por la API al empleado actual.                           |
| [EmployeePerformance.tsx](EmployeePerformance.tsx)                     | Presenta trabajos completados por empleado en el período.                                         |
| [EmployeeWorkAction.tsx](EmployeeWorkAction.tsx)                       | Ofrece iniciar o finalizar el lavado según el estado del turno.                                   |
| [EntityForm.tsx](EntityForm.tsx)                                       | Formulario RHF + Zod con errores por campo y callback sin HTTP propio.                            |
| [ModalPanel.tsx](ModalPanel.tsx)                                       | Panel accesible para formularios y confirmaciones sin ventanas nativas bloqueantes.               |
| [OAuthLinkForm.tsx](OAuthLinkForm.tsx)                                 | Confirma la contraseña local una sola vez antes de unir ambas formas de ingreso.                  |
| [PendingAppointments.tsx](PendingAppointments.tsx)                     | Solicitudes pendientes del tablero y acceso a la gestión completa.                                |
| [PopularServices.tsx](PopularServices.tsx)                             | Presenta frecuencias reales de servicios en el período consultado.                                |
| [ProfileIdentity.tsx](ProfileIdentity.tsx)                             | Identifica la sesión propia con nombre, email y avatar opcional.                                  |
| [ProfilePasswordForm.tsx](ProfilePasswordForm.tsx)                     | Confirma la contraseña actual y solicita la nueva al servidor.                                    |
| [ReportSummary.tsx](ReportSummary.tsx)                                 | Compone indicadores, ingresos, servicios y rendimiento desde un único reporte.                    |
| [RevenueByDay.tsx](RevenueByDay.tsx)                                   | Visualiza ingresos reales por día con las mismas barras accesibles del tablero.                   |
| [ScheduleSelector.tsx](ScheduleSelector.tsx)                           | Horarios y total provienen del backend; no calcula precios en el cliente.                         |
| [Screen.tsx](Screen.tsx)                                               | Superficie de pantalla con una única región desplazable y actualización opcional.                 |
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
| [ThemeSelector.tsx](ThemeSelector.tsx)                                 | Edita la preferencia local de apariencia sin cambiar datos del negocio.                           |
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
| [WeeklyActivity.tsx](WeeklyActivity.tsx)                               | Serie semanal real; no rellena actividad ni fabrica tendencias para decorar el tablero.           |
| [WelcomePanel.tsx](WelcomePanel.tsx)                                   | Presentación inicial del producto.                                                                |
| [WorkspaceFrame.tsx](WorkspaceFrame.tsx)                               | Estructura común independiente del contenido y de las consultas de cada pantalla.                 |
| [WorkspaceHeader.tsx](WorkspaceHeader.tsx)                             | Cabecera visual común; su área interactiva conserva su propio estado de menú.                     |
| [WorkspaceHeaderActions.tsx](WorkspaceHeaderActions.tsx)               | Área de interacción de cabecera, separada del posicionamiento visual.                             |
| [WorkspaceSidebar.tsx](WorkspaceSidebar.tsx)                           | Estructura lateral independiente del catálogo de destinos y de su selección.                      |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
