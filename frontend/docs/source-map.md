# Mapa completo del código propio

<!-- Generado por npm run docs. Cambiar los contratos junto al código y regenerar. -->

Incluye producción, soporte de base, scripts y pruebas. Excluye dependencias, secretos y compilaciones. Las firmas y explicaciones se extraen de la fuente; no ejecuta módulos ni lee `.env`.

Ver [guía del proyecto](../../docs/README.md) y [mantenimiento](../../docs/maintenance.md).

## src/api/backendConnection.ts

Espera al servidor antes de enviar credenciales o una operación de escritura.

[Abrir fuente](../src/api/backendConnection.ts)

| Exportación        | Responsabilidad                                                               |
| ------------------ | ----------------------------------------------------------------------------- |
| ensureBackendReady | Espera al servidor antes de enviar credenciales o una operación de escritura. |
| markBackendReady   | Renueva la ventana de disponibilidad con una respuesta JSON válida.           |

### ensureBackendReady

```ts
export function ensureBackendReady();
```

- @returns Promesa compartida; rechaza si se agota el plazo de conexión.

### markBackendReady

```ts
export function markBackendReady();
```

- @returns void.

## src/api/client.ts

Transporte autenticado; espera disponibilidad antes de enviar una escritura.

[Abrir fuente](../src/api/client.ts)

| Exportación | Responsabilidad                                                              |
| ----------- | ---------------------------------------------------------------------------- |
| apiUrl      | Contrato de tipos o reexportación; consultar la fuente enlazada.             |
| apiClient   | Transporte autenticado; espera disponibilidad antes de enviar una escritura. |

## src/api/config.ts

Origen público validado; no contiene credenciales.

[Abrir fuente](../src/api/config.ts)

| Exportación | Responsabilidad                                    |
| ----------- | -------------------------------------------------- |
| apiUrl      | Origen público validado; no contiene credenciales. |
| requireApi  | Verifica configuración antes de conectar.          |

### requireApi

```ts
export function requireApi();
```

- @returns void.
- @throws Error si falta el origen HTTPS de la API.

## src/api/connectionState.ts

Estado externo de la conexión inicial compartida.

[Abrir fuente](../src/api/connectionState.ts)

| Exportación         | Responsabilidad                                             |
| ------------------- | ----------------------------------------------------------- |
| getConnecting       | Estado externo de la conexión inicial compartida.           |
| subscribeConnection | Suscribe el aviso global sin iniciar tráfico de red.        |
| setConnecting       | Publica transiciones, sin exponer URLs ni errores internos. |

### getConnecting

```ts
export function getConnecting();
```

- @returns true mientras una acción espera al servidor.

### subscribeConnection

```ts
export function subscribeConnection(listener: () => void);
```

- @param listener Actualizador del consumidor.
- @returns Función de desuscripción.

### setConnecting

```ts
export function setConnecting(value: boolean);
```

- @param value Estado de espera de la compuerta de disponibilidad.
- @returns void.

## src/api/readinessGate.ts

Agrupa el despertar del servidor para evitar una solicitud por cada selector.

[Abrir fuente](../src/api/readinessGate.ts)

| Exportación         | Responsabilidad                                                               |
| ------------------- | ----------------------------------------------------------------------------- |
| createReadinessGate | Agrupa el despertar del servidor para evitar una solicitud por cada selector. |

### createReadinessGate

```ts
export function createReadinessGate(deps: Dependencies);
```

- @param deps Reloj, espera y sondeo GET comprobables sin infraestructura.
- @returns ensure, que espera una única conexión, y markReady para respuestas válidas.

## src/api/renewRequest.ts

Marca la identidad de origen para no repetir peticiones de otra cuenta.

[Abrir fuente](../src/api/renewRequest.ts)

| Exportación       | Responsabilidad                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| AuthRequestConfig | Marca la identidad de origen para no repetir peticiones de otra cuenta.         |
| renewRequest      | Reintenta solo un rechazo 401, conservando sesión en errores de red y servidor. |

### renewRequest

```ts
export async function renewRequest(
  error: unknown,
  retry: (config: AuthRequestConfig) => Promise<AxiosResponse>,
);
```

- @param error Rechazo del transporte autenticado.
- @param retry Cliente que vuelve a ejecutar la petición una sola vez.
- @returns Respuesta autorizada o el rechazo original.

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

### register

```ts
export async function register(input: Record<string, string>);
```

- @param input - Nombre, apellido, correo y contraseña del registro; la API asigna siempre el rol Cliente.
- @returns Sesión de la cuenta nueva: perfil público, access, refresh y vencimiento en segundos.

### login

```ts
export async function login(input: { email: string; password: string });
```

- @param input - Correo y contraseña que se transmiten exclusivamente al backend configurado.
- @returns Sesión propia de Lavadero; un rechazo HTTP se propaga al hook de acceso.

### refreshSession

```ts
export async function refreshSession(refreshToken: string);
```

- @param refreshToken - Credencial opaca del dispositivo, revocable por el servidor.
- @returns Sesión rotada; el llamador persiste el nuevo refresh antes de publicar la sesión.

### logout

```ts
export async function logout(refreshToken: string);
```

- @param refreshToken - Credencial opaca del dispositivo, revocable por el servidor.
- @returns Promesa sin valor tras revocar la familia; la limpieza local corresponde a sessionActions.

### exchangeSocial

```ts
export async function exchangeSocial(code: string, codeVerifier: string, password?: string);
```

- @param code - Código efímero recibido del flujo de autorización.
- @param codeVerifier - Secreto PKCE original de la app que inició el acceso.
- @param password - Contraseña de la cuenta, usada solo para comprobar su propiedad.
- @returns Sesión de Lavadero tras consumir el grant con PKCE; la vinculación puede requerir la contraseña local.

### getProviders

```ts
export async function getProviders();
```

- @returns Disponibilidad pública de Google, Discord y GitHub, según su configuración privada en el servidor.

## src/api/services/healthService.ts

Comprueba conectividad. @throws Error ante configuración ausente, red o respuesta inválida.

[Abrir fuente](../src/api/services/healthService.ts)

| Exportación  | Responsabilidad                                                                             |
| ------------ | ------------------------------------------------------------------------------------------- |
| getApiHealth | Comprueba conectividad. @throws Error ante configuración ausente, red o respuesta inválida. |

### getApiHealth

```ts
export async function getApiHealth(signal?: AbortSignal): Promise<HealthResponse>;
```

- @param signal - Señal de cancelación transmitida al transporte HTTP.
- @returns `Promise<HealthResponse>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/api/services/oauthStartService.ts

Prepara una autorización PKCE por JSON y verifica el destino antes de salir de la app.

[Abrir fuente](../src/api/services/oauthStartService.ts)

| Exportación        | Responsabilidad                                                                        |
| ------------------ | -------------------------------------------------------------------------------------- |
| prepareSocialLogin | Prepara una autorización PKCE por JSON y verifica el destino antes de salir de la app. |

### prepareSocialLogin

```ts
export async function prepareSocialLogin(
  provider: keyof typeof origins,
  authorizationUrl: string,
);
```

- @param provider Proveedor soportado, nunca una URL arbitraria.
- @param authorizationUrl Solicitud generada por AuthSession con state y PKCE.
- @returns URL HTTPS del proveedor elegido.
- @throws Error ante un destino o contrato inesperado.

## src/api/services/recoveryService.ts

Estado público del canal, sin credenciales ni identidad de destinatarios.

[Abrir fuente](../src/api/services/recoveryService.ts)

| Exportación             | Responsabilidad                                                           |
| ----------------------- | ------------------------------------------------------------------------- |
| RecoveryStatus          | Estado público del canal, sin credenciales ni identidad de destinatarios. |
| getRecoveryStatus       | Consulta si está conectado el correo de pruebas.                          |
| requestPasswordRecovery | Solicita un enlace con la misma respuesta para cualquier correo.          |
| resetPassword           | Consume el enlace de un solo uso, sin iniciar sesión automáticamente.     |

### getRecoveryStatus

```ts
export async function getRecoveryStatus();
```

- @returns Disponibilidad pública del canal.

### requestPasswordRecovery

```ts
export async function requestPasswordRecovery(email: string);
```

- @param email - Correo escrito por la persona.
- @returns Promesa de solicitud aceptada, sin confirmar si existe la cuenta.

### resetPassword

```ts
export async function resetPassword(token: string, newPassword: string);
```

- @param token - Token del fragmento, mantenido solo en memoria.
- @param newPassword - Nueva contraseña; viaja únicamente por HTTPS.
- @returns Promesa de restablecimiento confirmado por el servidor.

## src/api/services/resourceService.ts

Parámetros de filtros de listas, nunca URLs arbitrarias de terceros.

[Abrir fuente](../src/api/services/resourceService.ts)

| Exportación   | Responsabilidad                                                                      |
| ------------- | ------------------------------------------------------------------------------------ |
| Query         | Parámetros de filtros de listas, nunca URLs arbitrarias de terceros.                 |
| readResource  | Lee una ruta versionada del contrato público.                                        |
| writeResource | Escribe una ruta versionada; componentes delegan a hooks que consumen este servicio. |
| readOptions   | Carga opciones de formularios paginadas sin truncar a los primeros cien registros.   |

### readResource

```ts
export async function readResource<T>(path: string, query: Query = {});
```

- @param path - Ruta relativa del recurso dentro de la API versionada.
- @param query - Filtros y paginación enviados como parámetros de consulta.
- @returns `Promise<T>`.

### writeResource

```ts
export async function writeResource<T>(
  method: 'post' | 'put' | 'patch' | 'delete',
  path: string,
  body: unknown = {},
);
```

- @param method - Verbo HTTP permitido para la escritura.
- @param path - Ruta relativa del recurso dentro de la API versionada.
- @param body - Carga validada de la operación de escritura.
- @returns `Promise<T>`.

### readOptions

```ts
export async function readOptions<T>(path: string, query: Query = {});
```

- @param path - Ruta relativa del recurso dentro de la API versionada.
- @param query - Filtros y paginación enviados como parámetros de consulta.
- @returns `Promise<T[]>`.

## src/api/services/restoreSession.ts

Restaura la sesión segura sin publicar resultados de un proveedor desmontado.

[Abrir fuente](../src/api/services/restoreSession.ts)

| Exportación    | Responsabilidad                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| restoreSession | Restaura la sesión segura sin publicar resultados de un proveedor desmontado. |

### restoreSession

```ts
export async function restoreSession(isActive: () => boolean);
```

- @param isActive - Permite descartar el resultado si el consumidor se desmontó.
- @returns `Promise<void>`.

## src/api/services/sessionActions.ts

Persiste el refresh antes de publicar la sesión para sus consumidores.

[Abrir fuente](../src/api/services/sessionActions.ts)

| Exportación | Responsabilidad                                                                        |
| ----------- | -------------------------------------------------------------------------------------- |
| accept      | Persiste el refresh antes de publicar la sesión para sus consumidores.                 |
| signOut     | Elimina primero el acceso local y después intenta revocar su familia en el backend.    |
| reloadUser  | Recarga el perfil propio después de editar, sin reemplazar las credenciales de sesión. |

## src/api/services/sessionRenewalService.ts

Única vía de rotación usada por restauración e interceptor; evita reuso accidental del refresh.

[Abrir fuente](../src/api/services/sessionRenewalService.ts)

| Exportación        | Responsabilidad                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| renewStoredSession | Única vía de rotación usada por restauración e interceptor; evita reuso accidental del refresh. |

### renewStoredSession

```ts
export function renewStoredSession();
```

- @returns Sesión validada en servidor o null si el usuario cerró sesión; puede rechazar por red o revocación.

## src/api/services/userService.ts

Alta de cliente/empleado o edición administrativa que conserva el rol actual.

[Abrir fuente](../src/api/services/userService.ts)

| Exportación | Responsabilidad                                                               |
| ----------- | ----------------------------------------------------------------------------- |
| saveUser    | Alta de cliente/empleado o edición administrativa que conserva el rol actual. |

### saveUser

```ts
export async function saveUser(current: User | null, v: Record<string, string>);
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @param v - Datos tipados del elemento o formulario que se transforma.
- @returns `Promise<unknown>`.

## src/api/sessionLock.ts

Serializa aceptación, cierre y rotación dentro de la instancia nativa.

[Abrir fuente](../src/api/sessionLock.ts)

| Exportación         | Responsabilidad                                                        |
| ------------------- | ---------------------------------------------------------------------- |
| runSessionExclusive | Serializa aceptación, cierre y rotación dentro de la instancia nativa. |

### runSessionExclusive

```ts
export function runSessionExclusive<T>(operation: () => Promise<T>): Promise<T>;
```

- @param operation Operación que lee/cambia la credencial persistente.
- @returns Resultado propio; una falla no bloquea las acciones siguientes.

## src/api/sessionLock.web.ts

Serializa rotaciones entre pestañas mediante Web Locks, liberados también ante fallos.

[Abrir fuente](../src/api/sessionLock.web.ts)

| Exportación         | Responsabilidad                                                                        |
| ------------------- | -------------------------------------------------------------------------------------- |
| runSessionExclusive | Serializa rotaciones entre pestañas mediante Web Locks, liberados también ante fallos. |

### runSessionExclusive

```ts
export function runSessionExclusive<T>(operation: () => Promise<T>): Promise<T>;
```

- @param operation Operación de credenciales dentro del bloqueo del origen.
- @returns Resultado exclusivo; sin Web Locks conserva la cola de la pestaña.

## src/api/sessionRevision.ts

Lee la generación de identidad, distinta de la rotación del token de la misma cuenta.

[Abrir fuente](../src/api/sessionRevision.ts)

| Exportación           | Responsabilidad                                                                       |
| --------------------- | ------------------------------------------------------------------------------------- |
| sessionRevision       | Lee la generación de identidad, distinta de la rotación del token de la misma cuenta. |
| changeSessionRevision | Invalida operaciones anteriores antes de aceptar/cerrar explícitamente una cuenta.    |

### sessionRevision

```ts
export function sessionRevision();
```

- @returns Generación que permite descartar respuestas de una cuenta que se cerró/cambió.

### changeSessionRevision

```ts
export function changeSessionRevision();
```

- @returns Nueva generación que debe seguir vigente antes de publicar una respuesta asíncrona.

## src/api/sessionStorage.ts

Lee la credencial cifrada nativa; reconoce tokens legados hasta su primera renovación.

[Abrir fuente](../src/api/sessionStorage.ts)

| Exportación               | Responsabilidad                                                                         |
| ------------------------- | --------------------------------------------------------------------------------------- |
| readStoredCredential      | Lee la credencial cifrada nativa; reconoce tokens legados hasta su primera renovación.  |
| readRefresh               | Consulta el refresh sin exponer metadatos al transporte.                                |
| storeRefresh              | Conserva refresh y titular en almacenamiento seguro para todos los roles/proveedores.   |
| deleteRefresh             | Elimina la credencial del dispositivo, además del estado de navegación.                 |
| subscribeStoredCredential | Adaptador común de sincronización; nativo tiene un único contexto JavaScript de sesión. |

### readStoredCredential

```ts
export async function readStoredCredential();
```

- @returns Credencial vigente o null; el perfil/rol se recuperan exclusivamente desde el servidor.

### readRefresh

```ts
export async function readRefresh();
```

- @returns Token vigente o null al cerrar sesión/vencer la persistencia local.

### storeRefresh

```ts
export async function storeRefresh(token: string, userId: string);
```

- @param token Credencial opaca del servidor; nunca una contraseña.
- @param userId ID del titular confirmado por la API.
- @returns Promesa resuelta después de persistir y antes de publicar la sesión.

### deleteRefresh

```ts
export async function deleteRefresh();
```

- @returns Promesa resuelta al quitar la persistencia local.

### subscribeStoredCredential

```ts
export function subscribeStoredCredential(listener: (value: StoredCredential | null) => void);
```

- @param listener Consumidor común; nativo no recibe eventos entre pestañas web.
- @returns Limpieza compatible con la implementación web.

## src/api/sessionStorage.web.ts

Lee la credencial local; la API valida cuenta, sesión y permisos al reabrir.

[Abrir fuente](../src/api/sessionStorage.web.ts)

| Exportación               | Responsabilidad                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| readStoredCredential      | Lee la credencial local; la API valida cuenta, sesión y permisos al reabrir.             |
| readRefresh               | Consulta el refresh persistente común a las pestañas del mismo origen.                   |
| storeRefresh              | Conserva el ingreso al cerrar pestaña/navegador; la vigencia final la decide el backend. |
| deleteRefresh             | Quita el token de ambos almacenes y conserva una marca de cierre sin datos sensibles.    |
| subscribeStoredCredential | Sincroniza cierre, cambio de cuenta y rotación sin duplicar renovaciones de red.         |

### readStoredCredential

```ts
export async function readStoredCredential();
```

- @returns Credencial vigente o null, incluida migración desde una versión anterior.

### readRefresh

```ts
export async function readRefresh();
```

- @returns Token opaco vigente o null; nunca recupera access JWT ni perfil desde disco.

### storeRefresh

```ts
export async function storeRefresh(token: string, userId: string);
```

- @param token Refresh opaco emitido por la API.
- @param userId Titular confirmado en la sesión recibida.
- @returns Promesa resuelta tras guardar y retirar la copia heredada de la pestaña.

### deleteRefresh

```ts
export async function deleteRefresh();
```

- @returns Promesa resuelta tras el cierre persistente, sincronizado con otras pestañas.

### subscribeStoredCredential

```ts
export function subscribeStoredCredential(listener: (value: StoredCredential | null) => void);
```

- @param listener Recibe credencial nueva o null; no debe usarla como perfil autorizado.
- @returns Limpieza del listener; el navegador no emite el evento en la pestaña que escribió.

## src/api/sessionStore.ts

Lee sesión solo en memoria; componentes consumen AuthContext.

[Abrir fuente](../src/api/sessionStore.ts)

| Exportación      | Responsabilidad                                                                       |
| ---------------- | ------------------------------------------------------------------------------------- |
| getSession       | Lee sesión solo en memoria; componentes consumen AuthContext.                         |
| setSession       | Publica cambios de sesión para que guardas y navegación reaccionen a nuevos permisos. |
| subscribeSession | Suscribe estado global y devuelve limpieza.                                           |

### getSession

```ts
export function getSession();
```

- @returns `Session | null`.

### setSession

```ts
export function setSession(session: Session | null);
```

- @param session - Sesión del backend en memoria, o null para cerrar el acceso local.
- @returns `void`.

### subscribeSession

```ts
export function subscribeSession(callback: (session: Session | null) => void);
```

- @param callback - Consumidor que recibe el próximo valor publicado.
- @returns `() => void`.

## src/api/transport.ts

Transporte público; la preparación de conexión nunca reenvía una mutación.

[Abrir fuente](../src/api/transport.ts)

| Exportación     | Responsabilidad                                                            |
| --------------- | -------------------------------------------------------------------------- |
| apiUrl          | Contrato de tipos o reexportación; consultar la fuente enlazada.           |
| requireApi      | Contrato de tipos o reexportación; consultar la fuente enlazada.           |
| publicTransport | Transporte público; la preparación de conexión nunca reenvía una mutación. |

## src/api/validateResponse.ts

Impide interpretar HTML de arranque o proxy como datos de negocio.

[Abrir fuente](../src/api/validateResponse.ts)

| Exportación      | Responsabilidad                                                    |
| ---------------- | ------------------------------------------------------------------ |
| validateResponse | Impide interpretar HTML de arranque o proxy como datos de negocio. |

### validateResponse

```ts
export function validateResponse(response: AxiosResponse);
```

- @param response Respuesta de un transporte de la aplicación.
- @returns La misma respuesta cuando respeta el contrato JSON.
- @throws Error ante una respuesta inesperada, sin repetir una posible escritura.

## src/api/webCredentialStore.ts

Almacenamiento del origen, separado de la clave de pestaña de las versiones anteriores.

[Abrir fuente](../src/api/webCredentialStore.ts)

| Exportación              | Responsabilidad                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------- |
| persistentCredentialKey  | Almacenamiento del origen, separado de la clave de pestaña de las versiones anteriores. |
| legacyCredentialKey      | Credencial heredada; solo se migra después de renovarla con el servidor.                |
| createWebCredentialStore | Encapsula persistencia y migración web, con almacenes inyectables para pruebas.         |

### createWebCredentialStore

```ts
export function createWebCredentialStore(
  persistent: CredentialStorage,
  legacy: CredentialStorage,
  now = Date.now,
);
```

- @param persistent Almacenamiento que sobrevive al cierre del navegador.
- @param legacy Almacenamiento de la pestaña de una versión anterior.
- @param now Reloj que comprueba la vigencia local.
- @returns Lectura/escritura/cierre; la marca de cierre impide resucitar una copia legacy en otra pestaña.

## src/app/(admin)/_layout.tsx

Mantiene rutas administrativas separadas; Screen aporta el marco visual adaptable.

[Abrir fuente](<../src/app/(admin)/_layout.tsx>)

| Exportación | Responsabilidad                                                                    |
| ----------- | ---------------------------------------------------------------------------------- |
| AdminLayout | Mantiene rutas administrativas separadas; Screen aporta el marco visual adaptable. |

### AdminLayout

```ts
export default function AdminLayout();
```

- @returns Stack sin cabeceras duplicadas; las guardas permanecen en RootNavigation.

## src/app/(admin)/appointments.tsx

Vista administrativa de todos los turnos.

[Abrir fuente](<../src/app/(admin)/appointments.tsx>)

| Exportación       | Responsabilidad                           |
| ----------------- | ----------------------------------------- |
| AdminAppointments | Vista administrativa de todos los turnos. |

### AdminAppointments

```ts
export default function AdminAppointments();
```

- @returns Vista de AdminAppointments con el contrato de propiedades declarado.

## src/app/(admin)/attendance.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](<../src/app/(admin)/attendance.tsx>)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/(admin)/customer-messages.tsx

Bandeja de atención dentro del stack protegido de Administración.

[Abrir fuente](<../src/app/(admin)/customer-messages.tsx>)

| Exportación           | Responsabilidad                                                   |
| --------------------- | ----------------------------------------------------------------- |
| AdminCustomerMessages | Bandeja de atención dentro del stack protegido de Administración. |

### AdminCustomerMessages

```ts
export default function AdminCustomerMessages();
```

- @returns Pantalla con las acciones administrativas.

## src/app/(admin)/dashboard.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](<../src/app/(admin)/dashboard.tsx>)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/(admin)/profile.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](<../src/app/(admin)/profile.tsx>)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/(admin)/reports.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](<../src/app/(admin)/reports.tsx>)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/(admin)/services.tsx

Administración del catálogo y precios.

[Abrir fuente](<../src/app/(admin)/services.tsx>)

| Exportación   | Responsabilidad                        |
| ------------- | -------------------------------------- |
| AdminServices | Administración del catálogo y precios. |

### AdminServices

```ts
export default function AdminServices();
```

- @returns Vista de AdminServices con el contrato de propiedades declarado.

## src/app/(admin)/settings.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](<../src/app/(admin)/settings.tsx>)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/(admin)/users.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](<../src/app/(admin)/users.tsx>)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/(admin)/vehicles.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](<../src/app/(admin)/vehicles.tsx>)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/(admin)/walk-in.tsx

Ingreso presencial reservado a Administración por la navegación y la API.

[Abrir fuente](<../src/app/(admin)/walk-in.tsx>)

| Exportación | Responsabilidad                                                           |
| ----------- | ------------------------------------------------------------------------- |
| WalkIn      | Ingreso presencial reservado a Administración por la navegación y la API. |

### WalkIn

```ts
export default function WalkIn();
```

- @returns Pantalla de registro rápido.

## src/app/(client)/_layout.tsx

Cinco destinos del cliente, protegidos por el layout raíz.

[Abrir fuente](<../src/app/(client)/_layout.tsx>)

| Exportación  | Responsabilidad                                            |
| ------------ | ---------------------------------------------------------- |
| ClientLayout | Cinco destinos del cliente, protegidos por el layout raíz. |

### ClientLayout

```ts
export default function ClientLayout();
```

- @returns Vista de ClientLayout con el contrato de propiedades declarado.

## src/app/(client)/appointments.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](<../src/app/(client)/appointments.tsx>)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/(client)/home.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](<../src/app/(client)/home.tsx>)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/(client)/profile.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](<../src/app/(client)/profile.tsx>)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/(client)/services.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](<../src/app/(client)/services.tsx>)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/(client)/vehicles.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](<../src/app/(client)/vehicles.tsx>)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/(employee)/_layout.tsx

Agenda, historial y perfil del empleado.

[Abrir fuente](<../src/app/(employee)/_layout.tsx>)

| Exportación    | Responsabilidad                          |
| -------------- | ---------------------------------------- |
| EmployeeLayout | Agenda, historial y perfil del empleado. |

### EmployeeLayout

```ts
export default function EmployeeLayout();
```

- @returns Vista de EmployeeLayout con el contrato de propiedades declarado.

## src/app/(employee)/agenda.tsx

Ruta del equipo, restringida por la guarda de grupo y el servidor.

[Abrir fuente](<../src/app/(employee)/agenda.tsx>)

| Exportación | Responsabilidad                                                    |
| ----------- | ------------------------------------------------------------------ |
| Agenda      | Ruta del equipo, restringida por la guarda de grupo y el servidor. |

### Agenda

```ts
export default function Agenda();
```

- @returns Agenda o historial sin duplicar su implementación.

## src/app/(employee)/history.tsx

Ruta del equipo, restringida por la guarda de grupo y el servidor.

[Abrir fuente](<../src/app/(employee)/history.tsx>)

| Exportación | Responsabilidad                                                    |
| ----------- | ------------------------------------------------------------------ |
| History     | Ruta del equipo, restringida por la guarda de grupo y el servidor. |

### History

```ts
export default function History();
```

- @returns Agenda o historial sin duplicar su implementación.

## src/app/(employee)/profile.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](<../src/app/(employee)/profile.tsx>)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/_layout.tsx

Raíz Expo Router: proveedores separados de rutas y pantallas.

[Abrir fuente](../src/app/_layout.tsx)

| Exportación   | Responsabilidad                                                  |
| ------------- | ---------------------------------------------------------------- |
| RootLayout    | Raíz Expo Router: proveedores separados de rutas y pantallas.    |
| ErrorBoundary | Export reservado para que Router gestione errores de navegación. |

### RootLayout

```ts
export default function RootLayout();
```

- @returns Vista de RootLayout con el contrato de propiedades declarado.

## src/app/appointment/[id].tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](../src/app/appointment/%5Bid%5D.tsx)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/booking.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](../src/app/booking.tsx)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/forgot-password.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](../src/app/forgot-password.tsx)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/index.tsx

Entrada dirige al árbol del rol autorizado.

[Abrir fuente](../src/app/index.tsx)

| Exportación | Responsabilidad                             |
| ----------- | ------------------------------------------- |
| Index       | Entrada dirige al árbol del rol autorizado. |

### Index

```ts
export default function Index();
```

- @returns Vista de Index con el contrato de propiedades declarado.

## src/app/loading.tsx

Mantiene el navegador montado mientras se restaura y verifica la sesión.

[Abrir fuente](../src/app/loading.tsx)

| Exportación  | Responsabilidad                                                          |
| ------------ | ------------------------------------------------------------------------ |
| LoadingRoute | Mantiene el navegador montado mientras se restaura y verifica la sesión. |

### LoadingRoute

```ts
export default function LoadingRoute();
```

- @returns Vista de LoadingRoute con el contrato de propiedades declarado.

## src/app/oauth.tsx

Destino nativo de AuthSession; el popup devuelve el código al hook iniciador.

[Abrir fuente](../src/app/oauth.tsx)

| Exportación | Responsabilidad                                                               |
| ----------- | ----------------------------------------------------------------------------- |
| OAuthReturn | Destino nativo de AuthSession; el popup devuelve el código al hook iniciador. |

### OAuthReturn

```ts
export default function OAuthReturn();
```

- @returns Vista de OAuthReturn con el contrato de propiedades declarado.

## src/app/oauth.web.tsx

Retorno web en la misma pestaña; el APK usa oauth.tsx y AuthSession nativo.

[Abrir fuente](../src/app/oauth.web.tsx)

| Exportación    | Responsabilidad                                                             |
| -------------- | --------------------------------------------------------------------------- |
| WebOAuthReturn | Retorno web en la misma pestaña; el APK usa oauth.tsx y AuthSession nativo. |

### WebOAuthReturn

```ts
export default function WebOAuthReturn();
```

- @returns Vista de WebOAuthReturn con el contrato de propiedades declarado.

## src/app/reset-password.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](../src/app/reset-password.tsx)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/sign-in.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](../src/app/sign-in.tsx)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/sign-up.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](../src/app/sign-up.tsx)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/app/support.tsx

Composición interna; los tipos y el flujo se consultan en la fuente.

[Abrir fuente](../src/app/support.tsx)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## src/components/atoms/AppIcon.tsx

Ícono vectorial decorativo; la acción contenedora debe aportar su nombre accesible.

[Abrir fuente](../src/components/atoms/AppIcon.tsx)

| Exportación | Responsabilidad                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| AppIcon     | Ícono vectorial decorativo; la acción contenedora debe aportar su nombre accesible. |

### AppIcon

```ts
export function AppIcon({
  name,
  size = 20,
  color,
}: {
  name: IconName;
  size?: number;
  color?: string;
});
```

- @param props Nombre del catálogo local, tamaño en puntos y color opcional del tema.
- @returns SVG escalable sin descargas ni carga de fuentes.

## src/components/atoms/Avatar.tsx

Identidad con iniciales; no carga fotos ni recursos de terceros.

[Abrir fuente](../src/components/atoms/Avatar.tsx)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| Avatar      | Identidad con iniciales; no carga fotos ni recursos de terceros. |

