# Entrega actual — web y MariaDB

La versión vigente está publicada en [Render](https://lavadero-app-2558.onrender.com). Los archivos de la copia secundaria están alojados en alwaysdata, pero su dirección presenta un fallo de conexión pendiente. Usar la web principal de Render. La API utiliza MariaDB 11.8.9 con 25 tablas españolas, 35 relaciones y 17 migraciones. Se conservaron todos los datos copiados; Aiven quedó como respaldo anterior.

Se agregaron avisos persistentes de cancelación en Inicio, motivo obligatorio, observaciones con autor/fecha y mejoras comunes de botones, tarjetas y formularios. Se incorporaron actualización automática, rueda de horarios disponibles, selección uniforme de servicios, nuevas bandejas y filtros administrativos y reorganización de las tres vistas. Se aprobaron 85 pruebas y recorridos de navegador para los tres roles. Ver [funcionamiento](https://github.com/nehuenparrondo/lavadero-api/blob/main/docs/functional-guide.md), [gestor SQL](https://github.com/nehuenparrondo/lavadero-api/blob/main/docs/mariadb.md) y [migración y verificación](https://github.com/nehuenparrondo/lavadero-api/blob/main/docs/mariadb.md).

Los archivos APK y ZIP de la entrega 1.2.0 que siguen listados abajo son **históricos**. Los cambios actuales están en los repositorios y la web; no se recompiló un APK nuevo ni se probaron físicamente en iPhone.

---

# Registro histórico — Lavadero 1.2.0

| Entregable                | Dirección                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Web actualizada           | https://lavadero-app-2558.onrender.com/?release=1.2.0                                                      |
| API HTTPS                 | https://lavadero-api-48m4.onrender.com                                                                     |
| Swagger                   | https://lavadero-api-48m4.onrender.com/api/docs/                                                           |
| OpenAPI                   | https://lavadero-api-48m4.onrender.com/api/openapi.json                                                    |
| Backend privado           | https://github.com/nehuenparrondo/lavadero-api                                                             |
| Frontend privado          | https://github.com/nehuenparrondo/lavadero-app                                                             |
| Compilación Android       | https://expo.dev/accounts/elpepoestangod/projects/lavadero-app/builds/d6e333de-82be-4a26-97d1-984d036ccf27 |
| Descarga temporal del APK | https://expo.dev/artifacts/eas/2dlnfP5MvU-Ozl1ByUiyg6EuS8-FojQu1084J3Xe0LM.apk                             |

## Resultado

Reservas confirmadas automáticamente en la agenda compartida de todos los empleados, sin datos de asignación para el cliente. Actualización visible por fecha, tablero de turnos por atender, botones flotantes universales de tema/volver arriba y acceso al perfil desde la identidad del encabezado y barra lateral. La recarga conserva la pantalla del rol correcto.

CORRECCIONES-AGENDA-Y-CONTROLES.md describe la decisión posterior del usuario, que reemplaza la asignación exclusiva del enunciado inicial. verificacion-1.2.0.json registra las pruebas y fuentes concretas. En los repositorios, ver docs/shared-agenda.md y docs/shared-verification.md.

## Verificación

54 pruebas aprobadas: 16 backend, 23 de aceptación con MySQL local descartable y 15 frontend. Tipos estrictos, lint, formato, auditoría de fuente, contrato OpenAPI y Expo Doctor 20/20 aprobados. Fuente: 114 archivos/319 funciones-callbacks backend, 300/587 frontend y 131 componentes documentados. La auditoría conserva el límite de 149 líneas por archivo de src y 30 por cuerpo, TSDoc público y ausencia de ciclos.

Prueba web publicada: los tres roles, perfiles de cabecera/barra lateral, tema persistente, volver arriba, diálogos y adaptación a 390 × 844. La reserva ficticia 5 del 7 de noviembre a las 09:30 quedó confirmada y apareció sola en la agenda del empleado; después se canceló sin pagos. El turno existente 4 se conservó. Se verificaron además 23 consultas productivas y los tres proveedores OAuth configurados. Los consentimientos reales conservan la evidencia de 1.1.1, ya que ese flujo no cambió.

## APK exacto de esta versión

Archivo local: **lavadero-1.2.0.apk**. Android package: `com.nehuenparrondo.lavadero`, versionCode **8**.

Fuente de ejecución: `abf679f80bf06ba486fa905db9236c608fa3baf0`. Las modificaciones posteriores del repositorio son documentación; se comprobó que la fuente de ejecución coincide con la enviada a Expo.

Tamaño: **98593299 bytes**. SHA-256: `83d1fad1e9e8930db1a1ef182e6cb88b91a9f0627f58e27deda13ad08da334de`.

Expo informa expiración del enlace remoto: 2026-11-17T02:22:30.121Z. La copia local queda incluida en el ZIP de entrega. Se verificaron CRC, identidad/versión del manifiesto y presencia de bloque de firma, junto con el build finalizado de Expo. No hubo ejecución instalada en Android o iPhone ni verificación criptográfica independiente de la firma.

## Uso y alojamiento

En iPhone se puede usar la web desde Safari; PROBAR-EN-IPHONE.md explica Expo Go y el acceso social nativo. El APK es Android.

Render Free puede suspender la API por inactividad. La app conserva el aviso y la conexión inicial compartida de 1.1.1. La agenda consulta cambios solo mientras está visible; no se agregó un mantenimiento periódico en segundo plano ni se contrató un plan pago. Aiven conserva bases separadas y TLS con CA verificada.

Las cuentas iniciales están en ACCESO-PRIVADO.md, fuera de Git y de los ZIP. Los ZIP de código conservan sus propios historiales Git y excluyen dependencias, exportaciones generadas y .env privados. Los documentos de versiones anteriores se conservan como evidencia histórica. No se publicaron tiendas, EAS Update ni video.

Se completó el ingreso rápido sin turno y sin garaje previo, alta de clientes/empleados sin cambiar roles al editar, fichaje solo laboral y gráficos semanales con barras de servicios. Se retiraron Apariencia del perfil administrativo, rendimiento del equipo y el filtro rápido Por verificar. La migración 016 conserva datos presenciales y observaciones; cancelaciones siguen exigiendo motivo persistido.

La migración 017 agrega limpieza del Inicio y autoría del cierre del empleado. Ver [flujo de cliente y empleado](client-employee-flow.md).

Cliente y empleado: calendario adaptable con fecha explícita, limpieza confirmada de Inicio sin cancelar reservas, Próximos desde hoy, Mi agenda solo con Hoy, historial de otras fechas y finalización directa tras cobrar el total. Reclamos persistidos y contador administrativo con actualización automática.
