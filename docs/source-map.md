# Mapa del código fuente

Guía de navegación de todos los archivos TypeScript de producción. Los contratos detallados de parámetros, retorno e invariantes se conservan junto a las funciones; los flujos completos se explican en [code-guide.md](code-guide.md).

Este mapa no ejecuta módulos ni lee variables de entorno. Revisión: 01/11/2026.

## src/api/backendConnection.ts

Espera al servidor antes de enviar credenciales o una operación de escritura.

[Abrir fuente](../src/api/backendConnection.ts)

| Exportación        | Responsabilidad                                                               |
| ------------------ | ----------------------------------------------------------------------------- |
| ensureBackendReady | Espera al servidor antes de enviar credenciales o una operación de escritura. |
| markBackendReady   | Renueva la ventana de disponibilidad con una respuesta JSON válida.           |

## src/api/client.ts

Transporte autenticado; espera disponibilidad antes de enviar una escritura.

[Abrir fuente](../src/api/client.ts)

| Exportación | Responsabilidad                                                              |
| ----------- | ---------------------------------------------------------------------------- |
| apiUrl      | Contrato tipado declarado en la fuente.                                      |
| apiClient   | Transporte autenticado; espera disponibilidad antes de enviar una escritura. |

## src/api/config.ts

Origen público validado; no contiene credenciales.

[Abrir fuente](../src/api/config.ts)

| Exportación | Responsabilidad                                    |
| ----------- | -------------------------------------------------- |
| apiUrl      | Origen público validado; no contiene credenciales. |
| requireApi  | Verifica configuración antes de conectar.          |

## src/api/connectionState.ts

Estado externo de la conexión inicial compartida.

[Abrir fuente](../src/api/connectionState.ts)

| Exportación         | Responsabilidad                                             |
| ------------------- | ----------------------------------------------------------- |
| getConnecting       | Estado externo de la conexión inicial compartida.           |
| subscribeConnection | Suscribe el aviso global sin iniciar tráfico de red.        |
| setConnecting       | Publica transiciones, sin exponer URLs ni errores internos. |

## src/api/readinessGate.ts

Agrupa el despertar del servidor para evitar una solicitud por cada selector.

[Abrir fuente](../src/api/readinessGate.ts)

| Exportación         | Responsabilidad                                                               |
| ------------------- | ----------------------------------------------------------------------------- |
| createReadinessGate | Agrupa el despertar del servidor para evitar una solicitud por cada selector. |

## src/api/renewRequest.ts

Marca la identidad de origen para no repetir peticiones de otra cuenta.

[Abrir fuente](../src/api/renewRequest.ts)

| Exportación       | Responsabilidad                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| AuthRequestConfig | Marca la identidad de origen para no repetir peticiones de otra cuenta.         |
| renewRequest      | Reintenta solo un rechazo 401, conservando sesión en errores de red y servidor. |

## src/api/services/authService.ts

Registro siempre Cliente; rol no forma parte de este contrato.

[Abrir fuente](../src/api/services/authService.ts)

| Exportación    | Responsabilidad                                                          |
| -------------- | ------------------------------------------------------------------------ |
| register       | Registro siempre Cliente; rol no forma parte de este contrato.           |
| login          | Inicio de sesión email/contraseña.                                       |
| refreshSession | Renueva sesión mediante refresh opaco.                                   |
| logout         | Revoca la familia del dispositivo en backend.                            |
| exchangeSocial | Canje OAuth PKCE: el frontend nunca tiene client secrets de proveedores. |
| getProviders   | Estado de habilitación de accesos sociales.                              |
| PublicProfile  | Tipo exportado para formularios de perfil.                               |

## src/api/services/healthService.ts

Comprueba conectividad.

[Abrir fuente](../src/api/services/healthService.ts)

| Exportación  | Responsabilidad         |
| ------------ | ----------------------- |
| getApiHealth | Comprueba conectividad. |

## src/api/services/oauthStartService.ts

Prepara una autorización PKCE por JSON y verifica el destino antes de salir de la app.

[Abrir fuente](../src/api/services/oauthStartService.ts)

| Exportación        | Responsabilidad                                                                        |
| ------------------ | -------------------------------------------------------------------------------------- |
| prepareSocialLogin | Prepara una autorización PKCE por JSON y verifica el destino antes de salir de la app. |

## src/api/services/resourceService.ts

Parámetros de filtros de listas, nunca URLs arbitrarias de terceros.

[Abrir fuente](../src/api/services/resourceService.ts)

| Exportación   | Responsabilidad                                                                      |
| ------------- | ------------------------------------------------------------------------------------ |
| Query         | Parámetros de filtros de listas, nunca URLs arbitrarias de terceros.                 |
| readResource  | Lee una ruta versionada del contrato público.                                        |
| writeResource | Escribe una ruta versionada; componentes delegan a hooks que consumen este servicio. |
| readOptions   | Carga opciones de formularios paginadas sin truncar a los primeros cien registros.   |

## src/api/services/restoreSession.ts

Restaura la sesión segura sin publicar resultados de un proveedor desmontado.

[Abrir fuente](../src/api/services/restoreSession.ts)

| Exportación    | Responsabilidad                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| restoreSession | Restaura la sesión segura sin publicar resultados de un proveedor desmontado. |

## src/api/services/sessionActions.ts

Persiste el refresh antes de publicar la sesión para sus consumidores.

[Abrir fuente](../src/api/services/sessionActions.ts)

| Exportación | Responsabilidad                                                                        |
| ----------- | -------------------------------------------------------------------------------------- |
| accept      | Persiste el refresh antes de publicar la sesión para sus consumidores.                 |
| signOut     | Elimina primero el acceso local y después intenta revocar su familia en el backend.    |
| reloadUser  | Recarga el perfil propio después de editar, sin reemplazar las credenciales de sesión. |

## src/api/services/userService.ts

Alta o edición administrativa; los cambios de rol tienen endpoint independiente.

[Abrir fuente](../src/api/services/userService.ts)

| Exportación | Responsabilidad                                                                  |
| ----------- | -------------------------------------------------------------------------------- |
| saveUser    | Alta o edición administrativa; los cambios de rol tienen endpoint independiente. |

## src/api/sessionStorage.ts

Lee refresh del dispositivo. Web de demostración usa solo sessionStorage de la pestaña.

[Abrir fuente](../src/api/sessionStorage.ts)

| Exportación   | Responsabilidad                                                                         |
| ------------- | --------------------------------------------------------------------------------------- |
| readRefresh   | Lee refresh del dispositivo. Web de demostración usa solo sessionStorage de la pestaña. |
| storeRefresh  | Persiste solo refresh; access token y perfil se mantienen en memoria.                   |
| deleteRefresh | Elimina sesión persistida del dispositivo.                                              |

## src/api/sessionStore.ts

Lee sesión solo en memoria; componentes consumen AuthContext.

[Abrir fuente](../src/api/sessionStore.ts)

| Exportación      | Responsabilidad                                                                       |
| ---------------- | ------------------------------------------------------------------------------------- |
| getSession       | Lee sesión solo en memoria; componentes consumen AuthContext.                         |
| setSession       | Publica cambios de sesión para que guardas y navegación reaccionen a nuevos permisos. |
| subscribeSession | Suscribe estado global y devuelve limpieza.                                           |

## src/api/transport.ts

Transporte público; la preparación de conexión nunca reenvía una mutación.

[Abrir fuente](../src/api/transport.ts)

| Exportación     | Responsabilidad                                                            |
| --------------- | -------------------------------------------------------------------------- |
| apiUrl          | Contrato tipado declarado en la fuente.                                    |
| requireApi      | Contrato tipado declarado en la fuente.                                    |
| publicTransport | Transporte público; la preparación de conexión nunca reenvía una mutación. |

## src/api/validateResponse.ts

Impide interpretar HTML de arranque o proxy como datos de negocio.

[Abrir fuente](../src/api/validateResponse.ts)

| Exportación      | Responsabilidad                                                    |
| ---------------- | ------------------------------------------------------------------ |
| validateResponse | Impide interpretar HTML de arranque o proxy como datos de negocio. |

## src/app/(admin)/_layout.tsx

Mantiene rutas administrativas separadas; Screen aporta el marco visual adaptable.

[Abrir fuente](<../src/app/(admin)/_layout.tsx>)

| Exportación | Responsabilidad                                                                    |
| ----------- | ---------------------------------------------------------------------------------- |
| AdminLayout | Mantiene rutas administrativas separadas; Screen aporta el marco visual adaptable. |

## src/app/(admin)/appointments.tsx

Vista administrativa de todos los turnos.

[Abrir fuente](<../src/app/(admin)/appointments.tsx>)

| Exportación       | Responsabilidad                           |
| ----------------- | ----------------------------------------- |
| AdminAppointments | Vista administrativa de todos los turnos. |

## src/app/(admin)/dashboard.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](<../src/app/(admin)/dashboard.tsx>)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/(admin)/profile.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](<../src/app/(admin)/profile.tsx>)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/(admin)/reports.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](<../src/app/(admin)/reports.tsx>)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/(admin)/services.tsx

Administración del catálogo y precios.

[Abrir fuente](<../src/app/(admin)/services.tsx>)

| Exportación   | Responsabilidad                        |
| ------------- | -------------------------------------- |
| AdminServices | Administración del catálogo y precios. |

## src/app/(admin)/settings.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](<../src/app/(admin)/settings.tsx>)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/(admin)/users.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](<../src/app/(admin)/users.tsx>)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/(admin)/vehicles.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](<../src/app/(admin)/vehicles.tsx>)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/(client)/_layout.tsx

Cinco destinos del cliente, protegidos por el layout raíz.

[Abrir fuente](<../src/app/(client)/_layout.tsx>)

| Exportación  | Responsabilidad                                            |
| ------------ | ---------------------------------------------------------- |
| ClientLayout | Cinco destinos del cliente, protegidos por el layout raíz. |

## src/app/(client)/appointments.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](<../src/app/(client)/appointments.tsx>)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/(client)/home.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](<../src/app/(client)/home.tsx>)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/(client)/profile.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](<../src/app/(client)/profile.tsx>)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/(client)/services.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](<../src/app/(client)/services.tsx>)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/(client)/vehicles.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](<../src/app/(client)/vehicles.tsx>)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/(employee)/_layout.tsx

Agenda, historial y perfil del empleado.

[Abrir fuente](<../src/app/(employee)/_layout.tsx>)

| Exportación    | Responsabilidad                          |
| -------------- | ---------------------------------------- |
| EmployeeLayout | Agenda, historial y perfil del empleado. |

## src/app/(employee)/agenda.tsx

Ruta del equipo, restringida por la guarda de grupo y el servidor.

[Abrir fuente](<../src/app/(employee)/agenda.tsx>)

| Exportación | Responsabilidad                                                    |
| ----------- | ------------------------------------------------------------------ |
| Agenda      | Ruta del equipo, restringida por la guarda de grupo y el servidor. |

## src/app/(employee)/history.tsx

Ruta del equipo, restringida por la guarda de grupo y el servidor.

[Abrir fuente](<../src/app/(employee)/history.tsx>)

| Exportación | Responsabilidad                                                    |
| ----------- | ------------------------------------------------------------------ |
| History     | Ruta del equipo, restringida por la guarda de grupo y el servidor. |

## src/app/(employee)/profile.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](<../src/app/(employee)/profile.tsx>)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/_layout.tsx

Raíz Expo Router: proveedores separados de rutas y pantallas.

[Abrir fuente](../src/app/_layout.tsx)

| Exportación   | Responsabilidad                                                  |
| ------------- | ---------------------------------------------------------------- |
| RootLayout    | Raíz Expo Router: proveedores separados de rutas y pantallas.    |
| ErrorBoundary | Export reservado para que Router gestione errores de navegación. |

## src/app/appointment/[id].tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](../src/app/appointment/[id].tsx)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/booking.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](../src/app/booking.tsx)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/index.tsx

Entrada dirige al árbol del rol autorizado.

[Abrir fuente](../src/app/index.tsx)

| Exportación | Responsabilidad                             |
| ----------- | ------------------------------------------- |
| Index       | Entrada dirige al árbol del rol autorizado. |

## src/app/loading.tsx

Mantiene el navegador montado mientras se restaura y verifica la sesión.

[Abrir fuente](../src/app/loading.tsx)

| Exportación  | Responsabilidad                                                          |
| ------------ | ------------------------------------------------------------------------ |
| LoadingRoute | Mantiene el navegador montado mientras se restaura y verifica la sesión. |

## src/app/oauth.tsx

Destino nativo de AuthSession; el popup devuelve el código al hook iniciador.

[Abrir fuente](../src/app/oauth.tsx)

| Exportación | Responsabilidad                                                               |
| ----------- | ----------------------------------------------------------------------------- |
| OAuthReturn | Destino nativo de AuthSession; el popup devuelve el código al hook iniciador. |

## src/app/oauth.web.tsx

Retorno web en la misma pestaña; el APK usa oauth.tsx y AuthSession nativo.

[Abrir fuente](../src/app/oauth.web.tsx)

| Exportación    | Responsabilidad                                                             |
| -------------- | --------------------------------------------------------------------------- |
| WebOAuthReturn | Retorno web en la misma pestaña; el APK usa oauth.tsx y AuthSession nativo. |

## src/app/sign-in.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](../src/app/sign-in.tsx)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/app/sign-up.tsx

Composición interna del módulo; consultar sus contratos de tipos.

[Abrir fuente](../src/app/sign-up.tsx)

| Exportación | Responsabilidad                         |
| ----------- | --------------------------------------- |
| default     | Contrato tipado declarado en la fuente. |

## src/components/atoms/AppIcon.tsx

Ícono vectorial decorativo; la acción contenedora debe aportar su nombre accesible.

[Abrir fuente](../src/components/atoms/AppIcon.tsx)

| Exportación | Responsabilidad                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| AppIcon     | Ícono vectorial decorativo; la acción contenedora debe aportar su nombre accesible. |

## src/components/atoms/Avatar.tsx

Foto opcional o iniciales del perfil, sin datos de otros clientes.

[Abrir fuente](../src/components/atoms/Avatar.tsx)

| Exportación | Responsabilidad                                                    |
| ----------- | ------------------------------------------------------------------ |
| Avatar      | Foto opcional o iniciales del perfil, sin datos de otros clientes. |

