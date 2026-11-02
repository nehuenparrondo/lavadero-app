# utils

Transformaciones puras o infraestructura puntual. Mantener unidades explícitas: centavos, minutos y UTC.

## Archivos y responsabilidades

| Archivo                                            | Responsabilidad                                                                           |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [appointmentListTitle.ts](appointmentListTitle.ts) | Título de la colección según rol e historial, sin reglas de acceso dentro del JSX.        |
| [bookingAvailability.ts](bookingAvailability.ts)   | Explica por qué una fecha no puede ofrecer turnos antes de consultar un horario.          |
| [bookingSelection.ts](bookingSelection.ts)         | Deriva opciones y validez sin confiar en identificadores que ya no están disponibles.     |
| [buildFormSchema.ts](buildFormSchema.ts)           | Genera validación por campo sobre valores de texto del formulario móvil.                  |
| [buttonColors.ts](buttonColors.ts)                 | Resuelve contraste y superficie de variantes sin repetir colores en los botones.          |
| [calendar.ts](calendar.ts)                         | Valida fecha real de calendario sin normalizar 31 de febrero a otro mes.                  |
| [catalogFields.ts](catalogFields.ts)               | Opciones de tarifa para los tipos registrados; la API valida su vigencia.                 |
| [editorCommands.ts](editorCommands.ts)             | Construye el guardado; solo cierra el formulario cuando el servidor lo confirma.          |
| [errorMessage.ts](errorMessage.ts)                 | Traduce fallas de red y errores REST a mensajes presentables.                             |
| [format.ts](format.ts)                             | Presenta centavos como pesos argentinos sin alterar el valor persistido.                  |
| [makeCatalogCode.ts](makeCatalogCode.ts)           | Código técnico estable para el catálogo; solo se genera durante el alta.                  |
| [navigationOptions.ts](navigationOptions.ts)       | Apariencia común del stack; las pantallas no redefinen colores de navegación.             |
| [parseApiUrl.ts](parseApiUrl.ts)                   | Valida un origen público HTTPS, sin credenciales, rutas ni direcciones locales.           |
| [pendingOAuth.ts](pendingOAuth.ts)                 | Solo almacena PKCE temporal de la pestaña; nunca secretos de proveedores.                 |
| [pesosToCents.ts](pesosToCents.ts)                 | Convierte un importe validado en pesos a centavos, sin multiplicación decimal inexacta.   |
| [queryState.ts](queryState.ts)                     | Una respuesta siempre conserva la identidad de los filtros que la produjeron.             |
| [refreshResources.ts](refreshResources.ts)         | Recarga consultas relacionadas después de una acción o regreso a la pantalla.             |
| [routeAccess.ts](routeAccess.ts)                   | Resuelve guardas con el rol verificado; durante restauración solo deja rutas públicas.    |
| [serviceForm.ts](serviceForm.ts)                   | Serializa campos de servicio; el código permanece estable durante una edición.            |
| [sessionFailure.ts](sessionFailure.ts)             | Solo un rechazo definitivo de credenciales invalida la sesión local.                      |
| [settingsForm.ts](settingsForm.ts)                 | Presenta configuración remota como campos de texto sin alterar zona ni moneda.            |
| [startWebOAuth.ts](startWebOAuth.ts)               | Prepara PKCE y navega en la misma pestaña, sin secretos de proveedor ni popups.           |
| [toggleChoice.ts](toggleChoice.ts)                 | Agrega/quita una selección; la representación CSV coincide con filtros del contrato REST. |
| [userForm.ts](userForm.ts)                         | Construye opciones autorizadas; la cuenta propia conserva el rol administrador.           |
| [vehicleForm.ts](vehicleForm.ts)                   | Construye el formulario sin ofrecer selección de titulares a un cliente.                  |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
