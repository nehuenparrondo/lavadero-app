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
| APK firmado EAS    | https://expo.dev/accounts/elpepoestangod/projects/lavadero-app/builds/849c9e3b-8871-49cf-9a83-698832129048 |
| Descarga APK       | https://expo.dev/artifacts/eas/ak6YoM-0rbism39lslC497VPrxvoM5uiiSKA0cNiOpw.apk                             |

El archivo lavadero-1.0.0.apk de la entrega es una copia descargada del artefacto EAS.
Android versionCode: **3**, package: `com.nehuenparrondo.lavadero`.
Fuente del APK: commit `e7de4dbb201425e5da6cad7edb15e54160affa85` del frontend.
SHA-256: `4729fcdac24eda6f3f7fef3857a7e91b27381e2c16d5ea78f7d376b2352f45e9`.
EAS informa vencimiento del artefacto: 2026-11-13T02:54:39.208Z. Conservar la copia local para distribución posterior.

## Estado externo verificado

- Render Free: API activa con HTTPS y migraciones automáticas desde main.
- Render Static Site: versión web independiente, rewrite a index.html y CORS exacto.
- Aiven umbral-r5: bases lavadero_dev/lavadero_prod y usuarios separados; TLS con CA verificada.
- Expo EAS: APK release firmado con el keystore administrado en la cuenta del propietario.
- Google: publicado en producción; ingreso real completado en la web con perfil básico y correo, con autorización del propietario.
- GitHub: ingreso real completado en la web con la cuenta autorizada nehuenparrondo.
- Discord: ingreso real completado en la web con la cuenta autorizada vendopepas7786.

## Verificación y límites

33 pruebas automatizadas aprobadas: 14 unitarias/HTTP backend, 16 de aceptación con MySQL real y 3 frontend. Tipos estrictos, lint y exportaciones Android/web aprobados. OpenAPI 3.1 validado.
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

Ver [requirements-review.md](requirements-review.md). El APK anterior se reemplaza por el build de esta revisión al finalizar su compilación; el archivo ENTREGA.md y apk-info.json identifican el build entregado.