## src/components/atoms/Badge.tsx

Etiqueta compacta con tono semántico.

[Abrir fuente](../src/components/atoms/Badge.tsx)

| Exportación | Responsabilidad                       |
| ----------- | ------------------------------------- |
| Badge       | Etiqueta compacta con tono semántico. |

## src/components/atoms/Button.tsx

Contrato de una acción. El callback no se ejecuta mientras carga o está deshabilitada.

[Abrir fuente](../src/components/atoms/Button.tsx)

| Exportación | Responsabilidad                                                                        |
| ----------- | -------------------------------------------------------------------------------------- |
| ButtonProps | Contrato de una acción. El callback no se ejecuta mientras carga o está deshabilitada. |
| Button      | Acción de 48 puntos con texto, ícono opcional y estado ocupado accesible.              |

## src/components/atoms/ButtonContent.tsx

Contenido visual del botón, independiente de Pressable y de su política de interacción.

[Abrir fuente](../src/components/atoms/ButtonContent.tsx)

| Exportación   | Responsabilidad                                                                         |
| ------------- | --------------------------------------------------------------------------------------- |
| ButtonContent | Contenido visual del botón, independiente de Pressable y de su política de interacción. |

## src/components/atoms/FloatingAction.tsx

Acción circular con nombre accesible y contraste adaptado al tema.

[Abrir fuente](../src/components/atoms/FloatingAction.tsx)

| Exportación    | Responsabilidad                                                    |
| -------------- | ------------------------------------------------------------------ |
| FloatingAction | Acción circular con nombre accesible y contraste adaptado al tema. |

## src/components/atoms/Icon.tsx

Símbolo decorativo; el control que lo contiene aporta la etiqueta accesible.

[Abrir fuente](../src/components/atoms/Icon.tsx)

| Exportación | Responsabilidad                                                              |
| ----------- | ---------------------------------------------------------------------------- |
| Icon        | Símbolo decorativo; el control que lo contiene aporta la etiqueta accesible. |

## src/components/atoms/Input.tsx

Entrada controlada accesible, con tema y altura táctil suficiente.

[Abrir fuente](../src/components/atoms/Input.tsx)

| Exportación | Responsabilidad                                                    |
| ----------- | ------------------------------------------------------------------ |
| Input       | Entrada controlada accesible, con tema y altura táctil suficiente. |

## src/components/atoms/Spinner.tsx

Indicador de espera con color semántico y descripción accesible.

[Abrir fuente](../src/components/atoms/Spinner.tsx)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| Spinner     | Indicador de espera con color semántico y descripción accesible. |

## src/components/atoms/Text.tsx

Texto con color semántico y tamaño consistente.

[Abrir fuente](../src/components/atoms/Text.tsx)

| Exportación | Responsabilidad                                 |
| ----------- | ----------------------------------------------- |
| Text        | Texto con color semántico y tamaño consistente. |

## src/components/molecules/AppointmentCardFooter.tsx

La ausencia de importe significa falta de permiso, nunca un total cero.

[Abrir fuente](../src/components/molecules/AppointmentCardFooter.tsx)

| Exportación           | Responsabilidad                                                         |
| --------------------- | ----------------------------------------------------------------------- |
| AppointmentCardFooter | La ausencia de importe significa falta de permiso, nunca un total cero. |

## src/components/molecules/AppointmentVehicle.tsx

Datos operativos presentes en la proyección de todos los roles.

[Abrir fuente](../src/components/molecules/AppointmentVehicle.tsx)

| Exportación        | Responsabilidad                                                 |
| ------------------ | --------------------------------------------------------------- |
| AppointmentVehicle | Datos operativos presentes en la proyección de todos los roles. |

## src/components/molecules/AvailableSlots.tsx

Horarios ya validados por el servidor y estado vacío cuando la fecha está completa.

[Abrir fuente](../src/components/molecules/AvailableSlots.tsx)

| Exportación    | Responsabilidad                                                                     |
| -------------- | ----------------------------------------------------------------------------------- |
| AvailableSlots | Horarios ya validados por el servidor y estado vacío cuando la fecha está completa. |

## src/components/molecules/BrandLockup.tsx

Firma de marca compacta para acceso, menú y cabecera.

[Abrir fuente](../src/components/molecules/BrandLockup.tsx)

| Exportación | Responsabilidad                                       |
| ----------- | ----------------------------------------------------- |
| BrandLockup | Firma de marca compacta para acceso, menú y cabecera. |

## src/components/molecules/CalendarDay.tsx

Celda táctil del calendario o espacio vacío de la semana.

[Abrir fuente](../src/components/molecules/CalendarDay.tsx)

| Exportación | Responsabilidad                                           |
| ----------- | --------------------------------------------------------- |
| CalendarDay | Celda táctil del calendario o espacio vacío de la semana. |

## src/components/molecules/CalendarGrid.tsx

Seis semanas de calendario, compartidas por web y dispositivos nativos.

[Abrir fuente](../src/components/molecules/CalendarGrid.tsx)

| Exportación  | Responsabilidad                                                         |
| ------------ | ----------------------------------------------------------------------- |
| CalendarGrid | Seis semanas de calendario, compartidas por web y dispositivos nativos. |

## src/components/molecules/CalendarNavigation.tsx

Cambia el mes visible sin modificar la fecha del formulario.

[Abrir fuente](../src/components/molecules/CalendarNavigation.tsx)

| Exportación        | Responsabilidad                                              |
| ------------------ | ------------------------------------------------------------ |
| CalendarNavigation | Cambia el mes visible sin modificar la fecha del formulario. |

## src/components/molecules/Card.tsx

Superficie neutra para agrupar información; el estilo permite componer grids sin duplicarla.

[Abrir fuente](../src/components/molecules/Card.tsx)

| Exportación | Responsabilidad                                                                              |
| ----------- | -------------------------------------------------------------------------------------------- |
| Card        | Superficie neutra para agrupar información; el estilo permite componer grids sin duplicarla. |

## src/components/molecules/CareGuide.tsx

Ayuda basada en funciones existentes, sin prometer servicios ni tiempos fijos.

[Abrir fuente](../src/components/molecules/CareGuide.tsx)

| Exportación | Responsabilidad                                                                |
| ----------- | ------------------------------------------------------------------------------ |
| CareGuide   | Ayuda basada en funciones existentes, sin prometer servicios ni tiempos fijos. |

## src/components/molecules/ChoiceButton.tsx

Opción táctil con estado seleccionado accesible y contraste del tema.

[Abrir fuente](../src/components/molecules/ChoiceButton.tsx)

| Exportación  | Responsabilidad                                                       |
| ------------ | --------------------------------------------------------------------- |
| ChoiceButton | Opción táctil con estado seleccionado accesible y contraste del tema. |

## src/components/molecules/ChoiceGroup.tsx

Selector simple o múltiple; delega apariencia y transformación en piezas independientes.

[Abrir fuente](../src/components/molecules/ChoiceGroup.tsx)

| Exportación | Responsabilidad                                                                          |
| ----------- | ---------------------------------------------------------------------------------------- |
| Choice      | Contrato tipado declarado en la fuente.                                                  |
| ChoiceGroup | Selector simple o múltiple; delega apariencia y transformación en piezas independientes. |

## src/components/molecules/ConnectionNotice.tsx

Aviso global durante el arranque, sin sacar al usuario de su pantalla.

[Abrir fuente](../src/components/molecules/ConnectionNotice.tsx)

| Exportación      | Responsabilidad                                                        |
| ---------------- | ---------------------------------------------------------------------- |
| ConnectionNotice | Aviso global durante el arranque, sin sacar al usuario de su pantalla. |

## src/components/molecules/ConnectionStatus.tsx

Estado real de red.

[Abrir fuente](../src/components/molecules/ConnectionStatus.tsx)

| Exportación      | Responsabilidad     |
| ---------------- | ------------------- |
| ConnectionStatus | Estado real de red. |

## src/components/molecules/ContractServiceLines.tsx

Servicios históricos; solo muestra importes que el servidor incluyó en la proyección del rol.

[Abrir fuente](../src/components/molecules/ContractServiceLines.tsx)

| Exportación          | Responsabilidad                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------- |
| ContractServiceLines | Servicios históricos; solo muestra importes que el servidor incluyó en la proyección del rol. |

## src/components/molecules/ControlledField.tsx

Adapta un campo RHF a la molécula de entrada, incluyendo errores y blur.

[Abrir fuente](../src/components/molecules/ControlledField.tsx)

| Exportación     | Responsabilidad                                                          |
| --------------- | ------------------------------------------------------------------------ |
| ControlledField | Adapta un campo RHF a la molécula de entrada, incluyendo errores y blur. |

## src/components/molecules/ControlledScrollView.tsx

Asocia medidas y referencia con un controlador sin introducir otra región desplazable.

[Abrir fuente](../src/components/molecules/ControlledScrollView.tsx)

| Exportación          | Responsabilidad                                                                        |
| -------------------- | -------------------------------------------------------------------------------------- |
| ControlledScrollView | Asocia medidas y referencia con un controlador sin introducir otra región desplazable. |

## src/components/molecules/DateInput.tsx

Selección de fecha mediante calendario, con valor ISO separado de su presentación.

[Abrir fuente](../src/components/molecules/DateInput.tsx)

| Exportación | Responsabilidad                                                                    |
| ----------- | ---------------------------------------------------------------------------------- |
| DateInput   | Selección de fecha mediante calendario, con valor ISO separado de su presentación. |

## src/components/molecules/EmptyState.tsx

Explica una colección vacía sin confundirla con carga o error de red.

[Abrir fuente](../src/components/molecules/EmptyState.tsx)

| Exportación | Responsabilidad                                                       |
| ----------- | --------------------------------------------------------------------- |
| EmptyState  | Explica una colección vacía sin confundirla con carga o error de red. |

## src/components/molecules/FieldInput.tsx

Ajusta teclado y privacidad según el tipo semántico del campo.

[Abrir fuente](../src/components/molecules/FieldInput.tsx)

| Exportación | Responsabilidad                                                |
| ----------- | -------------------------------------------------------------- |
| FieldInput  | Ajusta teclado y privacidad según el tipo semántico del campo. |

## src/components/molecules/FloatingControls.tsx

Controles persistentes abajo a la derecha; volver arriba aparece solo cuando es útil.

[Abrir fuente](../src/components/molecules/FloatingControls.tsx)

| Exportación      | Responsabilidad                                                                       |
| ---------------- | ------------------------------------------------------------------------------------- |
| FloatingControls | Controles persistentes abajo a la derecha; volver arriba aparece solo cuando es útil. |

## src/components/molecules/FormField.tsx

Label, entrada y error, con selectors legibles para campos enumerados.

[Abrir fuente](../src/components/molecules/FormField.tsx)

| Exportación | Responsabilidad                                                        |
| ----------- | ---------------------------------------------------------------------- |
| FormField   | Label, entrada y error, con selectors legibles para campos enumerados. |

## src/components/molecules/LoadingState.tsx

Estado visible mientras se verifica sesión o se carga una lista.

[Abrir fuente](../src/components/molecules/LoadingState.tsx)

| Exportación  | Responsabilidad                                                  |
| ------------ | ---------------------------------------------------------------- |
| LoadingState | Estado visible mientras se verifica sesión o se carga una lista. |

## src/components/molecules/MetricTile.tsx

Indicador de solo lectura; recibe valores reales o un guion mientras no hay respuesta.

[Abrir fuente](../src/components/molecules/MetricTile.tsx)

| Exportación | Responsabilidad                                                                        |
| ----------- | -------------------------------------------------------------------------------------- |
| MetricTile  | Indicador de solo lectura; recibe valores reales o un guion mientras no hay respuesta. |

## src/components/molecules/Notice.tsx

Mensaje de error/éxito anunciado a lectores de pantalla.

[Abrir fuente](../src/components/molecules/Notice.tsx)

| Exportación | Responsabilidad                                          |
| ----------- | -------------------------------------------------------- |
| Notice      | Mensaje de error/éxito anunciado a lectores de pantalla. |

## src/components/molecules/OpeningHoursCard.tsx

Muestra el horario confirmado y el estado real de conexión.

[Abrir fuente](../src/components/molecules/OpeningHoursCard.tsx)

| Exportación      | Responsabilidad                                             |
| ---------------- | ----------------------------------------------------------- |
| OpeningHoursCard | Muestra el horario confirmado y el estado real de conexión. |

## src/components/molecules/OverviewColumns.tsx

Composición 2:1 apilada cuando no hay espacio suficiente para dos columnas.

[Abrir fuente](../src/components/molecules/OverviewColumns.tsx)

| Exportación     | Responsabilidad                                                             |
| --------------- | --------------------------------------------------------------------------- |
| OverviewColumns | Composición 2:1 apilada cuando no hay espacio suficiente para dos columnas. |

## src/components/molecules/PageHeading.tsx

Portada con contexto y una acción principal, adaptable al ancho y a la escala de texto.

[Abrir fuente](../src/components/molecules/PageHeading.tsx)

| Exportación | Responsabilidad                                                                         |
| ----------- | --------------------------------------------------------------------------------------- |
| PageHeading | Portada con contexto y una acción principal, adaptable al ancho y a la escala de texto. |

## src/components/molecules/Pagination.tsx

Navegación de listas grandes sin perder búsqueda y filtros.

[Abrir fuente](../src/components/molecules/Pagination.tsx)

| Exportación | Responsabilidad                                             |
| ----------- | ----------------------------------------------------------- |
| Pagination  | Navegación de listas grandes sin perder búsqueda y filtros. |

## src/components/molecules/QuickAction.tsx

Acceso a un recorrido existente; toda la tarjeta mantiene un único objetivo táctil.

[Abrir fuente](../src/components/molecules/QuickAction.tsx)

| Exportación | Responsabilidad                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| QuickAction | Acceso a un recorrido existente; toda la tarjeta mantiene un único objetivo táctil. |

## src/components/molecules/QuotedTotal.tsx

Total y duración estimados exactamente como los devuelve la cotización del servidor.

[Abrir fuente](../src/components/molecules/QuotedTotal.tsx)

| Exportación | Responsabilidad                                                                      |
| ----------- | ------------------------------------------------------------------------------------ |
| QuotedTotal | Total y duración estimados exactamente como los devuelve la cotización del servidor. |

