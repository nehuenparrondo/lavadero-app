# Entrega Lavadero 1.0

Revisión: 1 de noviembre de 2026.

| Entregable         | Dirección real                                                                                             |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| App web            | https://lavadero-app-2558.onrender.com                                                                     |
| API HTTPS          | https://lavadero-api-48m4.onrender.com                                                                     |
| Swagger            | https://lavadero-api-48m4.onrender.com/api/docs/                                                           |
| OpenAPI            | https://lavadero-api-48m4.onrender.com/api/openapi.json                                                    |
| Backend (privado)  | https://github.com/nehuenparrondo/lavadero-api                                                             |
| Frontend (privado) | https://github.com/nehuenparrondo/lavadero-app                                                             |
| APK firmado EAS    | https://expo.dev/accounts/elpepoestangod/projects/lavadero-app/builds/3ed6a3d2-1e00-435f-a303-5dadd68a2536 |
| Descarga APK       | https://expo.dev/artifacts/eas/gTOJZXJ6d8BnZpEPknBsvwhPgiBTMEOP0WgWHTRUClA.apk                             |

El archivo lavadero-1.0.0.apk de la entrega es una copia descargada del artefacto EAS.
Android versionCode: **4**, package: `com.nehuenparrondo.lavadero`.
Fuente del APK: commit `759cfecb568207b666722c97d588e1d7a4e0a958` del frontend.
SHA-256: `7c6fe5323403867c2b090a34469058d4a44aea25384fe99d86d482e0ac5044ec`.
EAS informa vencimiento del artefacto: 2026-11-15T18:34:15.050Z. Conservar la copia local para distribución posterior.

## Estado externo verificado

- Render Free: API activa con HTTPS y migraciones automáticas desde main.
- Render Static Site: versión web independiente, rewrite a index.html y CORS exacto.
- Aiven umbral-r5: bases lavadero_dev/lavadero_prod y usuarios separados; TLS con CA verificada.
- Expo EAS: APK release firmado con el keystore administrado en la cuenta del propietario.
- Google: publicado en producción; ingreso real completado en la web con perfil básico y correo, con autorización del propietario.
- GitHub: ingreso real completado en la web con la cuenta autorizada nehuenparrondo.
- Discord: ingreso real completado en la web con la cuenta autorizada vendopepas7786.

## Verificación y límites

35 pruebas automatizadas aprobadas: 15 unitarias/HTTP backend, 17 de aceptación con MySQL real y 3 frontend. Tipos estrictos, lint y exportaciones Android/web aprobados. OpenAPI 3.1 validado.
Revisión web real: ingreso por rol, vehículo, reserva, asignación/confirmación, observación, inicio/finalización, cobro ficticio y comprobante. Capturas con anchos de teléfono/paisaje.
No se ejecutó el APK en un teléfono físico ni emulador durante esta sesión. Se verificaron compilación EAS, estructura del APK y presencia de bloque de firma v2; esto no sustituye una prueba instalada.
Los secretos OAuth, SQL y JWT no están en Git, en el bundle móvil ni en los ZIP públicos. El acceso inicial se entrega en un archivo privado separado.
Los repositorios son privados: para evaluación se pueden entregar los ZIP o conceder acceso desde GitHub. Las ramas y el historial se conservan en cada proyecto.
La base contiene cuentas/vehículo/turno/pago de demostración, claramente identificados. No representan movimientos reales de dinero.

## Antes de una demostración

Abrir /ready y esperar que Render despierte antes de iniciar sesión. Render Free puede suspenderse por inactividad y demorar aproximadamente un minuto al volver. Revisar que Aiven esté Running y el plan sea Free.
Revisar límites/retención en los paneles de Render, Aiven y Expo antes de la evaluación. No se contrataron planes pagos. Aiven comparte el servidor existente con otros proyectos, pero no las credenciales ni las tablas.
Fuentes oficiales: [Render Free](https://render.com/docs/free), [Aiven Free](https://aiven.io/docs/products/mysql/concepts/mysql-free-tier), [Expo APK](https://docs.expo.dev/build-reference/apk/).

EAS Update, Google Play y video no forman parte de esta entrega; eran opcionales.

## Revisión posterior de la consigna

Ver [requirements-review.md](requirements-review.md). El APK entregado es el build 4 de esta revisión, compilado desde el commit de fuente indicado arriba. El archivo apk-info.json permite verificar su identidad.

## Revisión de requisitos y iPhone

La consigna completa se revisó contra el código y sus pruebas. Ver CUMPLIMIENTO-REQUISITOS.md
en la entrega o docs/requirements-review.md en cada repositorio. Ambos conservan una copia
de la consigna y su SHA-256 para identificar qué documento se evaluó.

La fuente tiene auditoría automática: 111 archivos backend y 218 frontend, sin ciclos,
sin HTTP en pantallas/componentes, con TSDoc público, archivos TS de hasta 149 líneas
y cuerpos de funciones/callbacks de hasta 30. El catálogo documenta 85 componentes.

El propietario dispone de iPhone y Expo Go. Puede usar la web publicada desde Safari;
el APK es Android y su ejecución instalada sigue sin verificarse. Expo Go no permite
validar el retorno OAuth con scheme propio. Ver PROBAR-EN-IPHONE.md o docs/iphone-expo-go.md.
