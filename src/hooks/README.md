# hooks

Coordinación de consultas, filtros, selección y mutaciones. Separa el error de lectura del de escritura y descarta respuestas obsoletas.

## Archivos y responsabilidades

| Archivo                                                        | Responsabilidad                                                                                |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [appointmentCommands.ts](appointmentCommands.ts)               | Acciones operativas; el permiso y la transición se vuelven a validar en el backend.            |
| [profileCommands.ts](profileCommands.ts)                       | Operaciones propias; cambiar contraseña revoca sesiones e inicia nuevamente el acceso.         |
| [useAction.ts](useAction.ts)                                   | Ejecuta una acción y publica carga/error/resultado sin propagar errores a la vista.            |
| [useAgendaResources.ts](useAgendaResources.ts)                 | Recursos auxiliares de agenda, habilitados únicamente para la experiencia correspondiente.     |
| [useApiHealth.ts](useApiHealth.ts)                             | Consulta el backend y cancela la solicitud al desmontar.                                       |
| [useAppointmentDetail.ts](useAppointmentDetail.ts)             | Compone datos, selección y acciones del detalle de turno con ownership en la API.              |
| [useAppointmentFiltersState.ts](useAppointmentFiltersState.ts) | Filtros locales; no sustituyen las restricciones de propiedad aplicadas por la API.            |
| [useAppointmentFlags.ts](useAppointmentFlags.ts)               | Selecciones de administración y apertura de diálogos; se sincronizan con la versión remota.    |
| [useAppointmentMutation.ts](useAppointmentMutation.ts)         | Mutación de turno y actualización de los recursos afectados después de confirmar.              |
| [useAppointmentPayment.ts](useAppointmentPayment.ts)           | Mantiene la misma clave al reintentar un pago y la renueva solo tras su confirmación.          |
| [useAppointmentResources.ts](useAppointmentResources.ts)       | Consultas del detalle; los recursos administrativos no se solicitan para otros roles.          |
| [useAppointments.ts](useAppointments.ts)                       | Coordina filtros, página y resumen; el servidor aplica propiedad y asignaciones.               |
| [useAuth.ts](useAuth.ts)                                       | Accede a sesión verificada.                                                                    |
| [useBooking.ts](useBooking.ts)                                 | Compone selección, consulta y confirmación sin lógica de negocio dentro de la pantalla.        |
| [useBookingResources.ts](useBookingResources.ts)               | Carga opciones autorizadas y cotiza una selección con forma válida.                            |
| [useBookingSelection.ts](useBookingSelection.ts)               | Selección de reserva; cambiar titular, vehículo, servicios o fecha invalida el horario previo. |
| [useBookingSubmit.ts](useBookingSubmit.ts)                     | Envía la intención de reserva sin confiar en el precio de la interfaz.                         |
| [useCatalog.ts](useCatalog.ts)                                 | Compone consulta, edición de servicio y edición de tarifa como responsabilidades separadas.    |
| [useDashboard.ts](useDashboard.ts)                             | Datos del tablero; refresca resumen y solicitudes como una sola acción de pantalla.            |
| [useDebouncedValue.ts](useDebouncedValue.ts)                   | Evita una solicitud de búsqueda por cada tecla sin retrasar la escritura visible.              |
| [useEditorState.ts](useEditorState.ts)                         | Mantiene exclusivamente la selección y apertura de un editor de entidad.                       |
| [useEntityManager.ts](useEntityManager.ts)                     | Une una colección paginada con el editor reutilizable; preserva error de lectura separado.     |
| [useHome.ts](useHome.ts)                                       | Próximas tres visitas propias, ordenadas cronológicamente.                                     |
| [useOptions.ts](useOptions.ts)                                 | Lee todas las páginas de un selector, solo cuando el rol lo permite.                           |
| [usePagedList.ts](usePagedList.ts)                             | Lista paginada con filtro y navegación entre páginas para no truncar datos.                    |
| [useProfile.ts](useProfile.ts)                                 | Perfil propio con formularios, sesión y comandos separados por responsabilidad.                |
| [useRemoteData.ts](useRemoteData.ts)                           | Consulta un recurso y descarta respuestas de filtros anteriores o de un consumidor desmontado. |
| [useReports.ts](useReports.ts)                                 | Reporte por período calendario local y fecha elegida.                                          |
| [useResourceEditor.ts](useResourceEditor.ts)                   | Compone selección, confirmaciones y persistencia para editores sin duplicar el ABML.           |
| [useServicePrice.ts](useServicePrice.ts)                       | Administra la tarifa por tipo de vehículo, independientemente del formulario de servicio.      |
| [useSessionRestore.ts](useSessionRestore.ts)                   | Publica la fase de arranque y cancela lógicamente respuestas tardías.                          |
| [useSettings.ts](useSettings.ts)                               | Configuración operativa con horario local y capacidad simultánea.                              |
| [useSignIn.ts](useSignIn.ts)                                   | Conecta formulario con registro/login y guarda refresh de forma segura.                        |
| [useSocialExchange.ts](useSocialExchange.ts)                   | Canje compartido por web/APK; la contraseña se conserva solo mientras se envía.                |
| [useSocialLogin.ts](useSocialLogin.ts)                         | Inicia AuthSession con PKCE; la API intercambia el código y emite su propia sesión.            |
| [useSocialLogin.web.ts](useSocialLogin.web.ts)                 | Estado del botón web; la confirmación de vinculación ocurre en la ruta de retorno.             |
| [useSocialProviders.ts](useSocialProviders.ts)                 | Consulta proveedores y permite reintentar si Render estaba despertando.                        |
| [useSocialResponse.ts](useSocialResponse.ts)                   | Completa retornos nativos y muestra también cancelaciones y errores del proveedor.             |
| [useTheme.ts](useTheme.ts)                                     | Retorna tema y selector.                                                                       |
| [useUsers.ts](useUsers.ts)                                     | Gestión de usuarios; delega selección, persistencia y definición de formularios.               |
| [useVehicleTypes.ts](useVehicleTypes.ts)                       | Categorías con edición común y baja lógica que conserva referencias históricas.                |
| [useVehicles.ts](useVehicles.ts)                               | ABML de vehículos con definición de formulario separada de las consultas y acciones.           |
| [useWebOAuthReturn.ts](useWebOAuthReturn.ts)                   | Consume el retorno web una vez, validando state/PKCE antes de guardar sesión.                  |
| [useWorkspaceLayout.ts](useWorkspaceLayout.ts)                 | Resuelve densidad y navegación a partir del espacio real, también al girar el teléfono.        |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