## src/components/molecules/ResponsiveGrid.tsx

Cuadrícula de dos columnas que conserva las claves y el orden de los elementos.

[Abrir fuente](../src/components/molecules/ResponsiveGrid.tsx)

| Exportación    | Responsabilidad                                                                 |
| -------------- | ------------------------------------------------------------------------------- |
| ResponsiveGrid | Cuadrícula de dos columnas que conserva las claves y el orden de los elementos. |

## src/components/molecules/RevenueBar.tsx

Barra con cifra explícita para no depender de color o longitud.

[Abrir fuente](../src/components/molecules/RevenueBar.tsx)

| Exportación | Responsabilidad                                                 |
| ----------- | --------------------------------------------------------------- |
| RevenueBar  | Barra con cifra explícita para no depender de color o longitud. |

## src/components/molecules/SearchBar.tsx

Búsqueda controlada, con etiqueta accesible y teclado de búsqueda.

[Abrir fuente](../src/components/molecules/SearchBar.tsx)

| Exportación | Responsabilidad                                                    |
| ----------- | ------------------------------------------------------------------ |
| SearchBar   | Búsqueda controlada, con etiqueta accesible y teclado de búsqueda. |

## src/components/molecules/SectionHeader.tsx

Jerarquía de sección, separada de la portada principal de cada experiencia.

[Abrir fuente](../src/components/molecules/SectionHeader.tsx)

| Exportación   | Responsabilidad                                                             |
| ------------- | --------------------------------------------------------------------------- |
| SectionHeader | Jerarquía de sección, separada de la portada principal de cada experiencia. |

## src/components/molecules/ServiceCard.tsx

Servicio con descripción, duración y tarifa del tipo seleccionado.

[Abrir fuente](../src/components/molecules/ServiceCard.tsx)

| Exportación | Responsabilidad                                                    |
| ----------- | ------------------------------------------------------------------ |
| ServiceCard | Servicio con descripción, duración y tarifa del tipo seleccionado. |

## src/components/molecules/SidebarLink.tsx

Destino lateral con selección persistente y respuesta de hover/teclado del Pressable.

[Abrir fuente](../src/components/molecules/SidebarLink.tsx)

| Exportación | Responsabilidad                                                                       |
| ----------- | ------------------------------------------------------------------------------------- |
| SidebarLink | Destino lateral con selección persistente y respuesta de hover/teclado del Pressable. |

## src/components/molecules/StatusBadge.tsx

Traducciones estables del flujo de trabajo.

[Abrir fuente](../src/components/molecules/StatusBadge.tsx)

| Exportación  | Responsabilidad                                                      |
| ------------ | -------------------------------------------------------------------- |
| statusLabels | Traducciones estables del flujo de trabajo.                          |
| StatusBadge  | Estado de turno con color y texto, sin depender solamente del color. |

## src/components/molecules/VehicleTypeItem.tsx

Categoría y acciones del catálogo; una baja lógica conserva el nombre visible en el historial.

[Abrir fuente](../src/components/molecules/VehicleTypeItem.tsx)

| Exportación     | Responsabilidad                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------- |
| VehicleTypeItem | Categoría y acciones del catálogo; una baja lógica conserva el nombre visible en el historial. |

## src/components/molecules/WashIllustration.tsx

Ilustración vectorial decorativa del servicio; no representa un vehículo del cliente.

[Abrir fuente](../src/components/molecules/WashIllustration.tsx)

| Exportación      | Responsabilidad                                                                       |
| ---------------- | ------------------------------------------------------------------------------------- |
| WashIllustration | Ilustración vectorial decorativa del servicio; no representa un vehículo del cliente. |

## src/components/molecules/WorkdayGuide.tsx

Ayuda operacional; las acciones reales siguen en el detalle del turno.

[Abrir fuente](../src/components/molecules/WorkdayGuide.tsx)

| Exportación  | Responsabilidad                                                        |
| ------------ | ---------------------------------------------------------------------- |
| WorkdayGuide | Ayuda operacional; las acciones reales siguen en el detalle del turno. |

## src/components/molecules/WorkspaceIdentity.tsx

Nombre y rol de la sesión propia sobre fondos claros u oscuros.

[Abrir fuente](../src/components/molecules/WorkspaceIdentity.tsx)

| Exportación       | Responsabilidad                                                 |
| ----------------- | --------------------------------------------------------------- |
| WorkspaceIdentity | Nombre y rol de la sesión propia sobre fondos claros u oscuros. |

## src/components/molecules/WorkspaceUser.tsx

Acceso al perfil desde toda la identidad, tanto en cabecera como en barra lateral.

[Abrir fuente](../src/components/molecules/WorkspaceUser.tsx)

| Exportación   | Responsabilidad                                                                    |
| ------------- | ---------------------------------------------------------------------------------- |
| WorkspaceUser | Acceso al perfil desde toda la identidad, tanto en cabecera como en barra lateral. |

## src/components/organisms/AdminMenu.tsx

Menú administrativo móvil basado en el mismo catálogo que la barra lateral.

[Abrir fuente](../src/components/organisms/AdminMenu.tsx)

| Exportación | Responsabilidad                                                             |
| ----------- | --------------------------------------------------------------------------- |
| AdminMenu   | Menú administrativo móvil basado en el mismo catálogo que la barra lateral. |

## src/components/organisms/AdminQuickActions.tsx

Accesos operativos que complementan la navegación administrativa.

[Abrir fuente](../src/components/organisms/AdminQuickActions.tsx)

| Exportación       | Responsabilidad                                                   |
| ----------------- | ----------------------------------------------------------------- |
| AdminQuickActions | Accesos operativos que complementan la navegación administrativa. |

## src/components/organisms/AppointmentActions.tsx

Acciones del rol visible; el servidor vuelve a validarlas con propiedad/asignación.

[Abrir fuente](../src/components/organisms/AppointmentActions.tsx)

| Exportación        | Responsabilidad                                                                     |
| ------------------ | ----------------------------------------------------------------------------------- |
| AppointmentActions | Acciones del rol visible; el servidor vuelve a validarlas con propiedad/asignación. |

## src/components/organisms/AppointmentAssignment.tsx

Asigna un empleado activo sin mezclar esa acción con confirmar el turno.

[Abrir fuente](../src/components/organisms/AppointmentAssignment.tsx)

| Exportación           | Responsabilidad                                                          |
| --------------------- | ------------------------------------------------------------------------ |
| AppointmentAssignment | Asigna un empleado activo sin mezclar esa acción con confirmar el turno. |

## src/components/organisms/AppointmentCancellationDialog.tsx

Solicita motivo y confirma la cancelación mediante el comando del turno.

[Abrir fuente](../src/components/organisms/AppointmentCancellationDialog.tsx)

| Exportación                   | Responsabilidad                                                          |
| ----------------------------- | ------------------------------------------------------------------------ |
| AppointmentCancellationDialog | Solicita motivo y confirma la cancelación mediante el comando del turno. |

## src/components/organisms/AppointmentCard.tsx

Resumen compartido por los tres roles; no amplía los datos recibidos de la API.

[Abrir fuente](../src/components/organisms/AppointmentCard.tsx)

| Exportación     | Responsabilidad                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| AppointmentCard | Resumen compartido por los tres roles; no amplía los datos recibidos de la API. |

## src/components/organisms/AppointmentClientFilter.tsx

Selector administrativo de titular; no se ofrece a otros roles.

[Abrir fuente](../src/components/organisms/AppointmentClientFilter.tsx)

| Exportación             | Responsabilidad                                                 |
| ----------------------- | --------------------------------------------------------------- |
| AppointmentClientFilter | Selector administrativo de titular; no se ofrece a otros roles. |

## src/components/organisms/AppointmentDialogs.tsx

Confirmaciones, cobro y comprobante histórico sin exponer datos de otros turnos.

[Abrir fuente](../src/components/organisms/AppointmentDialogs.tsx)

| Exportación        | Responsabilidad                                                                  |
| ------------------ | -------------------------------------------------------------------------------- |
| AppointmentDialogs | Confirmaciones, cobro y comprobante histórico sin exponer datos de otros turnos. |

## src/components/organisms/AppointmentEmployeeFilter.tsx

Selector administrativo de empleado para restringir la consulta de turnos.

[Abrir fuente](../src/components/organisms/AppointmentEmployeeFilter.tsx)

| Exportación               | Responsabilidad                                                            |
| ------------------------- | -------------------------------------------------------------------------- |
| AppointmentEmployeeFilter | Selector administrativo de empleado para restringir la consulta de turnos. |

## src/components/organisms/AppointmentFilters.tsx

Filtros por experiencia; cliente no puede seleccionar titulares ajenos.

[Abrir fuente](../src/components/organisms/AppointmentFilters.tsx)

| Exportación        | Responsabilidad                                                         |
| ------------------ | ----------------------------------------------------------------------- |
| AppointmentFilters | Filtros por experiencia; cliente no puede seleccionar titulares ajenos. |

## src/components/organisms/AppointmentInformation.tsx

Presenta el contrato del lavado sin modificar la reserva.

[Abrir fuente](../src/components/organisms/AppointmentInformation.tsx)

| Exportación            | Responsabilidad                                           |
| ---------------------- | --------------------------------------------------------- |
| AppointmentInformation | Presenta el contrato del lavado sin modificar la reserva. |

## src/components/organisms/AppointmentList.tsx

Compone la página actual y distingue carga, error y ausencia de turnos.

[Abrir fuente](../src/components/organisms/AppointmentList.tsx)

| Exportación     | Responsabilidad                                                         |
| --------------- | ----------------------------------------------------------------------- |
| AppointmentList | Compone la página actual y distingue carga, error y ausencia de turnos. |

## src/components/organisms/AppointmentNotes.tsx

Lista observaciones de trabajo y conecta la carga de una nueva nota.

[Abrir fuente](../src/components/organisms/AppointmentNotes.tsx)

| Exportación      | Responsabilidad                                                      |
| ---------------- | -------------------------------------------------------------------- |
| AppointmentNotes | Lista observaciones de trabajo y conecta la carga de una nueva nota. |

## src/components/organisms/AppointmentPagination.tsx

Adapta la paginación del recurso sin repetirla entre experiencias.

[Abrir fuente](../src/components/organisms/AppointmentPagination.tsx)

| Exportación           | Responsabilidad                                                    |
| --------------------- | ------------------------------------------------------------------ |
| AppointmentPagination | Adapta la paginación del recurso sin repetirla entre experiencias. |

## src/components/organisms/AppointmentPaymentAction.tsx

Ofrece registrar cobro solo con las capacidades vigentes.

[Abrir fuente](../src/components/organisms/AppointmentPaymentAction.tsx)

| Exportación              | Responsabilidad                                           |
| ------------------------ | --------------------------------------------------------- |
| AppointmentPaymentAction | Ofrece registrar cobro solo con las capacidades vigentes. |

## src/components/organisms/AppointmentPaymentDialog.tsx

Recoge importe, medio y referencia para registrar un cobro idempotente.

[Abrir fuente](../src/components/organisms/AppointmentPaymentDialog.tsx)

| Exportación              | Responsabilidad                                                         |
| ------------------------ | ----------------------------------------------------------------------- |
| AppointmentPaymentDialog | Recoge importe, medio y referencia para registrar un cobro idempotente. |

## src/components/organisms/AppointmentPayments.tsx

Muestra cobros registrados y saldo de la proyección autorizada.

[Abrir fuente](../src/components/organisms/AppointmentPayments.tsx)

| Exportación         | Responsabilidad                                                 |
| ------------------- | --------------------------------------------------------------- |
| AppointmentPayments | Muestra cobros registrados y saldo de la proyección autorizada. |

## src/components/organisms/AppointmentReceiptDialog.tsx

Presenta el comprobante histórico; no constituye factura fiscal.

[Abrir fuente](../src/components/organisms/AppointmentReceiptDialog.tsx)

| Exportación              | Responsabilidad                                                  |
| ------------------------ | ---------------------------------------------------------------- |
| AppointmentReceiptDialog | Presenta el comprobante histórico; no constituye factura fiscal. |

## src/components/organisms/AppointmentResults.tsx

Contenido de listado separado del ciclo de actualización de la pantalla.

[Abrir fuente](../src/components/organisms/AppointmentResults.tsx)

| Exportación        | Responsabilidad                                                          |
| ------------------ | ------------------------------------------------------------------------ |
| AppointmentResults | Contenido de listado separado del ciclo de actualización de la pantalla. |

## src/components/organisms/AppointmentStatusEditor.tsx

Expone las transiciones administrativas que el servidor vuelve a validar.

[Abrir fuente](../src/components/organisms/AppointmentStatusEditor.tsx)

| Exportación             | Responsabilidad                                                           |
| ----------------------- | ------------------------------------------------------------------------- |
| AppointmentStatusEditor | Expone las transiciones administrativas que el servidor vuelve a validar. |

## src/components/organisms/AppointmentStatusFilter.tsx

Filtra la consulta por estado sin cambiar ningún turno.

[Abrir fuente](../src/components/organisms/AppointmentStatusFilter.tsx)

| Exportación             | Responsabilidad                                         |
| ----------------------- | ------------------------------------------------------- |
| AppointmentStatusFilter | Filtra la consulta por estado sin cambiar ningún turno. |

## src/components/organisms/BookingClientField.tsx

Selecciona titular para una reserva asistida por administración.

[Abrir fuente](../src/components/organisms/BookingClientField.tsx)

| Exportación        | Responsabilidad                                                  |
| ------------------ | ---------------------------------------------------------------- |
| BookingClientField | Selecciona titular para una reserva asistida por administración. |

## src/components/organisms/BookingInvitation.tsx

Composición de la acción principal del cliente, sin información comercial fija.

[Abrir fuente](../src/components/organisms/BookingInvitation.tsx)

| Exportación       | Responsabilidad                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| BookingInvitation | Composición de la acción principal del cliente, sin información comercial fija. |

## src/components/organisms/BookingInvitationCopy.tsx

Contenido editorial de la portada de reserva, independiente de navegación e ilustración.

[Abrir fuente](../src/components/organisms/BookingInvitationCopy.tsx)

| Exportación           | Responsabilidad                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------- |
| BookingInvitationCopy | Contenido editorial de la portada de reserva, independiente de navegación e ilustración. |

## src/components/organisms/BookingServicesField.tsx