### Avatar

```ts
export function Avatar({ name }: { name: string; url?: string | null });
```

- @param props - Nombre del perfil; url se conserva por compatibilidad del contrato.
- @returns Monograma accesible y consistente para todos los roles.

## src/components/atoms/Badge.tsx

Etiqueta compacta con tono semántico.

[Abrir fuente](../src/components/atoms/Badge.tsx)

| Exportación | Responsabilidad                       |
| ----------- | ------------------------------------- |
| Badge       | Etiqueta compacta con tono semántico. |

### Badge

```ts
export function Badge({
  label,
  tone = 'primary',
}: {
  label: string;
  tone?: 'primary' | 'success' | 'danger' | 'warning';
});
```

- @param props - Propiedades tipadas: label, tone.
- @returns Vista de Badge con el contrato de propiedades declarado.

## src/components/atoms/Button.tsx

Contrato de una acción. El callback no se ejecuta mientras carga o está deshabilitada.

[Abrir fuente](../src/components/atoms/Button.tsx)

| Exportación | Responsabilidad                                                                        |
| ----------- | -------------------------------------------------------------------------------------- |
| ButtonProps | Contrato de una acción. El callback no se ejecuta mientras carga o está deshabilitada. |
| Button      | Acción de 48 puntos con texto, ícono opcional y estado ocupado accesible.              |

### Button

```ts
export function Button({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  icon,
}: ButtonProps);
```

- @param props Etiqueta visible, callback, variante semántica y estado de interacción.
- @returns Pressable con contraste del tema; sustituye su contenido por un spinner al cargar.

## src/components/atoms/ButtonContent.tsx

Contenido visual del botón, independiente de Pressable y de su política de interacción.

[Abrir fuente](../src/components/atoms/ButtonContent.tsx)

| Exportación   | Responsabilidad                                                                         |
| ------------- | --------------------------------------------------------------------------------------- |
| ButtonContent | Contenido visual del botón, independiente de Pressable y de su política de interacción. |

### ButtonContent

```ts
export function ButtonContent({
  label,
  color,
  icon,
  loading,
}: {
  label: string;
  color: string;
  icon?: IconName | undefined;
  loading: boolean;
});
```

- @param props Texto, color resuelto, ícono y carga que reemplaza el contenido.
- @returns Ícono/texto o spinner; la accesibilidad pertenece al botón contenedor.

## src/components/atoms/CompactIconButton.tsx

Acción visual pequeña con objetivo táctil amplio y etiqueta para lectores de pantalla.

[Abrir fuente](../src/components/atoms/CompactIconButton.tsx)

| Exportación       | Responsabilidad                                                                        |
| ----------------- | -------------------------------------------------------------------------------------- |
| CompactIconButton | Acción visual pequeña con objetivo táctil amplio y etiqueta para lectores de pantalla. |

### CompactIconButton

```ts
export function CompactIconButton({
  icon,
  label,
  onPress,
  disabled = false,
  variant = 'neutral',
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'neutral' | 'danger';
});
```

- @param props Ícono, etiqueta, variante semántica, estado y callback autorizado por el contenedor.
- @returns Botón de 44 puntos sin texto visible.

## src/components/atoms/FloatingAction.tsx

Acción circular con nombre accesible y contraste adaptado al tema.

[Abrir fuente](../src/components/atoms/FloatingAction.tsx)

| Exportación    | Responsabilidad                                                    |
| -------------- | ------------------------------------------------------------------ |
| FloatingAction | Acción circular con nombre accesible y contraste adaptado al tema. |

### FloatingAction

```ts
export function FloatingAction({
  icon,
  label,
  onPress,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
});
```

- @param props Ícono local, nombre anunciado y acción del usuario.
- @returns Botón táctil de 48 puntos con foco y estado pulsado.

## src/components/atoms/Icon.tsx

Símbolo decorativo; el control que lo contiene aporta la etiqueta accesible.

[Abrir fuente](../src/components/atoms/Icon.tsx)

| Exportación | Responsabilidad                                                              |
| ----------- | ---------------------------------------------------------------------------- |
| Icon        | Símbolo decorativo; el control que lo contiene aporta la etiqueta accesible. |

### Icon

```ts
export function Icon({
  symbol,
  color,
  size = 24,
}: {
  symbol: string;
  color?: TextStyle['color'];
  size?: number;
});
```

- @param props - Propiedades tipadas: symbol, color, size.
- @returns Vista de Icon con el contrato de propiedades declarado.

## src/components/atoms/Input.tsx

Entrada controlada accesible, con tema y altura táctil suficiente.

[Abrir fuente](../src/components/atoms/Input.tsx)

| Exportación | Responsabilidad                                                    |
| ----------- | ------------------------------------------------------------------ |
| Input       | Entrada controlada accesible, con tema y altura táctil suficiente. |

### Input

```ts
export function Input(props: TextInputProps);
```

- @param props - Propiedades de presentación; mantiene el contrato nativo cuando corresponde.
- @returns Vista de Input con el contrato de propiedades declarado.

## src/components/atoms/Spinner.tsx

Indicador de espera con color semántico y descripción accesible.

[Abrir fuente](../src/components/atoms/Spinner.tsx)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| Spinner     | Indicador de espera con color semántico y descripción accesible. |

### Spinner

```ts
export function Spinner({ color, label = 'Cargando' }: { color?: string; label?: string });
```

- @param props - Propiedades tipadas: color, label.
- @returns Vista de Spinner con el contrato de propiedades declarado.

## src/components/atoms/Text.tsx

Texto con color semántico y tamaño consistente.

[Abrir fuente](../src/components/atoms/Text.tsx)

| Exportación | Responsabilidad                                 |
| ----------- | ----------------------------------------------- |
| Text        | Texto con color semántico y tamaño consistente. |

### Text

```ts
export function Text({ style, ...props }: TextProps);
```

- @param props Props estándar de Text nativo, incluido style.
- @returns Texto accesible con paleta del tema.

## src/components/molecules/AppointmentCancellation.tsx

Conserva el motivo visible en el detalle, incluso después de leer el aviso de Inicio.

[Abrir fuente](../src/components/molecules/AppointmentCancellation.tsx)

| Exportación             | Responsabilidad                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------- |
| AppointmentCancellation | Conserva el motivo visible en el detalle, incluso después de leer el aviso de Inicio. |

### AppointmentCancellation

```ts
export function AppointmentCancellation({ appointment }: { appointment: Appointment });
```

- @param props Turno autorizado por el servidor, con motivo y autor de cancelación.
- @returns Contexto de cancelación o nada para los demás estados.

## src/components/molecules/AppointmentCardFooter.tsx

La ausencia de importe significa falta de permiso, nunca un total cero.

[Abrir fuente](../src/components/molecules/AppointmentCardFooter.tsx)

| Exportación           | Responsabilidad                                                         |
| --------------------- | ----------------------------------------------------------------------- |
| AppointmentCardFooter | La ausencia de importe significa falta de permiso, nunca un total cero. |

### AppointmentCardFooter

```ts
export function AppointmentCardFooter({ appointment: a }: { appointment: Appointment });
```

- @param props Turno autorizado, que puede omitir importes para empleados.
- @returns Nombre operativo y total solo cuando el servidor lo incluyó.

## src/components/molecules/AppointmentNote.tsx

Observación guardada con autor y fecha, diferenciada del campo para escribir otra.

[Abrir fuente](../src/components/molecules/AppointmentNote.tsx)

| Exportación     | Responsabilidad                                                                    |
| --------------- | ---------------------------------------------------------------------------------- |
| AppointmentNote | Observación guardada con autor y fecha, diferenciada del campo para escribir otra. |

### AppointmentNote

```ts
export function AppointmentNote({ note }: { note: NonNullable<Appointment['notes']>[number] });
```

- @param props Nota devuelta por el servidor después de autorizar el turno.
- @returns Texto completo con procedencia y momento de registro.

## src/components/molecules/AppointmentVehicle.tsx

Datos operativos presentes en la proyección de todos los roles.

[Abrir fuente](../src/components/molecules/AppointmentVehicle.tsx)

| Exportación        | Responsabilidad                                                 |
| ------------------ | --------------------------------------------------------------- |
| AppointmentVehicle | Datos operativos presentes en la proyección de todos los roles. |

### AppointmentVehicle

```ts
export function AppointmentVehicle({ appointment: a }: { appointment: Appointment });
```

- @param props Turno ya autorizado, con resumen opcional de servicios.
- @returns Patente, vehículo, color y servicio, sin datos financieros.

## src/components/molecules/AuthReturnLink.tsx

Regreso al ingreso desde registro o recuperación.

[Abrir fuente](../src/components/molecules/AuthReturnLink.tsx)

| Exportación    | Responsabilidad                                   |
| -------------- | ------------------------------------------------- |
| AuthReturnLink | Regreso al ingreso desde registro o recuperación. |

### AuthReturnLink

```ts
export function AuthReturnLink();
```

- @returns Enlace accesible consistente con el tema activo.

## src/components/molecules/AvailableSlots.tsx

Horarios ya validados por el servidor y estado vacío cuando la fecha está completa.

[Abrir fuente](../src/components/molecules/AvailableSlots.tsx)

| Exportación    | Responsabilidad                                                                     |
| -------------- | ----------------------------------------------------------------------------------- |
| AvailableSlots | Horarios ya validados por el servidor y estado vacío cuando la fecha está completa. |

### AvailableSlots

```ts
export function AvailableSlots({
  quote,
  value,
  onChange,
}: {
  quote: Availability;
  value: string;
  onChange: (value: string) => void;
});
```

- @param props - Propiedades tipadas: quote, value, onChange.
- @returns Vista de AvailableSlots con el contrato de propiedades declarado.

## src/components/molecules/BookingSection.tsx

Agrupa un paso de la reserva con una jerarquía visual consistente.

[Abrir fuente](../src/components/molecules/BookingSection.tsx)

| Exportación    | Responsabilidad                                                    |
| -------------- | ------------------------------------------------------------------ |
| BookingSection | Agrupa un paso de la reserva con una jerarquía visual consistente. |

### BookingSection

```ts
export function BookingSection({
  number,
  title,
  children,
}: PropsWithChildren<{ number: string; title: string }>);
```

- @param props Número, título y controles del paso.
- @returns Panel numerado que conserva su orden de lectura en móvil.

## src/components/molecules/BrandLockup.tsx

Firma de marca compacta para acceso, menú y cabecera.

[Abrir fuente](../src/components/molecules/BrandLockup.tsx)

| Exportación | Responsabilidad                                       |
| ----------- | ----------------------------------------------------- |
| BrandLockup | Firma de marca compacta para acceso, menú y cabecera. |

### BrandLockup

```ts
export function BrandLockup({ inverse = false }: { inverse?: boolean });
```

- @param props Invierte los colores cuando la firma está sobre el fondo de navegación.
- @returns Marca vectorial y nombre legible, sin texto convertido en imagen.

## src/components/molecules/CalendarDay.tsx

Celda táctil del calendario o espacio vacío de la semana.

[Abrir fuente](../src/components/molecules/CalendarDay.tsx)

| Exportación | Responsabilidad                                           |
| ----------- | --------------------------------------------------------- |
| CalendarDay | Celda táctil del calendario o espacio vacío de la semana. |

### CalendarDay

```ts
export function CalendarDay({
  day,
  selected,
  onChange,
}: {
  day: string;
  selected: boolean;
  onChange: (day: string) => void;
});
```

- @param props Fecha ISO, selección y receptor del día elegido.
- @returns Botón con fecha completa y objetivo táctil de 44 puntos.

## src/components/molecules/CalendarGrid.tsx

Seis semanas de calendario, compartidas por web y dispositivos nativos.

[Abrir fuente](../src/components/molecules/CalendarGrid.tsx)

| Exportación  | Responsabilidad                                                         |
| ------------ | ----------------------------------------------------------------------- |
| CalendarGrid | Seis semanas de calendario, compartidas por web y dispositivos nativos. |

### CalendarGrid

```ts
export function CalendarGrid({
  month,
  value,
  onChange,
}: {
  month: string;
  value: string;
  onChange: (value: string) => void;
});
```

- @param props Mes visible, fecha actual y selección de día.
- @returns Grilla de lunes a domingo con celdas accesibles.

## src/components/molecules/CalendarNavigation.tsx

Cambia el mes visible sin modificar la fecha del formulario.

[Abrir fuente](../src/components/molecules/CalendarNavigation.tsx)

| Exportación        | Responsabilidad                                              |
| ------------------ | ------------------------------------------------------------ |
| CalendarNavigation | Cambia el mes visible sin modificar la fecha del formulario. |

### CalendarNavigation

```ts
export function CalendarNavigation({
  month,
  onChange,
}: {
  month: string;
  onChange: (month: string) => void;
});
```

- @param props Mes ISO y cambio del mes visible.
- @returns Navegación anterior/siguiente y título del mes.

## src/components/molecules/CancellationNoticeMessage.tsx

Explica qué reserva cambió y conserva el motivo completo, sin abreviarlo.

[Abrir fuente](../src/components/molecules/CancellationNoticeMessage.tsx)

| Exportación               | Responsabilidad                                                           |
| ------------------------- | ------------------------------------------------------------------------- |
| CancellationNoticeMessage | Explica qué reserva cambió y conserva el motivo completo, sin abreviarlo. |

### CancellationNoticeMessage

```ts
export function CancellationNoticeMessage({ notice }: { notice: CancellationNotice });
```

- @param props Aviso recibido desde la consulta propia del cliente.
- @returns Mensaje semántico con fecha, vehículo y alternativa para volver a reservar.

## src/components/molecules/Card.tsx

Superficie neutra para agrupar información; el estilo permite componer grids sin duplicarla.

[Abrir fuente](../src/components/molecules/Card.tsx)

| Exportación | Responsabilidad                                                                              |
| ----------- | -------------------------------------------------------------------------------------------- |
| Card        | Superficie neutra para agrupar información; el estilo permite componer grids sin duplicarla. |

### Card

```ts
export function Card({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>);
```

- @param props Contenido y ajuste opcional de distribución, nunca lógica de negocio.
- @returns Panel con borde y espaciado uniformes en los temas claro y oscuro.

## src/components/molecules/CareGuide.tsx

Ayuda basada en funciones existentes, sin prometer servicios ni tiempos fijos.

[Abrir fuente](../src/components/molecules/CareGuide.tsx)

| Exportación | Responsabilidad                                                                |
| ----------- | ------------------------------------------------------------------------------ |
| CareGuide   | Ayuda basada en funciones existentes, sin prometer servicios ni tiempos fijos. |

### CareGuide

```ts
export function CareGuide();
```

- @returns Pasos de la experiencia y recordatorio de consultar el estado antes de llegar.

## src/components/molecules/ChoiceButton.tsx

Opción táctil con estado seleccionado accesible y contraste del tema.

[Abrir fuente](../src/components/molecules/ChoiceButton.tsx)

| Exportación  | Responsabilidad                                                       |
| ------------ | --------------------------------------------------------------------- |
| ChoiceButton | Opción táctil con estado seleccionado accesible y contraste del tema. |

### ChoiceButton

```ts
export function ChoiceButton({
  option,
  selected,
  onPress,
}: {
  option: Choice;
  selected: boolean;
  onPress: () => void;
});
```

- @param props - Propiedades tipadas: option, selected, onPress.
- @returns Vista de ChoiceButton con el contrato de propiedades declarado.

## src/components/molecules/ChoiceGroup.tsx

Selector simple o múltiple; delega apariencia y transformación en piezas independientes.

[Abrir fuente](../src/components/molecules/ChoiceGroup.tsx)

| Exportación | Responsabilidad                                                                          |
| ----------- | ---------------------------------------------------------------------------------------- |
| Choice      | Contrato de tipos o reexportación; consultar la fuente enlazada.                         |
| ChoiceGroup | Selector simple o múltiple; delega apariencia y transformación en piezas independientes. |

### ChoiceGroup

```ts
export function ChoiceGroup({
  options,
  value,
  onChange,
  multiple = false,
}: {
  options: Choice[];
  value: string;
  onChange: (value: string) => void;
  multiple?: boolean;
});
```

- @param props - Propiedades tipadas: options, value, onChange, multiple.
- @returns Vista de ChoiceGroup con el contrato de propiedades declarado.

## src/components/molecules/ConnectionNotice.tsx

Aviso global durante el arranque, sin sacar al usuario de su pantalla.

[Abrir fuente](../src/components/molecules/ConnectionNotice.tsx)

| Exportación      | Responsabilidad                                                        |
| ---------------- | ---------------------------------------------------------------------- |
| ConnectionNotice | Aviso global durante el arranque, sin sacar al usuario de su pantalla. |

### ConnectionNotice

```ts
export function ConnectionNotice();
```

- @returns Mensaje accesible o null cuando la conexión responde normalmente.

## src/components/molecules/ConnectionStatus.tsx

Estado real de red.

[Abrir fuente](../src/components/molecules/ConnectionStatus.tsx)

| Exportación      | Responsabilidad     |
| ---------------- | ------------------- |
| ConnectionStatus | Estado real de red. |

### ConnectionStatus

```ts
export function ConnectionStatus({
  state,
  onRetry,
}: {
  state: HealthState;
  onRetry: () => void;
});
```

- @param props Estado y callback para volver a conectar.
- @returns Mensaje, indicador o botón según conectividad.

## src/components/molecules/ContractServiceLines.tsx

Servicios históricos; solo muestra importes que el servidor incluyó en la proyección del rol.

[Abrir fuente](../src/components/molecules/ContractServiceLines.tsx)

| Exportación          | Responsabilidad                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------- |
| ContractServiceLines | Servicios históricos; solo muestra importes que el servidor incluyó en la proyección del rol. |

### ContractServiceLines

```ts
export function ContractServiceLines({
  items,
  showDuration = false,
}: {
  items: NonNullable<Appointment['services']>;
  showDuration?: boolean;
});
```

- @param props - Propiedades tipadas: items, showDuration.
- @returns Vista de ContractServiceLines con el contrato de propiedades declarado.

## src/components/molecules/ControlledField.tsx

Adapta un campo RHF a la molécula de entrada, incluyendo errores y blur.

[Abrir fuente](../src/components/molecules/ControlledField.tsx)

| Exportación     | Responsabilidad                                                          |
| --------------- | ------------------------------------------------------------------------ |
| ControlledField | Adapta un campo RHF a la molécula de entrada, incluyendo errores y blur. |

### ControlledField

```ts
export function ControlledField({
  field,
  control,
}: {
  field: FormFieldDefinition;
  control: Control<Record<string, string>>;
});
```

- @param props - Propiedades tipadas: field, control.
- @returns Vista de ControlledField con el contrato de propiedades declarado.

## src/components/molecules/ControlledScrollView.tsx

Asocia medidas y referencia con un controlador sin introducir otra región desplazable.

[Abrir fuente](../src/components/molecules/ControlledScrollView.tsx)

| Exportación          | Responsabilidad                                                                        |
| -------------------- | -------------------------------------------------------------------------------------- |
| ControlledScrollView | Asocia medidas y referencia con un controlador sin introducir otra región desplazable. |

### ControlledScrollView

```ts
export function ControlledScrollView({
  controls,
  ...props
}: ComponentProps<typeof ScrollView> & {
  controls: ReturnType<typeof useScrollControls>;
});
```

- @param props Propiedades normales de ScrollView y controlador propietario de esta vista.
- @returns ScrollView con eventos medidos y desplazamiento imperativo seguro.

## src/components/molecules/DateInput.tsx

Selección de fecha mediante calendario, con valor ISO separado de su presentación.

[Abrir fuente](../src/components/molecules/DateInput.tsx)

| Exportación | Responsabilidad                                                                    |
| ----------- | ---------------------------------------------------------------------------------- |
| DateInput   | Selección de fecha mediante calendario, con valor ISO separado de su presentación. |

### DateInput

```ts
export function DateInput({
  label,
  value,
  onChange,
  onBlur,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (() => void) | undefined;
});
```

- @param props Etiqueta, valor ISO y cambio/blur del formulario.
- @returns Control accesible que evita escribir fechas ambiguas o inexistentes.

## src/components/molecules/EmptyState.tsx

Explica una colección vacía sin confundirla con carga o error de red.

[Abrir fuente](../src/components/molecules/EmptyState.tsx)

| Exportación | Responsabilidad                                                       |
| ----------- | --------------------------------------------------------------------- |
| EmptyState  | Explica una colección vacía sin confundirla con carga o error de red. |

### EmptyState

```ts
export function EmptyState({ title, detail }: { title: string; detail?: string });
```

- @param props Título del recurso y orientación opcional para el siguiente paso.
- @returns Panel con ícono decorativo y texto legible con escala de fuente.

## src/components/molecules/FieldInput.tsx

Ajusta teclado y privacidad según el tipo semántico del campo.

[Abrir fuente](../src/components/molecules/FieldInput.tsx)

| Exportación | Responsabilidad                                                |
| ----------- | -------------------------------------------------------------- |
| FieldInput  | Ajusta teclado y privacidad según el tipo semántico del campo. |

### FieldInput

```ts
export function FieldInput({
  field,
  value,
  onChange,
  onBlur,
}: {
  field: FormFieldDefinition;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (() => void) | undefined;
});
```

- @param props - Propiedades tipadas: field, value, onChange, onBlur.
- @returns Vista de FieldInput con el contrato de propiedades declarado.

## src/components/molecules/FloatingControls.tsx

Controles persistentes abajo a la derecha; volver arriba aparece solo cuando es útil.

[Abrir fuente](../src/components/molecules/FloatingControls.tsx)

| Exportación      | Responsabilidad                                                                       |
| ---------------- | ------------------------------------------------------------------------------------- |
| FloatingControls | Controles persistentes abajo a la derecha; volver arriba aparece solo cuando es útil. |

### FloatingControls

```ts
export function FloatingControls({
  showTop,
  toTop,
  bottom = 16,
}: {
  showTop: boolean;
  toTop: () => void;
  bottom?: number;
});
```

- @param props Estado del scroll propio y espacio inferior adicional para diálogos.
- @returns Tema siempre visible y acción de volver arriba condicionada por las medidas.

## src/components/molecules/FormField.tsx

Label, entrada y error, con selectors legibles para campos enumerados.

[Abrir fuente](../src/components/molecules/FormField.tsx)

| Exportación | Responsabilidad                                                        |
| ----------- | ---------------------------------------------------------------------- |
| FormField   | Label, entrada y error, con selectors legibles para campos enumerados. |

### FormField

```ts
export function FormField({
  field,
  value,
  onChange,
  onBlur,
  error,
}: {
  field: FormFieldDefinition;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string | undefined;
});
```

- @param props - Propiedades tipadas: field, value, onChange, onBlur, error.
- @returns Vista de FormField con el contrato de propiedades declarado.

## src/components/molecules/FormFieldFeedback.tsx

Ayuda de escritura y validación sin anunciar cada carácter a lectores de pantalla.

[Abrir fuente](../src/components/molecules/FormFieldFeedback.tsx)

| Exportación       | Responsabilidad                                                                    |
| ----------------- | ---------------------------------------------------------------------------------- |
| FormFieldFeedback | Ayuda de escritura y validación sin anunciar cada carácter a lectores de pantalla. |

### FormFieldFeedback

```ts
export function FormFieldFeedback({
  field,
  value,
  error,
}: {
  field: FormFieldDefinition;
  value: string;
  error?: string | undefined;
});
```

- @param props Contrato del campo, texto actual y error de validación opcional.
- @returns Contador en textos largos y error recuperable, cuando correspondan.

## src/components/molecules/LoadingState.tsx

Estado visible mientras se verifica sesión o se carga una lista.

[Abrir fuente](../src/components/molecules/LoadingState.tsx)

| Exportación  | Responsabilidad                                                  |
| ------------ | ---------------------------------------------------------------- |
| LoadingState | Estado visible mientras se verifica sesión o se carga una lista. |

### LoadingState

```ts
export function LoadingState({ label = 'Cargando…' }: { label?: string });
```

- @param props - Propiedades tipadas: label.
- @returns Vista de LoadingState con el contrato de propiedades declarado.

## src/components/molecules/MetricTile.tsx

Indicador de solo lectura; recibe valores reales o un guion mientras no hay respuesta.

[Abrir fuente](../src/components/molecules/MetricTile.tsx)

| Exportación | Responsabilidad                                                                        |
| ----------- | -------------------------------------------------------------------------------------- |
| MetricTile  | Indicador de solo lectura; recibe valores reales o un guion mientras no hay respuesta. |

### MetricTile

```ts
export function MetricTile({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: IconName;
});
```

- @param props Etiqueta, valor formateado, contexto e ícono. No calcula métricas ni tendencias.
- @returns Tarjeta flexible que admite varias columnas sin desbordar en teléfonos.

## src/components/molecules/Notice.tsx

Mensaje de error/éxito anunciado a lectores de pantalla.

[Abrir fuente](../src/components/molecules/Notice.tsx)

| Exportación | Responsabilidad                                          |
| ----------- | -------------------------------------------------------- |
| Notice      | Mensaje de error/éxito anunciado a lectores de pantalla. |

### Notice

```ts
export function Notice({
  error,
  message,
  onRetry,
}: {
  error?: string | undefined;
  message?: string | undefined;
  onRetry?: () => void;
});
```

- @param props - Propiedades tipadas: error, message, onRetry.
- @returns Vista de Notice con el contrato de propiedades declarado.

## src/components/molecules/OpeningHoursCard.tsx

Muestra el horario confirmado y el estado real de conexión.

[Abrir fuente](../src/components/molecules/OpeningHoursCard.tsx)

| Exportación      | Responsabilidad                                             |
| ---------------- | ----------------------------------------------------------- |
| OpeningHoursCard | Muestra el horario confirmado y el estado real de conexión. |

### OpeningHoursCard

```ts
export function OpeningHoursCard({
  state,
  onRetry,
}: {
  state: HealthState;
  onRetry: () => void;
});
```

- @param props Estado de red y acción de reintento.
- @returns Tarjeta con horario y acción cuando la red falla.

## src/components/molecules/OverviewColumns.tsx

Composición 2:1 apilada cuando no hay espacio suficiente para dos columnas.

[Abrir fuente](../src/components/molecules/OverviewColumns.tsx)

| Exportación     | Responsabilidad                                                             |
| --------------- | --------------------------------------------------------------------------- |
| OverviewColumns | Composición 2:1 apilada cuando no hay espacio suficiente para dos columnas. |

### OverviewColumns

```ts
export function OverviewColumns({
  primary,
  secondary,
}: {
  primary: ReactNode;
  secondary: ReactNode;
});
```

- @param props Columna principal y apoyo contextual, ya construidos por la pantalla.
- @returns Contenedor que conserva el orden de lectura principal antes del secundario.

## src/components/molecules/PageHeading.tsx

Portada con contexto y una acción principal, adaptable al ancho y a la escala de texto.

[Abrir fuente](../src/components/molecules/PageHeading.tsx)

| Exportación | Responsabilidad                                                                         |
| ----------- | --------------------------------------------------------------------------------------- |
| PageHeading | Portada con contexto y una acción principal, adaptable al ancho y a la escala de texto. |

### PageHeading

```ts
export function PageHeading({
  eyebrow,
  title,
  detail,
  action,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  action?: ReactNode;
});
```

- @param props Contexto corto, título, explicación y acción conectada por la pantalla.
- @returns Acción debajo en móvil y a la derecha cuando hay espacio suficiente.

## src/components/molecules/Pagination.tsx

Navegación de listas grandes sin perder búsqueda y filtros.

[Abrir fuente](../src/components/molecules/Pagination.tsx)

| Exportación | Responsabilidad                                             |
| ----------- | ----------------------------------------------------------- |
| Pagination  | Navegación de listas grandes sin perder búsqueda y filtros. |

### Pagination

```ts
export function Pagination({
  page,
  total,
  limit,
  onChange,
}: {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
});
```

- @param props - Propiedades tipadas: page, total, limit, onChange.
- @returns Vista de Pagination con el contrato de propiedades declarado.

## src/components/molecules/ProgressBar.tsx

Barra accesible para comparar importes o cantidades reales de una serie.

[Abrir fuente](../src/components/molecules/ProgressBar.tsx)

| Exportación | Responsabilidad                                                          |
| ----------- | ------------------------------------------------------------------------ |
| ProgressBar | Barra accesible para comparar importes o cantidades reales de una serie. |

### ProgressBar

```ts
export function ProgressBar({
  label,
  value,
  max,
  detail,
}: {
  label: string;
  value: number;
  max: number;
  detail: string;
});
```

- @param props Etiqueta, valor numérico, máximo y cifra legible con unidad.
- @returns Barra proporcional; un valor cero permanece vacío.

## src/components/molecules/QuickAction.tsx

Acceso a un recorrido existente; toda la tarjeta mantiene un único objetivo táctil.

[Abrir fuente](../src/components/molecules/QuickAction.tsx)

| Exportación | Responsabilidad                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| QuickAction | Acceso a un recorrido existente; toda la tarjeta mantiene un único objetivo táctil. |

### QuickAction

```ts
export function QuickAction({
  title,
  detail,
  icon,
  onPress,
}: {
  title: string;
  detail: string;
  icon: IconName;
  onPress: () => void;
});
```

- @param props Título, contexto, ícono y callback conectado por la pantalla.
- @returns Tarjeta navegable con texto que admite varias líneas.

## src/components/molecules/QuotedTotal.tsx

Total y duración estimados exactamente como los devuelve la cotización del servidor.

[Abrir fuente](../src/components/molecules/QuotedTotal.tsx)

| Exportación | Responsabilidad                                                                      |
| ----------- | ------------------------------------------------------------------------------------ |
| QuotedTotal | Total y duración estimados exactamente como los devuelve la cotización del servidor. |

### QuotedTotal

