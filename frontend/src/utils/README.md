# utils

Transformaciones puras o infraestructura puntual. Mantener unidades explícitas: centavos, minutos y UTC.

## Archivos y responsabilidades

| Archivo                                            | Responsabilidad                                                                                      |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [agendaPresets.ts](agendaPresets.ts)               | Genera filtros consistentes al abrir una agenda.                                                     |
| [appointmentListTitle.ts](appointmentListTitle.ts) | Título de la colección según rol e historial, sin reglas de acceso dentro del JSX.                   |
| [bookingAvailability.ts](bookingAvailability.ts)   | Explica por qué una fecha no puede ofrecer turnos antes de consultar un horario.                     |
| [bookingSelection.ts](bookingSelection.ts)         | Separa los adicionales del único lavado base elegible.                                               |
| [buildFormSchema.ts](buildFormSchema.ts)           | Genera validación por campo sobre valores de texto del formulario móvil.                             |
| [buttonColors.ts](buttonColors.ts)                 | Resuelve contraste y superficie de variantes sin repetir colores en los botones.                     |
| [calendar.ts](calendar.ts)                         | Valida fecha real de calendario sin normalizar 31 de febrero a otro mes.                             |
| [catalogFields.ts](catalogFields.ts)               | Opciones de tarifa para los tipos registrados; la API valida su vigencia.                            |
| [decorativeSvgProps.ts](decorativeSvgProps.ts)     | Oculta los íconos decorativos sin enviar atributos nativos booleanos al DOM web.                     |
| [editorCommands.ts](editorCommands.ts)             | Construye el guardado; solo cierra el formulario cuando el servidor lo confirma.                     |
| [errorMessage.ts](errorMessage.ts)                 | Traduce fallas de red y errores REST a mensajes presentables.                                        |
| [foreground.ts](foreground.ts)                     | Indica si se puede actualizar sin actividad en segundo plano.                                        |
| [foreground.web.ts](foreground.web.ts)             | Respeta pestañas ocultas; no mantiene despierto el servidor en segundo plano.                        |
| [format.ts](format.ts)                             | Presenta centavos como pesos argentinos sin alterar el valor persistido.                             |
| [makeCatalogCode.ts](makeCatalogCode.ts)           | Código técnico estable para el catálogo; solo se genera durante el alta.                             |
| [navigationOptions.ts](navigationOptions.ts)       | Apariencia común del stack; las pantallas no redefinen colores de navegación.                        |
| [parseApiUrl.ts](parseApiUrl.ts)                   | Valida HTTPS; admite loopback HTTP únicamente cuando el modo de desarrollo lo pide.                  |
| [pendingOAuth.ts](pendingOAuth.ts)                 | Solo almacena PKCE temporal de la pestaña; nunca secretos de proveedores.                            |
| [pesosToCents.ts](pesosToCents.ts)                 | Convierte un importe validado en pesos a centavos, sin multiplicación decimal inexacta.              |
| [profileDestination.ts](profileDestination.ts)     | Selecciona la ruta protegida del perfil de la sesión actual.                                         |
| [queryLifecycle.ts](queryLifecycle.ts)             | Una consulta silenciosa no desmonta listas ni editores del mismo filtro.                             |
| [queryRequest.ts](queryRequest.ts)                 | Construye una consulta con generaciones; solo conserva datos del mismo filtro en recarga silenciosa. |
| [queryState.ts](queryState.ts)                     | Una respuesta siempre conserva la identidad de los filtros que la produjeron.                        |
| [refreshGate.ts](refreshGate.ts)                   | Diferencia el regreso a la vista del sondeo durante su uso.                                          |
| [refreshResources.ts](refreshResources.ts)         | Recarga consultas relacionadas después de una acción o regreso a la pantalla.                        |
| [resetLink.ts](resetLink.ts)                       | Lee un token exclusivamente del fragmento; nunca de la consulta enviada a servidores.                |
| [restoreDestination.ts](restoreDestination.ts)     | Limita el retorno de arranque a pantallas internas permitidas para el rol actual.                    |
| [routeAccess.ts](routeAccess.ts)                   | Resuelve guardas con el rol verificado; durante restauración solo deja rutas públicas.               |
| [scrollVisibility.ts](scrollVisibility.ts)         | Medidas de la región desplazable; los valores se mantienen fuera del estado visual.                  |
| [serviceForm.ts](serviceForm.ts)                   | Serializa campos de servicio; el código permanece estable durante una edición.                       |
| [sessionFailure.ts](sessionFailure.ts)             | Solo un rechazo definitivo de credenciales invalida la sesión local.                                 |
| [settingsForm.ts](settingsForm.ts)                 | Presenta configuración remota como campos de texto sin alterar zona ni moneda.                       |
| [startWebOAuth.ts](startWebOAuth.ts)               | Prepara PKCE y navega en la misma pestaña, sin secretos de proveedor ni popups.                      |
| [toggleChoice.ts](toggleChoice.ts)                 | Agrega/quita una selección; la representación CSV coincide con filtros del contrato REST.            |
| [userForm.ts](userForm.ts)                         | Ofrece roles solo al crear; ninguna edición permite cambiar el rol.                                  |
| [vehicleForm.ts](vehicleForm.ts)                   | Datos propios del vehículo, reutilizados al vincular un turno confirmado.                            |
| [vehicleTypePricing.ts](vehicleTypePricing.ts)     | Filtra la oferta exclusiva de moto frente a las demás categorías.                                    |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