Ofrece servicios activos con tarifa para el vehículo elegido.

[Abrir fuente](../src/components/organisms/BookingServicesField.tsx)

| Exportación          | Responsabilidad                                               |
| -------------------- | ------------------------------------------------------------- |
| BookingServicesField | Ofrece servicios activos con tarifa para el vehículo elegido. |

## src/components/organisms/BookingVehicleEmpty.tsx

Próximo paso de una reserva sin vehículos registrados.

[Abrir fuente](../src/components/organisms/BookingVehicleEmpty.tsx)

| Exportación         | Responsabilidad                                        |
| ------------------- | ------------------------------------------------------ |
| BookingVehicleEmpty | Próximo paso de una reserva sin vehículos registrados. |

## src/components/organisms/BookingVehicleField.tsx

Orienta al titular sin vehículos y ofrece registrar uno antes de reservar.

[Abrir fuente](../src/components/organisms/BookingVehicleField.tsx)

| Exportación         | Responsabilidad                                                            |
| ------------------- | -------------------------------------------------------------------------- |
| BookingVehicleField | Orienta al titular sin vehículos y ofrece registrar uno antes de reservar. |

## src/components/organisms/ClientQuickActions.tsx

Tareas de preparación antes de reservar; no duplica consultas del catálogo.

[Abrir fuente](../src/components/organisms/ClientQuickActions.tsx)

| Exportación        | Responsabilidad                                                             |
| ------------------ | --------------------------------------------------------------------------- |
| ClientQuickActions | Tareas de preparación antes de reservar; no duplica consultas del catálogo. |

## src/components/organisms/ClientVisitList.tsx

Visitas autorizadas, con carga/error separados del estado vacío.

[Abrir fuente](../src/components/organisms/ClientVisitList.tsx)

| Exportación     | Responsabilidad                                                  |
| --------------- | ---------------------------------------------------------------- |
| ClientVisitList | Visitas autorizadas, con carga/error separados del estado vacío. |

## src/components/organisms/CollectionState.tsx

Estados consistentes de lista: carga inicial, error recuperable y vacío.

[Abrir fuente](../src/components/organisms/CollectionState.tsx)

| Exportación     | Responsabilidad                                                          |
| --------------- | ------------------------------------------------------------------------ |
| CollectionState | Estados consistentes de lista: carga inicial, error recuperable y vacío. |

## src/components/organisms/DashboardHeading.tsx

Presentación del tablero y su acción prioritaria de reserva asistida.

[Abrir fuente](../src/components/organisms/DashboardHeading.tsx)

| Exportación      | Responsabilidad                                                       |
| ---------------- | --------------------------------------------------------------------- |
| DashboardHeading | Presentación del tablero y su acción prioritaria de reserva asistida. |

## src/components/organisms/DashboardIndicators.tsx

Métricas diarias y pendientes globales; un recurso no disponible muestra un guion.

[Abrir fuente](../src/components/organisms/DashboardIndicators.tsx)

| Exportación         | Responsabilidad                                                                    |
| ------------------- | ---------------------------------------------------------------------------------- |
| DashboardIndicators | Métricas diarias y pendientes globales; un recurso no disponible muestra un guion. |

## src/components/organisms/DashboardPending.tsx

Turnos por atender del negocio; un fallo de consulta no se anuncia como lista vacía.

[Abrir fuente](../src/components/organisms/DashboardPending.tsx)

| Exportación      | Responsabilidad                                                                      |
| ---------------- | ------------------------------------------------------------------------------------ |
| DashboardPending | Turnos por atender del negocio; un fallo de consulta no se anuncia como lista vacía. |

## src/components/organisms/EmployeeAppointmentResults.tsx

Filtros y resultados compartidos por agenda e historial del equipo.

[Abrir fuente](../src/components/organisms/EmployeeAppointmentResults.tsx)

| Exportación                | Responsabilidad                                                     |
| -------------------------- | ------------------------------------------------------------------- |
| EmployeeAppointmentResults | Filtros y resultados compartidos por agenda e historial del equipo. |

## src/components/organisms/EmployeeDaySummary.tsx

Resumen de la fecha consultada, compartido por el equipo, sin información financiera.

[Abrir fuente](../src/components/organisms/EmployeeDaySummary.tsx)

| Exportación        | Responsabilidad                                                                       |
| ------------------ | ------------------------------------------------------------------------------------- |
| EmployeeDaySummary | Resumen de la fecha consultada, compartido por el equipo, sin información financiera. |

## src/components/organisms/EmployeePerformance.tsx

Presenta trabajos completados por empleado en el período.

[Abrir fuente](../src/components/organisms/EmployeePerformance.tsx)

| Exportación         | Responsabilidad                                           |
| ------------------- | --------------------------------------------------------- |
| EmployeePerformance | Presenta trabajos completados por empleado en el período. |

## src/components/organisms/EmployeeWorkAction.tsx

Ofrece iniciar o finalizar el lavado según el estado del turno.

[Abrir fuente](../src/components/organisms/EmployeeWorkAction.tsx)

| Exportación        | Responsabilidad                                                 |
| ------------------ | --------------------------------------------------------------- |
| EmployeeWorkAction | Ofrece iniciar o finalizar el lavado según el estado del turno. |

## src/components/organisms/EntityForm.tsx

Formulario RHF + Zod con errores por campo y callback sin HTTP propio.

[Abrir fuente](../src/components/organisms/EntityForm.tsx)

| Exportación | Responsabilidad                                                        |
| ----------- | ---------------------------------------------------------------------- |
| EntityForm  | Formulario RHF + Zod con errores por campo y callback sin HTTP propio. |

## src/components/organisms/ModalContent.tsx

Panel desplazable; los controles flotantes quedan fuera para no tapar el formulario.

[Abrir fuente](../src/components/organisms/ModalContent.tsx)

| Exportación  | Responsabilidad                                                                      |
| ------------ | ------------------------------------------------------------------------------------ |
| ModalContent | Panel desplazable; los controles flotantes quedan fuera para no tapar el formulario. |

## src/components/organisms/ModalPanel.tsx

Diálogo nativo con tema y volver arriba disponibles sin salir del formulario.

[Abrir fuente](../src/components/organisms/ModalPanel.tsx)

| Exportación | Responsabilidad                                                               |
| ----------- | ----------------------------------------------------------------------------- |
| ModalPanel  | Diálogo nativo con tema y volver arriba disponibles sin salir del formulario. |

## src/components/organisms/OAuthLinkForm.tsx

Confirma la contraseña local una sola vez antes de unir ambas formas de ingreso.

[Abrir fuente](../src/components/organisms/OAuthLinkForm.tsx)

| Exportación   | Responsabilidad                                                                  |
| ------------- | -------------------------------------------------------------------------------- |
| OAuthLinkForm | Confirma la contraseña local una sola vez antes de unir ambas formas de ingreso. |

## src/components/organisms/PendingAppointments.tsx

Solicitudes pendientes del tablero y acceso a la gestión completa.

[Abrir fuente](../src/components/organisms/PendingAppointments.tsx)

| Exportación         | Responsabilidad                                                    |
| ------------------- | ------------------------------------------------------------------ |
| PendingAppointments | Solicitudes pendientes del tablero y acceso a la gestión completa. |

## src/components/organisms/PopularServices.tsx

Presenta frecuencias reales de servicios en el período consultado.

[Abrir fuente](../src/components/organisms/PopularServices.tsx)

| Exportación     | Responsabilidad                                                    |
| --------------- | ------------------------------------------------------------------ |
| PopularServices | Presenta frecuencias reales de servicios en el período consultado. |

## src/components/organisms/ProfileIdentity.tsx

Identifica la sesión propia con nombre, email y avatar opcional.

[Abrir fuente](../src/components/organisms/ProfileIdentity.tsx)

| Exportación     | Responsabilidad                                                  |
| --------------- | ---------------------------------------------------------------- |
| ProfileIdentity | Identifica la sesión propia con nombre, email y avatar opcional. |

## src/components/organisms/ProfilePasswordForm.tsx

Confirma la contraseña actual y solicita la nueva al servidor.

[Abrir fuente](../src/components/organisms/ProfilePasswordForm.tsx)

| Exportación         | Responsabilidad                                                |
| ------------------- | -------------------------------------------------------------- |
| ProfilePasswordForm | Confirma la contraseña actual y solicita la nueva al servidor. |

## src/components/organisms/ReportSummary.tsx

Compone indicadores, ingresos, servicios y rendimiento desde un único reporte.

[Abrir fuente](../src/components/organisms/ReportSummary.tsx)

| Exportación   | Responsabilidad                                                                |
| ------------- | ------------------------------------------------------------------------------ |
| ReportSummary | Compone indicadores, ingresos, servicios y rendimiento desde un único reporte. |

## src/components/organisms/RevenueByDay.tsx

Visualiza ingresos reales por día con las mismas barras accesibles del tablero.

[Abrir fuente](../src/components/organisms/RevenueByDay.tsx)

| Exportación  | Responsabilidad                                                                 |
| ------------ | ------------------------------------------------------------------------------- |
| RevenueByDay | Visualiza ingresos reales por día con las mismas barras accesibles del tablero. |

## src/components/organisms/ScheduleSelector.tsx

Horarios y total provienen del backend; no calcula precios en el cliente.

[Abrir fuente](../src/components/organisms/ScheduleSelector.tsx)

| Exportación      | Responsabilidad                                                           |
| ---------------- | ------------------------------------------------------------------------- |
| ScheduleSelector | Horarios y total provienen del backend; no calcula precios en el cliente. |

## src/components/organisms/Screen.tsx

Marco de todos los roles con controles flotantes y actualización al regresar.

[Abrir fuente](../src/components/organisms/Screen.tsx)

| Exportación | Responsabilidad                                                               |
| ----------- | ----------------------------------------------------------------------------- |
| Screen      | Marco de todos los roles con controles flotantes y actualización al regresar. |

## src/components/organisms/ScreenContent.tsx

Contenido común con espacio reservado para los controles flotantes.

[Abrir fuente](../src/components/organisms/ScreenContent.tsx)

| Exportación   | Responsabilidad                                                     |
| ------------- | ------------------------------------------------------------------- |
| ScreenContent | Contenido común con espacio reservado para los controles flotantes. |

## src/components/organisms/ScrollSurface.tsx

Superficie acotada que mantiene los controles fuera del contenido desplazable.

[Abrir fuente](../src/components/organisms/ScrollSurface.tsx)

| Exportación   | Responsabilidad                                                                |
| ------------- | ------------------------------------------------------------------------------ |
| ScrollSurface | Superficie acotada que mantiene los controles fuera del contenido desplazable. |

## src/components/organisms/ServiceCollection.tsx

Cuadrícula de catálogo con acciones administrativas cuando están habilitadas.

[Abrir fuente](../src/components/organisms/ServiceCollection.tsx)

| Exportación       | Responsabilidad                                                               |
| ----------------- | ----------------------------------------------------------------------------- |
| ServiceCollection | Cuadrícula de catálogo con acciones administrativas cuando están habilitadas. |

## src/components/organisms/ServiceDeleteDialog.tsx

Confirma la baja lógica del servicio preservando contratos anteriores.

[Abrir fuente](../src/components/organisms/ServiceDeleteDialog.tsx)

| Exportación         | Responsabilidad                                                        |
| ------------------- | ---------------------------------------------------------------------- |
| ServiceDeleteDialog | Confirma la baja lógica del servicio preservando contratos anteriores. |

## src/components/organisms/ServiceEditDialog.tsx

Edita descripción y duración del servicio, separadas de sus precios.

[Abrir fuente](../src/components/organisms/ServiceEditDialog.tsx)

| Exportación       | Responsabilidad                                                      |
| ----------------- | -------------------------------------------------------------------- |
| ServiceEditDialog | Edita descripción y duración del servicio, separadas de sus precios. |

## src/components/organisms/ServiceEditors.tsx

Edición de servicio, tarifa por tipo y confirmación de baja lógica.

[Abrir fuente](../src/components/organisms/ServiceEditors.tsx)

| Exportación    | Responsabilidad                                                     |
| -------------- | ------------------------------------------------------------------- |
| ServiceEditors | Edición de servicio, tarifa por tipo y confirmación de baja lógica. |

## src/components/organisms/ServicePriceDialog.tsx

Edita una tarifa para la pareja servicio/tipo de vehículo.

[Abrir fuente](../src/components/organisms/ServicePriceDialog.tsx)

| Exportación        | Responsabilidad                                            |
| ------------------ | ---------------------------------------------------------- |
| ServicePriceDialog | Edita una tarifa para la pareja servicio/tipo de vehículo. |

## src/components/organisms/SidebarNavigation.tsx

Selección de destinos basada en rol y ruta, sin estado de navegación duplicado.

[Abrir fuente](../src/components/organisms/SidebarNavigation.tsx)

| Exportación       | Responsabilidad                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| SidebarNavigation | Selección de destinos basada en rol y ruta, sin estado de navegación duplicado. |

## src/components/organisms/SignInForm.tsx

Valida email y contraseña y delega el acceso en useSignIn.

[Abrir fuente](../src/components/organisms/SignInForm.tsx)

| Exportación | Responsabilidad                                            |
| ----------- | ---------------------------------------------------------- |
| SignInForm  | Valida email y contraseña y delega el acceso en useSignIn. |

## src/components/organisms/SignInPresentation.tsx

Presentación de acceso que comparte la identidad del resto de la aplicación.

[Abrir fuente](../src/components/organisms/SignInPresentation.tsx)

| Exportación        | Responsabilidad                                                              |
| ------------------ | ---------------------------------------------------------------------------- |
| SignInPresentation | Presentación de acceso que comparte la identidad del resto de la aplicación. |

## src/components/organisms/SocialLoginButton.tsx

Botón OAuth de un proveedor configurado, con su propia solicitud PKCE.

[Abrir fuente](../src/components/organisms/SocialLoginButton.tsx)

| Exportación       | Responsabilidad                                                        |
| ----------------- | ---------------------------------------------------------------------- |
| SocialLoginButton | Botón OAuth de un proveedor configurado, con su propia solicitud PKCE. |

## src/components/organisms/SocialLogins.tsx

Muestra proveedores y deshabilita los que el negocio todavía no configuró.

[Abrir fuente](../src/components/organisms/SocialLogins.tsx)

