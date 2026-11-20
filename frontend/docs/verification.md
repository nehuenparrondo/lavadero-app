# Verificación de Lavadero 1.1.1

Revisión: 2 de noviembre de 2026. Detalles de las correcciones en reliability.md.

46 pruebas aprobadas: 16 unitarias/HTTP de backend, 18 de aceptación contra MySQL real local descartable y 12 frontend. La aceptación comprueba reserva, propiedad, dos reservas simultáneas, cancelación, asignación, estados del empleado, observaciones, pagos idempotentes, comprobante, permisos, sesiones y OAuth de tres proveedores con respuestas simuladas.

La web publicada se probó con ingreso real por email y Google/GitHub/Discord, alta de un auto ficticio desde la reserva vacía, actualización al regresar, calendario, día cerrado, cotización, confirmación y cancelación del turno 3. Se revisaron reportes con datos históricos de demostración y la recarga de enlaces autorizados. No se registró un cobro nuevo en producción. Las credenciales no forman parte de los ZIP.

TypeScript estricto, ESLint sin advertencias y auditoría de modularidad aprobados. Fuente: API 113 archivos/318 funciones-callbacks y app 284/545. Límite de src: 149 líneas por archivo y 30 por cuerpo, TSDoc público y ausencia de ciclos internos; sin HTTP en componentes/pantallas. Catálogo: 123 componentes.

Exportaciones web y Android correctas. Expo 58.0.22, Router 58.0.29, Doctor 20/20. El estado final del APK se registra en delivery.md y apk-info.json; exportar o firmar no sustituye una prueba instalada. El dueño dispone de iPhone con Expo Go: ver iphone-expo-go.md en el frontend. No se ejecutó un binario Android ni iOS en dispositivo físico en esta revisión.

Render Free sigue teniendo tiempo de arranque después de inactividad. La app comparte una espera acotada en su propia interfaz y no mantiene activo el servidor artificialmente. La revisión de los cambios conserva los límites de uso gratuito.
