# utils

Transformaciones puras o infraestructura puntual. Mantener unidades explícitas: centavos, minutos y UTC.

## Archivos y responsabilidades

| Archivo                                            | Responsabilidad                                                                           |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [appointmentListTitle.ts](appointmentListTitle.ts) | Título de la colección según rol e historial, sin reglas de acceso dentro del JSX.        |
| [buildFormSchema.ts](buildFormSchema.ts)           | Genera validación por campo sobre valores de texto del formulario móvil.                  |
| [buttonColors.ts](buttonColors.ts)                 | Resuelve contraste y superficie de variantes sin repetir colores en los botones.          |
| [catalogFields.ts](catalogFields.ts)               | Opciones de tarifa para los tipos registrados; la API valida su vigencia.                 |
| [editorCommands.ts](editorCommands.ts)             | Construye el guardado; solo cierra el formulario cuando el servidor lo confirma.          |
| [errorMessage.ts](errorMessage.ts)                 | Traduce fallas de red y errores REST a mensajes presentables.                             |
| [format.ts](format.ts)                             | Presenta centavos como pesos argentinos sin alterar el valor persistido.                  |
| [makeCatalogCode.ts](makeCatalogCode.ts)           | Código técnico estable para el catálogo; solo se genera durante el alta.                  |
| [navigationOptions.ts](navigationOptions.ts)       | Apariencia común del stack; las pantallas no redefinen colores de navegación.             |
| [parseApiUrl.ts](parseApiUrl.ts)                   | Valida un origen público HTTPS, sin credenciales, rutas ni direcciones locales.           |
| [pendingOAuth.ts](pendingOAuth.ts)                 | Solo almacena PKCE temporal de la pestaña; nunca secretos de proveedores.                 |
| [pesosToCents.ts](pesosToCents.ts)                 | Convierte un importe validado en pesos a centavos, sin multiplicación decimal inexacta.   |
| [routeAccess.ts](routeAccess.ts)                   | Resuelve guardas con el rol verificado; durante restauración solo deja rutas públicas.    |
| [serviceForm.ts](serviceForm.ts)                   | Serializa campos de servicio; el código permanece estable durante una edición.            |
| [settingsForm.ts](settingsForm.ts)                 | Presenta configuración remota como campos de texto sin alterar zona ni moneda.            |
| [startWebOAuth.ts](startWebOAuth.ts)               | Prepara PKCE y navega en la misma pestaña, sin secretos de proveedor ni popups.           |
| [toggleChoice.ts](toggleChoice.ts)                 | Agrega/quita una selección; la representación CSV coincide con filtros del contrato REST. |
| [userForm.ts](userForm.ts)                         | Construye opciones autorizadas; la cuenta propia conserva el rol administrador.           |
| [vehicleForm.ts](vehicleForm.ts)                   | Construye el formulario sin ofrecer selección de titulares a un cliente.                  |

## Mantenimiento

Consultar los TSDoc de cada función antes de cambiar sus precondiciones. Mantener los efectos en su capa y actualizar esta tabla junto con el módulo. Ejecutar npm run check desde la raíz del repositorio.