| Exportación  | Responsabilidad                                                            |
| ------------ | -------------------------------------------------------------------------- |
| SocialLogins | Muestra proveedores y deshabilita los que el negocio todavía no configuró. |

## src/components/organisms/ThemeSelector.tsx

Conserva la preferencia automática; los cambios claro/oscuro usan el botón flotante.

[Abrir fuente](../src/components/organisms/ThemeSelector.tsx)

| Exportación   | Responsabilidad                                                                      |
| ------------- | ------------------------------------------------------------------------------------ |
| ThemeSelector | Conserva la preferencia automática; los cambios claro/oscuro usan el botón flotante. |

## src/components/organisms/UserCollection.tsx

Presenta la página autorizada de usuarios y los estados de consulta.

[Abrir fuente](../src/components/organisms/UserCollection.tsx)

| Exportación    | Responsabilidad                                                      |
| -------------- | -------------------------------------------------------------------- |
| UserCollection | Presenta la página autorizada de usuarios y los estados de consulta. |

## src/components/organisms/UserDeleteDialog.tsx

Confirma la baja lógica de una cuenta conservando su historial.

[Abrir fuente](../src/components/organisms/UserDeleteDialog.tsx)

| Exportación      | Responsabilidad                                                 |
| ---------------- | --------------------------------------------------------------- |
| UserDeleteDialog | Confirma la baja lógica de una cuenta conservando su historial. |

## src/components/organisms/UserEditDialog.tsx

Comparte campos de creación y edición de cuentas administradas.

[Abrir fuente](../src/components/organisms/UserEditDialog.tsx)

| Exportación    | Responsabilidad                                                 |
| -------------- | --------------------------------------------------------------- |
| UserEditDialog | Comparte campos de creación y edición de cuentas administradas. |

## src/components/organisms/UserRoleFilter.tsx

Filtra cuentas por rol sin modificar sus permisos.

[Abrir fuente](../src/components/organisms/UserRoleFilter.tsx)

| Exportación    | Responsabilidad                                    |
| -------------- | -------------------------------------------------- |
| UserRoleFilter | Filtra cuentas por rol sin modificar sus permisos. |

## src/components/organisms/UserTable.tsx

Usuarios como filas adaptables a tarjetas en teléfono.

[Abrir fuente](../src/components/organisms/UserTable.tsx)

| Exportación | Responsabilidad                                        |
| ----------- | ------------------------------------------------------ |
| UserTable   | Usuarios como filas adaptables a tarjetas en teléfono. |

## src/components/organisms/VehicleCollection.tsx

Cuadrícula de vehículos autorizados con edición y baja confirmada.

[Abrir fuente](../src/components/organisms/VehicleCollection.tsx)

| Exportación       | Responsabilidad                                                    |
| ----------------- | ------------------------------------------------------------------ |
| VehicleCollection | Cuadrícula de vehículos autorizados con edición y baja confirmada. |

## src/components/organisms/VehicleDeleteDialog.tsx

Confirma la baja lógica; el servidor rechaza trabajos pendientes.

[Abrir fuente](../src/components/organisms/VehicleDeleteDialog.tsx)

| Exportación         | Responsabilidad                                                   |
| ------------------- | ----------------------------------------------------------------- |
| VehicleDeleteDialog | Confirma la baja lógica; el servidor rechaza trabajos pendientes. |

## src/components/organisms/VehicleEditDialog.tsx

Formulario del vehículo con titular controlado por rol y servidor.

[Abrir fuente](../src/components/organisms/VehicleEditDialog.tsx)

| Exportación       | Responsabilidad                                                    |
| ----------------- | ------------------------------------------------------------------ |
| VehicleEditDialog | Formulario del vehículo con titular controlado por rol y servidor. |

## src/components/organisms/VehicleEditor.tsx

Formularios y confirmación de baja con datos del vehículo seleccionado.

[Abrir fuente](../src/components/organisms/VehicleEditor.tsx)

| Exportación   | Responsabilidad                                                         |
| ------------- | ----------------------------------------------------------------------- |
| VehicleEditor | Formularios y confirmación de baja con datos del vehículo seleccionado. |

## src/components/organisms/VehicleTypeDialog.tsx

Formulario administrativo de categorías utilizadas por las tarifas.

[Abrir fuente](../src/components/organisms/VehicleTypeDialog.tsx)

| Exportación       | Responsabilidad                                                     |
| ----------------- | ------------------------------------------------------------------- |
| VehicleTypeDialog | Formulario administrativo de categorías utilizadas por las tarifas. |

## src/components/organisms/VehicleTypeManager.tsx

Categorías registradas y formularios administrativos sin exponer SQL ni identificadores técnicos.

[Abrir fuente](../src/components/organisms/VehicleTypeManager.tsx)

| Exportación        | Responsabilidad                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| VehicleTypeManager | Categorías registradas y formularios administrativos sin exponer SQL ni identificadores técnicos. |

## src/components/organisms/WeeklyActivity.tsx

Serie semanal real; no rellena actividad ni fabrica tendencias para decorar el tablero.

[Abrir fuente](../src/components/organisms/WeeklyActivity.tsx)

| Exportación    | Responsabilidad                                                                         |
| -------------- | --------------------------------------------------------------------------------------- |
| WeeklyActivity | Serie semanal real; no rellena actividad ni fabrica tendencias para decorar el tablero. |

## src/components/organisms/WelcomePanel.tsx

Presentación inicial del producto.

[Abrir fuente](../src/components/organisms/WelcomePanel.tsx)

| Exportación  | Responsabilidad                    |
| ------------ | ---------------------------------- |
| WelcomePanel | Presentación inicial del producto. |

## src/components/organisms/WorkspaceFrame.tsx

Estructura común independiente del contenido y de las consultas de cada pantalla.

[Abrir fuente](../src/components/organisms/WorkspaceFrame.tsx)

| Exportación    | Responsabilidad                                                                   |
| -------------- | --------------------------------------------------------------------------------- |
| WorkspaceFrame | Estructura común independiente del contenido y de las consultas de cada pantalla. |

## src/components/organisms/WorkspaceHeader.tsx

Cabecera visual común; su área interactiva conserva su propio estado de menú.

[Abrir fuente](../src/components/organisms/WorkspaceHeader.tsx)

| Exportación     | Responsabilidad                                                               |
| --------------- | ----------------------------------------------------------------------------- |
| WorkspaceHeader | Cabecera visual común; su área interactiva conserva su propio estado de menú. |

## src/components/organisms/WorkspaceHeaderActions.tsx

Área de interacción de cabecera, separada del posicionamiento visual.

[Abrir fuente](../src/components/organisms/WorkspaceHeaderActions.tsx)

| Exportación            | Responsabilidad                                                       |
| ---------------------- | --------------------------------------------------------------------- |
| WorkspaceHeaderActions | Área de interacción de cabecera, separada del posicionamiento visual. |

## src/components/organisms/WorkspaceSidebar.tsx

Estructura lateral independiente del catálogo de destinos y de su selección.

[Abrir fuente](../src/components/organisms/WorkspaceSidebar.tsx)

| Exportación      | Responsabilidad                                                              |
| ---------------- | ---------------------------------------------------------------------------- |
| WorkspaceSidebar | Estructura lateral independiente del catálogo de destinos y de su selección. |

## src/constants/authFields.ts

Campos de acceso sin selector de rol.

[Abrir fuente](../src/constants/authFields.ts)

| Exportación    | Responsabilidad                                               |
| -------------- | ------------------------------------------------------------- |
| loginFields    | Campos de acceso sin selector de rol.                         |
| registerFields | El registro público siempre crea Cliente; el rol no se envía. |

## src/constants/business.ts

Roles que puede emitir y validar el contrato del sistema.

[Abrir fuente](../src/constants/business.ts)

| Exportación        | Responsabilidad                                                                      |
| ------------------ | ------------------------------------------------------------------------------------ |
| ROLES              | Roles que puede emitir y validar el contrato del sistema.                            |
| APPOINTMENT_STATUS | Estados persistidos del turno; los servicios controlan las transiciones autorizadas. |

## src/constants/iconPaths.ts

Trazos originales sobre una grilla de 24 unidades, compartidos por web y nativo.

[Abrir fuente](../src/constants/iconPaths.ts)

| Exportación | Responsabilidad                                                                  |
| ----------- | -------------------------------------------------------------------------------- |
| iconPaths   | Trazos originales sobre una grilla de 24 unidades, compartidos por web y nativo. |

## src/constants/paymentFields.ts

Un cobro se registra en centavos en la API; el formulario recibe pesos argentinos.

[Abrir fuente](../src/constants/paymentFields.ts)

| Exportación   | Responsabilidad                                                                    |
| ------------- | ---------------------------------------------------------------------------------- |
| paymentFields | Un cobro se registra en centavos en la API; el formulario recibe pesos argentinos. |

## src/constants/profileFields.ts

Campos editables del perfil; el rol y el correo no se incluyen.

[Abrir fuente](../src/constants/profileFields.ts)

| Exportación   | Responsabilidad                                                 |
| ------------- | --------------------------------------------------------------- |
| profileFields | Campos editables del perfil; el rol y el correo no se incluyen. |

## src/constants/roleNavigation.ts

Un único catálogo alimenta el menú móvil y la barra lateral.

[Abrir fuente](../src/constants/roleNavigation.ts)

| Exportación    | Responsabilidad                                                                         |
| -------------- | --------------------------------------------------------------------------------------- |
| roleNavigation | Un único catálogo alimenta el menú móvil y la barra lateral.                            |
| roleLabels     | Etiquetas humanas para identificar la experiencia, sin exponer nombres internos de rol. |

## src/constants/rootRoutes.ts

Acceso necesario para cada pantalla; el backend valida además cada recurso.

[Abrir fuente](../src/constants/rootRoutes.ts)

| Exportación | Responsabilidad                                                             |
| ----------- | --------------------------------------------------------------------------- |
| RouteAccess | Acceso necesario para cada pantalla; el backend valida además cada recurso. |
| rootRoutes  | Catálogo de rutas del stack raíz, independiente del estado de sesión.       |

## src/constants/serviceFields.ts

Campos reutilizados por alta y edición de servicios.

[Abrir fuente](../src/constants/serviceFields.ts)

| Exportación   | Responsabilidad                                      |
| ------------- | ---------------------------------------------------- |
| serviceFields | Campos reutilizados por alta y edición de servicios. |

## src/constants/settingsFields.ts

Configuración inicial de horarios, cancelación y capacidad.

[Abrir fuente](../src/constants/settingsFields.ts)

| Exportación    | Responsabilidad                                             |
| -------------- | ----------------------------------------------------------- |
| settingsFields | Configuración inicial de horarios, cancelación y capacidad. |

## src/constants/userFields.ts

Roles y etiquetas compartidos por los filtros y el editor administrativo.

[Abrir fuente](../src/constants/userFields.ts)

| Exportación          | Responsabilidad                                                           |
| -------------------- | ------------------------------------------------------------------------- |
| roleOptions          | Roles y etiquetas compartidos por los filtros y el editor administrativo. |
| userIdentityFields   | Campos de identidad comunes a creación y edición de usuarios.             |
| userPermissionFields | Permisos de cuentas existentes, validados nuevamente por el backend.      |

## src/context/AuthContext.tsx

Contexto de sesión compartido por las experiencias de los tres roles.

[Abrir fuente](../src/context/AuthContext.tsx)

| Exportación  | Responsabilidad                                                                     |
| ------------ | ----------------------------------------------------------------------------------- |
| AuthContext  | Contexto de sesión compartido por las experiencias de los tres roles.               |
| AuthProvider | Conecta la sesión restaurada con navegación y formularios; no contiene lógica HTTP. |

## src/context/ThemeContext.tsx

Preferencia manual o seguimiento del sistema.

[Abrir fuente](../src/context/ThemeContext.tsx)

| Exportación   | Responsabilidad                                                        |
| ------------- | ---------------------------------------------------------------------- |
| ThemeMode     | Preferencia manual o seguimiento del sistema.                          |
| ThemeContext  | Contexto de tema persistente, sin datos de autenticación.              |
| ThemeProvider | Provee paleta y restaura preferencia desde almacenamiento no sensible. |

## src/hooks/appointmentCommands.ts

Acciones operativas; el permiso y la transición se vuelven a validar en el backend.

[Abrir fuente](../src/hooks/appointmentCommands.ts)

| Exportación         | Responsabilidad                                                                     |
| ------------------- | ----------------------------------------------------------------------------------- |
| appointmentCommands | Acciones operativas; el permiso y la transición se vuelven a validar en el backend. |

## src/hooks/profileCommands.ts

Operaciones propias; cambiar contraseña revoca sesiones e inicia nuevamente el acceso.

[Abrir fuente](../src/hooks/profileCommands.ts)

| Exportación     | Responsabilidad                                                                        |
| --------------- | -------------------------------------------------------------------------------------- |
| profileCommands | Operaciones propias; cambiar contraseña revoca sesiones e inicia nuevamente el acceso. |

## src/hooks/useAction.ts

Ejecuta una acción y publica carga/error/resultado sin propagar errores a la vista.

[Abrir fuente](../src/hooks/useAction.ts)

| Exportación | Responsabilidad                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| useAction   | Ejecuta una acción y publica carga/error/resultado sin propagar errores a la vista. |

## src/hooks/useAgendaList.ts

Traduce filtros visuales a la consulta; el servidor decide la visibilidad efectiva.

[Abrir fuente](../src/hooks/useAgendaList.ts)

| Exportación   | Responsabilidad                                                                     |
| ------------- | ----------------------------------------------------------------------------------- |
| useAgendaList | Traduce filtros visuales a la consulta; el servidor decide la visibilidad efectiva. |

## src/hooks/useAgendaResources.ts

Recursos auxiliares de agenda, habilitados únicamente para la experiencia correspondiente.

[Abrir fuente](../src/hooks/useAgendaResources.ts)

| Exportación        | Responsabilidad                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------ |
| useAgendaResources | Recursos auxiliares de agenda, habilitados únicamente para la experiencia correspondiente. |

## src/hooks/useApiHealth.ts

Consulta el backend y cancela la solicitud al desmontar.

[Abrir fuente](../src/hooks/useApiHealth.ts)

| Exportación  | Responsabilidad                                          |
| ------------ | -------------------------------------------------------- |
| useApiHealth | Consulta el backend y cancela la solicitud al desmontar. |