```ts
export function QuotedTotal({ quote }: { quote: Availability });
```

- @param props - Propiedades tipadas: quote.
- @returns Vista de QuotedTotal con el contrato de propiedades declarado.

## src/components/molecules/RecoveryRequestLink.tsx

Alternativa explícita cuando el enlace de recuperación venció.

[Abrir fuente](../src/components/molecules/RecoveryRequestLink.tsx)

| Exportación         | Responsabilidad                                                |
| ------------------- | -------------------------------------------------------------- |
| RecoveryRequestLink | Alternativa explícita cuando el enlace de recuperación venció. |

### RecoveryRequestLink

```ts
export function RecoveryRequestLink();
```

- @returns Enlace a una solicitud nueva sin reenviar el token anterior.

## src/components/molecules/ResponsiveGrid.tsx

Cuadrícula de dos columnas que conserva las claves y el orden de los elementos.

[Abrir fuente](../src/components/molecules/ResponsiveGrid.tsx)

| Exportación    | Responsabilidad                                                                 |
| -------------- | ------------------------------------------------------------------------------- |
| ResponsiveGrid | Cuadrícula de dos columnas que conserva las claves y el orden de los elementos. |

### ResponsiveGrid

```ts
export function ResponsiveGrid({ children }: PropsWithChildren);
```

- @param props Tarjetas del catálogo o colección, sin alterar sus acciones ni datos.
- @returns Una columna en móvil o dos cuando el ancho y la escala de texto lo permiten.

## src/components/molecules/SearchBar.tsx

Búsqueda controlada, con etiqueta accesible y teclado de búsqueda.

[Abrir fuente](../src/components/molecules/SearchBar.tsx)

| Exportación | Responsabilidad                                                    |
| ----------- | ------------------------------------------------------------------ |
| SearchBar   | Búsqueda controlada, con etiqueta accesible y teclado de búsqueda. |

### SearchBar

```ts
export function SearchBar({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
});
```

- @param props - Propiedades tipadas: label, value, onChange.
- @returns Vista de SearchBar con el contrato de propiedades declarado.

## src/components/molecules/SearchSelect.tsx

Selecciona una opción en un diálogo buscable sin ocupar toda la agenda.

[Abrir fuente](../src/components/molecules/SearchSelect.tsx)

| Exportación  | Responsabilidad                                                         |
| ------------ | ----------------------------------------------------------------------- |
| SearchSelect | Selecciona una opción en un diálogo buscable sin ocupar toda la agenda. |

### SearchSelect

```ts
export function SearchSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Choice[];
  value: string;
  onChange: (value: string) => void;
});
```

- @param props Etiqueta, opciones autorizadas y valor controlado.
- @returns Campo compacto; elegir una fila cierra el diálogo.

## src/components/molecules/SearchSelectResults.tsx

Busca en todas las opciones, limitando las filas dibujadas para mantener fluidez.

[Abrir fuente](../src/components/molecules/SearchSelectResults.tsx)

| Exportación         | Responsabilidad                                                                   |
| ------------------- | --------------------------------------------------------------------------------- |
| SearchSelectResults | Busca en todas las opciones, limitando las filas dibujadas para mantener fluidez. |

### SearchSelectResults

```ts
export function SearchSelectResults({
  options,
  search,
  value,
  onChange,
}: {
  options: Choice[];
  search: string;
  value: string;
  onChange: (value: string) => void;
});
```

- @param props Opciones autorizadas, búsqueda y valor controlado.
- @returns Resultados y estados vacíos del diálogo de selección.

## src/components/molecules/SectionHeader.tsx

Jerarquía de sección, separada de la portada principal de cada experiencia.

[Abrir fuente](../src/components/molecules/SectionHeader.tsx)

| Exportación   | Responsabilidad                                                             |
| ------------- | --------------------------------------------------------------------------- |
| SectionHeader | Jerarquía de sección, separada de la portada principal de cada experiencia. |

### SectionHeader

```ts
export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string });
```

- @param props Título obligatorio y explicación opcional del contenido inmediato.
- @returns Encabezado semántico con descripción de contraste secundario.

## src/components/molecules/ServiceCard.tsx

Servicio con descripción, duración y tarifa del tipo seleccionado.

[Abrir fuente](../src/components/molecules/ServiceCard.tsx)

| Exportación | Responsabilidad                                                    |
| ----------- | ------------------------------------------------------------------ |
| ServiceCard | Servicio con descripción, duración y tarifa del tipo seleccionado. |

### ServiceCard

```ts
export function ServiceCard({
  service,
  typeId,
  onEdit,
  onPrice,
  onDelete,
}: {
  service: Service;
  typeId: string;
  onEdit?: () => void;
  onPrice?: () => void;
  onDelete?: () => void;
});
```

- @param props - Propiedades tipadas: service, typeId, onEdit, onPrice, onDelete.
- @returns Vista de ServiceCard con el contrato de propiedades declarado.

## src/components/molecules/SidebarLink.tsx

Destino lateral con selección persistente y respuesta de hover/teclado del Pressable.

[Abrir fuente](../src/components/molecules/SidebarLink.tsx)

| Exportación | Responsabilidad                                                                       |
| ----------- | ------------------------------------------------------------------------------------- |
| SidebarLink | Destino lateral con selección persistente y respuesta de hover/teclado del Pressable. |

### SidebarLink

```ts
export function SidebarLink({ item, active }: { item: NavigationItem; active: boolean });
```

- @param props Destino autorizado por rol e indicador de coincidencia con la ruta actual.
- @returns Control de navegación con nombre y estado seleccionado accesibles.

## src/components/molecules/StatusBadge.tsx

Traducciones estables del flujo de trabajo.

[Abrir fuente](../src/components/molecules/StatusBadge.tsx)

| Exportación  | Responsabilidad                                                      |
| ------------ | -------------------------------------------------------------------- |
| statusLabels | Traducciones estables del flujo de trabajo.                          |
| StatusBadge  | Estado de turno con color y texto, sin depender solamente del color. |

### StatusBadge

```ts
export function StatusBadge({ status }: { status: AppointmentStatus });
```

- @param props - Propiedades tipadas: status.
- @returns Vista de StatusBadge con el contrato de propiedades declarado.

## src/components/molecules/TimeWheel.tsx

Rueda de cinco filas con una hora central, operable por tacto, mouse y teclado.

[Abrir fuente](../src/components/molecules/TimeWheel.tsx)

| Exportación | Responsabilidad                                                                 |
| ----------- | ------------------------------------------------------------------------------- |
| TimeWheel   | Rueda de cinco filas con una hora central, operable por tacto, mouse y teclado. |

### TimeWheel

```ts
export function TimeWheel({
  slots,
  value,
  onChange,
}: {
  slots: string[];
  value: string;
  onChange: (value: string) => void;
});
```

- @param props Opciones vigentes, selección y cambio controlados por la reserva.
- @returns Selector que no ofrece horarios ocupados.

## src/components/molecules/TimeWheelActions.tsx

Alternativa al gesto para lectores de pantalla y navegación con teclado.

[Abrir fuente](../src/components/molecules/TimeWheelActions.tsx)

| Exportación      | Responsabilidad                                                          |
| ---------------- | ------------------------------------------------------------------------ |
| TimeWheelActions | Alternativa al gesto para lectores de pantalla y navegación con teclado. |

### TimeWheelActions

```ts
export function TimeWheelActions({ w }: { w: ReturnType<typeof useTimeWheel> });
```

- @param props Control de la rueda y límites vigentes.
- @returns Dos acciones sin horas manuales ni saltos fuera de la lista.

## src/components/molecules/VehicleTypeItem.tsx

Categoría y acciones del catálogo; una baja lógica conserva el nombre visible en el historial.

[Abrir fuente](../src/components/molecules/VehicleTypeItem.tsx)

| Exportación     | Responsabilidad                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------- |
| VehicleTypeItem | Categoría y acciones del catálogo; una baja lógica conserva el nombre visible en el historial. |

### VehicleTypeItem

```ts
export function VehicleTypeItem({
  type,
  onEdit,
  onDeactivate,
}: {
  type: VehicleType;
  onEdit: () => void;
  onDeactivate: () => void;
});
```

- @param props - Propiedades tipadas: type, onEdit, onDeactivate.
- @returns Vista de VehicleTypeItem con el contrato de propiedades declarado.

## src/components/molecules/WashIllustration.tsx

Ilustración vectorial decorativa del servicio; no representa un vehículo del cliente.

[Abrir fuente](../src/components/molecules/WashIllustration.tsx)

| Exportación      | Responsabilidad                                                                       |
| ---------------- | ------------------------------------------------------------------------------------- |
| WashIllustration | Ilustración vectorial decorativa del servicio; no representa un vehículo del cliente. |

### WashIllustration

```ts
export function WashIllustration();
```

- @returns Silueta original de auto y reflejos, sin imagen externa.

## src/components/molecules/WheelRow.tsx

Una fila mantiene el tamaño táctil aunque la letra periférica se atenúe.

[Abrir fuente](../src/components/molecules/WheelRow.tsx)

| Exportación | Responsabilidad                                                          |
| ----------- | ------------------------------------------------------------------------ |
| WheelRow    | Una fila mantiene el tamaño táctil aunque la letra periférica se atenúe. |

### WheelRow

```ts
export function WheelRow({
  value,
  selected,
  distance,
  onPress,
}: {
  value: string;
  selected: boolean;
  distance: number;
  onPress: () => void;
});
```

- @param props Hora y estado de selección.
- @returns Fila elegible con contraste central.

## src/components/molecules/WorkdayGuide.tsx

Ayuda operacional; las acciones reales siguen en el detalle del turno.

[Abrir fuente](../src/components/molecules/WorkdayGuide.tsx)

| Exportación  | Responsabilidad                                                        |
| ------------ | ---------------------------------------------------------------------- |
| WorkdayGuide | Ayuda operacional; las acciones reales siguen en el detalle del turno. |

### WorkdayGuide

```ts
export function WorkdayGuide();
```

- @returns Recordatorio del flujo sin prometer asignaciones ni habilitar cobros.

## src/components/molecules/WorkspaceIdentity.tsx

Nombre y rol de la sesión propia sobre fondos claros u oscuros.

[Abrir fuente](../src/components/molecules/WorkspaceIdentity.tsx)

| Exportación       | Responsabilidad                                                 |
| ----------------- | --------------------------------------------------------------- |
| WorkspaceIdentity | Nombre y rol de la sesión propia sobre fondos claros u oscuros. |

### WorkspaceIdentity

```ts
export function WorkspaceIdentity({ user, inverse }: { user: User; inverse: boolean });
```

- @param props Usuario autenticado y variante de la barra lateral.
- @returns Dos líneas truncadas que no desplazan los controles de navegación.

## src/components/molecules/WorkspaceUser.tsx

Acceso al perfil desde toda la identidad, tanto en cabecera como en barra lateral.

[Abrir fuente](../src/components/molecules/WorkspaceUser.tsx)

| Exportación   | Responsabilidad                                                                    |
| ------------- | ---------------------------------------------------------------------------------- |
| WorkspaceUser | Acceso al perfil desde toda la identidad, tanto en cabecera como en barra lateral. |

### WorkspaceUser

```ts
export function WorkspaceUser({
  inverse = false,
  compact = false,
}: {
  inverse?: boolean;
  compact?: boolean;
});
```

- @param props Variante inversa de la barra lateral o compacta para teléfonos.
- @returns Botón de perfil del rol actual; no consulta datos ajenos.

## src/components/organisms/AdminComplaintShortcut.tsx

Hace visibles los reclamos nuevos desde el resumen sin esperar una recarga manual.

[Abrir fuente](../src/components/organisms/AdminComplaintShortcut.tsx)

| Exportación            | Responsabilidad                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------- |
| AdminComplaintShortcut | Hace visibles los reclamos nuevos desde el resumen sin esperar una recarga manual. |

### AdminComplaintShortcut

```ts
export function AdminComplaintShortcut({
  resource,
}: {
  resource: ReturnType<typeof useDashboard>['complaints'];
});
```

- @param props Recurso de pendientes actualizado con el tablero.
- @returns Acceso a la bandeja y error explícito si no se pudo consultar su cantidad.

## src/components/organisms/AdminMenu.tsx

Menú administrativo móvil basado en el mismo catálogo que la barra lateral.

[Abrir fuente](../src/components/organisms/AdminMenu.tsx)

| Exportación | Responsabilidad                                                             |
| ----------- | --------------------------------------------------------------------------- |
| AdminMenu   | Menú administrativo móvil basado en el mismo catálogo que la barra lateral. |

### AdminMenu

```ts
export function AdminMenu({ open, onClose }: { open: boolean; onClose: () => void });
```

- @param props Estado de apertura y cierre; siempre cierra antes de navegar.
- @returns Diálogo con todos los destinos administrativos, incluidos vehículos y perfil.

## src/components/organisms/AdminQueueLinks.tsx

Lleva directamente a las dos bandejas que requieren atención administrativa.

[Abrir fuente](../src/components/organisms/AdminQueueLinks.tsx)

| Exportación     | Responsabilidad                                                              |
| --------------- | ---------------------------------------------------------------------------- |
| AdminQueueLinks | Lleva directamente a las dos bandejas que requieren atención administrativa. |

### AdminQueueLinks

```ts
export function AdminQueueLinks({ pending }: { pending: number | undefined });
```

- @param props Cantidad global de solicitudes pendientes consultada por el tablero.
- @returns Accesos iguales y adaptables, sin un filtro de fecha oculto.

## src/components/organisms/AdminQuickActions.tsx

Accesos operativos que complementan la navegación administrativa.

[Abrir fuente](../src/components/organisms/AdminQuickActions.tsx)

| Exportación       | Responsabilidad                                                   |
| ----------------- | ----------------------------------------------------------------- |
| AdminQuickActions | Accesos operativos que complementan la navegación administrativa. |

### AdminQuickActions

```ts
export function AdminQuickActions();
```

- @returns Ingreso sin turno, gestión del equipo y catálogo editable.

## src/components/organisms/AppointmentActions.tsx

Acciones del rol visible; el servidor vuelve a validarlas con propiedad/asignación.

[Abrir fuente](../src/components/organisms/AppointmentActions.tsx)

| Exportación        | Responsabilidad                                                                     |
| ------------------ | ----------------------------------------------------------------------------------- |
| AppointmentActions | Acciones del rol visible; el servidor vuelve a validarlas con propiedad/asignación. |

### AppointmentActions

```ts
export function AppointmentActions({
  manager: m,
}: {
  manager: ReturnType<typeof useAppointmentDetail>;
});
```

- @param props - Propiedades tipadas: manager.
- @returns Vista de AppointmentActions con el contrato de propiedades declarado.

## src/components/organisms/AppointmentAdvancedFilters.tsx

Mantiene los filtros de administración disponibles sin ocultar los resultados.

[Abrir fuente](../src/components/organisms/AppointmentAdvancedFilters.tsx)

| Exportación                | Responsabilidad                                                                |
| -------------------------- | ------------------------------------------------------------------------------ |
| AppointmentAdvancedFilters | Mantiene los filtros de administración disponibles sin ocultar los resultados. |

### AppointmentAdvancedFilters

```ts
export function AppointmentAdvancedFilters({ m }: { m: ReturnType<typeof useAppointments> });
```

- @param props Estado y operaciones de la agenda administrativa.
- @returns Controles desplegables con cantidad de filtros activos.

## src/components/organisms/AppointmentAgendaPresets.tsx

Accesos de una pulsación que aplican un conjunto coherente de filtros.

[Abrir fuente](../src/components/organisms/AppointmentAgendaPresets.tsx)

| Exportación              | Responsabilidad                                                        |
| ------------------------ | ---------------------------------------------------------------------- |
| AppointmentAgendaPresets | Accesos de una pulsación que aplican un conjunto coherente de filtros. |

### AppointmentAgendaPresets

```ts
export function AppointmentAgendaPresets({ m }: { m: ReturnType<typeof useAppointments> });
```

- @param props Agenda del equipo o del administrador.
- @returns Hoy, todas las fechas y las dos bandejas de administración.

## src/components/organisms/AppointmentAssignment.tsx

Asigna un empleado activo sin mezclar esa acción con confirmar el turno.

[Abrir fuente](../src/components/organisms/AppointmentAssignment.tsx)

| Exportación           | Responsabilidad                                                          |
| --------------------- | ------------------------------------------------------------------------ |
| AppointmentAssignment | Asigna un empleado activo sin mezclar esa acción con confirmar el turno. |

### AppointmentAssignment

