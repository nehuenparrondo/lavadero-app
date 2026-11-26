# Accesos sociales y sesión persistente

Revisión de código del 25 de noviembre de 2026. Google, Discord y GitHub comparten la misma sesión propia de Lavadero que el acceso con correo y contraseña. Se aplica a Cliente, Empleado y Administrador. Una cuenta social nueva se registra como Cliente; el navegador no elige ni concede permisos.

## Configuración y recorrido

`backend/src/config/oauth.ts` contiene los endpoints oficiales, scopes mínimos y disponibilidad. Cada proveedor exige su pareja `*_CLIENT_ID` / `*_CLIENT_SECRET` y `PUBLIC_API_URL` en el backend. `/api/v1/auth/providers` publica únicamente nombre y disponibilidad. `enabled=true` significa que hay configuración; la prueba real del proveedor se registra por separado.

Los callbacks conservan `/api/v1/auth/oauth/{google|discord|github}/callback`. Los retornos finales deben coincidir exactamente con `OAUTH_REDIRECT_URIS`. Google pide `openid email profile`, Discord `identify email` y GitHub `read:user user:email`. No se pide acceso a repositorios, servidores, mensajes ni contactos. Los secretos permanecen en Render y nunca usan prefijo `EXPO_PUBLIC_`.

La web solicita el inicio por JSON, persiste temporalmente state/verifier en **sessionStorage de esa pestaña** y abre el proveedor. El backend consume su state una vez, intercambia el código con PKCE S256, comprueba correo verificado y entrega un grant efímero. La app canjea ese grant con su verifier. Si el correo corresponde a una cuenta con contraseña local, debe confirmarla antes de vincular identidades. Cinco intentos fallidos bloquean el grant. Los JWT y refresh propios no se incluyen en las URLs de retorno.

Google y GitHub reciben `prompt=select_account`; Discord recibe `prompt=consent` y ofrece cambio de cuenta desde su pantalla con «¿No eres tú?». La interfaz del proveedor decide si muestra selección, consentimiento o login según sus sesiones disponibles. El arranque conjunto local deshabilita las tres credenciales para evitar enviar un callback productivo a una base escolar.

Referencias oficiales: [Expo AuthSession SDK 58](https://docs.expo.dev/versions/v58.0.0/sdk/auth-session/), [OAuth de GitHub](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps), [OAuth de Discord](https://docs.discord.com/developers/topics/oauth2) y [metadatos PKCE de Discord](https://discord.com/.well-known/oauth-authorization-server).

## Qué se conserva

| Entorno                  | Almacén                                              | Contenido                                                                |
| ------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------ |
| Web                      | localStorage, clave `lavadero.session.v1` por origen | Versión, refresh opaco, ID y vencimiento local.                          |
| Android/iOS              | Expo SecureStore, clave `lavadero.refresh`           | El mismo sobre versionado en almacenamiento seguro del sistema.          |
| Memoria de la aplicación | AuthContext/sessionStore                             | Access JWT, perfil y rol recuperados del servidor.                       |
| Durante OAuth web        | sessionStorage                                       | State, verifier y momento de inicio; se retiran al completar el retorno. |

No se guardan contraseñas, access JWT ni permisos en almacenamiento persistente. Modificar un ID, rol o texto del navegador no autentica ni cambia privilegios. Cada reapertura envía el refresh al backend y vuelve a recibir el perfil autorizado. La credencial dura hasta 30 días desde su emisión/última renovación; la rotación genera un sucesor con una nueva vigencia. La revocación del servidor, la desactivación, el cambio de contraseña o el cierre de sesión pueden acortarla.

`credentialCodec` valida formato, versión, ID y vencimiento; descarta datos corruptos. Los refresh antiguos se reconocen y migran solo después de una renovación correcta. La sesión web anterior en sessionStorage se retira al guardar el sucesor. Logout deja una marca sin token para impedir que otra pestaña restaure una copia antigua.

localStorage es accesible al JavaScript del mismo origen, por lo que este diseño no equivale a una cookie HttpOnly. La CSP publicada limita scripts a recursos propios, bloquea scripts inline y eval, y los datos se renderizan como texto; estas defensas reducen el riesgo de robo por XSS sin garantizar invulnerabilidad. No cargar scripts externos sin revisar la política y el modelo de sesión. SecureStore aplica las protecciones del sistema operativo en nativo.

## Renovación, concurrencia y cierre

`createSessionRenewal` comparte la renovación en curso, vuelve a leer la credencial más reciente dentro del bloqueo y persiste el sucesor incluso si se desmontó una pantalla. Los errores de red, 429 y 5xx conservan la credencial y permiten reintentar; 401/403 definitivos retiran únicamente la credencial que fue rechazada. El interceptor reintenta la solicitud autorizada una vez.

En navegadores con [Web Locks](https://www.w3.org/TR/web-locks/), `lavadero.session` serializa restauración, renovación, aceptación y cierre entre pestañas del mismo origen. El navegador libera el bloqueo al resolver/rechazar la operación o cerrar su contexto. Sin Web Locks se conserva una cola por pestaña; esa alternativa no garantiza exclusión entre pestañas. Usar un navegador actual para trabajar con varias pestañas.

Los eventos `storage` propagan cierre y cambio de cuenta. Una rotación del mismo usuario actualiza el refresh en memoria sin iniciar otra renovación. Un cambio de titular borra el perfil anterior y consulta el nuevo al servidor. Todas las pestañas del mismo origen y perfil del navegador comparten una cuenta; para demostrar roles simultáneos, usar perfiles distintos o una sesión privada separada.

Un contador de revisión descarta respuestas tardías después de cerrar sesión o cambiar cuenta. Logout retira primero el estado visible, borra la credencial bajo el bloqueo y solicita revocación de su familia al servidor. Si la red impide esa última solicitud, el dispositivo permanece desconectado; la credencial remota continúa sujeta a su vencimiento. Borrar los datos del sitio, usar modo privado o impedir almacenamiento puede eliminar o impedir la persistencia. En un equipo compartido se debe cerrar sesión al terminar.

## Pruebas y límites

- `frontend/tests/persistent-session.test.ts`: sobre persistente para los tres roles, catálogo de proveedores, migración anterior, cierre y datos corruptos/vencidos.
- `frontend/tests/session-renewal.test.ts`: renovación compartida y entre administradores de sesión, carreras con logout, respuestas tardías, errores reintentables y perfil revalidado por servidor.
- `backend/tests/social-providers.test.ts`: disponibilidad, scopes, callbacks, PKCE y configuración incompleta.
- `backend/tests/oauth.integration.ts`, `oauth-link.integration.ts` y `security.integration.ts`: intercambio con proveedor simulado, vinculación local, grant de un uso, state inválido, rotación y revocación en MariaDB QA.
- Prueba web local: acceso por correo, cerrar/reabrir para los tres roles, dos pestañas con renovación y logout compartido, reabrir después del cierre.

La exportación Android comprueba el bundle; no acredita el comportamiento instalado en un teléfono. El APK histórico debe reconstruirse para incorporar este código y la persistencia nativa debe comprobarse en una instalación actualizada. Expo Go no verifica el callback de la identidad nativa publicada. Las pruebas externas y el despliegue observado se anotan en el informe de entrega correspondiente; una prueba simulada no se presenta como consentimiento real.