## src/hooks/useAppointmentDetail.ts

Compone datos, selección y acciones del detalle de turno con ownership en la API.

[Abrir fuente](../src/hooks/useAppointmentDetail.ts)

| Exportación          | Responsabilidad                                                                   |
| -------------------- | --------------------------------------------------------------------------------- |
| useAppointmentDetail | Compone datos, selección y acciones del detalle de turno con ownership en la API. |

## src/hooks/useAppointmentFiltersState.ts

Filtros locales; no sustituyen las restricciones de propiedad aplicadas por la API.

[Abrir fuente](../src/hooks/useAppointmentFiltersState.ts)

| Exportación                | Responsabilidad                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------- |
| useAppointmentFiltersState | Filtros locales; no sustituyen las restricciones de propiedad aplicadas por la API. |

## src/hooks/useAppointmentFlags.ts

Selecciones de administración y apertura de diálogos; se sincronizan con la versión remota.

[Abrir fuente](../src/hooks/useAppointmentFlags.ts)

| Exportación         | Responsabilidad                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------- |
| useAppointmentFlags | Selecciones de administración y apertura de diálogos; se sincronizan con la versión remota. |

## src/hooks/useAppointmentMutation.ts

Mutación de turno y actualización de los recursos afectados después de confirmar.

[Abrir fuente](../src/hooks/useAppointmentMutation.ts)

| Exportación            | Responsabilidad                                                                   |
| ---------------------- | --------------------------------------------------------------------------------- |
| useAppointmentMutation | Mutación de turno y actualización de los recursos afectados después de confirmar. |

## src/hooks/useAppointmentPayment.ts

Mantiene la misma clave al reintentar un pago y la renueva solo tras su confirmación.

[Abrir fuente](../src/hooks/useAppointmentPayment.ts)

| Exportación           | Responsabilidad                                                                       |
| --------------------- | ------------------------------------------------------------------------------------- |
| useAppointmentPayment | Mantiene la misma clave al reintentar un pago y la renueva solo tras su confirmación. |

## src/hooks/useAppointmentResources.ts

Consultas del detalle; los recursos administrativos no se solicitan para otros roles.

[Abrir fuente](../src/hooks/useAppointmentResources.ts)

| Exportación             | Responsabilidad                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------- |
| useAppointmentResources | Consultas del detalle; los recursos administrativos no se solicitan para otros roles. |

## src/hooks/useAppointments.ts

Coordina filtros, página y resumen; el servidor aplica propiedad y asignaciones.

[Abrir fuente](../src/hooks/useAppointments.ts)

| Exportación     | Responsabilidad                                                                  |
| --------------- | -------------------------------------------------------------------------------- |
| useAppointments | Coordina filtros, página y resumen; el servidor aplica propiedad y asignaciones. |

## src/hooks/useAuth.ts

Accede a sesión verificada.

[Abrir fuente](../src/hooks/useAuth.ts)

| Exportación | Responsabilidad             |
| ----------- | --------------------------- |
| useAuth     | Accede a sesión verificada. |

## src/hooks/useBooking.ts

Compone selección, consulta y confirmación sin lógica de negocio dentro de la pantalla.

[Abrir fuente](../src/hooks/useBooking.ts)

| Exportación | Responsabilidad                                                                         |
| ----------- | --------------------------------------------------------------------------------------- |
| useBooking  | Compone selección, consulta y confirmación sin lógica de negocio dentro de la pantalla. |

## src/hooks/useBookingOptions.ts

Recursos y recarga de los selectores, separados de la cotización dependiente.

[Abrir fuente](../src/hooks/useBookingOptions.ts)

| Exportación       | Responsabilidad                                                               |
| ----------------- | ----------------------------------------------------------------------------- |
| useBookingOptions | Recursos y recarga de los selectores, separados de la cotización dependiente. |

## src/hooks/useBookingResources.ts

Cotiza solo selecciones compatibles y recarga opciones al volver de registrar un auto.

[Abrir fuente](../src/hooks/useBookingResources.ts)

| Exportación         | Responsabilidad                                                                        |
| ------------------- | -------------------------------------------------------------------------------------- |
| useBookingResources | Cotiza solo selecciones compatibles y recarga opciones al volver de registrar un auto. |

## src/hooks/useBookingSelection.ts

Selección de reserva; cambiar titular, vehículo, servicios o fecha invalida el horario previo.

[Abrir fuente](../src/hooks/useBookingSelection.ts)

| Exportación         | Responsabilidad                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| useBookingSelection | Selección de reserva; cambiar titular, vehículo, servicios o fecha invalida el horario previo. |

## src/hooks/useBookingSubmit.ts

Envía la intención de reserva sin confiar en el precio de la interfaz.

[Abrir fuente](../src/hooks/useBookingSubmit.ts)

| Exportación      | Responsabilidad                                                        |
| ---------------- | ---------------------------------------------------------------------- |
| useBookingSubmit | Envía la intención de reserva sin confiar en el precio de la interfaz. |

## src/hooks/useCatalog.ts

Compone consulta, edición de servicio y edición de tarifa como responsabilidades separadas.

[Abrir fuente](../src/hooks/useCatalog.ts)

| Exportación | Responsabilidad                                                                             |
| ----------- | ------------------------------------------------------------------------------------------- |
| useCatalog  | Compone consulta, edición de servicio y edición de tarifa como responsabilidades separadas. |

## src/hooks/useConnectionNotice.ts

Evita parpadeos en conexiones rápidas y explica esperas prolongadas en la app.

[Abrir fuente](../src/hooks/useConnectionNotice.ts)

| Exportación         | Responsabilidad                                                                |
| ------------------- | ------------------------------------------------------------------------------ |
| useConnectionNotice | Evita parpadeos en conexiones rápidas y explica esperas prolongadas en la app. |

## src/hooks/useDashboard.ts

Datos del tablero; refresca resumen y solicitudes como una sola acción de pantalla.

[Abrir fuente](../src/hooks/useDashboard.ts)

| Exportación  | Responsabilidad                                                                     |
| ------------ | ----------------------------------------------------------------------------------- |
| useDashboard | Datos del tablero; refresca resumen y solicitudes como una sola acción de pantalla. |

## src/hooks/useDebouncedValue.ts

Evita una solicitud de búsqueda por cada tecla sin retrasar la escritura visible.

[Abrir fuente](../src/hooks/useDebouncedValue.ts)

| Exportación       | Responsabilidad                                                                   |
| ----------------- | --------------------------------------------------------------------------------- |
| useDebouncedValue | Evita una solicitud de búsqueda por cada tecla sin retrasar la escritura visible. |

## src/hooks/useEditorState.ts

Mantiene exclusivamente la selección y apertura de un editor de entidad.

[Abrir fuente](../src/hooks/useEditorState.ts)

| Exportación    | Responsabilidad                                                          |
| -------------- | ------------------------------------------------------------------------ |
| useEditorState | Mantiene exclusivamente la selección y apertura de un editor de entidad. |

## src/hooks/useEntityManager.ts

Une una colección paginada con el editor reutilizable; preserva error de lectura separado.

[Abrir fuente](../src/hooks/useEntityManager.ts)

| Exportación      | Responsabilidad                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------ |
| useEntityManager | Une una colección paginada con el editor reutilizable; preserva error de lectura separado. |

## src/hooks/useHome.ts

Próximas tres visitas propias, ordenadas cronológicamente.

[Abrir fuente](../src/hooks/useHome.ts)

| Exportación | Responsabilidad                                            |
| ----------- | ---------------------------------------------------------- |
| useHome     | Próximas tres visitas propias, ordenadas cronológicamente. |

## src/hooks/useOptions.ts

Carga todas las páginas de un selector y permite actualizarlo al volver a la pantalla.

[Abrir fuente](../src/hooks/useOptions.ts)

| Exportación | Responsabilidad                                                                        |
| ----------- | -------------------------------------------------------------------------------------- |
| useOptions  | Carga todas las páginas de un selector y permite actualizarlo al volver a la pantalla. |

## src/hooks/usePagedList.ts

Lista paginada con filtro y navegación entre páginas para no truncar datos.

[Abrir fuente](../src/hooks/usePagedList.ts)

| Exportación  | Responsabilidad                                                             |
| ------------ | --------------------------------------------------------------------------- |
| usePagedList | Lista paginada con filtro y navegación entre páginas para no truncar datos. |

## src/hooks/useProfile.ts

Perfil propio con formularios, sesión y comandos separados por responsabilidad.

[Abrir fuente](../src/hooks/useProfile.ts)

| Exportación | Responsabilidad                                                                 |
| ----------- | ------------------------------------------------------------------------------- |
| useProfile  | Perfil propio con formularios, sesión y comandos separados por responsabilidad. |

## src/hooks/useQuery.ts

Coordina carga, recarga y respuestas fuera de orden sin mostrar datos de otra selección.

[Abrir fuente](../src/hooks/useQuery.ts)

| Exportación | Responsabilidad                                                                          |
| ----------- | ---------------------------------------------------------------------------------------- |
| useQuery    | Coordina carga, recarga y respuestas fuera de orden sin mostrar datos de otra selección. |

## src/hooks/useRefreshOnReturn.ts

Actualiza al regresar a la ruta/app y, opcionalmente, mientras se usa una agenda.

[Abrir fuente](../src/hooks/useRefreshOnReturn.ts)

| Exportación        | Responsabilidad                                                                   |
| ------------------ | --------------------------------------------------------------------------------- |
| useRefreshOnReturn | Actualiza al regresar a la ruta/app y, opcionalmente, mientras se usa una agenda. |

## src/hooks/useRemoteData.ts

Consulta un recurso sin conservar resultados de filtros anteriores.

[Abrir fuente](../src/hooks/useRemoteData.ts)

| Exportación   | Responsabilidad                                                     |
| ------------- | ------------------------------------------------------------------- |
| useRemoteData | Consulta un recurso sin conservar resultados de filtros anteriores. |

## src/hooks/useReports.ts

Reporte por período calendario local y fecha elegida.

[Abrir fuente](../src/hooks/useReports.ts)

| Exportación | Responsabilidad                                       |
| ----------- | ----------------------------------------------------- |
| useReports  | Reporte por período calendario local y fecha elegida. |

## src/hooks/useResourceEditor.ts

Compone selección, confirmaciones y persistencia para editores sin duplicar el ABML.

[Abrir fuente](../src/hooks/useResourceEditor.ts)

| Exportación       | Responsabilidad                                                                      |
| ----------------- | ------------------------------------------------------------------------------------ |
| useResourceEditor | Compone selección, confirmaciones y persistencia para editores sin duplicar el ABML. |

## src/hooks/useRestoreDestination.ts

Conserva el enlace solicitado mientras las guardas esperan la sesión.

[Abrir fuente](../src/hooks/useRestoreDestination.ts)

| Exportación           | Responsabilidad                                                       |
| --------------------- | --------------------------------------------------------------------- |
| useRestoreDestination | Conserva el enlace solicitado mientras las guardas esperan la sesión. |

## src/hooks/useScrollControls.ts

Vincula los botones a su propia región; no desplaza la ventana ni otros diálogos.

[Abrir fuente](../src/hooks/useScrollControls.ts)

| Exportación       | Responsabilidad                                                                   |
| ----------------- | --------------------------------------------------------------------------------- |
| useScrollControls | Vincula los botones a su propia región; no desplaza la ventana ni otros diálogos. |

## src/hooks/useServicePrice.ts

Administra la tarifa por tipo de vehículo, independientemente del formulario de servicio.

[Abrir fuente](../src/hooks/useServicePrice.ts)

| Exportación     | Responsabilidad                                                                           |
| --------------- | ----------------------------------------------------------------------------------------- |
| useServicePrice | Administra la tarifa por tipo de vehículo, independientemente del formulario de servicio. |

## src/hooks/useSessionRestore.ts

Conserva credenciales ante una caída de conexión y permite reintentar el arranque.

[Abrir fuente](../src/hooks/useSessionRestore.ts)

| Exportación       | Responsabilidad                                                                    |
| ----------------- | ---------------------------------------------------------------------------------- |
| useSessionRestore | Conserva credenciales ante una caída de conexión y permite reintentar el arranque. |

## src/hooks/useSettings.ts

Configuración operativa con horario local y capacidad simultánea.

[Abrir fuente](../src/hooks/useSettings.ts)

| Exportación | Responsabilidad                                                   |
| ----------- | ----------------------------------------------------------------- |
| useSettings | Configuración operativa con horario local y capacidad simultánea. |

## src/hooks/useSignIn.ts

Conecta formulario con registro/login y guarda refresh de forma segura.

[Abrir fuente](../src/hooks/useSignIn.ts)

| Exportación | Responsabilidad                                                         |
| ----------- | ----------------------------------------------------------------------- |
| useSignIn   | Conecta formulario con registro/login y guarda refresh de forma segura. |

## src/hooks/useSocialExchange.ts

Canje compartido por web/APK; la contraseña se conserva solo mientras se envía.

[Abrir fuente](../src/hooks/useSocialExchange.ts)

| Exportación       | Responsabilidad                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| useSocialExchange | Canje compartido por web/APK; la contraseña se conserva solo mientras se envía. |

## src/hooks/useSocialLogin.ts

Inicia AuthSession con PKCE; la API intercambia el código y emite su propia sesión.

[Abrir fuente](../src/hooks/useSocialLogin.ts)

| Exportación    | Responsabilidad                                                                     |
| -------------- | ----------------------------------------------------------------------------------- |
| useSocialLogin | Inicia AuthSession con PKCE; la API intercambia el código y emite su propia sesión. |

## src/hooks/useSocialLogin.web.ts

Estado del botón web; la confirmación de vinculación ocurre en la ruta de retorno.

[Abrir fuente](../src/hooks/useSocialLogin.web.ts)

| Exportación    | Responsabilidad                                                                    |
| -------------- | ---------------------------------------------------------------------------------- |
| useSocialLogin | Estado del botón web; la confirmación de vinculación ocurre en la ruta de retorno. |

## src/hooks/useSocialProviders.ts

Consulta proveedores y permite reintentar si Render estaba despertando.

[Abrir fuente](../src/hooks/useSocialProviders.ts)

| Exportación        | Responsabilidad                                                         |
| ------------------ | ----------------------------------------------------------------------- |
| useSocialProviders | Consulta proveedores y permite reintentar si Render estaba despertando. |

