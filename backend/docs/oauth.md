> Estado actual, 15/11/2026: solo Google está habilitado. Discord y GitHub fueron retirados del cliente y del servidor (410). Los detalles anteriores se conservan abajo como referencia histórica; no habilitarlos. Ver security-recovery.md.

# Configuración y defensa del flujo OAuth

La app usa AuthSession + PKCE S256. Solo el backend conoce los secretos. Configurar
PUBLIC_API_URL=https://lavadero-api-48m4.onrender.com y estos callbacks exactos:

| Proveedor | Callback HTTPS                                                            | Scopes               |
| --------- | ------------------------------------------------------------------------- | -------------------- |
| Google    | https://lavadero-api-48m4.onrender.com/api/v1/auth/oauth/google/callback  | openid email profile |
| Discord   | https://lavadero-api-48m4.onrender.com/api/v1/auth/oauth/discord/callback | identify email       |
| GitHub    | https://lavadero-api-48m4.onrender.com/api/v1/auth/oauth/github/callback  | read:user user:email |

Google Cloud → Google Auth Platform: configurar marca/audiencia/usuarios de prueba si
está en Testing; crear cliente Web Application con callback anterior y conservar
GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET solo en Render. No hace falta facturación para
estas APIs de identidad. No habilitar servicios pagos ni ampliar scopes sin necesidad.
Para público general revisar verificación/publicación de Google y políticas vigentes.

Discord Developer Portal → aplicación Lavadero → OAuth2: añadir callback y guardar
DISCORD_CLIENT_ID/DISCORD_CLIENT_SECRET en Render. No requiere bot ni permisos de servidor.
GitHub Settings → Developer settings → OAuth Apps → Lavadero: callback anterior,
sin comodines y sin device flow. GITHUB_CLIENT_ID/GITHUB_CLIENT_SECRET van en Render.

Allowlist del retorno final: OAUTH_REDIRECT_URIS=lavadero://oauth,https://lavadero-app-2558.onrender.com/oauth.
Agregar solo direcciones bajo control del proyecto. El backend exige email verificado,
asocia la identidad social o crea un Cliente. Cuenta desactivada nunca vuelve a entrar.
Las identidades sociales con email verificado se vinculan al mismo usuario. Si ya
existe una contraseña local, el grant requiere confirmarla una sola vez: el canje sin
contraseña devuelve OAUTH_LINK_REQUIRED (409) y la app muestra el formulario. Se reenvían
code/codeVerifier con password; solo después se vincula la identidad. Cinco intentos
fallidos bloquean ese grant. La contraseña no se guarda ni aparece en URLs.

El state del proveedor vence a los 10 minutos y se consume una vez. El grant móvil normal vence
a los 60 segundos, necesita el verifier y también es de un solo uso. Los refresh/access
Para confirmar una vinculación local, el grant dura cinco minutos. Los tokens
propios jamás aparecen en el deep link. Cancelar autorización devuelve access_denied.

Consultar delivery.md para distinguir proveedores configurados de pruebas automatizadas
con respuestas simuladas. Una respuesta enabled=true solo acredita presencia de variables,
no que el usuario haya completado el consentimiento del proveedor.

## Preparación web y servidor en reposo

Desde 1.1.1, la web prepara PKCE con AuthRequest y envía sus parámetros a `POST /api/v1/auth/oauth/:provider/start`. El backend aplica el mismo esquema, allowlist, estado opaco y límite de intentos que GET authorize, pero responde `{ data: { url } }`. El cliente verifica el origen HTTPS del proveedor y navega directamente allí. GET authorize se conserva para aplicaciones anteriores y el flujo nativo.

Los transportes esperan una comprobación compartida de GET /ready antes de enviar credenciales o escrituras. No se reenvían mutaciones tras timeouts. Si el intercambio con el proveedor falla después de consumir un state válido, se devuelve `provider_unavailable` al retorno persistido con el state original. Un state inválido no permite elegir un redirect. Todas las rutas OAuth declaran `Cache-Control: no-store`.

El 2 de noviembre de 2026 se completó otra vez el acceso web real con Google, GitHub y Discord, con autorización previa del propietario. Ver reliability.md para las demás pruebas y los límites del alojamiento gratuito.
