# Seguridad y recuperación de contraseña

Actualización: 15 de noviembre de 2026.

## Qué cambió

- Mi perfil usa iniciales en cliente, empleado y administrador. Se retiró el campo de foto y el servidor rechaza `avatarUrl` en los formularios de edición. Los datos históricos de imagen se conservan sin cargarlos en el navegador.
- El ingreso disponible es correo/contraseña o Google. Discord y GitHub dejaron de aparecer y sus inicios y callbacks responden `410 OAUTH_REMOVED`, incluso si se usa un enlace antiguo. Las cuentas y reservas existentes no se borran. Si una cuenta antigua solo usaba esos proveedores, puede establecer una contraseña mediante la recuperación.
- El botón «¿Olvidaste tu contraseña?» está debajo de «¿Primera vez? Creá tu cuenta». La nueva pantalla explica el modo de demostración.
- La paleta oscura compartida usa azul noche, superficies pizarra y acentos azules; mantiene el botón flotante y las mismas vistas.

## Cómo recuperar el acceso en esta demostración

1. Abrí el ingreso, tocá «¿Olvidaste tu contraseña?» y escribí el correo registrado.
2. La pantalla muestra la misma confirmación aunque el correo no exista. No permite consultar qué personas tienen cuenta.
3. En tu cuenta de [Mailtrap Sandbox](https://mailtrap.io/sandboxes/4924041), buscá «Lavadero · Recuperá tu contraseña». Abrí el mensaje y copiá el enlace completo del cuerpo de texto, incluido `#token=…`, en el navegador.
4. Escribí dos veces una contraseña nueva de al menos 12 caracteres. El servidor también limita a 72 bytes UTF-8 para evitar truncamiento de bcrypt.
5. El enlace vence 15 minutos después de prepararse y solo puede usarse una vez. Al cambiar la contraseña se invalidan JWT, renovaciones y enlaces anteriores; después hay que volver a ingresar.

**Mailtrap Sandbox captura los mensajes: no los entrega a Gmail ni a otras casillas reales.** Esta modalidad fue elegida por el propietario. Para recuperación pública real será necesario configurar un canal de envío con dominio verificado. La bandeja de Mailtrap debe quedar accesible solamente a personas autorizadas: sus mensajes contienen enlaces de recuperación.

## Cómo se protege el sitio

| Protección                          | Qué hace y dónde está                                                                                                                                                                                                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSP del navegador                   | `lavadero-app/security-headers.json` y los headers del sitio estático en Render permiten JavaScript únicamente del propio sitio. No se habilitan scripts inline ni `eval`. Los estilos inline se permiten porque React Native Web los necesita; eso no habilita scripts.  |
| Protección contra páginas embebidas | `frame-ancestors 'none'` y `X-Frame-Options: DENY` impiden que otra página muestre Lavadero dentro de un iframe para engañar con clics.                                                                                                                                   |
| HTTPS y navegación                  | HSTS, `upgrade-insecure-requests`, `nosniff`, `Referrer-Policy: no-referrer`, base URI bloqueada y formularios limitados al propio sitio. Las conexiones web se limitan al sitio y su API de Render. No se habilitan cámara, micrófono, ubicación ni pagos del navegador. |
| Valores SQL separados del código    | Los repositories envían valores como parámetros `?`. Un nombre que contenga comillas o texto SQL se guarda como texto, sin convertirse en una consulta. El driver no permite múltiples sentencias.                                                                        |
| Validación del servidor             | Zod rechaza campos desconocidos, roles y tipos inválidos. El parser de consultas es simple y el cuerpo JSON está limitado a 32 KB; el exceso devuelve 413 sin filtrar datos.                                                                                              |
| Textos sin HTML ejecutable          | La interfaz presenta nombres, motivos y observaciones con componentes de texto, sin `dangerouslySetInnerHTML`. La CSP agrega una barrera si en el futuro se introduce una falla de renderizado.                                                                           |
| Sesiones y permisos                 | Bcrypt costo 12; JWT con firma, emisor, audiencia, vencimiento y versión; tokens de renovación hasheados y rotativos. Cada petición vuelve a verificar usuario activo, rol, propiedad del recurso y familia de sesión en SQL.                                             |
| Errores y secretos                  | Helmet protege la API. Los errores públicos no incluyen SQL, stack ni credenciales. Claves de Mailtrap, Google y base de datos están únicamente en el servidor, fuera de Git y del bundle Expo.                                                                           |

Estas medidas reducen ataques habituales; ninguna aplicación puede prometer seguridad absoluta. Cambiar el nombre del enlace no reemplaza estas protecciones. Se debe mantener el software actualizado y limitar el acceso a los paneles y la bandeja de pruebas.

## Cómo está programada la recuperación

El módulo `lavadero-api/src/modules/auth/recovery.*` separa rutas, esquemas, servicio, repositorios, token, correo y trabajador. La migración `018_password_recovery.sql` agrega dos tablas en español:

- `recuperaciones_clave`: cola duradera, destinatario privado, cuenta, versión de clave, nonce aleatorio, hash SHA-256, estado, intentos, vencimiento y marcas de envío/uso. No guarda contraseñas ni el enlace legible.
- `limites_recuperacion`: hash del correo y contador atómico de solicitudes por hora, también para correos inexistentes.

El request público solo encola: no busca al usuario ni espera el correo. Un trabajador revisa la cola cada cinco segundos, valida la cuenta y entrega por HTTPS al endpoint fijo de Mailtrap Sandbox. Hay hasta tres intentos con bloqueo temporal recuperable tras reiniciar el proceso. El alojamiento gratuito puede dormirse: una solicitud nueva despierta la API y el trabajo pendiente continúa al arrancar.

El token de 256 bits se deriva con HMAC-SHA-256 de un nonce aleatorio y el ID del trabajo. HKDF separa su clave de la firma JWT. Esto permite reintentar el mismo correo sin guardar el secreto legible: solo se persiste su hash. Rotar la clave privada del servidor invalida los enlaces pendientes. El plazo de 15 minutos no se extiende al reintentar.

El enlace usa el fragmento `#token=…`: el navegador no lo envía al servidor web como parte de la URL. La pantalla lo captura en memoria y lo retira del historial; no lo escribe en almacenamiento local. Abrir o previsualizar el correo no consume el enlace: solamente el POST de confirmación lo hace. La transacción bloquea cuenta y token en ese orden, cambia bcrypt, incrementa `auth_version`, revoca renovaciones y descarta solicitudes anteriores. Dos confirmaciones simultáneas solo permiten una.

El frontend está separado en `api/services/recoveryService.ts`, hooks `usePasswordRecovery`/`useResetToken`, campos compartidos, componentes y pantallas. Las pantallas no hacen HTTP directamente. Al terminar también se borra la sesión local.

## Configuración privada y publicación

El backend recibe `MAILTRAP_API_TOKEN`, `MAILTRAP_INBOX_ID` y `PASSWORD_RESET_URL` mediante el entorno privado de Render. El token «Lavadero · recuperación Sandbox» tiene permiso únicamente sobre My Sandbox; no se le concedió acceso de cuenta, dominios ni envío real. El acceso vence el 15 de noviembre de 2027 y debe renovarse antes de esa fecha.

La web usa `npm run export:web`: exporta Expo y agrega la CSP como respaldo en el HTML. `render.yaml` documenta los encabezados HTTP; también se aplican al sitio existente desde Render → Headers. El respaldo HTML no sustituye `frame-ancestors`, que necesita el header HTTP. Si cambia el dominio de la API hay que actualizar CORS, la configuración pública, CSP y el retorno de recuperación de forma coordinada.

No subir `.env`, archivos privados, exportaciones SQL con cuentas ni mensajes con tokens. No reenviar enlaces de recuperación a terceros. Los fixtures usados para las pruebas están en una base separada.

## Verificación

Las pruebas cubren respuestas genéricas, tokens hasheados, expiración UTC, un uso incluso bajo concurrencia, contraseña válida, cierre de sesiones, límites por correo, fallos reintentables, cuenta desactivada, proveedores retirados, campos de foto/rol rechazados e intentos de inyección. Se verificó además la llegada de un mensaje a Mailtrap y el restablecimiento de una cuenta ficticia de la base escolar, sin cambiar contraseñas productivas. La prueba real de CSP permitió el script propio y bloqueó tanto el script inline insertado como el evento HTML.

Referencias primarias: [OWASP: recuperación de contraseñas](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html), [Mailtrap Sandbox](https://docs.mailtrap.io/developers/email-sandbox/send-test-emails), [encabezados estáticos de Render](https://render.com/docs/static-site-headers), [Helmet](https://helmetjs.github.io/).