## src/hooks/useSocialResponse.ts

Completa retornos nativos y muestra también cancelaciones y errores del proveedor.

[Abrir fuente](../src/hooks/useSocialResponse.ts)

| Exportación       | Responsabilidad                                                                    |
| ----------------- | ---------------------------------------------------------------------------------- |
| useSocialResponse | Completa retornos nativos y muestra también cancelaciones y errores del proveedor. |

## src/hooks/useTheme.ts

Retorna tema y selector.

[Abrir fuente](../src/hooks/useTheme.ts)

| Exportación | Responsabilidad          |
| ----------- | ------------------------ |
| useTheme    | Retorna tema y selector. |

## src/hooks/useUsers.ts

Gestión de usuarios; delega selección, persistencia y definición de formularios.

[Abrir fuente](../src/hooks/useUsers.ts)

| Exportación | Responsabilidad                                                                  |
| ----------- | -------------------------------------------------------------------------------- |
| useUsers    | Gestión de usuarios; delega selección, persistencia y definición de formularios. |

## src/hooks/useVehicleTypes.ts

Categorías con edición común y baja lógica que conserva referencias históricas.

[Abrir fuente](../src/hooks/useVehicleTypes.ts)

| Exportación     | Responsabilidad                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| useVehicleTypes | Categorías con edición común y baja lógica que conserva referencias históricas. |

## src/hooks/useVehicles.ts

ABML de vehículos con definición de formulario separada de las consultas y acciones.

[Abrir fuente](../src/hooks/useVehicles.ts)

| Exportación | Responsabilidad                                                                      |
| ----------- | ------------------------------------------------------------------------------------ |
| useVehicles | ABML de vehículos con definición de formulario separada de las consultas y acciones. |

## src/hooks/useWebOAuthReturn.ts

Consume el retorno web una vez, validando state/PKCE antes de guardar sesión.

[Abrir fuente](../src/hooks/useWebOAuthReturn.ts)

| Exportación       | Responsabilidad                                                               |
| ----------------- | ----------------------------------------------------------------------------- |
| useWebOAuthReturn | Consume el retorno web una vez, validando state/PKCE antes de guardar sesión. |

## src/hooks/useWorkspaceLayout.ts

Resuelve densidad y navegación a partir del espacio real, también al girar el teléfono.

[Abrir fuente](../src/hooks/useWorkspaceLayout.ts)

| Exportación        | Responsabilidad                                                                         |
| ------------------ | --------------------------------------------------------------------------------------- |
| useWorkspaceLayout | Resuelve densidad y navegación a partir del espacio real, también al girar el teléfono. |

## src/navigation/RoleTabs.tsx

Destino de la barra móvil. El nombre coincide con un archivo de ruta del grupo.

[Abrir fuente](../src/navigation/RoleTabs.tsx)

| Exportación | Responsabilidad                                                                 |
| ----------- | ------------------------------------------------------------------------------- |
| TabItem     | Destino de la barra móvil. El nombre coincide con un archivo de ruta del grupo. |
| RoleTabs    | Destinos táctiles en teléfono; escritorio usa la barra lateral del mismo rol.   |

## src/navigation/RootNavigation.tsx

Mantiene el stack montado mientras restaura sesión y aplica guardas por ruta.

[Abrir fuente](../src/navigation/RootNavigation.tsx)

| Exportación    | Responsabilidad                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| RootNavigation | Mantiene el stack montado mientras restaura sesión y aplica guardas por ruta. |

## src/screens/BootstrapScreen.tsx

Pantalla de arranque: compone el estado de conectividad mientras se prepara la navegación.

[Abrir fuente](../src/screens/BootstrapScreen.tsx)

| Exportación     | Responsabilidad                                                                            |
| --------------- | ------------------------------------------------------------------------------------------ |
| BootstrapScreen | Pantalla de arranque: compone el estado de conectividad mientras se prepara la navegación. |

## src/screens/admin/DashboardScreen.tsx

Compone el tablero sin consultas, navegación ni cálculos contables dentro del JSX.

[Abrir fuente](../src/screens/admin/DashboardScreen.tsx)

| Exportación     | Responsabilidad                                                                    |
| --------------- | ---------------------------------------------------------------------------------- |
| DashboardScreen | Compone el tablero sin consultas, navegación ni cálculos contables dentro del JSX. |

## src/screens/admin/ReportsScreen.tsx

Reportes administrativos por día, semana o mes.

[Abrir fuente](../src/screens/admin/ReportsScreen.tsx)

| Exportación   | Responsabilidad                                 |
| ------------- | ----------------------------------------------- |
| ReportsScreen | Reportes administrativos por día, semana o mes. |

## src/screens/admin/SettingsScreen.tsx

Horarios, capacidad, ventana de cancelación y categorías del negocio.

[Abrir fuente](../src/screens/admin/SettingsScreen.tsx)

| Exportación    | Responsabilidad                                                       |
| -------------- | --------------------------------------------------------------------- |
| SettingsScreen | Horarios, capacidad, ventana de cancelación y categorías del negocio. |

## src/screens/admin/UsersScreen.tsx

ABML de usuarios con filtros y cambios de rol reservados al administrador.

[Abrir fuente](../src/screens/admin/UsersScreen.tsx)

| Exportación | Responsabilidad                                                            |
| ----------- | -------------------------------------------------------------------------- |
| UsersScreen | ABML de usuarios con filtros y cambios de rol reservados al administrador. |

## src/screens/auth/SignInScreen.tsx

Acceso común a los tres roles; el servidor determina la experiencia después de autenticar.

[Abrir fuente](../src/screens/auth/SignInScreen.tsx)

| Exportación  | Responsabilidad                                                                            |
| ------------ | ------------------------------------------------------------------------------------------ |
| SignInScreen | Acceso común a los tres roles; el servidor determina la experiencia después de autenticar. |

## src/screens/auth/SignUpScreen.tsx

Registro de clientes con validación por campo.

[Abrir fuente](../src/screens/auth/SignUpScreen.tsx)

| Exportación  | Responsabilidad                                |
| ------------ | ---------------------------------------------- |
| SignUpScreen | Registro de clientes con validación por campo. |

## src/screens/bootstrap.styles.ts

Layout centrado, desplazable y con ancho legible en teléfono o tablet.

[Abrir fuente](../src/screens/bootstrap.styles.ts)

| Exportación     | Responsabilidad                                                        |
| --------------- | ---------------------------------------------------------------------- |
| bootstrapStyles | Layout centrado, desplazable y con ancho legible en teléfono o tablet. |

## src/screens/client/AppointmentDetailScreen.tsx

Detalle de reserva con controles del rol, notas y comprobante histórico.

[Abrir fuente](../src/screens/client/AppointmentDetailScreen.tsx)

| Exportación             | Responsabilidad                                                          |
| ----------------------- | ------------------------------------------------------------------------ |
| AppointmentDetailScreen | Detalle de reserva con controles del rol, notas y comprobante histórico. |

## src/screens/client/AppointmentsScreen.tsx

Lista de turnos con filtros, estados y navegación a detalles.

[Abrir fuente](../src/screens/client/AppointmentsScreen.tsx)

| Exportación        | Responsabilidad                                               |
| ------------------ | ------------------------------------------------------------- |
| AppointmentsScreen | Lista de turnos con filtros, estados y navegación a detalles. |

## src/screens/client/BookingScreen.tsx

Selección de vehículo, servicios, fecha y horario con total antes de confirmar.

[Abrir fuente](../src/screens/client/BookingScreen.tsx)

| Exportación   | Responsabilidad                                                                 |
| ------------- | ------------------------------------------------------------------------------- |
| BookingScreen | Selección de vehículo, servicios, fecha y horario con total antes de confirmar. |

## src/screens/client/HomeScreen.tsx

Composición del cliente. useHome conserva la obtención y selección de visitas.

[Abrir fuente](../src/screens/client/HomeScreen.tsx)

| Exportación | Responsabilidad                                                                |
| ----------- | ------------------------------------------------------------------------------ |
| HomeScreen  | Composición del cliente. useHome conserva la obtención y selección de visitas. |

## src/screens/client/ProfileScreen.tsx

Perfil, preferencia de tema persistente, contraseña local y cierre de sesión.

[Abrir fuente](../src/screens/client/ProfileScreen.tsx)

| Exportación   | Responsabilidad                                                               |
| ------------- | ----------------------------------------------------------------------------- |
| ProfileScreen | Perfil, preferencia de tema persistente, contraseña local y cierre de sesión. |

## src/screens/client/ServicesScreen.tsx

Catálogo del cliente y ABML administrativo reutilizando componentes.

[Abrir fuente](../src/screens/client/ServicesScreen.tsx)

| Exportación    | Responsabilidad                                                      |
| -------------- | -------------------------------------------------------------------- |
| ServicesScreen | Catálogo del cliente y ABML administrativo reutilizando componentes. |

## src/screens/client/VehiclesScreen.tsx

Vehículos propios o administración de titulares, con ABML y búsqueda.

[Abrir fuente](../src/screens/client/VehiclesScreen.tsx)

| Exportación    | Responsabilidad                                                       |
| -------------- | --------------------------------------------------------------------- |
| VehiclesScreen | Vehículos propios o administración de titulares, con ABML y búsqueda. |

## src/screens/employee/EmployeeAgendaScreen.tsx

Experiencia del equipo separada de la pantalla de clientes y de administración.

[Abrir fuente](../src/screens/employee/EmployeeAgendaScreen.tsx)

| Exportación          | Responsabilidad                                                                 |
| -------------------- | ------------------------------------------------------------------------------- |
| EmployeeAgendaScreen | Experiencia del equipo separada de la pantalla de clientes y de administración. |

## src/theme/overview.styles.ts

Geometría de portadas, métricas y accesos; los colores se resuelven en el tema.

[Abrir fuente](../src/theme/overview.styles.ts)

| Exportación    | Responsabilidad                                                                 |
| -------------- | ------------------------------------------------------------------------------- |
| overviewStyles | Geometría de portadas, métricas y accesos; los colores se resuelven en el tema. |

## src/theme/pageHeading.styles.ts

Jerarquía tipográfica del encabezado principal, sin acoplarlo a colores o rutas.

[Abrir fuente](../src/theme/pageHeading.styles.ts)

| Exportación       | Responsabilidad                                                                  |
| ----------------- | -------------------------------------------------------------------------------- |
| pageHeadingStyles | Jerarquía tipográfica del encabezado principal, sin acoplarlo a colores o rutas. |

## src/theme/palettes.ts

Colores semánticos: ninguna pantalla necesita conocer los valores de marca.

[Abrir fuente](../src/theme/palettes.ts)

| Exportación | Responsabilidad                                                             |
| ----------- | --------------------------------------------------------------------------- |
| Palette     | Colores semánticos: ninguna pantalla necesita conocer los valores de marca. |
| palettes    | Azul editorial, superficies neutras y navegación oscura en ambos modos.     |

## src/theme/signIn.styles.ts

Composición de la presentación de acceso; su contraste se resuelve con la paleta.

[Abrir fuente](../src/theme/signIn.styles.ts)

| Exportación  | Responsabilidad                                                                   |
| ------------ | --------------------------------------------------------------------------------- |
| signInStyles | Composición de la presentación de acceso; su contraste se resuelve con la paleta. |

## src/theme/tokens.ts

Escala visual compartida. El contenido se adapta al viewport y a la escala de texto.

[Abrir fuente](../src/theme/tokens.ts)

| Exportación | Responsabilidad                                                                      |
| ----------- | ------------------------------------------------------------------------------------ |
| tokens      | Escala visual compartida. El contenido se adapta al viewport y a la escala de texto. |

## src/theme/workspace.styles.ts

Distribución de la aplicación: navegación persistente y una sola región desplazable.

[Abrir fuente](../src/theme/workspace.styles.ts)

| Exportación     | Responsabilidad                                                                      |
| --------------- | ------------------------------------------------------------------------------------ |
| workspaceStyles | Distribución de la aplicación: navegación persistente y una sola región desplazable. |

## src/types/entities.ts

Roles enviados y verificados por la API, sin código importado desde el backend.

[Abrir fuente](../src/types/entities.ts)

| Exportación       | Responsabilidad                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------- |
| Role              | Roles enviados y verificados por la API, sin código importado desde el backend.           |
| User              | Perfil público y permisos vigentes.                                                       |
| Session           | Sesión propia del backend; refresh se persiste solo en almacenamiento seguro nativo.      |
| Page              | Paginación REST.                                                                          |
| Vehicle           | Vehículo registrado.                                                                      |
| VehicleType       | Categoría de tarifas.                                                                     |
| Service           | Servicio y precios por tipo de vehículo, siempre en centavos ARS.                         |
| AppointmentStatus | Estados reales de una reserva.                                                            |
| Appointment       | Proyección de una reserva según el rol. Importes pueden faltar para empleados sin cobros. |
| Availability      | Cotización y opciones calculadas en backend.                                              |
| Settings          | Configuración de operación.                                                               |
| Payment           | Cobro asociado.                                                                           |
| Report            | Reporte administrativo.                                                                   |

## src/types/form.ts

Opción de catálogo o filtro sin dependencia del sistema visual.

[Abrir fuente](../src/types/form.ts)

| Exportación         | Responsabilidad                                                         |
| ------------------- | ----------------------------------------------------------------------- |
| Choice              | Opción de catálogo o filtro sin dependencia del sistema visual.         |
| FormFieldDefinition | Descripción de un campo de formulario; validación adicional en backend. |

## src/types/health.ts

Contrato propio del frontend, documentado en OpenAPI v0.1.0 del backend.

[Abrir fuente](../src/types/health.ts)

| Exportación    | Responsabilidad                                                          |
| -------------- | ------------------------------------------------------------------------ |
| HealthResponse | Contrato propio del frontend, documentado en OpenAPI v0.1.0 del backend. |
| HealthState    | Estados de conectividad que puede mostrar la pantalla inicial.           |

## src/types/icon.ts

Vocabulario visual local. No depende de fuentes, red ni glifos del sistema.

[Abrir fuente](../src/types/icon.ts)

| Exportación | Responsabilidad                                                             |
| ----------- | --------------------------------------------------------------------------- |
| IconName    | Vocabulario visual local. No depende de fuentes, red ni glifos del sistema. |