```ts
export function AppointmentAssignment({ m }: { m: ReturnType<typeof useAppointmentDetail> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de AppointmentAssignment con el contrato de propiedades declarado.

## src/components/organisms/AppointmentCancellationDialog.tsx

Solicita motivo y confirma la cancelación mediante el comando del turno.

[Abrir fuente](../src/components/organisms/AppointmentCancellationDialog.tsx)

| Exportación                   | Responsabilidad                                                          |
| ----------------------------- | ------------------------------------------------------------------------ |
| AppointmentCancellationDialog | Solicita motivo y confirma la cancelación mediante el comando del turno. |

### AppointmentCancellationDialog

```ts
export function AppointmentCancellationDialog({
  m,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
});
```

- @param props - Propiedades tipadas: m.
- @returns Vista de AppointmentCancellationDialog con el contrato de propiedades declarado.

## src/components/organisms/AppointmentCard.tsx

Resumen compartido por los tres roles; no amplía los datos recibidos de la API.

[Abrir fuente](../src/components/organisms/AppointmentCard.tsx)

| Exportación     | Responsabilidad                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| AppointmentCard | Resumen compartido por los tres roles; no amplía los datos recibidos de la API. |

### AppointmentCard

```ts
export function AppointmentCard({
  appointment: a,
  onPress,
}: {
  appointment: Appointment;
  onPress: () => void;
});
```

- @param props Turno autorizado y callback que abre su detalle.
- @returns Un objetivo táctil con fecha, estado, vehículo y total condicionado a permisos.

## src/components/organisms/AppointmentClientFilter.tsx

Selector administrativo de titular; no se ofrece a otros roles.

[Abrir fuente](../src/components/organisms/AppointmentClientFilter.tsx)

| Exportación             | Responsabilidad                                                 |
| ----------------------- | --------------------------------------------------------------- |
| AppointmentClientFilter | Selector administrativo de titular; no se ofrece a otros roles. |

### AppointmentClientFilter

```ts
export function AppointmentClientFilter({ m }: { m: ReturnType<typeof useAppointments> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de AppointmentClientFilter con el contrato de propiedades declarado.

## src/components/organisms/AppointmentDialogs.tsx

Confirmaciones, cobro y comprobante histórico sin exponer datos de otros turnos.

[Abrir fuente](../src/components/organisms/AppointmentDialogs.tsx)

| Exportación        | Responsabilidad                                                                  |
| ------------------ | -------------------------------------------------------------------------------- |
| AppointmentDialogs | Confirmaciones, cobro y comprobante histórico sin exponer datos de otros turnos. |

### AppointmentDialogs

```ts
export function AppointmentDialogs({
  manager: m,
}: {
  manager: ReturnType<typeof useAppointmentDetail>;
});
```

- @param props - Propiedades tipadas: manager.
- @returns Vista de AppointmentDialogs con el contrato de propiedades declarado.

## src/components/organisms/AppointmentEmployeeFilter.tsx

Selector administrativo de empleado para restringir la consulta de turnos.

[Abrir fuente](../src/components/organisms/AppointmentEmployeeFilter.tsx)

| Exportación               | Responsabilidad                                                            |
| ------------------------- | -------------------------------------------------------------------------- |
| AppointmentEmployeeFilter | Selector administrativo de empleado para restringir la consulta de turnos. |

### AppointmentEmployeeFilter

```ts
export function AppointmentEmployeeFilter({ m }: { m: ReturnType<typeof useAppointments> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de AppointmentEmployeeFilter con el contrato de propiedades declarado.

## src/components/organisms/AppointmentFilters.tsx

Filtros por experiencia; cliente no puede seleccionar titulares ajenos.

[Abrir fuente](../src/components/organisms/AppointmentFilters.tsx)

| Exportación        | Responsabilidad                                                         |
| ------------------ | ----------------------------------------------------------------------- |
| AppointmentFilters | Filtros por experiencia; cliente no puede seleccionar titulares ajenos. |

### AppointmentFilters

```ts
export function AppointmentFilters({
  manager: m,
}: {
  manager: ReturnType<typeof useAppointments>;
});
```

- @param props - Propiedades tipadas: manager.
- @returns Vista de AppointmentFilters con el contrato de propiedades declarado.

## src/components/organisms/AppointmentInformation.tsx

Presenta el contrato del lavado sin modificar la reserva.

[Abrir fuente](../src/components/organisms/AppointmentInformation.tsx)

| Exportación            | Responsabilidad                                           |
| ---------------------- | --------------------------------------------------------- |
| AppointmentInformation | Presenta el contrato del lavado sin modificar la reserva. |

### AppointmentInformation

```ts
export function AppointmentInformation({ m }: { m: ReturnType<typeof useAppointmentDetail> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de AppointmentInformation con el contrato de propiedades declarado.

## src/components/organisms/AppointmentList.tsx

Compone la página actual y distingue carga, error y ausencia de turnos.

[Abrir fuente](../src/components/organisms/AppointmentList.tsx)

| Exportación     | Responsabilidad                                                         |
| --------------- | ----------------------------------------------------------------------- |
| AppointmentList | Compone la página actual y distingue carga, error y ausencia de turnos. |

### AppointmentList

```ts
export function AppointmentList({ m }: { m: ReturnType<typeof useAppointments> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de AppointmentList con el contrato de propiedades declarado.

## src/components/organisms/AppointmentNotes.tsx

Lista observaciones de trabajo y conecta la carga de una nueva nota.

[Abrir fuente](../src/components/organisms/AppointmentNotes.tsx)

| Exportación      | Responsabilidad                                                      |
| ---------------- | -------------------------------------------------------------------- |
| AppointmentNotes | Lista observaciones de trabajo y conecta la carga de una nueva nota. |

### AppointmentNotes

```ts
export function AppointmentNotes({ m }: { m: ReturnType<typeof useAppointmentDetail> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de AppointmentNotes con el contrato de propiedades declarado.

## src/components/organisms/AppointmentPagination.tsx

Adapta la paginación del recurso sin repetirla entre experiencias.

[Abrir fuente](../src/components/organisms/AppointmentPagination.tsx)

| Exportación           | Responsabilidad                                                    |
| --------------------- | ------------------------------------------------------------------ |
| AppointmentPagination | Adapta la paginación del recurso sin repetirla entre experiencias. |

### AppointmentPagination

```ts
export function AppointmentPagination({
  manager: m,
}: {
  manager: ReturnType<typeof useAppointments>;
});
```

- @param props Administrador de consulta y página actual.
- @returns Controles cuando existe respuesta; omite contenido mientras no hay datos.

## src/components/organisms/AppointmentPaymentAction.tsx

Ofrece registrar cobro solo con las capacidades vigentes.

[Abrir fuente](../src/components/organisms/AppointmentPaymentAction.tsx)

| Exportación              | Responsabilidad                                           |
| ------------------------ | --------------------------------------------------------- |
| AppointmentPaymentAction | Ofrece registrar cobro solo con las capacidades vigentes. |

### AppointmentPaymentAction

```ts
export function AppointmentPaymentAction({
  m,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
});
```

- @param props - Propiedades tipadas: m.
- @returns Vista de AppointmentPaymentAction con el contrato de propiedades declarado.

## src/components/organisms/AppointmentPaymentDialog.tsx

Recoge importe, medio y referencia para registrar un cobro idempotente.

[Abrir fuente](../src/components/organisms/AppointmentPaymentDialog.tsx)

| Exportación              | Responsabilidad                                                         |
| ------------------------ | ----------------------------------------------------------------------- |
| AppointmentPaymentDialog | Recoge importe, medio y referencia para registrar un cobro idempotente. |

### AppointmentPaymentDialog

```ts
export function AppointmentPaymentDialog({
  m,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
});
```

- @param props - Propiedades tipadas: m.
- @returns Vista de AppointmentPaymentDialog con el contrato de propiedades declarado.

## src/components/organisms/AppointmentPayments.tsx

Muestra cobros registrados y saldo de la proyección autorizada.

[Abrir fuente](../src/components/organisms/AppointmentPayments.tsx)

| Exportación         | Responsabilidad                                                 |
| ------------------- | --------------------------------------------------------------- |
| AppointmentPayments | Muestra cobros registrados y saldo de la proyección autorizada. |

### AppointmentPayments

```ts
export function AppointmentPayments({ m }: { m: ReturnType<typeof useAppointmentDetail> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de AppointmentPayments con el contrato de propiedades declarado.

## src/components/organisms/AppointmentReceiptDialog.tsx

Presenta el comprobante histórico; no constituye factura fiscal.

[Abrir fuente](../src/components/organisms/AppointmentReceiptDialog.tsx)

| Exportación              | Responsabilidad                                                  |
| ------------------------ | ---------------------------------------------------------------- |
| AppointmentReceiptDialog | Presenta el comprobante histórico; no constituye factura fiscal. |

### AppointmentReceiptDialog

```ts
export function AppointmentReceiptDialog({
  m,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
});
```

- @param props - Propiedades tipadas: m.
- @returns Vista de AppointmentReceiptDialog con el contrato de propiedades declarado.

## src/components/organisms/AppointmentResults.tsx

Contenido de listado separado del ciclo de actualización de la pantalla.

[Abrir fuente](../src/components/organisms/AppointmentResults.tsx)

| Exportación        | Responsabilidad                                                          |
| ------------------ | ------------------------------------------------------------------------ |
| AppointmentResults | Contenido de listado separado del ciclo de actualización de la pantalla. |

### AppointmentResults

```ts
export function AppointmentResults({
  manager: m,
}: {
  manager: ReturnType<typeof useAppointments>;
});
```

- @param props Recurso y filtros correspondientes al rol autenticado.
- @returns Encabezado, filtros y lista paginada con acceso a una nueva reserva.

## src/components/organisms/AppointmentStatusEditor.tsx

Confirma reservas antiguas que quedaron pendientes antes de la confirmación automática.

[Abrir fuente](../src/components/organisms/AppointmentStatusEditor.tsx)

| Exportación             | Responsabilidad                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------- |
| AppointmentStatusEditor | Confirma reservas antiguas que quedaron pendientes antes de la confirmación automática. |

### AppointmentStatusEditor

```ts
export function AppointmentStatusEditor({ m }: { m: ReturnType<typeof useAppointmentDetail> });
```

- @param props - Gestor del detalle y su acción de confirmación.
- @returns Botón de confirmación administrativa.

## src/components/organisms/AppointmentStatusFilter.tsx

Filtra la consulta por estado sin cambiar ningún turno.

[Abrir fuente](../src/components/organisms/AppointmentStatusFilter.tsx)

| Exportación             | Responsabilidad                                         |
| ----------------------- | ------------------------------------------------------- |
| AppointmentStatusFilter | Filtra la consulta por estado sin cambiar ningún turno. |

### AppointmentStatusFilter

```ts
export function AppointmentStatusFilter({ m }: { m: ReturnType<typeof useAppointments> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de AppointmentStatusFilter con el contrato de propiedades declarado.

## src/components/organisms/AppointmentVehicleAttachment.tsx

Completa el vehículo de un turno ya confirmado.

[Abrir fuente](../src/components/organisms/AppointmentVehicleAttachment.tsx)

| Exportación                  | Responsabilidad                                 |
| ---------------------------- | ----------------------------------------------- |
| AppointmentVehicleAttachment | Completa el vehículo de un turno ya confirmado. |

### AppointmentVehicleAttachment

```ts
export function AppointmentVehicleAttachment({
  appointment,
  admin,
  refresh,
}: {
  appointment: Appointment;
  admin: boolean;
  refresh: () => Promise<void>;
});
```

- @param props Turno y recarga de detalle, con modo asistido para Administración.
- @returns Formulario de datos y opción de usar un vehículo existente.

## src/components/organisms/AppointmentVehicleDetail.tsx

Conserva la descripción del cliente junto al turno, separada de los servicios cotizados.

[Abrir fuente](../src/components/organisms/AppointmentVehicleDetail.tsx)

| Exportación              | Responsabilidad                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| AppointmentVehicleDetail | Conserva la descripción del cliente junto al turno, separada de los servicios cotizados. |

### AppointmentVehicleDetail

```ts
export function AppointmentVehicleDetail({
  m,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
});
```

- @param props - Gestor del detalle y sesión autorizada.
- @returns Descripción editable por el cliente antes de empezar el lavado.

## src/components/organisms/AppointmentWashReport.tsx

Detalle del parte con acciones para el responsable, la administración o el titular.

[Abrir fuente](../src/components/organisms/AppointmentWashReport.tsx)

| Exportación           | Responsabilidad                                                                     |
| --------------------- | ----------------------------------------------------------------------------------- |
| AppointmentWashReport | Detalle del parte con acciones para el responsable, la administración o el titular. |

### AppointmentWashReport

```ts
export function AppointmentWashReport({ m }: { m: ReturnType<typeof useAppointmentDetail> });
```

- @param props - Detalle del turno y acciones según el rol.
- @returns Parte visible y acciones para la etapa actual.

## src/components/organisms/AppointmentWashReview.tsx

La decisión siempre identifica el parte revisado para evitar aprobar un envío posterior.

[Abrir fuente](../src/components/organisms/AppointmentWashReview.tsx)

| Exportación           | Responsabilidad                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------- |
| AppointmentWashReview | La decisión siempre identifica el parte revisado para evitar aprobar un envío posterior. |

### AppointmentWashReview

```ts
export function AppointmentWashReview({
  m,
  submissionId,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
  submissionId: string;
});
```

- @param props - Gestor del turno e identificador del parte inspeccionado.
- @returns Controles para aprobar o devolver el lavado.

## src/components/organisms/AppointmentWashSubmit.tsx

El responsable explica qué hizo y deja el turno listo para una inspección.

[Abrir fuente](../src/components/organisms/AppointmentWashSubmit.tsx)

| Exportación           | Responsabilidad                                                            |
| --------------------- | -------------------------------------------------------------------------- |
| AppointmentWashSubmit | El responsable explica qué hizo y deja el turno listo para una inspección. |

### AppointmentWashSubmit

```ts
export function AppointmentWashSubmit({ m }: { m: ReturnType<typeof useAppointmentDetail> });
```

- @param props - Gestor del turno que recibe el parte.
- @returns Formulario para describir el trabajo.

## src/components/organisms/BookingClientField.tsx

Selecciona titular para una reserva asistida por administración.

[Abrir fuente](../src/components/organisms/BookingClientField.tsx)

| Exportación        | Responsabilidad                                                  |
| ------------------ | ---------------------------------------------------------------- |
| BookingClientField | Selecciona titular para una reserva asistida por administración. |

### BookingClientField

```ts
export function BookingClientField({ b }: { b: ReturnType<typeof useBooking> });
```

- @param props - Propiedades tipadas: b.
- @returns Vista de BookingClientField con el contrato de propiedades declarado.

## src/components/organisms/BookingInvitation.tsx

Composición de la acción principal del cliente, sin información comercial fija.

[Abrir fuente](../src/components/organisms/BookingInvitation.tsx)

| Exportación       | Responsabilidad                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| BookingInvitation | Composición de la acción principal del cliente, sin información comercial fija. |

### BookingInvitation

```ts
export function BookingInvitation();
```

- @returns Acceso al flujo real de reserva e ilustración cuando hay ancho suficiente.

## src/components/organisms/BookingInvitationCopy.tsx

Contenido editorial de la portada de reserva, independiente de navegación e ilustración.

[Abrir fuente](../src/components/organisms/BookingInvitationCopy.tsx)

| Exportación           | Responsabilidad                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------- |
| BookingInvitationCopy | Contenido editorial de la portada de reserva, independiente de navegación e ilustración. |

### BookingInvitationCopy

```ts
export function BookingInvitationCopy();
```

- @returns Jerarquía de texto con contraste sobre el fondo oscuro.

## src/components/organisms/BookingSchedule.tsx

Ofrece calendario y rueda sobre una sola cotización vigente.

[Abrir fuente](../src/components/organisms/BookingSchedule.tsx)

| Exportación     | Responsabilidad                                              |
| --------------- | ------------------------------------------------------------ |
| BookingSchedule | Ofrece calendario y rueda sobre una sola cotización vigente. |

### BookingSchedule

```ts
export function BookingSchedule({
  b,
  onSave,
}: {
  b: ReturnType<typeof useBooking>;
  onSave: () => void;
});
```

- @param props Estado coordinado de la reserva.
- @returns Segundo paso con horarios libres y explicación de atención.

## src/components/organisms/BookingScheduleSave.tsx

Agrega al resumen únicamente la hora elegida y todavía ofrecida por el servidor.

[Abrir fuente](../src/components/organisms/BookingScheduleSave.tsx)

| Exportación         | Responsabilidad                                                                  |
| ------------------- | -------------------------------------------------------------------------------- |
| BookingScheduleSave | Agrega al resumen únicamente la hora elegida y todavía ofrecida por el servidor. |

### BookingScheduleSave

```ts
export function BookingScheduleSave({
  b,
  onSave,
}: {
  b: ReturnType<typeof useBooking>;
  onSave: () => void;
});
```

- @param props Estado vigente y acción de guardado/navegación al resumen.
- @returns Guardar después de elegir una hora, o el aviso de guardado pendiente de reserva.

## src/components/organisms/BookingServicesField.tsx

Ofrece un lavado base y adicionales separados para el tipo cotizado.

[Abrir fuente](../src/components/organisms/BookingServicesField.tsx)

| Exportación          | Responsabilidad                                                      |
| -------------------- | -------------------------------------------------------------------- |
| BookingServicesField | Ofrece un lavado base y adicionales separados para el tipo cotizado. |

### BookingServicesField

```ts
export function BookingServicesField({ b }: { b: Booking });
```

- @param props Estado de servicios y tipo seleccionados.
- @returns Los selectores que corresponden a la categoría.

## src/components/organisms/BookingSummary.tsx

Confirma únicamente una cotización y un horario que siguen vigentes.

[Abrir fuente](../src/components/organisms/BookingSummary.tsx)

| Exportación    | Responsabilidad                                                      |
| -------------- | -------------------------------------------------------------------- |
| BookingSummary | Confirma únicamente una cotización y un horario que siguen vigentes. |

### BookingSummary

```ts
export function BookingSummary({ b }: { b: ReturnType<typeof useBooking> });
```

- @param props Estado de la reserva, sin calcular importes fuera del servidor.
- @returns Resumen visible antes de reservar y siguiente paso explicado.

## src/components/organisms/BookingSummarySchedule.tsx

Identifica el horario guardado; nunca anuncia que ya existe un turno antes de confirmar.

[Abrir fuente](../src/components/organisms/BookingSummarySchedule.tsx)

| Exportación            | Responsabilidad                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| BookingSummarySchedule | Identifica el horario guardado; nunca anuncia que ya existe un turno antes de confirmar. |

### BookingSummarySchedule

```ts
export function BookingSummarySchedule({ b }: { b: ReturnType<typeof useBooking> });
```

- @param props Borrador, hora guardada y última disponibilidad del servidor.
- @returns Estado accesible del horario que se enviará al confirmar la reserva.

## src/components/organisms/BookingTypeField.tsx

Solicita solo la categoría que determina la cotización.

[Abrir fuente](../src/components/organisms/BookingTypeField.tsx)

| Exportación      | Responsabilidad                                         |
| ---------------- | ------------------------------------------------------- |
| BookingTypeField | Solicita solo la categoría que determina la cotización. |

### BookingTypeField

```ts
export function BookingTypeField({ b }: { b: ReturnType<typeof useBooking> });
```

- @param props Tipos activos y estado del formulario.
- @returns Selector de categoría sin patente ni datos del vehículo.

## src/components/organisms/CancellationNoticeCard.tsx

Cancelación del equipo con contexto, motivo completo y dos acciones inequívocas.

[Abrir fuente](../src/components/organisms/CancellationNoticeCard.tsx)

| Exportación            | Responsabilidad                                                                  |
| ---------------------- | -------------------------------------------------------------------------------- |
| CancellationNoticeCard | Cancelación del equipo con contexto, motivo completo y dos acciones inequívocas. |

### CancellationNoticeCard

```ts
export function CancellationNoticeCard({
  notice,
  busy,
  onRead,
}: {
  notice: CancellationNotice;
  busy: boolean;
  onRead: () => void;
});
```

- @param props Aviso propio, estado ocupado y confirmación persistente de lectura.
- @returns Tarjeta accesible; abrir el detalle no descarta el aviso.

## src/components/organisms/ClientCancellationNotices.tsx

Avisos visibles en Inicio hasta que el cliente confirme haberlos leído.

[Abrir fuente](../src/components/organisms/ClientCancellationNotices.tsx)

| Exportación               | Responsabilidad                                                         |
| ------------------------- | ----------------------------------------------------------------------- |
| ClientCancellationNotices | Avisos visibles en Inicio hasta que el cliente confirme haberlos leído. |

### ClientCancellationNotices

```ts
export function ClientCancellationNotices({
  notices,
}: {
  notices: ReturnType<typeof useCancellationNotices>;
});
```

- @param props Consulta propia y acción persistente de lectura.
- @returns Cancelaciones con motivo o un error recuperable, sin confundir fallo con lista vacía.

## src/components/organisms/ClientQuickActions.tsx

Tareas de preparación antes de reservar; no duplica consultas del catálogo.

[Abrir fuente](../src/components/organisms/ClientQuickActions.tsx)

| Exportación        | Responsabilidad                                                             |
| ------------------ | --------------------------------------------------------------------------- |
| ClientQuickActions | Tareas de preparación antes de reservar; no duplica consultas del catálogo. |

### ClientQuickActions

```ts
export function ClientQuickActions();
```

- @returns Accesos a los vehículos propios y al catálogo vigente.

## src/components/organisms/ClientVisitHeader.tsx

Limpieza confirmada del inicio propio sin cancelar las visitas del cliente.

[Abrir fuente](../src/components/organisms/ClientVisitHeader.tsx)

| Exportación       | Responsabilidad                                                             |
| ----------------- | --------------------------------------------------------------------------- |
| ClientVisitHeader | Limpieza confirmada del inicio propio sin cancelar las visitas del cliente. |

### ClientVisitHeader

```ts
export function ClientVisitHeader({ home: h }: { home: ReturnType<typeof useHome> });
```

- @param props Recurso y acción persistente de la pantalla principal.
- @returns Título con tacho pequeño y explicación de la confirmación.

## src/components/organisms/ClientVisitList.tsx

Visitas autorizadas, con carga/error separados del estado vacío.

[Abrir fuente](../src/components/organisms/ClientVisitList.tsx)

| Exportación     | Responsabilidad                                                  |
| --------------- | ---------------------------------------------------------------- |
| ClientVisitList | Visitas autorizadas, con carga/error separados del estado vacío. |

### ClientVisitList

```ts
export function ClientVisitList({ home: h }: { home: ReturnType<typeof useHome> });
```

- @param props Recurso del inicio y selección cronológica de hasta tres turnos.
- @returns Lista navegable; un error de red nunca se presenta como ausencia de reservas.

## src/components/organisms/CollectionState.tsx

Estados consistentes de lista: carga inicial, error recuperable y vacío.

[Abrir fuente](../src/components/organisms/CollectionState.tsx)

| Exportación     | Responsabilidad                                                          |
| --------------- | ------------------------------------------------------------------------ |
| CollectionState | Estados consistentes de lista: carga inicial, error recuperable y vacío. |

### CollectionState

```ts
export function CollectionState({
  loading,
  error,
  empty,
  emptyTitle,
  onRetry,
  children,
}: PropsWithChildren<{
  loading: boolean;
  error: string;
  empty: boolean;
  emptyTitle: string;
  onRetry: () => void;
}>);
```

- @param props - Propiedades tipadas: loading, error, empty, emptyTitle, onRetry, children.
- @returns Vista de CollectionState con el contrato de propiedades declarado.

## src/components/organisms/CustomerMessageCard.tsx

Muestra la conversación y, en devoluciones, el responsable y su descripción histórica.

[Abrir fuente](../src/components/organisms/CustomerMessageCard.tsx)

| Exportación         | Responsabilidad                                                                        |
| ------------------- | -------------------------------------------------------------------------------------- |
| CustomerMessageCard | Muestra la conversación y, en devoluciones, el responsable y su descripción histórica. |

### CustomerMessageCard

```ts
export function CustomerMessageCard({
  item,
  admin,
  busy,
  reply,
}: {
  item: CustomerMessage;
  admin: boolean;
  busy: boolean;
  reply: (id: string, text: string) => Promise<void>;
});
```

- @param props - Mensaje, rol y acción de respuesta.
- @returns Tarjeta con contexto del reclamo o devolución.

## src/components/organisms/DashboardHeading.tsx

Presentación del tablero y su acción prioritaria de ingreso presencial.

[Abrir fuente](../src/components/organisms/DashboardHeading.tsx)

| Exportación      | Responsabilidad                                                         |
| ---------------- | ----------------------------------------------------------------------- |
| DashboardHeading | Presentación del tablero y su acción prioritaria de ingreso presencial. |

### DashboardHeading

```ts
export function DashboardHeading();
```

- @returns Saludo de la sesión y acceso al registro rápido de autos sin turno.

## src/components/organisms/DashboardIndicators.tsx

Métricas diarias y pendientes globales; un recurso no disponible muestra un guion.

[Abrir fuente](../src/components/organisms/DashboardIndicators.tsx)

| Exportación         | Responsabilidad                                                                    |
| ------------------- | ---------------------------------------------------------------------------------- |
| DashboardIndicators | Métricas diarias y pendientes globales; un recurso no disponible muestra un guion. |

### DashboardIndicators

```ts
export function DashboardIndicators({
  report,
  pending,
}: {
  report: ReturnType<typeof useDashboard>['report'];
  pending: ReturnType<typeof useDashboard>['pending'];
});
```

- @param props Resumen diario y página de pendientes, consultados independientemente.
- @returns Tres indicadores sin tendencias inventadas ni ceros de reemplazo.

## src/components/organisms/DashboardPending.tsx

Turnos por atender del negocio; un fallo de consulta no se anuncia como lista vacía.

[Abrir fuente](../src/components/organisms/DashboardPending.tsx)

| Exportación      | Responsabilidad                                                                      |
| ---------------- | ------------------------------------------------------------------------------------ |
| DashboardPending | Turnos por atender del negocio; un fallo de consulta no se anuncia como lista vacía. |

### DashboardPending

```ts
export function DashboardPending({
  resource: r,
}: {
  resource: ReturnType<typeof useDashboard>['pending'];
});
```

- @param props Recurso paginado de pendientes.
- @returns Encabezado y resultados con enlace a la gestión completa.

## src/components/organisms/EmployeeAppointmentResults.tsx

Filtros y resultados compartidos por agenda e historial del equipo.

[Abrir fuente](../src/components/organisms/EmployeeAppointmentResults.tsx)

| Exportación                | Responsabilidad                                                     |
| -------------------------- | ------------------------------------------------------------------- |
| EmployeeAppointmentResults | Filtros y resultados compartidos por agenda e historial del equipo. |

### EmployeeAppointmentResults

```ts
export function EmployeeAppointmentResults({
  manager: m,
}: {
  manager: ReturnType<typeof useAppointments>;
});
```

- @param props Recurso operativo compartido por el equipo; un fallo del resumen no oculta sus turnos.
- @returns Lista paginada con filtros y estados de red visibles.

## src/components/organisms/EmployeePaidFinish.tsx

El cobro completo habilita el cierre directo, conservando descripción y responsable.

[Abrir fuente](../src/components/organisms/EmployeePaidFinish.tsx)

| Exportación        | Responsabilidad                                                                      |
| ------------------ | ------------------------------------------------------------------------------------ |
| EmployeePaidFinish | El cobro completo habilita el cierre directo, conservando descripción y responsable. |

### EmployeePaidFinish

```ts
export function EmployeePaidFinish({ m }: { m: ReturnType<typeof useAppointmentDetail> });
```

- @param props Detalle del turno con saldo y permisos vigentes.
- @returns Formulario de finalización o explicación del saldo requerido.

## src/components/organisms/EmployeeWorkAction.tsx

Ofrece iniciar o finalizar el lavado según el estado del turno.

[Abrir fuente](../src/components/organisms/EmployeeWorkAction.tsx)

| Exportación        | Responsabilidad                                                 |
| ------------------ | --------------------------------------------------------------- |
| EmployeeWorkAction | Ofrece iniciar o finalizar el lavado según el estado del turno. |

### EmployeeWorkAction

```ts
export function EmployeeWorkAction({ m }: { m: ReturnType<typeof useAppointmentDetail> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de EmployeeWorkAction con el contrato de propiedades declarado.

## src/components/organisms/EntityForm.tsx

Formulario RHF + Zod con errores por campo y callback sin HTTP propio.

[Abrir fuente](../src/components/organisms/EntityForm.tsx)

| Exportación | Responsabilidad                                                        |
| ----------- | ---------------------------------------------------------------------- |
| EntityForm  | Formulario RHF + Zod con errores por campo y callback sin HTTP propio. |

### EntityForm

```ts
export function EntityForm({
  fields,
  initialValues = {},
  onSubmit,
  busy = false,
  submitLabel = 'Guardar',
}: {
  fields: FormFieldDefinition[];
  initialValues?: Record<string, string>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
  busy?: boolean;
  submitLabel?: string;
});
```

- @param props - Propiedades tipadas: fields, initialValues, onSubmit, busy, submitLabel.
- @returns Vista de EntityForm con el contrato de propiedades declarado.

## src/components/organisms/ModalContent.tsx

Panel desplazable; los controles flotantes quedan fuera para no tapar el formulario.

[Abrir fuente](../src/components/organisms/ModalContent.tsx)

| Exportación  | Responsabilidad                                                                      |
| ------------ | ------------------------------------------------------------------------------------ |
| ModalContent | Panel desplazable; los controles flotantes quedan fuera para no tapar el formulario. |

### ModalContent

```ts
export function ModalContent({
  controls,
  title,
  children,
  onClose,
  compact = false,
}: PropsWithChildren<{
  controls: ReturnType<typeof useScrollControls>;
  title: string;
  onClose: () => void;
  compact?: boolean;
}>);
```

- @param props Controlador propietario, título, contenido y cierre.
- @returns Superficie de diálogo limitada al espacio disponible.

## src/components/organisms/ModalPanel.tsx

Diálogo nativo con tema y volver arriba disponibles sin salir del formulario.

[Abrir fuente](../src/components/organisms/ModalPanel.tsx)

| Exportación | Responsabilidad                                                               |
| ----------- | ----------------------------------------------------------------------------- |
| ModalPanel  | Diálogo nativo con tema y volver arriba disponibles sin salir del formulario. |

### ModalPanel

```ts
export function ModalPanel({
  visible,
  title,
  onClose,
  children,
  compact = false,
}: PropsWithChildren<{
  visible: boolean;
  title: string;
  onClose: () => void;
  compact?: boolean;
}>);
```

- @param props Visibilidad, título, contenido y cierre accesible.
- @returns Modal con acciones en el borde inferior seguro de la pantalla.

## src/components/organisms/OAuthLinkForm.tsx

Confirma la contraseña local una sola vez antes de unir ambas formas de ingreso.

[Abrir fuente](../src/components/organisms/OAuthLinkForm.tsx)

| Exportación   | Responsabilidad                                                                  |
| ------------- | -------------------------------------------------------------------------------- |
| OAuthLinkForm | Confirma la contraseña local una sola vez antes de unir ambas formas de ingreso. |

### OAuthLinkForm

```ts
export function OAuthLinkForm({
  onSubmit,
  busy,
  error,
}: {
  onSubmit: (v: Record<string, string>) => Promise<void>;
  busy: boolean;
  error: string;
});
```

- @param props - Propiedades tipadas: onSubmit, busy, error.
- @returns Vista de OAuthLinkForm con el contrato de propiedades declarado.

## src/components/organisms/PasswordResetForm.tsx

Campos de confirmación separados de la navegación y del enlace privado.

[Abrir fuente](../src/components/organisms/PasswordResetForm.tsx)

| Exportación       | Responsabilidad                                                         |
| ----------------- | ----------------------------------------------------------------------- |
| PasswordResetForm | Campos de confirmación separados de la navegación y del enlace privado. |

### PasswordResetForm

```ts
export function PasswordResetForm({
  submit,
  busy,
}: {
  submit: (values: Record<string, string>) => Promise<void>;
  busy: boolean;
});
```

- @param props - Estado de envío y acción validada por el hook.
- @returns Formulario de nueva contraseña sin HTTP propio.

## src/components/organisms/PendingAppointments.tsx

Solicitudes pendientes del tablero y acceso a la gestión completa.

[Abrir fuente](../src/components/organisms/PendingAppointments.tsx)

| Exportación         | Responsabilidad                                                    |
| ------------------- | ------------------------------------------------------------------ |
| PendingAppointments | Solicitudes pendientes del tablero y acceso a la gestión completa. |

### PendingAppointments

```ts
export function PendingAppointments({
  items,
  loading,
}: {
  items: Appointment[];
  loading: boolean;
});
```

- @param props - Propiedades tipadas: items, loading.
- @returns Vista de PendingAppointments con el contrato de propiedades declarado.

## src/components/organisms/PopularServices.tsx

Presenta frecuencias reales de servicios en el período consultado.

[Abrir fuente](../src/components/organisms/PopularServices.tsx)

| Exportación     | Responsabilidad                                                    |
| --------------- | ------------------------------------------------------------------ |
| PopularServices | Presenta frecuencias reales de servicios en el período consultado. |

### PopularServices

```ts
export function PopularServices({ report }: { report: Report });
```

- @param props - Propiedades tipadas: report.
- @returns Vista de PopularServices con el contrato de propiedades declarado.

## src/components/organisms/ProfileHeader.tsx

Cabecera común de Cliente, Empleado y Administrador con salida en la esquina superior derecha.

[Abrir fuente](../src/components/organisms/ProfileHeader.tsx)

| Exportación   | Responsabilidad                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------- |
| ProfileHeader | Cabecera común de Cliente, Empleado y Administrador con salida en la esquina superior derecha. |

### ProfileHeader

```ts
export function ProfileHeader();
```

- @returns Título, botón accesible de puerta con flecha y diálogo de confirmación sin modificar formularios.

## src/components/organisms/ProfileIdentity.tsx

Identifica la sesión propia con nombre, email y avatar opcional.

[Abrir fuente](../src/components/organisms/ProfileIdentity.tsx)

| Exportación     | Responsabilidad                                                  |
| --------------- | ---------------------------------------------------------------- |
| ProfileIdentity | Identifica la sesión propia con nombre, email y avatar opcional. |

### ProfileIdentity

```ts
export function ProfileIdentity({ p }: { p: ReturnType<typeof useProfile> });
```

- @param props - Propiedades tipadas: p.
- @returns Vista de ProfileIdentity con el contrato de propiedades declarado.

## src/components/organisms/ProfilePasswordForm.tsx

Confirma la contraseña actual y solicita la nueva al servidor.

[Abrir fuente](../src/components/organisms/ProfilePasswordForm.tsx)

| Exportación         | Responsabilidad                                                |
| ------------------- | -------------------------------------------------------------- |
| ProfilePasswordForm | Confirma la contraseña actual y solicita la nueva al servidor. |

### ProfilePasswordForm

```ts
export function ProfilePasswordForm({ p }: { p: ReturnType<typeof useProfile> });
```

- @param props - Propiedades tipadas: p.
- @returns Vista de ProfilePasswordForm con el contrato de propiedades declarado.

## src/components/organisms/RecoveryScreen.tsx

Mantiene legibles los formularios de acceso en teléfono y escritorio.

[Abrir fuente](../src/components/organisms/RecoveryScreen.tsx)

| Exportación    | Responsabilidad                                                       |
| -------------- | --------------------------------------------------------------------- |
| RecoveryScreen | Mantiene legibles los formularios de acceso en teléfono y escritorio. |

### RecoveryScreen

```ts
export function RecoveryScreen({ children }: PropsWithChildren);
```

- @param props - Contenido de recuperación o restablecimiento.
- @returns Pantalla con controles flotantes y columna centrada.

## src/components/organisms/ReportSummary.tsx

Compone indicadores, ingresos semanales y servicios desde un único reporte.

[Abrir fuente](../src/components/organisms/ReportSummary.tsx)

| Exportación   | Responsabilidad                                                             |
| ------------- | --------------------------------------------------------------------------- |
| ReportSummary | Compone indicadores, ingresos semanales y servicios desde un único reporte. |

### ReportSummary

```ts
export function ReportSummary({ report }: { report: Report });
```

- @param props Reporte autorizado del período solicitado.
- @returns Resumen contable y operativo, sin recalcular ni inferir cifras en la UI.

## src/components/organisms/RevenueByWeek.tsx

Compara semanas con cifras recalculadas por el servidor, sin metas ficticias.

[Abrir fuente](../src/components/organisms/RevenueByWeek.tsx)

| Exportación   | Responsabilidad                                                               |
| ------------- | ----------------------------------------------------------------------------- |
| RevenueByWeek | Compara semanas con cifras recalculadas por el servidor, sin metas ficticias. |

### RevenueByWeek

```ts
export function RevenueByWeek({ report }: { report: Report });
```

- @param props Reporte del período elegido; la primera y última semana pueden ser parciales.
- @returns Barras de ingresos agrupadas de lunes a domingo.

## src/components/organisms/ScheduleSelector.tsx

Horarios y total provienen del backend; no calcula precios en el cliente.

[Abrir fuente](../src/components/organisms/ScheduleSelector.tsx)

| Exportación      | Responsabilidad                                                           |
| ---------------- | ------------------------------------------------------------------------- |
| ScheduleSelector | Horarios y total provienen del backend; no calcula precios en el cliente. |

### ScheduleSelector

```ts
export function ScheduleSelector({ booking: b }: { booking: ReturnType<typeof useBooking> });
```

- @param props - Propiedades tipadas: booking.
- @returns Vista de ScheduleSelector con el contrato de propiedades declarado.

## src/components/organisms/Screen.tsx

Marco de todos los roles con controles flotantes y actualización al regresar.

[Abrir fuente](../src/components/organisms/Screen.tsx)

| Exportación | Responsabilidad                                                               |
| ----------- | ----------------------------------------------------------------------------- |
| Screen      | Marco de todos los roles con controles flotantes y actualización al regresar. |

### Screen

```ts
export function Screen({
  children,
  refreshing = false,
  onRefresh,
  refreshInterval = 15_000,
  onRevalidate,
  scrollRequest,
}: {
  children: PropsWithChildren['children'];
  refreshing?: boolean;
  onRefresh?: () => void | Promise<void>;
  refreshInterval?: number;
  onRevalidate?: (trigger: RefreshTrigger) => void | Promise<void>;
  scrollRequest?: ScrollRequest | undefined;
});
```

- @param props Contenido, recarga manual y sondeo visible opcional de agendas.
- @returns Pantalla segura con ancho legible y una sola región desplazable.

## src/components/organisms/ScreenContent.tsx

Contenido común con espacio reservado para los controles flotantes.

[Abrir fuente](../src/components/organisms/ScreenContent.tsx)

| Exportación   | Responsabilidad                                                     |
| ------------- | ------------------------------------------------------------------- |
| ScreenContent | Contenido común con espacio reservado para los controles flotantes. |

### ScreenContent

```ts
export function ScreenContent({
  children,
  scrollRequest,
}: PropsWithChildren<{
  refreshing: boolean;
  onRefresh?: (() => void | Promise<void>) | undefined;
  scrollRequest?: ScrollRequest | undefined;
}>);
```

- @param props Contenido y recarga manual opcional de la pantalla.
- @returns Una sola región de scroll dentro del marco del usuario.

## src/components/organisms/ScrollSurface.tsx

Superficie acotada que mantiene los controles fuera del contenido desplazable.

[Abrir fuente](../src/components/organisms/ScrollSurface.tsx)

| Exportación   | Responsabilidad                                                                |
| ------------- | ------------------------------------------------------------------------------ |
| ScrollSurface | Superficie acotada que mantiene los controles fuera del contenido desplazable. |

### ScrollSurface

```ts
export function ScrollSurface({
  scrollRequest,
  ...props
}: ComponentProps<typeof ScrollView> & { scrollRequest?: ScrollRequest | undefined });
```

- @param props Propiedades del contenido desplazable, incluidos recarga y estilos.
- @returns Una única región de scroll y botones flotantes comunes a todos los roles.

## src/components/organisms/ServiceCollection.tsx

Cuadrícula de catálogo con acciones administrativas cuando están habilitadas.

[Abrir fuente](../src/components/organisms/ServiceCollection.tsx)

| Exportación       | Responsabilidad                                                               |
| ----------------- | ----------------------------------------------------------------------------- |
| ServiceCollection | Cuadrícula de catálogo con acciones administrativas cuando están habilitadas. |

### ServiceCollection

```ts
export function ServiceCollection({
  c,
  admin,
  typeId,
}: {
  c: ReturnType<typeof useCatalog>;
  admin: boolean;
  typeId: string;
});
```

- @param props - Propiedades tipadas: c, admin, typeId.
- @returns Vista de ServiceCollection con el contrato de propiedades declarado.

## src/components/organisms/ServiceDeleteDialog.tsx

Confirma la baja lógica del servicio preservando contratos anteriores.

[Abrir fuente](../src/components/organisms/ServiceDeleteDialog.tsx)

| Exportación         | Responsabilidad                                                        |
| ------------------- | ---------------------------------------------------------------------- |
| ServiceDeleteDialog | Confirma la baja lógica del servicio preservando contratos anteriores. |

### ServiceDeleteDialog

```ts
export function ServiceDeleteDialog({ c }: { c: ReturnType<typeof useCatalog> });
```

- @param props - Propiedades tipadas: c.
- @returns Vista de ServiceDeleteDialog con el contrato de propiedades declarado.

## src/components/organisms/ServiceEditDialog.tsx

Edita descripción y duración del servicio, separadas de sus precios.

[Abrir fuente](../src/components/organisms/ServiceEditDialog.tsx)

| Exportación       | Responsabilidad                                                      |
| ----------------- | -------------------------------------------------------------------- |
| ServiceEditDialog | Edita descripción y duración del servicio, separadas de sus precios. |

### ServiceEditDialog

```ts
export function ServiceEditDialog({ c }: { c: ReturnType<typeof useCatalog> });
```

- @param props - Propiedades tipadas: c.
- @returns Vista de ServiceEditDialog con el contrato de propiedades declarado.

## src/components/organisms/ServiceEditors.tsx

Edición de servicio, tarifa por tipo y confirmación de baja lógica.

[Abrir fuente](../src/components/organisms/ServiceEditors.tsx)

| Exportación    | Responsabilidad                                                     |
| -------------- | ------------------------------------------------------------------- |
| ServiceEditors | Edición de servicio, tarifa por tipo y confirmación de baja lógica. |

### ServiceEditors

```ts
export function ServiceEditors({ catalog: c }: { catalog: ReturnType<typeof useCatalog> });
```

- @param props - Propiedades tipadas: catalog.
- @returns Vista de ServiceEditors con el contrato de propiedades declarado.

## src/components/organisms/ServicePriceDialog.tsx

Edita una tarifa para la pareja servicio/tipo de vehículo.

[Abrir fuente](../src/components/organisms/ServicePriceDialog.tsx)

| Exportación        | Responsabilidad                                            |
| ------------------ | ---------------------------------------------------------- |
| ServicePriceDialog | Edita una tarifa para la pareja servicio/tipo de vehículo. |

### ServicePriceDialog

```ts
export function ServicePriceDialog({ c }: { c: ReturnType<typeof useCatalog> });
```

- @param props - Propiedades tipadas: c.
- @returns Vista de ServicePriceDialog con el contrato de propiedades declarado.

## src/components/organisms/SidebarNavigation.tsx

Selección de destinos basada en rol y ruta, sin estado de navegación duplicado.

[Abrir fuente](../src/components/organisms/SidebarNavigation.tsx)

| Exportación       | Responsabilidad                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| SidebarNavigation | Selección de destinos basada en rol y ruta, sin estado de navegación duplicado. |

### SidebarNavigation

```ts
export function SidebarNavigation();
```

- @returns Destinos de la sesión actual o ningún contenido mientras no haya usuario.

## src/components/organisms/SignInForm.tsx

Valida email y contraseña y delega el acceso en useSignIn.

[Abrir fuente](../src/components/organisms/SignInForm.tsx)

| Exportación | Responsabilidad                                            |
| ----------- | ---------------------------------------------------------- |
| SignInForm  | Valida email y contraseña y delega el acceso en useSignIn. |

### SignInForm

```ts
export function SignInForm({ login }: { login: ReturnType<typeof useSignIn> });
```

- @param props - Propiedades tipadas: login.
- @returns Vista de SignInForm con el contrato de propiedades declarado.

## src/components/organisms/SignInPresentation.tsx

Presentación de acceso que comparte la identidad del resto de la aplicación.

[Abrir fuente](../src/components/organisms/SignInPresentation.tsx)

| Exportación        | Responsabilidad                                                              |
| ------------------ | ---------------------------------------------------------------------------- |
| SignInPresentation | Presentación de acceso que comparte la identidad del resto de la aplicación. |

### SignInPresentation

```ts
export function SignInPresentation();
```

- @returns Marca, promesa concreta y una ilustración vectorial sin recursos de terceros.

## src/components/organisms/SignOutDialog.tsx

La cuenta permanece abierta hasta confirmar; cancelar o cerrar el diálogo no revoca la sesión.

[Abrir fuente](../src/components/organisms/SignOutDialog.tsx)

| Exportación   | Responsabilidad                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------- |
| SignOutDialog | La cuenta permanece abierta hasta confirmar; cancelar o cerrar el diálogo no revoca la sesión. |

### SignOutDialog

```ts
export function SignOutDialog({ exit }: { exit: ReturnType<typeof useSignOutConfirmation> });
```

- @param props Estado y comandos de salida; compartidos por todos los roles y plataformas.
- @returns Confirmación accesible con acción de salida, cancelación y errores de almacenamiento.

## src/components/organisms/SocialLoginButton.tsx

Botón OAuth de un proveedor configurado, con su propia solicitud PKCE.

[Abrir fuente](../src/components/organisms/SocialLoginButton.tsx)

| Exportación       | Responsabilidad                                                        |
| ----------------- | ---------------------------------------------------------------------- |
| SocialLoginButton | Botón OAuth de un proveedor configurado, con su propia solicitud PKCE. |

### SocialLoginButton

```ts
export function SocialLoginButton({ provider }: { provider: keyof typeof labels });
```

- @param props - Propiedades tipadas: provider.
- @returns Vista de SocialLoginButton con el contrato de propiedades declarado.

## src/components/organisms/SocialLogins.tsx

Muestra proveedores y deshabilita los que el negocio todavía no configuró.

[Abrir fuente](../src/components/organisms/SocialLogins.tsx)

| Exportación  | Responsabilidad                                                            |
| ------------ | -------------------------------------------------------------------------- |
| SocialLogins | Muestra proveedores y deshabilita los que el negocio todavía no configuró. |

### SocialLogins

```ts
export function SocialLogins();
```

- @returns Vista de SocialLogins con el contrato de propiedades declarado.

## src/components/organisms/UserCollection.tsx

Presenta la página autorizada de usuarios y los estados de consulta.

[Abrir fuente](../src/components/organisms/UserCollection.tsx)

| Exportación    | Responsabilidad                                                      |
| -------------- | -------------------------------------------------------------------- |
| UserCollection | Presenta la página autorizada de usuarios y los estados de consulta. |

### UserCollection

```ts
export function UserCollection({ m }: { m: ReturnType<typeof useUsers> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de UserCollection con el contrato de propiedades declarado.

## src/components/organisms/UserDeleteDialog.tsx

Confirma la baja lógica de una cuenta conservando su historial.

[Abrir fuente](../src/components/organisms/UserDeleteDialog.tsx)

| Exportación      | Responsabilidad                                                 |
| ---------------- | --------------------------------------------------------------- |
| UserDeleteDialog | Confirma la baja lógica de una cuenta conservando su historial. |

### UserDeleteDialog

```ts
export function UserDeleteDialog({ m }: { m: ReturnType<typeof useUsers> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de UserDeleteDialog con el contrato de propiedades declarado.

## src/components/organisms/UserEditDialog.tsx

Comparte campos de creación y edición de cuentas administradas.

[Abrir fuente](../src/components/organisms/UserEditDialog.tsx)

| Exportación    | Responsabilidad                                                 |
| -------------- | --------------------------------------------------------------- |
| UserEditDialog | Comparte campos de creación y edición de cuentas administradas. |

### UserEditDialog

```ts
export function UserEditDialog({ m }: { m: ReturnType<typeof useUsers> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de UserEditDialog con el contrato de propiedades declarado.

## src/components/organisms/UserRoleFilter.tsx

Filtra cuentas por rol sin modificar sus permisos.

[Abrir fuente](../src/components/organisms/UserRoleFilter.tsx)

| Exportación    | Responsabilidad                                    |
| -------------- | -------------------------------------------------- |
| UserRoleFilter | Filtra cuentas por rol sin modificar sus permisos. |

### UserRoleFilter

```ts
export function UserRoleFilter({ m }: { m: ReturnType<typeof useUsers> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de UserRoleFilter con el contrato de propiedades declarado.

## src/components/organisms/UserTable.tsx

Usuarios como filas adaptables a tarjetas en teléfono.

[Abrir fuente](../src/components/organisms/UserTable.tsx)

| Exportación | Responsabilidad                                        |
| ----------- | ------------------------------------------------------ |
| UserTable   | Usuarios como filas adaptables a tarjetas en teléfono. |

### UserTable

```ts
export function UserTable({
  users,
  onEdit,
  onDelete,
}: {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
});
```

- @param props - Propiedades tipadas: users, onEdit, onDelete.
- @returns Vista de UserTable con el contrato de propiedades declarado.

## src/components/organisms/VehicleCollection.tsx

Cuadrícula de vehículos autorizados con edición y baja confirmada.

[Abrir fuente](../src/components/organisms/VehicleCollection.tsx)

| Exportación       | Responsabilidad                                                    |
| ----------------- | ------------------------------------------------------------------ |
| VehicleCollection | Cuadrícula de vehículos autorizados con edición y baja confirmada. |

### VehicleCollection

```ts
export function VehicleCollection({ m }: { m: ReturnType<typeof useVehicles> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de VehicleCollection con el contrato de propiedades declarado.

## src/components/organisms/VehicleDeleteDialog.tsx

Confirma la baja lógica; el servidor rechaza trabajos pendientes.

[Abrir fuente](../src/components/organisms/VehicleDeleteDialog.tsx)

| Exportación         | Responsabilidad                                                   |
| ------------------- | ----------------------------------------------------------------- |
| VehicleDeleteDialog | Confirma la baja lógica; el servidor rechaza trabajos pendientes. |

### VehicleDeleteDialog

```ts
export function VehicleDeleteDialog({ manager }: { manager: ReturnType<typeof useVehicles> });
```

- @param props - Propiedades tipadas: manager.
- @returns Vista de VehicleDeleteDialog con el contrato de propiedades declarado.

## src/components/organisms/VehicleEditDialog.tsx

Formulario del vehículo con titular controlado por rol y servidor.

[Abrir fuente](../src/components/organisms/VehicleEditDialog.tsx)

| Exportación       | Responsabilidad                                                    |
| ----------------- | ------------------------------------------------------------------ |
| VehicleEditDialog | Formulario del vehículo con titular controlado por rol y servidor. |

### VehicleEditDialog

```ts
export function VehicleEditDialog({ manager }: { manager: ReturnType<typeof useVehicles> });
```

- @param props - Propiedades tipadas: manager.
- @returns Vista de VehicleEditDialog con el contrato de propiedades declarado.

## src/components/organisms/VehicleEditor.tsx

Formularios y confirmación de baja con datos del vehículo seleccionado.

[Abrir fuente](../src/components/organisms/VehicleEditor.tsx)

| Exportación   | Responsabilidad                                                         |
| ------------- | ----------------------------------------------------------------------- |
| VehicleEditor | Formularios y confirmación de baja con datos del vehículo seleccionado. |

### VehicleEditor

```ts
export function VehicleEditor({ manager }: { manager: ReturnType<typeof useVehicles> });
```

- @param props - Propiedades tipadas: manager.
- @returns Vista de VehicleEditor con el contrato de propiedades declarado.

## src/components/organisms/VehicleTypeDialog.tsx

Formulario administrativo de categorías utilizadas por las tarifas.

[Abrir fuente](../src/components/organisms/VehicleTypeDialog.tsx)

| Exportación       | Responsabilidad                                                     |
| ----------------- | ------------------------------------------------------------------- |
| VehicleTypeDialog | Formulario administrativo de categorías utilizadas por las tarifas. |

### VehicleTypeDialog

```ts
export function VehicleTypeDialog({ m }: { m: ReturnType<typeof useVehicleTypes> });
```

- @param props - Propiedades tipadas: m.
- @returns Vista de VehicleTypeDialog con el contrato de propiedades declarado.

## src/components/organisms/VehicleTypeManager.tsx

Categorías registradas y formularios administrativos sin exponer SQL ni identificadores técnicos.

[Abrir fuente](../src/components/organisms/VehicleTypeManager.tsx)

| Exportación        | Responsabilidad                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| VehicleTypeManager | Categorías registradas y formularios administrativos sin exponer SQL ni identificadores técnicos. |

### VehicleTypeManager

```ts
export function VehicleTypeManager({ onChanged }: { onChanged?: () => Promise<void> });
```

- @param props Recarga opcional de vehículos cuando se modifica el catálogo.
- @returns Vista de VehicleTypeManager con el contrato de propiedades declarado.

## src/components/organisms/WalkInConfirmation.tsx

Distingue la estimación de disponibilidad del turno ya guardado.

[Abrir fuente](../src/components/organisms/WalkInConfirmation.tsx)

| Exportación        | Responsabilidad                                                  |
| ------------------ | ---------------------------------------------------------------- |
| WalkInConfirmation | Distingue la estimación de disponibilidad del turno ya guardado. |

### WalkInConfirmation

```ts
export function WalkInConfirmation({ m }: { m: ReturnType<typeof useWalkIn> });
```

- @param props Estado del registro rápido.
- @returns Resumen con importe real y acciones de confirmación o siguiente ingreso.

## src/components/organisms/WalkInServices.tsx

Reutiliza reglas de lavado único y adicionales por categoría, con precios visibles.

[Abrir fuente](../src/components/organisms/WalkInServices.tsx)

| Exportación    | Responsabilidad                                                                     |
| -------------- | ----------------------------------------------------------------------------------- |
| WalkInServices | Reutiliza reglas de lavado único y adicionales por categoría, con precios visibles. |

### WalkInServices

```ts
export function WalkInServices({ m }: { m: ReturnType<typeof useWalkIn> });
```

- @param props Catálogo y selección del ingreso.
- @returns Servicios base y extras separados.

## src/components/organisms/WalkInVehicle.tsx

Solicita solo patente y categoría; los datos de contacto son opcionales.

[Abrir fuente](../src/components/organisms/WalkInVehicle.tsx)

| Exportación   | Responsabilidad                                                          |
| ------------- | ------------------------------------------------------------------------ |
| WalkInVehicle | Solicita solo patente y categoría; los datos de contacto son opcionales. |

### WalkInVehicle

```ts
export function WalkInVehicle({ m }: { m: ReturnType<typeof useWalkIn> });
```

- @param props Estado del ingreso presencial.
- @returns Campos del auto con detalles adicionales plegables.

## src/components/organisms/WashFeedbackForm.tsx

Captura una devolución del titular después de que se confirma el trabajo.

[Abrir fuente](../src/components/organisms/WashFeedbackForm.tsx)

| Exportación      | Responsabilidad                                                           |
| ---------------- | ------------------------------------------------------------------------- |
| WashFeedbackForm | Captura una devolución del titular después de que se confirma el trabajo. |

### WashFeedbackForm

```ts
export function WashFeedbackForm({
  appointmentId,
  sent,
  refresh,
}: {
  appointmentId: string;
  sent: boolean;
  refresh: () => Promise<void>;
});
```

- @param props - Identificador del turno, estado del envío y recarga.
- @returns Formulario o confirmación de envío previo.

## src/components/organisms/WeeklyActivity.tsx

Muestra semanas del mes y demanda de servicios con actualización automática.

[Abrir fuente](../src/components/organisms/WeeklyActivity.tsx)

| Exportación    | Responsabilidad                                                              |
| -------------- | ---------------------------------------------------------------------------- |
| WeeklyActivity | Muestra semanas del mes y demanda de servicios con actualización automática. |

### WeeklyActivity

```ts
export function WeeklyActivity({
  resource: r,
}: {
  resource: ReturnType<typeof useDashboard>['week'];
});
```

- @param props Recurso contable del mes actual.
- @returns Gráficos de barras y estado de consulta.

## src/components/organisms/WelcomePanel.tsx

Presentación inicial del producto.

[Abrir fuente](../src/components/organisms/WelcomePanel.tsx)

| Exportación  | Responsabilidad                    |
| ------------ | ---------------------------------- |
| WelcomePanel | Presentación inicial del producto. |

### WelcomePanel

```ts
export function WelcomePanel({ state, onRetry }: { state: HealthState; onRetry: () => void });
```

- @param props Estado de red y callback de reintento.
- @returns Bienvenida y tarjeta de horario/conectividad.

## src/components/organisms/WorkspaceFrame.tsx

Estructura común independiente del contenido y de las consultas de cada pantalla.

[Abrir fuente](../src/components/organisms/WorkspaceFrame.tsx)

| Exportación    | Responsabilidad                                                                   |
| -------------- | --------------------------------------------------------------------------------- |
| WorkspaceFrame | Estructura común independiente del contenido y de las consultas de cada pantalla. |

### WorkspaceFrame

```ts
export function WorkspaceFrame({ children }: PropsWithChildren);
```

- @param props Contenido desplazable que la pantalla entrega al marco.
- @returns Navegación adaptada al ancho; los invitados conservan un acceso limpio.

## src/components/organisms/WorkspaceHeader.tsx

Cabecera visual común; su área interactiva conserva su propio estado de menú.

[Abrir fuente](../src/components/organisms/WorkspaceHeader.tsx)

| Exportación     | Responsabilidad                                                               |
| --------------- | ----------------------------------------------------------------------------- |
| WorkspaceHeader | Cabecera visual común; su área interactiva conserva su propio estado de menú. |

### WorkspaceHeader

```ts
export function WorkspaceHeader({ wide }: { wide: boolean });
```

- @param props Indica si la navegación lateral ya está visible.
- @returns Marca o contexto del rol, sin duplicar cabeceras del navegador.

## src/components/organisms/WorkspaceHeaderActions.tsx

Área de interacción de cabecera, separada del posicionamiento visual.

[Abrir fuente](../src/components/organisms/WorkspaceHeaderActions.tsx)

| Exportación            | Responsabilidad                                                       |
| ---------------------- | --------------------------------------------------------------------- |
| WorkspaceHeaderActions | Área de interacción de cabecera, separada del posicionamiento visual. |

### WorkspaceHeaderActions

```ts
export function WorkspaceHeaderActions({ wide }: { wide: boolean });
```

- @param props Indica si el escritorio ya dispone de una barra lateral.
- @returns Identidad en escritorio o acceso al menú administrativo en móvil.

## src/components/organisms/WorkspaceSidebar.tsx

Estructura lateral independiente del catálogo de destinos y de su selección.

[Abrir fuente](../src/components/organisms/WorkspaceSidebar.tsx)

| Exportación      | Responsabilidad                                                              |
| ---------------- | ---------------------------------------------------------------------------- |
| WorkspaceSidebar | Estructura lateral independiente del catálogo de destinos y de su selección. |

### WorkspaceSidebar

```ts
export function WorkspaceSidebar();
```

- @returns Marca, navegación y sesión sobre una superficie de alto contraste.

## src/constants/appointmentFields.ts

Motivo obligatorio visible al cliente y conservado con la cancelación.

[Abrir fuente](../src/constants/appointmentFields.ts)

| Exportación           | Responsabilidad                                                        |
| --------------------- | ---------------------------------------------------------------------- |
| cancellationFields    | Motivo obligatorio visible al cliente y conservado con la cancelación. |
| appointmentNoteFields | Observación del equipo, atribuida en el servidor a quien la escribe.   |

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

## src/constants/recoveryFields.ts

Solicitud sin campos de rol, retorno ni información privada adicional.

[Abrir fuente](../src/constants/recoveryFields.ts)

| Exportación    | Responsabilidad                                                          |
| -------------- | ------------------------------------------------------------------------ |
| recoveryFields | Solicitud sin campos de rol, retorno ni información privada adicional.   |
| resetFields    | El servidor valida también longitud por bytes y el token de un solo uso. |

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

## src/constants/socialProviders.ts

Proveedores admitidos; su disponibilidad real depende de credenciales privadas del backend.

[Abrir fuente](../src/constants/socialProviders.ts)

| Exportación          | Responsabilidad                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------- |
| socialProviders      | Proveedores admitidos; su disponibilidad real depende de credenciales privadas del backend. |
| socialProviderLabels | Etiquetas comunes para los botones habilitados y estados no disponibles.                    |

## src/constants/timeWheel.ts

Alto fijo para alinear la selección central y el ajuste de cada plataforma.

[Abrir fuente](../src/constants/timeWheel.ts)

| Exportación      | Responsabilidad                                                             |
| ---------------- | --------------------------------------------------------------------------- |
| WHEEL_ROW_HEIGHT | Alto fijo para alinear la selección central y el ajuste de cada plataforma. |

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

### AuthProvider

```ts
export function AuthProvider({ children }: PropsWithChildren);
```

- @param props - Propiedades tipadas: children.
- @returns Vista de AuthProvider con el contrato de propiedades declarado.

## src/context/ThemeContext.tsx

Preferencia manual o seguimiento del sistema.

[Abrir fuente](../src/context/ThemeContext.tsx)

| Exportación   | Responsabilidad                                                        |
| ------------- | ---------------------------------------------------------------------- |
| ThemeMode     | Preferencia manual o seguimiento del sistema.                          |
| ThemeContext  | Contexto de tema persistente, sin datos de autenticación.              |
| ThemeProvider | Provee paleta y restaura preferencia desde almacenamiento no sensible. |

### ThemeProvider

```ts
export function ThemeProvider({ children }: PropsWithChildren);
```

- @param props - Propiedades tipadas: children.
- @returns Vista de ThemeProvider con el contrato de propiedades declarado.

## src/hooks/appointmentCommands.ts

Acciones operativas; el permiso y la transición se vuelven a validar en el backend.

[Abrir fuente](../src/hooks/appointmentCommands.ts)

| Exportación         | Responsabilidad                                                                     |
| ------------------- | ----------------------------------------------------------------------------------- |
| appointmentCommands | Acciones operativas; el permiso y la transición se vuelven a validar en el backend. |

### appointmentCommands

```ts
export function appointmentCommands(
  flags: ReturnType<typeof useAppointmentFlags>,
  mutate: ReturnType<typeof useAppointmentMutation>['mutate'],
);
```

- @param flags - Capacidades derivadas del rol, asignación y estado del turno.
- @param mutate - Comando que conserva mensajes y recarga datos tras confirmar.
- @returns `{ assign: () => Promise<void>; cancel: (v: Record<string, string>) => Promise<void>; advance: () => Promise<void>; setAdminStatus: () => Promise<void>; addNote: (v: Record<string, string>) => Promise<void>; }`.

## src/hooks/profileCommands.ts

Operaciones propias; cambiar contraseña revoca sesiones e inicia nuevamente el acceso.

[Abrir fuente](../src/hooks/profileCommands.ts)

| Exportación     | Responsabilidad                                                                        |
| --------------- | -------------------------------------------------------------------------------------- |
| profileCommands | Operaciones propias; cambiar contraseña revoca sesiones e inicia nuevamente el acceso. |

### profileCommands

```ts
export function profileCommands(
  auth: ReturnType<typeof useAuth>,
  action: ReturnType<typeof useAction>,
);
```

- @param auth - Operaciones de la sesión autenticada.
- @param action - Estado y ejecutor de la acción remota.
- @returns `{ save: (v: Record<string, string>) => Promise<void>; changePassword: (v: Record<string, string>) => Promise<void>; }`.

## src/hooks/useAction.ts

Ejecuta una acción y publica carga/error/resultado sin propagar errores a la vista.

[Abrir fuente](../src/hooks/useAction.ts)

| Exportación | Responsabilidad                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| useAction   | Ejecuta una acción y publica carga/error/resultado sin propagar errores a la vista. |

### useAction

```ts
export function useAction();
```

- @returns busy, error, message, run y clear; run devuelve undefined si captura un rechazo.

## src/hooks/useAgendaList.ts

Traduce filtros visuales a la consulta; el servidor decide la visibilidad efectiva.

[Abrir fuente](../src/hooks/useAgendaList.ts)

| Exportación   | Responsabilidad                                                                     |
| ------------- | ----------------------------------------------------------------------------------- |
| useAgendaList | Traduce filtros visuales a la consulta; el servidor decide la visibilidad efectiva. |

### useAgendaList

```ts
export function useAgendaList(
  mode: 'client' | 'employee' | 'admin',
  filters: ReturnType<typeof useAppointmentFiltersState>,
);
```

- @param mode Rol de la vista que selecciona el tipo de historial.
- @param filters Fecha, estado y opciones administrativas vigentes.
- @returns Lista paginada que nunca mezcla resultados de fechas diferentes.

## src/hooks/useAgendaResources.ts

Recursos auxiliares de agenda, habilitados únicamente para la experiencia correspondiente.

[Abrir fuente](../src/hooks/useAgendaResources.ts)

| Exportación        | Responsabilidad                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------ |
| useAgendaResources | Recursos auxiliares de agenda, habilitados únicamente para la experiencia correspondiente. |

### useAgendaResources

```ts
export function useAgendaResources(mode: 'client' | 'employee' | 'admin');
```

- @param mode Experiencia que determina qué opciones puede pedir la interfaz.
- @returns Opciones administrativas con sus estados independientes.

## src/hooks/useApiHealth.ts

Consulta el backend y cancela la solicitud al desmontar.

[Abrir fuente](../src/hooks/useApiHealth.ts)

| Exportación  | Responsabilidad                                          |
| ------------ | -------------------------------------------------------- |
| useApiHealth | Consulta el backend y cancela la solicitud al desmontar. |

### useApiHealth

```ts
export function useApiHealth();
```

- @returns Estado de conectividad y acción retry; captura errores de red.

## src/hooks/useAppointmentDetail.ts

Compone datos, selección y acciones del detalle de turno con ownership en la API.

[Abrir fuente](../src/hooks/useAppointmentDetail.ts)

| Exportación          | Responsabilidad                                                                   |
| -------------------- | --------------------------------------------------------------------------------- |
| useAppointmentDetail | Compone datos, selección y acciones del detalle de turno con ownership en la API. |

### useAppointmentDetail

```ts
export function useAppointmentDetail(id: string);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @returns Detalle, permisos de controles, diálogos y comandos de estado/cobro; los errores de escritura no borran el turno.

## src/hooks/useAppointmentFiltersState.ts

Filtros locales; no sustituyen las restricciones de propiedad aplicadas por la API.

[Abrir fuente](../src/hooks/useAppointmentFiltersState.ts)

| Exportación                | Responsabilidad                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------- |
| useAppointmentFiltersState | Filtros locales; no sustituyen las restricciones de propiedad aplicadas por la API. |

### useAppointmentFiltersState

```ts
export function useAppointmentFiltersState(
  mode: 'client' | 'employee' | 'admin',
  history: boolean,
);
```

- @param mode - Experiencia o preferencia seleccionada dentro de su unión de tipos.
- @param history - Selecciona trabajos anteriores en lugar de próximas visitas.
- @returns Filtros y setters de fecha, texto, estado, titular y responsable para construir la clave de consulta.

## src/hooks/useAppointmentFlags.ts

Selecciones de administración y apertura de diálogos; se sincronizan con la versión remota.

[Abrir fuente](../src/hooks/useAppointmentFlags.ts)

| Exportación         | Responsabilidad                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------- |
| useAppointmentFlags | Selecciones de administración y apertura de diálogos; se sincronizan con la versión remota. |

### useAppointmentFlags

```ts
export function useAppointmentFlags(appointment: Appointment | null);
```

- @param appointment - Turno autorizado que conserva datos históricos del contrato.
- @returns Selección de empleado/estado, apertura de diálogos y sus setters, sincronizados con el turno.

## src/hooks/useAppointmentMutation.ts

Mutación de turno y actualización de los recursos afectados después de confirmar.

[Abrir fuente](../src/hooks/useAppointmentMutation.ts)

| Exportación            | Responsabilidad                                                                   |
| ---------------------- | --------------------------------------------------------------------------------- |
| useAppointmentMutation | Mutación de turno y actualización de los recursos afectados después de confirmar. |

### useAppointmentMutation

```ts
export function useAppointmentMutation(id: string, refresh: () => Promise<void>);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param refresh - Vuelve a consultar recursos después de una operación confirmada.
- @returns Estado action y comando mutate que recarga el turno después de confirmar.

## src/hooks/useAppointmentPayment.ts

Mantiene la misma clave al reintentar un pago y la renueva solo tras su confirmación.

[Abrir fuente](../src/hooks/useAppointmentPayment.ts)

| Exportación           | Responsabilidad                                                                       |
| --------------------- | ------------------------------------------------------------------------------------- |
| useAppointmentPayment | Mantiene la misma clave al reintentar un pago y la renueva solo tras su confirmación. |

### useAppointmentPayment

```ts
export function useAppointmentPayment(
  mutate: ReturnType<typeof useAppointmentMutation>['mutate'],
  close: () => void,
);
```

- @param mutate - Comando que conserva mensajes y recarga datos tras confirmar.
- @param close - Cierra el diálogo después de una operación confirmada.
- @returns Callback de formulario que convierte pesos a centavos y conserva la clave al reintentar.

## src/hooks/useAppointmentResources.ts

Consultas del detalle; los recursos administrativos no se solicitan para otros roles.

[Abrir fuente](../src/hooks/useAppointmentResources.ts)

| Exportación             | Responsabilidad                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------- |
| useAppointmentResources | Consultas del detalle; los recursos administrativos no se solicitan para otros roles. |

### useAppointmentResources

```ts
export function useAppointmentResources(id: string, user: User | null, receiptOpen: boolean);
```

- @param id - Identificador del recurso dentro del proyecto actual.
- @param user - Perfil vigente; nunca incluye una contraseña legible.
- @param receiptOpen - Indica si debe consultarse y mostrarse el comprobante.
- @returns Consultas separadas de turno, pagos, comprobante, ajustes y empleados, más su recarga coordinada.

## src/hooks/useAppointmentVehicle.ts

Carga los vehículos del titular y confirma el vínculo sin volver a reservar el horario.

[Abrir fuente](../src/hooks/useAppointmentVehicle.ts)

| Exportación           | Responsabilidad                                                                         |
| --------------------- | --------------------------------------------------------------------------------------- |
| useAppointmentVehicle | Carga los vehículos del titular y confirma el vínculo sin volver a reservar el horario. |

### useAppointmentVehicle

```ts
export function useAppointmentVehicle(
  appointment: Appointment,
  admin: boolean,
  refresh: () => Promise<void>,
);
```

- @param appointment Turno confirmado cuyo tipo quedó registrado al reservar.
- @param admin Permite filtrar por titular en una reserva asistida.
- @param refresh Actualiza el detalle con la patente asignada.
- @returns Opciones compatibles y comandos para vincular o registrar.

## src/hooks/useAppointments.ts

Coordina filtros, página y opciones; el servidor aplica propiedad y asignaciones.

[Abrir fuente](../src/hooks/useAppointments.ts)

| Exportación     | Responsabilidad                                                                   |
| --------------- | --------------------------------------------------------------------------------- |
| useAppointments | Coordina filtros, página y opciones; el servidor aplica propiedad y asignaciones. |

### useAppointments

```ts
export function useAppointments(mode: 'client' | 'employee' | 'admin', initialHistory = false);
```

- @param mode Experiencia que determina los filtros visibles, sin conceder permisos.
- @param initialHistory Abre trabajos anteriores en lugar de próximos turnos.
- @returns Lista paginada, filtros y opciones administrativas con recarga conjunta.

## src/hooks/useAttendance.ts

Usa la fecha oficial del servidor y recarga el fichaje tras cada llegada.

[Abrir fuente](../src/hooks/useAttendance.ts)

| Exportación   | Responsabilidad                                                           |
| ------------- | ------------------------------------------------------------------------- |
| useAttendance | Usa la fecha oficial del servidor y recarga el fichaje tras cada llegada. |

### useAttendance

```ts
export function useAttendance();
```

- @returns Fecha seleccionada, plantel y acción de fichaje.

## src/hooks/useAuth.ts

Accede a sesión verificada. @throws Error si falta AuthProvider.

[Abrir fuente](../src/hooks/useAuth.ts)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| useAuth     | Accede a sesión verificada. @throws Error si falta AuthProvider. |

### useAuth

```ts
export function useAuth();
```

- @returns Contexto vigente de usuario, restauración y acciones de sesión.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/hooks/useBooking.ts

Compone selección, consulta y confirmación sin lógica de negocio dentro de la pantalla.

[Abrir fuente](../src/hooks/useBooking.ts)

| Exportación | Responsabilidad                                                                         |
| ----------- | --------------------------------------------------------------------------------------- |
| useBooking  | Compone selección, consulta y confirmación sin lógica de negocio dentro de la pantalla. |

### useBooking

```ts
export function useBooking();
```

- @returns Selección, cotización vigente, horarios libres, confirmación y sondeo; canSubmit se desactiva ante carga o error.

## src/hooks/useBookingConfirmation.ts

Guardar solo prepara el resumen; confirmar envía el turno y vuelve a validar en el servidor.

[Abrir fuente](../src/hooks/useBookingConfirmation.ts)

| Exportación            | Responsabilidad                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| useBookingConfirmation | Guardar solo prepara el resumen; confirmar envía el turno y vuelve a validar en el servidor. |

### useBookingConfirmation

```ts
export function useBookingConfirmation(
  selection: ReturnType<typeof useBookingSelection>,
  resources: ReturnType<typeof useBookingResources>,
  admin: boolean,
);
```

- @param selection Borrador y hora guardada explícitamente por el cliente.
- @param resources Catálogo y disponibilidad de la selección vigente.
- @param admin Permite incluir el titular de una reserva asistida.
- @returns Acciones separadas y permisos calculados sobre la disponibilidad actual.

## src/hooks/useBookingOptions.ts

Recursos y recarga de los selectores, separados de la cotización dependiente.

[Abrir fuente](../src/hooks/useBookingOptions.ts)

| Exportación       | Responsabilidad                                                               |
| ----------------- | ----------------------------------------------------------------------------- |
| useBookingOptions | Recursos y recarga de los selectores, separados de la cotización dependiente. |

### useBookingOptions

```ts
export function useBookingOptions(admin: boolean);
```

- @param admin Habilita lectura de clientes, validada además en servidor.
- @returns Recursos actuales y recarga conjunta.

## src/hooks/useBookingResources.ts

Cotiza por categoría y recarga las opciones vigentes cuando se vuelve al formulario.

[Abrir fuente](../src/hooks/useBookingResources.ts)

| Exportación         | Responsabilidad                                                                      |
| ------------------- | ------------------------------------------------------------------------------------ |
| useBookingResources | Cotiza por categoría y recarga las opciones vigentes cuando se vuelve al formulario. |

### useBookingResources

```ts
export function useBookingResources(s: ReturnType<typeof useBookingSelection>, admin: boolean);
```

- @param s Selección local de la reserva.
- @param admin Habilita reserva asistida, sujeta a permisos del servidor.
- @returns Opciones y disponibilidad del filtro actual, con recarga conjunta.

## src/hooks/useBookingSelection.ts

Cada cambio de titular, categoría, servicios o día invalida el inicio elegido.

[Abrir fuente](../src/hooks/useBookingSelection.ts)

| Exportación         | Responsabilidad                                                                |
| ------------------- | ------------------------------------------------------------------------------ |
| useBookingSelection | Cada cambio de titular, categoría, servicios o día invalida el inicio elegido. |

### useBookingSelection

```ts
export function useBookingSelection(clientId: string);
```

- @param clientId Titular inicial. En una reserva asistida se elige en el formulario.
- @returns Hora en borrador y hora guardada por separado, sin requerir un vehículo particular.

## src/hooks/useBookingSubmit.ts

Envía la intención de reserva sin confiar en el precio de la interfaz.

[Abrir fuente](../src/hooks/useBookingSubmit.ts)

| Exportación      | Responsabilidad                                                        |
| ---------------- | ---------------------------------------------------------------------- |
| useBookingSubmit | Envía la intención de reserva sin confiar en el precio de la interfaz. |

### useBookingSubmit

```ts
export function useBookingSubmit(
  s: ReturnType<typeof useBookingSelection>,
  admin: boolean,
  refresh: () => Promise<void>,
  ready: boolean,
);
```

- @param s Selección actual con inicio ofrecido por disponibilidad.
- @param admin Incluye clientId solo para reserva asistida.
- @param refresh Recotiza si el servidor rechaza, por ejemplo por un horario ocupado.
- @param ready Solo true para un horario de la cotización vigente.
- @returns Estado de acción y submit; navega solo después de confirmar.

## src/hooks/useBookingSummaryNavigation.ts

Tras guardar, muestra el resumen superior en escritorio y la tarjeta final en teléfono.

[Abrir fuente](../src/hooks/useBookingSummaryNavigation.ts)

| Exportación                 | Responsabilidad                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------- |
| useBookingSummaryNavigation | Tras guardar, muestra el resumen superior en escritorio y la tarjeta final en teléfono. |

### useBookingSummaryNavigation

```ts
export function useBookingSummaryNavigation(booking: ReturnType<typeof useBooking>);
```

- @param booking Acción validada que guarda la hora sin enviar una reserva.
- @returns Solicitud de scroll y callback exclusivo del botón Guardar.

## src/hooks/useCancellationNotices.ts

Consulta avisos propios y confirma su lectura en el servidor.

[Abrir fuente](../src/hooks/useCancellationNotices.ts)

| Exportación            | Responsabilidad                                               |
| ---------------------- | ------------------------------------------------------------- |
| useCancellationNotices | Consulta avisos propios y confirma su lectura en el servidor. |

### useCancellationNotices

```ts
export function useCancellationNotices();
```

- @returns Lista persistente, estado de la acción y confirmación sin ocultar errores de red.

## src/hooks/useCatalog.ts

Compone consulta, edición de servicio y edición de tarifa como responsabilidades separadas.

[Abrir fuente](../src/hooks/useCatalog.ts)

| Exportación | Responsabilidad                                                                             |
| ----------- | ------------------------------------------------------------------------------------------- |
| useCatalog  | Compone consulta, edición de servicio y edición de tarifa como responsabilidades separadas. |

### useCatalog

```ts
export function useCatalog();
```

- @returns Catálogo, edición/baja de servicios y diálogo de tarifa por categoría, con errores de lectura y escritura separados.

## src/hooks/useConnectionNotice.ts

Evita parpadeos en conexiones rápidas y explica esperas prolongadas en la app.

[Abrir fuente](../src/hooks/useConnectionNotice.ts)

| Exportación         | Responsabilidad                                                                |
| ------------------- | ------------------------------------------------------------------------------ |
| useConnectionNotice | Evita parpadeos en conexiones rápidas y explica esperas prolongadas en la app. |

### useConnectionNotice

```ts
export function useConnectionNotice();
```

- @returns true después de dos segundos de espera continua.

## src/hooks/useCustomerMessages.ts

Lista y mutaciones de atención; la API decide la bandeja permitida por rol.

[Abrir fuente](../src/hooks/useCustomerMessages.ts)

| Exportación         | Responsabilidad                                                             |
| ------------------- | --------------------------------------------------------------------------- |
| useCustomerMessages | Lista y mutaciones de atención; la API decide la bandeja permitida por rol. |

### useCustomerMessages

```ts
export function useCustomerMessages(admin: boolean);
```

- @param admin - Selecciona el filtro administrativo de la bandeja.
- @returns Lista paginada, filtros y acciones de atención.

## src/hooks/useDashboard.ts

Datos del tablero; refresca resumen y solicitudes como una sola acción de pantalla.

[Abrir fuente](../src/hooks/useDashboard.ts)

| Exportación  | Responsabilidad                                                                     |
| ------------ | ----------------------------------------------------------------------------------- |
| useDashboard | Datos del tablero; refresca resumen y solicitudes como una sola acción de pantalla. |

### useDashboard

```ts
export function useDashboard();
```

- @returns Usuario, reporte diario, pendientes globales, semanas del mes y recarga conjunta.

## src/hooks/useDebouncedValue.ts

Evita una solicitud de búsqueda por cada tecla sin retrasar la escritura visible.

[Abrir fuente](../src/hooks/useDebouncedValue.ts)

| Exportación       | Responsabilidad                                                                   |
| ----------------- | --------------------------------------------------------------------------------- |
| useDebouncedValue | Evita una solicitud de búsqueda por cada tecla sin retrasar la escritura visible. |

### useDebouncedValue

```ts
export function useDebouncedValue<T>(value: T, delay = 300);
```

- @param value - Texto o filtro actual; se publica después de permanecer estable durante delay.
- @param delay - Espera en milisegundos antes de publicar el valor estabilizado.
- @returns Último valor que se mantuvo estable durante el intervalo pedido.

## src/hooks/useEditorState.ts

Mantiene exclusivamente la selección y apertura de un editor de entidad.

[Abrir fuente](../src/hooks/useEditorState.ts)

| Exportación    | Responsabilidad                                                          |
| -------------- | ------------------------------------------------------------------------ |
| useEditorState | Mantiene exclusivamente la selección y apertura de un editor de entidad. |

### useEditorState

```ts
export function useEditorState<T>();
```

- @returns Entidad seleccionada y controles para abrir alta/edición, cerrar y solicitar/cancelar el diálogo de baja.

## src/hooks/useEntityManager.ts

Une una colección paginada con el editor reutilizable; preserva error de lectura separado.

[Abrir fuente](../src/hooks/useEntityManager.ts)

| Exportación      | Responsabilidad                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------ |
| useEntityManager | Une una colección paginada con el editor reutilizable; preserva error de lectura separado. |

### useEntityManager

```ts
export function useEntityManager<T extends { id: string }>(
  path: string,
  transform: (v: Record<string, string>) => unknown,
  query: Query = {},
  saveOperation?: (current: T | null, body: unknown) => Promise<unknown>,
);
```

- @param path - Ruta relativa del recurso dentro de la API versionada.
- @param transform - Convierte valores del formulario al body de la API.
- @param query - Filtros y paginación enviados como parámetros de consulta.
- @param saveOperation - Guardado especializado que sustituye al estándar cuando el contrato lo requiere.
- @returns Lista paginada, editor y fetchError separado del error de escritura.

## src/hooks/useHome.ts

Próximas tres visitas propias, ordenadas cronológicamente.

[Abrir fuente](../src/hooks/useHome.ts)

| Exportación | Responsabilidad                                            |
| ----------- | ---------------------------------------------------------- |
| useHome     | Próximas tres visitas propias, ordenadas cronológicamente. |

### useHome

```ts
export function useHome();
```

- @returns Usuario, recurso paginado y las próximas tres visitas ordenadas por inicio.

## src/hooks/useHomeClear.ts

Limpia solo el inicio después de confirmar; Mis turnos y la operación conservan los datos.

[Abrir fuente](../src/hooks/useHomeClear.ts)

| Exportación  | Responsabilidad                                                                            |
| ------------ | ------------------------------------------------------------------------------------------ |
| useHomeClear | Limpia solo el inicio después de confirmar; Mis turnos y la operación conservan los datos. |

### useHomeClear

```ts
export function useHomeClear(refresh: () => Promise<void>);
```

- @param refresh Recarga las tarjetas al confirmar el servidor.
- @returns Diálogo, estado de envío y limpieza persistente propia.

## src/hooks/useInputFocus.ts

Mejora el foco sin reemplazar los eventos de React Hook Form ni del control nativo.

[Abrir fuente](../src/hooks/useInputFocus.ts)

| Exportación   | Responsabilidad                                                                     |
| ------------- | ----------------------------------------------------------------------------------- |
| useInputFocus | Mejora el foco sin reemplazar los eventos de React Hook Form ni del control nativo. |

### useInputFocus

```ts
export function useInputFocus(props: TextInputProps);
```

- @param props Eventos originales del campo controlado.
- @returns Estado visual y eventos que conservan la validación al abandonar el campo.

## src/hooks/useOptions.ts

Carga todas las páginas de un selector y permite actualizarlo al volver a la pantalla.

[Abrir fuente](../src/hooks/useOptions.ts)

| Exportación | Responsabilidad                                                                        |
| ----------- | -------------------------------------------------------------------------------------- |
| useOptions  | Carga todas las páginas de un selector y permite actualizarlo al volver a la pantalla. |

### useOptions

```ts
export function useOptions<T>(path: string, query: Query = {}, enabled = true);
```

- @param path Recurso paginado de la API.
- @param query Filtros serializables.
- @param enabled false evita solicitar opciones ajenas al rol.
- @returns Opciones actuales, loading, error y refresh.

## src/hooks/usePagedList.ts

Lista paginada con filtro y navegación entre páginas para no truncar datos.

[Abrir fuente](../src/hooks/usePagedList.ts)

| Exportación  | Responsabilidad                                                             |
| ------------ | --------------------------------------------------------------------------- |
| usePagedList | Lista paginada con filtro y navegación entre páginas para no truncar datos. |

### usePagedList

```ts
export function usePagedList<T>(path: string, filters: Query = {});
```

- @param path - Ruta relativa del recurso dentro de la API versionada.
- @param filters - Filtros que restringen los datos solicitados.
- @returns Recurso de consulta, página actual y setPage; los filtros reinician la página.

## src/hooks/usePasswordRecovery.ts

Coordina el formulario de solicitud sin revelar si el correo está registrado.

[Abrir fuente](../src/hooks/usePasswordRecovery.ts)

| Exportación         | Responsabilidad                                                                 |
| ------------------- | ------------------------------------------------------------------------------- |
| usePasswordRecovery | Coordina el formulario de solicitud sin revelar si el correo está registrado.   |
| usePasswordReset    | Compara contraseñas y consume el enlace, conservando la respuesta ante errores. |

### usePasswordRecovery

```ts
export function usePasswordRecovery();
```

- @returns Estado de envío y operación del formulario.

### usePasswordReset

```ts
export function usePasswordReset(token: string);
```

- @param token - Secreto de recuperación mantenido en memoria.
- @returns Estado y operación del formulario de nueva contraseña.

## src/hooks/useProfile.ts

Perfil propio con formularios, sesión y comandos separados por responsabilidad.

[Abrir fuente](../src/hooks/useProfile.ts)

| Exportación | Responsabilidad                                                                 |
| ----------- | ------------------------------------------------------------------------------- |
| useProfile  | Perfil propio con formularios, sesión y comandos separados por responsabilidad. |

### useProfile

```ts
export function useProfile();
```

- @returns Perfil propio, campos iniciales y comandos de guardado y contraseña; la cabecera gestiona la salida.

## src/hooks/useQuery.ts

Coordina carga, recarga y respuestas fuera de orden sin mostrar datos de otra selección.

[Abrir fuente](../src/hooks/useQuery.ts)

| Exportación | Responsabilidad                                                                          |
| ----------- | ---------------------------------------------------------------------------------------- |
| useQuery    | Coordina carga, recarga y respuestas fuera de orden sin mostrar datos de otra selección. |

### useQuery

```ts
export function useQuery<T>(key: string, enabled: boolean, load: () => Promise<T>);
```

- @param key Identidad estable del recurso y sus filtros.
- @param enabled Evita peticiones y resultados cuando faltan prerrequisitos.
- @param load Función estable que consulta el recurso.
- @returns Resultado vigente y refresh, seguro después del desmontaje.

## src/hooks/useRefreshOnReturn.ts

Actualiza al regresar a la ruta/app y, opcionalmente, mientras se usa una agenda.

[Abrir fuente](../src/hooks/useRefreshOnReturn.ts)

| Exportación        | Responsabilidad                                                                   |
| ------------------ | --------------------------------------------------------------------------------- |
| useRefreshOnReturn | Actualiza al regresar a la ruta/app y, opcionalmente, mientras se usa una agenda. |

### useRefreshOnReturn

```ts
export function useRefreshOnReturn(
  refresh?: () => void | Promise<void>,
  busy = false,
  interval = 0,
  revalidate?: (trigger: RefreshTrigger) => void | Promise<void>,
);
```

- @param refresh Recarga vigente; las vistas estáticas no instalan listeners.
- @param busy Evita solapar la carga o mutación de la pantalla.
- @param interval Milisegundos entre consultas visibles; cero deshabilita el sondeo.
- @param revalidate Recarga silenciosa opcional que conserva la lista del mismo filtro.
- @returns void; elimina listeners/timer al salir y nunca consulta con la app oculta.

## src/hooks/useRemoteData.ts

Consulta un recurso sin conservar resultados de filtros anteriores.

[Abrir fuente](../src/hooks/useRemoteData.ts)

| Exportación   | Responsabilidad                                                     |
| ------------- | ------------------------------------------------------------------- |
| useRemoteData | Consulta un recurso sin conservar resultados de filtros anteriores. |

### useRemoteData

```ts
export function useRemoteData<T>(path: string, query: Query = {}, enabled = true);
```

- @param path Recurso relativo de la API versionada.
- @param query Filtros serializables.
- @param enabled false cancela lógicamente la consulta y oculta resultados.
- @returns data, loading, error y refresh correspondientes a los filtros actuales.

## src/hooks/useReports.ts

Reporte por período calendario local y fecha elegida.

[Abrir fuente](../src/hooks/useReports.ts)

| Exportación | Responsabilidad                                       |
| ----------- | ----------------------------------------------------- |
| useReports  | Reporte por período calendario local y fecha elegida. |

### useReports

```ts
export function useReports();
```

- @returns Período/fecha seleccionados, respuesta agregada del servidor y carga/error del reporte.

## src/hooks/useResetToken.ts

Variante nativa: un enlace web puede abrir la pantalla de recuperación.

[Abrir fuente](../src/hooks/useResetToken.ts)

| Exportación   | Responsabilidad                                                         |
| ------------- | ----------------------------------------------------------------------- |
| useResetToken | Variante nativa: un enlace web puede abrir la pantalla de recuperación. |

### useResetToken

```ts
export function useResetToken();
```

- @returns Secreto en memoria, sin escribirlo en el almacenamiento del dispositivo.

## src/hooks/useResetToken.web.ts

Retira el fragmento del historial después de capturarlo en memoria.

[Abrir fuente](../src/hooks/useResetToken.web.ts)

| Exportación   | Responsabilidad                                                     |
| ------------- | ------------------------------------------------------------------- |
| useResetToken | Retira el fragmento del historial después de capturarlo en memoria. |

### useResetToken

```ts
export function useResetToken();
```

- @returns Token efímero; recargar exige volver a abrir el enlace del correo.

## src/hooks/useResourceEditor.ts

Compone selección, confirmaciones y persistencia para editores sin duplicar el ABML.

[Abrir fuente](../src/hooks/useResourceEditor.ts)

| Exportación       | Responsabilidad                                                                      |
| ----------------- | ------------------------------------------------------------------------------------ |
| useResourceEditor | Compone selección, confirmaciones y persistencia para editores sin duplicar el ABML. |

### useResourceEditor

```ts
export function useResourceEditor<T extends { id: string }>(
  path: string,
  transform: (v: Record<string, string>) => unknown,
  refresh: () => Promise<void>,
  saveOperation?: (current: T | null, body: unknown) => Promise<unknown>,
);
```

- @param path - Ruta relativa del recurso dentro de la API versionada.
- @param transform - Convierte valores del formulario al body de la API.
- @param refresh - Vuelve a consultar recursos después de una operación confirmada.
- @param saveOperation - Guardado especializado que sustituye al estándar cuando el contrato lo requiere.
- @returns Selección del editor, diálogos y comandos de guardado/baja.

## src/hooks/useRestoreDestination.ts

Conserva el enlace solicitado mientras las guardas esperan la sesión.

[Abrir fuente](../src/hooks/useRestoreDestination.ts)

| Exportación           | Responsabilidad                                                       |
| --------------------- | --------------------------------------------------------------------- |
| useRestoreDestination | Conserva el enlace solicitado mientras las guardas esperan la sesión. |

### useRestoreDestination

```ts
export function useRestoreDestination(restoring: boolean);
```

- @param restoring true durante la restauración o su reintento.
- @returns Ruta pública de espera con el destino interno original.

## src/hooks/useScrollControls.ts

Vincula los botones a su propia región; no desplaza la ventana ni otros diálogos.

[Abrir fuente](../src/hooks/useScrollControls.ts)

| Exportación       | Responsabilidad                                                                   |
| ----------------- | --------------------------------------------------------------------------------- |
| useScrollControls | Vincula los botones a su propia región; no desplaza la ventana ni otros diálogos. |

### useScrollControls

```ts
export function useScrollControls();
```

- @returns Ref, visibilidad y manejadores de medidas/desplazamiento para ScrollView.

## src/hooks/useScrollRequest.ts

Un identificador nuevo representa un gesto explícito, nunca una recarga automática.

[Abrir fuente](../src/hooks/useScrollRequest.ts)

| Exportación      | Responsabilidad                                                                      |
| ---------------- | ------------------------------------------------------------------------------------ |
| ScrollRequest    | Un identificador nuevo representa un gesto explícito, nunca una recarga automática.  |
| useScrollRequest | Lleva al resumen dentro del scroll existente, sin mover ventanas ni diálogos ajenos. |

### useScrollRequest

```ts
export function useScrollRequest(
  ref: RefObject<ComponentRef<typeof ScrollView> | null>,
  request?: ScrollRequest,
);
```

- @param ref Región desplazable propietaria de la pantalla.
- @param request Solicitud nueva de navegación dentro del contenido, si la hubo.
- @returns void; no desplaza por cambios de datos, sondeo o renderizados posteriores.

## src/hooks/useSearchSelect.ts

Maneja la búsqueda y cierra el diálogo al elegir una opción.

[Abrir fuente](../src/hooks/useSearchSelect.ts)

| Exportación     | Responsabilidad                                              |
| --------------- | ------------------------------------------------------------ |
| useSearchSelect | Maneja la búsqueda y cierra el diálogo al elegir una opción. |

### useSearchSelect

```ts
export function useSearchSelect(onChange: (value: string) => void);
```

- @param onChange Publica el identificador seleccionado.
- @returns Estado y operaciones del selector, independientes de la vista.

## src/hooks/useServicePrice.ts

Administra la tarifa por tipo de vehículo, independientemente del formulario de servicio.

[Abrir fuente](../src/hooks/useServicePrice.ts)

| Exportación     | Responsabilidad                                                                           |
| --------------- | ----------------------------------------------------------------------------------------- |
| useServicePrice | Administra la tarifa por tipo de vehículo, independientemente del formulario de servicio. |

### useServicePrice

```ts
export function useServicePrice(refresh: () => Promise<void>);
```

- @param refresh - Vuelve a consultar recursos después de una operación confirmada.
- @returns Servicio seleccionado, diálogo, error y guardado que recarga el catálogo después de confirmar.

## src/hooks/useSessionRestore.ts

Conserva credenciales ante una caída de conexión y permite reintentar el arranque.

[Abrir fuente](../src/hooks/useSessionRestore.ts)

| Exportación       | Responsabilidad                                                                    |
| ----------------- | ---------------------------------------------------------------------------------- |
| useSessionRestore | Conserva credenciales ante una caída de conexión y permite reintentar el arranque. |

### useSessionRestore

```ts
export function useSessionRestore();
```

- @returns Estado de arranque, error recuperable y retryRestore.

## src/hooks/useSessionSync.ts

Comparte cierre y cambios de cuenta; una rotación ajena actualiza el refresh sin crear un bucle de red.

[Abrir fuente](../src/hooks/useSessionSync.ts)

| Exportación    | Responsabilidad                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| useSessionSync | Comparte cierre y cambios de cuenta; una rotación ajena actualiza el refresh sin crear un bucle de red. |

### useSessionSync

```ts
export function useSessionSync(restore: () => void);
```

- @param restore Reinicia la restauración cuando otra pestaña elige una cuenta diferente.
- @returns void; retira el listener al desmontarse. Nativo usa un adaptador sin pestañas.

## src/hooks/useSettings.ts

Configuración operativa con horario local y capacidad simultánea.

[Abrir fuente](../src/hooks/useSettings.ts)

| Exportación | Responsabilidad                                                   |
| ----------- | ----------------------------------------------------------------- |
| useSettings | Configuración operativa con horario local y capacidad simultánea. |

### useSettings

```ts
export function useSettings();
```

- @returns Configuración vigente, formulario y guardado; la pantalla no calcula capacidad ni valida reservas por su cuenta.

## src/hooks/useSignIn.ts

Conecta formulario con registro/login y guarda refresh de forma segura.

[Abrir fuente](../src/hooks/useSignIn.ts)

| Exportación | Responsabilidad                                                         |
| ----------- | ----------------------------------------------------------------------- |
| useSignIn   | Conecta formulario con registro/login y guarda refresh de forma segura. |

### useSignIn

```ts
export function useSignIn(signUp = false);
```

- @param signUp - Distingue el contrato de registro del de acceso.
- @returns Estado ocupado/error y envío de acceso o registro que guarda la sesión y abre la portada del rol.

## src/hooks/useSignOutConfirmation.ts

Pide confirmación antes de borrar la sesión persistente de cualquiera de los tres roles.

[Abrir fuente](../src/hooks/useSignOutConfirmation.ts)

| Exportación            | Responsabilidad                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| useSignOutConfirmation | Pide confirmación antes de borrar la sesión persistente de cualquiera de los tres roles. |

### useSignOutConfirmation

```ts
export function useSignOutConfirmation();
```

- @returns Visibilidad, acciones de apertura/cierre y confirmación con carga/error sin envíos duplicados.

## src/hooks/useSocialExchange.ts

Canje compartido por web/APK; la contraseña se conserva solo mientras se envía.

[Abrir fuente](../src/hooks/useSocialExchange.ts)

| Exportación       | Responsabilidad                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| useSocialExchange | Canje compartido por web/APK; la contraseña se conserva solo mientras se envía. |

### useSocialExchange

```ts
export function useSocialExchange();
```

- @returns Canje, confirmación local, cancelación y estado de vinculación requerida.

## src/hooks/useSocialLogin.ts

Inicia AuthSession con PKCE; la API intercambia el código y emite su propia sesión.

[Abrir fuente](../src/hooks/useSocialLogin.ts)

| Exportación    | Responsabilidad                                                                     |
| -------------- | ----------------------------------------------------------------------------------- |
| useSocialLogin | Inicia AuthSession con PKCE; la API intercambia el código y emite su propia sesión. |

### useSocialLogin

```ts
export function useSocialLogin(provider: 'google' | 'discord' | 'github');
```

- @param provider - Google, Discord o GitHub; la API comprueba configuración y estado de un solo uso.
- @returns Acción de ingreso nativo y confirmación de vinculación local, con estado de red y error.

## src/hooks/useSocialLogin.web.ts

Estado del botón web; la confirmación de vinculación ocurre en la ruta de retorno.

[Abrir fuente](../src/hooks/useSocialLogin.web.ts)

| Exportación    | Responsabilidad                                                                    |
| -------------- | ---------------------------------------------------------------------------------- |
| useSocialLogin | Estado del botón web; la confirmación de vinculación ocurre en la ruta de retorno. |

### useSocialLogin

```ts
export function useSocialLogin(provider: 'google' | 'discord' | 'github');
```

- @param provider - Google, Discord o GitHub; la API comprueba configuración y estado de un solo uso.
- @returns Estado y acción que inicia el ingreso en esta pestaña; la ruta OAuth consume el retorno.

## src/hooks/useSocialProviders.ts

Consulta proveedores y permite reintentar si Render estaba despertando.

[Abrir fuente](../src/hooks/useSocialProviders.ts)

| Exportación        | Responsabilidad                                                         |
| ------------------ | ----------------------------------------------------------------------- |
| useSocialProviders | Consulta proveedores y permite reintentar si Render estaba despertando. |

### useSocialProviders

```ts
export function useSocialProviders();
```

- @returns Proveedores recibidos, estado busy/error y refresh para reintentar.

## src/hooks/useSocialResponse.ts

Completa retornos nativos y muestra también cancelaciones y errores del proveedor.

[Abrir fuente](../src/hooks/useSocialResponse.ts)

| Exportación       | Responsabilidad                                                                    |
| ----------------- | ---------------------------------------------------------------------------------- |
| useSocialResponse | Completa retornos nativos y muestra también cancelaciones y errores del proveedor. |

### useSocialResponse

```ts
export function useSocialResponse(
  request: AuthRequest | null,
  response: AuthSessionResult | null,
  action: ReturnType<typeof useSocialExchange>,
);
```

- @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
- @param response - Respuesta HTTP donde se escribe el contrato uniforme de error.
- @param action - Estado y ejecutor de la acción remota.
- @returns No devuelve un valor: sincroniza el retorno con el canje y el estado de error compartido.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/hooks/useTheme.ts

Retorna tema y selector. @throws Error fuera de ThemeProvider.

[Abrir fuente](../src/hooks/useTheme.ts)

| Exportación | Responsabilidad                                                |
| ----------- | -------------------------------------------------------------- |
| useTheme    | Retorna tema y selector. @throws Error fuera de ThemeProvider. |

### useTheme

```ts
export function useTheme();
```

- @returns Modo elegido, paleta resuelta y operación para persistir la preferencia.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/hooks/useTimeWheel.ts

Sincroniza arrastre, rueda del mouse y botones sin inventar horas libres.

[Abrir fuente](../src/hooks/useTimeWheel.ts)

| Exportación  | Responsabilidad                                                           |
| ------------ | ------------------------------------------------------------------------- |
| useTimeWheel | Sincroniza arrastre, rueda del mouse y botones sin inventar horas libres. |

### useTimeWheel

```ts
export function useTimeWheel(
  slots: string[],
  value: string,
  onChange: (value: string) => void,
);
```

- @param slots Horarios ofrecidos por la última cotización del servidor.
- @param value Horario elegido; vacío conserva el pedido de selección explícita.
- @param onChange Publica únicamente una opción todavía disponible.
- @returns Filas, referencia del scroll y controles accesibles.

## src/hooks/useUsers.ts

Gestión de usuarios; delega selección, persistencia y definición de formularios.

[Abrir fuente](../src/hooks/useUsers.ts)

| Exportación | Responsabilidad                                                                  |
| ----------- | -------------------------------------------------------------------------------- |
| useUsers    | Gestión de usuarios; delega selección, persistencia y definición de formularios. |

### useUsers

```ts
export function useUsers();
```

- @returns Listado y editor de clientes/empleados; el formulario de edición conserva el rol existente.

## src/hooks/useVehicleTypes.ts

Categorías con edición común y baja lógica que conserva referencias históricas.

[Abrir fuente](../src/hooks/useVehicleTypes.ts)

| Exportación     | Responsabilidad                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| useVehicleTypes | Categorías con edición común y baja lógica que conserva referencias históricas. |

### useVehicleTypes

```ts
export function useVehicleTypes(onChanged?: (() => Promise<void>) | undefined);
```

- @param onChanged Recarga los selectores externos que usan estas categorías.
- @returns Categorías y editor con baja lógica; propaga la recarga a los selectores que las utilizan.

## src/hooks/useVehicles.ts

ABML de vehículos con definición de formulario separada de las consultas y acciones.

[Abrir fuente](../src/hooks/useVehicles.ts)

| Exportación | Responsabilidad                                                                      |
| ----------- | ------------------------------------------------------------------------------------ |
| useVehicles | ABML de vehículos con definición de formulario separada de las consultas y acciones. |

### useVehicles

```ts
export function useVehicles();
```

- @returns Garaje/listado administrativo, campos y comandos de alta/edición/baja con categorías y titulares autorizados.

## src/hooks/useWalkIn.ts

Compone selección, cotización y guardado del ingreso presencial sin mezclar responsabilidades.

[Abrir fuente](../src/hooks/useWalkIn.ts)

| Exportación | Responsabilidad                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------- |
| useWalkIn   | Compone selección, cotización y guardado del ingreso presencial sin mezclar responsabilidades. |

### useWalkIn

```ts
export function useWalkIn();
```

- @returns Modelo del formulario administrativo con resultado confirmado.

## src/hooks/useWalkInActions.ts

Conserva el mismo UUID al reintentar; el servidor devuelve el turno ya guardado.

[Abrir fuente](../src/hooks/useWalkInActions.ts)

| Exportación      | Responsabilidad                                                                  |
| ---------------- | -------------------------------------------------------------------------------- |
| useWalkInActions | Conserva el mismo UUID al reintentar; el servidor devuelve el turno ya guardado. |

### useWalkInActions

```ts
export function useWalkInActions(
  selection: ReturnType<typeof useWalkInSelection>,
  ready: boolean,
  refresh: () => Promise<void>,
);
```

- @param selection Datos presenciales y clave del formulario.
- @param ready Selección cotizable de servicios.
- @param refresh Recarga disponibilidad después del intento.
- @returns Guardado, confirmación persistida y comienzo de otro ingreso.

## src/hooks/useWalkInResources.ts

Actualiza catálogo y disponibilidad sin descartar el texto que se está escribiendo.

[Abrir fuente](../src/hooks/useWalkInResources.ts)

| Exportación        | Responsabilidad                                                                     |
| ------------------ | ----------------------------------------------------------------------------------- |
| useWalkInResources | Actualiza catálogo y disponibilidad sin descartar el texto que se está escribiendo. |

### useWalkInResources

```ts
export function useWalkInResources(selection: ReturnType<typeof useWalkInSelection>);
```

- @param selection Categoría y servicios elegidos en el registro rápido.
- @returns Recursos cotizados y recarga coordinada.

## src/hooks/useWalkInSelection.ts

Conserva una clave de reintento hasta confirmar o comenzar otro ingreso.

[Abrir fuente](../src/hooks/useWalkInSelection.ts)

| Exportación        | Responsabilidad                                                          |
| ------------------ | ------------------------------------------------------------------------ |
| useWalkInSelection | Conserva una clave de reintento hasta confirmar o comenzar otro ingreso. |

### useWalkInSelection

```ts
export function useWalkInSelection();
```

- @returns Selección mínima, datos opcionales y acciones locales.

## src/hooks/useWashFeedback.ts

Envía una devolución ligada al turno; el servidor recupera el parte y su autor.

[Abrir fuente](../src/hooks/useWashFeedback.ts)

| Exportación     | Responsabilidad                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| useWashFeedback | Envía una devolución ligada al turno; el servidor recupera el parte y su autor. |

### useWashFeedback

```ts
export function useWashFeedback(appointmentId: string, refresh: () => Promise<void>);
```

- @param appointmentId - Turno finalizado sobre el que se envía la devolución.
- @param refresh - Vuelve a consultar el detalle tras confirmar el envío.
- @returns Estado del envío y función para enviar el texto.

## src/hooks/useWebOAuthReturn.ts

Consume el retorno web una vez, validando state/PKCE antes de guardar sesión.

[Abrir fuente](../src/hooks/useWebOAuthReturn.ts)

| Exportación       | Responsabilidad                                                               |
| ----------------- | ----------------------------------------------------------------------------- |
| useWebOAuthReturn | Consume el retorno web una vez, validando state/PKCE antes de guardar sesión. |

### useWebOAuthReturn

```ts
export function useWebOAuthReturn();
```

- @returns Estado de canje y formulario de vinculación; valida state y vencimiento antes de consumir el código.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/hooks/useWorkspaceLayout.ts

Resuelve densidad y navegación a partir del espacio real, también al girar el teléfono.

[Abrir fuente](../src/hooks/useWorkspaceLayout.ts)

| Exportación        | Responsabilidad                                                                         |
| ------------------ | --------------------------------------------------------------------------------------- |
| useWorkspaceLayout | Resuelve densidad y navegación a partir del espacio real, también al girar el teléfono. |

### useWorkspaceLayout

```ts
export function useWorkspaceLayout();
```

- @returns Breakpoints compartidos; nunca fija ni bloquea la orientación del dispositivo.

## src/navigation/RoleTabs.tsx

Destino de la barra móvil. El nombre coincide con un archivo de ruta del grupo.

[Abrir fuente](../src/navigation/RoleTabs.tsx)

| Exportación | Responsabilidad                                                                 |
| ----------- | ------------------------------------------------------------------------------- |
| TabItem     | Destino de la barra móvil. El nombre coincide con un archivo de ruta del grupo. |
| RoleTabs    | Destinos táctiles en teléfono; escritorio usa la barra lateral del mismo rol.   |

### RoleTabs

```ts
export function RoleTabs({ items }: { items: TabItem[] });
```

- @param props Rutas visibles dentro del grupo protegido.
- @returns Tabs de Expo Router con íconos vectoriales y sin cabecera duplicada.

## src/navigation/RootNavigation.tsx

Mantiene el stack montado mientras restaura sesión y aplica guardas por ruta.

[Abrir fuente](../src/navigation/RootNavigation.tsx)

| Exportación    | Responsabilidad                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| RootNavigation | Mantiene el stack montado mientras restaura sesión y aplica guardas por ruta. |

### RootNavigation

```ts
export function RootNavigation();
```

- @returns Vista de RootNavigation con el contrato de propiedades declarado.

## src/screens/BootstrapScreen.tsx

Pantalla de arranque: compone el estado de conectividad mientras se prepara la navegación.

[Abrir fuente](../src/screens/BootstrapScreen.tsx)

| Exportación     | Responsabilidad                                                                            |
| --------------- | ------------------------------------------------------------------------------------------ |
| BootstrapScreen | Pantalla de arranque: compone el estado de conectividad mientras se prepara la navegación. |

### BootstrapScreen

```ts
export function BootstrapScreen();
```

- @returns Vista de BootstrapScreen con el contrato de propiedades declarado.

## src/screens/admin/AttendanceScreen.tsx

Ficha la llegada observada hoy y consulta el registro de días anteriores.

[Abrir fuente](../src/screens/admin/AttendanceScreen.tsx)

| Exportación      | Responsabilidad                                                           |
| ---------------- | ------------------------------------------------------------------------- |
| AttendanceScreen | Ficha la llegada observada hoy y consulta el registro de días anteriores. |

### AttendanceScreen

```ts
export function AttendanceScreen();
```

- @returns Pantalla de asistencia del equipo.

## src/screens/admin/DashboardScreen.tsx

Compone el tablero sin consultas, navegación ni cálculos contables dentro del JSX.

[Abrir fuente](../src/screens/admin/DashboardScreen.tsx)

| Exportación     | Responsabilidad                                                                    |
| --------------- | ---------------------------------------------------------------------------------- |
| DashboardScreen | Compone el tablero sin consultas, navegación ni cálculos contables dentro del JSX. |

### DashboardScreen

```ts
export function DashboardScreen();
```

- @returns Resumen diario, solicitudes globales y actividad de la semana actual.

## src/screens/admin/ReportsScreen.tsx

Reportes administrativos por día, semana o mes.

[Abrir fuente](../src/screens/admin/ReportsScreen.tsx)

| Exportación   | Responsabilidad                                 |
| ------------- | ----------------------------------------------- |
| ReportsScreen | Reportes administrativos por día, semana o mes. |

### ReportsScreen

```ts
export function ReportsScreen();
```

- @returns Vista de ReportsScreen con el contrato de propiedades declarado.

## src/screens/admin/SettingsScreen.tsx

Horarios, capacidad, ventana de cancelación y categorías del negocio.

[Abrir fuente](../src/screens/admin/SettingsScreen.tsx)

| Exportación    | Responsabilidad                                                       |
| -------------- | --------------------------------------------------------------------- |
| SettingsScreen | Horarios, capacidad, ventana de cancelación y categorías del negocio. |

### SettingsScreen

```ts
export function SettingsScreen();
```

- @returns Vista de SettingsScreen con el contrato de propiedades declarado.

## src/screens/admin/UsersScreen.tsx

ABML de clientes y empleados; los roles se eligen únicamente al crear.

[Abrir fuente](../src/screens/admin/UsersScreen.tsx)

| Exportación | Responsabilidad                                                        |
| ----------- | ---------------------------------------------------------------------- |
| UsersScreen | ABML de clientes y empleados; los roles se eligen únicamente al crear. |

### UsersScreen

```ts
export function UsersScreen();
```

- @returns Vista de UsersScreen con el contrato de propiedades declarado.

## src/screens/admin/WalkInScreen.tsx

Registro rápido para autos presentes, sin alta previa en cuentas ni garaje.

[Abrir fuente](../src/screens/admin/WalkInScreen.tsx)

| Exportación  | Responsabilidad                                                             |
| ------------ | --------------------------------------------------------------------------- |
| WalkInScreen | Registro rápido para autos presentes, sin alta previa en cuentas ni garaje. |

### WalkInScreen

```ts
export function WalkInScreen();
```

- @returns Formulario administrativo y confirmación persistida.

## src/screens/auth/ForgotPasswordScreen.tsx

Recuperación guiada; informa explícitamente el destino Sandbox de esta demostración.

[Abrir fuente](../src/screens/auth/ForgotPasswordScreen.tsx)

| Exportación          | Responsabilidad                                                                      |
| -------------------- | ------------------------------------------------------------------------------------ |
| ForgotPasswordScreen | Recuperación guiada; informa explícitamente el destino Sandbox de esta demostración. |

### ForgotPasswordScreen

```ts
export function ForgotPasswordScreen();
```

- @returns Formulario público y confirmación genérica.

## src/screens/auth/ResetPasswordScreen.tsx

El token se consume solo al confirmar la nueva contraseña; abrir el correo no lo consume.

[Abrir fuente](../src/screens/auth/ResetPasswordScreen.tsx)

| Exportación         | Responsabilidad                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------- |
| ResetPasswordScreen | El token se consume solo al confirmar la nueva contraseña; abrir el correo no lo consume. |

### ResetPasswordScreen

```ts
export function ResetPasswordScreen();
```

- @returns Formulario de restablecimiento o instrucción de solicitar un enlace válido.

## src/screens/auth/SignInScreen.tsx

Acceso común a los tres roles; el servidor determina la experiencia después de autenticar.

[Abrir fuente](../src/screens/auth/SignInScreen.tsx)

| Exportación  | Responsabilidad                                                                            |
| ------------ | ------------------------------------------------------------------------------------------ |
| SignInScreen | Acceso común a los tres roles; el servidor determina la experiencia después de autenticar. |

### SignInScreen

```ts
export function SignInScreen();
```

- @returns Presentación y formularios adaptados a móvil/escritorio, con errores visibles.

## src/screens/auth/SignUpScreen.tsx

Registro de clientes con validación por campo.

[Abrir fuente](../src/screens/auth/SignUpScreen.tsx)

| Exportación  | Responsabilidad                                |
| ------------ | ---------------------------------------------- |
| SignUpScreen | Registro de clientes con validación por campo. |

### SignUpScreen

```ts
export function SignUpScreen();
```

- @returns Vista de SignUpScreen con el contrato de propiedades declarado.

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

### AppointmentDetailScreen

```ts
export function AppointmentDetailScreen();
```

- @returns Vista de AppointmentDetailScreen con el contrato de propiedades declarado.

## src/screens/client/AppointmentsScreen.tsx

Lista de turnos con filtros, estados y navegación a detalles.

[Abrir fuente](../src/screens/client/AppointmentsScreen.tsx)

| Exportación        | Responsabilidad                                               |
| ------------------ | ------------------------------------------------------------- |
| AppointmentsScreen | Lista de turnos con filtros, estados y navegación a detalles. |

### AppointmentsScreen

```ts
export function AppointmentsScreen({
  mode = 'client',
  history = false,
}: {
  mode?: 'client' | 'employee' | 'admin';
  history?: boolean;
});
```

- @param props - Propiedades tipadas: mode, history.
- @returns Vista de AppointmentsScreen con el contrato de propiedades declarado.

## src/screens/client/BookingScreen.tsx

Reserva por pasos, con servicios separados y total siempre verificable.

[Abrir fuente](../src/screens/client/BookingScreen.tsx)

| Exportación   | Responsabilidad                                                         |
| ------------- | ----------------------------------------------------------------------- |
| BookingScreen | Reserva por pasos, con servicios separados y total siempre verificable. |

### BookingScreen

```ts
export function BookingScreen();
```

- @returns Formulario adaptable que solicita el vehículo particular después de reservar.

## src/screens/client/HomeScreen.tsx

Composición del cliente. useHome conserva la obtención y selección de visitas.

[Abrir fuente](../src/screens/client/HomeScreen.tsx)

| Exportación | Responsabilidad                                                                |
| ----------- | ------------------------------------------------------------------------------ |
| HomeScreen  | Composición del cliente. useHome conserva la obtención y selección de visitas. |

### HomeScreen

```ts
export function HomeScreen();
```

- @returns Inicio personalizado, reserva principal y seguimiento de visitas reales.

## src/screens/client/ProfileScreen.tsx

Perfil compartido por los tres roles, contraseña local y salida confirmada desde la cabecera.

[Abrir fuente](../src/screens/client/ProfileScreen.tsx)

| Exportación   | Responsabilidad                                                                               |
| ------------- | --------------------------------------------------------------------------------------------- |
| ProfileScreen | Perfil compartido por los tres roles, contraseña local y salida confirmada desde la cabecera. |

### ProfileScreen

```ts
export function ProfileScreen();
```

- @returns Vista de ProfileScreen con el contrato de propiedades declarado.

## src/screens/client/ServicesScreen.tsx

Catálogo del cliente y ABML administrativo reutilizando componentes.

[Abrir fuente](../src/screens/client/ServicesScreen.tsx)

| Exportación    | Responsabilidad                                                      |
| -------------- | -------------------------------------------------------------------- |
| ServicesScreen | Catálogo del cliente y ABML administrativo reutilizando componentes. |

### ServicesScreen

```ts
export function ServicesScreen({ admin = false }: { admin?: boolean });
```

- @param props - Propiedades tipadas: admin.
- @returns Vista de ServicesScreen con el contrato de propiedades declarado.

## src/screens/client/SupportScreen.tsx

Los clientes envían reclamos y Administración revisa y responde desde su bandeja.

[Abrir fuente](../src/screens/client/SupportScreen.tsx)

| Exportación   | Responsabilidad                                                                   |
| ------------- | --------------------------------------------------------------------------------- |
| SupportScreen | Los clientes envían reclamos y Administración revisa y responde desde su bandeja. |

### SupportScreen

```ts
export function SupportScreen({ admin = false }: { admin?: boolean });
```

- @param props - admin habilita los controles del panel administrativo.
- @returns Pantalla de atención para el rol actual.

## src/screens/client/VehiclesScreen.tsx

Vehículos propios o administración de titulares, con ABML y búsqueda.

[Abrir fuente](../src/screens/client/VehiclesScreen.tsx)

| Exportación    | Responsabilidad                                                       |
| -------------- | --------------------------------------------------------------------- |
| VehiclesScreen | Vehículos propios o administración de titulares, con ABML y búsqueda. |

### VehiclesScreen

```ts
export function VehiclesScreen();
```

- @returns Vista de VehiclesScreen con el contrato de propiedades declarado.

## src/screens/employee/EmployeeAgendaScreen.tsx

Experiencia del equipo separada de la pantalla de clientes y de administración.

[Abrir fuente](../src/screens/employee/EmployeeAgendaScreen.tsx)

| Exportación          | Responsabilidad                                                                 |
| -------------------- | ------------------------------------------------------------------------------- |
| EmployeeAgendaScreen | Experiencia del equipo separada de la pantalla de clientes y de administración. |

### EmployeeAgendaScreen

```ts
export function EmployeeAgendaScreen({ history = false }: { history?: boolean });
```

- @param props Abre historial o jornada; nunca modifica los permisos del recurso.
- @returns Agenda con resumen real por fecha y ayuda contextual.

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

## src/theme/timeWheel.styles.ts

El navegador usa snap CSS; iOS/Android usan snapToInterval en el mismo control.

[Abrir fuente](../src/theme/timeWheel.styles.ts)

| Exportación     | Responsabilidad                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| timeWheelStyles | El navegador usa snap CSS; iOS/Android usan snapToInterval en el mismo control. |

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

## src/types/cancellation.ts

Aviso de cancelación del equipo, pendiente de lectura por el titular.

[Abrir fuente](../src/types/cancellation.ts)

| Exportación        | Responsabilidad                                                       |
| ------------------ | --------------------------------------------------------------------- |
| CancellationNotice | Aviso de cancelación del equipo, pendiente de lectura por el titular. |

## src/types/entities.ts

Roles enviados y verificados por la API, sin código importado desde el backend.

[Abrir fuente](../src/types/entities.ts)

| Exportación       | Responsabilidad                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| Role              | Roles enviados y verificados por la API, sin código importado desde el backend.                       |
| User              | Perfil público y permisos vigentes.                                                                   |
| Session           | Sesión propia del backend: access/perfil en memoria; solo refresh y metadatos se conservan al cerrar. |
| Page              | Paginación REST.                                                                                      |
| Vehicle           | Vehículo registrado.                                                                                  |
| VehicleType       | Categoría de tarifas.                                                                                 |
| Service           | Servicio y precios por tipo de vehículo, siempre en centavos ARS.                                     |
| AppointmentStatus | Estados reales de una reserva.                                                                        |
| Appointment       | Proyección de una reserva según el rol. Importes pueden faltar para empleados sin cobros.             |
| Availability      | Cotización y opciones calculadas en backend.                                                          |
| Settings          | Configuración de operación.                                                                           |
| Payment           | Cobro asociado.                                                                                       |
| Report            | Reporte administrativo.                                                                               |

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

## src/types/operations.ts

Parte del responsable; los datos de revisión interna solo llegan al equipo.

[Abrir fuente](../src/types/operations.ts)

| Exportación     | Responsabilidad                                                             |
| --------------- | --------------------------------------------------------------------------- |
| WashSubmission  | Parte del responsable; los datos de revisión interna solo llegan al equipo. |
| CustomerMessage | Reclamo o devolución, con respuesta administrativa cuando se resuelve.      |
| Attendance      | Fichaje de llegada observado y guardado por Administración.                 |
| Arrival         | Fila del plantel de hoy o un fichaje histórico.                             |

## src/types/storedCredential.ts

Persistencia sin perfil ni permisos: el backend valida identidad y rol al reabrir.

[Abrir fuente](../src/types/storedCredential.ts)

| Exportación       | Responsabilidad                                                                    |
| ----------------- | ---------------------------------------------------------------------------------- |
| StoredCredential  | Persistencia sin perfil ni permisos: el backend valida identidad y rol al reabrir. |
| CredentialStorage | Interfaz mínima para probar almacenamiento web sin depender del navegador.         |

## src/utils/agendaPresets.ts

Genera filtros consistentes al abrir una agenda.

[Abrir fuente](../src/utils/agendaPresets.ts)

| Exportación          | Responsabilidad                                                       |
| -------------------- | --------------------------------------------------------------------- |
| initialAgendaFilters | Genera filtros consistentes al abrir una agenda.                      |
| agendaPreset         | Cada bandeja descarta filtros incompatibles de una consulta anterior. |

### initialAgendaFilters

```ts
export function initialAgendaFilters(mode: string, history: boolean);
```

- @param mode Rol de la pantalla.
- @param history Si se muestran trabajos anteriores.
- @returns Filtros iniciales; no modifican los permisos del servidor.

### agendaPreset

```ts
export function agendaPreset(preset: string);
```

- @param preset Identificador del acceso rápido.
- @returns Fecha, estado y cola combinables con el historial del rol.

## src/utils/appointmentListTitle.ts

Título de la colección según rol e historial, sin reglas de acceso dentro del JSX.

[Abrir fuente](../src/utils/appointmentListTitle.ts)

| Exportación          | Responsabilidad                                                                    |
| -------------------- | ---------------------------------------------------------------------------------- |
| appointmentListTitle | Título de la colección según rol e historial, sin reglas de acceso dentro del JSX. |

### appointmentListTitle

```ts
export function appointmentListTitle(mode: 'client' | 'employee' | 'admin', history: boolean);
```

- @param mode - Experiencia o preferencia seleccionada dentro de su unión de tipos.
- @param history - Selecciona trabajos anteriores en lugar de próximas visitas.
- @returns `"Historial de trabajos" | "Mi agenda" | "Turnos" | "Mis turnos"`.

## src/utils/bookingAvailability.ts

Explica por qué una fecha no puede ofrecer turnos antes de consultar un horario.

[Abrir fuente](../src/utils/bookingAvailability.ts)

| Exportación        | Responsabilidad                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| bookingDateMessage | Explica por qué una fecha no puede ofrecer turnos antes de consultar un horario.                |
| canBook            | Solo permite confirmar un horario de la cotización vigente y todavía futuro.                    |
| emptyAvailability  | Mensaje específico para un día sin horarios; mantiene compatibilidad con servidores anteriores. |

### bookingDateMessage

```ts
export function bookingDateMessage(date: string, settings: Settings | null);
```

- @param date Día elegido, sin hora.
- @param settings Horarios públicos del negocio, si ya cargaron.
- @returns Orientación breve para la selección de fecha.

### canBook

```ts
export function canBook(
  quote: Availability | null,
  slot: string,
  loading: boolean,
  error: string,
);
```

- @param quote Cotización del filtro actual; null durante carga o error.
- @param slot Inicio seleccionado, expresado en UTC.
- @param loading Indica que aún se está verificando disponibilidad.
- @param error Error de la última verificación.
- @returns true cuando es seguro enviar la intención; el servidor vuelve a comprobarla.

### emptyAvailability

```ts
export function emptyAvailability(reason: Availability['unavailableReason']);
```

- @param reason Motivo calculado por el servidor.
- @returns Instrucción para elegir otra fecha o servicio.

## src/utils/bookingDraft.ts

Selección local: mover la rueda no confirma ni crea una reserva.

[Abrir fuente](../src/utils/bookingDraft.ts)

| Exportación        | Responsabilidad                                                                  |
| ------------------ | -------------------------------------------------------------------------------- |
| BookingDraft       | Selección local: mover la rueda no confirma ni crea una reserva.                 |
| BookingDraftAction | Cambios del formulario y guardado explícito de una hora en el resumen.           |
| initialBooking     | Empieza sin fecha, hora elegida ni hora guardada.                                |
| bookingDraft       | Separa la intención del selector de la hora que el cliente guardó para reservar. |

### initialBooking

```ts
export function initialBooking(clientId: string): BookingDraft;
```

- @param clientId Titular inicial de la reserva.
- @returns Borrador vacío; no contiene datos de un vehículo particular.

### bookingDraft

```ts
export function bookingDraft(state: BookingDraft, action: BookingDraftAction): BookingDraft;
```

- @param state Borrador vigente.
- @param action Cambio del formulario, guardado o rechazo de una reserva enviada.
- @returns Estado nuevo; descarta acciones tardías que afectarían otra selección.

## src/utils/bookingSelection.ts

Separa los adicionales del único lavado base elegible.

[Abrir fuente](../src/utils/bookingSelection.ts)

| Exportación    | Responsabilidad                                                                            |
| -------------- | ------------------------------------------------------------------------------------------ |
| isWashExtra    | Separa los adicionales del único lavado base elegible.                                     |
| bookingOptions | Deriva opciones cotizables para la categoría, aunque el titular todavía no tenga vehículo. |

### isWashExtra

```ts
export function isWashExtra(service: Service);
```

- @param service Servicio del catálogo.
- @returns Si se puede combinar como extra.

### bookingOptions

```ts
export function bookingOptions(
  selection: { clientId: string; vehicleTypeId: string; serviceIds: string; date: string },
  types: VehicleType[],
  services: Service[],
);
```

- @param selection Titular, tipo, servicios y fecha elegidos.
- @param types Tipos autorizados.
- @param services Catálogo actual con tarifas por categoría.
- @returns Lavados base, extras y estado de cotización.

## src/utils/buildFormSchema.ts

Genera validación por campo sobre valores de texto del formulario móvil.

[Abrir fuente](../src/utils/buildFormSchema.ts)

| Exportación     | Responsabilidad                                                          |
| --------------- | ------------------------------------------------------------------------ |
| buildFormSchema | Genera validación por campo sobre valores de texto del formulario móvil. |

### buildFormSchema

```ts
export function buildFormSchema(fields: FormFieldDefinition[]);
```

- @param fields - Definiciones de campos con etiquetas, tipos y restricciones.
- @returns `z.ZodObject<{ [x: string]: z.ZodString; }, z.core.$strip>`.

## src/utils/buttonColors.ts

Resuelve contraste y superficie de variantes sin repetir colores en los botones.

[Abrir fuente](../src/utils/buttonColors.ts)

| Exportación  | Responsabilidad                                                                  |
| ------------ | -------------------------------------------------------------------------------- |
| buttonColors | Resuelve contraste y superficie de variantes sin repetir colores en los botones. |

### buttonColors

```ts
export function buttonColors(
  variant: 'primary' | 'secondary' | 'danger' | 'quiet',
  colors: Palette,
);
```

- @param variant - Variante visual semántica que determina contraste y superficie.
- @param colors - Paleta semántica resuelta para el tema actual.
- @returns `{ background: string; foreground: string; }`.

## src/utils/calendar.ts

Valida fecha real de calendario sin normalizar 31 de febrero a otro mes.

[Abrir fuente](../src/utils/calendar.ts)

| Exportación   | Responsabilidad                                                                         |
| ------------- | --------------------------------------------------------------------------------------- |
| validDate     | Valida fecha real de calendario sin normalizar 31 de febrero a otro mes.                |
| shiftMonth    | Cambia de mes conservando el día uno para evitar saltos por meses de distinta duración. |
| calendarDays  | Genera seis semanas de lunes a domingo; las celdas ajenas al mes quedan vacías.         |
| calendarLabel | Presenta una fecha sin que la zona del dispositivo la cambie al día anterior.           |

### validDate

```ts
export function validDate(value: string);
```

- @param value Fecha ISO sin hora.
- @returns true solo para días existentes en el calendario gregoriano.

### shiftMonth

```ts
export function shiftMonth(month: string, delta: number);
```

- @param month Mes ISO AAAA-MM.
- @param delta Número de meses, positivo o negativo.
- @returns Nuevo mes ISO.

### calendarDays

```ts
export function calendarDays(month: string);
```

- @param month Mes ISO AAAA-MM.
- @returns 42 celdas, cada día con su fecha completa para selección accesible.

### calendarLabel

```ts
export function calendarLabel(value: string);
```

- @param value Fecha ISO válida.
- @returns Nombre completo del día en español.

## src/utils/catalogFields.ts

Opciones de tarifa para los tipos registrados; la API valida su vigencia.

[Abrir fuente](../src/utils/catalogFields.ts)

| Exportación       | Responsabilidad                                                           |
| ----------------- | ------------------------------------------------------------------------- |
| priceFields       | Opciones de tarifa para los tipos registrados; la API valida su vigencia. |
| vehicleTypeFields | Edición de categorías preservando sus referencias históricas.             |

### priceFields

```ts
export function priceFields(types: VehicleType[]): FormFieldDefinition[];
```

- @param types - Categorías de vehículo que determinan las tarifas disponibles.
- @returns `FormFieldDefinition[]`.

## src/utils/credentialCodec.ts

Treinta días, igual que expires_at de sesiones_renovacion; el servidor puede revocar antes.

[Abrir fuente](../src/utils/credentialCodec.ts)

| Exportación        | Responsabilidad                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------- |
| credentialLifetime | Treinta días, igual que expires_at de sesiones_renovacion; el servidor puede revocar antes. |
| decodeCredential   | Valida persistencia propia o un token legado sin aceptar permisos desde disco.              |
| encodeCredential   | Serializa solo refresh, titular y vencimiento; nunca access JWT, rol o contraseña.          |

### decodeCredential

```ts
export function decodeCredential(
  value: string | null,
  now = Date.now(),
): StoredCredential | null;
```

- @param value Contenido local potencialmente alterado o ausente.
- @param now Reloj en milisegundos para comprobar vencimiento.
- @returns Credencial vigente o null ante cierre, corrupción o expiración.

### encodeCredential

```ts
export function encodeCredential(refreshToken: string, userId: string, now = Date.now());
```

- @param refreshToken Credencial opaca emitida por la API.
- @param userId Titular confirmado por el servidor.
- @param now Inicio de persistencia en milisegundos.
- @returns Sobre versionado válido localmente durante treinta días desde la rotación.

## src/utils/decorativeSvgProps.ts

Oculta los íconos decorativos sin enviar atributos nativos booleanos al DOM web.

[Abrir fuente](../src/utils/decorativeSvgProps.ts)

| Exportación        | Responsabilidad                                                                  |
| ------------------ | -------------------------------------------------------------------------------- |
| decorativeSvgProps | Oculta los íconos decorativos sin enviar atributos nativos booleanos al DOM web. |

### decorativeSvgProps

```ts
export function decorativeSvgProps(): SvgProps;
```

- @returns Atributos accesibles del SVG para la plataforma actual.

## src/utils/editorCommands.ts

Construye el guardado; solo cierra el formulario cuando el servidor lo confirma.

[Abrir fuente](../src/utils/editorCommands.ts)

| Exportación         | Responsabilidad                                                                        |
| ------------------- | -------------------------------------------------------------------------------------- |
| createSaveCommand   | Construye el guardado; solo cierra el formulario cuando el servidor lo confirma.       |
| createDeleteCommand | Construye la baja confirmada y refresca la colección sin ocultar errores del servidor. |

### createSaveCommand

```ts
export function createSaveCommand<T extends { id: string }>(o: EditorOptions<T>);
```

- @param o - Opciones de composición del recurso.
- @returns `(values: Record<string, string>) => Promise<void>`.

### createDeleteCommand

```ts
export function createDeleteCommand<T extends { id: string }>(o: EditorOptions<T>);
```

- @param o - Opciones de composición del recurso.
- @returns `() => Promise<void>`.

## src/utils/errorMessage.ts

Traduce fallas de red y errores REST a mensajes presentables.

[Abrir fuente](../src/utils/errorMessage.ts)

| Exportación  | Responsabilidad                                               |
| ------------ | ------------------------------------------------------------- |
| errorMessage | Traduce fallas de red y errores REST a mensajes presentables. |

### errorMessage

```ts
export function errorMessage(error: unknown): string;
```

- @param error - Fallo recibido que se proyecta sin exponer datos internos.
- @returns `string`.

## src/utils/foreground.ts

Indica si se puede actualizar sin actividad en segundo plano.

[Abrir fuente](../src/utils/foreground.ts)

| Exportación         | Responsabilidad                                                           |
| ------------------- | ------------------------------------------------------------------------- |
| isForeground        | Indica si se puede actualizar sin actividad en segundo plano.             |
| subscribeForeground | Escucha la vuelta al primer plano; el llamador controla la ruta enfocada. |

### isForeground

```ts
export function isForeground();
```

- @returns true únicamente mientras la aplicación está activa.

### subscribeForeground

```ts
export function subscribeForeground(refresh: () => void);
```

- @param refresh Callback de actualización, sin navegación ni cambios de formulario.
- @returns Función que elimina la suscripción nativa.

## src/utils/foreground.web.ts

Respeta pestañas ocultas; no mantiene despierto el servidor en segundo plano.

[Abrir fuente](../src/utils/foreground.web.ts)

| Exportación         | Responsabilidad                                                               |
| ------------------- | ----------------------------------------------------------------------------- |
| isForeground        | Respeta pestañas ocultas; no mantiene despierto el servidor en segundo plano. |
| subscribeForeground | Atiende el regreso a la pestaña o ventana sin depender del cambio de ruta.    |

### isForeground

```ts
export function isForeground();
```

- @returns true si el documento actual es visible.

### subscribeForeground

```ts
export function subscribeForeground(refresh: () => void);
```

- @param refresh Callback protegido frente a eventos repetidos.
- @returns Limpieza de ambos listeners al abandonar la pantalla.

## src/utils/format.ts

Presenta centavos como pesos argentinos sin alterar el valor persistido.

[Abrir fuente](../src/utils/format.ts)

| Exportación     | Responsabilidad                                                          |
| --------------- | ------------------------------------------------------------------------ |
| money           | Presenta centavos como pesos argentinos sin alterar el valor persistido. |
| appointmentDate | Fecha legible en la zona horaria operativa confirmada.                   |
| today           | Día ISO local de Argentina para filtros de jornada.                      |
| slotTime        | Hora local de una opción UTC, enviada por el servidor.                   |

### money

```ts
export function money(cents: number | undefined);
```

- @param cents - Importe entero en centavos ARS.
- @returns `string`.

### appointmentDate

```ts
export function appointmentDate(value: string);
```

- @param value - Instante ISO UTC de la API que se presenta en la zona del negocio.
- @returns Fecha y hora legibles para el usuario; no se reutiliza para guardar otro instante.

### today

```ts
export function today();
```

- @returns `string`.

### slotTime

```ts
export function slotTime(value: string);
```

- @param value - Inicio ISO UTC de una opción de disponibilidad.
- @returns Hora y minutos locales para mostrar en la rueda de horarios.

## src/utils/makeCatalogCode.ts

Código técnico estable para el catálogo; solo se genera durante el alta.

[Abrir fuente](../src/utils/makeCatalogCode.ts)

| Exportación     | Responsabilidad                                                          |
| --------------- | ------------------------------------------------------------------------ |
| makeCatalogCode | Código técnico estable para el catálogo; solo se genera durante el alta. |

### makeCatalogCode

```ts
export function makeCatalogCode(name: string, maxLength = 24);
```

- @param name - Nombre del campo o etiqueta según el contrato declarado.
- @param maxLength - Longitud máxima permitida para el texto del campo.
- @returns `string`.

## src/utils/navigationOptions.ts

Apariencia común del stack; las pantallas no redefinen colores de navegación.

[Abrir fuente](../src/utils/navigationOptions.ts)

| Exportación  | Responsabilidad                                                                     |
| ------------ | ----------------------------------------------------------------------------------- |
| stackOptions | Apariencia común del stack; las pantallas no redefinen colores de navegación.       |
| tabOptions   | Barra inferior con áreas táctiles y etiquetas consistentes para Cliente y Empleado. |

### stackOptions

```ts
export function stackOptions(colors: Palette);
```

- @param colors - Paleta semántica resuelta para el tema actual.
- @returns `{ headerStyle: { backgroundColor: string; }; headerTintColor: string; contentStyle: { backgroundColor: string; }; }`.

### tabOptions

```ts
export function tabOptions(colors: Palette);
```

- @param colors - Paleta semántica resuelta para el tema actual.
- @returns Objeto con headerStyle, headerTintColor, tabBarActiveTintColor, tabBarInactiveTintColor, tabBarStyle, tabBarLabelStyle.

## src/utils/parseApiUrl.ts

Valida HTTPS; admite loopback HTTP únicamente cuando el modo de desarrollo lo pide.

[Abrir fuente](../src/utils/parseApiUrl.ts)

| Exportación | Responsabilidad                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| parseApiUrl | Valida HTTPS; admite loopback HTTP únicamente cuando el modo de desarrollo lo pide. |

### parseApiUrl

```ts
export function parseApiUrl(value: string | undefined, allowLocal = false): string | null;
```

- @param value - Origen API configurado públicamente; no admite credenciales, rutas, query ni fragmento.
- @param allowLocal - Solo desarrollo: conexión del navegador al backend de esta computadora.
- @returns Origen normalizado permitido o NULL; HTTP loopback solo se acepta con allowLocal explícito.

## src/utils/pendingOAuth.ts

Solo almacena PKCE temporal de la pestaña; nunca secretos de proveedores.

[Abrir fuente](../src/utils/pendingOAuth.ts)

| Exportación      | Responsabilidad                                                               |
| ---------------- | ----------------------------------------------------------------------------- |
| pendingOAuthKey  | Solo almacena PKCE temporal de la pestaña; nunca secretos de proveedores.     |
| readPendingOAuth | Verifica state, forma y vencimiento antes de permitir canjear un retorno web. |

### readPendingOAuth

```ts
export function readPendingOAuth(raw: string | null, state: unknown, now = Date.now());
```

- @param raw Solicitud temporal serializada por esta pestaña.
- @param state State recibido en el callback.
- @param now Reloj en milisegundos; permite verificar límites de vencimiento.
- @returns Solicitud validada con state, verifier y createdAt. @throws Error si el retorno no corresponde a la solicitud.

## src/utils/pesosToCents.ts

Convierte un importe validado en pesos a centavos, sin multiplicación decimal inexacta.

[Abrir fuente](../src/utils/pesosToCents.ts)

| Exportación  | Responsabilidad                                                                         |
| ------------ | --------------------------------------------------------------------------------------- |
| pesosToCents | Convierte un importe validado en pesos a centavos, sin multiplicación decimal inexacta. |

### pesosToCents

```ts
export function pesosToCents(value: string);
```

- @param value - Importe decimal en pesos, validado antes de invocar esta conversión.
- @returns Centavos enteros ARS; conserva dos decimales sin usar multiplicación monetaria de punto flotante.

## src/utils/profileDestination.ts

Selecciona la ruta protegida del perfil de la sesión actual.

[Abrir fuente](../src/utils/profileDestination.ts)

| Exportación        | Responsabilidad                                              |
| ------------------ | ------------------------------------------------------------ |
| profileDestination | Selecciona la ruta protegida del perfil de la sesión actual. |

### profileDestination

```ts
export function profileDestination(role: Role);
```

- @param role Rol verificado por el backend al iniciar o restaurar la sesión.
- @returns Ruta explícita que evita ambigüedad entre grupos con el mismo nombre.

## src/utils/queryLifecycle.ts

Una consulta silenciosa no desmonta listas ni editores del mismo filtro.

[Abrir fuente](../src/utils/queryLifecycle.ts)

| Exportación  | Responsabilidad                                                               |
| ------------ | ----------------------------------------------------------------------------- |
| pendingQuery | Una consulta silenciosa no desmonta listas ni editores del mismo filtro.      |
| failedQuery  | Conserva un formulario visible ante un fallo transitorio, mostrando el error. |

### pendingQuery

```ts
export function pendingQuery<T>(
  previous: QueryState<T>,
  key: string,
  quiet: boolean,
): QueryState<T>;
```

- @param previous Estado que sigue perteneciendo al consumidor.
- @param key Identidad de la consulta actual.
- @param quiet Si la carga ocurre automáticamente en segundo plano.
- @returns Estado de carga con los datos válidos conservados.

### failedQuery

```ts
export function failedQuery<T>(
  previous: QueryState<T>,
  key: string,
  quiet: boolean,
  error: string,
): QueryState<T>;
```

- @param previous Estado del mismo recurso; nunca permite datos de otro filtro.
- @param key Identidad de la consulta fallida.
- @param quiet Indica recarga automática.
- @param error Mensaje público y sin datos sensibles.
- @returns Error visible junto con los últimos datos del filtro vigente.

## src/utils/queryRequest.ts

Construye una consulta con generaciones; solo conserva datos del mismo filtro en recarga silenciosa.

[Abrir fuente](../src/utils/queryRequest.ts)

| Exportación        | Responsabilidad                                                                                      |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| createQueryRequest | Construye una consulta con generaciones; solo conserva datos del mismo filtro en recarga silenciosa. |

### createQueryRequest

```ts
export function createQueryRequest<T>({
  key,
  enabled,
  load,
  sequence,
  publish,
}: {
  key: string;
  enabled: boolean;
  load: () => Promise<T>;
  sequence: { current: number };
  publish: Dispatch<SetStateAction<QueryState<T>>>;
});
```

- @param options Recurso, cargador, secuencia de montaje y publicación de estado.
- @returns Operación que captura fallos y descarta resultados de peticiones anteriores.

## src/utils/queryState.ts

Una respuesta siempre conserva la identidad de los filtros que la produjeron.

[Abrir fuente](../src/utils/queryState.ts)

| Exportación  | Responsabilidad                                                                        |
| ------------ | -------------------------------------------------------------------------------------- |
| QueryState   | Una respuesta siempre conserva la identidad de los filtros que la produjeron.          |
| currentQuery | Oculta datos obsoletos inmediatamente, incluso antes de ejecutarse el efecto de React. |
| readLatest   | Publica únicamente la última petición de un consumidor todavía activo.                 |

### currentQuery

```ts
export function currentQuery<T>(state: QueryState<T>, key: string, enabled: boolean);
```

- @param state Último resultado publicado por la consulta.
- @param key Identidad del recurso y sus filtros actuales.
- @param enabled false invalida datos y errores previos.
- @returns Solo el resultado que corresponde a la selección vigente.

### readLatest

```ts
export async function readLatest<T>(
  load: () => Promise<T>,
  active: () => boolean,
  publish: (data: T) => void,
);
```

- @param load Consulta remota que no muta estado local.
- @param active Comprueba la generación actual, también después de errores.
- @param publish Receptor del resultado tipado.
- @returns Promesa que rechaza solo hacia el coordinador de carga.

## src/utils/refreshGate.ts

Diferencia el regreso a la vista del sondeo durante su uso.

[Abrir fuente](../src/utils/refreshGate.ts)

| Exportación       | Responsabilidad                                                              |
| ----------------- | ---------------------------------------------------------------------------- |
| RefreshTrigger    | Diferencia el regreso a la vista del sondeo durante su uso.                  |
| createRefreshGate | Evita recargas solapadas y conserva el regreso a la vista durante un sondeo. |

### createRefreshGate

```ts
export function createRefreshGate(
  refresh: (trigger: RefreshTrigger) => void | Promise<void>,
  enabled: () => boolean,
  now = Date.now,
);
```

- @param refresh Recarga que publica su propio estado de red.
- @param enabled Consulta si sigue visible y libre para actualizar.
- @param now Reloj inyectable para verificar ráfagas de eventos.
- @returns Disparador que serializa la recarga y agrupa señales repetidas por origen.

## src/utils/refreshResources.ts

Recarga consultas relacionadas después de una acción o regreso a la pantalla.

[Abrir fuente](../src/utils/refreshResources.ts)

| Exportación         | Responsabilidad                                                               |
| ------------------- | ----------------------------------------------------------------------------- |
| refreshResources    | Recarga consultas relacionadas después de una acción o regreso a la pantalla. |
| revalidateResources | Consulta cambios sin ocultar los datos actuales ni desmontar formularios.     |

### refreshResources

```ts
export async function refreshResources(...resources: { refresh: () => Promise<void> }[]);
```

- @param resources Recursos que capturan sus propios errores y descartan respuestas tardías.
- @returns Promesa que termina cuando todas las consultas se actualizaron.

### revalidateResources

```ts
export async function revalidateResources(...resources: { revalidate: () => Promise<void> }[]);
```

- @param resources Consultas relacionadas visibles en la pantalla.
- @returns Promesa de la recarga silenciosa del conjunto.

## src/utils/resetLink.ts

Lee un token exclusivamente del fragmento; nunca de la consulta enviada a servidores.

[Abrir fuente](../src/utils/resetLink.ts)

| Exportación    | Responsabilidad                                                                       |
| -------------- | ------------------------------------------------------------------------------------- |
| parseResetLink | Lee un token exclusivamente del fragmento; nunca de la consulta enviada a servidores. |

### parseResetLink

```ts
export function parseResetLink(url: string);
```

- @param url - Enlace HTTPS abierto por la persona.
- @returns Token válido o cadena vacía.

## src/utils/restoreDestination.ts

Limita el retorno de arranque a pantallas internas permitidas para el rol actual.

[Abrir fuente](../src/utils/restoreDestination.ts)

| Exportación        | Responsabilidad                                                                   |
| ------------------ | --------------------------------------------------------------------------------- |
| restoreDestination | Limita el retorno de arranque a pantallas internas permitidas para el rol actual. |

### restoreDestination

```ts
export function restoreDestination(destination: unknown, role: Role);
```

- @param destination Parámetro de la ruta pública de espera, tratado como no confiable.
- @param role Rol confirmado por el backend después de restaurar.
- @returns Destino interno validado o inicio; nunca una URL externa ni ruta de otro rol.

## src/utils/routeAccess.ts

Resuelve guardas con el rol verificado; durante restauración solo deja rutas públicas.

[Abrir fuente](../src/utils/routeAccess.ts)

| Exportación    | Responsabilidad                                                                        |
| -------------- | -------------------------------------------------------------------------------------- |
| hasRouteAccess | Resuelve guardas con el rol verificado; durante restauración solo deja rutas públicas. |

### hasRouteAccess

```ts
export function hasRouteAccess(access: RouteAccess, user: User | null, restoring: boolean);
```

- @param access - Regla de acceso declarada para la ruta.
- @param user - Perfil vigente; nunca incluye una contraseña legible.
- @param restoring - Indica que la sesión todavía se recupera y evita redirecciones prematuras.
- @returns `boolean`.

## src/utils/scrollVisibility.ts

Medidas de la región desplazable; los valores se mantienen fuera del estado visual.

[Abrir fuente](../src/utils/scrollVisibility.ts)

| Exportación          | Responsabilidad                                                                     |
| -------------------- | ----------------------------------------------------------------------------------- |
| ScrollMetrics        | Medidas de la región desplazable; los valores se mantienen fuera del estado visual. |
| shouldOfferScrollTop | Evita ofrecer volver arriba en páginas cortas, al inicio o tras reducir contenido.  |

### shouldOfferScrollTop

```ts
export function shouldOfferScrollTop({ offset, viewport, content }: ScrollMetrics);
```

- @param metrics Desplazamiento y tamaños medidos en la misma región.
- @returns true solo después de recorrer una parte significativa de una página larga.

## src/utils/serialQueue.ts

Serializa acciones sin dejar bloqueada la cola cuando falla una operación.

[Abrir fuente](../src/utils/serialQueue.ts)

| Exportación       | Responsabilidad                                                            |
| ----------------- | -------------------------------------------------------------------------- |
| createSerialQueue | Serializa acciones sin dejar bloqueada la cola cuando falla una operación. |

### createSerialQueue

```ts
export function createSerialQueue();
```

- @returns Ejecutor que conserva el resultado/error de cada acción y continúa con la siguiente.

## src/utils/serviceForm.ts

Serializa campos de servicio; el código permanece estable durante una edición.

[Abrir fuente](../src/utils/serviceForm.ts)

| Exportación          | Responsabilidad                                                                |
| -------------------- | ------------------------------------------------------------------------------ |
| servicePayload       | Serializa campos de servicio; el código permanece estable durante una edición. |
| serviceInitialValues | Valores de edición sin convertir null en texto visible.                        |

### servicePayload

```ts
export function servicePayload(values: Record<string, string>, current: Service | null);
```

- @param values - Valores del formulario o parámetros que se serializan para la operación.
- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @returns `{ code: string; name: string | undefined; description: string | undefined; durationMinutes: number; isActive: boolean; }`.

### serviceInitialValues

```ts
export function serviceInitialValues(current: Service | null);
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @returns `{ name: string; description: string; durationMinutes: string; isActive: string; } | { isActive: string; name?: never; description?: never; durationMinutes?: never; }`.

## src/utils/sessionFailure.ts

Solo un rechazo definitivo de credenciales invalida la sesión local.

[Abrir fuente](../src/utils/sessionFailure.ts)

| Exportación       | Responsabilidad                                                      |
| ----------------- | -------------------------------------------------------------------- |
| isSessionRejected | Solo un rechazo definitivo de credenciales invalida la sesión local. |

### isSessionRejected

```ts
export function isSessionRejected(error: unknown);
```

- @param error Error de una renovación; caídas de red y 5xx son recuperables.
- @returns true para respuestas 401/403, false para fallas transitorias.

## src/utils/sessionRenewal.ts

Dependencias inyectables: permite probar carreras, desconexión y rotación sin ejecutar React.

[Abrir fuente](../src/utils/sessionRenewal.ts)

| Exportación                | Responsabilidad                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| SessionRenewalDependencies | Dependencias inyectables: permite probar carreras, desconexión y rotación sin ejecutar React.      |
| createSessionRenewal       | Comparte renovaciones simultáneas y siempre persiste el sucesor, incluso si una vista se desmontó. |

### createSessionRenewal

```ts
export function createSessionRenewal(deps: SessionRenewalDependencies);
```

- @param deps Almacenamiento, bloqueo y transporte del entorno actual.
- @returns Renovador compartido; conserva credenciales ante red/5xx y borra solo un rechazo definitivo vigente.

## src/utils/settingsForm.ts

Presenta configuración remota como campos de texto sin alterar zona ni moneda.

[Abrir fuente](../src/utils/settingsForm.ts)

| Exportación           | Responsabilidad                                                                |
| --------------------- | ------------------------------------------------------------------------------ |
| settingsInitialValues | Presenta configuración remota como campos de texto sin alterar zona ni moneda. |

### settingsInitialValues

```ts
export function settingsInitialValues(data: Settings | null);
```

- @param data - Datos del recurso que se adaptan al contrato de salida.
- @returns `{ days: string; opensAt: string; closesAt: string; capacity: string; cancellation: string; step: string; } | { days?: never; opensAt?: never; closesAt?: never; capacity?: never; cancellation?: never; step?: never; }`.

## src/utils/startWebOAuth.ts

Prepara PKCE y navega en la misma pestaña, sin secretos de proveedor ni popups.

[Abrir fuente](../src/utils/startWebOAuth.ts)

| Exportación   | Responsabilidad                                                                 |
| ------------- | ------------------------------------------------------------------------------- |
| startWebOAuth | Prepara PKCE y navega en la misma pestaña, sin secretos de proveedor ni popups. |

### startWebOAuth

```ts
export async function startWebOAuth(provider: 'google' | 'discord' | 'github');
```

- @param provider - Proveedor permitido: Google, Discord o GitHub.
- @returns `Promise<void>`.
- @throws Error - Cuando no se cumple una precondición indicada en esta operación.

## src/utils/toggleChoice.ts

Agrega/quita una selección; la representación CSV coincide con filtros del contrato REST.

[Abrir fuente](../src/utils/toggleChoice.ts)

| Exportación  | Responsabilidad                                                                           |
| ------------ | ----------------------------------------------------------------------------------------- |
| toggleChoice | Agrega/quita una selección; la representación CSV coincide con filtros del contrato REST. |

### toggleChoice

```ts
export function toggleChoice(value: string, next: string, multiple: boolean);
```

- @param value - Selección actual serializada como valores separados por coma.
- @param next - Valor de la opción que se acaba de tocar; no es un callback.
- @param multiple - Permite alternar varias opciones; false reemplaza toda la selección.
- @returns Nueva selección CSV, sin opciones duplicadas; puede quedar vacía al desmarcar.

## src/utils/userForm.ts

Ofrece roles solo al crear; ninguna edición permite cambiar el rol.

[Abrir fuente](../src/utils/userForm.ts)

| Exportación       | Responsabilidad                                                        |
| ----------------- | ---------------------------------------------------------------------- |
| userFields        | Ofrece roles solo al crear; ninguna edición permite cambiar el rol.    |
| userInitialValues | Serializa una cuenta a valores de formulario sin exponer credenciales. |

### userFields

```ts
export function userFields(current: User | null): FormFieldDefinition[];
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @returns `FormFieldDefinition[]`.

### userInitialValues

```ts
export function userInitialValues(current: User | null): Record<string, string>;
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @returns `Record<string, string>`.

## src/utils/vehicleForm.ts

Datos propios del vehículo, reutilizados al vincular un turno confirmado.

[Abrir fuente](../src/utils/vehicleForm.ts)

| Exportación           | Responsabilidad                                                                  |
| --------------------- | -------------------------------------------------------------------------------- |
| vehicleIdentityFields | Datos propios del vehículo, reutilizados al vincular un turno confirmado.        |
| vehicleFields         | Construye el formulario sin ofrecer selección de titulares a un cliente.         |
| vehicleInitialValues  | Valores de edición del vehículo; el backend impide cambiar su titular histórico. |
| vehiclePayload        | Serializa únicamente atributos permitidos de un vehículo.                        |

### vehicleFields

```ts
export function vehicleFields(
  types: VehicleType[],
  clients: User[],
  admin: boolean,
): FormFieldDefinition[];
```

- @param types - Categorías de vehículo que determinan las tarifas disponibles.
- @param clients - Clientes autorizados que pueden elegirse como titulares.
- @param admin - Habilita controles de gestión; el servidor conserva la autorización real.
- @returns `FormFieldDefinition[]`.

### vehicleInitialValues

```ts
export function vehicleInitialValues(current: Vehicle | null): Record<string, string>;
```

- @param current - Identidad o entidad actual usada para conservar sus invariantes.
- @returns `Record<string, string>`.

### vehiclePayload

```ts
export function vehiclePayload(v: Record<string, string>);
```

- @param v - Datos tipados del elemento o formulario que se transforma.
- @returns `{ ownerId?: string; plate: string | undefined; brand: string | undefined; model: string | undefined; color: string | undefined; vehicleTypeId: string | undefined; }`.

## src/utils/vehicleTypePricing.ts

Filtra la oferta exclusiva de moto frente a las demás categorías.

[Abrir fuente](../src/utils/vehicleTypePricing.ts)

| Exportación         | Responsabilidad                                                             |
| ------------------- | --------------------------------------------------------------------------- |
| supportsVehicleType | Filtra la oferta exclusiva de moto frente a las demás categorías.           |
| typePriceFields     | Campos de tarifas, con importes existentes precargados para editar el tipo. |
| changedTypePrices   | Serializa solo importes ingresados o modificados.                           |

### supportsVehicleType

```ts
export function supportsVehicleType(code: string | undefined, service: Service);
```

- @param code Código del tipo, si ya se eligió.
- @param service Servicio que se quiere ofrecer.
- @returns Si el servicio corresponde al tipo.

### typePriceFields

```ts
export function typePriceFields(services: Service[], type: VehicleType | null);
```

- @param services Catálogo de servicios disponible para administración.
- @param type Tipo existente o null al crear.
- @returns Campos y valores iniciales del editor.

### changedTypePrices

```ts
export function changedTypePrices(
  values: Record<string, string>,
  initial: Record<string, string>,
);
```

- @param values Entradas del formulario.
- @param initial Valores previos del tipo.
- @returns Tarifas a guardar junto con la categoría.

## scripts/audit-source.mjs

Punto de entrada de Expo: verifica contratos, capas, tamaño y dependencias de src/.

[Abrir fuente](../scripts/audit-source.mjs)

## scripts/document-components.mjs

Lee props reales con el compilador; genera un catálogo sin importar componentes ni ejecutar hooks.

[Abrir fuente](../scripts/document-components.mjs)

## scripts/document-source.mjs

Genera documentación desde AST usando las herramientas comunes del repositorio.

[Abrir fuente](../scripts/document-source.mjs)

## scripts/secure-web.mjs

Herramienta de documentación, verificación o exportación; no forma parte del servidor/app.

[Abrir fuente](../scripts/secure-web.mjs)

## tests/admin-forms.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/admin-forms.test.ts)

## tests/annotation-fields.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/annotation-fields.test.ts)

## tests/booking-draft.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/booking-draft.test.ts)

## tests/parseApiUrl.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/parseApiUrl.test.ts)

## tests/pendingOAuth.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/pendingOAuth.test.ts)

## tests/persistent-session.test.ts

Almacén de prueba independiente de globals/React; cerrar una pestaña descarta solo su mapa legacy.

[Abrir fuente](../tests/persistent-session.test.ts)

## tests/queryRevalidation.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/queryRevalidation.test.ts)

## tests/recovery.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/recovery.test.ts)

## tests/reliability.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/reliability.test.ts)

## tests/session-renewal.test.ts

Sesión de prueba con rol decidido por el servidor simulado, nunca por persistencia local.

[Abrir fuente](../tests/session-renewal.test.ts)

## tests/workspace.test.ts

Escenarios y aserciones que verifican el comportamiento descrito por cada test.

[Abrir fuente](../tests/workspace.test.ts)

## App.tsx

Punto de entrada o configuración del proyecto; consultar su declaración y los comandos de la guía de instalación.

[Abrir fuente](../App.tsx)

| Exportación | Responsabilidad                                                  |
| ----------- | ---------------------------------------------------------------- |
| default     | Contrato de tipos o reexportación; consultar la fuente enlazada. |

## app.config.ts

Define identidad móvil; usa solo variables públicas, nunca secretos OAuth.

[Abrir fuente](../app.config.ts)

| Exportación      | Responsabilidad                                                            |
| ---------------- | -------------------------------------------------------------------------- |
| createExpoConfig | Define identidad móvil; usa solo variables públicas, nunca secretos OAuth. |

### createExpoConfig

```ts
export default function createExpoConfig({ config }: ConfigContext): ExpoConfig;
```

- @param props - Configuración inicial suministrada por Expo.
- @returns Configuración managed de Lavadero para Android, iOS y web.

## eslint.config.ts

Punto de entrada o configuración del proyecto; consultar su declaración y los comandos de la guía de instalación.

[Abrir fuente](../eslint.config.ts)

## index.ts

Punto de entrada o configuración del proyecto; consultar su declaración y los comandos de la guía de instalación.

[Abrir fuente](../index.ts)
