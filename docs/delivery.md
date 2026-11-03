# Entrega Lavadero 1.1.1

Revisión: 2 de noviembre de 2026.

| Entregable                | Dirección                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| App web                   | https://lavadero-app-2558.onrender.com                                                                     |
| API HTTPS                 | https://lavadero-api-48m4.onrender.com                                                                     |
| Swagger                   | https://lavadero-api-48m4.onrender.com/api/docs/                                                           |
| OpenAPI                   | https://lavadero-api-48m4.onrender.com/api/openapi.json                                                    |
| Backend privado           | https://github.com/nehuenparrondo/lavadero-api                                                             |
| Frontend privado          | https://github.com/nehuenparrondo/lavadero-app                                                             |
| Compilación EAS           | https://expo.dev/accounts/elpepoestangod/projects/lavadero-app/builds/153f4480-dc62-4af9-8e27-492b75209c41 |
| Descarga temporal del APK | https://expo.dev/artifacts/eas/yEJIHeOfocUDvAGhqLqNILrHG7aykT3SYqk_xhUHCWA.apk                             |

## Correcciones verificadas

La web prepara el acceso social sin navegar a la pantalla de arranque de Render. Comparte una espera inicial con aviso propio, conserva la sesión ante caídas de red y permite reintentar. Los ingresos reales con Google, GitHub y Discord se completaron otra vez.

La reserva guía a quien todavía no registró un auto; actualiza los selectores al volver, ofrece calendario y explica días cerrados o sin horarios. Cambiar la fecha invalida el horario anterior. Solo confirma una opción futura de la cotización vigente. Una recarga conserva el enlace autorizado. Los turnos ya pagados no ofrecen otro cobro.

Se creó una cuenta y un auto ficticios para comprobar alta de vehículo, reserva y cancelación desde la interfaz publicada. El turno 3 del 3 de noviembre a las 09:30 quedó cancelado con motivo de QA y no registra pagos. Se revisaron también la agenda e historial del empleado, los filtros administrativos, reportes y el comprobante LAV-1 de demostración. No se agregaron movimientos reales de dinero.

Detalles: reliability.md en la entrega, o docs/reliability.md en cada repositorio.

## Verificación del código

46 pruebas aprobadas: 16 backend, 18 de aceptación contra MySQL local descartable y 12 frontend. TypeScript estricto, ESLint sin advertencias, exportaciones web/Android y Expo Doctor 20/20 aprobados. Fuente: 113 archivos/318 funciones-callbacks backend y 284/545 frontend; catálogo de 123 componentes. La auditoría mantiene 149 líneas por archivo de src, 30 por cuerpo de función/callback, TSDoc público, ausencia de ciclos y ausencia de HTTP en pantallas/componentes.

## APK y prueba desde iPhone

El archivo `lavadero-1.1.1.apk` corresponde a Android, package `com.nehuenparrondo.lavadero`, versionCode 7. EAS lo generó con el keystore del propietario. Se comprobaron el CRC del archivo ZIP, package/versión del manifiesto binario y presencia del bloque de firma; no se ejecutó en un dispositivo Android ni emulador.

- Fuente del APK: `2c7af527f68514e055c81723d3b25876a31173b2`.
- Tamaño: 98582839 bytes.
- SHA-256: `1eee30b8a74f4e414e980cfe2a85b137dbbc8a3c04442010e137297f74ae92da`.
- Vencimiento informado del enlace EAS: 2026-11-16T21:18:43.882Z. Conservar la copia local.

El propietario dispone de iPhone y Expo Go. Puede usar ahora la web en Safari. El APK no se instala en iOS; OAuth nativo requiere un build propio, porque Expo Go no admite el scheme de Lavadero. No se generó ni ejecutó un binario iOS. Ver PROBAR-EN-IPHONE.md o docs/iphone-expo-go.md.

## Alojamiento y entrega

Render Free sigue suspendiendo el backend después de inactividad: el primer acceso puede tardar cerca de un minuto. La app mantiene esa espera en su interfaz; no se contrató un plan pago ni se agregó un pinger periódico. La publicación estática revalida sus recursos mediante Cache-Control para recibir las correcciones al recargar.

Aiven conserva las bases y credenciales separadas del proyecto y usa TLS con CA verificada. Los secretos del backend y las cuentas iniciales quedan fuera de Git y de los ZIP. ACCESO-PRIVADO.md se conserva como archivo separado. Los dos repositorios y los ZIP de fuente incluyen su propio historial Git; no incluyen node_modules ni archivos .env privados.

Los documentos de la versión 1.1 se conservan como antecedentes de diseño. Esta entrega 1.1.1 agrega las correcciones funcionales y sus capturas. No se publicaron tiendas, EAS Update ni video, que eran opcionales.

Fuente sobre reposo: https://render.com/docs/free