## src/types/navigation.ts

Destino visible de un rol; las guardas raíz y la API siguen controlando el acceso.

[Abrir fuente](../src/types/navigation.ts)

| Exportación    | Responsabilidad                                                                    |
| -------------- | ---------------------------------------------------------------------------------- |
| NavigationItem | Destino visible de un rol; las guardas raíz y la API siguen controlando el acceso. |

## src/utils/appointmentListTitle.ts

Título de la colección según rol e historial, sin reglas de acceso dentro del JSX.

[Abrir fuente](../src/utils/appointmentListTitle.ts)

| Exportación          | Responsabilidad                                                                    |
| -------------------- | ---------------------------------------------------------------------------------- |
| appointmentListTitle | Título de la colección según rol e historial, sin reglas de acceso dentro del JSX. |

## src/utils/bookingAvailability.ts

Explica por qué una fecha no puede ofrecer turnos antes de consultar un horario.

[Abrir fuente](../src/utils/bookingAvailability.ts)

| Exportación        | Responsabilidad                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| bookingDateMessage | Explica por qué una fecha no puede ofrecer turnos antes de consultar un horario.                |
| canBook            | Solo permite confirmar un horario de la cotización vigente y todavía futuro.                    |
| emptyAvailability  | Mensaje específico para un día sin horarios; mantiene compatibilidad con servidores anteriores. |

## src/utils/bookingSelection.ts

Deriva opciones y validez sin confiar en identificadores que ya no están disponibles.

[Abrir fuente](../src/utils/bookingSelection.ts)

| Exportación    | Responsabilidad                                                                       |
| -------------- | ------------------------------------------------------------------------------------- |
| bookingOptions | Deriva opciones y validez sin confiar en identificadores que ya no están disponibles. |

## src/utils/buildFormSchema.ts

Genera validación por campo sobre valores de texto del formulario móvil.

[Abrir fuente](../src/utils/buildFormSchema.ts)

| Exportación     | Responsabilidad                                                          |
| --------------- | ------------------------------------------------------------------------ |
| buildFormSchema | Genera validación por campo sobre valores de texto del formulario móvil. |

## src/utils/buttonColors.ts

Resuelve contraste y superficie de variantes sin repetir colores en los botones.

[Abrir fuente](../src/utils/buttonColors.ts)

| Exportación  | Responsabilidad                                                                  |
| ------------ | -------------------------------------------------------------------------------- |
| buttonColors | Resuelve contraste y superficie de variantes sin repetir colores en los botones. |

## src/utils/calendar.ts

Valida fecha real de calendario sin normalizar 31 de febrero a otro mes.

[Abrir fuente](../src/utils/calendar.ts)

| Exportación   | Responsabilidad                                                                         |
| ------------- | --------------------------------------------------------------------------------------- |
| validDate     | Valida fecha real de calendario sin normalizar 31 de febrero a otro mes.                |
| shiftMonth    | Cambia de mes conservando el día uno para evitar saltos por meses de distinta duración. |
| calendarDays  | Genera seis semanas de lunes a domingo; las celdas ajenas al mes quedan vacías.         |
| calendarLabel | Presenta una fecha sin que la zona del dispositivo la cambie al día anterior.           |

## src/utils/catalogFields.ts

Opciones de tarifa para los tipos registrados; la API valida su vigencia.

[Abrir fuente](../src/utils/catalogFields.ts)

| Exportación       | Responsabilidad                                                           |
| ----------------- | ------------------------------------------------------------------------- |
| priceFields       | Opciones de tarifa para los tipos registrados; la API valida su vigencia. |
| vehicleTypeFields | Edición de categorías preservando sus referencias históricas.             |

## src/utils/editorCommands.ts

Construye el guardado; solo cierra el formulario cuando el servidor lo confirma.

[Abrir fuente](../src/utils/editorCommands.ts)

| Exportación         | Responsabilidad                                                                        |
| ------------------- | -------------------------------------------------------------------------------------- |
| createSaveCommand   | Construye el guardado; solo cierra el formulario cuando el servidor lo confirma.       |
| createDeleteCommand | Construye la baja confirmada y refresca la colección sin ocultar errores del servidor. |

## src/utils/errorMessage.ts

Traduce fallas de red y errores REST a mensajes presentables.

[Abrir fuente](../src/utils/errorMessage.ts)

| Exportación  | Responsabilidad                                               |
| ------------ | ------------------------------------------------------------- |
| errorMessage | Traduce fallas de red y errores REST a mensajes presentables. |

## src/utils/foreground.ts

Indica si se puede actualizar sin actividad en segundo plano.

[Abrir fuente](../src/utils/foreground.ts)

| Exportación         | Responsabilidad                                                           |
| ------------------- | ------------------------------------------------------------------------- |
| isForeground        | Indica si se puede actualizar sin actividad en segundo plano.             |
| subscribeForeground | Escucha la vuelta al primer plano; el llamador controla la ruta enfocada. |

## src/utils/foreground.web.ts

Respeta pestañas ocultas; no mantiene despierto el servidor en segundo plano.

[Abrir fuente](../src/utils/foreground.web.ts)

| Exportación         | Responsabilidad                                                               |
| ------------------- | ----------------------------------------------------------------------------- |
| isForeground        | Respeta pestañas ocultas; no mantiene despierto el servidor en segundo plano. |
| subscribeForeground | Atiende el regreso a la pestaña o ventana sin depender del cambio de ruta.    |

## src/utils/format.ts

Presenta centavos como pesos argentinos sin alterar el valor persistido.

[Abrir fuente](../src/utils/format.ts)

| Exportación     | Responsabilidad                                                          |
| --------------- | ------------------------------------------------------------------------ |
| money           | Presenta centavos como pesos argentinos sin alterar el valor persistido. |
| appointmentDate | Fecha legible en la zona horaria operativa confirmada.                   |
| today           | Día ISO local de Argentina para filtros de jornada.                      |
| slotTime        | Hora local de una opción UTC, enviada por el servidor.                   |

## src/utils/makeCatalogCode.ts

Código técnico estable para el catálogo; solo se genera durante el alta.

[Abrir fuente](../src/utils/makeCatalogCode.ts)

| Exportación     | Responsabilidad                                                          |
| --------------- | ------------------------------------------------------------------------ |
| makeCatalogCode | Código técnico estable para el catálogo; solo se genera durante el alta. |

## src/utils/navigationOptions.ts

Apariencia común del stack; las pantallas no redefinen colores de navegación.

[Abrir fuente](../src/utils/navigationOptions.ts)

| Exportación  | Responsabilidad                                                                     |
| ------------ | ----------------------------------------------------------------------------------- |
| stackOptions | Apariencia común del stack; las pantallas no redefinen colores de navegación.       |
| tabOptions   | Barra inferior con áreas táctiles y etiquetas consistentes para Cliente y Empleado. |

## src/utils/parseApiUrl.ts

Valida un origen público HTTPS, sin credenciales, rutas ni direcciones locales.

[Abrir fuente](../src/utils/parseApiUrl.ts)

| Exportación | Responsabilidad                                                                 |
| ----------- | ------------------------------------------------------------------------------- |
| parseApiUrl | Valida un origen público HTTPS, sin credenciales, rutas ni direcciones locales. |

## src/utils/pendingOAuth.ts

Solo almacena PKCE temporal de la pestaña; nunca secretos de proveedores.

[Abrir fuente](../src/utils/pendingOAuth.ts)

| Exportación      | Responsabilidad                                                               |
| ---------------- | ----------------------------------------------------------------------------- |
| pendingOAuthKey  | Solo almacena PKCE temporal de la pestaña; nunca secretos de proveedores.     |
| readPendingOAuth | Verifica state, forma y vencimiento antes de permitir canjear un retorno web. |

## src/utils/pesosToCents.ts

Convierte un importe validado en pesos a centavos, sin multiplicación decimal inexacta.

[Abrir fuente](../src/utils/pesosToCents.ts)

| Exportación  | Responsabilidad                                                                         |
| ------------ | --------------------------------------------------------------------------------------- |
| pesosToCents | Convierte un importe validado en pesos a centavos, sin multiplicación decimal inexacta. |

## src/utils/profileDestination.ts

Selecciona la ruta protegida del perfil de la sesión actual.

[Abrir fuente](../src/utils/profileDestination.ts)

| Exportación        | Responsabilidad                                              |
| ------------------ | ------------------------------------------------------------ |
| profileDestination | Selecciona la ruta protegida del perfil de la sesión actual. |

## src/utils/queryRequest.ts

Construye una consulta con generaciones; solo conserva datos del mismo filtro en recarga silenciosa.

[Abrir fuente](../src/utils/queryRequest.ts)

| Exportación        | Responsabilidad                                                                                      |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| createQueryRequest | Construye una consulta con generaciones; solo conserva datos del mismo filtro en recarga silenciosa. |

## src/utils/queryState.ts

Una respuesta siempre conserva la identidad de los filtros que la produjeron.

[Abrir fuente](../src/utils/queryState.ts)

| Exportación  | Responsabilidad                                                                        |
| ------------ | -------------------------------------------------------------------------------------- |
| QueryState   | Una respuesta siempre conserva la identidad de los filtros que la produjeron.          |
| currentQuery | Oculta datos obsoletos inmediatamente, incluso antes de ejecutarse el efecto de React. |
| readLatest   | Publica únicamente la última petición de un consumidor todavía activo.                 |

## src/utils/refreshGate.ts

Evita recargas solapadas y eventos duplicados de foco/visibilidad.

[Abrir fuente](../src/utils/refreshGate.ts)

| Exportación       | Responsabilidad                                                    |
| ----------------- | ------------------------------------------------------------------ |
| createRefreshGate | Evita recargas solapadas y eventos duplicados de foco/visibilidad. |

## src/utils/refreshResources.ts

Recarga consultas relacionadas después de una acción o regreso a la pantalla.

[Abrir fuente](../src/utils/refreshResources.ts)

| Exportación      | Responsabilidad                                                               |
| ---------------- | ----------------------------------------------------------------------------- |
| refreshResources | Recarga consultas relacionadas después de una acción o regreso a la pantalla. |

## src/utils/restoreDestination.ts

Limita el retorno de arranque a pantallas internas permitidas para el rol actual.

[Abrir fuente](../src/utils/restoreDestination.ts)

| Exportación        | Responsabilidad                                                                   |
| ------------------ | --------------------------------------------------------------------------------- |
| restoreDestination | Limita el retorno de arranque a pantallas internas permitidas para el rol actual. |

## src/utils/routeAccess.ts

Resuelve guardas con el rol verificado; durante restauración solo deja rutas públicas.

[Abrir fuente](../src/utils/routeAccess.ts)

| Exportación    | Responsabilidad                                                                        |
| -------------- | -------------------------------------------------------------------------------------- |
| hasRouteAccess | Resuelve guardas con el rol verificado; durante restauración solo deja rutas públicas. |

## src/utils/scrollVisibility.ts

Medidas de la región desplazable; los valores se mantienen fuera del estado visual.

[Abrir fuente](../src/utils/scrollVisibility.ts)

| Exportación          | Responsabilidad                                                                     |
| -------------------- | ----------------------------------------------------------------------------------- |
| ScrollMetrics        | Medidas de la región desplazable; los valores se mantienen fuera del estado visual. |
| shouldOfferScrollTop | Evita ofrecer volver arriba en páginas cortas, al inicio o tras reducir contenido.  |

## src/utils/serviceForm.ts

Serializa campos de servicio; el código permanece estable durante una edición.

[Abrir fuente](../src/utils/serviceForm.ts)

| Exportación          | Responsabilidad                                                                |
| -------------------- | ------------------------------------------------------------------------------ |
| servicePayload       | Serializa campos de servicio; el código permanece estable durante una edición. |
| serviceInitialValues | Valores de edición sin convertir null en texto visible.                        |

## src/utils/sessionFailure.ts

Solo un rechazo definitivo de credenciales invalida la sesión local.

[Abrir fuente](../src/utils/sessionFailure.ts)

| Exportación       | Responsabilidad                                                      |
| ----------------- | -------------------------------------------------------------------- |
| isSessionRejected | Solo un rechazo definitivo de credenciales invalida la sesión local. |

## src/utils/settingsForm.ts

Presenta configuración remota como campos de texto sin alterar zona ni moneda.

[Abrir fuente](../src/utils/settingsForm.ts)

| Exportación           | Responsabilidad                                                                |
| --------------------- | ------------------------------------------------------------------------------ |
| settingsInitialValues | Presenta configuración remota como campos de texto sin alterar zona ni moneda. |

## src/utils/startWebOAuth.ts

Prepara PKCE y navega en la misma pestaña, sin secretos de proveedor ni popups.

[Abrir fuente](../src/utils/startWebOAuth.ts)

| Exportación   | Responsabilidad                                                                 |
| ------------- | ------------------------------------------------------------------------------- |
| startWebOAuth | Prepara PKCE y navega en la misma pestaña, sin secretos de proveedor ni popups. |

## src/utils/toggleChoice.ts

Agrega/quita una selección; la representación CSV coincide con filtros del contrato REST.

[Abrir fuente](../src/utils/toggleChoice.ts)

| Exportación  | Responsabilidad                                                                           |
| ------------ | ----------------------------------------------------------------------------------------- |
| toggleChoice | Agrega/quita una selección; la representación CSV coincide con filtros del contrato REST. |

## src/utils/userForm.ts

Construye opciones autorizadas; la cuenta propia conserva el rol administrador.

[Abrir fuente](../src/utils/userForm.ts)

| Exportación       | Responsabilidad                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| userFields        | Construye opciones autorizadas; la cuenta propia conserva el rol administrador. |
| userInitialValues | Serializa una cuenta a valores de formulario sin exponer credenciales.          |

## src/utils/vehicleForm.ts

Construye el formulario sin ofrecer selección de titulares a un cliente.

[Abrir fuente](../src/utils/vehicleForm.ts)

| Exportación          | Responsabilidad                                                                  |
| -------------------- | -------------------------------------------------------------------------------- |
| vehicleFields        | Construye el formulario sin ofrecer selección de titulares a un cliente.         |
| vehicleInitialValues | Valores de edición del vehículo; el backend impide cambiar su titular histórico. |
| vehiclePayload       | Serializa únicamente atributos permitidos de un vehículo.                        |
